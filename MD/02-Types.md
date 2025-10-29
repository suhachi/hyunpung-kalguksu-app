# 타입 정의 파일들

## menu.ts

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

## cart.ts

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

## order.ts

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

## coupon.ts

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

## review.ts

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

## payment.ts

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
  GoodsName?: string;        // 상품명
  BuyerName?: string;        // 구매자명
  BuyerTel?: string;        // 구매자 전화번호
  BuyerEmail?: string;       // 구매자 이메일
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

## delivery.ts

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

## points.ts

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


