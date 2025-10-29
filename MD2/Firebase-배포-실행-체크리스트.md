# Firebase 배포 실행 체크리스트

**날짜**: 2025년 1월 29일  
**상태**: 배포 준비 완료

---

## ⚠️ 사전 필수 사항

### 1. .env.local 파일 생성

프로젝트 루트(`src/` 디렉토리)에 `.env.local` 파일을 생성하세요:

```env
# Firebase 설정 (실제 값으로 교체 필요)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=hp-kal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hp-kal
VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=742663074507
VITE_FIREBASE_APP_ID=1:742663074507:web:dcc8fdabf58bd4bf48214e

# Firebase 사용 여부
VITE_USE_FIREBASE=true
```

**⚠️ 중요**: `VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com` (버킷 이름 사용)

---

## 🚀 배포 실행 순서

### Step 0: 사전 확인

```bash
# 1. .env.local 파일 확인
cat .env.local | grep VITE_FIREBASE

# 2. 앱 빌드 테스트
npm run build
```

---

### Step 1: Firebase CLI 인증

```bash
firebase login
firebase use hp-kal
```

---

### Step 2: Rules & Indexes 배포 (순서 중요!)

```bash
# 1. Firestore Rules
firebase deploy --only firestore:rules

# 2. Storage Rules  
firebase deploy --only storage

# 3. Firestore Indexes
firebase deploy --only firestore:indexes

# 4. 앱 빌드
npm run build

# 5. Hosting 배포
firebase deploy --only hosting
```

---

## ✅ 배포 후 체크리스트

### 1. 인덱스 상태 확인 (필수)

**Firebase Console → Firestore → Indexes**

다음 7개 인덱스가 **"Enabled"** 상태인지 확인:
- [ ] `reviews` - storeId + createdAt
- [ ] `reviews` - storeId + rating  
- [ ] `reviews` - storeId + hasPhoto + createdAt
- [ ] `orders` - userId + createdAt
- [ ] `orders` - storeId + status + createdAt
- [ ] `menus` - storeId + category + name
- [ ] `coupons` - userId + status + expiresAt

⚠️ **"Enabling"** 상태인 경우 완료까지 대기 (몇 분~몇 시간 소요)

---

### 2. 5분 스모크 테스트 (8가지)

#### 고객 앱 테스트 (5가지)
- [ ] **회원가입/로그인** → users/{uid} 생성 확인
- [ ] **메뉴 → 장바구니 → Checkout** → orders/{id} 생성 확인
- [ ] **/orders 탭 필터** → 진행중(pending/accepted/preparing), 완료(completed) 정상 동작
- [ ] **리뷰 작성** → 사진 업로드 (≤3MB) → reviews/* & Storage 업로드 성공
- [ ] **권한 차단** → 타인 주문 읽기 시도 → 거부됨

#### 관리자 앱 테스트 (3가지)
- [ ] **관리자 접근** → users/{uid}.role='admin' → /admin/* 접근 가능
- [ ] **메뉴 관리** → 등록/편집/이미지 업로드 (≤3MB)
- [ ] **쿠폰 시스템** → 발급 → Checkout에서 적용 확인

---

## 🔄 롤백 절차

문제 발생 시 즉시 실행:

### 1. Mock 모드로 전환
`.env.local`:
```env
VITE_USE_FIREBASE=false
```

### 2. Git 롤백 (필요 시)
```bash
git log --oneline -5
git revert <commit-hash>
```

### 3. Rules 재배포 (필요 시)
```bash
git checkout HEAD~1 firestore.rules storage.rules
firebase deploy --only firestore:rules,storage
```

---

## 🔍 오류 대응

### 오류 메시지가 나올 경우

배포 중 아래 오류가 발생하면 즉시 알려주세요:
- `PERMISSION_DENIED`
- `Missing or insufficient permissions`
- `Index not built`
- `Storage quota exceeded`
- 기타 Firebase 관련 오류

---

## 📝 완료 확인

배포 성공 후:
- ✅ Firebase Console → Hosting URL에서 앱 접속
- ✅ Firebase Console → Firestore → Indexes에서 7개 Enabled
- ✅ Firebase Console → Storage에서 파일 업로드 가능
- ✅ 스모크 테스트 8가지 모두 통과

---

**배포 준비 완료**: 위 체크리스트대로 실행하세요! 🚀

