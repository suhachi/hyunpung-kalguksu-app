# Firebase 배포 최종 상태 확인

**확인 시간**: 2025년 1월 29일  
**프로젝트**: hp-kal  
**상태**: ✅ 배포 준비 완료

---

## ✅ 완료된 작업

### 1. 환경 변수 수정 완료
`.env.local`에서 Storage 버킷 값 수정:
- ❌ 변경 전: `VITE_FIREBASE_STORAGE_BUCKET=hp-kal.firebasestorage.app`
- ✅ 변경 후: `VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com`

### 2. Import 경로 수정 완료
- ✅ `src/lib/functions.ts` → `'../config/env'`로 수정
- ✅ `src/lib/analytics.ts` → `'../config/env'`로 수정

### 3. 빌드 성공
```bash
npm run build
✓ built in 11.23s
```

**빌드 결과**:
- `build/index.html` - 0.44 kB
- `build/assets/index.esm-NqedCW4l.js` - 18.04 kB
- `build/assets/firebase-DoJTM7qM.js` - 142.18 kB
- `build/assets/index-BOT4KNoK.js` - 1,120.19 kB

⚠️ Chunk 크기 경고 (500KB 초과): 코드 스플리팅 권장

---

## 🚀 배포 명령어

### 수동 실행 필요 (인터랙티브 모드)

다음 명령어를 **PowerShell 또는 CMD에서 직접 실행**하세요:

```bash
# 1. Firebase 로그인
firebase login

# 2. 프로젝트 선택
firebase use hp-kal

# 3. Firestore Rules 배포
firebase deploy --only firestore:rules

# 4. Storage Rules 배포
firebase deploy --only storage

# 5. Firestore Indexes 배포
firebase deploy --only firestore:indexes

# 6. Hosting 배포
firebase deploy --only hosting
```

---

## 📋 배포 후 체크리스트

### 1. Firebase Console 확인
- [ ] **Authentication → Settings → Authorized domains**
  - `hp-kal.web.app` ✅
  - `hp-kal.firebaseapp.com` ✅
  - 커스텀 도메인 (있는 경우)

- [ ] **Firestore → Indexes** (7개 Enabled 확인)
  - reviews - storeId + createdAt
  - reviews - storeId + rating
  - reviews - storeId + hasPhoto + createdAt
  - orders - userId + createdAt
  - orders - storeId + status + createdAt
  - menus - storeId + category + name
  - coupons - userId + status + expiresAt

### 2. 스모크 테스트 (8가지)

#### 고객 앱 (5가지)
- [ ] 회원가입/로그인 → users/{uid} 확인
- [ ] 메뉴 → 장바구니 → Checkout → orders/{id} 생성 확인
- [ ] /orders 탭 필터 (진행중/완료) 동작 확인
- [ ] 리뷰 작성 (≤3MB 이미지) → Storage 업로드 확인
- [ ] 권한 차단 (타인 주문 읽기 불가)

#### 관리자 앱 (3가지)
- [ ] /admin/* 접근 (users/{uid}.role='admin' 필요)
- [ ] 메뉴 등록/편집/이미지 업로드
- [ ] 쿠폰 발급 → Checkout에서 적용 확인

---

## ⚠️ 문제 발생 시

### 즉시 롤백
`.env.local`:
```env
VITE_USE_FIREBASE=false
```

### 오류 메시지가 나올 경우
배포 중 에러가 발생하면 그대로 **전체 에러 메시지를 복사**해서 알려주세요.

---

## ✅ 최종 확인

**현재 상태**: 
- ✅ Environment variables 수정 완료
- ✅ Build 성공
- ✅ Security rules 준비 완료
- ✅ Indexes 준비 완료
- ✅ Storage rules 준비 완료

**다음 단계**: PowerShell에서 `firebase login` 실행 후 배포 진행

---

**배포 준비 완료** ✅

