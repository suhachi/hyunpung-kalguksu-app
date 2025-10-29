import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { Credits } from '../shared/Credits';

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6F3]">
      {/* 헤더 */}
      <AppHeader />
      
      {/* 메인 콘텐츠 */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      {/* 개발사 정보 푸터 */}
      <Credits variant="footer" />
      
      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
}
