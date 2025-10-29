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
