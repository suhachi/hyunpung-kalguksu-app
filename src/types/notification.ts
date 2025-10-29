/**
 * 알림(Notification) 타입 정의
 * Phase 3-6: 푸시 알림 시스템
 */

// 알림 타입
export type NotificationType =
  | 'order_received' // 주문 접수
  | 'order_cooking' // 조리 시작
  | 'order_ready' // 조리 완료 (픽업 준비)
  | 'order_delivering' // 배달 시작
  | 'order_completed' // 주문 완료
  | 'order_cancelled' // 주문 취소
  | 'coupon_issued' // 쿠폰 발급
  | 'points_earned' // 포인트 적립
  | 'review_reminder' // 리뷰 작성 요청
  | 'review_reply' // 리뷰 답글
  | 'promotion' // 프로모션/이벤트
  | 'system'; // 시스템 공지

// 알림 우선순위
export type NotificationPriority = 'high' | 'normal' | 'low';

// 알림 데이터
export interface Notification {
  id: string;
  userId: string; // 수신자 UID (빈 문자열이면 전체 발송)
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>; // 추가 데이터 (orderId, couponId 등)
  priority: NotificationPriority;
  read: boolean;
  clicked: boolean;
  createdAt: Date;
  expiresAt?: Date; // 만료일 (선택)
}

// 알림 설정
export interface NotificationSettings {
  userId: string;
  enabled: boolean; // 전체 알림 활성화
  orderUpdates: boolean; // 주문 상태 알림
  promotions: boolean; // 프로모션/이벤트 알림
  reviews: boolean; // 리뷰 관련 알림
  points: boolean; // 포인트 관련 알림
  sound: boolean; // 알림음
  vibration: boolean; // 진동
  updatedAt: Date;
}

// 푸시 메시지 페이로드
export interface PushPayload {
  notification?: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    image?: string;
    tag?: string;
    requireInteraction?: boolean;
  };
  data?: Record<string, string>;
}

// FCM 토큰
export interface FCMToken {
  userId: string;
  token: string;
  platform: 'web' | 'android' | 'ios';
  createdAt: Date;
  updatedAt: Date;
}

// 알림 템플릿
export interface NotificationTemplate {
  type: NotificationType;
  title: string;
  body: string;
  priority: NotificationPriority;
  data?: Record<string, any>;
}

// 알림 통계
export interface NotificationStats {
  totalSent: number;
  totalRead: number;
  totalClicked: number;
  readRate: number; // 읽은 비율 (%)
  clickRate: number; // 클릭 비율 (%)
  byType: Record<NotificationType, number>;
}
