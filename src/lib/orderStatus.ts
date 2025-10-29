/**
 * OrderStatus 정규화 유틸
 * 다양한 상태 표현을 표준 상태로 통일
 */

export type StdStatus = 'pending' | 'accepted' | 'preparing' | 'completed' | 'canceled';

/**
 * 문자열을 표준 주문 상태로 정규화
 */
export function normalizeStatus(s: string): StdStatus {
  const m: Record<string, StdStatus> = {
    // 표준 상태
    pending: 'pending',
    accepted: 'accepted',
    preparing: 'preparing',
    completed: 'completed',
    canceled: 'canceled',

    // 동의어 매핑
    confirmed: 'accepted',
    ready: 'preparing',
    delivering: 'preparing',
    done: 'completed',
    cancelled: 'canceled',

    // 소문자 변형
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    PREPARING: 'preparing',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
    CONFIRMED: 'accepted',
    READY: 'preparing',
    DELIVERING: 'preparing',
    DONE: 'completed',
    CANCELLED: 'canceled',
  };

  return m[s] ?? 'pending';
}

/**
 * 표준 상태 목록 반환
 */
export function getStandardStatuses(): readonly StdStatus[] {
  return ['pending', 'accepted', 'preparing', 'completed', 'canceled'] as const;
}

/**
 * 표준 상태가 유효한지 확인
 */
export function isValidStdStatus(s: string): s is StdStatus {
  return getStandardStatuses().includes(s as StdStatus);
}

/**
 * 진행 중인 주문인지 확인
 */
export function isInProgress(status: string): boolean {
  const norm = normalizeStatus(status);
  return norm === 'pending' || norm === 'accepted' || norm === 'preparing';
}

/**
 * 완료된 주문인지 확인
 */
export function isCompleted(status: string): boolean {
  return normalizeStatus(status) === 'completed';
}

/**
 * 취소된 주문인지 확인
 */
export function isCanceled(status: string): boolean {
  return normalizeStatus(status) === 'canceled';
}

/**
 * 한국어 표시명 반환
 */
export function getStatusLabel(status: string): string {
  const labels: Record<StdStatus, string> = {
    pending: '대기중',
    accepted: '접수됨',
    preparing: '준비중',
    completed: '완료',
    canceled: '취소됨',
  };

  return labels[normalizeStatus(status)] ?? status;
}

