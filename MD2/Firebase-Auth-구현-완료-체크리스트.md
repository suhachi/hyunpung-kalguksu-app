# Firebase Auth 구현 완료 체크리스트

**일시**: 2025-01-29  
**사용자**: `admin@hp-kal.com` (UID: `ukjp1Q5vRHSGUhi37w8FFLeARu82`)

---

## ✅ 완료된 작업

### 1. 코드 구현
- ✅ Storage Rules 업데이트 (role 체크 추가)
- ✅ Firebase Auth 로그인 함수 추가
- ✅ Firebase Auth 로그아웃 함수 추가
- ✅ useCurrentUser에서 Firebase Auth 상태 감지
- ✅ AdminLayout 자동 로그인 구현

### 2. 커밋 완료
- ✅ 모든 변경사항 커밋됨

---

## 🔄 필요한 작업 (수동)

### 1. Firestore 문서 생성 (필수)

**Firebase Console에서**:
1. Firestore Database → 데이터
2. `users` 컬렉션 선택 (없으면 생성)
3. 문서 ID: `ukjp1Q5vRHSGUhi37w8FFLeARu82`
4. 필드 추가:
   - `role` (string): `owner`
   - `email` (string): `admin@hp-kal.com`
   - `name` (string): `관리자`

### 2. Storage Rules 배포 (필수)

```bash
firebase deploy --only storage
```

또는 Firebase Console에서:
1. Storage → Rules 탭
2. `storage.rules` 내용 복사
3. 저장

---

## 🧪 테스트 단계

### 1. 개발 서버 재시작
```bash
npm run dev
```

### 2. 관리자 페이지 접속
- `http://localhost:3001/admin` 또는 `http://localhost:3000/admin`

### 3. 자동 로그인 확인
- 콘솔에서 "자동 로그인 성공" 메시지 확인
- 또는 "자동 로그인 실패" 시 비밀번호 확인

### 4. 이미지 업로드 테스트
- 메뉴 관리 → 메뉴 수정
- 이미지 변경 → 저장
- Network 탭에서 POST 요청 확인
- `200 OK` 또는 `201 Created` 확인

---

## ⚠️ 주의사항

### 1. 비밀번호 확인
- 현재 코드: `admin1234`
- 실제 비밀번호와 일치하는지 확인
- 환경 변수로 이동 권장

### 2. Firestore 문서 필수
- 문서가 없으면 `getUserRoleFromFirestore`가 `null` 반환
- `role`이 없으면 Storage 업로드 실패

### 3. USE_FIREBASE 플래그
- `.env`: `VITE_USE_FIREBASE=true` 확인
- `false`이면 Mock 인증 사용

---

## 📝 다음 단계 (선택)

### 환경 변수로 비밀번호 이동
```typescript
// src/config/env.ts
export const ADMIN_EMAIL = getEnv('VITE_ADMIN_EMAIL', 'admin@hp-kal.com');
export const ADMIN_PASSWORD = getEnv('VITE_ADMIN_PASSWORD', 'admin1234');
```

---

**작성자**: 개발팀  
**상태**: ✅ 코드 구현 완료, 🔄 Firestore 문서 생성 및 Storage Rules 배포 필요

