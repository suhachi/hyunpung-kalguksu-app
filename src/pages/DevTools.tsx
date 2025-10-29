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
