/**
 * 라우트 상수 정의
 * S1: 하드코딩 경로 제거 → 중앙 관리
 */

export const APP = {
  home: "/",
  menu: "/menu",
  menuDetail: (id: string) => `/menu/${id}`,
  cart: "/cart",
  checkout: "/checkout",
  order: (id: string) => `/order/${id}`,
  orders: "/orders",
  reviewWrite: (id: string) => `/review/${id}`,
  reviews: "/reviews",
  coupons: "/coupons",
  points: "/points",
  notifications: "/notifications",
  notificationSettings: "/notification-settings",
  support: "/support",
  my: "/my",
};

export const ADMIN = {
  root: "/admin",
  dashboard: "/admin",
  orders: "/admin/orders",
  delivery: "/admin/delivery",
  support: "/admin/support",
  reviews: "/admin/reviews",
  menus: "/admin/menus",
  settings: "/admin/settings",
  promotions: "/admin/promotions",
  points: "/admin/points",
  analytics: "/admin/analytics",
  integratedAnalytics: "/admin/integrated-analytics",
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