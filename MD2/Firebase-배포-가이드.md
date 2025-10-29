# Firebase 배포 가이드 (ATOMIC STEPS)

## 📋 0. 필수 패키지 확인

```bash
npm i firebase firebase-admin
npm i -D firebase-tools
```

## 🔧 1. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 입력하세요:

```env
# Firebase 설정
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=hp-kal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hp-kal
VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=742663074507
VITE_FIREBASE_APP_ID=1:742663074507:web:dcc8fdabf58bd4bf48214e

# Firebase 사용 여부 (배포 시 true로 변경)
VITE_USE_FIREBASE=true
```

⚠️ **중요**: `VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com` (도메인이 아닌 버킷 이름 사용)

---

## 📁 2. 파일 구성 완료 ✅

다음 파일들이 프로젝트 루트에 생성되었습니다:

- ✅ `firestore.rules` - Firestore 보안 규칙
- ✅ `storage.rules` - Storage 보안 규칙 (3MB 제한)
- ✅ `firestore.indexes.json` - 필수 인덱스
- ✅ `firebase.json` - Firebase 설정
- ✅ `.firebaserc` - 프로젝트 ID 설정
- ✅ `src/lib/orderStatus.ts` - OrderStatus 정규화 유틸

---

## 🚀 3. 배포 순서 (롤백 안전)

### Step 3-1: Firebase CLI 인증

```bash
firebase login
firebase use hp-kal
```

### Step 3-2: 에뮬레이터 리허설 (선택 사항)

```bash
firebase emulators:start
```

브라우저에서 `http://localhost:4000` 열어 테스트

### Step 3-3: Rules & Indexes 배포

```bash
# 1. Firestore Rules
firebase deploy --only firestore:rules

# 2. Storage Rules
firebase deploy --only storage

# 3. Firestore Indexes
firebase deploy --only firestore:indexes
```

### Step 3-4: Functions 배포 (선택 사항)

```bash
cd src/functions
npm install
cd ../..
firebase deploy --only functions
```

### Step 3-5: 앱 빌드 및 호스팅 배포

```bash
npm run build
firebase deploy --only hosting
```

---

## 🧪 4. 스모크 테스트 (필수 체크 8가지)

### ✅ 1. 회원가입/로그인
- 이메일 회원가입 → `users/{uid}.role` 확인 (기본값: `customer`)
- Google 로그인 → 동일 확인

### ✅ 2. 주문 생성
- `/checkout` 페이지에서 주문 생성
- `orders/{orderId}` 생성 확인
- 본인만 읽기 가능 여부 확인

### ✅ 3. 주문 목록
- `/orders` 페이지 접근
- 상태 필터 동작 확인 (진행중 = pending/accepted/preparing)

### ✅ 4. 주문 추적
- `/orders/:id` 페이지에서 상세 정보 확인

### ✅ 5. 리뷰 작성
- 리뷰 작성 (사진 1장, 3MB 이하 업로드)
- `reviews/*` 문서 생성 확인
- Storage 업로드 성공 확인

### ✅ 6. 관리자 모드
- Firebase Console에서 `users/{uid}.role` 을 `owner` 또는 `admin`으로 변경
- `/admin/*` 경로 접근 가능 확인

### ✅ 7. 메뉴 관리
- 관리자 모드에서 메뉴 등록/편집
- 메뉴 이미지 업로드 (3MB 이하)
- `menus/*` 문서 생성 확인

### ✅ 8. 쿠폰 시스템
- 관리자가 쿠폰 발급
- 고객이 Checkout에서 쿠폰 적용 확인

---

## 🛡️ 5. 권한 차단 확인

Firebase Console에서 **Rules Simulator**로 테스트:

1. ✅ 고객이 타인 주문 읽기 불가
2. ✅ 고객이 타인 리뷰 수정 불가
3. ✅ 고객이 메뉴 수정 불가
4. ✅ 고객이 Settings 수정 불가

---

## 🔄 6. 롤백 원칙

문제 발생 시 아래 순서로 롤백:

### 6-1: 즉시 Mock 모드로 전환
`.env.local`:
```env
VITE_USE_FIREBASE=false
```

### 6-2: Rules 롤백 (필요 시)
```bash
git checkout HEAD~1 firestore.rules storage.rules
firebase deploy --only firestore:rules,storage
```

### 6-3: Functions 롤백 (필요 시)
```bash
firebase functions:delete <function-name>
```

---

## 📝 7. 커밋 전략

단계별 커밋:

```bash
git add firestore.rules storage.rules firestore.indexes.json
git commit -m "feat(firebase): Add production security rules"

git add src/lib/orderStatus.ts
git commit -m "feat(core): Add OrderStatus normalization utility"

git add src/lib/admin/*.api.ts src/lib/coupons.api.ts
git commit -m "refactor(api): Remove hardcoded USE_FIREBASE flag"

git add firebase.json .firebaserc
git commit -m "chore(firebase): Configure Firebase deployment"
```

---

## ⚠️ 8. 주의사항

### Storage 버킷 값
❌ 잘못됨: `VITE_FIREBASE_STORAGE_BUCKET=hp-kal.firebasestorage.app`  
✅ 정답: `VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com`

### OrderStatus 통일
모든 주문 상태는 `src/lib/orderStatus.ts`의 `normalizeStatus()` 함수로 통일합니다.

표준 상태: `pending` | `accepted` | `preparing` | `completed` | `canceled`

---

## 🎯 9. 배포 후 확인 (5분 체크리스트)

- [ ] 새 주문 생성 성공 → `orders/{id}` 확인
- [ ] `/orders` 필터 정상 동작
- [ ] `/orders/:id` 추적 화면 진입 성공
- [ ] 리뷰 사진 업로드 (≤3MB) 성공
- [ ] 관리자 전환 후 `/admin/*` 접근 가능
- [ ] 메뉴 등록/편집/이미지 업로드 성공
- [ ] 쿠폰 발급→적용 플로우 완료
- [ ] 권한 차단 동작 확인 (타인 데이터 접근 불가)

---

## 🔐 10. 보안 규칙 요약

### Firestore Rules
- **Users**: 본인만 읽기/수정 가능, 관리자는 모든 권한
- **Orders**: 본인 읽기 가능, 관리자만 수정
- **Reviews**: 누구나 읽기, 본인만 작성/수정
- **Menus**: 누구나 읽기, 관리자만 수정
- **Coupons**: 본인 읽기, 관리자만 발급

### Storage Rules
- **리뷰 사진**: 본인만 업로드, 3MB 제한
- **메뉴 이미지**: 관리자만 업로드, 3MB 제한

---

## 📞 문제 해결

### 배포 실패
```bash
firebase deploy --only firestore:rules --debug
```

### 인덱스 미생성
```bash
firebase deploy --only firestore:indexes
# 대기 후 콘솔에서 "Build indexes" 클릭
```

### 권한 오류
Firebase Console → Authentication → Users에서 role 설정 확인

---

## ✨ 완료

배포 완료 후 `.env.local`의 `VITE_USE_FIREBASE=true`로 설정하여 실제 Firebase 연동을 활성화하세요!

