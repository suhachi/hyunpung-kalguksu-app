/**
 * 메뉴 편집 다이얼로그 (가격/설명 수정)
 */

import { useState } from 'react';
import { Menu } from '../../types/menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { uploadMenuImage, deleteMenuImage } from '../../lib/admin/menuImages.api';
import { processImage } from '../../lib/imageUtils';
import { toast } from 'sonner';

interface MenuEditDialogProps {
  menu: Menu | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: { price?: number; description?: string; image?: string }, reason: string) => void;
  loading?: boolean;
}

export function MenuEditDialog({
  menu,
  open,
  onOpenChange,
  onSave,
  loading,
}: MenuEditDialogProps) {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(menu?.image ?? '');
  const [imageReason, setImageReason] = useState('');
  const [saving, setSaving] = useState(false);

  // 다이얼로그 열릴 때 초기값 설정
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && menu) {
      setPrice(menu.price.toString());
      setDescription(menu.description);
      setReason('');
      setImageFile(null);
      setImagePreview(menu.image);
      setImageReason('');
    }
    onOpenChange(newOpen);
  };

  // 변경 사유 생성 헬퍼
  const makeReason = (): string => {
    const parts = [
      reason.trim(),
      imageFile && imageReason ? `이미지: ${imageReason}` : imageFile ? '이미지 변경' : null
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(' | ') : '이미지 변경';
  };

  const handleSave = async () => {
    if (!menu) return;

    // 가격/설명 변경 시 reason 필수 체크
    const priceChanged = parseInt(price) !== menu.price && !isNaN(parseInt(price));
    const descChanged = description.trim() !== menu.description;
    if ((priceChanged || descChanged) && !reason.trim()) {
      toast.error('변경 사유를 입력하세요');
      return;
    }

    setSaving(true);
    
    try {
      const updates: { price?: number; description?: string; image?: string } = {};

      const priceValue = parseInt(price);
      if (!isNaN(priceValue) && priceValue !== menu.price) {
        updates.price = priceValue;
      }

      const desc = description.trim();
      if (desc !== menu.description) {
        updates.description = desc;
      }

      // 이미지가 선택된 경우 업로드 (캐시 회피를 위해 타임스탬프 추가)
      if (imageFile) {
        const processed = await processImage(imageFile, { 
          maxWidth: 1600, 
          outputFormat: 'webp',
          quality: 0.86
        });
        // 캐시 회피를 위해 파일명에 타임스탬프 추가
        const url = await uploadMenuImage(menu.menuId, processed, `${Date.now()}.webp`);
        updates.image = url;
      }

      if (Object.keys(updates).length === 0) {
        toast.info('변경된 내용이 없습니다.');
        setSaving(false);
        return;
      }

      await onSave(updates, makeReason());
      
      toast.success('저장 완료');
      onOpenChange(false);
    } catch (e: any) {
      console.error('Failed to save menu:', e);
      toast.error(e?.message ?? '저장 중 오류가 발생했습니다');
    } finally {
      setSaving(false); // ✅ 항상 복구
    }
  };

  if (!menu) return null;

  const hasChanges = 
    (parseInt(price) !== menu.price && !isNaN(parseInt(price))) ||
    description.trim() !== menu.description ||
    !!imageFile;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <DialogHeader>
            <DialogTitle>메뉴 수정</DialogTitle>
            <DialogDescription>
              {menu.name}의 가격과 설명을 수정합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 이미지 변경 */}
            <div className="space-y-2">
              <Label>메뉴 이미지</Label>
              {imagePreview && (
                <img src={imagePreview} alt="미리보기" className="w-32 h-32 rounded object-cover" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setImageFile(f);
                  setImagePreview(URL.createObjectURL(f));
                }}
              />
              {imageFile && (
                <Input
                  placeholder="이미지 변경 사유"
                  value={imageReason}
                  onChange={(e) => setImageReason(e.target.value)}
                />
              )}
            </div>
            {/* 가격 */}
            <div className="space-y-2">
              <Label htmlFor="price">가격 (원)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min="0"
                step="500"
                placeholder="9000"
              />
              {parseInt(price) !== menu.price && !isNaN(parseInt(price)) && (
                <p className="text-xs text-[#F37021]">
                  {menu.price.toLocaleString()}원 → {parseInt(price).toLocaleString()}원
                </p>
              )}
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                maxLength={200}
                placeholder="메뉴 설명을 입력하세요"
              />
              <p className="text-xs text-gray-500 text-right">
                {description.length}/200자
              </p>
            </div>

            {/* 변경 사유 */}
            {hasChanges && (
              <div className="space-y-2">
                <Label htmlFor="reason">
                  변경 사유 
                  {((parseInt(price) !== menu.price && !isNaN(parseInt(price))) || description.trim() !== menu.description) && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder={
                    imageFile && !(parseInt(price) !== menu.price || description.trim() !== menu.description)
                      ? "이미지 변경 사유 (선택)"
                      : "예: 원가 상승으로 인한 가격 조정"
                  }
                  required={!!((parseInt(price) !== menu.price && !isNaN(parseInt(price))) || description.trim() !== menu.description)}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={
                saving ||
                loading ||
                !hasChanges ||
                // 가격/설명 변경 시에만 reason 필수
                (((parseInt(price) !== menu.price && !isNaN(parseInt(price))) || description.trim() !== menu.description) && !reason.trim())
              }
              className="bg-[#D61C1C] hover:bg-[#D61C1C]/90"
            >
              {saving || loading ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
