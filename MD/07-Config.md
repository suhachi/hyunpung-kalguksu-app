# CONFIG 파일들

총 3개 파일

## 149. src/config/env.ts

```typescript
/**
 * 환경 변수 설정
 * USE_FIREBASE 플래그를 통한 Mock/Real 전환
 */

// 환경 변수 안전 접근 헬퍼
const getEnv = (key: string, defaultValue: string = ''): string => {
  try {
    return import.meta?.env?.[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

// Firebase 사용 여부 (개발 중에는 false, 배포 시 true)
export const USE_FIREBASE = getEnv('VITE_USE_FIREBASE') === 'true';

// 환경 타입
export const ENV = getEnv('MODE', 'development');

// 앱 설정
export const APP_CONFIG = {
  name: '현풍닭칼국수',
  version: '1.0.0',
  company: 'KS컴퍼니',
  bizNo: '553-17-00098',
  ceo: '석경선/배종수(공동대표)',
};

// Firebase 설정 (Firebase 사용 시)
export const FIREBASE_CONFIG = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID'),
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID'),
};

// NICEPAY 설정
export const NICEPAY_CONFIG = {
  mid: getEnv('VITE_NICEPAY_MID', 'NICE_DEV_MID'),
  clientKey: getEnv('VITE_NICEPAY_CLIENT_KEY', 'NICE_DEV_KEY'),
};

// 배달 대행사 Provider A 설정
export const PROVIDER_A_CONFIG = {
  apiUrl: getEnv('VITE_PROVIDER_A_API_URL', 'https://api.provider-a.example.com'),
  apiKey: getEnv('VITE_PROVIDER_A_API_KEY', 'YOUR_API_KEY_HERE'),
  merchantId: getEnv('VITE_PROVIDER_A_MERCHANT_ID', 'YOUR_MERCHANT_ID'),
};

// Phase 3 기능 토글
export const FEATURE_FLAGS = {
  // 배달 추적 기능
  delivery: getEnv('VITE_DELIVERY_ENABLED') === 'true',
  deliveryProvider: getEnv('VITE_DELIVERY_PROVIDER', 'mock'),
  deliveryWebhookSecret: getEnv('VITE_DELIVERY_WEBHOOK_SECRET', 'change_me'),
  
  // 고객 지원 채팅 기능
  support: getEnv('VITE_SUPPORT_ENABLED') === 'true',
  
  // 포인트 리워드 시스템
  points: getEnv('VITE_POINTS_ENABLED') === 'true',
  pointsRate: parseFloat(getEnv('VITE_POINTS_RATE', '0.03')),
  pointsMinUse: parseInt(getEnv('VITE_POINTS_MIN_USE', '1000'), 10),
  pointsExpireDays: parseInt(getEnv('VITE_POINTS_EXPIRE_DAYS', '365'), 10),
};

// 디버그 모드
export const DEBUG = getEnv('MODE') === 'development';

// 로깅 유틸
export function log(...args: any[]) {
  if (DEBUG) {
    console.log('[App]', ...args);
  }
}

export function logError(...args: any[]) {
  console.error('[App Error]', ...args);
}
```

## 150. src/functions/tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "outDir": "lib",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 151. src/tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 현풍닭칼국수 브랜드 컬러
        'hyunpung-red': 'var(--color-hyunpung-red)',
        'shinkal-orange': 'var(--color-shinkal-orange)',
        'dark-brown': 'var(--color-dark-brown)',
        'cream-bg': 'var(--color-cream-bg)',
        'brass-gold': 'var(--color-brass-gold)',
        
        // 시맨틱 브랜드 컬러
        'brand-primary': 'var(--color-brand-primary)',
        'brand-primary-hover': 'var(--color-brand-primary-hover)',
        'brand-primary-light': 'var(--color-brand-primary-light)',
        'brand-secondary': 'var(--color-brand-secondary)',
        'brand-secondary-hover': 'var(--color-brand-secondary-hover)',
        'brand-secondary-light': 'var(--color-brand-secondary-light)',
        'brand-accent': 'var(--color-brand-accent)',
        'brand-accent-hover': 'var(--color-brand-accent-hover)',
        'brand-accent-light': 'var(--color-brand-accent-light)',
        
        // 시스템 컬러 (기존 유지)
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        popover: 'var(--color-popover)',
        'popover-foreground': 'var(--color-popover-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        'accent-bg': 'var(--color-accent-bg)',
        'accent-foreground': 'var(--color-accent-foreground)',
        destructive: 'var(--color-destructive)',
        'destructive-foreground': 'var(--color-destructive-foreground)',
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'soft-1': 'var(--shadow-soft-1)',
        'soft-2': 'var(--shadow-soft-2)',
        'soft-3': 'var(--shadow-soft-3)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
    },
  },
  plugins: [],
}
```

