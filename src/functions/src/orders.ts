/**
 * 주문 관련 Firebase Functions
 * Phase 2-5: 관리자 주문 대시보드
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const fcm = admin.messaging();

// 주문 상태 타입
type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'completed' | 'canceled';

// 상태 전이 검증
const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['accepted', 'canceled'],
  accepted: ['preparing', 'canceled'],
  preparing: ['completed', 'canceled'],
  completed: [],
  canceled: [],
};

/**
 * 주문 상태 변경 (관리자용)
 */
export const updateOrderStatus = functions.https.onCall(async (data, context) => {
  // 인증 확인
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '로그인이 필요합니다.');
  }

  // 관리자 권한 확인
  const token = context.auth.token;
  if (!token.role || !['owner', 'admin'].includes(token.role)) {
    throw new functions.https.HttpsError('permission-denied', '관리자 권한이 필요합니다.');
  }

  const { orderId, newStatus, reason } = data;

  if (!orderId || !newStatus) {
    throw new functions.https.HttpsError('invalid-argument', '필수 파라미터가 누락되었습니다.');
  }

  try {
    const orderRef = db.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      throw new functions.https.HttpsError('not-found', '주문을 찾을 수 없습니다.');
    }

    const order = orderSnap.data();
    const currentStatus = order?.status as OrderStatus;

    // 상태 전이 검증
    const allowedTransitions = ORDER_STATUS_TRANSITIONS[currentStatus];
    if (!allowedTransitions.includes(newStatus)) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        `${currentStatus} 상태에서 ${newStatus}로 변경할 수 없습니다.`
      );
    }

    // 취소 시 사유 필수
    if (newStatus === 'canceled' && !reason) {
      throw new functions.https.HttpsError('invalid-argument', '취소 사유를 입력해주세요.');
    }

    // 주문 상태 업데이트
    const updateData: any = {
      status: newStatus,
      [`timeline.${newStatus}`]: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (newStatus === 'canceled' && reason) {
      updateData['payment.cancelReason'] = reason;
      updateData['payment.canceledAt'] = admin.firestore.FieldValue.serverTimestamp();
      
      // 결제 환불 처리 (NICEPAY 연동 시)
      if (order?.payment?.status === 'approved' && order?.payment?.tid) {
        // TODO: NICEPAY 취소 API 호출
        updateData['payment.status'] = 'refunded';
      }
    }

    await orderRef.update(updateData);

    // 감사 로그 생성
    await db.collection('order_logs').add({
      orderId,
      action: newStatus === 'canceled' ? 'canceled' : 'status_changed',
      by: context.auth.uid,
      byName: token.name || '관리자',
      at: admin.firestore.FieldValue.serverTimestamp(),
      from: currentStatus,
      to: newStatus,
      reason: reason || null,
    });

    // 고객에게 푸시 알림
    const userId = order?.userId;
    if (userId) {
      const userSnap = await db.collection('users').doc(userId).get();
      const pushToken = userSnap.data()?.pushToken;

      if (pushToken) {
        const notifications: Record<string, { title: string; body: string }> = {
          accepted: {
            title: '주문이 접수되었어요',
            body: '따끈하게 준비할게요!',
          },
          preparing: {
            title: '조리를 시작했어요',
            body: '정성껏 만들고 있어요.',
          },
          completed: {
            title: '주문이 완료되었어요',
            body: order?.deliveryType === 'pickup' ? '방문해주세요!' : '맛있게 드세요!',
          },
          canceled: {
            title: '주문이 취소되었어요',
            body: reason || '주문이 취소되었습니다.',
          },
        };

        const notification = notifications[newStatus];

        if (notification) {
          await fcm.send({
            token: pushToken,
            notification,
            data: {
              orderId,
              status: newStatus,
              type: 'order_status',
            },
          });
        }
      }
    }

    return { success: true, orderId, newStatus };
  } catch (error: any) {
    console.error('주문 상태 변경 실패:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', '주문 상태 변경 중 오류가 발생했습니다.');
  }
});

/**
 * 주문 생성 시 가게에 알림 (onWrite Trigger)
 */
export const onOrderCreated = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snapshot, context) => {
    const order = snapshot.data();
    const orderId = context.params.orderId;

    try {
      // 가게에 푸시 알림
      const storeId = order.storeId;
      if (storeId) {
        const storeSnap = await db.collection('stores').doc(storeId).get();
        const pushToken = storeSnap.data()?.pushToken;

        if (pushToken) {
          await fcm.send({
            token: pushToken,
            notification: {
              title: '🔔 새 주문이 도착했어요',
              body: `#${orderId} - ${order.items.length}개 메뉴, ${order.finalAmount.toLocaleString()}원`,
            },
            data: {
              orderId,
              type: 'new_order',
            },
          });
        }
      }

      // 감사 로그 생성
      await db.collection('order_logs').add({
        orderId,
        action: 'created',
        by: order.userId,
        byName: '고객',
        at: admin.firestore.FieldValue.serverTimestamp(),
        to: 'pending',
      });

      console.log(`새 주문 생성: ${orderId}`);
      return null;
    } catch (error) {
      console.error('주문 생성 알림 실패:', error);
      return null;
    }
  });

/**
 * 주문 완료 1시간 후 리뷰 요청 (실제 배포 시 Cloud Tasks 권장)
 */
export const onOrderCompleted = functions.firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // 상태가 completed로 변경된 경우
    if (before.status !== 'completed' && after.status === 'completed') {
      const orderId = context.params.orderId;
      const userId = after.userId;

      try {
        // 1시간 후 리뷰 요청 푸시 (실제로는 Cloud Tasks 사용 권장)
        setTimeout(async () => {
          const userSnap = await db.collection('users').doc(userId).get();
          const pushToken = userSnap.data()?.pushToken;

          if (pushToken) {
            await fcm.send({
              token: pushToken,
              notification: {
                title: '오늘 식사는 어떠셨어요?',
                body: '사진 리뷰 쿠폰이 기다려요 📸',
              },
              data: {
                orderId,
                action: 'write_review',
                type: 'review_request',
              },
            });
          }
        }, 60 * 60 * 1000); // 1시간

        console.log(`리뷰 요청 예약: ${orderId}`);
        return null;
      } catch (error) {
        console.error('리뷰 요청 예약 실패:', error);
        return null;
      }
    }

    return null;
  });
