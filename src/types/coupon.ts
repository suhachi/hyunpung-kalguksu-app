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
