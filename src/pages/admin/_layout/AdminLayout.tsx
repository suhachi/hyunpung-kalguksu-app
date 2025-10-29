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
  TrendingUp,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Credits } from '../../../components/shared/Credits';
import { requireAdmin, mockLogout, type AuthUser } from '../../../lib/auth';
import { toast } from 'sonner';

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
    { to: '/admin/integrated-analytics', icon: TrendingUp, label: '통합 리포트' },
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
