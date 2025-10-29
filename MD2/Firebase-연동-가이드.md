# Firebase 연동 가이드

**작성일**: 2025년 10월 29일  
**프로젝트**: 현풍칼국수 배달앱

---

## 📋 필요한 정보 체크리스트

Firebase 프로젝트를 생성하고 연동하기 위해 다음 정보가 필요합니다.

---

## 🔑 1. Firebase 프로젝트 기본 정보

Firebase Console (https://console.firebase.google.com)에서 프로젝트를 생성한 후, 다음 정보를 받아야 합니다:

### 환경 변수 (.env.local)

```env
# Firebase 연동 활성화
VITE_USE_FIREBASE=true

# Firebase 프로젝트 설정
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# NICEPAY 결제 시스템 (샌드박스)
VITE_NICEPAY_MID=NICE_DEV_MID
VITE_NICEPAY_CLIENT_KEY=NICE_DEV_KEY

# 배달 대행사 Provider A (선택사항)
VITE_PROVIDER_A_API_URL=https://api.provider-a.example.com
VITE_PROVIDER_A_API_KEY=your-api-key
VITE_PROVIDER_A_MERCHANT_ID=your-merchant-id

# Phase 3 기능 토글
VITE_DELIVERY_ENABLED=true
VITE_DELIVERY_PROVIDER=mock
VITE_DELIVERY_WEBHOOK_SECRET=change_me_to_secret_value
VITE_SUPPORT_ENABLED=true
VITE_POINTS_ENABLED=true
VITE_POINTS_RATE=0.03
VITE_POINTS_MIN_USE=1000
VITE_POINTS_EXPIRE_DAYS=365
```

### Firebase 설정 정보 얻는 방법

1. Firebase Console → 프로젝트 설정
2. 일반 탭 → 앱 → 웹 앱 추가
3. 설정 정보 복사

---

## 🗄️ 2. Firestore 데이터베이스 설정

### 필수 Collections 구조

프로젝트에는 이미 Firestore Rules와 Indexes가 준비되어 있습니다:

#### **이미 설정된 Rules**:
- ✅ Users
- ✅ Stores  
- ✅ Menus
- ✅ Orders
- ✅ Coupons
- ✅ Reviews
- ✅ Deliveries (GPS 추적)
- ✅ Chat Sessions (1:1 채팅)
- ✅ Points System (포인트 시스템)

#### **필요한 인덱스 (자동 생성됨)**:
- ✅ Orders (storeId + status + createdAt)
- ✅ Orders (userId + createdAt)
- ✅ Reviews (storeId + rating + createdAt)
- ✅ Deliveries (status + updatedAt)
- ✅ Points Ledger (uid + at DESC)

---

## 📦 3. Firebase Storage 설정

### Storage Rules

이미 `src/storage.rules` 파일에 설정이 준비되어 있습니다:

```javascript
// 이미지 업로드 규칙
match /images/{allPaths=**} {
  allow read: if true;
  allow write: if request.auth != null &&
               request.resource.size < 5 * 1024 * 1024 &&
               request.resource.contentType.matches('image/.*');
}
```

### 버킷 이름 확인

Firebase Console → Storage → 설정에서 버킷 이름을 확인하세요.

---

## ☁️ 4. Firebase Functions 설정

Functions 폴더가 이미 `src/functions/` 에 준비되어 있습니다.

### Functions 실행 환경

```bash
# Functions 폴더로 이동
cd src/functions

# 의존성 설치
npm install

# 로컬 테스트
npm run serve
```

### Functions 환경 변수 설정

Firebase Console → Functions → 환경 변수에서 다음을 설정:

```env
# Functions 전용 환경 변수
NICEPAY_KEY=your-nicepay-key
NICEPAY_MID=your-nicepay-mid
PROVIDER_A_API_URL=https://api.provider-a.com
PROVIDER_A_API_KEY=your-api-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

---

## 🔐 5. Authentication 설정

### 활성화할 Authentication 방법

Firebase Console → Authentication → 로그인 방법에서 활성화:

1. ✅ **이메일/비밀번호** (필수)
2. ✅ **익명 인증** (선택)
3. ✅ **구글 로그인** (선택)

### Custom Claims 설정

관리자 권한을 부여하려면 Functions에서 Custom Claims를 설정해야 합니다:

```typescript
// Functions: onUserCreated
admin.auth().setCustomUserClaims(uid, {
  role: 'admin'
});
```

---

## 📊 6. Firebase Analytics (선택)

### Measurement ID

- Firebase Console → Analytics
- Measurement ID를 `.env.local`에 추가

---

## 🔔 7. FCM (Firebase Cloud Messaging)

### 서비스 워커 설정

이미 `src/firebase-messaging-sw.js` 파일이 준비되어 있습니다.

### Cloud Messaging 설정

1. Firebase Console → Cloud Messaging
2. 웹 푸시 인증서 다운로드
3. `manifest.json`에 설정 추가

---

## 🚀 8. 배포 준비 사항

### .env.local 파일 생성

루트 디렉토리에 `.env.local` 파일을 생성하세요:

```bash
# 프로젝트 루트에 생성
.env.local
```

### Firebase CLI 설치

```bash
npm install -g firebase-tools
firebase login
```

### Firebase 프로젝트 초기화

```bash
firebase init

# 선택할 항목:
# ✅ Firestore
# ✅ Storage
# ✅ Functions
# ✅ Hosting
# ✅ Emulators
```

---

## 📝 9. 필요한 파일 체크리스트

### 이미 준비된 파일 ✅

- ✅ `src/lib/firebase.ts` - Firebase 초기화
- ✅ `src/config/env.ts` - 환경 변수 관리
- ✅ `src/firebase.json` - Firebase 설정
- ✅ `src/firestore.rules` - Firestore 보안 규칙
- ✅ `src/firestore.indexes.json` - Firestore 인덱스
- ✅ `src/storage.rules` - Storage 보안 규칙
- ✅ `src/routes.ts` - 라우트 상수
- ✅ `src/lib/auth.ts` - 인증 유틸

### 생성해야 할 파일

1. `.env.local` - 환경 변수 (로컬)
2. `.firebaserc` - Firebase 프로젝트 ID (firebase init으로 생성됨)

---

## 🔧 10. 연동 순서

### Step 1: Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com)
2. 프로젝트 추가
3. 프로젝트 ID 기록

### Step 2: 환경 변수 설정

1. 루트 디렉토리에 `.env.local` 생성
2. Firebase Console에서 설정 복사
3. 환경 변수 채우기

### Step 3: Firebase CLI 초기화

```bash
# Firebase CLI 로그인
firebase login

# Firebase 초기화
firebase init

# src/firebase.json 위치 지정
```

### Step 4: Firestore Database 생성

1. Firebase Console → Firestore Database
2. 프로덕션 모드로 시작
3. 위치: `asia-northeast3` (서울)

### Step 5: Rules 및 Indexes 배포

```bash
# Rules 배포
firebase deploy --only firestore:rules

# Indexes 배포
firebase deploy --only firestore:indexes
```

### Step 6: Storage 버킷 생성

1. Firebase Console → Storage
2. 시작하기
3. 위치: `asia-northeast3`

### Step 7: Functions 배포

```bash
cd src/functions
npm install
cd ../..

# Functions 배포
firebase deploy --only functions
```

### Step 8: Hosting 배포

```bash
# 빌드
npm run build

# 배포
firebase deploy --only hosting
```

---

## ⚠️ 11. 주의사항

### 환경 변수 보안

- ❌ `.env.local`은 Git에 커밋하지 마세요
- ✅ `.gitignore`에 추가되어 있습니다

### Mock 모드 전환

개발 중에는 Mock 모드를 사용하세요:

```env
VITE_USE_FIREBASE=false  # Mock 모드
```

### 프로덕션 배포 전 확인

1. ✅ Firestore Rules 검증
2. ✅ Storage Rules 검증
3. ✅ Functions 로그 확인
4. ✅ Analytics 확인

---

## 📞 12. 문의 및 지원

문제가 발생하면 다음을 확인하세요:

1. Firebase Console → 프로젝트 설정
2. `npm run build` 실행 결과
3. Firebase CLI `firebase --version` 확인
4. Chrome DevTools → Console 에러 확인

---

## 🎯 다음 단계

1. Firebase 프로젝트 생성
2. `.env.local` 파일 생성 및 설정
3. `firebase init` 실행
4. Firestore Database 생성
5. Storage 버킷 생성
6. Rules 및 Indexes 배포
7. Functions 배포
8. Hosting 배포
9. 프로덕션 검증

---

**준비 완료!** 🚀

이제 실제 Firebase 프로젝트를 생성하고 환경 변수를 설정하면 즉시 연동할 수 있습니다.
