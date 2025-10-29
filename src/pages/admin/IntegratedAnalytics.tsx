/**
 * 통합 분석 페이지
 * Phase 3-7: 통합 리포트
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import {
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  Star,
  Gift,
  Zap,
  MessageSquare,
  Truck,
  Bell,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  generateIntegratedReport,
  exportReportToCSV,
} from '../../lib/admin/integrated-analytics.api';
import type { IntegratedReport, DateRange } from '../../types/analytics';

const COLORS = ['#D61C1C', '#F37021', '#C7A45A', '#8B7355', '#4A4A4A'];

export default function IntegratedAnalytics() {
  const [report, setReport] = useState<IntegratedReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    loadReport();
  }, [period]);

  const getDateRange = (): DateRange => {
    const end = new Date();
    const start = new Date();
    
    if (period === 'weekly') {
      start.setDate(end.getDate() - 7);
    } else {
      start.setDate(end.getDate() - 30);
    }
    
    return { start, end };
  };

  const loadReport = async () => {
    setLoading(true);
    try {
      const dateRange = getDateRange();
      const data = await generateIntegratedReport(period, dateRange);
      setReport(data);
    } catch (error) {
      console.error('Failed to load report:', error);
      toast.error('리포트를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!report) return;

    try {
      const csv = exportReportToCSV(report);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `통합리포트_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('리포트를 다운로드했습니다');
    } catch (error) {
      console.error('Failed to export report:', error);
      toast.error('다운로드에 실패했습니다');
    }
  };

  if (loading || !report) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#333] mb-2">통합 분석</h1>
            <p className="text-[#8B7355]">종합 성과 분석 및 인사이트</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">통합 분석</h1>
          <p className="text-[#8B7355]">
            {report.dateRange.start.toLocaleDateString()} ~ {report.dateRange.end.toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Tabs value={period} onValueChange={(value: any) => setPeriod(value)}>
            <TabsList>
              <TabsTrigger value="weekly">주간</TabsTrigger>
              <TabsTrigger value="monthly">월간</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={loadReport}>
            <RefreshCw className="w-4 h-4 mr-2" />
            새로고침
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            CSV 다운로드
          </Button>
        </div>
      </div>

      {/* KPI 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#D61C1C]" />
              총 매출
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{report.kpi.totalSales.toLocaleString()}원</div>
            <p className="text-xs text-gray-500 mt-1">
              평균 {report.kpi.averageOrderValue.toLocaleString()}원
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F37021]" />
              고객
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{report.kpi.newCustomers + report.kpi.returningCustomers}명</div>
            <p className="text-xs text-gray-500 mt-1">
              유지율 {report.kpi.customerRetentionRate.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#C7A45A]" />
              평점
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{report.kpi.averageRating.toFixed(1)}점</div>
            <p className="text-xs text-gray-500 mt-1">
              리뷰 {report.kpi.totalReviews}개
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#D61C1C]" />
              쿠폰 사용률
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{report.kpi.couponUsageRate.toFixed(1)}%</div>
            <p className="text-xs text-gray-500 mt-1">
              할인 {(report.kpi.totalDiscount / 10000).toFixed(0)}만원
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 인사이트 및 제안 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F37021]" />
              <h3 className="text-sm">주요 인사이트</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.insights.map((insight, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-[#D61C1C] mt-0.5">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#C7A45A]" />
              <h3 className="text-sm">개선 제안</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-[#F37021] mt-0.5">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 탭 메뉴 */}
      <Tabs defaultValue="hourly" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="hourly">시간대별</TabsTrigger>
          <TabsTrigger value="menu">메뉴 성과</TabsTrigger>
          <TabsTrigger value="coupon">쿠폰 효과</TabsTrigger>
          <TabsTrigger value="points">포인트</TabsTrigger>
          <TabsTrigger value="review">리뷰</TabsTrigger>
          <TabsTrigger value="delivery">배달</TabsTrigger>
          <TabsTrigger value="notification">알림</TabsTrigger>
        </TabsList>

        {/* 시간대별 분석 */}
        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-sm">시간대별 주문 분석</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={report.hourlyAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tickFormatter={(value) => `${value}시`} />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any, name: string) => {
                      if (name === 'orders') return [value, '주문 수'];
                      if (name === 'sales') return [value.toLocaleString() + '원', '매출'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="orders" fill="#D61C1C" name="주문 수" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-sm">요일별 매출</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={report.dayOfWeekAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dayName" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => value.toLocaleString() + '원'} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#F37021"
                    name="매출"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 메뉴 성과 */}
        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-sm">메뉴별 성과</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.topMenus.map((menu, index) => (
                  <div key={menu.menuId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div>
                        <p className="text-sm">{menu.menuName}</p>
                        <p className="text-xs text-gray-500">
                          {menu.totalOrders}건 · ⭐ {menu.averageRating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{menu.totalSales.toLocaleString()}원</p>
                      <p className="text-xs text-gray-500">리뷰 {menu.reviewCount}개</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 쿠폰 효과 */}
        <TabsContent value="coupon" className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-sm">쿠폰 효과 분석</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.couponEffectiveness.map((coupon) => (
                  <div key={coupon.couponType} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm">{coupon.couponType}</p>
                      <Badge variant="default">ROI {coupon.roi.toFixed(1)}x</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                      <div>
                        <p className="text-gray-500">발급/사용</p>
                        <p>{coupon.totalIssued} / {coupon.totalUsed}건</p>
                      </div>
                      <div>
                        <p className="text-gray-500">사용률</p>
                        <p>{coupon.usageRate.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">할인액</p>
                        <p>{coupon.totalDiscount.toLocaleString()}원</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 포인트 */}
        <TabsContent value="points" className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-sm">포인트 효과 분석</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">적립 포인트</p>
                  <p className="text-lg">{report.pointsEffectiveness.totalEarned.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">사용 포인트</p>
                  <p className="text-lg">{report.pointsEffectiveness.totalSpent.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">사용률</p>
                  <p className="text-lg">{report.pointsEffectiveness.redemptionRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">활성 사용자</p>
                  <p className="text-lg">{report.pointsEffectiveness.activeUsers}명</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                💡 포인트 사용 시 평균 주문 금액이 {report.pointsEffectiveness.orderIncreaseWithPoints.toLocaleString()}원 증가합니다.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 리뷰 */}
        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-sm">리뷰 분석</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">평균 평점</p>
                  <p className="text-lg">⭐ {report.reviewAnalysis.averageRating.toFixed(1)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">총 리뷰</p>
                  <p className="text-lg">{report.reviewAnalysis.totalReviews}개</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">사진 리뷰율</p>
                  <p className="text-lg">{report.reviewAnalysis.photoReviewRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">답글 작성률</p>
                  <p className="text-lg">{report.reviewAnalysis.responseRate.toFixed(1)}%</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">주요 키워드</p>
                <div className="flex flex-wrap gap-2">
                  {report.reviewAnalysis.topKeywords.map((keyword) => (
                    <Badge key={keyword.keyword} variant="secondary">
                      {keyword.keyword} ({keyword.count})
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 배달 */}
        <TabsContent value="delivery" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#D61C1C]" />
                <h3 className="text-sm">배달 성과</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">총 배달</p>
                  <p className="text-lg">{report.deliveryPerformance.totalDeliveries}건</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">평균 배달 시간</p>
                  <p className="text-lg">{report.deliveryPerformance.averageDeliveryTime.toFixed(1)}분</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">정시 배달률</p>
                  <p className="text-lg">{report.deliveryPerformance.onTimeRate.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 알림 */}
        <TabsContent value="notification" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#F37021]" />
                <h3 className="text-sm">알림 효과</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">발송</p>
                  <p className="text-lg">{report.notificationEffectiveness.totalSent}건</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">읽음률</p>
                  <p className="text-lg">{report.notificationEffectiveness.readRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">클릭률</p>
                  <p className="text-lg">{report.notificationEffectiveness.clickRate.toFixed(1)}%</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">타입별 성과</p>
                <div className="space-y-2">
                  {Object.entries(report.notificationEffectiveness.byType).map(([type, stats]) => (
                    <div key={type} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                      <span className="text-gray-700">{type}</span>
                      <span className="text-gray-500">
                        {stats.sent}건 · 읽음 {((stats.read / stats.sent) * 100).toFixed(0)}% · 클릭 {((stats.clicked / stats.sent) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
