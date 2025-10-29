import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Truck, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useCart } from '../../contexts/CartContext';

// 실제 음식 이미지 매핑
const menuImages: Record<string, string> = {
  'menu-001': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-002': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-003': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-004': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-005': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=200',
  'menu-006': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-007': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-008': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-013': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-014': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-021': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=200',
  'menu-022': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=200',
  'menu-023': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=200',
  'menu-024': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=200',
  'menu-025': 'https://images.unsplash.com/photo-1616627077891-a4780e730b7e?w=200',
};

const MIN_ORDER_DELIVERY = 15000;
const MIN_ORDER_PICKUP = 5000;

export function Cart() {
  const navigate = useNavigate();
  const {
    items,
    deliveryType,
    requests,
    couponDiscount,
    removeItem,
    updateQuantity,
    setDeliveryType,
    setRequests,
    getSubtotal,
    getDeliveryFee,
    getTotalAmount,
  } = useCart();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const totalAmount = getTotalAmount();

  const minOrderAmount = deliveryType === 'delivery' ? MIN_ORDER_DELIVERY : MIN_ORDER_PICKUP;
  const canProceed = subtotal >= minOrderAmount;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-24 h-24 mb-6 rounded-full bg-[#2E1C10]/5 flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-[#2E1C10]/40" />
        </div>
        <h2 className="text-xl text-[#2E1C10] mb-2">
          장바구니가 비어있어요
        </h2>
        <p className="text-[#2E1C10]/60 mb-6 text-center">
          맛있는 메뉴를 담아보세요
        </p>
        <Button
          onClick={() => navigate('/menu')}
          className="bg-[#D61C1C] hover:bg-[#D61C1C]/90"
        >
          메뉴 보러가기
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="px-4 py-6 space-y-6">
        {/* 장바구니 헤더 */}
        <div>
          <h1 className="text-2xl text-[#2E1C10] mb-1">
            장바구니
          </h1>
          <p className="text-[#2E1C10]/60">
            {items.length}개 메뉴
          </p>
        </div>

        {/* 장바구니 아이템 */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <CartItemCard
              key={`${item.menuId}-${index}`}
              item={item}
              onUpdateQuantity={(qty) => updateQuantity(item.menuId, qty)}
              onRemove={() => removeItem(item.menuId)}
            />
          ))}
        </div>

        <Separator />

        {/* 배달/포장 선택 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">
            주문 방식
          </h2>
          <RadioGroup value={deliveryType} onValueChange={(v) => setDeliveryType(v as 'delivery' | 'pickup')}>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                <Truck className="w-5 h-5 text-[#D61C1C]" />
                <div>
                  <p className="text-[#2E1C10]">배달</p>
                  <p className="text-sm text-[#2E1C10]/60">
                    최소 주문 {MIN_ORDER_DELIVERY.toLocaleString()}원
                  </p>
                </div>
              </Label>
              {deliveryType === 'delivery' && (
                <span className="text-sm text-[#D61C1C]">
                  +{deliveryFee.toLocaleString()}원
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                <ShoppingBag className="w-5 h-5 text-[#F37021]" />
                <div>
                  <p className="text-[#2E1C10]">포장</p>
                  <p className="text-sm text-[#2E1C10]/60">
                    최소 주문 {MIN_ORDER_PICKUP.toLocaleString()}원
                  </p>
                </div>
              </Label>
              {deliveryType === 'pickup' && (
                <span className="text-sm text-[#C7A45A]">무료</span>
              )}
            </div>
          </RadioGroup>
        </div>

        {/* 요청사항 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">
            요청사항 (선택)
          </h2>
          <Textarea
            placeholder="예) 면 부드럽게 해주세요"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            maxLength={150}
            className="resize-none"
          />
          <p className="text-xs text-[#2E1C10]/60 mt-1">
            {requests?.length || 0}/150자
          </p>
        </div>

        {/* 최소 주문 금액 경고 */}
        {!canProceed && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {deliveryType === 'delivery' ? '배달' : '포장'}은{' '}
              {minOrderAmount.toLocaleString()}원 이상부터 가능해요.{' '}
              <span className="font-medium">
                {(minOrderAmount - subtotal).toLocaleString()}원 더 담아주세요.
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* 쿠폰 (나중에 구현) */}
        {/* <div>
          <Button variant="outline" className="w-full justify-between">
            <span>쿠폰 선택하기</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div> */}
      </div>

      {/* 하단 고정 결제 영역 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#2E1C10]/10 px-4 py-4 space-y-3">
        {/* 금액 상세 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#2E1C10]/60">주문 금액</span>
            <span className="text-[#2E1C10]">{subtotal.toLocaleString()}원</span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">할인</span>
              <span className="text-[#D61C1C]">-{couponDiscount.toLocaleString()}원</span>
            </div>
          )}

          {deliveryType === 'delivery' && (
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">배달비</span>
              <span className="text-[#2E1C10]">+{deliveryFee.toLocaleString()}원</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between">
            <span className="text-[#2E1C10]">총 결제액</span>
            <span className="text-xl text-[#D61C1C]">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <Button
          size="lg"
          className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          disabled={!canProceed}
          onClick={() => navigate('/checkout')}
        >
          {canProceed ? `${totalAmount.toLocaleString()}원 결제하기` : '최소 주문 금액 미달'}
        </Button>
      </div>
    </div>
  );
}

interface CartItemCardProps {
  item: {
    menuId: string;
    menuName: string;
    menuImage: string;
    menuPrice: number;
    quantity: number;
    options: {
      noodle?: string;
      spicy?: string;
      toppings?: string[];
    };
    optionPrices: {
      noodle: number;
      toppings: number;
    };
    subtotal: number;
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const optionsText = [
    item.options.noodle && `면양: ${item.options.noodle}`,
    item.options.spicy && `맵기: ${item.options.spicy}`,
    item.options.toppings && item.options.toppings.length > 0 && `토핑: ${item.options.toppings.join(', ')}`,
  ].filter(Boolean).join(' · ');

  const imageUrl = menuImages[item.menuId];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex gap-4">
        {/* 메뉴 이미지 */}
        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 rounded-xl overflow-hidden">
          {imageUrl ? (
            <ImageWithFallback
              src={imageUrl}
              alt={item.menuName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl">🍜</span>
            </div>
          )}
        </div>

        {/* 메뉴 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-[#2E1C10] truncate">
              {item.menuName}
            </h3>
            <button
              onClick={onRemove}
              className="flex-shrink-0 p-1 hover:bg-[#2E1C10]/5 rounded"
              aria-label="삭제"
            >
              <Trash2 className="w-4 h-4 text-[#2E1C10]/60" />
            </button>
          </div>

          {/* 옵션 */}
          {optionsText && (
            <p className="text-sm text-[#2E1C10]/60 mb-2">
              {optionsText}
            </p>
          )}

          {/* 수량 및 가격 */}
          <div className="flex items-center justify-between">
            {/* 수량 조절 */}
            <div className="flex items-center border border-[#2E1C10]/20 rounded-lg overflow-hidden">
              <button
                onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#F9F6F3]"
                aria-label="수량 감소"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-10 text-center text-sm text-[#2E1C10]">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#F9F6F3]"
                aria-label="수량 증가"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* 가격 */}
            <span className="text-[#D61C1C]">
              {item.subtotal.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
