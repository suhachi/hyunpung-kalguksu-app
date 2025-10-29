import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartContextType, CartItem, DeliveryType, DeliveryAddress } from '../types/cart';

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

  const applyCoupon = (id: string, discount: number) => {
    setCouponId(id);
    setCouponDiscount(discount);
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
    
    // 실제로는 거리 기반 계산
    // TODO: 주소에서 거리 계산 후 배달비 산정
    return BASE_DELIVERY_FEE;
  };

  const getTotalAmount = () => {
    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    return subtotal + deliveryFee - couponDiscount;
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
