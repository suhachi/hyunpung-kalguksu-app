import { useState, useEffect } from 'react';
import { Modal } from './common/Modal';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import type { Review } from '../../types/review';

export interface ReplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: Review | null;
  onSubmit: (reviewId: string, text: string) => Promise<void>;
  onDelete?: (reviewId: string) => Promise<void>;
}

export function ReplyModal({
  open,
  onOpenChange,
  review,
  onSubmit,
  onDelete,
}: ReplyModalProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const maxLength = 200;
  const isEditing = !!review?.reply;

  useEffect(() => {
    if (review?.reply) {
      setText(review.reply.text);
    } else {
      setText('');
    }
  }, [review]);

  async function handleSubmit() {
    if (!review) return;

    if (text.trim().length < 10) {
      toast.error('답글은 최소 10자 이상 입력해주세요.');
      return;
    }

    if (text.length > maxLength) {
      toast.error(`답글은 최대 ${maxLength}자까지 입력 가능합니다.`);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(review.id!, text.trim());
      toast.success(isEditing ? '답글이 수정되었습니다.' : '답글이 등록되었습니다.');
      onOpenChange(false);
    } catch (error) {
      console.error('답글 저장 실패:', error);
      toast.error('답글 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!review?.id || !onDelete) return;

    if (!confirm('답글을 삭제하시겠습니까?')) return;

    setLoading(true);
    try {
      await onDelete(review.id);
      toast.success('답글이 삭제되었습니다.');
      onOpenChange(false);
    } catch (error) {
      console.error('답글 삭제 실패:', error);
      toast.error('답글 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (!review) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? '답글 수정' : '답글 작성'}
      description={`${review.userName}님의 리뷰에 답글을 남겨보세요.`}
      size="md"
    >
      <div className="space-y-4">
        {/* 원본 리뷰 */}
        <div className="bg-[#F9F6F3] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#333]">{review.userName}</span>
            <span className="text-[#8B7355]">·</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-[#F37021]">⭐</span>
              ))}
            </div>
          </div>
          <p className="text-[#333] line-clamp-3">{review.text}</p>
        </div>

        {/* 답글 입력 */}
        <div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="고객님께 전할 답글을 입력하세요..."
            rows={5}
            maxLength={maxLength}
            className="resize-none"
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[#8B7355]">
              {text.length}/{maxLength}자
            </span>
            <span className="text-[#8B7355]">
              최소 10자 이상
            </span>
          </div>
        </div>

        {/* 도움말 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-900">
            💡 <strong>답글 작성 팁:</strong>
          </p>
          <ul className="mt-2 space-y-1 text-blue-800">
            <li>• 감사 인사로 시작하세요</li>
            <li>• 구체적인 개선 사항이나 설명을 덧붙이세요</li>
            <li>• 친근하고 진심 어린 톤을 사용하세요</li>
          </ul>
        </div>

        {/* 버튼 */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1"
          >
            취소
          </Button>

          {isEditing && onDelete && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={loading}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              삭제
            </Button>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading || text.trim().length < 10}
            className="flex-1 bg-[#D61C1C] hover:bg-[#B91818]"
          >
            {loading ? '저장 중...' : isEditing ? '수정' : '등록'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
