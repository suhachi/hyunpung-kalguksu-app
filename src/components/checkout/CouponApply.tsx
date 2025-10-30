/**
 * 쿠폰 적용 컴포넌트 (체크아웃)
 * 검색/선택/적용/해제 UI
 */

import { useState, useEffect } from 'react';
import { Search, X, CheckCircle2, AlertCircle, Loader2, Ticket } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { useCart } from '../../contexts/CartContext';
import { getAvailableCoupons } from '../../lib/coupons.api';
import { validateCoupon, applyCouponToCart, removeCouponFromCart } from '../../lib/coupons.api';
import { getCurrentUser } from '../../lib/auth';
import { Coupon } from '../../types/coupon';
import { toast } from 'sonner';

interface CouponApplyProps {
  orderAmount: number; // 주문 금액 (쿠폰 적용 전)
}

export function CouponApply({ orderAmount }: CouponApplyProps) {
  const { couponId, couponDiscount, applyCoupon, removeCoupon } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [applyingCouponId, setApplyingCouponId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const user = getCurrentUser();

  useEffect(() => {
    if (dialogOpen && user) {
      loadAvailableCoupons();
    }
  }, [dialogOpen, orderAmount, user]);

  async function loadAvailableCoupons() {
    if (!user) return;

    setLoading(true);
    try {
      // 쿠폰 적용 전 주문 금액으로 사용 가능한 쿠폰 조회
      const coupons = await getAvailableCoupons(user.uid, orderAmount);
      setAvailableCoupons(coupons);
    } catch (error: any) {
      console.error('Failed to load coupons:', error);
      toast.error('쿠폰을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  async function handleApplyCoupon(coupon: Coupon) {
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    setApplyingCouponId(coupon.id!);

    try {
      // 쿠폰 유효성 재검증 (주문 금액 포함)
      const validation = await validateCoupon(coupon.id!, orderAmount, user.uid);

      if (!validation.valid) {
        toast.error(validation.reason || '쿠폰을 사용할 수 없습니다');
        // 사용 불가 쿠폰 목록에서 제거
        setAvailableCoupons(prev => prev.filter(c => c.id !== coupon.id));
        return;
      }

      // 쿠폰 적용 (할인 금액 반환)
      const discountAmount = await applyCouponToCart(coupon.id!, orderAmount, user.uid);
      
      // CartContext에 적용 (검증 없이, 이미 검증 완료)
      applyCoupon(coupon.id!, discountAmount, false);
      
      toast.success(`쿠폰이 적용되었습니다 (-${discountAmount.toLocaleString()}원)`);
      setDialogOpen(false);
    } catch (error: any) {
      console.error('Failed to apply coupon:', error);
      toast.error(error.message || '쿠폰 적용에 실패했습니다');
    } finally {
      setApplyingCouponId(null);
    }
  }

  function handleRemoveCoupon() {
    removeCoupon();
    toast.success('쿠폰이 제거되었습니다');
  }

  // 검색 필터
  const filteredCoupons = availableCoupons.filter(coupon => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      coupon.title?.toLowerCase().includes(query) ||
      coupon.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-2">
      {/* 쿠폰 선택 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-[#D61C1C]" />
          <span className="text-sm font-medium text-[#2E1C10]">쿠폰</span>
        </div>
        
        {couponId ? (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-[#D61C1C]/10 text-[#D61C1C]">
              적용됨
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="h-7 px-2 text-xs"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="text-xs"
          >
            쿠폰 선택
          </Button>
        )}
      </div>

      {/* 적용된 쿠폰 정보 */}
      {couponId && couponDiscount > 0 && (
        <div className="rounded-lg border border-[#D61C1C]/20 bg-[#D61C1C]/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D61C1C]" />
              <span className="text-sm font-medium text-[#2E1C10]">쿠폰 할인</span>
            </div>
            <span className="text-sm font-semibold text-[#D61C1C]">
              -{couponDiscount.toLocaleString()}원
            </span>
          </div>
        </div>
      )}

      {/* 쿠폰 선택 다이얼로그 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#D61C1C]" />
              쿠폰 선택
            </DialogTitle>
            <DialogDescription>
              사용 가능한 쿠폰을 선택하세요 (주문 금액: {orderAmount.toLocaleString()}원 이상)
            </DialogDescription>
          </DialogHeader>

          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="쿠폰 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* 쿠폰 목록 */}
          <ScrollArea className="max-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#D61C1C]" />
              </div>
            ) : filteredCoupons.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm">
                  {searchQuery ? '검색 결과가 없습니다' : '사용 가능한 쿠폰이 없습니다'}
                </p>
                {orderAmount > 0 && (
                  <p className="text-xs mt-1">
                    최소 주문 금액을 확인해주세요
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCoupons.map((coupon) => (
                  <CouponItem
                    key={coupon.id}
                    coupon={coupon}
                    orderAmount={orderAmount}
                    applying={applyingCouponId === coupon.id}
                    onApply={() => handleApplyCoupon(coupon)}
                    selected={couponId === coupon.id}
                  />
                ))}
              </div>
            )}
          </ScrollArea>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              쿠폰은 최소 주문 금액 이상에서만 사용 가능합니다. 중복 사용은 불가합니다.
            </AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/**
 * 개별 쿠폰 아이템
 */
interface CouponItemProps {
  coupon: Coupon;
  orderAmount: number;
  applying: boolean;
  onApply: () => void;
  selected: boolean;
}

function CouponItem({ coupon, orderAmount, applying, onApply, selected }: CouponItemProps) {
  const canUse = orderAmount >= coupon.minSpend;

  return (
    <div
      className={`rounded-lg border-2 p-4 transition-colors ${
        selected
          ? 'border-[#D61C1C] bg-[#D61C1C]/5'
          : canUse
          ? 'border-gray-200 bg-white hover:border-[#D61C1C]/50'
          : 'border-gray-200 bg-gray-50 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-[#2E1C10]">{coupon.title || '쿠폰'}</h4>
            <Badge variant="secondary" className="text-xs">
              -{coupon.amount.toLocaleString()}원
            </Badge>
          </div>
          {coupon.description && (
            <p className="text-xs text-muted-foreground mb-2">{coupon.description}</p>
          )}
        </div>
      </div>

      <Separator className="my-2" />

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          최소 주문 금액: {coupon.minSpend.toLocaleString()}원
          {!canUse && (
            <span className="ml-1 text-[#D61C1C]">
              (부족: {(coupon.minSpend - orderAmount).toLocaleString()}원)
            </span>
          )}
        </div>

        {selected ? (
          <Badge variant="default" className="bg-[#D61C1C]">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            적용됨
          </Badge>
        ) : (
          <Button
            size="sm"
            variant={canUse ? 'default' : 'outline'}
            onClick={onApply}
            disabled={!canUse || applying}
            className="h-7 text-xs"
          >
            {applying ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                적용 중...
              </>
            ) : canUse ? (
              '적용'
            ) : (
              '불가'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

