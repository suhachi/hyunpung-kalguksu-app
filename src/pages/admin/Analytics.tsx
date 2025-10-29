/**
 * 관리자 관제/메트릭 페이지
 * Phase 2-9: KPI 대시보드 + 차트
 */

import { useState, useEffect } from 'react';
import {
  getKPIData,
  getHourlyOrders,
  getTopMenuSales,
  getDailySales,
  KPIData,
  HourlyOrders,
  MenuSales,
  DailySales,
} from '../../lib/admin/analytics.api';
import { StatCard } from '../../components/admin/common/StatCard';
import { Card } from '../../components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, Star, Download, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function Analytics() {
  const [kpi, setKpi] = useState<KPIData | null>(null);
  const [hourlyOrders, setHourlyOrders] = useState<HourlyOrders[]>([]);
  const [topMenus, setTopMenus] = useState<MenuSales[]>([]);
  const [dailySales, setDailySales] = useState<DailySales[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [kpiData, hourlyData, menuData, salesData] = await Promise.all([
        getKPIData(),
        getHourlyOrders(),
        getTopMenuSales(),
        getDailySales(),
      ]);

      setKpi(kpiData);
      setHourlyOrders(hourlyData);
      setTopMenus(menuData);
      setDailySales(salesData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      toast.error('데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !kpi) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">관제 대시보드</h1>
          <p className="text-[#8B7355]">핵심 지표와 퍼널 데이터를 확인하세요</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">관제 대시보드</h1>
          <p className="text-[#8B7355]">
            핵심 지표와 퍼널 데이터를 확인하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            새로고침
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            리포트
          </Button>
        </div>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          title="오늘 매출"
          value={`${(kpi.todaySales / 10000).toFixed(0)}만원`}
          subtitle={`${kpi.todayOrders}건`}
          icon={TrendingUp}
        />
        <StatCard
          title="주문 수"
          value={kpi.todayOrders}
          subtitle="오늘 주문"
          variant="success"
        />
        <StatCard
          title="평균 평점"
          value={kpi.avgRating.toFixed(1)}
          subtitle="전체 리뷰"
          icon={Star}
          variant="info"
        />
        <StatCard
          title="설치율"
          value={`${kpi.installRate}%`}
          subtitle="A2HS 설치"
          icon={Download}
          variant="warning"
        />
        <StatCard
          title="전환율"
          value={`${kpi.conversionRate}%`}
          subtitle="방문→주문"
          icon={Users}
        />
      </div>

      {/* 차트 1: 일별 매출 추이 */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4">일별 매출 추이 (최근 7일)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: any) => `${(value / 10000).toFixed(0)}만원`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#D61C1C"
              strokeWidth={2}
              name="매출"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* 차트 2: 시간대별 주문 */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4">시간대별 주문 (오늘)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyOrders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" tickFormatter={(h) => `${h}시`} />
            <YAxis />
            <Tooltip labelFormatter={(h) => `${h}시`} />
            <Legend />
            <Bar dataKey="orders" fill="#F37021" name="주문 건수" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 차트 3: 메뉴별 매출 Top 5 */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4">메뉴별 매출 Top 5</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topMenus} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => `${(v / 10000).toFixed(0)}만원`} />
            <YAxis type="category" dataKey="menuName" width={120} />
            <Tooltip
              formatter={(value: any) => `${(value / 10000).toFixed(0)}만원`}
            />
            <Legend />
            <Bar dataKey="sales" fill="#C7A45A" name="매출" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 집계 정보 */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4">데이터 집계 정보</h3>
        <div className="space-y-2 text-sm text-[#8B7355]">
          <div className="flex items-start gap-2">
            <span className="text-[#D61C1C]">•</span>
            <span><strong>실시간 업데이트:</strong> Firebase Firestore onSnapshot (연동 시)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#F37021]">•</span>
            <span><strong>주간 리포트:</strong> 매주 월요일 04:00 자동 생성 (Functions)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C7A45A]">•</span>
            <span><strong>이벤트 로깅:</strong> install_*, menu_view, add_to_cart, payment_*, order_*, review_*</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span><strong>알림 (준비):</strong> 결제 실패, 주문 폭증, 평점 급락 등 (FCM)</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
