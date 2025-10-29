/**
 * 시간제 판매 설정 다이얼로그
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
import { Checkbox } from '../ui/checkbox';

interface TimeSettingDialogProps {
  menu: Menu | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (hours: { start: string; end: string } | null) => void;
  loading?: boolean;
}

export function TimeSettingDialog({
  menu,
  open,
  onOpenChange,
  onSave,
  loading,
}: TimeSettingDialogProps) {
  const [enabled, setEnabled] = useState(false);
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('14:00');

  // 다이얼로그 열릴 때 초기값 설정
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && menu) {
      if (menu.availableHours) {
        setEnabled(true);
        setStartTime(menu.availableHours.start);
        setEndTime(menu.availableHours.end);
      } else {
        setEnabled(false);
        setStartTime('11:00');
        setEndTime('14:00');
      }
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!menu) return;

    if (enabled) {
      onSave({ start: startTime, end: endTime });
    } else {
      onSave(null);
    }
  };

  if (!menu) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>시간제 판매 설정</DialogTitle>
            <DialogDescription>
              {menu.name}의 판매 시간을 제한합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 활성화 체크박스 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enabled"
                checked={enabled}
                onCheckedChange={(checked) => setEnabled(checked as boolean)}
              />
              <Label htmlFor="enabled" className="cursor-pointer">
                시간제 판매 사용
              </Label>
            </div>

            {enabled && (
              <>
                {/* 시작 시간 */}
                <div className="space-y-2">
                  <Label htmlFor="start">시작 시간</Label>
                  <Input
                    id="start"
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    required
                  />
                </div>

                {/* 종료 시간 */}
                <div className="space-y-2">
                  <Label htmlFor="end">종료 시간</Label>
                  <Input
                    id="end"
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-xs text-blue-800">
                    💡 <strong>{startTime} ~ {endTime}</strong> 시간대에만 주문이 가능합니다.
                    <br />
                    시간 외에는 "시간외" 상태로 표시됩니다.
                  </p>
                </div>
              </>
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
            <Button type="submit" disabled={loading}>
              {loading ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
