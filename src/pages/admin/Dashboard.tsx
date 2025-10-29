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
