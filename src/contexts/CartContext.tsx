import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartContextType, CartItem, DeliveryType, DeliveryAddress } from '../types/cart';
import { calculateDeliveryFee } from '../lib/cart/deliveryFee';
import deliveryZonesConfig from '../config/delivery-zones.json';

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'hyunpung_cart';
const MIN_ORDER_DELIVERY = 15000;
const MIN_ORDER_PICKUP = 5000;
const BASE_DELIVERY_FEE = 3000;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryType, setDeliveryTypeState] = useState<DeliveryType>('delivery');
  const [deliveryAddress, setDeliveryAddressState] = useState<DeliveryAddress | undefined>();
  const [requests, setRequestsState] = useState<string>('');
  const [couponId, setCouponId] = useState<string | undefined>();
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // 로컬 스토리지에서 장바구니 복원
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setItems(data.items || []);
        setDeliveryTypeState(data.deliveryType || 'delivery');
        setDeliveryAddressState(data.deliveryAddress);
        setRequestsState(data.requests || '');
        setCouponId(data.couponId);
        setCouponDiscount(data.couponDiscount || 0);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // 장바구니 상태 변경 시 로컬 스토리지 저장
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items,
          deliveryType,
          deliveryAddress,
          requests,
          couponId,
          couponDiscount,
        })
      );
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items, deliveryType, deliveryAddress, requests, couponId, couponDiscount]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      // 동일한 메뉴와 옵션이 있는지 확인
      const existingIndex = prev.findIndex(
        (i) =>
          i.menuId === item.menuId &&
          i.options.noodle === item.options.noodle &&
          i.options.spicy === item.options.spicy &&
          JSON.stringify(i.options.toppings?.sort()) === JSON.stringify(item.options.toppings?.sort())
      );

      if (existingIndex >= 0) {
        // 기존 항목 수량 증가
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        updated[existingIndex].subtotal = 
          (item.menuPrice + item.optionPrices.noodle + item.optionPrices.toppings) * 
          updated[existingIndex].quantity;
        return updated;
      }

      // 새 항목 추가
      return [...prev, item];
    });
  };

  const removeItem = (menuId: string) => {
    setItems((prev) => prev.filter((item) => item.menuId !== menuId));
  };

  const updateQuantity = (menuId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.menuId === menuId) {
          const unitPrice = item.menuPrice + item.optionPrices.noodle + item.optionPrices.toppings;
          return {
            ...item,
            quantity,
            subtotal: unitPrice * quantity,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponId(undefined);
    setCouponDiscount(0);
    setRequestsState('');
  };

  const setDeliveryType = (type: DeliveryType) => {
    setDeliveryTypeState(type);
  };

  const setDeliveryAddress = (address: DeliveryAddress) => {
    setDeliveryAddressState(address);
  };

  const setRequests = (req: string) => {
    setRequestsState(req);
  };

  /**
   * 쿠폰 적용 (유효성 검증 포함)
   * @param id 쿠폰 ID
   * @param discount 할인 금액
   * @param validate 검증 여부 (기본값: false, API 호출 시 true)
   */
  const applyCoupon = async (
    id: string,
    discount: number,
    validate: boolean = false
  ): Promise<boolean> => {
    if (validate) {
      // 유효성 검증 수행
      try {
        const { validateCoupon } = await import('../lib/coupons.api');
        const { getCurrentUser } = await import('../lib/auth');
        
        const user = getCurrentUser();
        if (!user) {
          return false;
        }

        const subtotal = getSubtotal();
        const deliveryFee = getDeliveryFee();
        const orderAmount = subtotal + deliveryFee;

        const validation = await validateCoupon(id, orderAmount, user.uid);

        if (!validation.valid) {
          console.error('Coupon validation failed:', validation.reason);
          return false;
        }

        // 검증 성공 시 적용
        setCouponId(id);
        setCouponDiscount(validation.coupon?.amount || discount);
        return true;
      } catch (error) {
        console.error('Failed to validate coupon:', error);
        return false;
      }
    }

    // 검증 없이 적용 (기존 호환성)
    setCouponId(id);
    setCouponDiscount(discount);
    return true;
  };

  const removeCoupon = () => {
    setCouponId(undefined);
    setCouponDiscount(0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  };

  const getDeliveryFee = () => {
    if (deliveryType === 'pickup') return 0;
    
    const subtotal = getSubtotal();
    
    // 최소 주문 금액 미달 시 배달 불가
    if (subtotal < MIN_ORDER_DELIVERY) return 0;

    // 배달 주소가 없으면 기본 배달비 반환 (주소 입력 전)
    if (!deliveryAddress || !deliveryAddress.lat || !deliveryAddress.lng) {
      return BASE_DELIVERY_FEE; // 기본 배달비 (사용자 안내용)
    }

    // 거리 기반 배달비 계산
    const storeLocation = deliveryZonesConfig.storeLocation;
    const result = calculateDeliveryFee(
      storeLocation.lat,
      storeLocation.lng,
      deliveryAddress.lat,
      deliveryAddress.lng,
      deliveryAddress.address,
      {
        useNightFee: true,
        weight: 'normal',
      }
    );

    // 배달 불가 지역이면 0 반환
    if (!result.canDeliver) {
      return 0;
    }

    return result.fee;
  };

  const getTotalAmount = () => {
    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const total = subtotal + deliveryFee - couponDiscount;
    // 최소 주문 금액 체크 (0원 이하 방지)
    return Math.max(0, total);
  };

  /**
   * 최소 주문 금액 체크
   */
  const canCheckout = (): boolean => {
    const subtotal = getSubtotal();
    const minOrder = deliveryType === 'delivery' ? MIN_ORDER_DELIVERY : MIN_ORDER_PICKUP;
    return subtotal >= minOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        deliveryType,
        deliveryAddress,
        requests,
        couponId,
        couponDiscount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setDeliveryType,
        setDeliveryAddress,
        setRequests,
        applyCoupon,
        removeCoupon,
        getTotalItems,
        getSubtotal,
        getDeliveryFee,
        getTotalAmount,
        canCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
