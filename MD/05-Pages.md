# PAGES 파일들

총 53개 파일 (업데이트: 2025-10-29) - 전체 코드 포함 100%

## 27. src/pages/DevTools.tsx

```typescript
/**
 * 개발자 도구 페이지
 * 권한 전환, Firebase 모드 전환 등
 * 프로덕션에서는 제거 필요
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockLogin, getCurrentUser, type AuthUser } from '../lib/auth';

export function DevTools() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  async function loadCurrentUser() {
    const user = await getCurrentUser();
    setCurrentUser(user);
  }

  function handleRoleSwitch(role: 'customer' | 'owner' | 'admin') {
    mockLogin(role);
    loadCurrentUser();
  }

  return (
    <div className="min-h-screen bg-[#F9F6F3] p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h1 className="text-2xl text-[#333] mb-2">🛠️ 개발자 도구</h1>
          <p className="text-[#8B7355]">
            권한 전환 및 개발 모드 설정
          </p>
        </div>

        {/* 현재 상태 */}
        <Card className="p-6">
          <h2 className="text-[#333] mb-4">현재 상태</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#8B7355]">사용자 ID</span>
              <span className="text-[#333]">{currentUser?.uid || '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B7355]">이름</span>
              <span className="text-[#333]">{currentUser?.displayName || '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B7355]">역할</span>
              <Badge variant={currentUser?.role === 'admin' ? 'destructive' : 'default'}>
                {currentUser?.role || '-'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B7355]">Firebase 모드</span>
              <Badge variant="outline">
                USE_FIREBASE = false (Mock)
              </Badge>
            </div>
          </div>
        </Card>

        {/* 권한 전환 */}
        <Card className="p-6">
          <h2 className="text-[#333] mb-4">권한 전환</h2>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={currentUser?.role === 'customer' ? 'default' : 'outline'}
              onClick={() => handleRoleSwitch('customer')}
            >
              고객
            </Button>
            <Button
              variant={currentUser?.role === 'owner' ? 'default' : 'outline'}
              onClick={() => handleRoleSwitch('owner')}
            >
              점주
            </Button>
            <Button
              variant={currentUser?.role === 'admin' ? 'default' : 'outline'}
              onClick={() => handleRoleSwitch('admin')}
            >
              관리자
            </Button>
          </div>
        </Card>

        {/* 페이지 네비게이션 */}
        <Card className="p-6">
          <h2 className="text-[#333] mb-4">페이지 테스트</h2>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/')}
            >
              🏠 홈
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/menu')}
            >
              🍜 메뉴 목록
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/cart')}
            >
              🛒 장바구니
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/coupons')}
            >
              🎟️ 쿠폰함
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/reviews')}
            >
              ⭐ 리뷰 목록
            </Button>
            <hr className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin');
              }}
            >
              📊 관리자 대시보드
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin/orders');
              }}
            >
              📦 주문 관리
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin/reviews');
              }}
            >
              💬 리뷰 관리
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin/menus');
              }}
            >
              📋 메뉴 관리
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin/promotions');
              }}
            >
              🎫 쿠폰/프로모션
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin/analytics');
              }}
            >
              📈 관제 대시보드
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin/settings');
              }}
            >
              ⚙️ 설정
            </Button>
          </div>
        </Card>

        {/* 빠른 이동 */}
        <Card className="p-6">
          <h2 className="text-[#333] mb-4">빠른 이동</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              🍜 고객 앱
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleRoleSwitch('admin');
                navigate('/admin');
              }}
            >
              📊 관리자
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/brand')}
            >
              🎨 브랜드 가이드
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/reviews')}
            >
              ⭐ 리뷰
            </Button>
          </div>
        </Card>

        {/* localStorage 관리 */}
        <Card className="p-6">
          <h2 className="text-[#333] mb-4">데이터 관리</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full"
            >
              🗑️ localStorage 초기화
            </Button>
            <p className="text-sm text-[#8B7355]">
              ⚠️ 장바구니, 리뷰 등 모든 Mock 데이터가 삭제됩니다
            </p>
          </div>
        </Card>

        {/* 안내 */}
        <Card className="p-6 bg-red-50 border-red-200">
          <h2 className="text-red-900 mb-2">⚠️ 주의사항</h2>
          <ul className="space-y-1 text-sm text-red-700">
            <li>• 이 페이지는 개발용입니다</li>
            <li>• 프로덕션 배포 시 반드시 제거하세요</li>
            <li>• USE_FIREBASE=true 전환 후 실제 인증 사용</li>
          </ul>
        </Card>

        <div className="text-center text-sm text-[#8B7355] pb-8">
          <p>Phase 2 전체 구현 완료 테스트용</p>
        </div>
      </div>
    </div>
  );
}
```

## 28. src/pages/admin/Analytics.tsx

```typescript
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
import { toast } from 'sonner@2.0.3';

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
```

## 29. src/pages/admin/Dashboard.tsx

```typescript
import { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import { StatCard } from '../../components/admin/common/StatCard';
import { Card } from '../../components/ui/card';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todaySales: 0,
    todayOrders: 0,
    averageRating: 0,
    installRate: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    // Mock 데이터 로딩
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStats({
      todaySales: 1250000,
      todayOrders: 42,
      averageRating: 4.8,
      installRate: 68,
    });

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-[#333] mb-2">대시보드</h1>
        <p className="text-[#8B7355]">
          현풍닭칼국수 운영 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="오늘 매출"
          value={`${stats.todaySales.toLocaleString()}원`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          subtitle="전일 대비"
          loading={loading}
        />

        <StatCard
          title="오늘 주문"
          value={`${stats.todayOrders}건`}
          icon={ShoppingBag}
          trend={{ value: 8.3, isPositive: true }}
          subtitle="전일 대비"
          loading={loading}
        />

        <StatCard
          title="평균 평점"
          value={stats.averageRating.toFixed(1)}
          icon={Star}
          subtitle="전체 리뷰 기준"
          loading={loading}
        />

        <StatCard
          title="PWA 설치율"
          value={`${stats.installRate}%`}
          icon={TrendingUp}
          trend={{ value: 5.2, isPositive: true }}
          subtitle="이번 주 기준"
          loading={loading}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 실시간 주문 현황 */}
        <Card className="p-6">
          <h2 className="text-[#333] mb-4">실시간 주문 현황</h2>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-[#8B7355]">로딩 중...</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#8B7355]">
                  새로운 주문이 없습니다
                </p>
                <p className="text-[#8B7355] mt-1">
                  주문이 들어오면 여기에 표시됩니다
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* 최근 리뷰 */}
        <Card className="p-6">
          <h2 className="text-[#333] mb-4">최근 리뷰</h2>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-[#8B7355]">로딩 중...</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#8B7355]">
                  최근 리뷰가 없습니다
                </p>
                <p className="text-[#8B7355] mt-1">
                  고객이 리뷰를 남기면 여기에 표시됩니다
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* 시간대별 주문 현황 */}
      <Card className="p-6">
        <h2 className="text-[#333] mb-4">시간대별 주문 현황</h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#E5DDD5] rounded-lg">
          <p className="text-[#8B7355]">
            차트가 여기에 표시됩니다 (Phase 2-9에서 구현 예정)
          </p>
        </div>
      </Card>

      {/* 도움말 */}
      <Card className="p-6 bg-[#F37021]/5 border-[#F37021]/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="text-[#333] mb-2">관리자 대시보드 안내</h3>
            <ul className="space-y-1 text-[#8B7355]">
              <li>• 좌측 메뉴에서 주문, 리뷰, 메뉴, 설정을 관리할 수 있습니다</li>
              <li>• 실시간 통계는 Firebase 연동 후 자동으로 업데이트됩니다</li>
              <li>• 모바일에서는 상단 메뉴 버튼을 눌러 네비게이션을 열 수 있습니다</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

## 30. src/pages/admin/Delivery.tsx

```typescript
/**
 * 관리자 배달 관제 페이지
 * Phase 3-1: GPS Tracking
 * 
 * 모든 배달 현황을 실시간으로 모니터링
 */

import { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, AlertTriangle, RefreshCw, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { getAllMockTasks, subscribeMockTasks } from '../../lib/delivery';
import { isDeliveryEnabled } from '../../lib/delivery';
import type { DeliveryTask, DeliveryStatus } from '../../types/delivery';

const STATUS_CONFIG: Record<DeliveryStatus, { label: string; color: string }> = {
  assigned: { label: '배정됨', color: 'bg-blue-500' },
  picked_up: { label: '픽업 완료', color: 'bg-purple-500' },
  delivering: { label: '배달 중', color: 'bg-orange-500' },
  completed: { label: '완료', color: 'bg-green-500' },
  canceled: { label: '취소', color: 'bg-gray-500' },
};

const SLA_THRESHOLD_MINUTES = 45; // SLA 기준: 45분

export default function Delivery() {
  const [tasks, setTasks] = useState<DeliveryTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'delayed'>('all');

  useEffect(() => {
    if (!isDeliveryEnabled) return;

    // 초기 로드
    loadTasks();

    // 실시간 구독
    const unsubscribe = subscribeMockTasks(() => {
      loadTasks();
    });

    return unsubscribe;
  }, []);

  function loadTasks() {
    try {
      setLoading(true);
      const allTasks = getAllMockTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error('Failed to load delivery tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!isDeliveryEnabled) {
    return (
      <div className="p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            배달 추적 기능이 비활성화되어 있습니다. 환경 변수에서 VITE_DELIVERY_ENABLED=true로 설정하세요.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // 통계 계산
  const activeTasks = tasks.filter(
    (t) => t.status !== 'completed' && t.status !== 'canceled'
  );
  const delayedTasks = activeTasks.filter((t) => {
    const elapsed = (Date.now() - t.createdAt) / 1000 / 60; // 분
    return elapsed > SLA_THRESHOLD_MINUTES;
  });

  const filteredTasks =
    selectedTab === 'all'
      ? tasks
      : selectedTab === 'active'
      ? activeTasks
      : delayedTasks;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2E1C10]">배달 관제</h1>
          <p className="text-sm text-[#2E1C10]/60">
            실시간 배달 현황 모니터링
          </p>
        </div>
        <Button
          variant="outline"
          onClick={loadTasks}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          새로고침
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 배달</CardDescription>
            <CardTitle className="text-3xl">{tasks.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Package className="w-3 h-3 inline mr-1" />
              총 배달 건수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>진행 중</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{activeTasks.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Navigation className="w-3 h-3 inline mr-1" />
              현재 배달 중
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>완료</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {tasks.filter((t) => t.status === 'completed').length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Package className="w-3 h-3 inline mr-1" />
              배달 완료
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>SLA 지연</CardDescription>
            <CardTitle className="text-3xl text-red-600">{delayedTasks.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              {SLA_THRESHOLD_MINUTES}분 초과
            </p>
          </CardContent>
        </Card>
      </div>

      {/* SLA 지연 알림 */}
      {delayedTasks.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {delayedTasks.length}개의 배달이 SLA 기준({SLA_THRESHOLD_MINUTES}분)을 초과했습니다.
            즉시 확인이 필요합니다.
          </AlertDescription>
        </Alert>
      )}

      {/* 배달 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>배달 목록</CardTitle>
          <CardDescription>
            실시간으로 업데이트되는 배달 현황
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
            <TabsList>
              <TabsTrigger value="all">
                전체 ({tasks.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                진행 중 ({activeTasks.length})
              </TabsTrigger>
              <TabsTrigger value="delayed">
                지연 ({delayedTasks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  배달 내역이 없습니다
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <DeliveryTaskCard key={task.taskId} task={task} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 지도 뷰 (TODO) */}
      <Card>
        <CardHeader>
          <CardTitle>배달 지도</CardTitle>
          <CardDescription>
            모든 배달 기사의 실시간 위치
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="w-16 h-16 text-[#D61C1C] mx-auto" />
              <p className="text-[#2E1C10]">지도 뷰</p>
              <p className="text-sm text-[#2E1C10]/60">
                TODO: Kakao Maps / Google Maps 연동
              </p>
              <p className="text-xs text-[#2E1C10]/40">
                {activeTasks.length}개의 배달이 진행 중입니다
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 개별 배달 태스크 카드
 */
function DeliveryTaskCard({ task }: { task: DeliveryTask }) {
  const elapsed = (Date.now() - task.createdAt) / 1000 / 60; // 분
  const isDelayed = elapsed > SLA_THRESHOLD_MINUTES && 
                    task.status !== 'completed' && 
                    task.status !== 'canceled';

  const statusInfo = STATUS_CONFIG[task.status];

  return (
    <div 
      className={`p-4 rounded-lg border-2 ${
        isDelayed ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono text-[#2E1C10]">
              {task.taskId}
            </span>
            <Badge 
              variant="secondary" 
              className={`${statusInfo.color} text-white`}
            >
              {statusInfo.label}
            </Badge>
            {isDelayed && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" />
                SLA 초과
              </Badge>
            )}
          </div>
          <p className="text-sm text-[#2E1C10]/60">
            주문 ID: {task.orderId}
          </p>
        </div>

        {task.eta !== undefined && task.eta > 0 && (
          <div className="text-right">
            <p className="text-xs text-[#2E1C10]/60">예상 도착</p>
            <p className={`text-lg ${isDelayed ? 'text-red-600' : 'text-[#F37021]'}`}>
              {task.eta}분
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-[#2E1C10]/60 mb-1">배달기사</p>
          <p className="text-[#2E1C10] font-mono">
            {task.driverId || '-'}
          </p>
        </div>

        <div>
          <p className="text-[#2E1C10]/60 mb-1">경과 시간</p>
          <p className={`text-[#2E1C10] ${isDelayed ? 'text-red-600' : ''}`}>
            {Math.floor(elapsed)}분
          </p>
        </div>
      </div>

      {task.lastCoord && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs font-mono text-[#2E1C10]/60">
          <MapPin className="w-3 h-3 inline mr-1" />
          위치: {task.lastCoord.lat.toFixed(4)}, {task.lastCoord.lng.toFixed(4)}
          <span className="ml-2 text-[#2E1C10]/40">
            ({new Date(task.lastCoord.at).toLocaleTimeString('ko-KR')})
          </span>
        </div>
      )}
    </div>
  );
}
```

## 31. src/pages/admin/IntegratedAnalytics.tsx

```typescript
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
```

## 32. src/pages/admin/Menus.tsx

```typescript
/**
 * 관리자 메뉴 관리 페이지
 * Phase 2-6: 목록/검색/필터/품절 토글/시간제 설정/가격·설명 수정
 */

import { useState, useEffect } from 'react';
import { Menu, MenuCategory, MenuFilters, CATEGORY_LABELS } from '../../types/menu';
import {
  getMenus,
  getMenuStats,
  MenuStats,
  toggleMenuAvailability,
  updateMenu,
  updateMenuAvailableHours,
  createMenu,
  deleteMenu,
} from '../../lib/admin/menus.api';
import { getCurrentUser } from '../../lib/auth';
import { MenuTable } from '../../components/admin/MenuTable';
import { MenuEditDialog } from '../../components/admin/MenuEditDialog';
import { MenuCreateDialog } from '../../components/admin/MenuCreateDialog';
import { MenuCSVImport } from '../../components/admin/MenuCSVImport';
import { TimeSettingDialog } from '../../components/admin/TimeSettingDialog';
import { StatCard } from '../../components/admin/common/StatCard';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Search, RefreshCw, Plus, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Menus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [stats, setStats] = useState<MenuStats | null>(null);
  const [filters, setFilters] = useState<MenuFilters>({
    category: 'all',
    search: '',
    sortBy: 'order',
    availableOnly: false,
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // 생성 다이얼로그
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // CSV 임포트 다이얼로그
  const [csvImportOpen, setCsvImportOpen] = useState(false);

  // 편집 다이얼로그
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // 시간제 다이얼로그
  const [timeSettingMenu, setTimeSettingMenu] = useState<Menu | null>(null);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);

  // Undo 관련
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);

  const user = getCurrentUser();

  // 데이터 로드
  const loadData = async () => {
    setLoading(true);
    try {
      const [menusData, statsData] = await Promise.all([
        getMenus(filters),
        getMenuStats(),
      ]);
      setMenus(menusData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load menus:', error);
      toast.error('메뉴 목록을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  // 품절 토글
  const handleToggleAvailability = async (menuId: string) => {
    if (!user) return;

    setActionLoading(true);
    try {
      const updated = await toggleMenuAvailability(menuId, user.uid, user.name);
      
      // UI 즉시 반영
      setMenus(prev => 
        prev.map(m => m.menuId === menuId ? updated : m)
      );

      toast.success(
        updated.isAvailable ? '판매를 재개했습니다' : '품절 처리했습니다'
      );

      // 통계 갱신
      loadData();
    } catch (error: any) {
      console.error('Failed to toggle availability:', error);
      toast.error(error.message || '상태 변경에 실패했습니다');
    } finally {
      setActionLoading(false);
    }
  };

  // 메뉴 편집
  const handleEditMenu = (menu: Menu) => {
    setEditingMenu(menu);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (
    updates: { price?: number; description?: string },
    reason: string
  ) => {
    if (!user || !editingMenu) return;

    setActionLoading(true);
    try {
      const updated = await updateMenu(
        editingMenu.menuId,
        updates,
        user.uid,
        user.name,
        reason
      );

      // UI 즉시 반영
      setMenus(prev =>
        prev.map(m => m.menuId === editingMenu.menuId ? updated : m)
      );

      toast.success('메뉴 정보를 수정했습니다');
      setEditDialogOpen(false);
      setEditingMenu(null);
    } catch (error: any) {
      console.error('Failed to update menu:', error);
      toast.error(error.message || '메뉴 수정에 실패했습니다');
    } finally {
      setActionLoading(false);
    }
  };

  // 시간제 설정
  const handleSetTimeLimit = (menu: Menu) => {
    setTimeSettingMenu(menu);
    setTimeDialogOpen(true);
  };

  const handleSaveTimeLimit = async (
    hours: { start: string; end: string } | null
  ) => {
    if (!user || !timeSettingMenu) return;

    setActionLoading(true);
    try {
      const updated = await updateMenuAvailableHours(
        timeSettingMenu.menuId,
        hours,
        user.uid,
        user.name
      );

      // UI 즉시 반영
      setMenus(prev =>
        prev.map(m => m.menuId === timeSettingMenu.menuId ? updated : m)
      );

      toast.success(
        hours ? '시간제 판매를 설정했습니다' : '시간제 판매를 해제했습니다'
      );
      setTimeDialogOpen(false);
      setTimeSettingMenu(null);

      // 통계 갱신
      loadData();
    } catch (error: any) {
      console.error('Failed to update time limit:', error);
      toast.error(error.message || '시간제 설정에 실패했습니다');
    } finally {
      setActionLoading(false);
    }
  };

  // 메뉴 생성
  const handleCreateMenu = async (menuData: Partial<Menu>) => {
    if (!user) return;

    const newMenu = await createMenu(menuData, user.uid, user.displayName || '관리자');

    // UI 즉시 반영 (최상단 추가)
    setMenus(prev => [newMenu, ...prev]);
    setLastCreatedMenuId(newMenu.menuId);

    // 통계 갱신
    loadData();

    // Undo 토스트 (5초)
    toast.success('메뉴가 등록되었습니다', {
      duration: 5000,
      action: {
        label: '취소',
        onClick: () => handleUndoCreate(newMenu.menuId),
      },
    });
  };

  // 생성 취소 (Undo)
  const handleUndoCreate = async (menuId: string) => {
    if (!user) return;

    try {
      await deleteMenu(menuId, user.uid, user.displayName || '관리자');

      // UI에서 제거
      setMenus(prev => prev.filter(m => m.menuId !== menuId));
      setLastCreatedMenuId(null);

      toast.success('메뉴 등록이 취소되었습니다');

      // 통계 갱신
      loadData();
    } catch (error: any) {
      console.error('Failed to undo create:', error);
      toast.error(error.message || '취소에 실패했습니다');
    }
  };

  // CSV 일괄 등록
  const handleCSVImport = async (menus: Partial<Menu>[]) => {
    if (!user) return;

    const createdMenus: Menu[] = [];

    for (const menuData of menus) {
      try {
        const newMenu = await createMenu(menuData, user.uid, user.displayName || '관리자');
        createdMenus.push(newMenu);
      } catch (error) {
        console.error('Failed to create menu:', error);
      }
    }

    // UI 반영
    setMenus(prev => [...createdMenus, ...prev]);

    // 통계 갱신
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">메뉴 관리</h1>
          <p className="text-[#8B7355]">
            메뉴 정보를 관리하고 품절 상태를 변경하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCsvImportOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            CSV 일괄등록
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            메뉴 등록
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="전체 메뉴"
            value={stats.total}
            subtitle="등록된 메뉴"
          />
          <StatCard
            title="판매 중"
            value={stats.available}
            subtitle="현재 주문 가능"
            variant="success"
          />
          <StatCard
            title="품절"
            value={stats.soldout}
            subtitle="일시 품절"
            variant="warning"
          />
          <StatCard
            title="시간외"
            value={stats.timeLimited}
            subtitle="시간제 메뉴"
            variant="info"
          />
        </div>
      )}

      {/* 필터 & 검색 */}
      <div className="space-y-4">
        {/* 카테고리 탭 */}
        <Tabs
          value={filters.category || 'all'}
          onValueChange={(value) =>
            setFilters(prev => ({ ...prev, category: value as MenuCategory | 'all' }))
          }
        >
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="noodle">{CATEGORY_LABELS.noodle}</TabsTrigger>
            <TabsTrigger value="set">{CATEGORY_LABELS.set}</TabsTrigger>
            <TabsTrigger value="side">{CATEGORY_LABELS.side}</TabsTrigger>
            <TabsTrigger value="drink">{CATEGORY_LABELS.drink}</TabsTrigger>
            <TabsTrigger value="alcohol">{CATEGORY_LABELS.alcohol}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 검색 & 정렬 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="메뉴명, 설명, 태그 검색..."
              value={filters.search}
              onChange={(e) =>
                setFilters(prev => ({ ...prev, search: e.target.value }))
              }
              className="pl-10"
            />
          </div>

          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              setFilters(prev => ({
                ...prev,
                sortBy: value as MenuFilters['sortBy'],
              }))
            }
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">기본 순서</SelectItem>
              <SelectItem value="name">이름순</SelectItem>
              <SelectItem value="price-asc">가격 낮은순</SelectItem>
              <SelectItem value="price-desc">가격 높은순</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* 메뉴 테이블 */}
      <MenuTable
        menus={menus}
        onToggleAvailability={handleToggleAvailability}
        onEdit={handleEditMenu}
        onSetTimeLimit={handleSetTimeLimit}
        loading={loading}
      />

      {/* 생성 다이얼로그 */}
      <MenuCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSave={handleCreateMenu}
      />

      {/* CSV 일괄 등록 다이얼로그 */}
      <MenuCSVImport
        open={csvImportOpen}
        onOpenChange={setCsvImportOpen}
        onImport={handleCSVImport}
      />

      {/* 편집 다이얼로그 */}
      <MenuEditDialog
        menu={editingMenu}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveEdit}
        loading={actionLoading}
      />

      {/* 시간제 설정 다이얼로그 */}
      <TimeSettingDialog
        menu={timeSettingMenu}
        open={timeDialogOpen}
        onOpenChange={setTimeDialogOpen}
        onSave={handleSaveTimeLimit}
        loading={actionLoading}
      />
    </div>
  );
}
```

## 33. src/pages/admin/Orders.tsx

```typescript
import { useState, useEffect } from 'react';
import type { Order, OrderStatus } from '../../types/order';
import { ORDER_STATUS_TRANSITIONS } from '../../types/order';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { OrderTable } from '../../components/admin/OrderTable';
import { OrderDetailDrawer } from '../../components/admin/OrderDetailDrawer';
import { PrintableOrder } from '../../components/admin/PrintableOrder';
import {
  fetchOrders,
  updateOrderStatus,
  type OrderFilters,
  type OrderSortField,
  type OrderSortDirection,
} from '../../lib/admin/orders.api';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 필터/정렬 상태
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<OrderSortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<OrderSortDirection>('desc');

  // 취소 다이얼로그
  const [cancelDialog, setCancelDialog] = useState<{
    open: boolean;
    order: Order | null;
  }>({ open: false, order: null });
  const [cancelReason, setCancelReason] = useState('');

  // 데이터 로드
  const loadOrders = async () => {
    setLoading(true);
    try {
      const filters: OrderFilters = {
        status: statusFilter === 'all' ? undefined : statusFilter,
        paymentMethod: paymentFilter === 'all' ? undefined : paymentFilter,
        searchQuery: searchQuery || undefined,
      };

      const data = await fetchOrders('store-hyunpung', filters, sortField, sortDirection);
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('주문 로드 실패:', error);
      toast.error('주문 목록을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter, paymentFilter, searchQuery, sortField, sortDirection]);

  // 상태 변경 처리
  const handleUpdateStatus = async (order: Order, newStatus: OrderStatus) => {
    // 취소 처리는 사유 입력 모달 표시
    if (newStatus === 'canceled') {
      setCancelDialog({ open: true, order });
      return;
    }

    // 상태 전이 검증
    const allowedTransitions = ORDER_STATUS_TRANSITIONS[order.status];
    if (!allowedTransitions.includes(newStatus)) {
      toast.error('상태 변경 불가', {
        description: `${order.status} 상태에서 ${newStatus}로 변경할 수 없습니다`,
      });
      return;
    }

    try {
      const result = await updateOrderStatus(order.orderId, newStatus);
      if (result.success) {
        toast.success('상태가 변경되었습니다', {
          description: `주문번호: ${order.orderId}`,
        });
        loadOrders();
      } else {
        toast.error('상태 변경 실패', {
          description: result.error,
        });
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
      toast.error('상태 변경 중 오류가 발생했습니다');
    }
  };

  // 취소 확인
  const handleCancelConfirm = async () => {
    if (!cancelDialog.order || !cancelReason.trim()) {
      toast.error('취소 사유를 입력해주세요');
      return;
    }

    try {
      const result = await updateOrderStatus(
        cancelDialog.order.orderId,
        'canceled',
        cancelReason
      );

      if (result.success) {
        toast.success('주문이 취소되었습니다', {
          description: `주문번호: ${cancelDialog.order.orderId}`,
        });
        setCancelDialog({ open: false, order: null });
        setCancelReason('');
        loadOrders();
      } else {
        toast.error('주문 취소 실패', {
          description: result.error,
        });
      }
    } catch (error) {
      console.error('주문 취소 실패:', error);
      toast.error('주문 취소 중 오류가 발생했습니다');
    }
  };

  // 상세보기
  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  // 정렬 토글
  const toggleSort = (field: OrderSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // 통계
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    accepted: orders.filter((o) => o.status === 'accepted').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    canceled: orders.filter((o) => o.status === 'canceled').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-[#333] mb-2">주문 관리</h1>
        <p className="text-[#8B7355]">실시간 주문 현황을 확인하고 상태를 관리하세요</p>
      </div>

      {/* 상태별 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <Card className="p-4">
          <div className="text-2xl text-[#333] mb-1">{stats.total}</div>
          <div className="text-xs text-[#8B7355]">전체</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-gray-700 mb-1">{stats.pending}</div>
          <div className="text-xs text-[#8B7355]">접수대기</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-blue-600 mb-1">{stats.accepted}</div>
          <div className="text-xs text-[#8B7355]">접수확인</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-amber-600 mb-1">{stats.preparing}</div>
          <div className="text-xs text-[#8B7355]">조리중</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-green-600 mb-1">{stats.completed}</div>
          <div className="text-xs text-[#8B7355]">완료</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-red-600 mb-1">{stats.canceled}</div>
          <div className="text-xs text-[#8B7355]">취소</div>
        </Card>
      </div>

      {/* 필터/검색 */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* 상태 탭 */}
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="pending">접수대기</TabsTrigger>
              <TabsTrigger value="accepted">접수확인</TabsTrigger>
              <TabsTrigger value="preparing">조리중</TabsTrigger>
              <TabsTrigger value="completed">완료</TabsTrigger>
              <TabsTrigger value="canceled">취소</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 검색 및 필터 */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
              <Input
                placeholder="주문번호, 전화번호, 메뉴명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-2">
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[140px]">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 결제</SelectItem>
                  <SelectItem value="card">카드</SelectItem>
                  <SelectItem value="easy_pay">간편결제</SelectItem>
                  <SelectItem value="transfer">계좌이체</SelectItem>
                  <SelectItem value="on_site">만나서결제</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={`${sortField}-${sortDirection}`}
                onValueChange={(v) => {
                  const [field, dir] = v.split('-');
                  setSortField(field as OrderSortField);
                  setSortDirection(dir as OrderSortDirection);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">최신순</SelectItem>
                  <SelectItem value="createdAt-asc">오래된순</SelectItem>
                  <SelectItem value="amount-desc">금액 높은순</SelectItem>
                  <SelectItem value="amount-asc">금액 낮은순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* 주문 테이블 */}
      <OrderTable
        orders={filteredOrders}
        onViewDetail={handleViewDetail}
        onUpdateStatus={handleUpdateStatus}
        isLoading={loading}
      />

      {/* 상세 드로어 */}
      <OrderDetailDrawer
        order={selectedOrder}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedOrder(null);
        }}
      />

      {/* 인쇄용 주문서 (숨김) */}
      {selectedOrder && <PrintableOrder order={selectedOrder} />}

      {/* 취소 확인 다이얼로그 */}
      <Dialog
        open={cancelDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setCancelDialog({ open: false, order: null });
            setCancelReason('');
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>주문 취소</DialogTitle>
            <DialogDescription>
              주문번호: {cancelDialog.order?.orderId}
              <br />
              취소 사유를 입력해주세요. 고객에게 전달됩니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cancel-reason">취소 사유 *</Label>
              <Textarea
                id="cancel-reason"
                placeholder="예: 재료 소진으로 인한 취소"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
              />
            </div>

            {cancelDialog.order?.payment.method !== 'on_site' && (
              <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
                ⚠️ 결제가 승인된 주문입니다. 취소 시 자동으로 환불 처리됩니다.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCancelDialog({ open: false, order: null });
                setCancelReason('');
              }}
            >
              닫기
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelConfirm}
              disabled={!cancelReason.trim()}
            >
              주문 취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## 34. src/pages/admin/Points.tsx

```typescript
/**
 * 관리자 포인트 관리 페이지
 * Phase 3-3: Points System
 */

import { useState, useEffect } from 'react';
import { Gift, TrendingUp, TrendingDown, Users, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Skeleton } from '../../components/ui/skeleton';
import { StatCard } from '../../components/admin/common/StatCard';
import { getAllPointsBalances, adjustPoints, POINTS_POLICY } from '../../lib/points.api';
import { FEATURE_FLAGS } from '../../config/env';
import { toast } from 'sonner';
import type { PointsBalance } from '../../types/points';

export default function AdminPoints() {
  const [balances, setBalances] = useState<Array<PointsBalance & { phone?: string; name?: string }>>([]);
  const [loading, setLoading] = useState(true);
  
  // 조정 다이얼로그
  const [adjustDialog, setAdjustDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof balances[0] | null>(null);
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustNote, setAdjustNote] = useState('');
  const [adjusting, setAdjusting] = useState(false);

  useEffect(() => {
    loadBalances();
  }, []);

  async function loadBalances() {
    try {
      setLoading(true);
      const data = await getAllPointsBalances();
      setBalances(data);
    } catch (error) {
      console.error('Failed to load points balances:', error);
      toast.error('포인트 내역 로드 실패');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdjust() {
    if (!selectedUser || !adjustAmount || !adjustNote) {
      toast.error('모든 필드를 입력해주세요');
      return;
    }

    const amount = parseInt(adjustAmount);
    if (isNaN(amount) || amount === 0) {
      toast.error('올바른 포인트 금액을 입력해주세요');
      return;
    }

    try {
      setAdjusting(true);
      await adjustPoints(selectedUser.uid, amount, adjustNote);
      toast.success('포인트가 조정되었습니다');
      setAdjustDialog(false);
      setSelectedUser(null);
      setAdjustAmount('');
      setAdjustNote('');
      loadBalances();
    } catch (error: any) {
      console.error('Failed to adjust points:', error);
      toast.error(error.message || '포인트 조정 실패');
    } finally {
      setAdjusting(false);
    }
  }

  function openAdjustDialog(user: typeof balances[0]) {
    setSelectedUser(user);
    setAdjustDialog(true);
  }

  if (!FEATURE_FLAGS.points) {
    return (
      <div className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            포인트 기능이 비활성화되어 있습니다.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // 통계 계산
  const totalUsers = balances.length;
  const totalPoints = balances.reduce((sum, b) => sum + b.balance, 0);
  const avgPoints = totalUsers > 0 ? Math.floor(totalPoints / totalUsers) : 0;
  const activeUsers = balances.filter(b => b.balance > 0).length;

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl text-[#2E1C10] mb-1">포인트 관리</h1>
        <p className="text-[#2E1C10]/60">
          고객 포인트 현황을 관리하고 조정할 수 있습니다
        </p>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="전체 사용자"
          value={totalUsers.toLocaleString()}
          icon={Users}
          variant="info"
        />
        
        <StatCard
          title="전체 포인트"
          value={`${totalPoints.toLocaleString()}P`}
          icon={Gift}
          variant="default"
        />
        
        <StatCard
          title="평균 보유 포인트"
          value={`${avgPoints.toLocaleString()}P`}
          icon={TrendingUp}
          variant="success"
        />
        
        <StatCard
          title="활성 사용자"
          value={activeUsers.toLocaleString()}
          icon={DollarSign}
          variant="warning"
        />
      </div>

      {/* 포인트 정책 */}
      <Card>
        <CardHeader>
          <CardTitle>포인트 정책</CardTitle>
          <CardDescription>현재 적용 중인 포인트 정책입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">주문 적립률</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {(POINTS_POLICY.earnRate * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">최소 사용 금액</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {POINTS_POLICY.minUse.toLocaleString()}P
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">유효기간</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {POINTS_POLICY.expireDays}일
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">사진 리뷰 보너스</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {POINTS_POLICY.reviewPhotoBonus}P
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용자 포인트 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자별 포인트</CardTitle>
          <CardDescription>
            전체 {balances.length}명의 사용자
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : balances.length > 0 ? (
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>사용자</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>보유 포인트</TableHead>
                    <TableHead>최종 업데이트</TableHead>
                    <TableHead>관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {balances.map((balance) => (
                    <TableRow key={balance.uid}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#D61C1C]/10 flex items-center justify-center">
                            <span className="text-xs text-[#D61C1C]">
                              {balance.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{balance.name || balance.uid}</p>
                            <p className="text-xs text-gray-500">{balance.uid}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{balance.phone || '-'}</TableCell>
                      <TableCell>
                        <Badge
                          variant={balance.balance > 0 ? 'default' : 'secondary'}
                          className={balance.balance > 0 ? 'bg-green-100 text-green-800' : ''}
                        >
                          {balance.balance.toLocaleString()}P
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(balance.updatedAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAdjustDialog(balance)}
                        >
                          조정
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>아직 포인트 사용자가 없습니다</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 포인트 조정 다이얼로그 */}
      <Dialog open={adjustDialog} onOpenChange={setAdjustDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>포인트 조정</DialogTitle>
            <DialogDescription>
              사용자: {selectedUser?.name || selectedUser?.uid}
              <br />
              현재 보유 포인트: {selectedUser?.balance.toLocaleString()}P
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">조정 포인트</Label>
              <Input
                id="amount"
                type="number"
                placeholder="양수는 증가, 음수는 차감"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                예: +1000 (증가), -500 (차감)
              </p>
            </div>

            <div>
              <Label htmlFor="note">사유</Label>
              <Textarea
                id="note"
                placeholder="포인트 조정 사유를 입력하세요"
                value={adjustNote}
                onChange={(e) => setAdjustNote(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            {adjustAmount && (
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  조정 후 포인트: {(selectedUser!.balance + parseInt(adjustAmount || '0')).toLocaleString()}P
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAdjustDialog(false);
                setSelectedUser(null);
                setAdjustAmount('');
                setAdjustNote('');
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleAdjust}
              disabled={adjusting || !adjustAmount || !adjustNote}
            >
              {adjusting ? '처리 중...' : '조정하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## 35. src/pages/admin/Promotions.tsx

```typescript
/**
 * 관리자 쿠폰/프로모션 관리 페이지
 * Phase 2-8: 쿠폰 발급 및 통계
 */

import { useState, useEffect } from 'react';
import { CouponStats, CouponIssue } from '../../types/coupon';
import { getCouponStats, issueCoupon } from '../../lib/coupons.api';
import { getCurrentUser } from '../../lib/auth';
import { StatCard } from '../../components/admin/common/StatCard';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Plus, Ticket } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export default function Promotions() {
  const [stats, setStats] = useState<CouponStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [issuing, setIssuing] = useState(false);

  // 발급 폼
  const [issueForm, setIssueForm] = useState<CouponIssue>({
    type: 'admin',
    title: '',
    description: '',
    amount: 5000,
    minSpend: 15000,
    expiryDays: 30,
    issueLimit: 100,
  });

  const user = getCurrentUser();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getCouponStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
      toast.error('통계를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleIssue = async () => {
    if (!user) return;

    if (!issueForm.title.trim() || !issueForm.description.trim()) {
      toast.error('제목과 설명을 입력하세요');
      return;
    }

    setIssuing(true);
    try {
      const issued = await issueCoupon(issueForm, user.uid, user.name);
      
      toast.success(`쿠폰 ${issued.length}장을 발급했습니다`);
      setIssueDialogOpen(false);
      loadStats();

      // 폼 초기화
      setIssueForm({
        type: 'admin',
        title: '',
        description: '',
        amount: 5000,
        minSpend: 15000,
        expiryDays: 30,
        issueLimit: 100,
      });
    } catch (error: any) {
      console.error('Failed to issue coupons:', error);
      toast.error(error.message || '쿠폰 발급에 실패했습니다');
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">쿠폰/프로모션</h1>
          <p className="text-[#8B7355]">
            쿠폰을 발급하고 사용 현황을 관리하세요
          </p>
        </div>
        <Button onClick={() => setIssueDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          쿠폰 발급
        </Button>
      </div>

      {/* 통계 */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="발급 총량"
            value={stats.totalIssued}
            subtitle="총 발급 쿠폰"
          />
          <StatCard
            title="사용 완료"
            value={stats.totalUsed}
            subtitle="사용된 쿠폰"
            variant="success"
          />
          <StatCard
            title="할인 금액"
            value={`${(stats.totalAmount / 10000).toFixed(0)}만원`}
            subtitle="총 할인액"
            variant="info"
          />
          <StatCard
            title="만료됨"
            value={stats.expiredCount}
            subtitle="미사용 만료"
            variant="warning"
          />
        </div>
      )}

      {/* 발급 가이드 */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-[#D61C1C]" />
          쿠폰 발급 가이드
        </h3>
        <div className="space-y-3 text-sm text-[#8B7355]">
          <div className="flex items-start gap-2">
            <span className="text-[#D61C1C]">•</span>
            <span><strong>사진 리뷰 보상:</strong> 자동 발급 (3,000원, 10,000원 이상 주문 시)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#F37021]">•</span>
            <span><strong>신규 가입:</strong> 자동 발급 (5,000원, 15,000원 이상 주문 시)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C7A45A]">•</span>
            <span><strong>관리자 발급:</strong> 수동 발급 (금액/조건 설정 가능)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span><strong>만료 처리:</strong> 매일 04:00 자동 처리 (Firebase Functions)</span>
          </div>
        </div>
      </Card>

      {/* 발급 내역 (Placeholder) */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4">최근 발급 내역</h3>
        <div className="text-center py-8 text-gray-500">
          <Ticket className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>발급 내역이 표시됩니다</p>
          <p className="text-sm text-gray-400 mt-1">
            Firebase 연동 시 실시간 내역 조회
          </p>
        </div>
      </Card>

      {/* 발급 다이얼로그 */}
      <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>쿠폰 발급</DialogTitle>
            <DialogDescription>
              새로운 쿠폰을 발급합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 타입 */}
            <div className="space-y-2">
              <Label>쿠폰 타입</Label>
              <Select
                value={issueForm.type}
                onValueChange={(v) => setIssueForm({ ...issueForm, type: v as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">관리자 발급</SelectItem>
                  <SelectItem value="event">이벤트</SelectItem>
                  <SelectItem value="compensation">보상</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 제목 */}
            <div className="space-y-2">
              <Label>제목</Label>
              <Input
                value={issueForm.title}
                onChange={(e) => setIssueForm({ ...issueForm, title: e.target.value })}
                placeholder="예: 설날 특별 할인 쿠폰"
              />
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label>설명</Label>
              <Textarea
                value={issueForm.description}
                onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                placeholder="예: 20,000원 이상 주문 시 사용 가능"
                rows={2}
              />
            </div>

            {/* 금액 & 최소주문 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>할인 금액 (원)</Label>
                <Input
                  type="number"
                  value={issueForm.amount}
                  onChange={(e) => setIssueForm({ ...issueForm, amount: Number(e.target.value) })}
                  min="1000"
                  step="1000"
                />
              </div>
              <div className="space-y-2">
                <Label>최소 주문 (원)</Label>
                <Input
                  type="number"
                  value={issueForm.minSpend}
                  onChange={(e) => setIssueForm({ ...issueForm, minSpend: Number(e.target.value) })}
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            {/* 유효기간 & 발급상한 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>유효 기간 (일)</Label>
                <Input
                  type="number"
                  value={issueForm.expiryDays}
                  onChange={(e) => setIssueForm({ ...issueForm, expiryDays: Number(e.target.value) })}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label>발급 상한 (장)</Label>
                <Input
                  type="number"
                  value={issueForm.issueLimit}
                  onChange={(e) => setIssueForm({ ...issueForm, issueLimit: Number(e.target.value) })}
                  min="1"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIssueDialogOpen(false)}
              disabled={issuing}
            >
              취소
            </Button>
            <Button onClick={handleIssue} disabled={issuing}>
              {issuing ? '발급 중...' : '발급'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## 36. src/pages/admin/Reviews.tsx

```typescript
import { useState, useEffect } from 'react';
import { Star, Image as ImageIcon, Filter, SortAsc } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ReviewCard } from '../../components/admin/ReviewCard';
import { ReplyModal } from '../../components/admin/ReplyModal';
import { ReportDialog } from '../../components/admin/ReportDialog';
import {
  getReviews,
  getReviewStats,
  addReviewReply,
  deleteReviewReply,
  reportReview,
  hideReview,
} from '../../lib/admin/reviews.api';
import { getCurrentUser } from '../../lib/auth';
import type { Review, ReviewStats } from '../../types/review';
import type { ReviewReportReason } from '../../types/review';
import { toast } from 'sonner@2.0.3';

type FilterType = 'all' | 'photo' | 'reported';
type SortType = 'latest' | 'rating_high' | 'rating_low';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // 필터/정렬
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('latest');

  // 모달
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const storeId = 'store-hyunpung';

  useEffect(() => {
    loadData();
  }, [filter, sortBy]);

  async function loadData() {
    setLoading(true);
    try {
      const [reviewsData, statsData] = await Promise.all([
        getReviews({
          storeId,
          photoOnly: filter === 'photo',
          reported: filter === 'reported',
          sortBy,
          limit: 10,
          offset: 0,
        }),
        getReviewStats(storeId),
      ]);

      setReviews(reviewsData.reviews);
      setHasMore(reviewsData.hasMore);
      setStats(statsData);
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
      toast.error('리뷰를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await getReviews({
        storeId,
        photoOnly: filter === 'photo',
        reported: filter === 'reported',
        sortBy,
        limit: 10,
        offset: reviews.length,
      });

      setReviews([...reviews, ...data.reviews]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
      toast.error('리뷰를 불러오는데 실패했습니다.');
    } finally {
      setLoadingMore(false);
    }
  }

  function handleReply(reviewId: string) {
    const review = reviews.find((r) => r.id === reviewId);
    if (!review) return;

    setSelectedReview(review);
    setReplyModalOpen(true);
  }

  async function handleReplySubmit(reviewId: string, text: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('인증 필요');

    await addReviewReply(reviewId, {
      text,
      by: user.displayName,
    });

    // UI 업데이트
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              reply: {
                text,
                by: user.displayName,
                at: Date.now(),
              },
            }
          : r
      )
    );
  }

  async function handleReplyDelete(reviewId: string) {
    await deleteReviewReply(reviewId);

    // UI 업데이트
    setReviews(
      reviews.map((r) => {
        if (r.id === reviewId) {
          const { reply, ...rest } = r;
          return rest;
        }
        return r;
      })
    );
  }

  function handleReport(reviewId: string) {
    setSelectedReviewId(reviewId);
    setReportDialogOpen(true);
  }

  async function handleReportSubmit(
    reviewId: string,
    reason: ReviewReportReason,
    description?: string
  ) {
    const user = await getCurrentUser();
    if (!user) throw new Error('인증 필요');

    await reportReview(reviewId, reason, user.uid, description);

    // UI 업데이트
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? { ...r, reportedCount: (r.reportedCount || 0) + 1 }
          : r
      )
    );
  }

  async function handleToggleHidden(reviewId: string, hidden: boolean) {
    try {
      await hideReview(reviewId, hidden);

      // UI 업데이트
      setReviews(
        reviews.map((r) => (r.id === reviewId ? { ...r, isHidden: hidden } : r))
      );

      toast.success(hidden ? '리뷰를 숨겼습니다.' : '리뷰를 표시했습니다.');
    } catch (error) {
      console.error('리뷰 숨김 처리 실패:', error);
      toast.error('리뷰 숨김 처리에 실패했습니다.');
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-[#333] mb-2">리뷰 관리</h1>
        <p className="text-[#8B7355]">
          고객 리뷰를 확인하고 답글을 작성하세요
        </p>
      </div>

      {/* 통계 */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355]">총 리뷰</span>
              <Star className="w-5 h-5 text-[#F37021]" />
            </div>
            <p className="text-2xl text-[#333]">{stats.totalCount}개</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355]">평균 평점</span>
              <Star className="w-5 h-5 text-[#F37021] fill-current" />
            </div>
            <p className="text-2xl text-[#333]">
              {stats.averageRating.toFixed(1)}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355]">사진 리뷰</span>
              <ImageIcon className="w-5 h-5 text-[#F37021]" />
            </div>
            <p className="text-2xl text-[#333]">
              {stats.photoCount}개
              <span className="text-[#8B7355] ml-2">
                ({((stats.photoCount / stats.totalCount) * 100).toFixed(0)}%)
              </span>
            </p>
          </Card>

          <Card className="p-6">
            <div className="mb-2">
              <span className="text-[#8B7355]">별점 분포</span>
            </div>
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-[#8B7355] w-3">{rating}</span>
                  <div className="flex-1 h-2 bg-[#E5DDD5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F37021]"
                      style={{
                        width: `${
                          (stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] /
                            stats.totalCount) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-[#8B7355] w-6 text-right">
                    {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 필터 & 정렬 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* 필터 탭 */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
          <TabsList>
            <TabsTrigger value="all">
              전체
              {stats && (
                <Badge variant="secondary" className="ml-2">
                  {stats.totalCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="photo">
              사진리뷰
              {stats && (
                <Badge variant="secondary" className="ml-2">
                  {stats.photoCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reported">
              신고됨
              {reviews.filter((r) => (r.reportedCount || 0) > 0).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {reviews.filter((r) => (r.reportedCount || 0) > 0).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 정렬 */}
        <div className="flex items-center gap-2 ml-auto">
          <SortAsc className="w-4 h-4 text-[#8B7355]" />
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortType)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="rating_high">평점 높은순</SelectItem>
              <SelectItem value="rating_low">평점 낮은순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 리뷰 목록 */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-[#E5DDD5] rounded w-1/4" />
                <div className="h-4 bg-[#E5DDD5] rounded w-full" />
                <div className="h-4 bg-[#E5DDD5] rounded w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F37021]/10 flex items-center justify-center">
            <Star className="w-8 h-8 text-[#F37021]" />
          </div>
          <p className="text-[#8B7355] mb-2">리뷰가 없습니다</p>
          <p className="text-[#8B7355]">
            고객이 리뷰를 남기면 여기에 표시됩니다
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReply={handleReply}
              onReport={handleReport}
              onToggleHidden={handleToggleHidden}
            />
          ))}

          {/* 더 보기 버튼 */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={loadingMore}
                className="min-w-[200px]"
              >
                {loadingMore ? '로딩 중...' : '더 보기'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* 답글 모달 */}
      <ReplyModal
        open={replyModalOpen}
        onOpenChange={setReplyModalOpen}
        review={selectedReview}
        onSubmit={handleReplySubmit}
        onDelete={handleReplyDelete}
      />

      {/* 신고 다이얼로그 */}
      <ReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        reviewId={selectedReviewId}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
```

## 37. src/pages/admin/Settings.tsx

```typescript
/**
 * 관리자 설정 페이지
 * Phase 2-7: 영업시간/배달비/최소주문/크레딧
 */

import { useState, useEffect } from 'react';
import { StoreSettings, BusinessHours, DeliveryFee } from '../../types/settings';
import { getSettings, saveSettings } from '../../lib/admin/settings.api';
import { getCurrentUser } from '../../lib/auth';
import { BusinessHoursForm } from '../../components/admin/BusinessHoursForm';
import { FeesForm } from '../../components/admin/FeesForm';
import { CreditsCard } from '../../components/admin/CreditsCard';
import { OptionGroupsManagement } from '../../components/admin/OptionGroupsManagement';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [originalSettings, setOriginalSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const user = getCurrentUser();

  // 데이터 로드
  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getSettings('store-001');
      setSettings(data);
      setOriginalSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('설정을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // 저장
  const handleSave = async () => {
    if (!settings || !user) return;

    setSaving(true);
    try {
      const updated = await saveSettings(
        'store-001',
        {
          businessHours: settings.businessHours,
          deliveryFees: settings.deliveryFees,
          deliveryRadius: settings.deliveryRadius,
          minDeliveryOrder: settings.minDeliveryOrder,
          minPickupOrder: settings.minPickupOrder,
          holidays: settings.holidays,
        },
        user.uid,
        user.name
      );

      setSettings(updated);
      setOriginalSettings(updated);
      toast.success('설정을 저장했습니다');
    } catch (error: any) {
      console.error('Failed to save settings:', error);
      toast.error(error.message || '설정 저장에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  // 되돌리기
  const handleReset = () => {
    if (originalSettings) {
      setSettings({ ...originalSettings });
      toast.info('변경사항을 되돌렸습니다');
    }
  };

  // 변경사항 확인
  const hasChanges = settings && originalSettings && (
    JSON.stringify(settings.businessHours) !== JSON.stringify(originalSettings.businessHours) ||
    JSON.stringify(settings.deliveryFees) !== JSON.stringify(originalSettings.deliveryFees) ||
    settings.deliveryRadius !== originalSettings.deliveryRadius ||
    settings.minDeliveryOrder !== originalSettings.minDeliveryOrder ||
    settings.minPickupOrder !== originalSettings.minPickupOrder
  );

  if (loading || !settings) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">설정</h1>
          <p className="text-[#8B7355]">매장 운영 정보와 시스템 설정을 관리하세요</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
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
          <h1 className="text-2xl text-[#333] mb-2">설정</h1>
          <p className="text-[#8B7355]">
            매장 운영 정보와 시스템 설정을 관리하세요
          </p>
        </div>

        {/* 액션 버튼 */}
        {hasChanges && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={saving}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              되돌리기
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? '저장 중...' : '저장'}
            </Button>
          </div>
        )}
      </div>

      {/* 변경사항 알림 */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ 저장하지 않은 변경사항이 있습니다. 변경사항을 적용하려면 <strong>저장</strong> 버튼을 눌러주세요.
          </p>
        </div>
      )}

      {/* 탭 메뉴 */}
      <Tabs defaultValue="business" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business">영업 설정</TabsTrigger>
          <TabsTrigger value="options">옵션 관리</TabsTrigger>
          <TabsTrigger value="credits">개발사 정보</TabsTrigger>
        </TabsList>

        {/* 영업 설정 탭 */}
        <TabsContent value="business" className="space-y-4">
          {/* 영업시간 */}
          <BusinessHoursForm
            value={settings.businessHours}
            onChange={(hours) => setSettings({ ...settings, businessHours: hours })}
          />

          {/* 배달비/최소주문 */}
          <FeesForm
            deliveryFees={settings.deliveryFees}
            deliveryRadius={settings.deliveryRadius}
            minDeliveryOrder={settings.minDeliveryOrder}
            minPickupOrder={settings.minPickupOrder}
            onDeliveryFeesChange={(fees) => setSettings({ ...settings, deliveryFees: fees })}
            onDeliveryRadiusChange={(radius) => setSettings({ ...settings, deliveryRadius: radius })}
            onMinDeliveryOrderChange={(amount) => setSettings({ ...settings, minDeliveryOrder: amount })}
            onMinPickupOrderChange={(amount) => setSettings({ ...settings, minPickupOrder: amount })}
          />
        </TabsContent>

        {/* 옵션 관리 탭 */}
        <TabsContent value="options">
          <OptionGroupsManagement />
        </TabsContent>

        {/* 크레딧 탭 */}
        <TabsContent value="credits">
          <CreditsCard />
        </TabsContent>
      </Tabs>

      {/* 하단 저장 버튼 (모바일) */}
      {hasChanges && (
        <div className="md:hidden sticky bottom-4 flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={saving}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            되돌리기
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? '저장 중...' : '저장'}
          </Button>
        </div>
      )}
    </div>
  );
}
```

## 38. src/pages/admin/Support.tsx

```typescript
/**
 * 관리자 고객지원 채팅 관리 페이지
 * Phase 3-2: Support Chat
 */

import { useEffect, useState, useRef } from 'react';
import { Send, MessageSquare, Clock, Check, CheckCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { FEATURE_FLAGS } from '../../config/env';
import type { ChatSession, ChatMessage } from '../../types/support';
import { toast } from 'sonner@2.0.3';

const USE_FIREBASE = false;

export default function Support() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 지원 기능 비활성화 체크
  if (!FEATURE_FLAGS.support) {
    return (
      <div className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            고객 지원 기능이 비활성화되어 있습니다. 환경 변수에서 VITE_SUPPORT_ENABLED=true로 설정하세요.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession.id);
    }
  }, [selectedSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // 세션 목록 로드
  async function loadSessions() {
    try {
      setLoading(true);

      if (USE_FIREBASE) {
        // TODO: Firebase 연동
      } else {
        // Mock: localStorage에서 세션 로드
        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessionsObj: Record<string, ChatSession> = JSON.parse(sessionsData);
        const sessionsList = Object.values(sessionsObj);
        
        // 최신순 정렬 (미응답 우선)
        sessionsList.sort((a, b) => {
          // 미응답 세션 우선
          const aHasUnread = hasUnreadMessages(a.id);
          const bHasUnread = hasUnreadMessages(b.id);
          
          if (aHasUnread && !bHasUnread) return -1;
          if (!aHasUnread && bHasUnread) return 1;
          
          // 그 다음 최신순
          return b.lastAt - a.lastAt;
        });

        setSessions(sessionsList);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
      toast.error('세션 목록을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  // 미응답 메시지 체크
  function hasUnreadMessages(sessionId: string): boolean {
    const messagesData = localStorage.getItem(`chat_messages_${sessionId}`) || '[]';
    const msgs: ChatMessage[] = JSON.parse(messagesData);
    return msgs.some((m) => m.from === 'user' && !m.readByAdmin);
  }

  // 메시지 로드
  async function loadMessages(sessionId: string) {
    try {
      if (USE_FIREBASE) {
        // TODO: Firebase 연동
      } else {
        // Mock: localStorage에서 메시지 로드
        const messagesData = localStorage.getItem(`chat_messages_${sessionId}`) || '[]';
        const msgs: ChatMessage[] = JSON.parse(messagesData);
        
        // 읽음 처리
        const updatedMsgs = msgs.map((m) => {
          if (m.from === 'user' && !m.readByAdmin) {
            return { ...m, readByAdmin: true };
          }
          return m;
        });
        
        localStorage.setItem(`chat_messages_${sessionId}`, JSON.stringify(updatedMsgs));
        setMessages(updatedMsgs);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error('메시지를 불러오는데 실패했습니다');
    }
  }

  // 메시지 전송
  async function sendMessage() {
    if (!selectedSession || !inputText.trim() || sending) return;

    const text = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        sessionId: selectedSession.id,
        from: 'admin',
        type: 'text',
        text,
        at: Date.now(),
        readByUser: false,
      };

      if (USE_FIREBASE) {
        // TODO: Firebase에 메시지 추가 + FCM 푸시
      } else {
        // Mock: localStorage에 메시지 추가
        const messagesData = localStorage.getItem(`chat_messages_${selectedSession.id}`) || '[]';
        const allMessages: ChatMessage[] = JSON.parse(messagesData);
        allMessages.push(newMessage);
        localStorage.setItem(`chat_messages_${selectedSession.id}`, JSON.stringify(allMessages));
        
        setMessages(allMessages);

        // 세션 업데이트
        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessionsObj: Record<string, ChatSession> = JSON.parse(sessionsData);
        sessionsObj[selectedSession.id] = {
          ...selectedSession,
          lastMessage: text,
          lastAt: Date.now(),
          updatedAt: Date.now(),
        };
        localStorage.setItem('chat_sessions', JSON.stringify(sessionsObj));
        
        // 세션 목록 업데이트
        loadSessions();
      }

      toast.success('메시지가 전송되었습니다');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('메시지 전송에 실패했습니다');
      setInputText(text); // 복원
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  // 통계
  const openSessions = sessions.filter((s) => s.open);
  const unreadCount = sessions.filter((s) => hasUnreadMessages(s.id)).length;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2E1C10]">고객 지원 채팅</h1>
          <p className="text-sm text-[#2E1C10]/60">
            실시간 1:1 고객 문의 관리
          </p>
        </div>
        <Button
          variant="outline"
          onClick={loadSessions}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          새로고침
        </Button>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 세션</CardDescription>
            <CardTitle className="text-3xl">{sessions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 inline mr-1" />
              누적 문의
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>진행 중</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{openSessions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Clock className="w-3 h-3 inline mr-1" />
              열린 세션
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>미응답</CardDescription>
            <CardTitle className="text-3xl text-red-600">{unreadCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              답변 필요
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 미응답 알림 */}
      {unreadCount > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {unreadCount}개의 세션에 답변이 필요합니다.
          </AlertDescription>
        </Alert>
      )}

      {/* 채팅 UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* 세션 목록 (좌측) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>문의 목록</CardTitle>
            <CardDescription>
              미응답 우선 정렬
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {sessions.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  문의가 없습니다
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {sessions.map((session) => {
                    const unread = hasUnreadMessages(session.id);
                    const isSelected = selectedSession?.id === session.id;

                    return (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-[#D61C1C] text-white'
                            : unread
                            ? 'bg-red-50 hover:bg-red-100'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isSelected ? 'text-white' : 'text-[#2E1C10]'}`}>
                            {session.userName || session.userId.substring(0, 12)}
                          </span>
                          {unread && !isSelected && (
                            <Badge variant="destructive" className="h-5">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <p className={`text-xs truncate ${isSelected ? 'text-white/80' : 'text-[#2E1C10]/60'}`}>
                          {session.lastMessage || '메시지 없음'}
                        </p>
                        <p className={`text-xs mt-1 ${isSelected ? 'text-white/60' : 'text-[#2E1C10]/40'}`}>
                          {new Date(session.lastAt).toLocaleString('ko-KR')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 채팅 영역 (우측) */}
        <Card className="lg:col-span-2">
          {selectedSession ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedSession.userName || selectedSession.userId}
                    </CardTitle>
                    <CardDescription>
                      세션 ID: {selectedSession.id}
                    </CardDescription>
                  </div>
                  <Badge variant={selectedSession.open ? 'default' : 'secondary'}>
                    {selectedSession.open ? '진행 중' : '종료'}
                  </Badge>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="p-4 h-[400px] flex flex-col">
                {/* 메시지 목록 */}
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <AdminMessageBubble key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* 입력 영역 */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="답변을 입력하세요..."
                      disabled={sending || !selectedSession.open}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputText.trim() || sending || !selectedSession.open}
                      size="icon"
                      className="bg-[#D61C1C] hover:bg-[#D61C1C]/90"
                    >
                      {sending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p>세션을 선택하세요</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

/**
 * 관리자용 메시지 말풍선
 */
function AdminMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.from === 'user';
  const isBot = message.from === 'bot';

  return (
    <div className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
      <div className="max-w-[75%]">
        {/* 보낸 사람 */}
        <p className={`text-xs text-[#2E1C10]/60 mb-1 px-1 ${isUser ? 'text-left' : 'text-right'}`}>
          {isUser ? '👤 고객' : isBot ? '🤖 자동 응답' : '👨‍💼 나'}
        </p>

        {/* 메시지 */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gray-100 text-[#2E1C10]'
              : isBot
              ? 'bg-blue-50 text-[#2E1C10]'
              : 'bg-[#D61C1C] text-white'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.text}
          </p>
        </div>

        {/* 시간 + 읽음 */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isUser ? 'justify-start' : 'justify-end'}`}>
          <p className="text-xs text-[#2E1C10]/40">
            {new Date(message.at).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {!isUser && !isBot && (
            <>
              {message.readByUser ? (
                <CheckCheck className="w-3 h-3 text-green-600" />
              ) : (
                <Check className="w-3 h-3 text-[#2E1C10]/40" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 39. src/pages/admin/_layout/AdminLayout.tsx

```typescript
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Star,
  UtensilsCrossed,
  Settings,
  Ticket,
  BarChart3,
  Menu,
  X,
  LogOut,
  User,
  Truck,
  MessageSquare,
  Gift,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Credits } from '../../../components/shared/Credits';
import { requireAdmin, mockLogout, type AuthUser } from '../../../lib/auth';
import { toast } from 'sonner@2.0.3';

export function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authUser = await requireAdmin();
      setUser(authUser);
    } catch (error) {
      // requireAdmin이 리다이렉트 처리
      toast.error('관리자 권한이 필요합니다.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    mockLogout();
    navigate('/');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9F6F3]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D61C1C]/10 flex items-center justify-center">
            <span className="text-3xl">🍜</span>
          </div>
          <p className="text-[#8B7355]">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F3]">
      {/* Top Bar (Mobile + Desktop) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5DDD5]">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-[#F9F6F3] rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-[#333]" />
              ) : (
                <Menu className="w-6 h-6 text-[#333]" />
              )}
            </button>
            <h1 className="text-[#D61C1C]">현풍닭칼국수 관리자</h1>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#F9F6F3] rounded-lg">
              <User className="w-4 h-4 text-[#8B7355]" />
              <span className="text-[#333]">{user?.displayName}</span>
              <span className="text-[#8B7355]">({user?.role})</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-[#8B7355] hover:text-[#D61C1C]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:block fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-[#E5DDD5] overflow-y-auto">
        <SidebarNav />
      </aside>

      {/* Sidebar (Mobile Overlay) */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-[#E5DDD5] overflow-y-auto z-40">
            <SidebarNav onItemClick={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 lg:p-6 pb-24">
          <Outlet />
        </div>

        {/* Credits */}
        <div className="lg:ml-0 border-t border-[#E5DDD5] bg-white">
          <Credits />
        </div>
      </main>
    </div>
  );
}

interface SidebarNavProps {
  onItemClick?: () => void;
}

function SidebarNav({ onItemClick }: SidebarNavProps) {
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: '대시보드', end: true },
    { to: '/admin/orders', icon: ShoppingBag, label: '주문 관리' },
    { to: '/admin/delivery', icon: Truck, label: '배달 관제' },
    { to: '/admin/support', icon: MessageSquare, label: '고객 지원' },
    { to: '/admin/reviews', icon: Star, label: '리뷰 관리' },
    { to: '/admin/menus', icon: UtensilsCrossed, label: '메뉴 관리' },
    { to: '/admin/promotions', icon: Ticket, label: '쿠폰/프로모션' },
    { to: '/admin/points', icon: Gift, label: '포인트 관리' },
    { to: '/admin/analytics', icon: BarChart3, label: '관제 대시보드' },
    { to: '/admin/settings', icon: Settings, label: '설정' },
  ];

  return (
    <nav className="p-4 space-y-2">
      {navItems.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-[#D61C1C] text-white'
                : 'text-[#333] hover:bg-[#F9F6F3]'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>
      ))}

      {/* 고객 앱으로 이동 */}
      <div className="pt-4 mt-4 border-t border-[#E5DDD5]">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#8B7355] hover:bg-[#F9F6F3] transition-colors"
        >
          <span className="text-xl">🍜</span>
          <span>고객 앱 보기</span>
        </NavLink>
      </div>
    </nav>
  );
}
```

## 40. src/pages/app/Cart.tsx

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Truck, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useCart } from '../../contexts/CartContext';

// 실제 음식 이미지 매핑
const menuImages: Record<string, string> = {
  'menu-001': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-002': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-003': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-004': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-005': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=200',
  'menu-006': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-007': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-008': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-013': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-014': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=200',
  'menu-021': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=200',
  'menu-022': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=200',
  'menu-023': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=200',
  'menu-024': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=200',
  'menu-025': 'https://images.unsplash.com/photo-1616627077891-a4780e730b7e?w=200',
};

const MIN_ORDER_DELIVERY = 15000;
const MIN_ORDER_PICKUP = 5000;

export function Cart() {
  const navigate = useNavigate();
  const {
    items,
    deliveryType,
    requests,
    couponDiscount,
    removeItem,
    updateQuantity,
    setDeliveryType,
    setRequests,
    getSubtotal,
    getDeliveryFee,
    getTotalAmount,
  } = useCart();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const totalAmount = getTotalAmount();

  const minOrderAmount = deliveryType === 'delivery' ? MIN_ORDER_DELIVERY : MIN_ORDER_PICKUP;
  const canProceed = subtotal >= minOrderAmount;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-24 h-24 mb-6 rounded-full bg-[#2E1C10]/5 flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-[#2E1C10]/40" />
        </div>
        <h2 className="text-xl text-[#2E1C10] mb-2">
          장바구니가 비어있어요
        </h2>
        <p className="text-[#2E1C10]/60 mb-6 text-center">
          맛있는 메뉴를 담아보세요
        </p>
        <Button
          onClick={() => navigate('/app/menu')}
          className="bg-[#D61C1C] hover:bg-[#D61C1C]/90"
        >
          메뉴 보러가기
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="px-4 py-6 space-y-6">
        {/* 장바구니 헤더 */}
        <div>
          <h1 className="text-2xl text-[#2E1C10] mb-1">
            장바구니
          </h1>
          <p className="text-[#2E1C10]/60">
            {items.length}개 메뉴
          </p>
        </div>

        {/* 장바구니 아이템 */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <CartItemCard
              key={`${item.menuId}-${index}`}
              item={item}
              onUpdateQuantity={(qty) => updateQuantity(item.menuId, qty)}
              onRemove={() => removeItem(item.menuId)}
            />
          ))}
        </div>

        <Separator />

        {/* 배달/포장 선택 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">
            주문 방식
          </h2>
          <RadioGroup value={deliveryType} onValueChange={(v) => setDeliveryType(v as 'delivery' | 'pickup')}>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                <Truck className="w-5 h-5 text-[#D61C1C]" />
                <div>
                  <p className="text-[#2E1C10]">배달</p>
                  <p className="text-sm text-[#2E1C10]/60">
                    최소 주문 {MIN_ORDER_DELIVERY.toLocaleString()}원
                  </p>
                </div>
              </Label>
              {deliveryType === 'delivery' && (
                <span className="text-sm text-[#D61C1C]">
                  +{deliveryFee.toLocaleString()}원
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                <ShoppingBag className="w-5 h-5 text-[#F37021]" />
                <div>
                  <p className="text-[#2E1C10]">포장</p>
                  <p className="text-sm text-[#2E1C10]/60">
                    최소 주문 {MIN_ORDER_PICKUP.toLocaleString()}원
                  </p>
                </div>
              </Label>
              {deliveryType === 'pickup' && (
                <span className="text-sm text-[#C7A45A]">무료</span>
              )}
            </div>
          </RadioGroup>
        </div>

        {/* 요청사항 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">
            요청사항 (선택)
          </h2>
          <Textarea
            placeholder="예) 면 부드럽게 해주세요"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            maxLength={150}
            className="resize-none"
          />
          <p className="text-xs text-[#2E1C10]/60 mt-1">
            {requests?.length || 0}/150자
          </p>
        </div>

        {/* 최소 주문 금액 경고 */}
        {!canProceed && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {deliveryType === 'delivery' ? '배달' : '포장'}은{' '}
              {minOrderAmount.toLocaleString()}원 이상부터 가능해요.{' '}
              <span className="font-medium">
                {(minOrderAmount - subtotal).toLocaleString()}원 더 담아주세요.
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* 쿠폰 (나중에 구현) */}
        {/* <div>
          <Button variant="outline" className="w-full justify-between">
            <span>쿠폰 선택하기</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div> */}
      </div>

      {/* 하단 고정 결제 영역 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#2E1C10]/10 px-4 py-4 space-y-3">
        {/* 금액 상세 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#2E1C10]/60">주문 금액</span>
            <span className="text-[#2E1C10]">{subtotal.toLocaleString()}원</span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">할인</span>
              <span className="text-[#D61C1C]">-{couponDiscount.toLocaleString()}원</span>
            </div>
          )}

          {deliveryType === 'delivery' && (
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">배달비</span>
              <span className="text-[#2E1C10]">+{deliveryFee.toLocaleString()}원</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between">
            <span className="text-[#2E1C10]">총 결제액</span>
            <span className="text-xl text-[#D61C1C]">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <Button
          size="lg"
          className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          disabled={!canProceed}
          onClick={() => navigate('/app/checkout')}
        >
          {canProceed ? `${totalAmount.toLocaleString()}원 결제하기` : '최소 주문 금액 미달'}
        </Button>
      </div>
    </div>
  );
}

interface CartItemCardProps {
  item: {
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
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const optionsText = [
    item.options.noodle && `면양: ${item.options.noodle}`,
    item.options.spicy && `맵기: ${item.options.spicy}`,
    item.options.toppings && item.options.toppings.length > 0 && `토핑: ${item.options.toppings.join(', ')}`,
  ].filter(Boolean).join(' · ');

  const imageUrl = menuImages[item.menuId];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex gap-4">
        {/* 메뉴 이미지 */}
        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 rounded-xl overflow-hidden">
          {imageUrl ? (
            <ImageWithFallback
              src={imageUrl}
              alt={item.menuName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl">🍜</span>
            </div>
          )}
        </div>

        {/* 메뉴 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-[#2E1C10] truncate">
              {item.menuName}
            </h3>
            <button
              onClick={onRemove}
              className="flex-shrink-0 p-1 hover:bg-[#2E1C10]/5 rounded"
              aria-label="삭제"
            >
              <Trash2 className="w-4 h-4 text-[#2E1C10]/60" />
            </button>
          </div>

          {/* 옵션 */}
          {optionsText && (
            <p className="text-sm text-[#2E1C10]/60 mb-2">
              {optionsText}
            </p>
          )}

          {/* 수량 및 가격 */}
          <div className="flex items-center justify-between">
            {/* 수량 조절 */}
            <div className="flex items-center border border-[#2E1C10]/20 rounded-lg overflow-hidden">
              <button
                onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#F9F6F3]"
                aria-label="수량 감소"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-10 text-center text-sm text-[#2E1C10]">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#F9F6F3]"
                aria-label="수량 증가"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* 가격 */}
            <span className="text-[#D61C1C]">
              {item.subtotal.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 41. src/pages/app/Checkout.tsx

```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, HandCoins, Loader2, AlertCircle, Gift } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../../components/ui/separator';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Switch } from '../../components/ui/switch';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import { getPointsBalance, spendPoints, POINTS_POLICY } from '../../lib/points.api';
import { FEATURE_FLAGS } from '../../config/env';
import type { PaymentMethod } from '../../types/order';

// Firebase는 나중에 연동 (현재는 로컬 개발 모드)
const USE_FIREBASE = false;

export function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    deliveryType,
    deliveryAddress,
    requests,
    couponDiscount,
    getSubtotal,
    getDeliveryFee,
    getTotalAmount,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 포인트 관련 상태
  const [pointsBalance, setPointsBalance] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const baseTotal = subtotal - couponDiscount + deliveryFee;
  const pointsDiscount = usePoints ? pointsToUse : 0;
  const totalAmount = baseTotal - pointsDiscount;

  // 장바구니 비어있으면 리다이렉트
  useEffect(() => {
    if (items.length === 0) {
      navigate('/app/cart');
    }
  }, [items, navigate]);

  // 포인트 잔액 로드
  useEffect(() => {
    if (FEATURE_FLAGS.points) {
      loadPointsBalance();
    }
  }, []);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  async function loadPointsBalance() {
    try {
      const balance = await getPointsBalance(uid);
      setPointsBalance(balance);
    } catch (error) {
      console.error('Failed to load points balance:', error);
    }
  }

  // 포인트 사용 토글
  function handlePointsToggle(checked: boolean) {
    if (!checked) {
      setUsePoints(false);
      setPointsToUse(0);
      return;
    }

    // 사용 가능한 최대 포인트 계산
    const maxUsable = Math.min(pointsBalance, baseTotal);

    if (maxUsable < POINTS_POLICY.minUse) {
      toast.error(`최소 ${POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능합니다`);
      return;
    }

    setUsePoints(true);
    setPointsToUse(maxUsable);
  }

  // 포인트 사용 금액 변경
  function handlePointsChange(value: string) {
    const amount = parseInt(value) || 0;
    const maxUsable = Math.min(pointsBalance, baseTotal);

    if (amount > maxUsable) {
      setPointsToUse(maxUsable);
    } else if (amount < 0) {
      setPointsToUse(0);
    } else {
      setPointsToUse(amount);
    }
  }

  // 배달 시 주소 필수 확인
  const canProceed = agreeTerms && phone && (deliveryType === 'pickup' || deliveryAddress);

  const handlePayment = async () => {
    if (!canProceed) {
      toast.error('필수 정보를 입력해 주세요');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. 주문 ID 생성
      const orderId = `ORD${Date.now()}`;
      
      // 2. 포인트 사용 처리
      if (usePoints && pointsToUse > 0) {
        try {
          await spendPoints({
            uid,
            amount: pointsToUse,
            ref: {
              kind: 'order',
              id: orderId,
            },
            note: `주문 결제 시 포인트 사용`,
          });
        } catch (error) {
          toast.error('포인트 사용 중 오류가 발생했습니다');
          setIsProcessing(false);
          return;
        }
      }
      
      if (USE_FIREBASE) {
        // Firebase 연동 코드 (나중에 활성화)
        // TODO: Firestore에 주문 저장
        // TODO: NICEPAY 결제 호출
      } else {
        // 로컬 개발 모드: 주문 데이터를 localStorage에 저장
        const orderData = {
          orderId,
          items: items.map((item) => ({
            menuId: item.menuId,
            menuName: item.menuName,
            quantity: item.quantity,
            options: item.options,
            price: item.menuPrice,
            subtotal: item.subtotal,
          })),
          subtotal,
          discount: couponDiscount,
          pointsDiscount: pointsDiscount,
          deliveryFee,
          finalAmount: totalAmount,
          deliveryType,
          deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
          phone,
          email: email || undefined,
          requests: requests || undefined,
          status: 'placed',
          payment: {
            method: paymentMethod,
            status: paymentMethod === 'on_site' ? 'pending' : 'authorized',
            amount: totalAmount,
          },
          timeline: {
            pending: new Date().toISOString(),
            placed: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
        };

        // localStorage에 저장
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        orders[orderId] = orderData;
        localStorage.setItem('orders', JSON.stringify(orders));

        // 장바구니 비우기
        clearCart();

        // 성공 메시지
        if (paymentMethod === 'on_site') {
          toast.success('주문이 접수되었습니다');
          navigate(`/app/order/${orderId}?result=on_site`);
        } else {
          toast.success('결제가 완료되었습니다');
          navigate(`/app/order/${orderId}?result=success`);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('결제 처리 중 오류가 발생했습니다');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pb-32">
      <div className="px-4 py-6 space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-2xl text-[#2E1C10] mb-1">
            결제
          </h1>
          <p className="text-[#2E1C10]/60">
            결제 정보를 입력해 주세요
          </p>
        </div>

        {/* 주문 요약 */}
        <div className="bg-white rounded-2xl p-4 space-y-3">
          <h2 className="text-[#2E1C10]">주문 요약</h2>
          <div className="space-y-2">
            {items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/80">
                  {item.menuName} x {item.quantity}
                </span>
                <span className="text-[#2E1C10]">
                  {item.subtotal.toLocaleString()}원
                </span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-sm text-[#2E1C10]/60">
                외 {items.length - 3}개 메뉴
              </p>
            )}
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">소계</span>
              <span className="text-[#2E1C10]">{subtotal.toLocaleString()}원</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">할인</span>
                <span className="text-[#D61C1C]">-{couponDiscount.toLocaleString()}원</span>
              </div>
            )}
            {deliveryType === 'delivery' && (
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">배달비</span>
                <span className="text-[#2E1C10]">+{deliveryFee.toLocaleString()}원</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between">
              <span className="text-[#2E1C10]">총 결제액</span>
              <span className="text-xl text-[#D61C1C]">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* 포인트 사용 */}
        {FEATURE_FLAGS.points && (
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#D61C1C]" />
                <h2 className="text-[#2E1C10]">포인트 사용</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#2E1C10]/60">
                  보유: {pointsBalance.toLocaleString()}P
                </span>
                <Switch
                  checked={usePoints}
                  onCheckedChange={handlePointsToggle}
                  disabled={pointsBalance < POINTS_POLICY.minUse}
                />
              </div>
            </div>

            {usePoints && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={pointsToUse}
                    onChange={(e) => handlePointsChange(e.target.value)}
                    placeholder="사용할 포인트"
                    min={0}
                    max={Math.min(pointsBalance, baseTotal)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPointsToUse(Math.min(pointsBalance, baseTotal))}
                  >
                    전액 사용
                  </Button>
                </div>
                <p className="text-xs text-[#2E1C10]/60">
                  최소 {POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능 • 
                  최대 {Math.min(pointsBalance, baseTotal).toLocaleString()}P 사용 가능
                </p>
                {pointsToUse > 0 && (
                  <div className="flex justify-between text-sm p-3 bg-[#FBF9F6] rounded-lg">
                    <span className="text-[#2E1C10]/60">포인트 할인</span>
                    <span className="text-[#D61C1C] font-medium">
                      -{pointsToUse.toLocaleString()}원
                    </span>
                  </div>
                )}
              </div>
            )}

            {pointsBalance < POINTS_POLICY.minUse && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 text-sm">
                  포인트가 {POINTS_POLICY.minUse.toLocaleString()}P 미만입니다. 
                  주문 후 포인트를 적립하세요!
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* 연락처 정보 */}
        <div className="space-y-4">
          <h2 className="text-[#2E1C10]">연락처 정보</h2>
          <div>
            <Label htmlFor="phone">전화번호 *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">이메일 (선택)</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-[#2E1C10]/60 mt-1">
              이메일 영수증을 받으실 수 있어요
            </p>
          </div>
        </div>

        {/* 배달 주소 (배달 시만) */}
        {deliveryType === 'delivery' && !deliveryAddress && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              배달 주소를 입력해 주세요.{' '}
              <button className="underline" onClick={() => navigate('/app/cart')}>
                장바구니에서 설정
              </button>
            </AlertDescription>
          </Alert>
        )}

        {deliveryType === 'delivery' && deliveryAddress && (
          <div className="bg-white rounded-2xl p-4">
            <h2 className="text-[#2E1C10] mb-2">배달 주소</h2>
            <p className="text-sm text-[#2E1C10]">{deliveryAddress.address}</p>
            <p className="text-sm text-[#2E1C10]/60">{deliveryAddress.detail}</p>
          </div>
        )}

        {/* 결제 수단 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">결제 수단</h2>
          <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="w-5 h-5 text-[#D61C1C]" />
                <div>
                  <p className="text-[#2E1C10]">신용/체크카드</p>
                  <p className="text-sm text-[#2E1C10]/60">NICEPAY 안전 결제</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="easy_pay" id="easy_pay" />
              <Label htmlFor="easy_pay" className="flex items-center gap-2 cursor-pointer flex-1">
                <Wallet className="w-5 h-5 text-[#F37021]" />
                <div>
                  <p className="text-[#2E1C10]">간편결제</p>
                  <p className="text-sm text-[#2E1C10]/60">카카오페이, 네이버페이 등</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="on_site" id="on_site" />
              <Label htmlFor="on_site" className="flex items-center gap-2 cursor-pointer flex-1">
                <HandCoins className="w-5 h-5 text-[#C7A45A]" />
                <div>
                  <p className="text-[#2E1C10]">만나서 결제</p>
                  <p className="text-sm text-[#2E1C10]/60">현금 또는 카드</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* 약관 동의 */}
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
              <span className="text-[#2E1C10]">
                전자금융거래 이용약관, 주문 내역 확인 및 결제 동의
              </span>
            </Label>
          </div>
          <p className="text-xs text-[#2E1C10]/60 pl-6">
            위 내용을 확인하였으며 결제에 동의합니다.
          </p>
        </div>
      </div>

      {/* 하단 고정 결제 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#2E1C10]/10 px-4 py-4">
        <Button
          size="lg"
          className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          disabled={!canProceed || isProcessing}
          onClick={handlePayment}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              결제 처리 중...
            </>
          ) : (
            `${totalAmount.toLocaleString()}원 결제하기`
          )}
        </Button>
      </div>
    </div>
  );
}
```

## 42. src/pages/app/Coupons.tsx

```typescript
/**
 * 고객 쿠폰함 페이지
 * Phase 2-8: 쿠폰 목록 및 상태별 필터
 */

import { useState, useEffect } from 'react';
import { Coupon, CouponStatus, getCouponStatus, COUPON_TYPE_LABELS } from '../../types/coupon';
import { getCoupons } from '../../lib/coupons.api';
import { getCurrentUser } from '../../lib/auth';
import { CouponCard } from '../../components/app/CouponCard';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Ticket, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  const [statusFilter, setStatusFilter] = useState<CouponStatus | 'all'>('available');
  const [loading, setLoading] = useState(true);
  
  // 쿠폰 코드 입력
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [applying, setApplying] = useState(false);

  const user = getCurrentUser();

  useEffect(() => {
    loadCoupons();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredCoupons(coupons);
    } else {
      setFilteredCoupons(coupons.filter(c => getCouponStatus(c) === statusFilter));
    }
  }, [coupons, statusFilter]);

  const loadCoupons = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getCoupons(user.uid);
      setCoupons(data);
    } catch (error) {
      console.error('Failed to load coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCouponCode = async () => {
    if (!user) return;
    if (!couponCode.trim()) {
      toast.error('쿠폰 코드를 입력하세요');
      return;
    }

    setApplying(true);
    try {
      // Mock: 쿠폰 코드 검증 및 발급
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 쿠폰 코드 검증 (실제로는 서버에서 처리)
      const validCodes: Record<string, { title: string; amount: number; minSpend: number }> = {
        'WELCOME2025': { title: '신년 맞이 특별 할인', amount: 10000, minSpend: 30000 },
        'FIRSTORDER': { title: '첫 주문 감사 쿠폰', amount: 5000, minSpend: 15000 },
        'REVIEW500': { title: '리뷰 이벤트 쿠폰', amount: 3000, minSpend: 10000 },
      };

      const codeUpper = couponCode.toUpperCase().trim();
      const couponData = validCodes[codeUpper];

      if (!couponData) {
        toast.error('유효하지 않은 쿠폰 코드입니다');
        return;
      }

      // 이미 등록된 코드인지 확인
      const alreadyHas = coupons.some(c => c.title === couponData.title);
      if (alreadyHas) {
        toast.error('이미 등록된 쿠폰입니다');
        return;
      }

      // 쿠폰 발급
      const newCoupon: Coupon = {
        id: `coupon-code-${Date.now()}`,
        uid: user.uid,
        type: 'code',
        amount: couponData.amount,
        minSpend: couponData.minSpend,
        issuedAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30일
        used: false,
        title: couponData.title,
        description: `${couponData.minSpend.toLocaleString()}원 이상 주문 시 사용 가능`,
      };

      setCoupons([newCoupon, ...coupons]);
      toast.success(`🎉 ${couponData.title} 쿠폰이 등록되었습니다!`);
      setCodeDialogOpen(false);
      setCouponCode('');
    } catch (error) {
      console.error('Failed to apply coupon code:', error);
      toast.error('쿠폰 등록에 실패했습니다');
    } finally {
      setApplying(false);
    }
  };

  const availableCount = coupons.filter(c => getCouponStatus(c) === 'available').length;
  const usedCount = coupons.filter(c => getCouponStatus(c) === 'used').length;
  const expiredCount = coupons.filter(c => getCouponStatus(c) === 'expired').length;

  return (
    <div className="min-h-screen bg-[#F9F6F3] pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl text-[#333] flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#D61C1C]" />
            내 쿠폰
          </h1>
          <p className="text-sm text-[#8B7355] mt-1">
            사용 가능한 쿠폰 {availableCount}장
          </p>
        </div>
      </div>

      {/* 탭 필터 */}
      <div className="bg-white border-b sticky top-[73px] z-10">
        <div className="container mx-auto px-4 py-3">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="available">
                사용가능 ({availableCount})
              </TabsTrigger>
              <TabsTrigger value="used">
                사용완료 ({usedCount})
              </TabsTrigger>
              <TabsTrigger value="expired">
                만료됨 ({expiredCount})
              </TabsTrigger>
              <TabsTrigger value="all">
                전체 ({coupons.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* 쿠폰 목록 */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">쿠폰이 없습니다</p>
            <p className="text-sm text-gray-400 mt-2">
              사진 리뷰를 작성하면 3,000원 쿠폰을 드려요!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCoupons.map(coupon => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        )}
      </div>

      {/* 쿠폰 획득 안내 */}
      {availableCount === 0 && !loading && (
        <div className="container mx-auto px-4 pb-6">
          <div className="bg-gradient-to-br from-[#D61C1C]/10 to-[#F37021]/10 rounded-lg p-6 border border-[#D61C1C]/20">
            <h3 className="text-lg text-[#333] mb-3">쿠폰 받는 방법</h3>
            <ul className="space-y-2 text-sm text-[#8B7355]">
              <li className="flex items-start gap-2">
                <span className="text-[#D61C1C]">•</span>
                <span>주문 후 <strong>사진 리뷰</strong>를 남기면 3,000원 쿠폰</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F37021]">•</span>
                <span>신규 가입 시 5,000원 쿠폰</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C7A45A]">•</span>
                <span>특별 이벤트 쿠폰 (수시 발급)</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 43. src/pages/app/Home.tsx

```typescript
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ChevronRight, CloudSun, Star, Settings, Gift, Ticket } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { FEATURE_FLAGS } from '../../config/env';

export function Home() {
  const navigate = useNavigate();

  // 개발자 전용: 관리자 권한으로 전환
  const handleAdminAccess = (path: string) => {
    localStorage.setItem('mockRole', 'owner');
    navigate(path);
  };
  return (
    <div className="space-y-6">
      {/* 히어로 섹션 */}
      <section className="relative h-[300px] bg-gradient-to-b from-[#D61C1C] to-[#F37021]/20">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-3xl mb-4 text-center drop-shadow-lg">현풍닭칼국수</h1>
          <p className="text-lg text-center drop-shadow-md opacity-90">
            정성껏 끓여낸 진한 국물과 쫄깃한 수타면
          </p>
          <Button 
            onClick={() => navigate('/menu')} 
            size="lg" 
            className="mt-6 bg-white text-[#D61C1C] hover:bg-gray-100"
          >
            메뉴 보러가기
          </Button>
        </div>
      </section>
      
      <div className="px-4 space-y-6">
        {/* 영업 상태 */}
        <div className="flex items-center gap-2 p-4 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-center w-3 h-3">
            <span className="w-full h-full bg-green-500 rounded-full animate-pulse" />
          </div>
          <span className="text-sm text-[#2E1C10]">
            영업중
          </span>
          <span className="text-sm text-[#2E1C10]/60">
            10:00 - 22:00
          </span>
        </div>
        
        {/* 빠른 액션 */}
        <div className="grid grid-cols-2 gap-3">
          {FEATURE_FLAGS.points && (
            <Link 
              to="/points" 
              className="p-4 bg-gradient-to-br from-[#D61C1C] to-[#F37021] rounded-2xl shadow-sm text-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <Gift className="w-6 h-6" />
                <ChevronRight className="w-5 h-5" />
              </div>
              <p className="text-sm opacity-90 mb-1">내 포인트</p>
              <p className="text-xl">0P</p>
            </Link>
          )}
          
          <Link 
            to="/coupons" 
            className="p-4 bg-gradient-to-br from-[#F37021] to-[#C7A45A] rounded-2xl shadow-sm text-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <Ticket className="w-6 h-6" />
              <ChevronRight className="w-5 h-5" />
            </div>
            <p className="text-sm opacity-90 mb-1">내 쿠폰</p>
            <p className="text-xl">0개</p>
          </Link>
        </div>
        
        {/* 날씨 기반 추천 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CloudSun className="w-5 h-5 text-[#F37021]" />
            <h2 className="text-[#2E1C10]">
              오늘의 추천 메뉴
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RecommendCard
              name="현풍닭칼국수"
              price={9000}
              image="https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBub29kbGUlMjBzb3VwfGVufDF8fHx8MTc2MTYyMzMxOXww&ixlib=rb-4.1.0&q=80&w=1080"
              badge="베스트"
            />
            <RecommendCard
              name="수육 (중)"
              price={20000}
              image="https://images.unsplash.com/photo-1645530656505-1b8a4057889b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBwb3JrJTIwYmVsbHl8ZW58MXx8fHwxNzYxNjIzMzE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            />
          </div>
        </section>
        
        {/* 리뷰 하이라이트 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-[#F37021] text-[#F37021]" />
              <h2 className="text-[#2E1C10]">고객 리뷰</h2>
            </div>
            <Link to="/reviews" className="text-sm text-[#D61C1C] flex items-center gap-1">
              전체보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F37021] text-[#F37021]" />
                ))}
              </div>
              <span className="text-sm text-[#2E1C10]/60">김고객 님</span>
            </div>
            <p className="text-sm text-[#2E1C10] mb-3">
              칼국수 진짜 맛있어요! 국물이 진하고 면발도 쫄깃해요. 닭고기도 부드럽고 양도 푸짐합니다.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800"
                  alt="리뷰 사진"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800"
                  alt="리뷰 사진"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* 공지사항 */}
        <section className="p-4 bg-[#F37021]/10 rounded-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-[#F37021] text-[#F37021]">
                  공지
                </Badge>
                <span className="text-xs text-[#2E1C10]/60">
                  2024.10.28
                </span>
              </div>
              <h3 className="text-sm text-[#2E1C10] mb-1">
                사진 리뷰 쓰고 3,000원 쿠폰 받으세요!
              </h3>
              <p className="text-sm text-[#2E1C10]/60">
                사진과 함께 리뷰를 남겨주시면 다음 주문에 사용 가능한 쿠폰을 드립니다.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#2E1C10]/40 flex-shrink-0" />
          </div>
        </section>
        
        {/* CTA 버튼 */}
        <Link to="/menu">
          <Button 
            size="lg"
            className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          >
            메뉴 보기
          </Button>
        </Link>
        
        {/* 개발자 전용: 관리자 페이지 바로가기 */}
        {/* TODO: 배포 전 삭제 필요 */}
        <div className="mt-4 p-4 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <p className="text-xs text-gray-500 mb-2 text-center">개발자 전용</p>
          <Button 
            variant="outline"
            size="sm"
            className="w-full border-gray-400 text-gray-700 hover:bg-gray-200"
            onClick={() => handleAdminAccess('/admin/dashboard')}
          >
            <Settings className="w-4 h-4 mr-2" />
            관리자 대시보드
          </Button>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button 
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => handleAdminAccess('/admin/orders')}
            >
              주문 관리
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => handleAdminAccess('/admin/reviews')}
            >
              리뷰 관리
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RecommendCardProps {
  name: string;
  price: number;
  image: string;
  badge?: string;
}

function RecommendCard({ name, price, image, badge }: RecommendCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="aspect-square bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {badge && (
            <Badge className="bg-[#D61C1C] text-white text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <h3 className="text-sm text-[#2E1C10] mb-1">
          {name}
        </h3>
        <p className="text-[#D61C1C]">
          {price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
```

## 44. src/pages/app/MenuDetail.tsx

```typescript
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
import type { Menu, MenuOption } from '../../types/menu';

// 실제 음식 이미지 매핑
const menuImages: Record<string, string> = {
  'menu-001': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-002': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-003': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-004': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-005': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=800',
  'menu-006': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-007': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-008': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-013': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-014': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=800',
  'menu-021': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=800',
  'menu-022': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=800',
  'menu-023': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=800',
  'menu-024': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=800',
  'menu-025': 'https://images.unsplash.com/photo-1616627077891-a4780e730b7e?w=800',
};

const badgeStyles = {
  best: 'bg-[#D61C1C] text-white',
  signature: 'bg-[#C7A45A] text-white',
  spicy: 'bg-[#F37021] text-white',
  cold: 'bg-blue-500 text-white',
};

const badgeLabels = {
  best: '베스트',
  signature: '시그니처',
  spicy: '매운맛',
  cold: '냉메뉴',
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
        <Button onClick={() => navigate('/app/menu')}>
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
        onClick: () => navigate('/app/cart'),
      },
    });
  };
  
  const isTimeRestricted = menu.availableHours && !menu.isAvailable;
  const isSoldOut = !menu.isAvailable && !menu.availableHours;
  const imageUrl = menuImages[menu.menuId];
  
  return (
    <div className="pb-24">
      {/* 메뉴 이미지 */}
      <div className="relative aspect-square bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 overflow-hidden">
        {imageUrl ? (
          <ImageWithFallback
            src={imageUrl}
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
```

## 45. src/pages/app/MenuList.tsx

```typescript
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import menusData from '../../data/menus.json';
import type { Menu, MenuCategory } from '../../types/menu';

// 실제 음식 이미지 매핑
const menuImages: Record<string, string> = {
  'menu-001': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-002': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-003': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-004': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-005': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=400',
  'menu-006': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-007': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-008': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-013': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-014': 'https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?w=400',
  'menu-021': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=400',
  'menu-022': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=400',
  'menu-023': 'https://images.unsplash.com/photo-1645530656505-1b8a4057889b?w=400',
  'menu-024': 'https://images.unsplash.com/photo-1608120073766-c80051eccbf6?w=400',
  'menu-025': 'https://images.unsplash.com/photo-1616627077891-a4780e730b7e?w=400',
};

const categories: { value: MenuCategory; label: string }[] = [
  { value: 'noodle', label: '메인' },
  { value: 'set', label: '세트' },
  { value: 'side', label: '사이드' },
  { value: 'drink', label: '음료' },
  { value: 'alcohol', label: '주류' },
];

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

export function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('noodle');
  const [searchQuery, setSearchQuery] = useState('');
  
  // JSON 데이터를 배열로 변환
  const menus = useMemo(() => {
    return Array.isArray(menusData) ? (menusData as Menu[]) : [];
  }, []);
  
  const filteredMenus = useMemo(() => {
    if (!Array.isArray(menus) || menus.length === 0) {
      return [];
    }
    return menus.filter((menu) => {
      const matchesCategory = menu.category === selectedCategory;
      const matchesSearch = menu.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menus, selectedCategory, searchQuery]);
  
  return (
    <div className="pb-6">
      {/* 검색 */}
      <div className="sticky top-14 z-40 bg-[#F9F6F3] pt-4 px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2E1C10]/40" />
          <Input
            type="search"
            placeholder="메뉴 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>
      
      {/* 카테고리 탭 */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as MenuCategory)}>
        <div className="sticky top-[104px] z-40 bg-[#F9F6F3] px-4 pb-3">
          <TabsList className="w-full justify-start overflow-x-auto bg-white">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="data-[state=active]:bg-[#D61C1C] data-[state=active]:text-white"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {/* 메뉴 리스트 */}
        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value} className="px-4 mt-0">
            {filteredMenus.length === 0 ? (
              <div className="text-center py-12 text-[#2E1C10]/60">
                검색 결과가 없습니다
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMenus.map((menu) => (
                  <MenuCard key={menu.menuId} menu={menu} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface MenuCardProps {
  menu: Menu;
}

function MenuCard({ menu }: MenuCardProps) {
  const imageUrl = menuImages[menu.menuId];
  
  return (
    <Link to={`/app/menu/${menu.menuId}`}>
      <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        !menu.isAvailable ? 'opacity-60' : ''
      }`}>
        <div className="flex gap-4 p-4">
          {/* 메뉴 이미지 */}
          <div className="relative flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 rounded-xl overflow-hidden">
            {imageUrl ? (
              <ImageWithFallback
                src={imageUrl}
                alt={menu.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl">🍜</span>
              </div>
            )}
            {!menu.isAvailable && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge className="bg-gray-600 text-white">품절</Badge>
              </div>
            )}
            {menu.availableHours && (
              <div className="absolute bottom-1 right-1">
                <Badge className="bg-yellow-500 text-white text-xs">시간제</Badge>
              </div>
            )}
          </div>
          
          {/* 메뉴 정보 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-[#2E1C10] truncate">
                {menu.name}
              </h3>
            </div>
            
            {/* 뱃지 */}
            {menu.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {menu.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className={`text-xs ${badgeStyles[badge]}`}
                  >
                    {badgeLabels[badge]}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* 설명 */}
            <p className="text-sm text-[#2E1C10]/60 line-clamp-2 mb-2">
              {menu.description}
            </p>
            
            {/* 가격 */}
            <p className="text-[#D61C1C]">
              {menu.price.toLocaleString()}원
            </p>
            
            {/* 시간제 안내 */}
            {menu.availableHours && (
              <p className="text-xs text-yellow-600 mt-1">
                {menu.availableHours.start} - {menu.availableHours.end}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

## 46. src/pages/app/NotificationSettings.tsx

```typescript
/**
 * 알림 설정 페이지
 * Phase 3-6: 푸시 알림 시스템
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { ArrowLeft, Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  requestNotificationPermission,
  hasNotificationPermission,
  isNotificationSupported,
  getNotificationSettings,
  saveNotificationSettings,
  sendTestNotification,
} from '../../lib/fcm';
import type { NotificationSettings } from '../../types/notification';

export default function NotificationSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  
  // Mock user ID (실제로는 인증된 사용자 ID 사용)
  const userId = 'mock-user-1';

  useEffect(() => {
    loadSettings();
    setHasPermission(hasNotificationPermission());
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getNotificationSettings(userId);
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('설정을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPermission = async () => {
    if (!isNotificationSupported()) {
      toast.error('이 브라우저는 알림을 지원하지 않습니다');
      return;
    }

    try {
      const token = await requestNotificationPermission(userId);
      if (token) {
        setHasPermission(true);
        toast.success('알림 권한이 허용되었습니다');
      } else {
        toast.error('알림 권한이 거부되었습니다');
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
      toast.error('알림 권한 요청에 실패했습니다');
    }
  };

  const handleToggle = async (key: keyof NotificationSettings, value: boolean) => {
    if (!settings) return;

    const newSettings = {
      ...settings,
      [key]: value,
      updatedAt: new Date(),
    };

    setSettings(newSettings);

    // 즉시 저장
    try {
      await saveNotificationSettings(userId, newSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('설정 저장에 실패했습니다');
      // 롤백
      setSettings(settings);
    }
  };

  const handleTestNotification = () => {
    if (!hasPermission) {
      toast.error('알림 권한이 필요합니다');
      return;
    }

    sendTestNotification();
    toast.success('테스트 알림을 전송했습니다');
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">알림 설정</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="h-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">알림 설정</h1>
          </div>
        </div>
      </div>

      {/* 설정 */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 권한 상태 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasPermission ? (
                  <Bell className="w-5 h-5 text-[#D61C1C]" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <h3 className="text-sm">알림 권한</h3>
                  <CardDescription className="text-xs">
                    {hasPermission
                      ? '알림 권한이 허용되었습니다'
                      : '알림을 받으려면 권한을 허용해주세요'}
                  </CardDescription>
                </div>
              </div>
              {!hasPermission && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRequestPermission}
                >
                  허용
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* 전체 알림 설정 */}
        <Card>
          <CardHeader>
            <h3 className="text-sm">전체 알림</h3>
            <CardDescription className="text-xs">
              모든 푸시 알림 활성화/비활성화
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="enabled">알림 받기</Label>
              <Switch
                id="enabled"
                checked={settings.enabled}
                onCheckedChange={(value) => handleToggle('enabled', value)}
                disabled={!hasPermission}
              />
            </div>
          </CardContent>
        </Card>

        {/* 알림 타입별 설정 */}
        <Card>
          <CardHeader>
            <h3 className="text-sm">알림 종류</h3>
            <CardDescription className="text-xs">
              받고 싶은 알림을 선택하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderUpdates">주문 상태 알림</Label>
                <p className="text-xs text-gray-500">
                  주문 접수, 조리, 배달 등
                </p>
              </div>
              <Switch
                id="orderUpdates"
                checked={settings.orderUpdates}
                onCheckedChange={(value) => handleToggle('orderUpdates', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions">프로모션 알림</Label>
                <p className="text-xs text-gray-500">
                  이벤트, 할인 정보 등
                </p>
              </div>
              <Switch
                id="promotions"
                checked={settings.promotions}
                onCheckedChange={(value) => handleToggle('promotions', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reviews">리뷰 알림</Label>
                <p className="text-xs text-gray-500">
                  리뷰 요청, 답글 등
                </p>
              </div>
              <Switch
                id="reviews"
                checked={settings.reviews}
                onCheckedChange={(value) => handleToggle('reviews', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="points">포인트 알림</Label>
                <p className="text-xs text-gray-500">
                  포인트 적립, 만료 예정 등
                </p>
              </div>
              <Switch
                id="points"
                checked={settings.points}
                onCheckedChange={(value) => handleToggle('points', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>
          </CardContent>
        </Card>

        {/* 알림 효과 설정 */}
        <Card>
          <CardHeader>
            <h3 className="text-sm">알림 효과</h3>
            <CardDescription className="text-xs">
              알림을 받을 때의 효과 설정
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound">알림음</Label>
              <Switch
                id="sound"
                checked={settings.sound}
                onCheckedChange={(value) => handleToggle('sound', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="vibration">진동</Label>
              <Switch
                id="vibration"
                checked={settings.vibration}
                onCheckedChange={(value) => handleToggle('vibration', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>
          </CardContent>
        </Card>

        {/* 테스트 */}
        {hasPermission && settings.enabled && (
          <Card>
            <CardHeader>
              <h3 className="text-sm">테스트</h3>
              <CardDescription className="text-xs">
                테스트 알림을 전송해보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleTestNotification}
              >
                테스트 알림 보내기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
```

## 47. src/pages/app/Notifications.tsx

```typescript
/**
 * 알림함 페이지
 * 푸시 알림 내역 조회 및 관리
 * Phase 3-6: 푸시 알림 시스템
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Bell, BellOff, CheckCheck, ArrowLeft, Settings } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  markAsClicked,
} from '../../lib/notifications.api';
import type { Notification } from '../../types/notification';

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock user ID (실제로는 인증된 사용자 ID 사용)
  const userId = 'mock-user-1';

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications(userId, 50);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      toast.error('알림을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead(userId);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('모든 알림을 읽음으로 표시했습니다');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('처리 중 오류가 발생했습니다');
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // 읽음 및 클릭 처리
    if (!notification.read) {
      await handleMarkAsRead(notification.id);
    }
    await markAsClicked(notification.id);

    // 알림 타입에 따라 페이지 이동
    switch (notification.type) {
      case 'order_received':
      case 'order_cooking':
      case 'order_ready':
      case 'order_delivering':
      case 'order_completed':
      case 'order_cancelled':
        if (notification.data?.orderId) {
          navigate(`/app/order-tracking?orderId=${notification.data.orderId}`);
        }
        break;
      case 'coupon_issued':
        navigate('/app/coupons');
        break;
      case 'points_earned':
        navigate('/app/points');
        break;
      case 'review_reminder':
        if (notification.data?.orderId) {
          navigate(`/app/review/write?orderId=${notification.data.orderId}`);
        }
        break;
      case 'review_reply':
        navigate('/app/reviews');
        break;
      default:
        // 기타 알림은 클릭 처리만
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      order_received: '✅',
      order_cooking: '👨‍🍳',
      order_ready: '🍜',
      order_delivering: '🚚',
      order_completed: '✅',
      order_cancelled: '❌',
      coupon_issued: '🎁',
      points_earned: '💰',
      review_reminder: '✍️',
      review_reply: '💬',
      promotion: '🎉',
      system: '📢',
    };
    return icons[type] || '🔔';
  };

  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return '방금 전';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;

    return date.toLocaleDateString('ko-KR');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">알림</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg">알림</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </div>

            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                모두 읽음
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 알림 목록 */}
      <div className="max-w-md mx-auto p-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BellOff className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">알림이 없습니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all ${
                  notification.read
                    ? 'bg-white'
                    : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {notification.body}
                        </p>
                      </div>
                    </div>

                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

## 48. src/pages/app/OrderTracking.tsx

```typescript
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Phone, CheckCircle2, Clock, Loader2, XCircle, AlertCircle, Receipt, Download, MapPin, Navigation, Gift } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Separator } from '../../components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { generateReceipt, requestCashReceipt } from '../../lib/functions';
import { toast } from 'sonner@2.0.3';
import { delivery, isDeliveryEnabled } from '../../lib/delivery';
import { earnPoints, calculateEarnPoints } from '../../lib/points.api';
import { FEATURE_FLAGS } from '../../config/env';
import type { OrderStatus } from '../../types/order';
import type { DeliveryTask } from '../../types/delivery';

// Firebase는 나중에 연동 (현재는 로컬 개발 모드)
const USE_FIREBASE = false;

// 로컬 개발용 Order 타입 (간소화)
interface LocalOrder {
  orderId: string;
  items: Array<{
    menuId: string;
    menuName: string;
    quantity: number;
    options: {
      noodle?: string;
      spicy?: string;
      toppings?: string[];
    };
    price: number;
    subtotal: number;
  }>;
  subtotal: number;
  discount: number;
  pointsDiscount?: number;
  deliveryFee: number;
  finalAmount: number;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: {
    address: string;
    detail: string;
  };
  phone: string;
  email?: string;
  requests?: string;
  status: OrderStatus;
  payment: {
    method: string;
    status: string;
    amount: number;
  };
  timeline: {
    pending?: string;
    placed?: string;
    accepted?: string;
    cooking?: string;
    out_for_delivery?: string;
    pickup_ready?: string;
    done?: string;
  };
  createdAt: string;
  pointsEarned?: number; // 적립된 포인트 (완료 시)
}

const statusConfig: Record<OrderStatus, { label: string; icon: any; color: string }> = {
  pending: { label: '결제 대기', icon: Clock, color: 'text-gray-500' },
  payment_failed: { label: '결제 실패', icon: XCircle, color: 'text-red-500' },
  placed: { label: '주문 접수', icon: CheckCircle2, color: 'text-green-500' },
  accepted: { label: '접수 확인', icon: CheckCircle2, color: 'text-green-500' },
  cooking: { label: '조리 중', icon: Loader2, color: 'text-orange-500' },
  out_for_delivery: { label: '배달 중', icon: Loader2, color: 'text-blue-500' },
  pickup_ready: { label: '포장 완료', icon: CheckCircle2, color: 'text-green-500' },
  done: { label: '완료', icon: CheckCircle2, color: 'text-green-500' },
  canceled: { label: '취소', icon: XCircle, color: 'text-gray-500' },
};

export function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<LocalOrder | null>(null);
  const [loading, setLoading] = useState(true);

  // 배달 추적 상태
  const [deliveryTask, setDeliveryTask] = useState<DeliveryTask | null>(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  // 현금영수증 신청 상태
  const [cashReceiptDialog, setCashReceiptDialog] = useState(false);
  const [cashReceiptType, setCashReceiptType] = useState<'personal' | 'business'>('personal');
  const [cashReceiptNumber, setCashReceiptNumber] = useState('');
  const [issuingCashReceipt, setIssuingCashReceipt] = useState(false);

  // 영수증 다운로드 상태
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  // 포인트 적립 처리 여부
  const [pointsProcessed, setPointsProcessed] = useState(false);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  const result = searchParams.get('result');
  const resultMsg = searchParams.get('msg');

  useEffect(() => {
    if (!orderId) return;

    if (USE_FIREBASE) {
      // Firebase 연동 코드 (나중에 활성화)
      // TODO: Firestore 실시간 리스너
    } else {
      // 로컬 개발 모드: localStorage에서 주문 조회
      try {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        const foundOrder = orders[orderId];
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setOrder(null);
        }
      } catch (error) {
        console.error('Failed to load order:', error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
  }, [orderId]);

  // 배달 추적 정보 로드 (배달 중일 때)
  useEffect(() => {
    if (!order || !isDeliveryEnabled || order.deliveryType !== 'delivery') return;

    // 배달 중 상태일 때만 추적 정보 로드
    if (order.status === 'out_for_delivery') {
      loadDeliveryTracking();
      
      // 5초마다 배달 정보 업데이트
      const interval = setInterval(loadDeliveryTracking, 5000);
      return () => clearInterval(interval);
    }
  }, [order]);

  // 포인트 적립 처리 (주문 완료 시)
  useEffect(() => {
    if (!order || !FEATURE_FLAGS.points || pointsProcessed) return;

    // 주문 완료 상태이고 아직 포인트 적립이 안된 경우
    if (order.status === 'done' && !order.pointsEarned) {
      processPointsEarn();
    }
  }, [order, pointsProcessed]);

  async function processPointsEarn() {
    if (!order || !orderId) return;

    try {
      // 적립 포인트 계산 (결제 금액 기준)
      const earnAmount = calculateEarnPoints(order.finalAmount);

      if (earnAmount > 0) {
        await earnPoints({
          uid,
          amount: earnAmount,
          ref: {
            kind: 'order',
            id: orderId,
          },
          note: `주문 완료 포인트 적립 (주문번호: ${orderId})`,
        });

        // 주문 정보 업데이트
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        orders[orderId].pointsEarned = earnAmount;
        localStorage.setItem('orders', JSON.stringify(orders));

        // 상태 업데이트
        setOrder({ ...order, pointsEarned: earnAmount });
        setPointsProcessed(true);

        // 토스트 알림
        toast.success(`${earnAmount.toLocaleString()}P 포인트가 적립되었습니다!`, {
          icon: <Gift className="w-4 h-4" />,
        });
      }
    } catch (error) {
      console.error('Failed to earn points:', error);
      // 에러가 발생해도 다시 시도하지 않도록 처리됨으로 표시
      setPointsProcessed(true);
    }
  }

  async function loadDeliveryTracking() {
    if (!orderId) return;

    try {
      setDeliveryLoading(true);
      
      // localStorage에서 배달 taskId 조회
      const deliveryMeta = localStorage.getItem(`delivery_${orderId}`);
      if (deliveryMeta) {
        const { taskId } = JSON.parse(deliveryMeta);
        const task = await delivery.getTask(taskId);
        setDeliveryTask(task);
      }
    } catch (error) {
      console.error('Failed to load delivery tracking:', error);
    } finally {
      setDeliveryLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D61C1C]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <AlertCircle className="w-16 h-16 text-[#2E1C10]/40 mb-4" />
        <h2 className="text-xl text-[#2E1C10] mb-2">
          주문을 찾을 수 없습니다
        </h2>
        <Button onClick={() => navigate('/app')}>홈으로</Button>
      </div>
    );
  }

  const statusInfo = statusConfig[order.status];
  const StatusIcon = statusInfo.icon;

  // 결제 결과 메시지
  const paymentResultMessage = result === 'success'
    ? '결제가 완료되었습니다'
    : result === 'failed'
    ? `결제 실패: ${resultMsg || '알 수 없는 오류'}`
    : result === 'timeout'
    ? '결제 결과 확인 시간이 초과되었습니다'
    : result === 'on_site'
    ? '주문이 접수되었습니다. 만나서 결제해 주세요.'
    : null;

  return (
    <div className="pb-6">
      <div className="px-4 py-6 space-y-6">
        {/* 결제 결과 알림 */}
        {paymentResultMessage && (
          <Alert variant={result === 'success' || result === 'on_site' ? 'default' : 'destructive'}>
            {result === 'success' || result === 'on_site' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertDescription>{paymentResultMessage}</AlertDescription>
          </Alert>
        )}

        {/* 주문 상태 */}
        <div className="bg-white rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 rounded-full bg-${statusInfo.color.split('-')[1]}-100 flex items-center justify-center`}>
              <StatusIcon className={`w-8 h-8 ${statusInfo.color} ${statusInfo.icon === Loader2 ? 'animate-spin' : ''}`} />
            </div>
          </div>
          <h1 className="text-2xl text-[#2E1C10] mb-2">
            {statusInfo.label}
          </h1>
          <p className="text-[#2E1C10]/60">
            주문번호: {order.orderId}
          </p>
        </div>

        {/* 타임라인 */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-[#2E1C10] mb-4">주문 진행 상황</h2>
          <div className="space-y-4">
            {order.deliveryType === 'delivery' ? (
              <>
                <TimelineItem
                  label="주문 접수"
                  timestamp={order.timeline.placed}
                  completed={!!order.timeline.placed}
                  active={order.status === 'placed'}
                />
                <TimelineItem
                  label="접수 확인"
                  timestamp={order.timeline.accepted}
                  completed={!!order.timeline.accepted}
                  active={order.status === 'accepted'}
                />
                <TimelineItem
                  label="조리 중"
                  timestamp={order.timeline.cooking}
                  completed={!!order.timeline.cooking}
                  active={order.status === 'cooking'}
                />
                <TimelineItem
                  label="배달 중"
                  timestamp={order.timeline.out_for_delivery}
                  completed={!!order.timeline.out_for_delivery}
                  active={order.status === 'out_for_delivery'}
                />
                <TimelineItem
                  label="완료"
                  timestamp={order.timeline.done}
                  completed={!!order.timeline.done}
                  active={order.status === 'done'}
                  isLast
                />
              </>
            ) : (
              <>
                <TimelineItem
                  label="주문 접수"
                  timestamp={order.timeline.placed}
                  completed={!!order.timeline.placed}
                  active={order.status === 'placed'}
                />
                <TimelineItem
                  label="조리 중"
                  timestamp={order.timeline.cooking}
                  completed={!!order.timeline.cooking}
                  active={order.status === 'cooking'}
                />
                <TimelineItem
                  label="포장 완료"
                  timestamp={order.timeline.pickup_ready}
                  completed={!!order.timeline.pickup_ready}
                  active={order.status === 'pickup_ready'}
                />
                <TimelineItem
                  label="완료"
                  timestamp={order.timeline.done}
                  completed={!!order.timeline.done}
                  active={order.status === 'done'}
                  isLast
                />
              </>
            )}
          </div>
        </div>

        {/* GPS 배달 추적 (배달 중일 때) */}
        {isDeliveryEnabled && 
         order.deliveryType === 'delivery' && 
         order.status === 'out_for_delivery' && 
         deliveryTask && (
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* 지도 플레이스홀더 */}
            <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-[#D61C1C] mx-auto animate-bounce" />
                  <p className="text-[#2E1C10]/60 text-sm">실시간 배달 추적</p>
                  <p className="text-xs text-[#2E1C10]/40">
                    {deliveryTask.lastCoord 
                      ? `위도 ${deliveryTask.lastCoord.lat.toFixed(4)}, 경도 ${deliveryTask.lastCoord.lng.toFixed(4)}`
                      : '위치 정보 로딩 중...'}
                  </p>
                </div>
              </div>
              
              {/* TODO: 실제 지도 API 연동 (Kakao Maps, Google Maps 등) */}
              {/* <div id="delivery-map" className="w-full h-full" /> */}
            </div>

            {/* 배달 정보 */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#D61C1C]/10 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-[#D61C1C]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#2E1C10]/60">배달 상태</p>
                    <p className="text-[#2E1C10]">
                      {deliveryTask.status === 'delivering' ? '배달 중' : 
                       deliveryTask.status === 'picked_up' ? '픽업 완료' :
                       deliveryTask.status === 'assigned' ? '배정됨' : '처리 중'}
                    </p>
                  </div>
                </div>
                
                {deliveryTask.eta !== undefined && deliveryTask.eta > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-[#2E1C10]/60">예상 도착</p>
                    <p className="text-xl text-[#F37021]">
                      약 {deliveryTask.eta}분
                    </p>
                  </div>
                )}
              </div>

              {deliveryTask.driverId && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-[#2E1C10]/60 mb-1">배달기사 정보</p>
                  <p className="text-sm text-[#2E1C10]">
                    기사 ID: {deliveryTask.driverId}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 예상 시간 (조리 중일 때만, 또는 배달추적 미활성화 시) */}
        {(order.status === 'cooking' || 
          (order.status === 'out_for_delivery' && (!isDeliveryEnabled || !deliveryTask))) && (
          <div className="bg-[#F37021]/10 rounded-2xl p-4 text-center">
            <Clock className="w-6 h-6 text-[#F37021] mx-auto mb-2" />
            <p className="text-[#2E1C10]">
              {order.deliveryType === 'delivery' ? '예상 도착' : '예상 완료'}
            </p>
            <p className="text-xl text-[#F37021]">
              약 30-40분
            </p>
          </div>
        )}

        {/* 가게 문의 */}
        <div className="bg-white rounded-2xl p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = 'tel:010-2068-4732')}
          >
            <Phone className="w-5 h-5 mr-2" />
            가게에 문의하기
          </Button>
        </div>

        <Separator />

        {/* 주문 상세 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">주문 내역</h2>
          <div className="bg-white rounded-2xl p-4 space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex-1">
                  <p className="text-[#2E1C10]">
                    {item.menuName} x {item.quantity}
                  </p>
                  {(item.options.noodle || item.options.spicy || item.options.toppings) && (
                    <p className="text-sm text-[#2E1C10]/60">
                      {[
                        item.options.noodle && `면양: ${item.options.noodle}`,
                        item.options.spicy && `맵기: ${item.options.spicy}`,
                        item.options.toppings && item.options.toppings.length > 0 && `토핑: ${item.options.toppings.join(', ')}`,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                </div>
                <span className="text-[#2E1C10]">
                  {item.subtotal.toLocaleString()}원
                </span>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">소계</span>
                <span className="text-[#2E1C10]">{order.subtotal.toLocaleString()}원</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#2E1C10]/60">쿠폰 할인</span>
                  <span className="text-[#D61C1C]">-{order.discount.toLocaleString()}원</span>
                </div>
              )}
              {order.pointsDiscount && order.pointsDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-[#2E1C10]/60">
                    <Gift className="w-3 h-3" />
                    <span>포인트 할인</span>
                  </div>
                  <span className="text-[#D61C1C]">-{order.pointsDiscount.toLocaleString()}P</span>
                </div>
              )}
              {order.deliveryType === 'delivery' && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#2E1C10]/60">배달비</span>
                  <span className="text-[#2E1C10]">+{order.deliveryFee.toLocaleString()}원</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className="text-[#2E1C10]">총 결제액</span>
                <span className="text-xl text-[#D61C1C]">
                  {order.finalAmount.toLocaleString()}원
                </span>
              </div>
              
              {/* 포인트 적립 정보 */}
              {FEATURE_FLAGS.points && order.pointsEarned && (
                <>
                  <Separator />
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#D61C1C]/5 to-[#F37021]/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#D61C1C]" />
                      <span className="text-sm text-[#2E1C10]">적립 포인트</span>
                    </div>
                    <span className="font-medium text-[#D61C1C]">
                      +{order.pointsEarned.toLocaleString()}P
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 배달 주소 */}
        {order.deliveryType === 'delivery' && order.deliveryAddress && (
          <div>
            <h2 className="text-[#2E1C10] mb-3">배달 주소</h2>
            <div className="bg-white rounded-2xl p-4">
              <p className="text-sm text-[#2E1C10]">{order.deliveryAddress.address}</p>
              <p className="text-sm text-[#2E1C10]/60">{order.deliveryAddress.detail}</p>
            </div>
          </div>
        )}

        {/* 요청사항 */}
        {order.requests && (
          <div>
            <h2 className="text-[#2E1C10] mb-3">요청사항</h2>
            <div className="bg-white rounded-2xl p-4">
              <p className="text-sm text-[#2E1C10]">{order.requests}</p>
            </div>
          </div>
        )}

        {/* 영수증 관련 버튼 (완료 시) */}
        {order.status === 'done' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleDownloadReceipt}
                disabled={downloadingReceipt}
              >
                {downloadingReceipt ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                영수증 보기
              </Button>
              <Button
                variant="outline"
                onClick={() => setCashReceiptDialog(true)}
              >
                <Receipt className="w-4 h-4 mr-2" />
                현금영수증
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
              onClick={() => navigate(`/review/${orderId}`)}
            >
              리뷰 작성하고 쿠폰 받기 🎁
            </Button>
          </div>
        )}
      </div>

      {/* 현금영수증 신청 다이얼로그 */}
      <Dialog open={cashReceiptDialog} onOpenChange={setCashReceiptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>현금영수증 신청</DialogTitle>
            <DialogDescription>
              현금영수증 발급 정보를 입력해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>발급 유형</Label>
              <RadioGroup value={cashReceiptType} onValueChange={(v) => setCashReceiptType(v as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="font-normal cursor-pointer">
                    개인 소득공제용
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business" className="font-normal cursor-pointer">
                    사업자 지출증빙용
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt-number">
                {cashReceiptType === 'personal' ? '휴대폰 번호' : '사업자등록번호'}
              </Label>
              <Input
                id="receipt-number"
                placeholder={
                  cashReceiptType === 'personal'
                    ? '01012345678'
                    : '000-00-00000'
                }
                value={cashReceiptNumber}
                onChange={(e) => setCashReceiptNumber(e.target.value)}
              />
            </div>

            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              💡 현금영수증은 신청 후 즉시 발급되며, 국세청 홈택스에서 확인할 수 있습니다.
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCashReceiptDialog(false);
                setCashReceiptNumber('');
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleRequestCashReceipt}
              disabled={!cashReceiptNumber.trim() || issuingCashReceipt}
            >
              {issuingCashReceipt ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  발급 중...
                </>
              ) : (
                '신청하기'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  // 영수증 다운로드
  async function handleDownloadReceipt() {
    if (!orderId) return;

    setDownloadingReceipt(true);
    try {
      const receiptUrl = await generateReceipt(orderId);
      
      // 새 탭에서 열기
      window.open(receiptUrl, '_blank');
      toast.success('영수증이 다운로드되었습니다');
    } catch (error) {
      console.error('Failed to download receipt:', error);
      toast.error('영수증 다운로드에 실패했습니다', {
        description: '잠시 후 다시 시도해주세요',
      });
    } finally {
      setDownloadingReceipt(false);
    }
  }

  // 현금영수증 신청
  async function handleRequestCashReceipt() {
    if (!orderId || !cashReceiptNumber.trim()) return;

    setIssuingCashReceipt(true);
    try {
      const result = await requestCashReceipt(orderId, cashReceiptNumber);
      
      if (result.success) {
        toast.success('현금영수증이 발급되었습니다', {
          description: `발급번호: ${result.receiptNo}`,
        });
        setCashReceiptDialog(false);
        setCashReceiptNumber('');
      } else {
        toast.error('현금영수증 발급에 실패했습니다');
      }
    } catch (error) {
      console.error('Failed to request cash receipt:', error);
      toast.error('현금영수증 발급에 실패했습니다', {
        description: '잠시 후 다시 시도해주세요',
      });
    } finally {
      setIssuingCashReceipt(false);
    }
  }
}

interface TimelineItemProps {
  label: string;
  timestamp: any;
  completed: boolean;
  active: boolean;
  isLast?: boolean;
}

function TimelineItem({ label, timestamp, completed, active, isLast }: TimelineItemProps) {
  let time = '';
  
  if (timestamp) {
    try {
      // ISO string 또는 Firestore Timestamp 처리
      const date = typeof timestamp === 'string' 
        ? new Date(timestamp)
        : timestamp.toDate?.() 
        ? new Date(timestamp.toDate()) 
        : null;
      
      if (date) {
        time = date.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    } catch (e) {
      // 타임스탬프 파싱 실패 시 무시
    }
  }

  return (
    <div className="flex items-start gap-3">
      {/* 아이콘 */}
      <div className="relative">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed
              ? 'bg-green-500'
              : active
              ? 'bg-[#D61C1C]'
              : 'bg-gray-200'
          }`}
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-white" />
          ) : active ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Clock className="w-5 h-5 text-gray-400" />
          )}
        </div>
        {!isLast && (
          <div
            className={`absolute left-1/2 top-8 w-0.5 h-8 -translate-x-1/2 ${
              completed ? 'bg-green-500' : 'bg-gray-200'
            }`}
          />
        )}
      </div>

      {/* 텍스트 */}
      <div className="flex-1 pt-1">
        <p className={`${completed || active ? 'text-[#2E1C10]' : 'text-[#2E1C10]/60'}`}>
          {label}
        </p>
        {time && (
          <p className="text-sm text-[#2E1C10]/60">{time}</p>
        )}
      </div>
    </div>
  );
}
```

## 49. src/pages/app/Points.tsx

```typescript
/**
 * 고객용 포인트 페이지
 * Phase 3-3: Points System
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Skeleton } from '../../components/ui/skeleton';
import { getPointsHistory, POINTS_POLICY } from '../../lib/points.api';
import { FEATURE_FLAGS } from '../../config/env';
import type { PointsHistory, PointsLedger } from '../../types/points';

export default function Points() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<PointsHistory | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);
      const data = await getPointsHistory(uid);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load points history:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!FEATURE_FLAGS.points) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            포인트 기능이 비활성화되어 있습니다.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1">내 포인트</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* 포인트 잔액 카드 */}
        <Card className="bg-gradient-to-br from-[#D61C1C] to-[#F37021] text-white">
          <CardHeader>
            <CardDescription className="text-white/80">보유 포인트</CardDescription>
            <CardTitle className="text-4xl">
              {loading ? (
                <Skeleton className="h-12 w-40 bg-white/20" />
              ) : (
                <>{history?.balance.toLocaleString()}P</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Gift className="w-4 h-4" />
              <span>
                {POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 만료 예정 포인트 */}
        {!loading && history && history.expiringPoints.length > 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <div className="space-y-1">
                {history.expiringPoints.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {new Date(item.expiresAt).toLocaleDateString()} 만료 예정
                    </span>
                    <span className="font-medium">
                      {item.amount.toLocaleString()}P
                    </span>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* 포인트 적립 정책 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">포인트 적립 혜택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">주문 시 적립</span>
              <span className="font-medium text-[#D61C1C]">
                {(POINTS_POLICY.earnRate * 100).toFixed(1)}%
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">사진 리뷰 작성</span>
              <span className="font-medium text-[#D61C1C]">
                +{POINTS_POLICY.reviewPhotoBonus.toLocaleString()}P
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">일반 리뷰 작성</span>
              <span className="font-medium text-[#D61C1C]">
                +{POINTS_POLICY.reviewTextBonus.toLocaleString()}P
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">포인트 유효기간</span>
              <span className="font-medium text-gray-700">
                {POINTS_POLICY.expireDays}일
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 포인트 내역 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">포인트 내역</CardTitle>
            <CardDescription>
              최근 포인트 적립 및 사용 내역
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : history && history.ledger.length > 0 ? (
              <div className="space-y-3">
                {history.ledger.map((entry) => (
                  <PointsHistoryItem key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>아직 포인트 내역이 없습니다</p>
                <p className="text-sm mt-2">
                  주문하고 포인트를 적립해보세요!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * 포인트 내역 아이템
 */
function PointsHistoryItem({ entry }: { entry: PointsLedger }) {
  const isPositive = entry.amount > 0;
  const isExpired = entry.type === 'expire';

  const getIcon = () => {
    if (isExpired) return <Clock className="w-5 h-5 text-gray-400" />;
    if (isPositive) return <TrendingUp className="w-5 h-5 text-green-600" />;
    return <TrendingDown className="w-5 h-5 text-red-600" />;
  };

  const getLabel = () => {
    switch (entry.type) {
      case 'earn':
        return entry.ref?.kind === 'order' ? '주문 적립' :
               entry.ref?.kind === 'review' ? '리뷰 적립' : '적립';
      case 'spend':
        return '포인트 사용';
      case 'expire':
        return '포인트 만료';
      case 'adjust':
        return '관리자 조정';
      default:
        return entry.type;
    }
  };

  const getColor = () => {
    if (isExpired) return 'text-gray-600';
    if (isPositive) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0">{getIcon()}</div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium">{getLabel()}</p>
          {entry.type === 'earn' && entry.expiresAt && (
            <Badge variant="outline" className="text-xs">
              {new Date(entry.expiresAt).toLocaleDateString()} 만료
            </Badge>
          )}
        </div>
        
        {entry.note && (
          <p className="text-sm text-gray-600 truncate">{entry.note}</p>
        )}
        
        <p className="text-xs text-gray-500">
          {new Date(entry.at).toLocaleString()}
        </p>
      </div>
      
      <div className={`font-medium ${getColor()}`}>
        {isPositive ? '+' : ''}
        {entry.amount.toLocaleString()}P
      </div>
    </div>
  );
}
```

## 50. src/pages/app/ReviewList.tsx

```typescript
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, Image as ImageIcon, Loader2, Filter } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import type { Review, ReviewSortOption, ReviewStats } from '../../types/review';

// Firebase 사용 여부
const USE_FIREBASE = false;

// Mock 데이터
const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-001',
    storeId: 'store-hyunpung',
    orderId: 'order-001',
    uid: 'user-001',
    userName: '김고객',
    rating: 5,
    text: '칼국수 진짜 맛있어요! 국물이 진하고 면발도 쫄깃해요. 닭고기도 부드럽고 양도 푸짐합니다. 다음에 또 주문할게요!',
    photos: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2일 전
    rewardIssued: true,
    reply: {
      text: '감사합니다! 늘 맛있게 준비하겠습니다 😊',
      by: 'owner-001',
      at: Date.now() - 1000 * 60 * 60 * 24,
    },
  },
  {
    id: 'review-002',
    storeId: 'store-hyunpung',
    orderId: 'order-002',
    uid: 'user-002',
    userName: '이손님',
    rating: 4,
    text: '맛있게 잘 먹었습니다. 배달도 빨랐어요!',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5일 전
    rewardIssued: false,
  },
  {
    id: 'review-003',
    storeId: 'store-hyunpung',
    orderId: 'order-003',
    uid: 'user-003',
    userName: '박미식',
    rating: 5,
    text: '현풍닭칼국수 정말 최고예요! 가격 대비 양도 많고 맛도 훌륭합니다. 사진으로는 다 담지 못할 정도로 푸짐해요. 강추!',
    photos: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7일 전
    rewardIssued: true,
  },
];

export default function ReviewList() {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('storeId') || 'store-hyunpung';

  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [photoOnly, setPhotoOnly] = useState(false);
  const [sortBy, setSortBy] = useState<ReviewSortOption>('latest');

  useEffect(() => {
    loadReviews();
  }, [storeId, photoOnly, sortBy]);

  async function loadReviews() {
    setLoading(true);
    try {
      if (USE_FIREBASE) {
        // TODO: Firestore에서 리뷰 조회
      } else {
        // Mock 데이터
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filtered = [...MOCK_REVIEWS];

        // 사진 필터
        if (photoOnly) {
          filtered = filtered.filter((r) => r.hasPhoto);
        }

        // 정렬
        if (sortBy === 'rating_high') {
          filtered.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'rating_low') {
          filtered.sort((a, b) => a.rating - b.rating);
        } else {
          filtered.sort((a, b) => b.createdAt - a.createdAt);
        }

        setReviews(filtered);

        // 통계 계산
        const totalCount = MOCK_REVIEWS.length;
        const photoCount = MOCK_REVIEWS.filter((r) => r.hasPhoto).length;
        const totalRating = MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalCount > 0 ? totalRating / totalCount : 0;

        const ratingDistribution = MOCK_REVIEWS.reduce(
          (dist, r) => {
            dist[r.rating as keyof typeof dist]++;
            return dist;
          },
          { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        );

        setStats({
          totalCount,
          averageRating,
          photoCount,
          ratingDistribution,
        });
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return date.toLocaleDateString();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-[#333] mb-2">리뷰</h1>
        {stats && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#F37021] text-[#F37021]" />
              <span className="text-[#333]">{stats.averageRating.toFixed(1)}</span>
            </div>
            <span className="text-[#8B7355]">
              리뷰 {stats.totalCount}개 · 사진 {stats.photoCount}개
            </span>
          </div>
        )}
      </div>

      {/* 별점 분포 */}
      {stats && (
        <Card className="p-4 mb-6">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
              const percentage = stats.totalCount > 0 ? (count / stats.totalCount) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <Star className="w-4 h-4 fill-[#F37021] text-[#F37021]" />
                    <span className="text-[#333]">{rating}</span>
                  </div>
                  <div className="flex-1 h-2 bg-[#E5DDD5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F37021] transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[#8B7355] w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* 필터 & 정렬 */}
      <div className="flex items-center gap-3 mb-6">
        <Tabs value={photoOnly ? 'photo' : 'all'} onValueChange={(v) => setPhotoOnly(v === 'photo')}>
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="photo">사진리뷰</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as ReviewSortOption)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="rating_high">별점 높은순</SelectItem>
            <SelectItem value="rating_low">별점 낮은순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 리뷰 목록 */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#D61C1C]" />
        </div>
      ) : reviews.length === 0 ? (
        <Card className="p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-[#C7A45A]" />
          <p className="text-[#333] mb-2">
            {photoOnly ? '사진 리뷰가 아직 없어요' : '리뷰가 아직 없어요'}
          </p>
          <p className="text-[#8B7355]">
            첫 번째 리뷰를 남겨주세요!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-4">
              {/* 리뷰 헤더 */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#333]">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-[#F37021] text-[#F37021]'
                              : 'text-[#E5DDD5]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#8B7355]">{formatDate(review.createdAt)}</p>
                </div>
              </div>

              {/* 리뷰 사진 */}
              {review.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {review.photos.slice(0, 3).map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={photo}
                        alt={`리뷰 사진 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 리뷰 텍스트 */}
              <p className="text-[#333] mb-3 whitespace-pre-wrap">{review.text}</p>

              {/* 사장님 답글 */}
              {review.reply && (
                <div className="bg-[#F9F6F3] rounded-lg p-3 border-l-4 border-[#C7A45A]">
                  <p className="text-[#8B7355] mb-1">사장님</p>
                  <p className="text-[#333] whitespace-pre-wrap">{review.reply.text}</p>
                  <p className="text-[#8B7355] mt-2">{formatDate(review.reply.at)}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 51. src/pages/app/ReviewWrite.tsx

```typescript
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Upload, X, Image as ImageIcon, Loader2, Gift } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner@2.0.3';
import {
  processImages,
  validateImageFiles,
  createImagePreviewUrl,
  revokeImagePreviewUrl,
} from '../../lib/imageUtils';
import { earnPoints } from '../../lib/points.api';
import { issueCoupon } from '../../lib/coupons.api';
import { FEATURE_FLAGS } from '../../config/env';
import type { Order } from '../../types/order';
import type { ReviewFormData } from '../../types/review';

// Firebase 사용 여부 (개발 시 false)
const USE_FIREBASE = false;

// 포인트 정책
const POINTS_POLICY = {
  reviewPhotoBonus: 200, // 사진 리뷰 추가 포인트
  reviewTextBonus: 100,  // 일반 리뷰 포인트
};

export default function ReviewWrite() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    text: '',
    photos: [],
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState(0);

  const MAX_TEXT_LENGTH = 200;
  const MAX_PHOTOS = 5;

  // 주문 정보 로드
  useEffect(() => {
    loadOrder();
  }, [orderId]);

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => revokeImagePreviewUrl(url));
    };
  }, [previewUrls]);

  async function loadOrder() {
    try {
      if (USE_FIREBASE) {
        // TODO: Firebase에서 주문 조회
      } else {
        // Mock 데이터
        const mockOrder: Order = {
          id: orderId!,
          userId: 'user-001',
          storeId: 'store-hyunpung',
          orderNumber: 'HP2024102800001',
          items: [
            {
              menuId: 'menu-001',
              name: '현풍닭칼국수',
              basePrice: 10000,
              quantity: 1,
              options: [],
              totalPrice: 10000,
            },
          ],
          subtotal: 10000,
          deliveryFee: 3000,
          finalAmount: 13000,
          status: 'done',
          orderType: 'delivery',
          deliveryInfo: {
            address: '대구 달성군 현풍읍',
            phone: '010-1234-5678',
            request: '',
          },
          payment: {
            method: 'card',
            status: 'authorized',
          },
          createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2시간 전
        };

        setOrder(mockOrder);
      }
    } catch (error) {
      console.error('Failed to load order:', error);
      toast.error('주문 정보를 불러올 수 없습니다.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  function handleRatingClick(rating: number) {
    setFormData((prev) => ({ ...prev, rating }));
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    if (text.length <= MAX_TEXT_LENGTH) {
      setFormData((prev) => ({ ...prev, text }));
    }
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    if (formData.photos.length + files.length > MAX_PHOTOS) {
      toast.error(`사진은 최대 ${MAX_PHOTOS}장까지 업로드할 수 있습니다.`);
      return;
    }

    const validation = validateImageFiles(files);
    if (!validation.valid) {
      toast.error(validation.error!);
      return;
    }

    // 미리보기 URL 생성
    const newPreviewUrls = files.map((file) => createImagePreviewUrl(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  }

  function handlePhotoRemove(index: number) {
    // 미리보기 URL 해제
    revokeImagePreviewUrl(previewUrls[index]);

    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit() {
    // 유효성 검사
    if (formData.rating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }

    if (formData.text.trim().length === 0) {
      toast.error('리뷰 내용을 작성해주세요.');
      return;
    }

    if (formData.text.trim().length < 10) {
      toast.error('리뷰는 최소 10자 이상 작성해주세요.');
      return;
    }

    setSubmitting(true);
    setUploadProgress(0);

    try {
      let photoUrls: string[] = [];

      // 사진 업로드
      if (formData.photos.length > 0) {
        if (USE_FIREBASE) {
          // Firebase Storage 업로드
          const processedImages = await processImages(formData.photos);
          // TODO: Firebase Storage 업로드 및 URL 가져오기
          setUploadProgress(50);
          // photoUrls = await uploadImagesToStorage(processedImages);
          setUploadProgress(100);
        } else {
          // Mock: 미리보기 URL 사용
          photoUrls = previewUrls;
        }
      }

      const reviewData = {
        storeId: order!.storeId,
        orderId: orderId!,
        uid: 'user-001', // TODO: 실제 UID
        userName: '김고객',
        rating: formData.rating,
        text: formData.text.trim(),
        photos: photoUrls,
        hasPhoto: photoUrls.length > 0,
        createdAt: Date.now(),
        rewardIssued: false,
      };

      if (USE_FIREBASE) {
        // TODO: Firestore에 리뷰 저장
      } else {
        // Mock: localStorage에 저장
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push({ ...reviewData, id: `review-${Date.now()}` });
        localStorage.setItem('reviews', JSON.stringify(reviews));
      }

      // 포인트 적립 (포인트 기능이 활성화된 경우)
      if (FEATURE_FLAGS.points) {
        try {
          const pointsAmount = photoUrls.length > 0 
            ? POINTS_POLICY.reviewPhotoBonus 
            : POINTS_POLICY.reviewTextBonus;

          await earnPoints({
            uid,
            amount: pointsAmount,
            ref: {
              kind: 'review',
              id: `review-${Date.now()}`,
            },
            note: `${photoUrls.length > 0 ? '사진 ' : ''}리뷰 작성 포인트`,
          });

          toast.success(
            `리뷰가 등록되었어요! 🎁 ${pointsAmount}P가 적립되었습니다.`,
            { icon: <Gift className="w-4 h-4" /> }
          );
        } catch (error) {
          console.error('Failed to earn review points:', error);
          toast.success('리뷰가 등록되었어요!');
        }
      } else {
        toast.success('리뷰가 등록되었어요!');
      }

      // 사진 리뷰 쿠폰 발급
      if (photoUrls.length > 0) {
        try {
          // 사진 리뷰 쿠폰 자동 발급
          await issueCoupon(
            {
              type: 'photo_review',
              amount: 3000,
              minSpend: 10000,
              expiryDays: 30,
              title: '사진 리뷰 작성 감사 쿠폰',
              description: '10,000원 이상 주문 시 사용 가능',
              targetUsers: [uid],
              issueLimit: 1,
            },
            'system',
            '시스템'
          );
          
          setTimeout(() => {
            toast.success('3,000원 할인 쿠폰이 발급되었어요! 다음 주문에 사용해 보세요.');
          }, 1000);
        } catch (error) {
          console.error('Failed to issue photo review coupon:', error);
        }
      }

      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error('Failed to submit review:', error);
      toast.error('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D61C1C]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-[#8B7355]">주문을 찾을 수 없습니다.</p>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </div>
    );
  }

  const displayRating = hoverRating || formData.rating;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-[#333] mb-2">리뷰 작성</h1>
        <p className="text-[#8B7355]">
          주문하신 메뉴는 어떠셨나요?
        </p>
      </div>

      {/* 주문 정보 */}
      <Card className="p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-[#F9F6F3] rounded-lg flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-[#C7A45A]" />
          </div>
          <div className="flex-1">
            <p className="text-[#333] mb-1">
              {order.items.map((item) => item.name).join(', ')}
            </p>
            <p className="text-[#8B7355]">
              주문번호: {order.orderNumber}
            </p>
          </div>
        </div>
      </Card>

      {/* 별점 */}
      <div className="mb-6">
        <label className="block text-[#333] mb-3">
          별점을 선택해주세요 <span className="text-[#D61C1C]">*</span>
        </label>
        <div className="flex items-center gap-2 justify-center py-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingClick(rating)}
              onMouseEnter={() => setHoverRating(rating)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={`w-12 h-12 ${
                  rating <= displayRating
                    ? 'fill-[#F37021] text-[#F37021]'
                    : 'text-[#E5DDD5]'
                }`}
              />
            </button>
          ))}
        </div>
        {formData.rating > 0 && (
          <p className="text-center text-[#8B7355] mt-2">
            {formData.rating === 5 && '최고예요! ⭐'}
            {formData.rating === 4 && '맛있어요! 😊'}
            {formData.rating === 3 && '괜찮아요'}
            {formData.rating === 2 && '별로예요'}
            {formData.rating === 1 && '아쉬워요'}
          </p>
        )}
      </div>

      {/* 텍스트 리뷰 */}
      <div className="mb-6">
        <label className="block text-[#333] mb-3">
          리뷰 내용 <span className="text-[#D61C1C]">*</span>
        </label>
        <Textarea
          value={formData.text}
          onChange={handleTextChange}
          placeholder="메뉴의 맛, 양, 배달 속도 등 솔직한 리뷰를 남겨주세요. (최소 10자)"
          rows={5}
          className="resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-[#8B7355]">
            사진과 함께 작성하시면 <span className="text-[#D61C1C]">3,000원 쿠폰</span>을 드려요!
          </p>
          <p className="text-[#8B7355]">
            {formData.text.length}/{MAX_TEXT_LENGTH}
          </p>
        </div>
      </div>

      {/* 사진 업로드 */}
      <div className="mb-6">
        <label className="block text-[#333] mb-3">
          사진 ({formData.photos.length}/{MAX_PHOTOS})
        </label>

        <div className="grid grid-cols-3 gap-3">
          {/* 미리보기 */}
          {previewUrls.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <img src={url} alt={`리뷰 사진 ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handlePhotoRemove(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* 업로드 버튼 */}
          {formData.photos.length < MAX_PHOTOS && (
            <label className="aspect-square rounded-lg border-2 border-dashed border-[#E5DDD5] flex flex-col items-center justify-center cursor-pointer hover:border-[#D61C1C] hover:bg-[#FFF5F5] transition-colors">
              <Upload className="w-8 h-8 text-[#8B7355] mb-2" />
              <span className="text-[#8B7355]">사진 추가</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </label>
          )}
        </div>

        {formData.photos.length > 0 && (
          <p className="text-[#8B7355] mt-2">
            💡 사진은 최대 3MB, {MAX_PHOTOS}장까지 업로드 가능합니다.
          </p>
        )}
      </div>

      {/* 업로드 진행률 */}
      {uploadProgress > 0 && (
        <div className="mb-6">
          <div className="h-2 bg-[#E5DDD5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D61C1C] transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-center text-[#8B7355] mt-2">
            업로드 중... {uploadProgress}%
          </p>
        </div>
      )}

      {/* 제출 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5DDD5]">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/order/${orderId}`)}
            disabled={submitting}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || formData.rating === 0 || formData.text.trim().length < 10}
            className="flex-1 bg-[#D61C1C] hover:bg-[#B91818]"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                등록 중...
              </>
            ) : (
              '리뷰 등록'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## 52. src/pages/app/Support.tsx

```typescript
/**
 * 고객 지원 1:1 채팅 페이지
 * Phase 3-2: Support Chat
 */

import { useEffect, useState, useRef } from 'react';
import { Send, Image as ImageIcon, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { FEATURE_FLAGS } from '../../config/env';
import type { ChatSession, ChatMessage, MessageSender } from '../../types/support';
import { toast } from 'sonner@2.0.3';

const USE_FIREBASE = false;

// 운영 시간 체크
function isBusinessHours(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  
  // 월-토: 09:00-21:00
  if (day >= 1 && day <= 6) {
    return hour >= 9 && hour < 21;
  }
  
  // 일요일: 10:00-20:00
  if (day === 0) {
    return hour >= 10 && hour < 20;
  }
  
  return false;
}

function getAutoReplyMessage(): string {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour < 9) {
    return '안녕하세요! 현풍닭칼국수입니다. 현재 영업시간 외입니다. 평일·토요일 09:00-21:00, 일요일 10:00-20:00에 문의해 주시면 빠르게 답변드리겠습니다. 🙏';
  } else if (hour >= 21) {
    return '안녕하세요! 현풍닭칼국수입니다. 오늘 영업이 종료되었습니다. 내일 오전 9시 이후 문의해 주시면 빠르게 답변드리겠습니다. 😊';
  } else {
    return '안녕하세요! 현풍닭칼국수입니다. 현재 영업시간 외입니다. 영업시간 내에 문의해 주시면 빠르게 답변드리겠습니다.';
  }
}

export default function Support() {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 지원 기능 비활성화 체크
  if (!FEATURE_FLAGS.support) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <AlertCircle className="w-16 h-16 text-[#2E1C10]/40 mb-4" />
        <h2 className="text-xl text-[#2E1C10] mb-2">
          고객 지원 준비 중
        </h2>
        <p className="text-[#2E1C10]/60 text-center">
          현재 고객 지원 기능을 준비 중입니다.<br />
          문의사항은 전화로 연락 부탁드립니다.
        </p>
        <Button
          className="mt-6"
          onClick={() => (window.location.href = 'tel:010-2068-4732')}
        >
          📞 전화 문의하기
        </Button>
      </div>
    );
  }

  useEffect(() => {
    loadChatSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 자동 스크롤
  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // 채팅 세션 로드 (없으면 생성)
  async function loadChatSession() {
    try {
      setLoading(true);

      if (USE_FIREBASE) {
        // TODO: Firebase 연동
      } else {
        // Mock: localStorage에서 세션 로드
        const userId = localStorage.getItem('mockUserId') || 'guest_' + Date.now();
        localStorage.setItem('mockUserId', userId);

        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessions: Record<string, ChatSession> = JSON.parse(sessionsData);

        // 기존 세션 찾기 또는 생성
        let userSession = Object.values(sessions).find((s) => s.userId === userId);

        if (!userSession) {
          // 새 세션 생성
          userSession = {
            id: `session_${Date.now()}`,
            userId,
            open: true,
            lastAt: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          sessions[userSession.id] = userSession;
          localStorage.setItem('chat_sessions', JSON.stringify(sessions));

          // 환영 메시지 + 운영시간 체크
          const welcomeMessages: ChatMessage[] = [
            {
              id: `msg_${Date.now()}_1`,
              sessionId: userSession.id,
              from: 'bot',
              type: 'text',
              text: '안녕하세요! 현풍닭칼국수입니다. 무엇을 도와드릴까요? 😊',
              at: Date.now(),
              readByUser: true,
            },
          ];

          if (!isBusinessHours()) {
            welcomeMessages.push({
              id: `msg_${Date.now()}_2`,
              sessionId: userSession.id,
              from: 'bot',
              type: 'text',
              text: getAutoReplyMessage(),
              at: Date.now() + 100,
              readByUser: true,
            });
          }

          const messagesData = localStorage.getItem(`chat_messages_${userSession.id}`) || '[]';
          const existingMessages: ChatMessage[] = JSON.parse(messagesData);
          const allMessages = [...welcomeMessages, ...existingMessages];
          localStorage.setItem(`chat_messages_${userSession.id}`, JSON.stringify(allMessages));
          
          setMessages(allMessages);
        } else {
          // 기존 메시지 로드
          const messagesData = localStorage.getItem(`chat_messages_${userSession.id}`) || '[]';
          setMessages(JSON.parse(messagesData));
        }

        setSession(userSession);
      }
    } catch (error) {
      console.error('Failed to load chat session:', error);
      toast.error('채팅을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  // 메시지 전송
  async function sendMessage() {
    if (!session || !inputText.trim() || sending) return;

    const text = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        sessionId: session.id,
        from: 'user',
        type: 'text',
        text,
        at: Date.now(),
        readByAdmin: false,
      };

      if (USE_FIREBASE) {
        // TODO: Firebase에 메시지 추가
      } else {
        // Mock: localStorage에 메시지 추가
        const messagesData = localStorage.getItem(`chat_messages_${session.id}`) || '[]';
        const allMessages: ChatMessage[] = JSON.parse(messagesData);
        allMessages.push(newMessage);
        localStorage.setItem(`chat_messages_${session.id}`, JSON.stringify(allMessages));
        
        setMessages(allMessages);

        // 세션 업데이트
        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessions: Record<string, ChatSession> = JSON.parse(sessionsData);
        sessions[session.id] = {
          ...session,
          lastMessage: text,
          lastAt: Date.now(),
          updatedAt: Date.now(),
        };
        localStorage.setItem('chat_sessions', JSON.stringify(sessions));
      }

      toast.success('메시지가 전송되었습니다');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('메시지 전송에 실패했습니다');
      setInputText(text); // 복원
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#D61C1C]/10 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-[#2E1C10]/60">채팅 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-[#D61C1C] text-white">
              🍜
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-[#2E1C10]">현풍닭칼국수 고객센터</h2>
            <p className="text-sm text-[#2E1C10]/60">
              {isBusinessHours() ? (
                <span className="text-green-600">● 응답 가능</span>
              ) : (
                <span className="text-gray-400">○ 영업시간 외</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 운영시간 알림 */}
      {!isBusinessHours() && (
        <Alert className="m-4 mb-0">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            현재 영업시간이 아닙니다. 영업시간 내에 답변 드리겠습니다.
            <br />
            <span className="text-sm">평일·토 09:00-21:00 | 일요일 10:00-20:00</span>
          </AlertDescription>
        </Alert>
      )}

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="메시지를 입력하세요..."
            disabled={sending}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputText.trim() || sending}
            size="icon"
            className="bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-[#2E1C10]/40 mt-2 text-center">
          전화 문의: 010-2068-4732
        </p>
      </div>
    </div>
  );
}

/**
 * 메시지 말풍선 컴포넌트
 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.from === 'user';
  const isBot = message.from === 'bot';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* 보낸 사람 */}
        {!isUser && (
          <p className="text-xs text-[#2E1C10]/60 mb-1 px-1">
            {isBot ? '🤖 자동 응답' : '👤 관리자'}
          </p>
        )}

        {/* 메시지 */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-[#D61C1C] text-white'
              : isBot
              ? 'bg-blue-50 text-[#2E1C10]'
              : 'bg-white text-[#2E1C10] border border-gray-200'
          }`}
        >
          {message.type === 'text' && (
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.text}
            </p>
          )}
          {message.type === 'image' && message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="첨부 이미지"
              className="rounded-lg max-w-full"
            />
          )}
        </div>

        {/* 시간 */}
        <p className={`text-xs text-[#2E1C10]/40 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.at).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
```

## 53. src/pages/app/My.tsx

마이페이지 - 고객 정보 및 주요 기능 접근 허브

```typescript
/**
 * 마이페이지
 * 고객 정보 및 주요 기능 접근 허브
 */

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { User, ShoppingBag, Ticket, Gift, Bell, MessageSquare } from "lucide-react";

export default function My() {
  // Mock 사용자 정보 (실제로는 Auth에서 가져옴)
  const userName = "김고객";
  const userPhone = "010-1234-5678";
  const recentOrdersCount = 12;

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* 사용자 정보 카드 */}
      <Card className="rounded-2xl border-[#E5DDD5] bg-gradient-to-br from-white to-[#F9F6F3]">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#D61C1C] flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-[#2E1C10] mb-1">{userName}님</CardTitle>
            <p className="text-sm text-[#8B7355]">{userPhone}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center">
            <Badge variant="secondary" className="bg-[#D61C1C]/10 text-[#D61C1C] border-[#D61C1C]/20">
              고객
            </Badge>
            <Badge variant="outline" className="border-[#C7A45A]/30 text-[#8B7355]">
              PWA 설치됨
            </Badge>
            <span className="text-sm text-[#8B7355] ml-auto">
              누적 주문 <span className="text-[#D61C1C] font-semibold">{recentOrdersCount}회</span>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 빠른 메뉴 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 주문내역 */}
        <Link to="/reviews" className="block">
          <Card className="rounded-2xl hover:shadow-md transition-all hover:scale-[1.02] border-[#E5DDD5] h-full">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-[#D61C1C]/10 flex items-center justify-center mb-2">
                <ShoppingBag className="w-6 h-6 text-[#D61C1C]" />
              </div>
              <CardTitle className="text-[#2E1C10]">주문내역</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-[#8B7355]">
                최근 주문 확인
                <br />
                리뷰 작성하기
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* 쿠폰함 */}
        <Link to="/coupons" className="block">
          <Card className="rounded-2xl hover:shadow-md transition-all hover:scale-[1.02] border-[#E5DDD5] h-full">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-[#F37021]/10 flex items-center justify-center mb-2">
                <Ticket className="w-6 h-6 text-[#F37021]" />
              </div>
              <CardTitle className="text-[#2E1C10]">쿠폰함</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-[#8B7355]">
                할인 쿠폰 확인
                <br />
                주문 시 적용
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* 포인트 */}
        <Link to="/points" className="block">
          <Card className="rounded-2xl hover:shadow-md transition-all hover:scale-[1.02] border-[#E5DDD5] h-full">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-[#C7A45A]/10 flex items-center justify-center mb-2">
                <Gift className="w-6 h-6 text-[#C7A45A]" />
              </div>
              <CardTitle className="text-[#2E1C10]">포인트</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-[#8B7355]">
                적립·사용 내역
                <br />
                포인트 정책
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* 알림 설정 */}
        <Link to="/notification-settings" className="block">
          <Card className="rounded-2xl hover:shadow-md transition-all hover:scale-[1.02] border-[#E5DDD5] h-full">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-[#2E1C10]">알림 설정</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-[#8B7355]">
                푸시 알림 관리
                <br />
                마케팅 수신 동의
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* 1:1 문의 */}
        <Link to="/support" className="block col-span-2">
          <Card className="rounded-2xl hover:shadow-md transition-all hover:scale-[1.02] border-[#E5DDD5]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-[#2E1C10]">1:1 문의</CardTitle>
                  <p className="text-sm text-[#8B7355] mt-1">
                    고객센터 채팅 · FAQ · 운영시간 안내
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* 추가 정보 */}
      <Card className="rounded-2xl border-[#E5DDD5] bg-[#F9F6F3]/50">
        <CardContent className="py-4">
          <div className="text-sm text-[#8B7355] space-y-1">
            <p>📱 <span className="font-medium text-[#2E1C10]">PWA 앱</span>으로 더 빠르게</p>
            <p>🎁 리뷰 작성 시 <span className="font-medium text-[#D61C1C]">포인트 적립</span></p>
            <p>🔔 주문 상태를 <span className="font-medium text-[#2E1C10]">실시간 알림</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

