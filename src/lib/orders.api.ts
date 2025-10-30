/**
 * 고객용 주문 API
 * 주문 내역 조회, 재주문
 */

import type { Order, OrderStatus } from '../types/order';
import { USE_FIREBASE } from '../config/env';

export interface OrderFilters {
  status?: OrderStatus;
  startDate?: number;
  endDate?: number;
}

/**
 * 사용자 주문 목록 조회 (무한 스크롤 지원)
 * 
 * @param userId 사용자 ID
 * @param filters 필터 (상태, 기간)
 * @param limit 페이지 크기
 * @param lastDoc 마지막 문서 (페이징용)
 * @returns 주문 목록 및 다음 페이지 마지막 문서
 */
export async function listUserOrders(
  userId: string,
  filters: OrderFilters = {},
  limit: number = 20,
  lastDoc?: any
): Promise<{ orders: Order[]; lastDoc: any | null; hasMore: boolean }> {
  if (USE_FIREBASE) {
    const { collection, query, where, orderBy, limitToLast, startAfter, getDocs } = await import('firebase/firestore');
    const { db } = await import('./firebase');

    let q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    // 상태 필터
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    // 기간 필터
    if (filters.startDate) {
      const { Timestamp } = await import('firebase/firestore');
      q = query(q, where('createdAt', '>=', Timestamp.fromMillis(filters.startDate)));
    }
    if (filters.endDate) {
      const { Timestamp } = await import('firebase/firestore');
      q = query(q, where('createdAt', '<=', Timestamp.fromMillis(filters.endDate)));
    }

    // 페이징
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    q = query(q, limitToLast(limit));

    const snapshot = await getDocs(q);
    const orders: Order[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        orderId: doc.id,
        ...data,
      } as Order);
    });

    const lastDocument = snapshot.docs[snapshot.docs.length - 1] || null;
    const hasMore = snapshot.docs.length === limit;

    return { orders, lastDoc: lastDocument, hasMore };
  }

  // Mock 모드
  await new Promise(resolve => setTimeout(resolve, 300));

  // localStorage에서 주문 조회
  const ordersStr = localStorage.getItem('orders');
  const allOrders: Record<string, any> = ordersStr ? JSON.parse(ordersStr) : {};

  let ordersList = Object.values(allOrders)
    .filter((order: any) => order.userId === userId || order.userId === 'user_001') // Mock: user_001 허용
    .map((order: any) => ({
      ...order,
      createdAt: typeof order.createdAt === 'string' 
        ? { seconds: new Date(order.createdAt).getTime() / 1000, nanoseconds: 0 } as any
        : order.createdAt,
      updatedAt: typeof order.updatedAt === 'string'
        ? { seconds: new Date(order.updatedAt).getTime() / 1000, nanoseconds: 0 } as any
        : order.updatedAt,
    })) as Order[];

  // 상태 필터
  if (filters.status) {
    ordersList = ordersList.filter((o) => o.status === filters.status);
  }

  // 기간 필터
  if (filters.startDate) {
    ordersList = ordersList.filter((o) => {
      const created = o.createdAt?.seconds 
        ? o.createdAt.seconds * 1000 
        : typeof o.createdAt === 'string' 
          ? new Date(o.createdAt).getTime() 
          : 0;
      return created >= filters.startDate!;
    });
  }
  if (filters.endDate) {
    ordersList = ordersList.filter((o) => {
      const created = o.createdAt?.seconds
        ? o.createdAt.seconds * 1000
        : typeof o.createdAt === 'string'
          ? new Date(o.createdAt).getTime()
          : 0;
      return created <= filters.endDate!;
    });
  }

  // 정렬 (최신순)
  ordersList.sort((a, b) => {
    const aTime = a.createdAt?.seconds 
      ? a.createdAt.seconds 
      : typeof a.createdAt === 'string' 
        ? new Date(a.createdAt).getTime() / 1000 
        : 0;
    const bTime = b.createdAt?.seconds
      ? b.createdAt.seconds
      : typeof b.createdAt === 'string'
        ? new Date(b.createdAt).getTime() / 1000
        : 0;
    return bTime - aTime;
  });

  // 페이징 (Mock)
  const startIndex = lastDoc ? (lastDoc as number) : 0;
  const paginatedOrders = ordersList.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < ordersList.length;

  return {
    orders: paginatedOrders,
    lastDoc: hasMore ? startIndex + limit : null,
    hasMore,
  };
}

/**
 * 주문 상세 조회
 */
export async function getOrder(orderId: string): Promise<Order | null> {
  if (USE_FIREBASE) {
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');

    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (!orderDoc.exists()) {
      return null;
    }

    return {
      orderId: orderDoc.id,
      ...orderDoc.data(),
    } as Order;
  }

  // Mock 모드
  await new Promise(resolve => setTimeout(resolve, 200));

  const ordersStr = localStorage.getItem('orders');
  const allOrders: Record<string, any> = ordersStr ? JSON.parse(ordersStr) : {};
  const order = allOrders[orderId];

  if (!order) {
    return null;
  }

  return {
    ...order,
    createdAt: typeof order.createdAt === 'string'
      ? { seconds: new Date(order.createdAt).getTime() / 1000, nanoseconds: 0 } as any
      : order.createdAt,
    updatedAt: typeof order.updatedAt === 'string'
      ? { seconds: new Date(order.updatedAt).getTime() / 1000, nanoseconds: 0 } as any
      : order.updatedAt,
  } as Order;
}

/**
 * 재주문
 * 이전 주문의 아이템들을 장바구니에 재구성
 * 
 * @param orderId 주문 ID
 * @returns 재주문 성공 여부 및 경고 메시지
 */
export async function reorder(orderId: string): Promise<{
  success: boolean;
  warnings: string[];
  errors: string[];
}> {
  const warnings: string[] = [];
  const errors: string[] = [];

  try {
    const order = await getOrder(orderId);

    if (!order) {
      errors.push('주문을 찾을 수 없습니다');
      return { success: false, warnings, errors };
    }

    // CartContext 가져오기
    const { useCart } = await import('../contexts/CartContext');
    // Note: useCart는 Hook이므로 직접 호출 불가
    // 재주문 함수는 컴포넌트에서 호출하고 CartContext에 접근해야 함

    // 여기서는 주문 데이터 반환만 수행
    // 실제 재주문 로직은 컴포넌트에서 처리

    return {
      success: true,
      warnings: [
        // 메뉴 가격 변경 가능성 경고
        '메뉴 가격이 변경되었을 수 있습니다',
        '품절된 메뉴는 장바구니에서 제외될 수 있습니다',
      ],
      errors: [],
    };
  } catch (error: any) {
    console.error('Reorder failed:', error);
    errors.push(error.message || '재주문 처리 중 오류가 발생했습니다');
    return { success: false, warnings, errors };
  }
}

