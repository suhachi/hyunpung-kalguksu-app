/**
 * 포인트 리워드 시스템 API
 * Phase 3-3: Points System
 * 
 * Mock/Firebase 전환 가능
 */

import { USE_FIREBASE, FEATURE_FLAGS } from '../config/env';
import type {
  PointsLedger,
  PointsBalance,
  PointsHistory,
  EarnPointsParams,
  SpendPointsParams,
  PointsPolicy,
  PointsTransactionType,
} from '../types/points';

/**
 * 포인트 정책 (환경 변수 기반)
 */
export const POINTS_POLICY: PointsPolicy = {
  earnRate: FEATURE_FLAGS.pointsRate,
  minUse: FEATURE_FLAGS.pointsMinUse,
  expireDays: FEATURE_FLAGS.pointsExpireDays,
  reviewPhotoBonus: 200,
  reviewTextBonus: 100,
};

/**
 * 만료일 계산
 */
function calculateExpiryDate(): number {
  return Date.now() + (POINTS_POLICY.expireDays * 24 * 60 * 60 * 1000);
}

// ============================================================================
// Mock 구현 (localStorage)
// ============================================================================

const STORAGE_KEY_LEDGER = 'points_ledger';
const STORAGE_KEY_BALANCE = 'points_balance';

/**
 * Mock: 포인트 원장 저장
 */
function mockSaveLedger(ledger: PointsLedger[]): void {
  localStorage.setItem(STORAGE_KEY_LEDGER, JSON.stringify(ledger));
}

/**
 * Mock: 포인트 원장 로드
 */
function mockLoadLedger(): PointsLedger[] {
  const data = localStorage.getItem(STORAGE_KEY_LEDGER);
  return data ? JSON.parse(data) : [];
}

/**
 * Mock: 잔액 저장
 */
function mockSaveBalance(balances: Record<string, PointsBalance>): void {
  localStorage.setItem(STORAGE_KEY_BALANCE, JSON.stringify(balances));
}

/**
 * Mock: 잔액 로드
 */
function mockLoadBalance(): Record<string, PointsBalance> {
  const data = localStorage.getItem(STORAGE_KEY_BALANCE);
  return data ? JSON.parse(data) : {};
}

/**
 * Mock: 포인트 적립
 */
async function mockEarnPoints(params: EarnPointsParams): Promise<PointsLedger> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();

  // 새 원장 생성
  const newEntry: PointsLedger = {
    id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uid: params.uid,
    type: 'earn',
    amount: params.amount,
    ref: params.ref,
    note: params.note,
    at: Date.now(),
    expiresAt: calculateExpiryDate(),
  };

  // 원장 추가
  ledger.push(newEntry);
  mockSaveLedger(ledger);

  // 잔액 업데이트
  const currentBalance = balances[params.uid]?.balance || 0;
  balances[params.uid] = {
    uid: params.uid,
    balance: currentBalance + params.amount,
    updatedAt: Date.now(),
  };
  mockSaveBalance(balances);

  console.log(`[Points Mock] Earned ${params.amount} points for ${params.uid}`);
  return newEntry;
}

/**
 * Mock: 포인트 사용
 */
async function mockSpendPoints(params: SpendPointsParams): Promise<PointsLedger> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();

  const currentBalance = balances[params.uid]?.balance || 0;

  // 잔액 부족 체크
  if (currentBalance < params.amount) {
    throw new Error('포인트 잔액이 부족합니다');
  }

  // 최소 사용 금액 체크
  if (params.amount < POINTS_POLICY.minUse) {
    throw new Error(`최소 ${POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능합니다`);
  }

  // 새 원장 생성 (음수로 기록)
  const newEntry: PointsLedger = {
    id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uid: params.uid,
    type: 'spend',
    amount: -params.amount,
    ref: params.ref,
    note: params.note,
    at: Date.now(),
  };

  // 원장 추가
  ledger.push(newEntry);
  mockSaveLedger(ledger);

  // 잔액 업데이트
  balances[params.uid] = {
    uid: params.uid,
    balance: currentBalance - params.amount,
    updatedAt: Date.now(),
  };
  mockSaveBalance(balances);

  console.log(`[Points Mock] Spent ${params.amount} points for ${params.uid}`);
  return newEntry;
}

/**
 * Mock: 포인트 잔액 조회
 */
async function mockGetBalance(uid: string): Promise<number> {
  const balances = mockLoadBalance();
  return balances[uid]?.balance || 0;
}

/**
 * Mock: 포인트 내역 조회
 */
async function mockGetHistory(uid: string): Promise<PointsHistory> {
  const ledger = mockLoadLedger();
  const userLedger = ledger
    .filter((entry) => entry.uid === uid)
    .sort((a, b) => b.at - a.at);

  const balance = await mockGetBalance(uid);

  // 만료 예정 포인트 계산
  const now = Date.now();
  const expiringMap = new Map<number, number>();

  userLedger
    .filter((entry) => entry.type === 'earn' && entry.expiresAt && entry.expiresAt > now)
    .forEach((entry) => {
      if (entry.expiresAt) {
        const existing = expiringMap.get(entry.expiresAt) || 0;
        expiringMap.set(entry.expiresAt, existing + entry.amount);
      }
    });

  const expiringPoints = Array.from(expiringMap.entries())
    .map(([expiresAt, amount]) => ({ amount, expiresAt }))
    .sort((a, b) => a.expiresAt - b.expiresAt);

  return {
    ledger: userLedger,
    balance,
    expiringPoints,
  };
}

/**
 * Mock: 만료된 포인트 처리
 */
async function mockExpirePoints(): Promise<void> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();
  const now = Date.now();

  // 만료 대상 찾기
  const toExpire = ledger.filter(
    (entry) =>
      entry.type === 'earn' &&
      entry.expiresAt &&
      entry.expiresAt <= now &&
      !ledger.some((e) => e.ref?.kind === 'admin' && e.ref?.id === entry.id)
  );

  if (toExpire.length === 0) {
    return;
  }

  // 만료 원장 생성
  toExpire.forEach((entry) => {
    const expireEntry: PointsLedger = {
      id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      uid: entry.uid,
      type: 'expire',
      amount: -entry.amount,
      ref: {
        kind: 'admin',
        id: entry.id,
      },
      note: '포인트 만료',
      at: now,
    };

    ledger.push(expireEntry);

    // 잔액 차감
    if (balances[entry.uid]) {
      balances[entry.uid].balance -= entry.amount;
      balances[entry.uid].updatedAt = now;
    }
  });

  mockSaveLedger(ledger);
  mockSaveBalance(balances);

  console.log(`[Points Mock] Expired ${toExpire.length} point entries`);
}

/**
 * Mock: 관리자 포인트 조정
 */
async function mockAdjustPoints(
  uid: string,
  amount: number,
  note: string
): Promise<PointsLedger> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();

  const newEntry: PointsLedger = {
    id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uid,
    type: 'adjust',
    amount,
    ref: {
      kind: 'admin',
      id: 'admin_adjust',
    },
    note,
    at: Date.now(),
    expiresAt: amount > 0 ? calculateExpiryDate() : undefined,
  };

  ledger.push(newEntry);
  mockSaveLedger(ledger);

  const currentBalance = balances[uid]?.balance || 0;
  balances[uid] = {
    uid,
    balance: currentBalance + amount,
    updatedAt: Date.now(),
  };
  mockSaveBalance(balances);

  console.log(`[Points Mock] Adjusted ${amount} points for ${uid}`);
  return newEntry;
}

/**
 * Mock: 모든 사용자 포인트 조회 (관리자)
 */
async function mockGetAllBalances(): Promise<
  Array<PointsBalance & { phone?: string; name?: string }>
> {
  const balances = mockLoadBalance();
  
  return Object.values(balances).map((balance) => ({
    ...balance,
    phone: `010-****-****`, // Mock 데이터
    name: `사용자${balance.uid.slice(-4)}`,
  }));
}

// ============================================================================
// Firebase 구현 (TODO)
// ============================================================================

async function firebaseEarnPoints(params: EarnPointsParams): Promise<PointsLedger> {
  // TODO: Firestore에 원장 추가 및 잔액 업데이트
  throw new Error('Firebase points not implemented yet');
}

async function firebaseSpendPoints(params: SpendPointsParams): Promise<PointsLedger> {
  // TODO: Firestore에서 트랜잭션으로 처리
  throw new Error('Firebase points not implemented yet');
}

async function firebaseGetBalance(uid: string): Promise<number> {
  // TODO: Firestore에서 잔액 조회
  throw new Error('Firebase points not implemented yet');
}

async function firebaseGetHistory(uid: string): Promise<PointsHistory> {
  // TODO: Firestore에서 원장 조회
  throw new Error('Firebase points not implemented yet');
}

async function firebaseExpirePoints(): Promise<void> {
  // TODO: Cloud Function으로 스케줄링
  throw new Error('Firebase points not implemented yet');
}

async function firebaseAdjustPoints(
  uid: string,
  amount: number,
  note: string
): Promise<PointsLedger> {
  // TODO: Firestore에 관리자 조정 기록
  throw new Error('Firebase points not implemented yet');
}

async function firebaseGetAllBalances(): Promise<
  Array<PointsBalance & { phone?: string; name?: string }>
> {
  // TODO: Firestore에서 모든 잔액 조회
  throw new Error('Firebase points not implemented yet');
}

// ============================================================================
// Public API (Mock/Firebase 전환)
// ============================================================================

/**
 * 포인트 적립
 */
export async function earnPoints(params: EarnPointsParams): Promise<PointsLedger> {
  if (!FEATURE_FLAGS.points) {
    throw new Error('포인트 기능이 비활성화되어 있습니다');
  }

  return USE_FIREBASE ? firebaseEarnPoints(params) : mockEarnPoints(params);
}

/**
 * 포인트 사용
 */
export async function spendPoints(params: SpendPointsParams): Promise<PointsLedger> {
  if (!FEATURE_FLAGS.points) {
    throw new Error('포인트 기능이 비활성화되어 있습니다');
  }

  return USE_FIREBASE ? firebaseSpendPoints(params) : mockSpendPoints(params);
}

/**
 * 포인트 잔액 조회
 */
export async function getPointsBalance(uid: string): Promise<number> {
  if (!FEATURE_FLAGS.points) {
    return 0;
  }

  return USE_FIREBASE ? firebaseGetBalance(uid) : mockGetBalance(uid);
}

/**
 * 포인트 내역 조회
 */
export async function getPointsHistory(uid: string): Promise<PointsHistory> {
  if (!FEATURE_FLAGS.points) {
    return { ledger: [], balance: 0, expiringPoints: [] };
  }

  return USE_FIREBASE ? firebaseGetHistory(uid) : mockGetHistory(uid);
}

/**
 * 만료된 포인트 처리 (크론잡)
 */
export async function expirePoints(): Promise<void> {
  if (!FEATURE_FLAGS.points) {
    return;
  }

  return USE_FIREBASE ? firebaseExpirePoints() : mockExpirePoints();
}

/**
 * 관리자: 포인트 조정
 */
export async function adjustPoints(
  uid: string,
  amount: number,
  note: string
): Promise<PointsLedger> {
  if (!FEATURE_FLAGS.points) {
    throw new Error('포인트 기능이 비활성화되어 있습니다');
  }

  return USE_FIREBASE
    ? firebaseAdjustPoints(uid, amount, note)
    : mockAdjustPoints(uid, amount, note);
}

/**
 * 관리자: 모든 사용자 포인트 조회
 */
export async function getAllPointsBalances(): Promise<
  Array<PointsBalance & { phone?: string; name?: string }>
> {
  if (!FEATURE_FLAGS.points) {
    return [];
  }

  return USE_FIREBASE ? firebaseGetAllBalances() : mockGetAllBalances();
}

/**
 * 주문 금액에 따른 적립 포인트 계산
 */
export function calculateEarnPoints(orderAmount: number): number {
  return Math.floor(orderAmount * POINTS_POLICY.earnRate);
}

/**
 * 리뷰 작성 시 적립 포인트 계산
 */
export function calculateReviewPoints(hasPhoto: boolean): number {
  return hasPhoto ? POINTS_POLICY.reviewPhotoBonus : POINTS_POLICY.reviewTextBonus;
}
