import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import menusData from '../../data/menus.json';
import type { Menu } from '../../types/menu';

const badgeStyles = {
  best: 'bg-[#D61C1C] text-white',
  signature: 'bg-[#C7A45A] text-white',
  spicy: 'bg-[#F37021] text-white',
  cold: 'bg-blue-500 text-white',
  seasonal: 'bg-green-600 text-white',
};

const badgeLabels = {
  best: '베스트',
  signature: '시그니처',
  spicy: '매운맛',
  cold: '냉메뉴',
  seasonal: '계절메뉴',
};

export function MenuDetail() {
  const { menuId } = useParams<{ menuId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const menu = (menusData as Menu[]).find((m) => m.menuId === menuId);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedNoodle, setSelectedNoodle] = useState<string>('보통');
  const [selectedSpicy, setSelectedSpicy] = useState<string>('보통');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  
  const optionPrices = useMemo(() => {
    if (!menu) return { noodle: 0, toppings: 0 };
    
    let noodlePrice = 0;
    let toppingsPrice = 0;
    
    // 면양 추가 가격
    if (menu.options?.noodle) {
      const noodle = menu.options.noodle.find((n) => n.label === selectedNoodle);
      if (noodle) noodlePrice = noodle.price;
    }
    
    // 토핑 추가 가격
    if (menu.options?.toppings) {
      selectedToppings.forEach((topping) => {
        const toppingOption = menu.options!.toppings!.find((t) => t.label === topping);
        if (toppingOption) toppingsPrice += toppingOption.price;
      });
    }
    
    return { noodle: noodlePrice, toppings: toppingsPrice };
  }, [menu, selectedNoodle, selectedToppings]);
  
  const totalPrice = useMemo(() => {
    if (!menu) return 0;
    return (menu.price + optionPrices.noodle + optionPrices.toppings) * quantity;
  }, [menu, optionPrices, quantity]);
  
  if (!menu) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-[#2E1C10]/60 mb-4">메뉴를 찾을 수 없습니다</p>
        <Button onClick={() => navigate('/menu')}>
          메뉴 목록으로
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!menu) return;
    
    addItem({
      menuId: menu.menuId,
      menuName: menu.name,
      menuImage: menu.image,
      menuPrice: menu.price,
      quantity,
      options: {
        noodle: selectedNoodle,
        spicy: selectedSpicy,
        toppings: selectedToppings.length > 0 ? selectedToppings : undefined,
      },
      optionPrices,
      subtotal: totalPrice,
    });
    
    toast.success('장바구니에 담았습니다', {
      description: `${menu.name} ${quantity}개`,
      action: {
        label: '장바구니 보기',
        onClick: () => navigate('/cart'),
      },
    });
  };
  
  const isTimeRestricted = menu.availableHours && !menu.isAvailable;
  const isSoldOut = !menu.isAvailable && !menu.availableHours;
  
  return (
    <div className="pb-24">
      {/* 메뉴 이미지 */}
      <div className="relative aspect-square bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 overflow-hidden">
        {menu.image ? (
          <ImageWithFallback
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-9xl">🍜</span>
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge className="bg-gray-600 text-white text-lg px-4 py-2">
              품절
            </Badge>
          </div>
        )}
      </div>
      
      <div className="px-4 py-6 space-y-6">
        {/* 메뉴 정보 */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="text-2xl text-[#2E1C10]">
              {menu.name}
            </h1>
          </div>
          
          {/* 뱃지 */}
          {menu.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {menu.badges.map((badge) => (
                <Badge key={badge} className={badgeStyles[badge]}>
                  {badgeLabels[badge]}
                </Badge>
              ))}
            </div>
          )}
          
          <p className="text-2xl text-[#D61C1C] mb-4">
            {menu.price.toLocaleString()}원
          </p>
          
          <p className="text-[#2E1C10]/80 leading-relaxed">
            {menu.description}
          </p>
        </div>
        
        {/* 시간제 알림 */}
        {isTimeRestricted && (
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-900 mb-1">
                시간제 메뉴입니다
              </p>
              <p className="text-sm text-yellow-700">
                판매 시간: {menu.availableHours!.start} - {menu.availableHours!.end}
              </p>
            </div>
          </div>
        )}
        
        {/* 면양 선택 */}
        {menu.options?.noodle && menu.options.noodle.length > 0 && (
          <OptionSection title="면양 선택">
            <RadioGroup value={selectedNoodle} onValueChange={setSelectedNoodle}>
              {menu.options.noodle.map((option) => (
                <div key={option.label} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.label} id={`noodle-${option.label}`} />
                  <Label htmlFor={`noodle-${option.label}`} className="flex-1 cursor-pointer">
                    <span>{option.label}</span>
                    {option.price > 0 && (
                      <span className="text-[#D61C1C] ml-2">
                        +{option.price.toLocaleString()}원
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </OptionSection>
        )}
        
        {/* 맵기 선택 */}
        {menu.options?.spicy && menu.options.spicy.length > 0 && (
          <OptionSection title="맵기 선택">
            <RadioGroup value={selectedSpicy} onValueChange={setSelectedSpicy}>
              {menu.options.spicy.map((option) => (
                <div key={option.label} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.label} id={`spicy-${option.label}`} />
                  <Label htmlFor={`spicy-${option.label}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </OptionSection>
        )}
        
        {/* 토핑 추가 */}
        {menu.options?.toppings && menu.options.toppings.length > 0 && (
          <OptionSection title="토핑 추가 (선택)">
            <div className="space-y-3">
              {menu.options.toppings.map((option) => (
                <div key={option.label} className="flex items-center space-x-2">
                  <Checkbox
                    id={`topping-${option.label}`}
                    checked={selectedToppings.includes(option.label)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedToppings([...selectedToppings, option.label]);
                      } else {
                        setSelectedToppings(selectedToppings.filter((t) => t !== option.label));
                      }
                    }}
                  />
                  <Label htmlFor={`topping-${option.label}`} className="flex-1 cursor-pointer">
                    <span>{option.label}</span>
                    <span className="text-[#D61C1C] ml-2">
                      +{option.price.toLocaleString()}원
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </OptionSection>
        )}
        
        {/* 알레르기/원산지 */}
        <div className="space-y-3 p-4 bg-[#F9F6F3] rounded-xl">
          <div>
            <p className="text-sm text-[#2E1C10]/60 mb-1">⚠️ 알레르기 유발 성분</p>
            <p className="text-sm text-[#2E1C10]">
              {menu.allergens.length > 0 ? menu.allergens.join(', ') : '없음'}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#2E1C10]/60 mb-1">📍 원산지</p>
            <p className="text-sm text-[#2E1C10]">{menu.origin}</p>
          </div>
        </div>
      </div>
      
      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#2E1C10]/10 px-4 py-4">
        <div className="flex items-center gap-4">
          {/* 수량 선택 */}
          <div className="flex items-center border border-[#2E1C10]/20 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#F9F6F3]"
              aria-label="수량 감소"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-[#2E1C10]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#F9F6F3]"
              aria-label="수량 증가"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* 장바구니 담기 버튼 */}
          <Button
            size="lg"
            className="flex-1 bg-[#D61C1C] hover:bg-[#D61C1C]/90"
            onClick={handleAddToCart}
            disabled={isSoldOut || isTimeRestricted}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isSoldOut ? '품절' : isTimeRestricted ? '시간제 메뉴' : `${totalPrice.toLocaleString()}원 담기`}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface OptionSectionProps {
  title: string;
  children: React.ReactNode;
}

function OptionSection({ title, children }: OptionSectionProps) {
  return (
    <div>
      <h2 className="text-[#2E1C10] mb-3">{title}</h2>
      {children}
    </div>
  );
}
