/**
 * 알림 API
 * Phase 3-6: 푸시 알림 시스템
 */

import { USE_FIREBASE } from '../config/env';
import type { Notification, NotificationType, NotificationTemplate } from '../types/notification';

/**
 * 알림 템플릿 정의
 */
export const NOTIFICATION_TEMPLATES: Record<NotificationType, NotificationTemplate> = {
  order_received: {
    type: 'order_received',
    title: '✅ 주문 접수',
    body: '주문이 접수되었습니다. 따끈하게 준비할게요!',
    priority: 'high',
  },
  order_cooking: {
    type: 'order_cooking',
    title: '👨‍🍳 조리 시작',
    body: '주문하신 메뉴를 조리 중입니다.',
    priority: 'normal',
  },
  order_ready: {
    type: 'order_ready',
    title: '🍜 조리 완료',
    body: '주문하신 메뉴가 준비되었습니다!',
    priority: 'high',
  },
  order_delivering: {
    type: 'order_delivering',
    title: '🚚 배달 출발',
    body: '주문하신 메뉴가 배달을 시작했습니다.',
    priority: 'high',
  },
  order_completed: {
    type: 'order_completed',
    title: '✅ 주문 완료',
    body: '주문이 완료되었습니다. 맛있게 드세요!',
    priority: 'normal',
  },
  order_cancelled: {
    type: 'order_cancelled',
    title: '❌ 주문 취소',
    body: '주문이 취소되었습니다.',
    priority: 'high',
  },
  coupon_issued: {
    type: 'coupon_issued',
    title: '🎁 쿠폰 발급',
    body: '새로운 쿠폰이 발급되었습니다!',
    priority: 'normal',
  },
  points_earned: {
    type: 'points_earned',
    title: '💰 포인트 적립',
    body: '포인트가 적립되었습니다.',
    priority: 'low',
  },
  review_reminder: {
    type: 'review_reminder',
    title: '✍️ 리뷰 작성',
    body: '오늘 식사는 어떠셨어요? 사진 리뷰 쿠폰이 기다려요.',
    priority: 'low',
  },
  review_reply: {
    type: 'review_reply',
    title: '💬 리뷰 답글',
    body: '작성하신 리뷰에 답글이 달렸습니다.',
    priority: 'normal',
  },
  promotion: {
    type: 'promotion',
    title: '🎉 프로모션',
    body: '특별한 이벤트를 확인하세요!',
    priority: 'low',
  },
  system: {
    type: 'system',
    title: '📢 시스템 공지',
    body: '중요한 공지사항이 있습니다.',
    priority: 'normal',
  },
};

/**
 * 알림 목록 조회
 */
export async function getNotifications(
  userId: string,
  limit: number = 50
): Promise<Notification[]> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting notifications for user:', userId);
    
    const mockNotifications: Notification[] = [
      {
        id: 'notif-1',
        userId,
        type: 'order_delivering',
        title: '🚚 배달 출발',
        body: '주문하신 메뉴가 배달을 시작했습니다.',
        data: { orderId: 'order-1', status: 'delivering' },
        priority: 'high',
        read: false,
        clicked: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10분 전
      },
      {
        id: 'notif-2',
        userId,
        type: 'coupon_issued',
        title: '🎁 쿠폰 발급',
        body: '리뷰 감사 쿠폰이 발급되었습니다.',
        data: { couponType: 'photo_review', amount: 3000 },
        priority: 'normal',
        read: false,
        clicked: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
      },
      {
        id: 'notif-3',
        userId,
        type: 'points_earned',
        title: '💰 포인트 적립',
        body: '900 포인트가 적립되었습니다.',
        data: { amount: 900, orderId: 'order-2' },
        priority: 'low',
        read: true,
        clicked: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5시간 전
      },
      {
        id: 'notif-4',
        userId,
        type: 'order_completed',
        title: '✅ 주문 완료',
        body: '주문이 완료되었습니다. 맛있게 드세요!',
        data: { orderId: 'order-2', status: 'done' },
        priority: 'normal',
        read: true,
        clicked: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1일 전
      },
      {
        id: 'notif-5',
        userId,
        type: 'review_reminder',
        title: '✍️ 리뷰 작성',
        body: '오늘 식사는 어떠셨어요? 사진 리뷰 쿠폰이 기다려요.',
        data: { orderId: 'order-2' },
        priority: 'low',
        read: true,
        clicked: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2일 전
      },
      {
        id: 'notif-6',
        userId,
        type: 'promotion',
        title: '🎉 주말 특가!',
        body: '이번 주말만! 현풍닭칼국수 20% 할인',
        data: { promoCode: 'WEEKEND20' },
        priority: 'low',
        read: true,
        clicked: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
      },
    ];
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNotifications.slice(0, limit);
  }

  try {
    const { collection, query, where, orderBy, limit: firestoreLimit, getDocs } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limit)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      expiresAt: doc.data().expiresAt?.toDate(),
    })) as Notification[];
  } catch (error) {
    console.error('Failed to get notifications:', error);
    throw error;
  }
}

/**
 * 알림을 읽음으로 표시
 */
export async function markAsRead(notificationId: string): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Marking notification as read:', notificationId);
    return;
  }

  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true,
      readAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    throw error;
  }
}

/**
 * 모든 알림을 읽음으로 표시
 */
export async function markAllAsRead(userId: string): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Marking all notifications as read for user:', userId);
    return;
  }

  try {
    const { collection, query, where, getDocs, writeBatch, doc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    
    snapshot.docs.forEach((docSnapshot) => {
      batch.update(docSnapshot.ref, {
        read: true,
        readAt: new Date(),
      });
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
    throw error;
  }
}

/**
 * 알림 클릭 처리
 */
export async function markAsClicked(notificationId: string): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Marking notification as clicked:', notificationId);
    return;
  }

  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    await updateDoc(doc(db, 'notifications', notificationId), {
      clicked: true,
      clickedAt: new Date(),
      read: true, // 클릭 시 자동으로 읽음 처리
    });
  } catch (error) {
    console.error('Failed to mark notification as clicked:', error);
    throw error;
  }
}

/**
 * 알림 생성 (서버 전용 - Mock 시뮬레이션용)
 */
export async function createNotification(
  userId: string,
  type: NotificationType,
  customTitle?: string,
  customBody?: string,
  data?: Record<string, any>
): Promise<Notification> {
  const template = NOTIFICATION_TEMPLATES[type];
  
  const notification: Notification = {
    id: `notif-${Date.now()}`,
    userId,
    type,
    title: customTitle || template.title,
    body: customBody || template.body,
    data,
    priority: template.priority,
    read: false,
    clicked: false,
    createdAt: new Date(),
  };

  if (!USE_FIREBASE) {
    console.log('[Mock] Creating notification:', notification);
    
    // Mock: localStorage에 저장 (실제로는 서버에서 Firestore에 저장)
    const key = `notifications_${userId}`;
    const stored = localStorage.getItem(key);
    const notifications = stored ? JSON.parse(stored) : [];
    notifications.unshift(notification);
    localStorage.setItem(key, JSON.stringify(notifications.slice(0, 50))); // 최대 50개
    
    return notification;
  }

  try {
    const { collection, addDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...notification,
      createdAt: new Date(),
    });
    
    return {
      ...notification,
      id: docRef.id,
    };
  } catch (error) {
    console.error('Failed to create notification:', error);
    throw error;
  }
}

/**
 * 읽지 않은 알림 개수 조회
 */
export async function getUnreadCount(userId: string): Promise<number> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting unread count for user:', userId);
    
    const key = `notifications_${userId}`;
    const stored = localStorage.getItem(key);
    if (!stored) return 0;
    
    const notifications = JSON.parse(stored) as Notification[];
    return notifications.filter(n => !n.read).length;
  }

  try {
    const { collection, query, where, getCountFromServer } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error('Failed to get unread count:', error);
    return 0;
  }
}
