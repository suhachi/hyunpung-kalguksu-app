/**
 * 쿠폰 발급 유틸리티
 * 자동 쿠폰 발급 로직
 */

import * as admin from 'firebase-admin';

export interface IssueCouponParams {
  uid: string;
  amount: number;
  min: number;
  days: number;
  type: string;
  description?: string;
}

/**
 * 사용자에게 쿠폰 발급
 */
export async function issueCoupon(params: IssueCouponParams): Promise<string> {
  const { uid, amount, min, days, type, description } = params;
  
  const expiresAt = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  );

  const couponData = {
    userId: uid,
    type,
    amount,
    minOrderAmount: min,
    status: 'unused',
    issuedAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt,
    description: description || `${type} 쿠폰`,
  };

  const docRef = await admin.firestore().collection('coupons').add(couponData);
  
  console.log(`Coupon issued: ${docRef.id} for user ${uid}`);
  return docRef.id;
}

/**
 * 사진 리뷰 쿠폰 발급
 */
export async function issuePhotoReviewCoupon(uid: string): Promise<string> {
  return issueCoupon({
    uid,
    amount: 3000,
    min: 15000,
    days: 30,
    type: 'photo_review',
    description: '사진 리뷰 감사 쿠폰',
  });
}

/**
 * 첫 주문 쿠폰 발급
 */
export async function issueFirstOrderCoupon(uid: string): Promise<string> {
  return issueCoupon({
    uid,
    amount: 5000,
    min: 20000,
    days: 7,
    type: 'first_order',
    description: '첫 주문 환영 쿠폰',
  });
}

/**
 * 재구매 쿠폰 발급
 */
export async function issueRepeatOrderCoupon(uid: string): Promise<string> {
  return issueCoupon({
    uid,
    amount: 2000,
    min: 10000,
    days: 14,
    type: 'repeat_order',
    description: '단골 고객 감사 쿠폰',
  });
}
