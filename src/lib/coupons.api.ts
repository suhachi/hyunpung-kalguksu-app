/**
 * 쿠폰 API
 * USE_FIREBASE=false: Mock 데이터 반환
 * USE_FIREBASE=true: Firestore 연동
 */

import { Coupon, CouponFilters, CouponStats, CouponIssue, getCouponStatus } from '../types/coupon';

const USE_FIREBASE = false;

// Mock 데이터
let mockCoupons: Coupon[] = [
  {
    id: 'coupon-001',
    uid: 'user-001',
    type: 'photo_review',
    amount: 3000,
    minSpend: 10000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5일 전
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 25, // 25일 후
    used: false,
    title: '사진 리뷰 작성 감사 쿠폰',
    description: '10,000원 이상 주문 시 사용 가능',
  },
  {
    id: 'coupon-002',
    uid: 'user-001',
    type: 'welcome',
    amount: 5000,
    minSpend: 15000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10일 전
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 20, // 20일 후
    used: false,
    title: '신규 가입 축하 쿠폰',
    description: '15,000원 이상 주문 시 사용 가능',
  },
  {
    id: 'coupon-003',
    uid: 'user-001',
    type: 'event',
    amount: 2000,
    minSpend: 10000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 40, // 40일 전
    expiresAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10일 전 (만료됨)
    used: false,
    title: '이벤트 쿠폰',
    description: '만료됨',
  },
  {
    id: 'coupon-004',
    uid: 'user-001',
    type: 'admin',
    amount: 10000,
    minSpend: 20000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 15, // 15일 전
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 15, // 15일 후
    used: true,
    usedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    orderId: 'order-123',
    title: '고객 보상 쿠폰',
    description: '이미 사용됨',
  },
];

/**
 * 사용자 쿠폰 목록 조회
 */
export async function getCoupons(
  uid: string,
  filters: CouponFilters = {}
): Promise<Coupon[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = mockCoupons.filter(c => c.uid === uid);

  // 상태 필터
  if (filters.status) {
    filtered = filtered.filter(c => getCouponStatus(c) === filters.status);
  }

  // 타입 필터
  if (filters.type) {
    filtered = filtered.filter(c => c.type === filters.type);
  }

  // 정렬
  switch (filters.sortBy) {
    case 'issuedAt':
      filtered.sort((a, b) => b.issuedAt - a.issuedAt);
      break;
    case 'expiresAt':
      filtered.sort((a, b) => a.expiresAt - b.expiresAt);
      break;
    case 'amount':
      filtered.sort((a, b) => b.amount - a.amount);
      break;
    default:
      filtered.sort((a, b) => b.issuedAt - a.issuedAt);
  }

  return filtered;
}

/**
 * 사용 가능한 쿠폰만 조회 (결제 시)
 */
export async function getAvailableCoupons(
  uid: string,
  orderAmount: number
): Promise<Coupon[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return mockCoupons.filter(c =>
    c.uid === uid &&
    !c.used &&
    Date.now() <= c.expiresAt &&
    orderAmount >= c.minSpend
  );
}

/**
 * 쿠폰 사용
 */
export async function useCoupon(
  couponId: string,
  orderId: string
): Promise<Coupon> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  const coupon = mockCoupons.find(c => c.id === couponId);
  if (!coupon) {
    throw new Error('쿠폰을 찾을 수 없습니다');
  }

  if (coupon.used) {
    throw new Error('이미 사용된 쿠폰입니다');
  }

  if (Date.now() > coupon.expiresAt) {
    throw new Error('만료된 쿠폰입니다');
  }

  coupon.used = true;
  coupon.usedAt = Date.now();
  coupon.orderId = orderId;

  return coupon;
}

/**
 * 쿠폰 발급 (관리자)
 */
export async function issueCoupon(
  issue: CouponIssue,
  by: string,
  byName: string
): Promise<Coupon[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    // TODO: Functions로 발급 처리
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  const targetUsers = issue.targetUsers || ['user-001']; // Mock: 기본 사용자
  const expiresAt = Date.now() + issue.expiryDays * 24 * 60 * 60 * 1000;

  const issued: Coupon[] = targetUsers.slice(0, issue.issueLimit || 999).map((uid, index) => {
    const coupon: Coupon = {
      id: `coupon-${Date.now()}-${index}`,
      uid,
      type: issue.type,
      amount: issue.amount,
      minSpend: issue.minSpend,
      issuedAt: Date.now(),
      expiresAt,
      used: false,
      title: issue.title,
      description: issue.description,
    };
    mockCoupons.push(coupon);
    return coupon;
  });

  return issued;
}

/**
 * 쿠폰 통계 (관리자)
 */
export async function getCouponStats(): Promise<CouponStats> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));

  const stats: CouponStats = {
    totalIssued: mockCoupons.length,
    totalUsed: mockCoupons.filter(c => c.used).length,
    totalAmount: mockCoupons.filter(c => c.used).reduce((sum, c) => sum + c.amount, 0),
    expiredCount: mockCoupons.filter(c => !c.used && Date.now() > c.expiresAt).length,
  };

  return stats;
}

/**
 * 만료 처리 (스케줄러용)
 */
export async function expireCoupons(): Promise<number> {
  if (USE_FIREBASE) {
    // TODO: Cloud Functions Scheduler
    // TODO: 매일 04:00 실행
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  const expiredCount = mockCoupons.filter(
    c => !c.used && Date.now() > c.expiresAt
  ).length;

  return expiredCount;
}
