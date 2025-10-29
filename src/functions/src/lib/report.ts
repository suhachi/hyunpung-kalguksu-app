/**
 * 리포트 및 메시지 유틸리티
 */

/**
 * 주문 상태 변경 메시지 (표준 상태 사용)
 */
export function getStatusChangeMessage(status: string): string {
  const messages: Record<string, string> = {
    pending: '주문이 접수 대기 상태입니다.',
    accepted: '주문이 접수되었습니다.',
    preparing: '주문을 조리 중입니다.',
    completed: '주문이 완료되었습니다. 맛있게 드세요!',
    canceled: '주문이 취소되었습니다.',
  };

  return messages[status] || '주문 상태가 변경되었습니다.';
}

/**
 * 주문 상태 변경 제목 (표준 상태 사용)
 */
export function getStatusChangeTitle(status: string): string {
  const titles: Record<string, string> = {
    pending: '주문 접수 대기',
    accepted: '주문 접수 완료',
    preparing: '조리 중',
    completed: '주문 완료',
    canceled: '주문 취소',
  };

  return titles[status] || '주문 상태 변경';
}

/**
 * 주간 리포트 생성
 */
export async function generateWeeklyReport(): Promise<any> {
  // TODO: 실제 주문/리뷰 데이터 집계
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    period: {
      start: weekAgo.toISOString(),
      end: now.toISOString(),
    },
    summary: {
      totalOrders: 0,
      totalRevenue: 0,
      totalReviews: 0,
      avgRating: 0,
    },
    topMenus: [],
    // 추후 실제 데이터로 채움
  };
}
