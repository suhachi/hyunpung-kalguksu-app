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
