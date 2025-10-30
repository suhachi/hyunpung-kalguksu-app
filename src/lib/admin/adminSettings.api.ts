/**
 * 관리자 설정 API
 * 비밀 키는 저장하지 않음 (functions:config에만 저장)
 */

import { USE_FIREBASE } from '../../config/env';
import type { AdminSettings, HealthCheckResult } from '../../types/adminSettings';

const COLLECTION_NAME = 'adminSettings';
const DOC_ID = 'core';

/**
 * 관리자 설정 조회
 */
export async function getAdminSettings(): Promise<AdminSettings | null> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting admin settings');
    return null;
  }

  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('../firebase');
    
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        updatedAt: data.updatedAt?.toDate() || undefined,
      } as AdminSettings;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get admin settings:', error);
    throw error;
  }
}

/**
 * 관리자 설정 저장
 */
export async function saveAdminSettings(
  settings: Partial<AdminSettings>
): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Saving admin settings:', settings);
    return;
  }

  try {
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('../firebase');
    const { getCurrentUser } = await import('../auth');
    
    const user = getCurrentUser();
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    
    await setDoc(
      docRef,
      {
        ...settings,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid || 'system',
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Failed to save admin settings:', error);
    throw error;
  }
}

/**
 * 헬스체크 (Functions Callable)
 * functions:config 상태 확인
 */
export async function checkHealth(): Promise<HealthCheckResult> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Health check');
    return {
      functions: {
        connected: true,
        nicepay: { endpoint: true, mid: true, key: true },
        delivery: { secret: true },
      },
      fcm: { vapidKey: true, supported: true },
      maps: { kakao: false, google: false },
      firestore: { connected: true },
      storage: { connected: true, corsConfigured: true },
    };
  }

  try {
    const { getFunctions, httpsCallable } = await import('firebase/functions');
    const { functions } = await import('../firebase');
    
    const checkHealthFn = httpsCallable(getFunctions(functions), 'adminHealthCheck');
    const result = await checkHealthFn();
    
    return result.data as HealthCheckResult;
  } catch (error) {
    console.error('Failed to check health:', error);
    throw error;
  }
}

/**
 * .env 템플릿 생성
 */
export function generateEnvTemplate(): string {
  const template = `# Firebase 설정
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# FCM (선택사항)
VITE_FIREBASE_VAPID_KEY=your-vapid-key

# 기능 플래그
VITE_USE_FIREBASE=true
VITE_DELIVERY_ENABLED=true
VITE_DELIVERY_PROVIDER=mock

# 배달대행사 API (Provider A 사용 시)
VITE_DELIVERYA_BASE_URL=https://api.example.com
VITE_DELIVERYA_API_KEY=your-api-key
VITE_DELIVERYA_PUBLIC_KEY=your-public-key

# 지도/지오코딩 API (선택사항)
VITE_KAKAO_MAPS_API_KEY=your-kakao-key
VITE_GOOGLE_MAPS_API_KEY=your-google-key
`;

  return template;
}

/**
 * 배포 스크립트 생성
 */
export function generateDeployScript(): string {
  const script = `# Firestore 인덱스 및 규칙 배포
firebase deploy --only firestore:indexes,firestore:rules

# Storage Rules 배포
firebase deploy --only storage

# Functions 배포
firebase deploy --only functions

# Frontend 빌드 및 Hosting 배포
npm run build
firebase deploy --only hosting
`;

  return script;
}

/**
 * NICEPAY CLI 명령 생성
 */
export function generateNicepayCLI(params: {
  endpoint: string;
  mid: string;
  key: string;
  returnUrl: string;
  cancelUrl: string;
}): string {
  return `firebase functions:config:set nicepay.endpoint="${params.endpoint}" nicepay.mid="${params.mid}" nicepay.key="${params.key}" nicepay.return_url="${params.returnUrl}" nicepay.cancel_url="${params.cancelUrl}"`;
}

/**
 * Delivery Webhook CLI 명령 생성
 */
export function generateDeliveryCLI(params: {
  secret: string;
  allowedIps?: string;
}): string {
  const allowedIps = params.allowedIps ? ` delivery.allowed_ips="${params.allowedIps}"` : '';
  return `firebase functions:config:set delivery.secret="${params.secret}"${allowedIps}`;
}

