# 메인 파일들

## App.tsx

```tsx
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
import AdminPromotions from "./pages/admin/Promotions";
import AdminAnalytics from "./pages/admin/Analytics";
import IntegratedAnalytics from "./pages/admin/IntegratedAnalytics";
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
              <Route path="notification-settings" element={<NotificationSettings />} />
              <Route path="support" element={<Support />} />
              <Route path="my" element={<My />} />
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
              <Route path="integrated-analytics" element={<IntegratedAnalytics />} />
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
```

## main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## vite-env.d.ts

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 기본 설정
  readonly VITE_USE_FIREBASE?: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;

  // Firebase 설정
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string;

  // NICEPAY 설정
  readonly VITE_NICEPAY_MID?: string;
  readonly VITE_NICEPAY_CLIENT_KEY?: string;

  // Phase 3: 배달 추적
  readonly VITE_DELIVERY_ENABLED?: string;
  readonly VITE_DELIVERY_PROVIDER?: string;
  readonly VITE_DELIVERY_WEBHOOK_SECRET?: string;
  readonly VITE_PROVIDER_A_API_KEY?: string;
  readonly VITE_PROVIDER_A_MERCHANT_ID?: string;

  // Phase 3: 고객 지원
  readonly VITE_SUPPORT_ENABLED?: string;

  // Phase 3: 포인트
  readonly VITE_POINTS_ENABLED?: string;
  readonly VITE_POINTS_RATE?: string;
  readonly VITE_POINTS_MIN_USE?: string;
  readonly VITE_POINTS_EXPIRE_DAYS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Attributions.md

```
이 Figma Make 파일에는 [shadcn/ui](https://ui.shadcn.com/)의 컴포넌트가 포함되어 있으며, [MIT 라이선스](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)에 따라 사용됩니다.

이 Figma Make 파일에는 [Unsplash](https://unsplash.com)의 사진이 포함되어 있으며, 이는 [라이선스](https://unsplash.com/license)에 따라 사용되었습니다.
```

## firebase.json

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|webp|avif)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs18"
  }
}
```


