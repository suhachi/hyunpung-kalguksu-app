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
import ReviewWrite from "./pages/app/ReviewWrite";
import ReviewList from "./pages/app/ReviewList";
import Coupons from "./pages/app/Coupons";
import Notifications from "./pages/app/Notifications";
import Support from "./pages/app/Support";
import Points from "./pages/app/Points";

// Admin 페이지
import { AdminLayout } from "./pages/admin/_layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminReviews from "./pages/admin/Reviews";
import AdminMenus from "./pages/admin/Menus";
import AdminSettings from "./pages/admin/Settings";
import AdminPromotions from "./pages/admin/Promotions";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminDelivery from "./pages/admin/Delivery";
import AdminSupport from "./pages/admin/Support";
import AdminPoints from "./pages/admin/Points";

// 개발자 도구
import { DevTools } from "./pages/DevTools";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-[#F9F6F3]">
          <Routes>
            {/* 고객용 PWA 앱 (메인) */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<MenuList />} />
              <Route path="menu/:menuId" element={<MenuDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order/:orderId" element={<OrderTracking />} />
              <Route path="review/:orderId" element={<ReviewWrite />} />
              <Route path="reviews" element={<ReviewList />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="points" element={<Points />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="support" element={<Support />} />
            </Route>
            
            {/* 브랜드 아이덴티티 가이드라인 */}
            <Route path="/brand" element={<BrandIdentity />} />
            
            {/* 관리자 대시보드 */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="menus" element={<AdminMenus />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="promotions" element={<AdminPromotions />} />
              <Route path="points" element={<AdminPoints />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>
            
            {/* 개발자 도구 (프로덕션에서 제거) */}
            <Route path="/dev" element={<DevTools />} />
            
            {/* 404 처리 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Toaster />
      </CartProvider>
    </BrowserRouter>
  );
}
