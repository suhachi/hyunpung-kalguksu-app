import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from "./contexts/CartContext";
import { BrandIdentity } from "./components/BrandIdentity";
import { AppLayout } from "./components/app/AppLayout";
import { Home } from "./pages/app/Home";
import { MenuList } from "./pages/app/MenuList";
import { MenuDetail } from "./pages/app/MenuDetail";
import { Cart } from "./pages/app/Cart";
import { Checkout } from "./pages/app/Checkout";
import { OrderTracking } from "./pages/app/OrderTracking";
import Orders from "./pages/app/Orders";
import { OrdersList } from "./pages/orders/OrdersList";
import { OrderDetail } from "./pages/orders/OrderDetail";
import ReviewWrite from "./pages/app/ReviewWrite";
import ReviewList from "./pages/app/ReviewList";
import Coupons from "./pages/app/Coupons";
import Notifications from "./pages/app/Notifications";
import { Inbox } from "./pages/notifications/Inbox";
import NotificationSettings from "./pages/app/NotificationSettings";
import Support from "./pages/app/Support";
import Points from "./pages/app/Points";
import My from "./pages/app/My";

// Admin 페이지
import { AdminLayout } from "./pages/admin/_layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminReviews from "./pages/admin/Reviews";
import AdminMenus from "./pages/admin/Menus";
import AdminSettings from "./pages/admin/Settings";
import { SettingsCenter } from "./pages/admin/Settings/index";
import AdminPromotions from "./pages/admin/Promotions";
import AdminAnalytics from "./pages/admin/Analytics";
import IntegratedAnalytics from "./pages/admin/IntegratedAnalytics";
import AdminDelivery from "./pages/admin/Delivery";
import AdminSupport from "./pages/admin/Support";
import AdminPoints from "./pages/admin/Points";

// 개발자 도구
import { DevTools } from "./pages/DevTools";

// 로그인 페이지
import Login from "./pages/auth/Login";

// 라우트 상수
import { APP, ADMIN, BRAND, DEV, AUTH } from "./routes";

// 접근 가드
import { RequireAdmin } from "./lib/auth";
import RequireAuth from "./components/auth/RequireAuth";
import { FCMInitializer } from "./components/FCMInitializer";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FCMInitializer />
        <div className="min-h-screen bg-[#F9F6F3]">
          <Routes>
            {/* 고객용 PWA 앱 (메인) */}
            <Route path={APP.home} element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<MenuList />} />
              <Route path="menu/:menuId" element={<MenuDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<OrdersList />} />
              <Route path="orders/:orderId" element={<OrderDetail />} />
              <Route path="order/:orderId" element={<OrderTracking />} />
              <Route path="review/:orderId" element={<ReviewWrite />} />
              <Route path="reviews" element={<ReviewList />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="points" element={<Points />} />
              <Route path="notifications/inbox" element={<Inbox />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="notification-settings" element={<NotificationSettings />} />
              <Route path="support" element={<Support />} />
              <Route path="my" element={<My />} />
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
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="menus" element={<AdminMenus />} />
              <Route path="settings" element={<SettingsCenter />} />
              <Route path="promotions" element={<AdminPromotions />} />
              <Route path="points" element={<AdminPoints />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="integrated-analytics" element={<IntegratedAnalytics />} />
            </Route>
            
            {/* 개발자 도구 (프로덕션에서 제거) */}
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
