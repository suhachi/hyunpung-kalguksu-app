/**
 * 쿠폰 카드 컴포넌트
 */

import { Coupon, getCouponStatus, COUPON_TYPE_LABELS } from '../../types/coupon';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Ticket } from 'lucide-react';

interface CouponCardProps {
  coupon: Coupon;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (coupon: Coupon) => void;
}

export function CouponCard({ coupon, selectable, selected, onSelect }: CouponCardProps) {
  const status = getCouponStatus(coupon);
  const expiryDate = new Date(coupon.expiresAt);
  const daysLeft = Math.ceil((coupon.expiresAt - Date.now()) / (1000 * 60 * 60 * 24));

  const isAvailable = status === 'available';
  const isExpiringSoon = isAvailable && daysLeft <= 7;

  return (
    <Card
      className={`p-4 ${
        selectable
          ? isAvailable
            ? 'cursor-pointer hover:border-[#D61C1C] transition-colors'
            : 'opacity-50 cursor-not-allowed'
          : ''
      } ${selected ? 'border-[#D61C1C] border-2' : ''}`}
      onClick={() => {
        if (selectable && isAvailable && onSelect) {
          onSelect(coupon);
        }
      }}
    >
      <div className="flex gap-4">
        {/* 금액 */}
        <div className="flex-shrink-0 w-24 flex flex-col items-center justify-center bg-gradient-to-br from-[#D61C1C] to-[#F37021] rounded-lg text-white p-3">
          <Ticket className="w-6 h-6 mb-1" />
          <div className="text-xl">{coupon.amount.toLocaleString()}</div>
          <div className="text-xs opacity-90">원</div>
        </div>

        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-sm text-[#333]">{coupon.title}</h3>
            <Badge
              variant="outline"
              className={
                status === 'available'
                  ? isExpiringSoon
                    ? 'border-yellow-500 text-yellow-700'
                    : 'border-green-500 text-green-700'
                  : status === 'used'
                  ? 'border-gray-400 text-gray-600'
                  : 'border-red-500 text-red-700'
              }
            >
              {status === 'available'
                ? isExpiringSoon
                  ? `${daysLeft}일 남음`
                  : '사용가능'
                : status === 'used'
                ? '사용완료'
                : '만료됨'}
            </Badge>
          </div>

          <p className="text-xs text-[#8B7355] mb-2">{coupon.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{coupon.minSpend.toLocaleString()}원 이상 주문 시</span>
            <span>
              {expiryDate.getFullYear()}.{String(expiryDate.getMonth() + 1).padStart(2, '0')}.
              {String(expiryDate.getDate()).padStart(2, '0')}까지
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
