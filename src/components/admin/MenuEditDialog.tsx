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

interface MenuEditDialogProps {
  menu: Menu | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: { price?: number; description?: string }, reason: string) => void;
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

  // 다이얼로그 열릴 때 초기값 설정
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && menu) {
      setPrice(menu.price.toString());
      setDescription(menu.description);
      setReason('');
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!menu || !reason.trim()) {
      return;
    }

    const updates: { price?: number; description?: string } = {};

    const newPrice = parseInt(price);
    if (!isNaN(newPrice) && newPrice !== menu.price) {
      updates.price = newPrice;
    }

    if (description.trim() !== menu.description) {
      updates.description = description.trim();
    }

    if (Object.keys(updates).length === 0) {
      return;
    }

    onSave(updates, reason.trim());
  };

  if (!menu) return null;

  const hasChanges = 
    (parseInt(price) !== menu.price && !isNaN(parseInt(price))) ||
    description.trim() !== menu.description;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>메뉴 수정</DialogTitle>
            <DialogDescription>
              {menu.name}의 가격과 설명을 수정합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
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
                  변경 사유 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="예: 원가 상승으로 인한 가격 조정"
                  required
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
              type="submit"
              disabled={!hasChanges || !reason.trim() || loading}
            >
              {loading ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
