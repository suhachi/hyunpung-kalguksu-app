import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { FEATURE_FLAGS } from '../../config/env';

interface AppHeaderProps {
  showBack?: boolean;
  title?: string;
}

export function AppHeader({ showBack = false, title }: AppHeaderProps) {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#2E1C10]/10">
      <div className="flex items-center justify-between h-14 px-4">
        {/* 왼쪽: 뒤로가기 또는 로고 */}
        <div className="flex items-center">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-[#2E1C10]/5"
              aria-label="뒤로가기"
            >
              <ArrowLeft className="w-6 h-6 text-[#2E1C10]" />
            </button>
          ) : (
            <Link to="/app" className="flex items-center gap-2">
              <ChickenLogo />
              <span className="text-[#2E1C10]">
                현풍닭칼국수
              </span>
            </Link>
          )}
          {title && (
            <h1 className="ml-2 text-[#2E1C10]">
              {title}
            </h1>
          )}
        </div>
        
        {/* 오른쪽: 고객지원, 알림, 장바구니 */}
        <div className="flex items-center gap-1">
          {FEATURE_FLAGS.support && (
            <Link
              to="/support"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#2E1C10]/5"
              aria-label="고객 지원"
            >
              <MessageCircle className="w-6 h-6 text-[#2E1C10]" />
            </Link>
          )}
          
          <Link
            to="/notifications"
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#2E1C10]/5"
            aria-label="알림"
          >
            <Bell className="w-6 h-6 text-[#2E1C10]" />
          </Link>
          
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#2E1C10]/5"
            aria-label="장바구니"
          >
            <ShoppingCart className="w-6 h-6 text-[#2E1C10]" />
            {/* 장바구니 아이템 수 뱃지 */}
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#D61C1C] rounded-full">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

// 간단한 닭 로고 (SVG)
function ChickenLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#D61C1C" fillOpacity="0.12" />
      <path
        d="M16 8C13 8 11 10 11 13C11 15 12 16.5 13.5 17.5L13 22H19L18.5 17.5C20 16.5 21 15 21 13C21 10 19 8 16 8Z"
        stroke="#D61C1C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
      <circle cx="14.5" cy="12.5" r="1" fill="#D61C1C" />
      <path
        d="M16 14C15.5 14 15 14.5 15 15"
        stroke="#D61C1C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
