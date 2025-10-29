import { useState } from 'react';
import { Modal } from './common/Modal';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner@2.0.3';
import type { ReviewReportReason } from '../../types/review';
import { REPORT_REASON_LABELS } from '../../types/review';

export interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: string | null;
  onSubmit: (reviewId: string, reason: ReviewReportReason, description?: string) => Promise<void>;
}

export function ReportDialog({
  open,
  onOpenChange,
  reviewId,
  onSubmit,
}: ReportDialogProps) {
  const [reason, setReason] = useState<ReviewReportReason>('spam');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!reviewId) return;

    setLoading(true);
    try {
      await onSubmit(reviewId, reason, description.trim() || undefined);
      toast.success('리뷰 신고가 접수되었습니다.');
      onOpenChange(false);
      
      // 초기화
      setReason('spam');
      setDescription('');
    } catch (error: any) {
      console.error('리뷰 신고 실패:', error);
      toast.error(error.message || '리뷰 신고에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="리뷰 신고"
      description="부적절한 리뷰를 신고해주세요."
      size="md"
    >
      <div className="space-y-4">
        {/* 신고 사유 선택 */}
        <div>
          <Label className="mb-3 block text-[#333]">신고 사유</Label>
          <RadioGroup value={reason} onValueChange={(v) => setReason(v as ReviewReportReason)}>
            {(Object.keys(REPORT_REASON_LABELS) as ReviewReportReason[]).map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={`reason-${key}`} />
                <Label htmlFor={`reason-${key}`} className="cursor-pointer">
                  {REPORT_REASON_LABELS[key]}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 상세 설명 (선택사항) */}
        <div>
          <Label htmlFor="description" className="mb-2 block text-[#333]">
            상세 설명 (선택사항)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="신고 사유에 대한 자세한 설명을 입력하세요..."
            rows={3}
            maxLength={500}
            className="resize-none"
            disabled={loading}
          />
          <div className="flex justify-end mt-1">
            <span className="text-[#8B7355]">
              {description.length}/500자
            </span>
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-amber-900">
            ⚠️ <strong>신고 안내:</strong>
          </p>
          <ul className="mt-2 space-y-1 text-amber-800">
            <li>• 신고는 관리자가 검토 후 조치합니다</li>
            <li>• 허위 신고 시 제재를 받을 수 있습니다</li>
            <li>• 중복 신고는 불가능합니다</li>
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

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? '신고 중...' : '신고하기'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
