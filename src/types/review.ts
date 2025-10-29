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
