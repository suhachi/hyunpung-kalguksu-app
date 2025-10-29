/**
 * FCM (Firebase Cloud Messaging) 클라이언트
 * 푸시 알림 권한 요청 및 토큰 관리
 * Phase 3-6: 푸시 알림 시스템
 */

import { USE_FIREBASE } from '../config/env';
import type { NotificationSettings } from '../types/notification';

/**
 * FCM 권한 요청 및 토큰 저장
 */
export async function requestNotificationPermission(
  userId: string
): Promise<string | null> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Notification permission requested for user:', userId);
    
    // Mock: localStorage에 권한 상태 저장
    localStorage.setItem('notification_permission', 'granted');
    const mockToken = `mock-fcm-token-${userId}-${Date.now()}`;
    localStorage.setItem('fcm_token', mockToken);
    
    return mockToken;
  }

  try {
    // 브라우저 알림 권한 요청
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Firebase Messaging 설정
    const { getToken } = await import('firebase/messaging');
    const { messaging } = await import('./firebase');
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    // Firestore에 토큰 저장
    const { doc, setDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    await setDoc(
      doc(db, `users/${userId}/meta/fcm`),
      {
        token,
        platform: 'web',
        updatedAt: new Date(),
      },
      { merge: true }
    );

    return token;
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
}

/**
 * 포그라운드 메시지 리스너 설정
 */
export async function setupForegroundMessageListener(
  onMessage: (payload: any) => void
): Promise<(() => void) | null> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Foreground message listener setup');
    
    // Mock: 개발 환경에서 테스트 알림 시뮬레이션
    if (import.meta.env.MODE === 'development') {
      // 10초마다 Mock 알림 생성 (테스트용)
      const interval = setInterval(() => {
        const mockMessages = [
          {
            notification: {
              title: '🚚 배달 출발',
              body: '주문하신 메뉴가 배달을 시작했습니다.',
            },
            data: { type: 'order_delivering', orderId: 'mock-order-1' },
          },
          {
            notification: {
              title: '🎁 쿠폰 발급',
              body: '감사 쿠폰이 발급되었습니다!',
            },
            data: { type: 'coupon_issued' },
          },
        ];
        
        // 랜덤하게 가끔 알림 발송 (20% 확률)
        if (Math.random() < 0.2) {
          const mockMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
          console.log('[Mock] Foreground message:', mockMessage);
          onMessage(mockMessage);
        }
      }, 10000);
      
      return () => clearInterval(interval);
    }
    
    return null;
  }

  try {
    const { onMessage: onFCMMessage } = await import('firebase/messaging');
    const { messaging } = await import('./firebase');
    const unsubscribe = onFCMMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      onMessage(payload);
    });
    return unsubscribe;
  } catch (error) {
    console.error('Failed to setup message listener:', error);
    return null;
  }
}

/**
 * 알림 권한 상태 확인
 */
export function checkNotificationPermission(): NotificationPermission | null {
  if (!('Notification' in window)) {
    return null;
  }

  return Notification.permission;
}

/**
 * 알림 권한이 있는지 확인
 */
export function hasNotificationPermission(): boolean {
  return checkNotificationPermission() === 'granted';
}

/**
 * 브라우저가 알림을 지원하는지 확인
 */
export function isNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

/**
 * 알림 설정 저장
 */
export async function saveNotificationSettings(
  userId: string,
  settings: NotificationSettings
): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Saving notification settings:', settings);
    localStorage.setItem(`notification_settings_${userId}`, JSON.stringify(settings));
    return;
  }

  try {
    const { doc, setDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    await setDoc(
      doc(db, `users/${userId}/settings/notifications`),
      {
        ...settings,
        updatedAt: new Date(),
      }
    );
  } catch (error) {
    console.error('Failed to save notification settings:', error);
    throw error;
  }
}

/**
 * 알림 설정 조회
 */
export async function getNotificationSettings(
  userId: string
): Promise<NotificationSettings> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting notification settings');
    const stored = localStorage.getItem(`notification_settings_${userId}`);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    // 기본 설정
    return {
      userId,
      enabled: true,
      orderUpdates: true,
      promotions: true,
      reviews: true,
      points: true,
      sound: true,
      vibration: true,
      updatedAt: new Date(),
    };
  }

  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const docSnap = await getDoc(doc(db, `users/${userId}/settings/notifications`));
    
    if (docSnap.exists()) {
      return docSnap.data() as NotificationSettings;
    }
    
    // 기본 설정 반환
    return {
      userId,
      enabled: true,
      orderUpdates: true,
      promotions: true,
      reviews: true,
      points: true,
      sound: true,
      vibration: true,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Failed to get notification settings:', error);
    throw error;
  }
}

/**
 * 테스트 푸시 알림 전송 (Mock 전용)
 */
export function sendTestNotification(): void {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return;
  }

  new Notification('현풍닭칼국수', {
    body: '테스트 알림입니다 🍜',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'test-notification',
    requireInteraction: false,
  });
}
