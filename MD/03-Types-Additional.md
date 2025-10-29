# 타입 정의 파일들 (추가)

## analytics.ts

```typescript
/**
 * 통합 리포트 및 분석 타입 정의
 * Phase 3-7: 통합 리포트
 */

// 기간 타입
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'custom';

// 날짜 범위
export interface DateRange {
  start: Date;
  end: Date;
}

// 통합 KPI 데이터
export interface IntegratedKPI {
  // 매출 지표
  totalSales: number;
  averageOrderValue: number;
  totalOrders: number;
  
  // 고객 지표
  newCustomers: number;
  returningCustomers: number;
  customerRetentionRate: number; // %
  
  // 평점 지표
  averageRating: number;
  totalReviews: number;
  photoReviewRate: number; // %
  
  // 포인트 지표
  totalPointsEarned: number;
  totalPointsSpent: number;
  pointsRedemptionRate: number; // %
  
  // 쿠폰 지표
  totalCouponsIssued: number;
  totalCouponsUsed: number;
  couponUsageRate: number; // %
  totalDiscount: number;
  
  // 전환율 지표
  installRate: number; // A2HS 설치율 %
  cartConversionRate: number; // 장바구니 → 주문 전환율 %
  paymentSuccessRate: number; // 결제 성공률 %
}

// 시간대별 주문 분석
export interface HourlyAnalysis {
  hour: number;
  orders: number;
  sales: number;
  averageOrderValue: number;
}

// 요일별 분석
export interface DayOfWeekAnalysis {
  dayOfWeek: number; // 0 (일) ~ 6 (토)
  dayName: string;
  orders: number;
  sales: number;
  averageOrderValue: number;
}

// 메뉴별 성과
export interface MenuPerformance {
  menuId: string;
  menuName: string;
  category: string;
  totalOrders: number;
  totalSales: number;
  averageRating: number;
  reviewCount: number;
}

// 고객 행동 분석
export interface CustomerBehavior {
  userId: string;
  userName: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: Date;
  favoriteMenu: string;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'vip';
}

// 쿠폰 효과 분석
export interface CouponEffectiveness {
  couponType: string;
  totalIssued: number;
  totalUsed: number;
  usageRate: number; // %
  totalDiscount: number;
  averageOrderIncrease: number; // 쿠폰 사용 시 평균 주문 증가액
  roi: number; // 투자 대비 수익률
}

// 포인트 효과 분석
export interface PointsEffectiveness {
  totalEarned: number;
  totalSpent: number;
  totalExpired: number;
  activeUsers: number;
  averageBalance: number;
  redemptionRate: number; // %
  orderIncreaseWithPoints: number; // 포인트 사용 시 평균 주문 증가액
}

// 리뷰 분석
export interface ReviewAnalysis {
  totalReviews: number;
  averageRating: number;
  photoReviewCount: number;
  photoReviewRate: number; // %
  sentimentScore: number; // 감성 분석 점수 (1-5)
  topKeywords: Array<{ keyword: string; count: number }>;
  responseRate: number; // 답글 작성률 %
  responseTime: number; // 평균 답글 시간 (분)
}

// 배달 성과
export interface DeliveryPerformance {
  totalDeliveries: number;
  averageDeliveryTime: number; // 분
  onTimeRate: number; // 정시 배달률 %
  delayedOrders: number;
  averageDistance: number; // km
}

// 알림 효과
export interface NotificationEffectiveness {
  totalSent: number;
  totalRead: number;
  totalClicked: number;
  readRate: number; // %
  clickRate: number; // %
  conversionRate: number; // 알림 클릭 → 주문 전환율 %
  byType: Record<string, {
    sent: number;
    read: number;
    clicked: number;
  }>;
}

// 통합 리포트
export interface IntegratedReport {
  period: ReportPeriod;
  dateRange: DateRange;
  generatedAt: Date;
  
  kpi: IntegratedKPI;
  hourlyAnalysis: HourlyAnalysis[];
  dayOfWeekAnalysis: DayOfWeekAnalysis[];
  topMenus: MenuPerformance[];
  topCustomers: CustomerBehavior[];
  
  couponEffectiveness: CouponEffectiveness[];
  pointsEffectiveness: PointsEffectiveness;
  reviewAnalysis: ReviewAnalysis;
  deliveryPerformance: DeliveryPerformance;
  notificationEffectiveness: NotificationEffectiveness;
  
  // 추가 지표
  insights: string[]; // AI 인사이트 (선택)
  recommendations: string[]; // 개선 제안
}

// 차트 데이터 타입
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }>;
}

// 내보내기 형식
export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';

// 리포트 설정
export interface ReportSettings {
  autoGenerate: boolean; // 자동 생성 여부
  frequency: 'daily' | 'weekly' | 'monthly';
  emailRecipients: string[]; // 이메일 수신자
  includeCharts: boolean; // 차트 포함 여부
  format: ExportFormat;
}
```

## notification.ts

```typescript
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
```

## settings.ts

```typescript
/**
 * 관리자 설정 타입
 */

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface BusinessHours {
  day: DayOfWeek;
  isOpen: boolean;
  openTime: string;   // "09:00"
  closeTime: string;  // "22:00"
}

export interface DeliveryFee {
  minDistance: number;  // km
  maxDistance: number;  // km
  fee: number;          // 원
}

export interface StoreSettings {
  storeId: string;
  
  // 영업시간
  businessHours: BusinessHours[];
  
  // 배달 설정
  deliveryFees: DeliveryFee[];
  deliveryRadius: number;     // 최대 배달 반경 (km)
  minDeliveryOrder: number;   // 최소 배달 주문 금액 (원)
  
  // 포장 설정
  minPickupOrder: number;     // 최소 포장 주문 금액 (원)
  
  // 휴무일
  holidays: string[];         // ["2025-01-01", "2025-02-09"]
  
  // 업데이트 정보
  updatedAt: Date;
  updatedBy: string;
  updatedByName: string;
}

export const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: '월요일',
  tue: '화요일',
  wed: '수요일',
  thu: '목요일',
  fri: '금요일',
  sat: '토요일',
  sun: '일요일',
};

export const DEFAULT_BUSINESS_HOURS: BusinessHours[] = [
  { day: 'mon', isOpen: true, openTime: '10:00', closeTime: '22:00' },
  { day: 'tue', isOpen: true, openTime: '10:00', closeTime: '22:00' },
  { day: 'wed', isOpen: true, openTime: '10:00', closeTime: '22:00' },
  { day: 'thu', isOpen: true, openTime: '10:00', closeTime: '22:00' },
  { day: 'fri', isOpen: true, openTime: '10:00', closeTime: '22:00' },
  { day: 'sat', isOpen: true, openTime: '10:00', closeTime: '22:00' },
  { day: 'sun', isOpen: true, openTime: '10:00', closeTime: '22:00' },
];

export const DEFAULT_DELIVERY_FEES: DeliveryFee[] = [
  { minDistance: 0, maxDistance: 2, fee: 3000 },
  { minDistance: 2, maxDistance: 4, fee: 4000 },
  { minDistance: 4, maxDistance: 6, fee: 5000 },
];
```

## support.ts

```typescript
/**
 * 고객센터 채팅 관련 타입 정의
 * Phase 3-2: Support Chat
 */

export interface ChatSession {
  id: string;
  userId: string;
  userName?: string;
  userPhone?: string;
  open: boolean;
  lastAt: number;
  lastMessage?: string;
  assignedTo?: string; // 담당 관리자 UID
  createdAt: number;
  updatedAt: number;
}

export type MessageSender = 'user' | 'admin' | 'bot';

export type MessageType = 'text' | 'image';

export interface ChatMessage {
  id: string;
  sessionId: string;
  from: MessageSender;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  at: number;
  readByAdmin?: boolean;
  readByUser?: boolean;
}

export interface SendMessageParams {
  sessionId: string;
  from: MessageSender;
  type: MessageType;
  text?: string;
  imageUrl?: string;
}

/**
 * 운영 시간 체크
 */
export interface BusinessHours {
  start: string; // "09:00"
  end: string;   // "21:00"
}

export interface AutoReply {
  enabled: boolean;
  message: string;
  businessHours: BusinessHours;
}
```


