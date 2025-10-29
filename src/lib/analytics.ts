/**
 * Firebase Analytics
 * 사용자 행동 추적 및 분석
 */

const USE_FIREBASE = false; // TODO: config/env.ts로 통합

/**
 * 이벤트 로깅
 */
export function trackEvent(
  name: string,
  params?: Record<string, any>
): void {
  if (USE_FIREBASE) {
    // TODO: Firebase Analytics 설정
    // import('firebase/analytics').then(({ logEvent }) => {
    //   import('./firebase').then(({ analytics }) => {
    //     logEvent(analytics, name, params);
    //   });
    // });
    console.log(`[Analytics - Firebase] ${name}`, params);
  } else {
    console.log(`[Analytics - Mock] ${name}`, params);
  }
}

/**
 * 페이지 뷰 추적
 */
export function trackPageView(pageName: string, params?: Record<string, any>): void {
  trackEvent('page_view', {
    page_name: pageName,
    ...params,
  });
}

/**
 * 메뉴 조회 추적
 */
export function trackMenuView(menuId: string, menuName: string): void {
  trackEvent('menu_view', {
    menu_id: menuId,
    menu_name: menuName,
  });
}

/**
 * 장바구니 추가 추적
 */
export function trackAddToCart(
  menuId: string,
  menuName: string,
  quantity: number,
  price: number
): void {
  trackEvent('add_to_cart', {
    menu_id: menuId,
    menu_name: menuName,
    quantity,
    price,
    value: price * quantity,
  });
}

/**
 * 장바구니 제거 추적
 */
export function trackRemoveFromCart(
  menuId: string,
  menuName: string,
  quantity: number
): void {
  trackEvent('remove_from_cart', {
    menu_id: menuId,
    menu_name: menuName,
    quantity,
  });
}

/**
 * 체크아웃 시작 추적
 */
export function trackBeginCheckout(
  itemCount: number,
  totalAmount: number
): void {
  trackEvent('begin_checkout', {
    item_count: itemCount,
    value: totalAmount,
  });
}

/**
 * 결제 완료 추적
 */
export function trackPurchase(
  orderId: string,
  orderNumber: string,
  amount: number,
  paymentMethod: string,
  itemCount: number
): void {
  trackEvent('purchase', {
    transaction_id: orderId,
    order_number: orderNumber,
    value: amount,
    payment_method: paymentMethod,
    item_count: itemCount,
  });
}

/**
 * 쿠폰 사용 추적
 */
export function trackCouponUsed(
  couponId: string,
  couponType: string,
  discount: number
): void {
  trackEvent('coupon_used', {
    coupon_id: couponId,
    coupon_type: couponType,
    discount,
  });
}

/**
 * 리뷰 작성 추적
 */
export function trackReviewWritten(
  orderId: string,
  rating: number,
  hasPhoto: boolean
): void {
  trackEvent('review_written', {
    order_id: orderId,
    rating,
    has_photo: hasPhoto,
  });
}

/**
 * 검색 추적
 */
export function trackSearch(searchTerm: string, resultCount: number): void {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount,
  });
}

/**
 * 공유 추적
 */
export function trackShare(
  contentType: string,
  itemId: string,
  method: string
): void {
  trackEvent('share', {
    content_type: contentType,
    item_id: itemId,
    method,
  });
}

/**
 * 사용자 속성 설정
 */
export function setUserProperties(properties: Record<string, any>): void {
  if (USE_FIREBASE) {
    // TODO: Firebase Analytics 설정
    // import('firebase/analytics').then(({ setUserProperties }) => {
    //   import('./firebase').then(({ analytics }) => {
    //     setUserProperties(analytics, properties);
    //   });
    // });
    console.log('[Analytics - Firebase] User properties:', properties);
  } else {
    console.log('[Analytics - Mock] User properties:', properties);
  }
}
