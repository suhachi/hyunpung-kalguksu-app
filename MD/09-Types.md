# TYPES 파일들

총 12개 파일

## 153. src/types/analytics.ts

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

## 154. src/types/cart.ts

```typescript
export interface CartItem {
  menuId: string;
  menuName: string;
  menuImage: string;
  menuPrice: number;
  quantity: number;
  options: {
    noodle?: string;
    spicy?: string;
    toppings?: string[];
  };
  optionPrices: {
    noodle: number;
    toppings: number;
  };
  subtotal: number;
}

export type DeliveryType = 'delivery' | 'pickup';

export interface DeliveryAddress {
  address: string;
  detail: string;
  lat?: number;
  lng?: number;
}

export interface CartState {
  items: CartItem[];
  deliveryType: DeliveryType;
  deliveryAddress?: DeliveryAddress;
  requests?: string;
  couponId?: string;
  couponDiscount: number;
}

export interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (menuId: string) => void;
  updateQuantity: (menuId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryType: (type: DeliveryType) => void;
  setDeliveryAddress: (address: DeliveryAddress) => void;
  setRequests: (requests: string) => void;
  applyCoupon: (couponId: string, discount: number) => void;
  removeCoupon: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotalAmount: () => number;
}
```

## 155. src/types/coupon.ts

```typescript
// 쿠폰 시스템 타입 정의

export type CouponType = 'photo_review' | 'welcome' | 'event' | 'compensation' | 'admin';
export type CouponStatus = 'available' | 'used' | 'expired';

export interface Coupon {
  id?: string;
  uid: string;
  type: CouponType;
  amount: number; // 할인 금액 (원)
  minSpend: number; // 최소 주문 금액 (원)
  issuedAt: number;
  expiresAt: number;
  used: boolean;
  usedAt?: number;
  orderId?: string; // 사용된 주문 ID
  title?: string;
  description?: string;
}

export interface CouponStats {
  totalIssued: number;
  totalUsed: number;
  totalAmount: number;
  expiredCount: number;
}

// 관리자용 쿠폰 발급 데이터
export interface CouponIssue {
  type: CouponType;
  title: string;
  description: string;
  amount: number;
  minSpend: number;
  expiryDays: number; // 유효 기간 (일)
  targetUsers?: string[]; // 특정 사용자 타게팅
  issueLimit?: number; // 발급 상한
}

// 쿠폰 필터
export interface CouponFilters {
  status?: CouponStatus;
  type?: CouponType;
  sortBy?: 'issuedAt' | 'expiresAt' | 'amount';
}

// 쿠폰 타입 라벨
export const COUPON_TYPE_LABELS: Record<CouponType, string> = {
  photo_review: '사진 리뷰 보상',
  welcome: '신규 가입',
  event: '이벤트',
  compensation: '보상',
  admin: '관리자 발급',
};

// 쿠폰 상태 계산
export function getCouponStatus(coupon: Coupon): CouponStatus {
  if (coupon.used) {
    return 'used';
  }
  if (Date.now() > coupon.expiresAt) {
    return 'expired';
  }
  return 'available';
}
```

## 156. src/types/delivery.ts

```typescript
/**
 * 배달 추적 관련 타입 정의
 * Phase 3-1: GPS Tracking
 */

export interface Coordinates {
  lat: number;
  lng: number;
  at: number; // timestamp
}

export type DeliveryStatus = 
  | 'assigned'      // 배정됨
  | 'picked_up'     // 픽업 완료
  | 'delivering'    // 배달 중
  | 'completed'     // 배달 완료
  | 'canceled';     // 취소됨

export interface DeliveryTask {
  taskId: string;
  orderId: string;
  driverId?: string;
  status: DeliveryStatus;
  eta?: number; // 예상 도착 시간 (분)
  lastCoord?: Coordinates;
  createdAt: number;
  updatedAt: number;
}

export type DriverStatus = 
  | 'idle'          // 대기 중
  | 'assigned'      // 배정됨
  | 'delivering'    // 배달 중
  | 'offline';      // 오프라인

export interface Driver {
  driverId: string;
  name?: string;
  phone?: string;
  lastCoord?: Coordinates;
  status: DriverStatus;
}

export interface PickupLocation {
  addr: string;
  lat: number;
  lng: number;
}

export interface DropoffLocation {
  addr: string;
  lat: number;
  lng: number;
}

export interface CreateTaskParams {
  orderId: string;
  pickup: PickupLocation;
  dropoff: DropoffLocation;
}

export interface CreateTaskResult {
  taskId: string;
}

/**
 * 배달 대행사 Provider 인터페이스
 */
export interface DeliveryProvider {
  /**
   * 배달 태스크 생성
   */
  createTask(params: CreateTaskParams): Promise<CreateTaskResult>;
  
  /**
   * 배달 태스크 조회
   */
  getTask(taskId: string): Promise<DeliveryTask>;
  
  /**
   * 배달 태스크 취소
   */
  cancelTask(taskId: string): Promise<void>;
}

/**
 * Webhook 이벤트 타입
 */
export type WebhookEventType = 
  | 'task.created'
  | 'task.assigned'
  | 'task.picked_up'
  | 'task.delivering'
  | 'task.completed'
  | 'task.canceled'
  | 'driver.location';

export interface WebhookEvent {
  type: WebhookEventType;
  taskId: string;
  timestamp: number;
  data: {
    status?: DeliveryStatus;
    driverId?: string;
    location?: Coordinates;
    eta?: number;
  };
}
```

## 157. src/types/menu.ts

```typescript
export type MenuCategory = 
  | 'noodle'        // 칼국수/메인메뉴
  | 'set'           // 세트메뉴
  | 'side'          // 사이드메뉴
  | 'drink'         // 음료
  | 'alcohol';      // 주류

export type MenuBadge = 
  | 'best'      // 베스트
  | 'signature' // 시그니처
  | 'spicy'     // 매운맛
  | 'cold'      // 냉메뉴
  | 'seasonal'; // 계절메뉴

// 옵션 항목 (옵션명-수량-가격)
export interface OptionItem {
  id: string;
  name: string;       // 옵션 이름 (예: "보통", "곱빼기", "순한맛")
  quantity: number;   // 수량
  price: number;      // 추가 가격
}

// 옵션 그룹 (관리자가 생성)
export interface OptionGroup {
  id: string;
  name: string;           // 옵션 그룹 이름 (예: "면양", "맵기", "토핑")
  required: boolean;      // 필수 선택 여부
  multiSelect: boolean;   // 다중 선택 가능 여부
  maxSelect?: number;     // 최대 선택 개수 (multiSelect=true일 때)
  items: OptionItem[];    // 옵션 항목들
  order: number;          // 표시 순서
}

// 메뉴에 연결된 옵션 그룹
export interface MenuOptionGroup extends OptionGroup {
  // 메뉴별로 옵션 그룹을 커스터마이즈할 수 있도록
}

export interface Menu {
  menuId: string;
  category: MenuCategory;
  name: string;
  price: number;
  description: string;
  image: string;
  badges: MenuBadge[];
  options?: {               // 간단한 옵션 구조 (기존 호환성)
    noodle?: { label: string; price: number }[];
    spicy?: { label: string; price: number }[];
    toppings?: { label: string; price: number }[];
  };
  optionGroups?: MenuOptionGroup[];  // 이 메뉴에 적용된 옵션 그룹들 (고급)
  allergens: string[];      // 알레르기 유발 성분
  origin: string;           // 원산지
  isAvailable: boolean;     // 판매 가능 여부
  availableHours?: {        // 시간제 판매
    start: string;
    end: string;
  };
  order: number;            // 정렬 순서
}

export interface MenuItem extends Menu {
  selectedOptions?: {
    noodle?: string;
    spicy?: string;
    toppings?: string[];
  };
  quantity: number;
  subtotal: number;
}

// 관리자용 메뉴 필터
export interface MenuFilters {
  category?: MenuCategory | 'all';
  search?: string;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'order';
  availableOnly?: boolean;
}

// 메뉴 수정 로그
export interface MenuLog {
  id: string;
  menuId: string;
  field: string;
  oldValue: any;
  newValue: any;
  by: string;
  byName: string;
  at: Date;
  reason?: string;
}

// 메뉴 상태 (시간제 판매 고려)
export type MenuStatus = 
  | 'available'     // 판매 중
  | 'soldout'       // 품절
  | 'time-limited'  // 시간제 (현재 시간 밖)
  | 'hidden';       // 숨김

// 카테고리 라벨 맵
export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  noodle: '메인',
  set: '세트',
  side: '사이드',
  drink: '음료',
  alcohol: '주류',
};

// 배지 라벨 맵
export const BADGE_LABELS: Record<MenuBadge, string> = {
  best: '베스트',
  signature: '시그니처',
  spicy: '매운맛',
  cold: '냉메뉴',
  seasonal: '계절메뉴',
};
```

## 158. src/types/notification.ts

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

## 159. src/types/order.ts

```typescript
import type { Timestamp } from 'firebase/firestore';

export type OrderStatus = 
  | 'pending'    // 주문 접수 대기
  | 'accepted'   // 접수 확인
  | 'preparing'  // 조리 중
  | 'completed'  // 완료
  | 'canceled';  // 취소

export type PaymentMethod = 
  | 'card'        // 신용/체크카드
  | 'transfer'    // 계좌이체
  | 'easy_pay'    // 간편결제
  | 'on_site';    // 만나서 결제

export type PaymentStatus = 
  | 'pending'     // 결제 대기
  | 'authorized'  // 인증됨 (승인 전)
  | 'approved'    // 승인됨
  | 'failed'      // 실패
  | 'refunded';   // 환불

export interface OrderItem {
  menuId: string;
  menuName: string;
  menuImage: string;
  quantity: number;
  options: {
    noodle?: string;
    spicy?: string;
    toppings?: string[];
  };
  price: number;
  subtotal: number;
}

export interface DeliveryAddress {
  address: string;
  detail: string;
  lat?: number;
  lng?: number;
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  tid?: string;           // NICEPAY 거래 ID
  authToken?: string;     // 인증 토큰
  cardName?: string;      // 카드사명
  cardNum?: string;       // 카드번호 (마스킹)
  paidAt?: Timestamp;
  canceledAt?: Timestamp;
  cancelReason?: string;
  amount: number;
}

export interface Order {
  orderId: string;
  userId: string;
  storeId: string;
  
  items: OrderItem[];
  
  subtotal: number;
  discount: number;
  couponId?: string;
  deliveryFee: number;
  finalAmount: number;
  
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: DeliveryAddress;
  phone: string;
  email?: string;
  requests?: string;
  
  status: OrderStatus;
  payment: PaymentInfo;
  
  timeline: {
    pending?: Timestamp;
    accepted?: Timestamp;
    preparing?: Timestamp;
    completed?: Timestamp;
    canceled?: Timestamp;
  };
  
  // 현금영수증/세금계산서
  cashReceipt?: {
    type: 'personal' | 'business';
    number: string;
  };
  taxInvoice?: {
    businessNumber: string;
    companyName: string;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// 주문 로그 (감사 추적)
export interface OrderLog {
  logId: string;
  orderId: string;
  action: 'created' | 'status_changed' | 'canceled' | 'refunded' | 'note_added';
  by: string;           // userId or 'system'
  byName?: string;      // 사용자 이름
  at: Timestamp;
  from?: OrderStatus;
  to?: OrderStatus;
  reason?: string;      // 취소/환불 사유
  note?: string;        // 추가 메모
}

// 주문 상태 전이 가드
export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['accepted', 'canceled'],
  accepted: ['preparing', 'canceled'],
  preparing: ['completed', 'canceled'],
  completed: [],  // 완료 후 변경 불가
  canceled: [],   // 취소 후 변경 불가
};
```

## 160. src/types/payment.ts

```typescript
// NICEPAY 결제 요청 파라미터
export interface NicePayAuthRequest {
  MID: string;              // 상점 ID
  Amt: string;              // 결제 금액
  Moid: string;             // 주문번호 (orderId)
  GoodsName: string;        // 상품명
  BuyerName: string;        // 구매자명
  BuyerTel: string;         // 구매자 전화번호
  BuyerEmail: string;       // 구매자 이메일
  ReturnURL: string;        // 결제 결과 수신 URL
  VbankExpDate?: string;    // 가상계좌 입금마감일
  EdiDate: string;          // 전문 생성일시 (YYYYMMDDhhmmss)
  SignData: string;         // 해시값 (위변조 검증)
}

// NICEPAY 결제 승인 요청
export interface NicePayApproveRequest {
  TID: string;              // 거래 ID
  AuthToken: string;        // 인증 토큰
  Amt: string;              // 결제 금액
  MID: string;              // 상점 ID
  Moid: string;             // 주문번호
  SignData: string;         // 해시값
  EdiDate: string;          // 전문 생성일시
}

// NICEPAY 응답
export interface NicePayResponse {
  ResultCode: string;       // 결과코드 (0000: 성공)
  ResultMsg: string;        // 결과메시지
  TID?: string;             // 거래 ID
  Moid?: string;            // 주문번호
  Amt?: string;             // 결제 금액
  AuthToken?: string;       // 인증 토큰
  CardName?: string;        // 카드사명
  CardQuota?: string;       // 할부개월
  CardNum?: string;         // 카드번호 (마스킹)
  PayMethod?: string;       // 결제수단
  GoodsName?: string;       // 상품명
  BuyerName?: string;       // 구매자명
  BuyerTel?: string;        // 구매자 전화번호
  BuyerEmail?: string;      // 구매자 이메일
  AuthDate?: string;        // 승인일시
}

// NICEPAY 취소 요청
export interface NicePayCancelRequest {
  TID: string;              // 거래 ID
  MID: string;              // 상점 ID
  Moid: string;             // 주문번호
  CancelAmt: string;        // 취소 금액
  CancelMsg: string;        // 취소 사유
  PartialCancelCode?: string; // 부분취소 코드
  EdiDate: string;          // 전문 생성일시
  SignData: string;         // 해시값
}

// 클라이언트 결제 요청 데이터
export interface PaymentRequest {
  orderId: string;
  amount: number;
  goodsName: string;
  buyerName: string;
  buyerTel: string;
  buyerEmail: string;
}

// 결제 결과
export interface PaymentResult {
  success: boolean;
  orderId: string;
  tid?: string;
  amount?: number;
  resultCode?: string;
  resultMsg?: string;
  authToken?: string;
  cardName?: string;
  cardNum?: string;
}
```

## 161. src/types/points.ts

```typescript
/**
 * 포인트 리워드 시스템 타입 정의
 * Phase 3-3: Points System
 */

export type PointsTransactionType = 
  | 'earn'      // 적립
  | 'spend'     // 사용
  | 'expire'    // 만료
  | 'adjust';   // 관리자 조정

export type PointsRefKind = 
  | 'order'     // 주문
  | 'review'    // 리뷰
  | 'admin'     // 관리자
  | 'promotion'; // 프로모션

export interface PointsReference {
  kind: PointsRefKind;
  id: string;
}

/**
 * 포인트 원장 (불변)
 */
export interface PointsLedger {
  id: string;
  uid: string;
  type: PointsTransactionType;
  amount: number; // 양수: 증가, 음수: 감소
  ref?: PointsReference;
  at: number;
  note?: string;
  expiresAt?: number; // 만료 일시 (적립 시에만)
}

/**
 * 포인트 잔액 (캐시)
 */
export interface PointsBalance {
  uid: string;
  balance: number;
  updatedAt: number;
}

/**
 * 포인트 적립 요청
 */
export interface EarnPointsParams {
  uid: string;
  amount: number;
  ref: PointsReference;
  note?: string;
}

/**
 * 포인트 사용 요청
 */
export interface SpendPointsParams {
  uid: string;
  amount: number;
  ref: PointsReference;
  note?: string;
}

/**
 * 포인트 정책
 */
export interface PointsPolicy {
  // 적립률 (주문 금액의 %)
  earnRate: number; // 0.03 = 3%
  
  // 최소 사용 금액
  minUse: number; // 1000 = 1,000원부터 사용 가능
  
  // 만료 기간 (일)
  expireDays: number; // 365 = 1년
  
  // 리뷰 사진 추가 적립
  reviewPhotoBonus: number; // 200 = 200포인트
  
  // 리뷰 텍스트 기본 적립
  reviewTextBonus: number; // 100 = 100포인트
}

/**
 * 포인트 내역 조회 결과
 */
export interface PointsHistory {
  ledger: PointsLedger[];
  balance: number;
  expiringPoints: {
    amount: number;
    expiresAt: number;
  }[];
}
```

## 162. src/types/review.ts

```typescript
// 리뷰 시스템 타입 정의

export interface Review {
  id?: string;
  storeId: string;
  orderId: string;
  uid: string;
  userName?: string;
  rating: number; // 1-5
  text: string;
  photos: string[]; // Storage download URLs
  hasPhoto: boolean;
  createdAt: number;
  reply?: ReviewReply;
  rewardIssued: boolean;
  reportedCount?: number; // 신고 횟수
  isHidden?: boolean; // 관리자가 숨김 처리
}

export interface ReviewReply {
  text: string;
  by: string; // 답글 작성자 (관리자/사장님)
  at: number; // timestamp
}

export interface ReviewFormData {
  rating: number;
  text: string;
  photos: File[];
}

export interface ReviewStats {
  totalCount: number;
  averageRating: number;
  photoCount: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export type ReviewSortOption = 'latest' | 'rating_high' | 'rating_low';

export interface ReviewFilters {
  storeId: string;
  photoOnly?: boolean;
  minRating?: number;
  sortBy?: ReviewSortOption;
  reported?: boolean; // 신고된 리뷰만
}

// 리뷰 신고
export interface ReviewReport {
  id?: string;
  reviewId: string;
  reportedBy: string; // uid
  reason: ReviewReportReason;
  description?: string;
  createdAt: number;
}

export type ReviewReportReason = 'spam' | 'abuse' | 'advertisement' | 'other';

export const REPORT_REASON_LABELS: Record<ReviewReportReason, string> = {
  spam: '스팸',
  abuse: '욕설/비방',
  advertisement: '광고',
  other: '기타',
};
```

## 163. src/types/settings.ts

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

## 164. src/types/support.ts

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

