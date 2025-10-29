/**
 * 인증 및 권한 관리 유틸리티
 * USE_FIREBASE=false: mockAuth 사용
 * USE_FIREBASE=true: Firebase Auth 사용
 */

export type UserRole = 'customer' | 'owner' | 'admin';

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  storeId?: string; // owner인 경우 관리하는 매장 ID
}

// Firebase 사용 여부 (개발 시 false)
const USE_FIREBASE = false;

/**
 * Mock 인증 사용자 (개발용)
 */
const MOCK_ADMIN: AuthUser = {
  uid: 'admin-001',
  email: 'admin@hyunpungkalguksu.com',
  displayName: '관리자',
  role: 'owner',
  storeId: 'store-hyunpung',
};

const MOCK_CUSTOMER: AuthUser = {
  uid: 'user-001',
  email: 'customer@example.com',
  displayName: '김고객',
  role: 'customer',
};

/**
 * 현재 로그인한 사용자 정보 가져오기
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (USE_FIREBASE) {
    // TODO: Firebase Auth에서 사용자 정보 가져오기
    // const firebaseUser = auth.currentUser;
    // if (!firebaseUser) return null;
    // const userDoc = await db.collection('users').doc(firebaseUser.uid).get();
    // return userDoc.data() as AuthUser;
    return null;
  }

  // Mock: localStorage에서 역할 가져오기 (테스트용)
  const mockRole = localStorage.getItem('mockRole') || 'customer';
  return mockRole === 'owner' || mockRole === 'admin' ? MOCK_ADMIN : MOCK_CUSTOMER;
}

/**
 * 사용자가 특정 역할을 가지고 있는지 확인
 */
export function hasRole(user: AuthUser | null, roles: UserRole[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

/**
 * 관리자 권한 확인
 */
export function isAdmin(user: AuthUser | null): boolean {
  return hasRole(user, ['owner', 'admin']);
}

/**
 * 고객 권한 확인
 */
export function isCustomer(user: AuthUser | null): boolean {
  return hasRole(user, ['customer']);
}

/**
 * Mock 로그인 (테스트용)
 */
export function mockLogin(role: UserRole): void {
  localStorage.setItem('mockRole', role);
  window.location.reload();
}

/**
 * Mock 로그아웃 (테스트용)
 */
export function mockLogout(): void {
  localStorage.removeItem('mockRole');
  window.location.reload();
}

/**
 * 관리자 페이지 접근 가드
 * 관리자가 아니면 홈으로 리다이렉트
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await getCurrentUser();
  
  if (!isAdmin(user)) {
    // 관리자가 아니면 홈으로 이동
    window.location.href = '/';
    throw new Error('Unauthorized');
  }
  
  return user!;
}
