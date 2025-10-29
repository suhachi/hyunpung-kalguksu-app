/**
 * 통합 리포트 및 분석 타입 정의
 * Phase 3-7: 통합 리포트
 */

// 기간 타입
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'custom';

// 날짜 범위
export interface DateRange {
  start: Date;
  end: Date;
}

// 통합 KPI 데이터
export interface IntegratedKPI {
  // 매출 지표
  totalSales: number;
  averageOrderValue: number;
  totalOrders: number;
  
  // 고객 지표
  newCustomers: number;
  returningCustomers: number;
  customerRetentionRate: number; // %
  
  // 평점 지표
  averageRating: number;
  totalReviews: number;
  photoReviewRate: number; // %
  
  // 포인트 지표
  totalPointsEarned: number;
  totalPointsSpent: number;
  pointsRedemptionRate: number; // %
  
  // 쿠폰 지표
  totalCouponsIssued: number;
  totalCouponsUsed: number;
  couponUsageRate: number; // %
  totalDiscount: number;
  
  // 전환율 지표
  installRate: number; // A2HS 설치율 %
  cartConversionRate: number; // 장바구니 → 주문 전환율 %
  paymentSuccessRate: number; // 결제 성공률 %
}

// 시간대별 주문 분석
export interface HourlyAnalysis {
  hour: number;
  orders: number;
  sales: number;
  averageOrderValue: number;
}

// 요일별 분석
export interface DayOfWeekAnalysis {
  dayOfWeek: number; // 0 (일) ~ 6 (토)
  dayName: string;
  orders: number;
  sales: number;
  averageOrderValue: number;
}

// 메뉴별 성과
export interface MenuPerformance {
  menuId: string;
  menuName: string;
  category: string;
  totalOrders: number;
  totalSales: number;
  averageRating: number;
  reviewCount: number;
}

// 고객 행동 분석
export interface CustomerBehavior {
  userId: string;
  userName: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: Date;
  favoriteMenu: string;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'vip';
}

// 쿠폰 효과 분석
export interface CouponEffectiveness {
  couponType: string;
  totalIssued: number;
  totalUsed: number;
  usageRate: number; // %
  totalDiscount: number;
  averageOrderIncrease: number; // 쿠폰 사용 시 평균 주문 증가액
  roi: number; // 투자 대비 수익률
}

// 포인트 효과 분석
export interface PointsEffectiveness {
  totalEarned: number;
  totalSpent: number;
  totalExpired: number;
  activeUsers: number;
  averageBalance: number;
  redemptionRate: number; // %
  orderIncreaseWithPoints: number; // 포인트 사용 시 평균 주문 증가액
}

// 리뷰 분석
export interface ReviewAnalysis {
  totalReviews: number;
  averageRating: number;
  photoReviewCount: number;
  photoReviewRate: number; // %
  sentimentScore: number; // 감성 분석 점수 (1-5)
  topKeywords: Array<{ keyword: string; count: number }>;
  responseRate: number; // 답글 작성률 %
  responseTime: number; // 평균 답글 시간 (분)
}

// 배달 성과
export interface DeliveryPerformance {
  totalDeliveries: number;
  averageDeliveryTime: number; // 분
  onTimeRate: number; // 정시 배달률 %
  delayedOrders: number;
  averageDistance: number; // km
}

// 알림 효과
export interface NotificationEffectiveness {
  totalSent: number;
  totalRead: number;
  totalClicked: number;
  readRate: number; // %
  clickRate: number; // %
  conversionRate: number; // 알림 클릭 → 주문 전환율 %
  byType: Record<string, {
    sent: number;
    read: number;
    clicked: number;
  }>;
}

// 통합 리포트
export interface IntegratedReport {
  period: ReportPeriod;
  dateRange: DateRange;
  generatedAt: Date;
  
  kpi: IntegratedKPI;
  hourlyAnalysis: HourlyAnalysis[];
  dayOfWeekAnalysis: DayOfWeekAnalysis[];
  topMenus: MenuPerformance[];
  topCustomers: CustomerBehavior[];
  
  couponEffectiveness: CouponEffectiveness[];
  pointsEffectiveness: PointsEffectiveness;
  reviewAnalysis: ReviewAnalysis;
  deliveryPerformance: DeliveryPerformance;
  notificationEffectiveness: NotificationEffectiveness;
  
  // 추가 지표
  insights: string[]; // AI 인사이트 (선택)
  recommendations: string[]; // 개선 제안
}

// 차트 데이터 타입
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }>;
}

// 내보내기 형식
export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';

// 리포트 설정
export interface ReportSettings {
  autoGenerate: boolean; // 자동 생성 여부
  frequency: 'daily' | 'weekly' | 'monthly';
  emailRecipients: string[]; // 이메일 수신자
  includeCharts: boolean; // 차트 포함 여부
  format: ExportFormat;
}
