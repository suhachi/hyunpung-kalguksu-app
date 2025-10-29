export interface CartItem {
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
}

export type DeliveryType = 'delivery' | 'pickup';

export interface DeliveryAddress {
  address: string;
  detail: string;
  lat?: number;
  lng?: number;
}

export interface CartState {
  items: CartItem[];
  deliveryType: DeliveryType;
  deliveryAddress?: DeliveryAddress;
  requests?: string;
  couponId?: string;
  couponDiscount: number;
}

export interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (menuId: string) => void;
  updateQuantity: (menuId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryType: (type: DeliveryType) => void;
  setDeliveryAddress: (address: DeliveryAddress) => void;
  setRequests: (requests: string) => void;
  applyCoupon: (couponId: string, discount: number) => void;
  removeCoupon: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotalAmount: () => number;
}
