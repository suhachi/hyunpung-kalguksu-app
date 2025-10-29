# ✅ Firebase 배포 준비 완료

## 📦 생성된 파일 목록

### 루트 디렉토리
- ✅ `firestore.rules` - 프로덕션용 Firestore 보안 규칙
- ✅ `storage.rules` - Storage 보안 규칙 (3MB 제한)
- ✅ `firestore.indexes.json` - 필수 인덱스 (orders, reviews, menus, coupons)
- ✅ `firebase.json` - Firebase 설정
- ✅ `.firebaserc` - 프로젝트 ID (hp-kal)

### 소스 파일
- ✅ `src/lib/orderStatus.ts` - OrderStatus 정규화 유틸
- ✅ 수정된 API 파일들:
  - `src/lib/admin/orders.api.ts`
  - `src/lib/admin/reviews.api.ts`
  - `src/lib/admin/menus.api.ts`
  - `src/lib/admin/analytics.api.ts`
  - `src/lib/admin/optionGroups.api.ts`
  - `src/lib/admin/settings.api.ts`
  - `src/lib/coupons.api.ts`
  - `src/lib/analytics.ts`
  - `src/lib/functions.ts`

## 🔧 변경 사항 요약

### 1. USE_FIREBASE 하드코딩 제거
모든 파일에서 `const USE_FIREBASE = false;` 하드코딩을 제거하고 `import { USE_FIREBASE } from '../../config/env';`로 통일했습니다.

### 2. 환경 변수 기반 전환
이제 `.env.local`의 `VITE_USE_FIREBASE` 값만 변경하면 Mock/Firebase 모드를 전환할 수 있습니다.

## 🚀 배포 명령어

```bash
# 1. Firebase CLI 인증
firebase login
firebase use hp-kal

# 2. Rules & Indexes 배포
firebase deploy --only firestore:rules
firebase deploy --only storage
firebase deploy --only firestore:indexes

# 3. 앱 빌드 및 호스팅
npm run build
firebase deploy --only hosting
```

## ⚙️ 환경 변수 설정

`.env.local` 파일 생성:

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

## 🔐 보안 규칙 요약

### Firestore Rules
- **Users**: 본인 읽기/수정, 관리자 모든 권한
- **Orders**: 본인 읽기, 관리자 읽기/수정
- **Reviews**: 누구나 읽기, 본인 작성/수정
- **Menus**: 누구나 읽기, 관리자만 수정
- **Coupons**: 본인 읽기, 관리자 발급

### Storage Rules
- **리뷰 사진**: 본인만 업로드, 3MB 제한
- **메뉴 이미지**: 관리자만 업로드, 3MB 제한

## 📝 OrderStatus 정규화

새로 생성된 `src/lib/orderStatus.ts`로 모든 주문 상태를 통일합니다:

```typescript
import { normalizeStatus, getStatusLabel } from '@/lib/orderStatus';

// 사용 예시
const status = normalizeStatus('ready'); // 'preparing'로 정규화
const label = getStatusLabel('ready'); // '준비중'으로 표시
```

표준 상태: `pending` | `accepted` | `preparing` | `completed` | `canceled`

## 🧪 배포 후 테스트 체크리스트

- [ ] 회원가입/로그인 → users/{uid} 생성 확인
- [ ] 주문 생성 → orders/{orderId} 생성 및 본인만 읽기 가능
- [ ] /orders 목록 필터 동작
- [ ] 리뷰 작성 (사진 3MB 이하) → Storage 업로드 성공
- [ ] 관리자 모드 전환 → /admin/* 접근 가능
- [ ] 메뉴 등록/편집/이미지 업로드
- [ ] 쿠폰 발급 및 적용
- [ ] 권한 차단 확인 (타인 데이터 접근 불가)

## 🔄 롤백 절차

문제 발생 시:

1. `.env.local`에서 `VITE_USE_FIREBASE=false`로 전환
2. 필요 시 `git revert`로 변경 사항 되돌리기
3. 재배포

## 📖 상세 가이드

전체 배포 가이드는 `Firebase-배포-가이드.md`를 참조하세요.

