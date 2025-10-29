/**
 * 마이페이지
 * 고객 정보 및 주요 기능 접근 허브
 * 로그인 시스템 통합
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { User, ShoppingBag, Ticket, Gift, Bell, MessageSquare, LogOut, LogIn } from "lucide-react";
import { useCurrentUser, logout, firebaseLogin } from "../../lib/auth";
import { toast } from "sonner";
import { AUTH } from "../../routes";

export default function My() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Mock 데이터 (실제로는 Firestore에서 가져옴)
  const recentOrdersCount = 12;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebaseLogin(email, password);
      toast.success("로그인 성공");
      setIsLoginMode(false);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error(error?.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("로그아웃되었습니다");
      navigate("/");
    } catch (error) {
      toast.error("로그아웃 실패");
    }
  };

  const handleGoToLoginPage = () => {
    navigate(AUTH.login);
  };

  // 로그인되지 않은 경우 로그인 UI 표시
  if (!currentUser) {
    return (
      <div className="p-4 space-y-6 pb-24">
        {/* 로그인 안내 카드 */}
        <Card className="rounded-2xl border-[#E5DDD5] bg-gradient-to-br from-white to-[#F9F6F3]">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-[#D61C1C]/10 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-[#D61C1C]" />
            </div>
            <CardTitle className="text-[#2E1C10] mb-2">로그인이 필요합니다</CardTitle>
            <p className="text-sm text-[#8B7355]">
              로그인하여 주문 내역, 쿠폰, 포인트를 확인하세요
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoginMode ? (
              // 인라인 로그인 폼
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsLoginMode(false)}
                    disabled={loading}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !email || !password}
                    className="flex-1 bg-[#D61C1C] hover:bg-[#D61C1C]/90"
                  >
                    {loading ? "로그인 중..." : "로그인"}
                  </Button>
                </div>
              </form>
            ) : (
              // 로그인 버튼
              <div className="space-y-3">
                <Button
                  onClick={() => setIsLoginMode(true)}
                  className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  여기서 로그인
                </Button>
                <Button
                  onClick={handleGoToLoginPage}
                  variant="outline"
                  className="w-full"
                >
                  로그인 페이지로 이동
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 로그인 후 이용 가능한 기능 안내 */}
        <Card className="rounded-2xl border-[#E5DDD5] bg-[#F9F6F3]/50">
          <CardContent className="py-4">
            <div className="text-sm text-[#8B7355] space-y-2">
              <p className="font-medium text-[#2E1C10] mb-2">로그인 후 이용 가능한 서비스</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>주문 내역</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  <span>쿠폰함</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  <span>포인트</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>알림 설정</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 로그인된 경우 기존 UI 표시
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* 사용자 정보 카드 */}
      <Card className="rounded-2xl border-[#E5DDD5] bg-gradient-to-br from-white to-[#F9F6F3]">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#D61C1C] flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-[#2E1C10] mb-1">
              {currentUser.email.split("@")[0]}님
            </CardTitle>
            <p className="text-sm text-[#8B7355]">{currentUser.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center flex-wrap">
            <Badge 
              variant="secondary" 
              className={
                currentUser.role === "admin"
                  ? "bg-[#F37021]/10 text-[#F37021] border-[#F37021]/20"
                  : "bg-[#D61C1C]/10 text-[#D61C1C] border-[#D61C1C]/20"
              }
            >
              {currentUser.role === "admin" ? "관리자" : "고객"}
            </Badge>
            <Badge variant="outline" className="border-[#C7A45A]/30 text-[#8B7355]">
              PWA 설치됨
            </Badge>
            <span className="text-sm text-[#8B7355] ml-auto">
              누적 주문 <span className="text-[#D61C1C] font-semibold">{recentOrdersCount}회</span>
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5DDD5]">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full text-[#8B7355] hover:text-[#D61C1C]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 빠른 메뉴 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 주문내역 */}
        <Link to="/orders" className="block">
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
                배달 추적하기
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
