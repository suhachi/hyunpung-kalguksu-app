/**
 * Firebase Functions
 * 현풍닭칼국수 PWA 백엔드 트리거 및 스케줄러
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { sendPushToUser, sendPushToAdmins } from './lib/push';
import { issueCoupon, issuePhotoReviewCoupon } from './lib/coupons';
import { getStatusChangeMessage, getStatusChangeTitle } from './lib/report';
import { authorizePayment, cancelPayment, issueCashReceipt } from './lib/nicepay';
import { generateReceiptPDF, ReceiptData } from './lib/pdf';

// Firebase Admin 초기화
if (!admin.apps.length) {
  admin.initializeApp();
}

// ============================================================================
// 1. 리뷰 생성 트리거: 사진 리뷰 쿠폰 자동 발급
// ============================================================================
export const onReviewCreated = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate(async (snap, context) => {
    const review = snap.data();
    const reviewId = context.params.reviewId;

    // 이미 보상 발급된 경우 스킵
    if (review?.rewardIssued || !review?.userId) {
      return;
    }

    // 사진 리뷰 확인
    const hasPhoto = Array.isArray(review.photos) && review.photos.length > 0;
    if (!hasPhoto) {
      return;
    }

    try {
      // 사진 리뷰 쿠폰 발급 (3,000원 / 30일 / 15,000원 이상 주문시 사용)
      await issuePhotoReviewCoupon(review.userId);

      // 리뷰에 보상 발급 완료 표시
      await snap.ref.update({ rewardIssued: true });

      // 푸시 알림 전송
      await sendPushToUser(review.userId, {
        notification: {
          title: '🎁 리뷰 감사 쿠폰이 발급되었어요',
          body: '소중한 후기 감사합니다. 다음 주문에 사용해 보세요!',
        },
        data: {
          type: 'coupon_issued',
          couponType: 'photo_review',
        },
      });

      console.log(`Photo review coupon issued for user ${review.userId}`);
    } catch (error) {
      console.error('Failed to issue photo review coupon:', error);
    }
  });

// ============================================================================
// 2. 리뷰 신고 트리거: 3건 이상 시 자동 숨김 + 관리자 알림
// ============================================================================
export const onReviewReportCreated = functions.firestore
  .document('reviews_reports/{reportId}')
  .onCreate(async (snap, context) => {
    const report = snap.data();
    const reviewId = report?.reviewId;

    if (!reviewId) {
      return;
    }

    const db = admin.firestore();

    try {
      // 해당 리뷰의 전체 신고 건수 조회
      const reportsSnapshot = await db
        .collection('reviews_reports')
        .where('reviewId', '==', reviewId)
        .get();

      const reportCount = reportsSnapshot.size;

      console.log(`Review ${reviewId} has ${reportCount} reports`);

      // 신고 3건 이상 시 자동 숨김 처리
      if (reportCount >= 3) {
        await db.collection('reviews').doc(reviewId).set(
          {
            hidden: true,
            hiddenReason: 'auto-reported',
            hiddenAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        // 관리자들에게 알림
        await sendPushToAdmins({
          notification: {
            title: '⚠️ 리뷰 신고 누적 알림',
            body: `신고 ${reportCount}건 누적된 리뷰가 자동 숨김 처리되었습니다.`,
          },
          data: {
            type: 'review_auto_hidden',
            reviewId,
            reportCount: String(reportCount),
          },
        });

        console.log(`Review ${reviewId} auto-hidden due to ${reportCount} reports`);
      }
    } catch (error) {
      console.error('Failed to process review report:', error);
    }
  });

// ============================================================================
// 3. 주문 상태 변경 트리거: 고객에게 푸시 알림
// ============================================================================
export const onOrderUpdated = functions.firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const orderId = context.params.orderId;

    if (!before || !after) {
      return;
    }

    // 상태 변경이 없으면 스킵
    if (before.status === after.status) {
      return;
    }

    try {
      const title = getStatusChangeTitle(after.status);
      const message = getStatusChangeMessage(after.status);

      await sendPushToUser(after.userId, {
        notification: {
          title,
          body: message,
        },
        data: {
          type: 'order_status_changed',
          orderId,
          status: String(after.status),
          orderNumber: String(after.orderNumber || ''),
        },
      });

      console.log(
        `Order ${orderId} status changed: ${before.status} → ${after.status}`
      );
    } catch (error) {
      console.error('Failed to send order status notification:', error);
    }
  });

// ============================================================================
// 4. 쿠폰 만료 배치: 매일 04:00 KST
// ============================================================================
export const scheduledCouponExpiration = functions.pubsub
  .schedule('0 4 * * *')
  .timeZone('Asia/Seoul')
  .onRun(async (context) => {
    const db = admin.firestore();
    const now = admin.firestore.Timestamp.now();

    try {
      // 만료된 미사용 쿠폰 조회
      const expiredCoupons = await db
        .collection('coupons')
        .where('expiresAt', '<=', now)
        .where('status', '==', 'unused')
        .get();

      if (expiredCoupons.empty) {
        console.log('No expired coupons found');
        return;
      }

      // 배치로 상태 업데이트
      const batch = db.batch();
      expiredCoupons.forEach((doc) => {
        batch.update(doc.ref, {
          status: 'expired',
          expiredAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      await batch.commit();

      console.log(`Expired ${expiredCoupons.size} coupons`);
    } catch (error) {
      console.error('Failed to expire coupons:', error);
    }
  });

// ============================================================================
// 5. 주간 리포트: 매주 월요일 09:00 KST
// ============================================================================
export const weeklyReport = functions.pubsub
  .schedule('0 9 * * 1')
  .timeZone('Asia/Seoul')
  .onRun(async (context) => {
    const db = admin.firestore();

    try {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // TODO: 실제 집계 로직 구현
      // - 주문 건수, 매출, 평균 주문 금액
      // - 리뷰 수, 평균 평점
      // - 인기 메뉴 Top 5
      // - 시간대별 주문 분포

      const reportData = {
        period: {
          start: admin.firestore.Timestamp.fromDate(weekAgo),
          end: admin.firestore.Timestamp.fromDate(now),
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        summary: {
          totalOrders: 0,
          totalRevenue: 0,
          avgOrderAmount: 0,
          totalReviews: 0,
          avgRating: 0,
        },
        topMenus: [],
        hourlyDistribution: [],
      };

      await db.collection('weekly_reports').add(reportData);

      // 관리자에게 알림
      await sendPushToAdmins({
        notification: {
          title: '📊 주간 리포트가 생성되었습니다',
          body: '지난 주 운영 현황을 확인하세요.',
        },
        data: {
          type: 'weekly_report',
        },
      });

      console.log('Weekly report generated');
    } catch (error) {
      console.error('Failed to generate weekly report:', error);
    }
  });

// ============================================================================
// HTTPS Functions: 결제 및 영수증
// ============================================================================

/**
 * 결제 승인 (NICEPAY)
 */
export const payAuthorize = functions.https.onCall(async (data, context) => {
  // 인증 확인
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      '로그인이 필요합니다'
    );
  }

  try {
    const result = await authorizePayment(data);
    return result;
  } catch (error: any) {
    console.error('Payment authorization failed:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * 결제 취소 (망취소)
 */
export const payCancel = functions.https.onCall(async (data, context) => {
  // 인증 확인
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      '로그인이 필요합니다'
    );
  }

  try {
    const result = await cancelPayment(data);
    return result;
  } catch (error: any) {
    console.error('Payment cancellation failed:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * 영수증 PDF 생성
 */
export const generateReceipt = functions.https.onCall(async (data, context) => {
  // 인증 확인
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      '로그인이 필요합니다'
    );
  }

  const { orderId } = data;

  if (!orderId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      '주문 ID가 필요합니다'
    );
  }

  try {
    const db = admin.firestore();
    const orderDoc = await db.collection('orders').doc(orderId).get();

    if (!orderDoc.exists) {
      throw new functions.https.HttpsError('not-found', '주문을 찾을 수 없습니다');
    }

    const order = orderDoc.data() as any;

    // 본인 주문이거나 관리자인지 확인
    const isOwner = order.userId === context.auth.uid;
    const userDoc = await db.collection('users').doc(context.auth.uid).get();
    const isAdmin = ['owner', 'admin'].includes(userDoc.get('role'));

    if (!isOwner && !isAdmin) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '권한이 없습니다'
      );
    }

    // 영수증 데이터 준비
    const receiptData: ReceiptData = {
      orderId,
      orderNumber: order.orderNumber || orderId.slice(0, 8).toUpperCase(),
      orderDate: order.createdAt?.toDate().toLocaleString('ko-KR') || '',
      storeName: '현풍닭칼국수',
      storePhone: '1588-0000',
      storeAddress: '대구광역시 달성군 현풍면',
      customerName: order.customerInfo?.name || '고객',
      customerPhone: order.customerInfo?.phone || '',
      items: order.items || [],
      itemsTotal: order.itemsTotal || 0,
      deliveryFee: order.deliveryFee || 0,
      discount: order.discount || 0,
      finalAmount: order.finalAmount || 0,
      paymentMethod: order.payment?.method || '카드',
      developerInfo: {
        company: 'KS컴퍼니',
        bizNo: '553-17-00098',
        ceo: '석경선/배종수(공동대표)',
      },
    };

    const url = await generateReceiptPDF(receiptData);

    return { url };
  } catch (error: any) {
    console.error('Failed to generate receipt:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * 현금영수증 발급
 */
export const requestCashReceipt = functions.https.onCall(
  async (data, context) => {
    // 인증 확인
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        '로그인이 필요합니다'
      );
    }

    const { orderId, phoneOrBizNo } = data;

    if (!orderId || !phoneOrBizNo) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        '주문 ID와 전화번호/사업자번호가 필요합니다'
      );
    }

    try {
      const db = admin.firestore();
      const orderDoc = await db.collection('orders').doc(orderId).get();

      if (!orderDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          '주문을 찾을 수 없습니다'
        );
      }

      const order = orderDoc.data() as any;

      // 본인 주문인지 확인
      if (order.userId !== context.auth.uid) {
        throw new functions.https.HttpsError(
          'permission-denied',
          '권한이 없습니다'
        );
      }

      // NICEPAY 현금영수증 발급
      const result = await issueCashReceipt({
        tid: order.payment?.tid || '',
        phoneOrBizNo,
        amount: order.finalAmount,
      });

      // 주문에 현금영수증 정보 저장
      await orderDoc.ref.update({
        'payment.cashReceipt': {
          phoneOrBizNo,
          issuedAt: admin.firestore.FieldValue.serverTimestamp(),
          receiptNo: result.receiptNo,
        },
      });

      return { success: true, receiptNo: result.receiptNo };
    } catch (error: any) {
      console.error('Failed to issue cash receipt:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  }
);
