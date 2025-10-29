/**
 * 관제/메트릭 API
 * Phase 2-9: KPI 및 차트 데이터
 */

const USE_FIREBASE = false;

// KPI 데이터
export interface KPIData {
  todaySales: number;
  todayOrders: number;
  avgRating: number;
  installRate: number; // A2HS 설치율 (%)
  conversionRate: number; // 주문 전환율 (%)
}

// 시간대별 주문
export interface HourlyOrders {
  hour: number;
  orders: number;
}

// 메뉴별 매출
export interface MenuSales {
  menuName: string;
  sales: number;
  orders: number;
}

// 일별 매출
export interface DailySales {
  date: string;
  sales: number;
  orders: number;
}

/**
 * KPI 데이터 조회
 */
export async function getKPIData(): Promise<KPIData> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    todaySales: 1250000,
    todayOrders: 42,
    avgRating: 4.7,
    installRate: 23.5,
    conversionRate: 8.2,
  };
}

/**
 * 시간대별 주문 (오늘)
 */
export async function getHourlyOrders(): Promise<HourlyOrders[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore query
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { hour: 10, orders: 2 },
    { hour: 11, orders: 5 },
    { hour: 12, orders: 12 },
    { hour: 13, orders: 8 },
    { hour: 14, orders: 3 },
    { hour: 17, orders: 4 },
    { hour: 18, orders: 10 },
    { hour: 19, orders: 15 },
    { hour: 20, orders: 8 },
    { hour: 21, orders: 5 },
  ];
}

/**
 * 메뉴별 매출 Top 5
 */
export async function getTopMenuSales(): Promise<MenuSales[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { menuName: '현풍닭칼국수', sales: 450000, orders: 50 },
    { menuName: '얼큰닭칼국수', sales: 380000, orders: 40 },
    { menuName: '냉닭칼국수', sales: 285000, orders: 30 },
    { menuName: '수육 (대)', sales: 200000, orders: 10 },
    { menuName: '닭칼국수 세트', sales: 180000, orders: 10 },
  ];
}

/**
 * 일별 매출 추이 (최근 7일)
 */
export async function getDailySales(): Promise<DailySales[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  const today = new Date();
  const data: DailySales[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

    data.push({
      date: dateStr,
      sales: Math.floor(Math.random() * 500000) + 800000,
      orders: Math.floor(Math.random() * 20) + 30,
    });
  }

  return data;
}
