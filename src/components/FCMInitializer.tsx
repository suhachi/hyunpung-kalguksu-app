/**
 * FCM 초기화 컴포넌트
 * App.tsx에서 사용하여 앱 시작 시 FCM 토큰 요청 및 메시지 리스너 설정
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { requestNotificationPermission, setupForegroundMessageListener } from '../lib/fcm';
import { toast } from 'sonner';
import { USE_FIREBASE } from '../config/env';

export function FCMInitializer() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!USE_FIREBASE) {
      console.log('[FCMInitializer] Firebase not enabled, skipping FCM setup');
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    // 인증 상태 변경 감지
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log('[FCMInitializer] User not authenticated, skipping FCM setup');
        return;
      }

      try {
        // FCM 토큰 요청 (권한 포함)
        const token = await requestNotificationPermission(user.uid);
        if (token) {
          console.log('[FCMInitializer] FCM token obtained:', token.substring(0, 20) + '...');
        } else {
          console.log('[FCMInitializer] FCM token not available (permission denied or not supported)');
        }

        // 포그라운드 메시지 리스너 설정
        const unsubscribeMessage = await setupForegroundMessageListener((payload) => {
          console.log('[FCMInitializer] Message received:', payload);
          
          // 알림 표시 (브라우저 알림 API 사용)
          if (payload.notification) {
            const title = payload.notification.title || '알림';
            const body = payload.notification.body || '';
            const icon = payload.notification.icon || '/icons/icon-192x192.png';
            
            // 브라우저 알림 생성
            if ('Notification' in window && Notification.permission === 'granted') {
              const notification = new Notification(title, {
                body,
                icon,
                badge: '/icons/badge-72x72.png',
                tag: payload.data?.type || 'notification',
                requireInteraction: false,
              });

              // 클릭 시 딥링크 이동
              notification.onclick = () => {
                window.focus();
                if (payload.data?.deepLink) {
                  navigate(payload.data.deepLink);
                } else if (payload.data?.orderId) {
                  navigate(`/orders/${payload.data.orderId}`);
                }
                notification.close();
              };
            }

            // Toast 알림도 표시 (포트레이트 모드 대비)
            toast.info(title, {
              description: body,
              action: payload.data?.deepLink
                ? {
                    label: '보기',
                    onClick: () => {
                      if (payload.data?.deepLink) {
                        navigate(payload.data.deepLink);
                      } else if (payload.data?.orderId) {
                        navigate(`/orders/${payload.data.orderId}`);
                      }
                    },
                  }
                : undefined,
            });
          }
        });

        // Cleanup 함수 반환
        return () => {
          unsubscribeMessage?.();
        };
      } catch (error) {
        console.error('[FCMInitializer] Failed to setup FCM:', error);
      }
    });

    // Cleanup
    return () => {
      unsubscribeAuth();
    };
  }, [navigate]);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}

