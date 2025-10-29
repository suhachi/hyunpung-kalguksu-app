/**
 * 인증 관련 유틸리티
 * S3: RequireAuth, RequireAdmin HOC 구현
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP, ADMIN } from '../routes';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { USE_FIREBASE } from '../config/env';

// Mock 사용자 정보 (추후 Firebase Auth로 교체)
export interface User {
  uid: string;
  email: string;
  role: 'customer' | 'admin';
}

const MOCK_USER: User = {
  uid: 'mock-user-001',
  email: 'customer@example.com',
  role: 'customer',
};

const MOCK_ADMIN: User = {
  uid: 'mock-admin-001',
  email: 'admin@example.com',
  role: 'admin',
};

/**
 * Firebase Auth 로그인
 */
export async function firebaseLogin(email: string, password: string): Promise<FirebaseUser> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Firebase Auth 로그아웃
 */
export async function firebaseLogout(): Promise<void> {
  await signOut(auth);
}

/**
 * Firestore에서 사용자 role 가져오기
 */
async function getUserRoleFromFirestore(uid: string): Promise<'customer' | 'admin' | 'owner' | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return (data.role as 'customer' | 'admin' | 'owner') || 'customer';
    }
  } catch (error) {
    console.error('Failed to get user role:', error);
  }
  return null;
}

/**
 * 현재 사용자 정보 반환 (Firebase Auth 또는 Mock)
 */
export function useCurrentUser(): User | null {
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    if (USE_FIREBASE) {
      // Firebase Auth 사용
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const role = await getUserRoleFromFirestore(firebaseUser.uid);
          if (role) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              role: role === 'owner' || role === 'admin' ? 'admin' : 'customer',
            });
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    } else {
      // Mock 인증 사용
      const mockRole = localStorage.getItem('mockRole');
      const urlParams = new URLSearchParams(window.location.search);
      const role = urlParams.get('role') as 'customer' | 'admin' | null;

      if (mockRole === 'owner' || role === 'admin') {
        setUser(MOCK_ADMIN);
      } else {
        setUser(MOCK_USER);
      }
    }
  }, []);

  return user;
}

/**
 * 현재 사용자 정보 반환 (Sync - 비 컴포넌트 사용)
 * TODO: Firebase Auth 연동
 */
export function getCurrentUser(): User | null {
  return useCurrentUser();
}

/**
 * 인증 필요 검증
 * @param user 현재 사용자
 * @returns 인증 여부
 */
export function requireAuth(user: User | null): boolean {
  return user !== null;
}

/**
 * 관리자 권한 검증
 * @param user 현재 사용자
 * @returns 관리자 여부
 */
export function requireAdmin(user: User | null): boolean {
  return user !== null && user.role === 'admin';
}

/**
 * Protected Route Component (기본 HOC)
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  check: (user: User | null) => boolean;
  redirectTo: string;
}

function ProtectedRoute({ children, check, redirectTo }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const user = useCurrentUser();
  
  useEffect(() => {
    if (!check(user)) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, check, navigate, redirectTo]);
  
  if (!check(user)) {
    return null; // 리다이렉트 중
  }
  
  return children as React.ReactElement;
}

/**
 * 인증 필요 HOC
 * 사용자만 접근 가능
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  return React.createElement(
    ProtectedRoute,
    { check: requireAuth, redirectTo: APP.home },
    children
  );
}

/**
 * 관리자 권한 필요 HOC
 * 관리자만 접근 가능
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  return React.createElement(
    ProtectedRoute,
    { check: requireAdmin, redirectTo: APP.home },
    children
  );
}

/**
 * 로그인 (Firebase Auth 또는 Mock)
 */
export async function login(email?: string, password?: string): Promise<void> {
  if (USE_FIREBASE && email && password) {
    // Firebase Auth 로그인
    try {
      await firebaseLogin(email, password);
      console.log('Firebase Auth 로그인 성공');
    } catch (error: any) {
      console.error('Firebase Auth 로그인 실패:', error);
      throw error;
    }
  } else {
    // Mock 로그인 (개발용)
    mockLogin('admin');
  }
}

/**
 * Mock 로그인 (테스트용)
 */
export function mockLogin(role: 'customer' | 'admin' = 'customer'): void {
  console.log(`Mock login as ${role}`);
  localStorage.setItem('mockRole', role);
  if (role === 'admin') {
    window.location.href = `${ADMIN.root}?role=admin`;
  } else {
    window.location.href = `${APP.home}?role=customer`;
  }
}

/**
 * 로그아웃 (Firebase Auth 또는 Mock)
 */
export async function logout(): Promise<void> {
  if (USE_FIREBASE) {
    await firebaseLogout();
  } else {
    mockLogout();
  }
}

/**
 * Mock 로그아웃 (테스트용)
 */
export function mockLogout(): void {
  console.log('Mock logout');
  localStorage.removeItem('mockRole');
  window.location.href = APP.home;
}

/**
 * AuthUser 타입 별칭 (하위 호환성)
 */
export type AuthUser = User;