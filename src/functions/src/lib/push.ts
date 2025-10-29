/**
 * 푸시 알림 유틸리티
 * FCM 토큰을 통한 푸시 전송
 * Phase 3-6: 푸시 알림 시스템
 */

import * as admin from 'firebase-admin';

// 알림 타입별 템플릿
interface NotificationTemplate {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
}

const NOTIFICATION_TEMPLATES: Record<string, NotificationTemplate> = {
  order_received: {
    title: '✅ 주문 접수',
    body: '주문이 접수되었습니다. 따끈하게 준비할게요!',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  order_cooking: {
    title: '👨‍🍳 조리 시작',
    body: '주문하신 메뉴를 조리 중입니다.',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  order_delivering: {
    title: '🚚 배달 출발',
    body: '주문하신 메뉴가 배달을 시작했습니다.',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  order_completed: {
    title: '✅ 주문 완료',
    body: '주문이 완료되었습니다. 맛있게 드세요!',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  coupon_issued: {
    title: '🎁 쿠폰 발급',
    body: '새로운 쿠폰이 발급되었습니다!',
    icon: '/icons/icon-192x192.png',
    tag: 'coupon',
  },
  review_reminder: {
    title: '✍️ 리뷰 작성',
    body: '오늘 식사는 어떠셨어요? 사진 리뷰 쿠폰이 기다려요.',
    icon: '/icons/icon-192x192.png',
    tag: 'review',
  },
};

/**
 * 특정 사용자에게 푸시 알림 전송
 */
export async function sendPushToUser(
  uid: string,
  payload: admin.messaging.MessagingPayload
): Promise<void> {
  try {
    const tokenSnap = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('meta')
      .doc('fcm')
      .get();

    const token = tokenSnap.get('token');
    if (!token) {
      console.log(`No FCM token for user ${uid}`);
      return;
    }

    // 알림 설정 확인
    const settingsSnap = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('notifications')
      .get();

    if (settingsSnap.exists) {
      const settings = settingsSnap.data();
      if (!settings?.enabled) {
        console.log(`Notifications disabled for user ${uid}`);
        return;
      }
    }

    await admin.messaging().sendToDevice(token, payload);
    console.log(`Push sent to user ${uid}`);
    
    // Firestore에 알림 기록 저장
    await admin
      .firestore()
      .collection('notifications')
      .add({
        userId: uid,
        title: payload.notification?.title || '',
        body: payload.notification?.body || '',
        data: payload.data || {},
        type: payload.data?.type || 'system',
        priority: 'normal',
        read: false,
        clicked: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error(`Failed to send push to user ${uid}:`, error);
  }
}

/**
 * 여러 사용자에게 푸시 알림 전송
 */
export async function sendPushToUsers(
  uids: string[],
  payload: admin.messaging.MessagingPayload
): Promise<void> {
  await Promise.all(uids.map((uid) => sendPushToUser(uid, payload)));
}

/**
 * 관리자들에게 푸시 알림 전송
 */
export async function sendPushToAdmins(
  payload: admin.messaging.MessagingPayload
): Promise<void> {
  const db = admin.firestore();
  const adminSnap = await db
    .collection('users')
    .where('role', 'in', ['owner', 'admin'])
    .get();

  const adminUids = adminSnap.docs.map((doc) => doc.id);
  await sendPushToUsers(adminUids, payload);
}

/**
 * 주문 상태 변경 알림 전송
 */
export async function sendOrderStatusNotification(
  uid: string,
  orderId: string,
  status: string
): Promise<void> {
  const template = NOTIFICATION_TEMPLATES[`order_${status}`];
  if (!template) {
    console.warn(`No template for order status: ${status}`);
    return;
  }

  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: template.title,
      body: template.body,
      icon: template.icon,
      tag: template.tag,
      clickAction: `/app/order-tracking?orderId=${orderId}`,
    },
    data: {
      type: `order_${status}`,
      orderId,
      status,
    },
  };

  await sendPushToUser(uid, payload);
}

/**
 * 쿠폰 발급 알림 전송
 */
export async function sendCouponIssuedNotification(
  uid: string,
  couponType: string,
  amount: number
): Promise<void> {
  const template = NOTIFICATION_TEMPLATES.coupon_issued;

  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: template.title,
      body: `${amount.toLocaleString()}원 할인 쿠폰이 발급되었습니다!`,
      icon: template.icon,
      tag: template.tag,
      clickAction: '/app/coupons',
    },
    data: {
      type: 'coupon_issued',
      couponType,
      amount: amount.toString(),
    },
  };

  await sendPushToUser(uid, payload);
}

/**
 * 리뷰 작성 요청 알림 전송
 */
export async function sendReviewReminderNotification(
  uid: string,
  orderId: string
): Promise<void> {
  const template = NOTIFICATION_TEMPLATES.review_reminder;

  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: template.title,
      body: template.body,
      icon: template.icon,
      tag: template.tag,
      clickAction: `/app/review/write?orderId=${orderId}`,
    },
    data: {
      type: 'review_reminder',
      orderId,
    },
  };

  await sendPushToUser(uid, payload);
}

/**
 * 포인트 적립 알림 전송
 */
export async function sendPointsEarnedNotification(
  uid: string,
  amount: number,
  orderId: string
): Promise<void> {
  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: '💰 포인트 적립',
      body: `${amount.toLocaleString()} 포인트가 적립되었습니다.`,
      icon: '/icons/icon-192x192.png',
      tag: 'points',
      clickAction: '/app/points',
    },
    data: {
      type: 'points_earned',
      amount: amount.toString(),
      orderId,
    },
  };

  await sendPushToUser(uid, payload);
}
