import { useState } from 'react';
import { Star, Image as ImageIcon, MessageSquare, Flag, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Review } from '../../types/review';

export interface ReviewCardProps {
  review: Review;
  onReply?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
  onToggleHidden?: (reviewId: string, hidden: boolean) => void;
}

export function ReviewCard({ review, onReply, onReport, onToggleHidden }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxPreviewLength = 100;
  const needsExpansion = review.text.length > maxPreviewLength;

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#333]">{review.userName || '익명'}</span>
            {review.hasPhoto && (
              <Badge variant="outline" className="text-[#F37021] border-[#F37021]">
                <ImageIcon className="w-3 h-3 mr-1" />
                사진리뷰
              </Badge>
            )}
            {(review.reportedCount || 0) > 0 && (
              <Badge variant="destructive">
                <Flag className="w-3 h-3 mr-1" />
                신고 {review.reportedCount}건
              </Badge>
            )}
            {review.isHidden && (
              <Badge variant="secondary">
                <EyeOff className="w-3 h-3 mr-1" />
                숨김
              </Badge>
            )}
          </div>

          {/* 별점 */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-[#F37021] text-[#F37021]'
                    : 'text-[#E5DDD5]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 날짜 */}
        <time className="text-[#8B7355]">
          {formatDate(review.createdAt)}
        </time>
      </div>

      {/* 리뷰 내용 */}
      <div className="mb-4">
        <p className="text-[#333] whitespace-pre-wrap break-words">
          {needsExpansion && !isExpanded
            ? review.text.slice(0, maxPreviewLength) + '...'
            : review.text}
        </p>
        {needsExpansion && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#D61C1C] hover:underline mt-1"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* 사진 */}
      {review.photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {review.photos.map((photo, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden bg-[#F9F6F3]"
            >
              <img
                src={photo}
                alt={`리뷰 사진 ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                onClick={() => window.open(photo, '_blank')}
              />
            </div>
          ))}
        </div>
      )}

      {/* 답글 */}
      {review.reply && (
        <div className="bg-[#F9F6F3] rounded-lg p-4 mb-4 border-l-4 border-[#D61C1C]">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[#D61C1C]" />
            <span className="text-[#D61C1C]">{review.reply.by}</span>
            <span className="text-[#8B7355]">·</span>
            <time className="text-[#8B7355]">
              {formatDate(review.reply.at)}
            </time>
          </div>
          <p className="text-[#333] whitespace-pre-wrap">{review.reply.text}</p>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex items-center gap-2 flex-wrap">
        {onReply && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReply(review.id!)}
            className="text-[#D61C1C] border-[#D61C1C] hover:bg-[#D61C1C] hover:text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {review.reply ? '답글 수정' : '답글 달기'}
          </Button>
        )}

        {onToggleHidden && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleHidden(review.id!, !review.isHidden)}
          >
            {review.isHidden ? (
              <>
                <Eye className="w-4 h-4 mr-2" />
                표시
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                숨기기
              </>
            )}
          </Button>
        )}

        {onReport && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReport(review.id!)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Flag className="w-4 h-4 mr-2" />
            신고
          </Button>
        )}
      </div>

      {/* 주문 정보 */}
      <div className="mt-4 pt-4 border-t border-[#E5DDD5]">
        <p className="text-[#8B7355]">
          주문번호: {review.orderId}
          {review.rewardIssued && (
            <span className="ml-2 text-[#F37021]">🎁 쿠폰 발급됨</span>
          )}
        </p>
      </div>
    </Card>
  );
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
