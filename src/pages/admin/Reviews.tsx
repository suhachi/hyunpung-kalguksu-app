import { useState, useEffect } from 'react';
import { Star, Image as ImageIcon, Filter, SortAsc } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ReviewCard } from '../../components/admin/ReviewCard';
import { ReplyModal } from '../../components/admin/ReplyModal';
import { ReportDialog } from '../../components/admin/ReportDialog';
import {
  getReviews,
  getReviewStats,
  addReviewReply,
  deleteReviewReply,
  reportReview,
  hideReview,
} from '../../lib/admin/reviews.api';
import { getCurrentUser } from '../../lib/auth';
import type { Review, ReviewStats } from '../../types/review';
import type { ReviewReportReason } from '../../types/review';
import { toast } from 'sonner@2.0.3';

type FilterType = 'all' | 'photo' | 'reported';
type SortType = 'latest' | 'rating_high' | 'rating_low';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // 필터/정렬
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('latest');

  // 모달
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const storeId = 'store-hyunpung';

  useEffect(() => {
    loadData();
  }, [filter, sortBy]);

  async function loadData() {
    setLoading(true);
    try {
      const [reviewsData, statsData] = await Promise.all([
        getReviews({
          storeId,
          photoOnly: filter === 'photo',
          reported: filter === 'reported',
          sortBy,
          limit: 10,
          offset: 0,
        }),
        getReviewStats(storeId),
      ]);

      setReviews(reviewsData.reviews);
      setHasMore(reviewsData.hasMore);
      setStats(statsData);
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
      toast.error('리뷰를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await getReviews({
        storeId,
        photoOnly: filter === 'photo',
        reported: filter === 'reported',
        sortBy,
        limit: 10,
        offset: reviews.length,
      });

      setReviews([...reviews, ...data.reviews]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
      toast.error('리뷰를 불러오는데 실패했습니다.');
    } finally {
      setLoadingMore(false);
    }
  }

  function handleReply(reviewId: string) {
    const review = reviews.find((r) => r.id === reviewId);
    if (!review) return;

    setSelectedReview(review);
    setReplyModalOpen(true);
  }

  async function handleReplySubmit(reviewId: string, text: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('인증 필요');

    await addReviewReply(reviewId, {
      text,
      by: user.displayName,
    });

    // UI 업데이트
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              reply: {
                text,
                by: user.displayName,
                at: Date.now(),
              },
            }
          : r
      )
    );
  }

  async function handleReplyDelete(reviewId: string) {
    await deleteReviewReply(reviewId);

    // UI 업데이트
    setReviews(
      reviews.map((r) => {
        if (r.id === reviewId) {
          const { reply, ...rest } = r;
          return rest;
        }
        return r;
      })
    );
  }

  function handleReport(reviewId: string) {
    setSelectedReviewId(reviewId);
    setReportDialogOpen(true);
  }

  async function handleReportSubmit(
    reviewId: string,
    reason: ReviewReportReason,
    description?: string
  ) {
    const user = await getCurrentUser();
    if (!user) throw new Error('인증 필요');

    await reportReview(reviewId, reason, user.uid, description);

    // UI 업데이트
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? { ...r, reportedCount: (r.reportedCount || 0) + 1 }
          : r
      )
    );
  }

  async function handleToggleHidden(reviewId: string, hidden: boolean) {
    try {
      await hideReview(reviewId, hidden);

      // UI 업데이트
      setReviews(
        reviews.map((r) => (r.id === reviewId ? { ...r, isHidden: hidden } : r))
      );

      toast.success(hidden ? '리뷰를 숨겼습니다.' : '리뷰를 표시했습니다.');
    } catch (error) {
      console.error('리뷰 숨김 처리 실패:', error);
      toast.error('리뷰 숨김 처리에 실패했습니다.');
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-[#333] mb-2">리뷰 관리</h1>
        <p className="text-[#8B7355]">
          고객 리뷰를 확인하고 답글을 작성하세요
        </p>
      </div>

      {/* 통계 */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355]">총 리뷰</span>
              <Star className="w-5 h-5 text-[#F37021]" />
            </div>
            <p className="text-2xl text-[#333]">{stats.totalCount}개</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355]">평균 평점</span>
              <Star className="w-5 h-5 text-[#F37021] fill-current" />
            </div>
            <p className="text-2xl text-[#333]">
              {stats.averageRating.toFixed(1)}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355]">사진 리뷰</span>
              <ImageIcon className="w-5 h-5 text-[#F37021]" />
            </div>
            <p className="text-2xl text-[#333]">
              {stats.photoCount}개
              <span className="text-[#8B7355] ml-2">
                ({((stats.photoCount / stats.totalCount) * 100).toFixed(0)}%)
              </span>
            </p>
          </Card>

          <Card className="p-6">
            <div className="mb-2">
              <span className="text-[#8B7355]">별점 분포</span>
            </div>
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-[#8B7355] w-3">{rating}</span>
                  <div className="flex-1 h-2 bg-[#E5DDD5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F37021]"
                      style={{
                        width: `${
                          (stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] /
                            stats.totalCount) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-[#8B7355] w-6 text-right">
                    {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 필터 & 정렬 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* 필터 탭 */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
          <TabsList>
            <TabsTrigger value="all">
              전체
              {stats && (
                <Badge variant="secondary" className="ml-2">
                  {stats.totalCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="photo">
              사진리뷰
              {stats && (
                <Badge variant="secondary" className="ml-2">
                  {stats.photoCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reported">
              신고됨
              {reviews.filter((r) => (r.reportedCount || 0) > 0).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {reviews.filter((r) => (r.reportedCount || 0) > 0).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 정렬 */}
        <div className="flex items-center gap-2 ml-auto">
          <SortAsc className="w-4 h-4 text-[#8B7355]" />
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortType)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="rating_high">평점 높은순</SelectItem>
              <SelectItem value="rating_low">평점 낮은순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 리뷰 목록 */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-[#E5DDD5] rounded w-1/4" />
                <div className="h-4 bg-[#E5DDD5] rounded w-full" />
                <div className="h-4 bg-[#E5DDD5] rounded w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F37021]/10 flex items-center justify-center">
            <Star className="w-8 h-8 text-[#F37021]" />
          </div>
          <p className="text-[#8B7355] mb-2">리뷰가 없습니다</p>
          <p className="text-[#8B7355]">
            고객이 리뷰를 남기면 여기에 표시됩니다
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReply={handleReply}
              onReport={handleReport}
              onToggleHidden={handleToggleHidden}
            />
          ))}

          {/* 더 보기 버튼 */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={loadingMore}
                className="min-w-[200px]"
              >
                {loadingMore ? '로딩 중...' : '더 보기'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* 답글 모달 */}
      <ReplyModal
        open={replyModalOpen}
        onOpenChange={setReplyModalOpen}
        review={selectedReview}
        onSubmit={handleReplySubmit}
        onDelete={handleReplyDelete}
      />

      {/* 신고 다이얼로그 */}
      <ReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        reviewId={selectedReviewId}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
