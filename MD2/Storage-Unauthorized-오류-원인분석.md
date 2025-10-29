# Storage Unauthorized 오류 원인 분석

**분석 일시**: 2025-01-29  
**오류 메시지**: `Firebase Storage: User does not have permission to access 'menus/menu-001/1761741903222.webp'. (storage/unauthorized)`

---

## 🔴 발견된 오류

### 오류 상세
```
Firebase Storage: User does not have permission to access 
'menus/menu-001/1761741903222.webp'. 
(storage/unauthorized)
```

**발생 위치**: 메뉴 이미지 업로드 시도 시

---

## 🔍 원인 분석

### 1. Storage Rules 요구사항

**파일**: `storage.rules`

```javascript
match /menus/{menuId}/{file} {
  allow read: if true;
  allow write: if request.auth != null  // ⚠️ 인증 필요
               && request.resource.size < 5 * 1024 * 1024
               && request.resource.contentType.matches('image/.*');
}
```

**요구 조건**:
- ✅ `request.auth != null` - Firebase Auth 인증 필요
- ✅ 파일 크기 5MB 이하
- ✅ 이미지 MIME 타입

---

### 2. 현재 인증 시스템 상태

#### Mock 인증 사용 중 (`src/lib/auth.ts`)

```typescript
// Mock 사용자 정보
const MOCK_ADMIN: User = {
  uid: 'mock-admin-001',
  email: 'admin@example.com',
  role: 'admin',
};

export function useCurrentUser(): User | null {
  const mockRole = localStorage.getItem('mockRole');
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get('role') as 'customer' | 'admin' | null;
  
  if (mockRole === 'owner' || role === 'admin') {
    return MOCK_ADMIN;
  }
  
  return MOCK_USER;
}
```

**특징**:
- ❌ 실제 Firebase Auth 사용 안 함
- ❌ `auth.currentUser` 없음
- ❌ Firebase Auth 토큰 없음
- ✅ Mock 객체만 반환

---

### 3. Firebase Storage SDK 동작

**파일**: `src/lib/admin/menuImages.api.ts`

```typescript
import { storage } from '../firebase'; // Firebase Storage 인스턴스

await uploadBytes(objectRef, processed, { 
  contentType: 'image/webp',
  cacheControl: 'public,max-age=60',
});
```

**동작 원리**:
1. Firebase Storage SDK는 업로드 요청 시 **자동으로 Firebase Auth 토큰을 포함**시킴
2. Storage Rules는 이 토큰을 검증함: `request.auth != null`
3. **Mock 인증은 실제 토큰이 없으므로** `request.auth`가 `null`이 됨
4. Storage Rules가 거부 → `storage/unauthorized` 오류

---

### 4. 환경 변수 확인

**파일**: `src/config/env.ts`

```typescript
export const USE_FIREBASE = getEnv('VITE_USE_FIREBASE') === 'true';
```

**현재 상태**:
- `.env` 파일에서 `VITE_USE_FIREBASE` 값 확인 필요
- `false`인 경우: Mock 인증 사용 → Firebase Auth 없음
- `true`인 경우: 실제 Firebase Auth 필요

---

## 💡 핵심 원인

### 문제의 핵심

| 항목 | 요구사항 | 실제 상태 | 결과 |
|------|---------|----------|------|
| **Storage Rules** | `request.auth != null` | ❌ Mock 인증 사용 중 | 거부 |
| **Firebase Auth** | 실제 인증 토큰 필요 | ❌ 토큰 없음 | 인증 실패 |
| **업로드 요청** | Auth 토큰 포함 필요 | ❌ 토큰 없음 | `unauthorized` |

**결론**: 
- Storage Rules는 **실제 Firebase Auth 토큰**을 요구함
- 현재 시스템은 **Mock 인증만 사용** 중
- Mock 사용자는 실제 Firebase Auth 토큰이 없으므로 Storage 업로드 불가

---

## 🔍 추가 확인 사항

### Firebase 초기화 상태

**파일**: `src/lib/firebase.ts`

```typescript
export const auth = getAuth(app);
export const storage = getStorage(app, "gs://hp-kal.firebasestorage.app");
```

**확인 포인트**:
- ✅ Firebase App 초기화됨
- ✅ Auth 인스턴스 생성됨
- ⚠️ 실제 로그인 여부 확인 필요

### 사용자 인증 상태 확인 방법

브라우저 콘솔에서:
```javascript
// Firebase Auth 현재 사용자 확인
import { auth } from './src/lib/firebase';
console.log(auth.currentUser); // null이면 미인증
```

---

## 📊 원인 요약

### 1차 원인: Firebase Auth 미인증
- Mock 인증 시스템 사용 중
- 실제 Firebase Auth 로그인 안 됨
- `auth.currentUser === null`

### 2차 원인: Storage Rules 검증 실패
- Storage Rules는 `request.auth != null` 요구
- 실제 토큰이 없으므로 `request.auth`가 `null`
- 자동으로 거부됨

### 근본 원인: Mock vs Real 인증 불일치
- 애플리케이션 레벨: Mock 인증 사용 (동작함)
- Firebase Storage 레벨: 실제 Auth 토큰 필요 (미제공)
- 두 시스템이 불일치하여 권한 오류 발생

---

## ⚠️ 가능한 시나리오

### 시나리오 1: 개발 모드 (Mock 인증)
- `VITE_USE_FIREBASE=false`
- Mock 인증 사용
- Firebase Auth 미사용
- **결과**: Storage 업로드 불가 (`unauthorized`)

### 시나리오 2: 실제 Firebase Auth 사용 (미구현)
- `VITE_USE_FIREBASE=true`
- 실제 Firebase Auth 로그인 필요
- **현재 상태**: Mock 인증만 구현됨
- **결과**: 실제 Auth 로그인 구현 필요

---

## 🎯 해결 방법 유형

### 방법 1: Storage Rules 완화 (개발용)
- `request.auth != null` 조건 제거
- 개발 중에만 사용
- **주의**: 보안 취약

### 방법 2: 실제 Firebase Auth 구현
- Firebase Auth 로그인 기능 추가
- Mock 인증 대신 실제 인증 사용
- **권장**: 프로덕션 준비됨

### 방법 3: 개발 모드 무인증 허용
- `VITE_USE_FIREBASE=false`일 때 Rules 완화
- Mock 인증과 호환
- **권장**: 개발 환경에서만 사용

---

## 📝 결론

**핵심 원인**:
1. Storage Rules는 실제 Firebase Auth 토큰을 요구함
2. 현재 시스템은 Mock 인증만 사용 중
3. Mock 사용자는 실제 Auth 토큰이 없음
4. Storage 업로드 시 `request.auth`가 `null`이 되어 거부됨

**해결 필요**:
- 실제 Firebase Auth 로그인 구현
- 또는 개발 모드에서 Storage Rules 완화
- 또는 Mock 인증과 Storage Rules의 불일치 해결

---

**작성자**: 개발팀  
**분석 일시**: 2025-01-29  
**우선순위**: 🔥 **긴급 - 인증 시스템 불일치**

