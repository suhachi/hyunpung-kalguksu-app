import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Star, User } from 'lucide-react';

export function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: '홈' },
    { to: '/menu', icon: UtensilsCrossed, label: '메뉴' },
    { to: '/reviews', icon: Star, label: '리뷰' },
    { to: '/my', icon: User, label: '마이' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#2E1C10]/10">
      <div className="grid grid-cols-4 h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'text-[#D61C1C]'
                  : 'text-[#2E1C10]/60 hover:text-[#2E1C10]'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
