import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase 설정
// 환경변수(.env.local)에서 설정값을 가져옵니다
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project",
  // ✅ 명시적으로 올바른 버킷 지정 (환경 변수 값 또는 기본값)
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hp-kal.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스
export const auth = getAuth(app);
export const db = getFirestore(app);
// ✅ 명시적으로 버킷 URL 지정하여 올바른 버킷 사용 보장
// 모든 업로드는 이 storage 인스턴스만 사용해야 함
export const storage = getStorage(app, "gs://hp-kal.firebasestorage.app");
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app };
export default app;
