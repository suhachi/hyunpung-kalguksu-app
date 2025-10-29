# PAGES 파일들

총 27개 파일

## 최신 업데이트 (2025-01-29)

### 새로 추가된 페이지
- `src/pages/auth/Login.tsx`: Firebase Auth 로그인 페이지
- `src/pages/app/My.tsx`: 로그인 시스템 통합 완료

### 주요 변경사항
- `src/pages/admin/_layout/AdminLayout.tsx`: 중복 권한 체크 제거
- `src/App.tsx`: `RequireAuth` 라우트 추가

---

## 1. src/pages/auth/Login.tsx

```typescript
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = (loc.state as any)?.from ?? "/admin";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      toast.success("로그인 성공");
      nav(redirectTo, { replace: true });
    } catch (e: any) {
      const errorMessage = e?.message ?? "로그인 실패";
      setErr(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[#F9F6F3]">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 p-8 rounded-2xl shadow-lg bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#2E1C10]">로그인</h1>
          <p className="text-sm text-gray-600">관리자 또는 고객 계정으로 로그인하세요</p>
        </div>
        
        <div className="space-y-4">
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
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          {err && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{err}</p>
          )}

          <Button
            type="submit"
            disabled={loading || !email || !pw}
            className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          >
            {loading ? "로그인 중…" : "로그인"}
          </Button>
        </div>
      </form>
    </div>
  );
}
```

**주요 기능**:
- Firebase Auth 이메일/비밀번호 로그인
- 로그인 성공 시 이전 페이지 또는 `/admin`으로 리다이렉트
- 에러 처리 및 토스트 알림

---

## 2. src/pages/app/My.tsx (최신 업데이트)

**변경일**: 2025-01-29  
**주요 변경사항**: 로그인 시스템 통합

```typescript
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
        {/* ... 로그인 후 이용 가능한 기능 안내 ... */}
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
            {/* ... 기타 정보 ... */}
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
      {/* ... 빠른 메뉴 그리드 ... */}
    </div>
  );
}
```

**주요 기능**:
- 로그인되지 않은 경우: 로그인 안내 및 인라인 로그인 폼 제공
- 로그인된 경우: 사용자 정보 및 로그아웃 버튼 표시
- `useCurrentUser()` 훅으로 로그인 상태 확인
- Firebase Auth 로그인/로그아웃 통합

---

## 3. src/pages/admin/_layout/AdminLayout.tsx (최신 업데이트)

**변경일**: 2025-01-29  
**주요 변경사항**: 중복 권한 체크 제거

```typescript
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useCurrentUser, logout } from '../../../lib/auth';

export function AdminLayout() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser(); // ✅ useCurrentUser hook 사용
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // RequireAdmin이 이미 권한을 보장하므로 여기선 로딩만 해제
    setLoading(false);
  }, [currentUser]); // currentUser 변경 시 재확인

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  // ... 나머지 코드 ...
}
```

**주요 변경사항**:
- `checkAuth()` 함수 제거 (중복 권한 체크 제거)
- `RequireAdmin` HOC가 단일 책임으로 권한 검증 담당
- 중복 토스트 알림 제거
- `useCurrentUser()` 훅으로 사용자 정보 표시

---

## 4. src/App.tsx (최신 업데이트)

**변경일**: 2025-01-29  
**주요 변경사항**: `RequireAuth` 라우트 추가

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAdmin } from "./lib/auth";
import RequireAuth from "./components/auth/RequireAuth";
import Login from "./pages/auth/Login";
import { APP, ADMIN, BRAND, DEV, AUTH } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-[#F9F6F3]">
          <Routes>
            {/* 고객용 PWA 앱 (메인) */}
            <Route path={APP.home} element={<AppLayout />}>
              {/* ... 고객 라우트 ... */}
            </Route>

            {/* 브랜드 아이덴티티 가이드라인 */}
            <Route path={BRAND.identity} element={<BrandIdentity />} />

            {/* 로그인 */}
            <Route path={AUTH.login} element={<Login />} />

            {/* 관리자 대시보드 */}
            <Route path={ADMIN.root} element={
              <RequireAuth>
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              </RequireAuth>
            }>
              {/* ... 관리자 라우트 ... */}
            </Route>

            {/* 개발자 도구 */}
            <Route path={DEV.tools} element={<DevTools />} />

            {/* 404 처리 */}
            <Route path="*" element={<Navigate to={APP.home} replace />} />
          </Routes>
        </div>
        <Toaster />
      </CartProvider>
    </BrowserRouter>
  );
}
```

**주요 변경사항**:
- `RequireAuth` 컴포넌트 import 및 사용
- `Login` 페이지 라우트 추가 (`/login`)
- `/admin` 라우트에 `RequireAuth` + `RequireAdmin` 적용
- `AUTH.login` 라우트 상수 사용

---

## 5. src/routes.ts (최신 업데이트)

**변경일**: 2025-01-29  
**주요 변경사항**: `AUTH` 라우트 추가

```typescript
export const APP = {
  home: "/",
  menu: "/menu",
  // ... 기타 APP 라우트 ...
  my: "/my",
};

export const ADMIN = {
  root: "/admin",
  // ... 기타 ADMIN 라우트 ...
};

export const BRAND = {
  identity: "/brand",
};

export const DEV = {
  tools: "/dev",
};

export const AUTH = {
  login: "/login",
};
```

**주요 변경사항**:
- `AUTH` 라우트 상수 추가
- `login: "/login"` 경로 정의

---

## 기타 페이지 파일들

(기존 페이지들은 이전 문서 참조)

---

**최신 업데이트**: 2025-01-29  
**업데이트 내용**: 로그인 시스템 통합, 권한 체크 개선
