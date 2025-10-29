# Firebase 배포 최종 점검 체크리스트

**작성일**: 2025년 1월 29일  
**상태**: 배포 전 필수 점검 항목

---

## 🔍 배포 전 필수 점검 항목

### ✅ 1. Storage 버킷 값 확인

**.env.local 파일**:
```env
VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com
```

❌ **잘못됨**: `hp-kal.firebasestorage.app` (도메인 형식)  
✅ **정답**: `hp-kal.appspot.com` (버킷 이름)

**확인 방법**:
```bash
# .env.local 파일 확인
cat .env.local | grep STORAGE_BUCKET
```

---

### ✅ 2. Auth 허용 도메인 확인

**Firebase Console → Authentication → Settings → Authorized domains**

다음 도메인이 추가되어 있어야 합니다:

- ✅ `hp-kal.web.app` (기본값)
- ✅ `hp-kal.firebaseapp.com` (기본값)
- ✅ 사용 중인 커스텀 도메인 (있는 경우)

**추가 방법**:
1. Firebase Console → Authentication → Settings
2. "Authorized domains" 섹션
3. "+ Add domain" 클릭
4. 도메인 입력

---

### ✅ 3. FCM WebPush (VAPID 키) - 선택사항

**푸시 알림 사용 시만 필요**

**설정 방법**:
1. Firebase Console → Cloud Messaging
2. Web configuration → Generate key pair
3. VAPID key 복사
4. `.env.local`에 추가:
   ```env
   VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
   ```

**참고**: Phase 3-6에서 상세 반영 예정 (현재는 선택사항)

---

### ✅ 4. Indexes 빌드 확인

**배포 후 필수 확인 사항**

**배포 명령어**:
```bash
firebase deploy --only firestore:indexes
```

**확인 방법**:
1. Firebase Console → Firestore → Indexes
2. 7개 인덱스가 "Enabling" 또는 "Enabled" 상태인지 확인
3. "Enabling" 상태인 경우 완료까지 대기 (몇 분~몇 시간 소요)

**필수 인덱스 목록**:
- [ ] `reviews` - storeId + createdAt
- [ ] `reviews` - storeId + rating
- [ ] `reviews` - storeId + hasPhoto + createdAt
- [ ] `orders` - userId + createdAt
- [ ] `orders` - storeId + status + createdAt
- [ ] `menus` - storeId + category + name
- [ ] `coupons` - userId + status + expiresAt

⚠️ **중요**: 인덱스 빌드 완료 전에는 해당 쿼리가 실패할 수 있습니다.

---

### ✅ 5. Rules 만료일 확인

**현재 규칙은 만료일이 없습니다** (적용 완료)

`firestore.rules` 파일:
```javascript
rules_version = '2';
// 만료일 설정 없음 (일반 규칙)
```

**참고**: 이전에 임시 규칙(expiration)을 사용했다면 현재 규칙으로 완전히 교체되었습니다.

---

### ✅ 6. SPA 리라이트 확인

**firebase.json**:
```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

✅ **상태**: 정상 설정됨 (모든 경로가 `/index.html`로 리라이트)

---

## 🚀 배포 명령어 (순서 중요)

```bash
# 1. Firebase CLI 로그인
firebase login

# 2. 프로젝트 선택
firebase use hp-kal

# 3. Firestore Rules 배포
firebase deploy --only firestore:rules

# 4. Storage Rules 배포
firebase deploy --only storage

# 5. Firestore Indexes 배포
firebase deploy --only firestore:indexes

# 6. 앱 빌드
npm run build

# 7. Hosting 배포
firebase deploy --only hosting
```

**예상 소요 시간**: 5-10분

---

## 🧪 5분 스모크 테스트 체크리스트

### 고객 앱 테스트 (4가지)

#### ✅ 1. 회원가입/로그인 → 메뉴 → 체크아웃 플로우
- [ ] 회원가입(이메일/Google)
- [ ] `/menu` 이동 → 메뉴 목록 표시
- [ ] 장바구니에 메뉴 추가
- [ ] `/checkout` 이동 (Mock 결제)
- [ ] 주문 생성 성공

#### ✅ 2. 주문 목록 및 상세
- [ ] `/orders` 탭 접근
- [ ] **진행중** 필터: pending/accepted/preparing 주문 표시
- [ ] **완료** 필터: completed 주문 표시
- [ ] `/order/:id` 상세 화면 진입

#### ✅ 3. 리뷰 작성 및 이미지 업로드
- [ ] 리뷰 작성 페이지 진입
- [ ] 3MB 이하 이미지 업로드
- [ ] 이미지 MIME 타입 확인 (image/*)
- [ ] 업로드 성공 확인

#### ✅ 4. 권한 차단 확인
- [ ] 타인의 주문 읽기 시도 → **거부됨**
- [ ] 타인의 리뷰 수정 시도 → **거부됨**
- [ ] 메뉴 수정 시도 → **거부됨**

### 관리자 앱 테스트 (3가지)

#### ✅ 5. 관리자 접근 가드
- [ ] `/admin/*` 경로 접근
- [ ] 관리자 권한 없으면 로그인 페이지로 리다이렉트
- [ ] Firebase Console에서 `users/{uid}.role = 'admin'` 또는 `'owner'` 설정
- [ ] 관리자 권한 후 `/admin/*` 접근 성공

#### ✅ 6. 메뉴 등록/편집
- [ ] `/admin/menus` 이동
- [ ] 메뉴 등록 (이름, 가격, 카테고리)
- [ ] 메뉴 이미지 업로드 (3MB 이하)
- [ ] 메뉴 편집 및 저장

#### ✅ 7. 쿠폰 발급 및 적용
- [ ] `/admin/promotions` 이동
- [ ] 쿠폰 발급 (할인액, 최소주문금액)
- [ ] 고객 계정에 쿠폰 할당
- [ ] 고객 앱에서 `/checkout` 페이지 열기
- [ ] 발급된 쿠폰 선택 및 적용 확인

---

## ⚠️ 알려진 리스크 및 대응

### 1. 푸시 알림 (Phase 3-6에서 반영)

**현재 상태**: 서비스 워커 미구현, VAPID 키 미설정

**대응**:
- 현재는 배포하지 않음
- Phase 3-6에서 FCM 연동 및 서비스 워커 구현 예정

**임시 우회**:
- Toast 알림으로 대체
- 또는 브라우저 기본 Notification API 사용

---

### 2. 과거 OrderStatus 키 잔존 가능성

**문제**:
- 일부 코드에 `ready`, `delivering`, `confirmed`, `cancelled` 등 과거 상태 키가 남아있을 수 있음

**대응**:
- `src/lib/orderStatus.ts`의 `normalizeStatus()` 함수 사용 필수
- 모든 주문 상태는 다음으로 통일:
  - `pending` (대기중)
  - `accepted` (접수됨)
  - `preparing` (준비중)
  - `completed` (완료)
  - `canceled` (취소)

**검증 방법**:
```bash
# 코드베이스 전체 검색
grep -r "ready\|delivering\|confirmed\|cancelled" src/ --include="*.ts" --include="*.tsx"
```

**적용 필요 파일** (확인 필요):
- `src/pages/app/Orders.tsx`
- `src/lib/admin/orders.api.ts`
- `src/pages/admin/Orders.tsx`

---

### 3. 인덱스 빌드 지연

**문제**: 인덱스 빌드가 완료되기 전까지 해당 쿼리 실패

**증상**:
- 주문 목록 조회 시 "Missing or insufficient permissions" 에러
- 리뷰 목록 조회 시 타임아웃

**대응**:
1. Firebase Console → Firestore → Indexes 확인
2. "Enabling" 상태인 경우 완료까지 대기 (콘솔에서 "Build index" 클릭)
3. 또는 임시로 인덱스 없이 쿼리 수정

---

### 4. Storage 업로드 권한

**문제**: 관리자 권한 없이 메뉴 이미지 업로드 시도 시 실패

**확인 사항**:
- Storage Rules에서 관리자 검증 로직
- Firestore의 `users/{uid}` 문서에 `role` 필드 존재 여부

**대응**:
```javascript
// storage.rules의 관리자 검증 로직
allow write: if request.auth != null 
             && exists(/databases/(default)/documents/users/$(request.auth.uid))
             && get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ['owner','admin']
```

---

## 🔍 추가 확인 사항

### 환경 변수 일치 여부
```bash
# .env.local 파일의 모든 Firebase 관련 변수 확인
cat .env.local | grep VITE_FIREBASE
```

**필수 변수 7개**:
- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` (hp-kal.firebaseapp.com)
- [ ] `VITE_FIREBASE_PROJECT_ID` (hp-kal)
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` (hp-kal.appspot.com)
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` (742663074507)
- [ ] `VITE_FIREBASE_APP_ID` (1:742663074507:web:dcc8fdabf58bd4bf48214e)
- [ ] `VITE_USE_FIREBASE` (true)

---

### 빌드 확인
```bash
npm run build
```

**확인 사항**:
- [ ] 빌드 성공 (에러 없음)
- [ ] `dist/` 디렉토리 생성
- [ ] `dist/index.html` 존재 확인

---

## ✅ 체크리스트 요약

### 배포 전 (5분)
- [ ] Storage 버킷 값 확인
- [ ] Auth 허용 도메인 확인
- [ ] 환경 변수 완성도 확인
- [ ] `npm run build` 성공

### 배포 중 (5분)
- [ ] firebase login 성공
- [ ] firebase use hp-kal 성공
- [ ] firestore:rules 배포 성공
- [ ] storage 배포 성공
- [ ] firestore:indexes 배포 성공
- [ ] hosting 배포 성공

### 배포 후 (10분)
- [ ] 인덱스 빌드 진행 확인
- [ ] 5분 스모크 테스트 완료
- [ ] 권한 차단 정상 동작
- [ ] 에러 로그 없음

---

## 📞 문제 발생 시

### 즉시 롤백
```bash
# .env.local 수정
VITE_USE_FIREBASE=false

# 또는 Git으로 되돌리기
git revert HEAD
git push
```

### 로그 확인
```bash
# Firebase Logs
firebase functions:log

# 브라우저 Console
F12 → Console 탭
```

---

**최종 확인 완료**: 배포 준비 ✅

