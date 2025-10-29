/**
 * 인증 관련 유틸리티
 * S3: RequireAuth, RequireAdmin HOC 구현
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP, ADMIN } from '../routes';

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
 * 현재 사용자 정보 반환 (Mock)
 * TODO: Firebase Auth 연동
 */
export function useCurrentUser(): User | null {
  // 개발 모드 체크
  const devMode = import.meta.env.DEV;
  
  // 쿼리 파라미터에서 role 가져오기 (?role=admin)
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get('role') as 'customer' | 'admin' | null;
  
  // Dev 모드 또는 role 파라미터가 있으면 해당 role 반환
  if (devMode && role === 'admin') {
    return MOCK_ADMIN;
  }
  
  return MOCK_USER;
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
 * Mock 로그인 (테스트용)
 * TODO: Firebase Auth 로그인으로 교체
 */
export function mockLogin(role: 'customer' | 'admin' = 'customer'): void {
  console.log(`Mock login as ${role}`);
  if (role === 'admin') {
    window.location.href = `${ADMIN.root}?role=admin`;
  } else {
    window.location.href = `${APP.home}?role=customer`;
  }
}

/**
 * Mock 로그아웃 (테스트용)
 * TODO: Firebase Auth 로그아웃으로 교체
 */
export function mockLogout(): void {
  console.log('Mock logout');
  window.location.href = APP.home;
}

/**
 * AuthUser 타입 별칭 (하위 호환성)
 */
export type AuthUser = User;