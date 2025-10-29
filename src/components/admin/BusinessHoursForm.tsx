/**
 * 영업시간 설정 폼
 */

import { BusinessHours, DAY_LABELS } from '../../types/settings';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';

interface BusinessHoursFormProps {
  value: BusinessHours[];
  onChange: (hours: BusinessHours[]) => void;
}

export function BusinessHoursForm({ value, onChange }: BusinessHoursFormProps) {
  const handleToggle = (day: string) => {
    const updated = value.map(h =>
      h.day === day ? { ...h, isOpen: !h.isOpen } : h
    );
    onChange(updated);
  };

  const handleTimeChange = (day: string, field: 'openTime' | 'closeTime', time: string) => {
    const updated = value.map(h =>
      h.day === day ? { ...h, [field]: time } : h
    );
    onChange(updated);
  };

  const handleApplyToAll = (day: string) => {
    const source = value.find(h => h.day === day);
    if (!source) return;

    const updated = value.map(h => ({
      ...h,
      openTime: source.openTime,
      closeTime: source.closeTime,
    }));
    onChange(updated);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-[#333]">요일별 영업시간</h3>
        </div>

        <div className="space-y-3">
          {value.map((hours, index) => (
            <div
              key={hours.day}
              className="flex items-center gap-3 p-3 rounded-lg border bg-white"
            >
              {/* 요일 + 토글 */}
              <div className="w-24 flex items-center gap-2">
                <Switch
                  checked={hours.isOpen}
                  onCheckedChange={() => handleToggle(hours.day)}
                />
                <Label className="text-sm text-[#333]">
                  {DAY_LABELS[hours.day]}
                </Label>
              </div>

              {/* 시간 입력 */}
              {hours.isOpen ? (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={hours.openTime}
                      onChange={(e) => handleTimeChange(hours.day, 'openTime', e.target.value)}
                      className="w-32"
                    />
                    <span className="text-gray-400">~</span>
                    <Input
                      type="time"
                      value={hours.closeTime}
                      onChange={(e) => handleTimeChange(hours.day, 'closeTime', e.target.value)}
                      className="w-32"
                    />
                  </div>

                  {/* 전체 적용 버튼 */}
                  <button
                    type="button"
                    onClick={() => handleApplyToAll(hours.day)}
                    className="text-xs text-[#F37021] hover:underline whitespace-nowrap"
                  >
                    전체 적용
                  </button>
                </>
              ) : (
                <div className="flex-1 text-sm text-gray-400">휴무</div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
          <p className="text-xs text-blue-800">
            💡 <strong>전체 적용</strong> 버튼을 누르면 해당 요일의 시간을 모든 요일에 일괄 적용합니다.
          </p>
        </div>
      </div>
    </Card>
  );
}
