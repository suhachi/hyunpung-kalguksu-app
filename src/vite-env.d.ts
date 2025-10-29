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
