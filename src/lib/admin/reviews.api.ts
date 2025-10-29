/**
 * 관리자 리뷰 관리 API
 * USE_FIREBASE=false: Mock 데이터 사용
 * USE_FIREBASE=true: Firestore 연동
 */

import type { Review, ReviewReply, ReviewReport, ReviewReportReason, ReviewStats } from '../../types/review';

// Firebase 사용 여부
const USE_FIREBASE = false;

// Mock 리뷰 데이터
const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-001',
    storeId: 'store-hyunpung',
    orderId: 'order-001',
    uid: 'user-001',
    userName: '김민수',
    rating: 5,
    text: '진짜 맛있어요! 닭칼국수는 역시 현풍이 최고네요. 국물이 진하고 면발도 쫄깃해서 너무 좋았습니다. 사장님도 친절하시고 배달도 빨리 왔어요. 다음에 또 주문할게요!',
    photos: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2시간 전
    rewardIssued: true,
    reportedCount: 0,
  },
  {
    id: 'review-002',
    storeId: 'store-hyunpung',
    orderId: 'order-002',
    uid: 'user-002',
    userName: '이영희',
    rating: 4,
    text: '맛있어요. 다만 조금 매웠어요. 덜 맵게 해달라고 했는데도 제 입맛엔 매운 편이었습니다. 맛은 정말 좋았어요!',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 5, // 5시간 전
    rewardIssued: false,
    reportedCount: 0,
    reply: {
      text: '리뷰 감사합니다! 다음번엔 더 맵지 않게 조리해드리겠습니다. 맛있게 드셔주셔서 감사해요 :)',
      by: '관리자',
      at: Date.now() - 1000 * 60 * 60 * 4,
    },
  },
  {
    id: 'review-003',
    storeId: 'store-hyunpung',
    orderId: 'order-003',
    uid: 'user-003',
    userName: '박철수',
    rating: 5,
    text: '최고입니다!! 온 가족이 다 맛있게 먹었어요. 양도 푸짐하고 가격도 합리적이에요. 특히 닭고기가 부드럽고 육수가 깊은 맛이 나서 좋았습니다.',
    photos: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1일 전
    rewardIssued: true,
    reportedCount: 0,
  },
  {
    id: 'review-004',
    storeId: 'store-hyunpung',
    orderId: 'order-004',
    uid: 'user-004',
    userName: '정미영',
    rating: 3,
    text: '보통이에요. 기대했던 것보다는 평범했습니다.',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2일 전
    rewardIssued: false,
    reportedCount: 0,
  },
  {
    id: 'review-005',
    storeId: 'store-hyunpung',
    orderId: 'order-005',
    uid: 'user-005',
    userName: '최동욱',
    rating: 5,
    text: '진짜 찐 맛집! 회사 근처라서 자주 시켜먹는데 항상 만족스러워요. 특히 비오는 날엔 칼국수가 최고죠!',
    photos: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3일 전
    rewardIssued: true,
    reportedCount: 0,
    reply: {
      text: '단골 고객님 감사합니다! 항상 맛있게 드셔주셔서 감사해요 ❤️',
      by: '사장님',
      at: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
  },
  {
    id: 'review-006',
    storeId: 'store-hyunpung',
    orderId: 'order-006',
    uid: 'user-006',
    userName: '강호진',
    rating: 2,
    text: '배달이 너무 늦게 왔어요. 음식은 맛있는데 식어서 와서 아쉬웠습니다.',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4, // 4일 전
    rewardIssued: false,
    reportedCount: 0,
  },
  {
    id: 'review-007',
    storeId: 'store-hyunpung',
    orderId: 'order-007',
    uid: 'user-007',
    userName: '윤서현',
    rating: 5,
    text: '사진으로 보는 것보다 실제로 먹어보니 훨씬 맛있네요! 국물이 진짜 깊은 맛이 나요. 강추합니다!',
    photos: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5일 전
    rewardIssued: true,
    reportedCount: 0,
  },
  {
    id: 'review-008',
    storeId: 'store-hyunpung',
    orderId: 'order-008',
    uid: 'user-008',
    userName: '홍길동',
    rating: 1,
    text: '이건 광고입니다 http://spam.com',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6, // 6일 전
    rewardIssued: false,
    reportedCount: 3, // 신고된 리뷰
    isHidden: false,
  },
];

// Mock 신고 데이터
const mockReports: Map<string, ReviewReport[]> = new Map();

/**
 * 리뷰 목록 조회
 */
export async function getReviews(params: {
  storeId: string;
  photoOnly?: boolean;
  reported?: boolean;
  sortBy?: 'latest' | 'rating_high' | 'rating_low';
  limit?: number;
  offset?: number;
}): Promise<{ reviews: Review[]; hasMore: boolean }> {
  if (USE_FIREBASE) {
    // TODO: Firestore 쿼리
    throw new Error('Firebase not implemented');
  }

  // Mock 데이터 필터링
  await new Promise((resolve) => setTimeout(resolve, 300)); // 네트워크 지연 시뮬레이션

  let filtered = [...MOCK_REVIEWS];

  // 필터: 사진 리뷰만
  if (params.photoOnly) {
    filtered = filtered.filter((r) => r.hasPhoto);
  }

  // 필터: 신고된 리뷰만
  if (params.reported) {
    filtered = filtered.filter((r) => (r.reportedCount || 0) > 0);
  }

  // 정렬
  switch (params.sortBy) {
    case 'rating_high':
      filtered.sort((a, b) => b.rating - a.rating || b.createdAt - a.createdAt);
      break;
    case 'rating_low':
      filtered.sort((a, b) => a.rating - b.rating || b.createdAt - a.createdAt);
      break;
    case 'latest':
    default:
      filtered.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }

  // 페이지네이션
  const limit = params.limit || 10;
  const offset = params.offset || 0;
  const reviews = filtered.slice(offset, offset + limit);
  const hasMore = offset + limit < filtered.length;

  return { reviews, hasMore };
}

/**
 * 리뷰 통계
 */
export async function getReviewStats(storeId: string): Promise<ReviewStats> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  const reviews = MOCK_REVIEWS.filter((r) => r.storeId === storeId);
  const totalCount = reviews.length;
  const photoCount = reviews.filter((r) => r.hasPhoto).length;

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = totalCount > 0 ? sum / totalCount : 0;

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return {
    totalCount,
    averageRating,
    photoCount,
    ratingDistribution,
  };
}

/**
 * 답글 작성/수정
 */
export async function addReviewReply(
  reviewId: string,
  reply: { text: string; by: string }
): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore update
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (!review) throw new Error('Review not found');

  review.reply = {
    text: reply.text,
    by: reply.by,
    at: Date.now(),
  };
}

/**
 * 답글 삭제
 */
export async function deleteReviewReply(reviewId: string): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore update
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (!review) throw new Error('Review not found');

  delete review.reply;
}

/**
 * 리뷰 신고
 */
export async function reportReview(
  reviewId: string,
  reason: ReviewReportReason,
  reportedBy: string,
  description?: string
): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore create reviews_reports
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  // 중복 신고 체크
  const reports = mockReports.get(reviewId) || [];
  const alreadyReported = reports.some((r) => r.reportedBy === reportedBy);
  if (alreadyReported) {
    throw new Error('이미 신고한 리뷰입니다.');
  }

  // 신고 추가
  const report: ReviewReport = {
    id: `report-${Date.now()}`,
    reviewId,
    reportedBy,
    reason,
    description,
    createdAt: Date.now(),
  };

  reports.push(report);
  mockReports.set(reviewId, reports);

  // 리뷰의 신고 카운트 증가
  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (review) {
    review.reportedCount = (review.reportedCount || 0) + 1;
  }
}

/**
 * 리뷰 숨김 처리
 */
export async function hideReview(reviewId: string, hidden: boolean): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore update
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (!review) throw new Error('Review not found');

  review.isHidden = hidden;
}
