/**
 * 배달비/최소주문 설정 폼
 */

import { DeliveryFee } from '../../types/settings';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface FeesFormProps {
  deliveryFees: DeliveryFee[];
  deliveryRadius: number;
  minDeliveryOrder: number;
  minPickupOrder: number;
  onDeliveryFeesChange: (fees: DeliveryFee[]) => void;
  onDeliveryRadiusChange: (radius: number) => void;
  onMinDeliveryOrderChange: (amount: number) => void;
  onMinPickupOrderChange: (amount: number) => void;
}

export function FeesForm({
  deliveryFees,
  deliveryRadius,
  minDeliveryOrder,
  minPickupOrder,
  onDeliveryFeesChange,
  onDeliveryRadiusChange,
  onMinDeliveryOrderChange,
  onMinPickupOrderChange,
}: FeesFormProps) {
  const handleAddFee = () => {
    const lastFee = deliveryFees[deliveryFees.length - 1];
    const newFee: DeliveryFee = {
      minDistance: lastFee ? lastFee.maxDistance : 0,
      maxDistance: lastFee ? lastFee.maxDistance + 2 : 2,
      fee: lastFee ? lastFee.fee + 1000 : 3000,
    };
    onDeliveryFeesChange([...deliveryFees, newFee]);
  };

  const handleRemoveFee = (index: number) => {
    if (deliveryFees.length <= 1) return;
    onDeliveryFeesChange(deliveryFees.filter((_, i) => i !== index));
  };

  const handleFeeChange = (index: number, field: keyof DeliveryFee, value: number) => {
    const updated = deliveryFees.map((fee, i) =>
      i === index ? { ...fee, [field]: value } : fee
    );
    onDeliveryFeesChange(updated);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* 배달비 설정 */}
        <div>
          <h3 className="text-lg text-[#333] mb-4">거리별 배달비</h3>
          <div className="space-y-3">
            {deliveryFees.map((fee, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-white">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="number"
                    value={fee.minDistance}
                    onChange={(e) => handleFeeChange(index, 'minDistance', Number(e.target.value))}
                    min="0"
                    step="0.5"
                    className="w-20"
                  />
                  <span className="text-gray-400">~</span>
                  <Input
                    type="number"
                    value={fee.maxDistance}
                    onChange={(e) => handleFeeChange(index, 'maxDistance', Number(e.target.value))}
                    min="0"
                    step="0.5"
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">km</span>
                  <span className="text-gray-400 mx-2">→</span>
                  <Input
                    type="number"
                    value={fee.fee}
                    onChange={(e) => handleFeeChange(index, 'fee', Number(e.target.value))}
                    min="0"
                    step="500"
                    className="w-28"
                  />
                  <span className="text-sm text-gray-600">원</span>
                </div>
                {deliveryFees.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFee(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddFee}
            className="mt-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            구간 추가
          </Button>
        </div>

        {/* 최대 배달 반경 */}
        <div>
          <Label htmlFor="deliveryRadius" className="text-sm text-[#333]">
            최대 배달 반경 (km)
          </Label>
          <Input
            id="deliveryRadius"
            type="number"
            value={deliveryRadius}
            onChange={(e) => onDeliveryRadiusChange(Number(e.target.value))}
            min="1"
            step="0.5"
            className="mt-2 w-32"
          />
          <p className="text-xs text-gray-500 mt-1">
            {deliveryRadius}km 이상은 배달 불가로 표시됩니다
          </p>
        </div>

        {/* 최소 배달 주문 금액 */}
        <div>
          <Label htmlFor="minDeliveryOrder" className="text-sm text-[#333]">
            최소 배달 주문 금액 (원)
          </Label>
          <Input
            id="minDeliveryOrder"
            type="number"
            value={minDeliveryOrder}
            onChange={(e) => onMinDeliveryOrderChange(Number(e.target.value))}
            min="0"
            step="1000"
            className="mt-2 w-40"
          />
          <p className="text-xs text-gray-500 mt-1">
            {minDeliveryOrder.toLocaleString()}원 미만 주문 시 배달 불가
          </p>
        </div>

        {/* 최소 포장 주문 금액 */}
        <div>
          <Label htmlFor="minPickupOrder" className="text-sm text-[#333]">
            최소 포장 주문 금액 (원)
          </Label>
          <Input
            id="minPickupOrder"
            type="number"
            value={minPickupOrder}
            onChange={(e) => onMinPickupOrderChange(Number(e.target.value))}
            min="0"
            step="1000"
            className="mt-2 w-40"
          />
          <p className="text-xs text-gray-500 mt-1">
            {minPickupOrder.toLocaleString()}원 미만 주문 시 포장 불가
          </p>
        </div>
      </div>
    </Card>
  );
}
