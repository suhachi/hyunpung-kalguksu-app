# 현풍닭칼국수 PWA 배달앱

현풍닭칼국수 브랜드 아이덴티티를 기반으로 개발된 완전한 PWA (Progressive Web App) 배달 주문 시스템입니다.

## 📱 현재 개발 상태

### ✅ Phase 1: 완료
- 라우팅 구조 및 기본 레이아웃
- Firebase 설정 (연동 대기 중)
- 브랜드 디자인 시스템 적용

### ✅ Phase 2-1: 완료
- 장바구니 시스템 (Context API)
- 메뉴 목록 / 상세 / 옵션 선택
- 실시간 금액 계산

### ✅ Phase 2-2: 완료
- NICEPAY 결제 연동 코드 (Firebase 연동 대기)
- 주문 추적 페이지
- Firebase Functions (결제 승인/취소)

### ✅ Phase 2-3: 완료
- 리뷰 시스템 (별점/사진 업로드)
- 보상 쿠폰 발급 (사진 리뷰 3,000원)
- 리뷰 목록 & 필터

### ✅ Phase M0: 완료
- 관리자 대시보드 스켈레톤
- AdminLayout (TopBar, SideNav)
- 권한 가드 (mockAuth)
- 공통 컴포넌트 (StatCard, DataTable, Modal)

### ✅ Phase 2-4: 완료
- 관리자 리뷰 대시보드 (/admin/reviews)
- 리뷰 목록 (필터/정렬/페이지네이션)
- 답글 작성/수정/삭제
- 리뷰 신고 (중복 방지)
- 통계 대시보드 (평균 평점, 별점 분포)

### ✅ Phase 2-5: 완료
- 관리자 주문 대시보드 (/admin/orders)
- 실시간 주문 목록 (필터/정렬/검색)
- 상태 전이 (pending→accepted→preparing→completed|canceled)
- 취소 사유 입력 & 환불 처리
- 주문 상세 드로어 (타임라인/로그)
- 감사 로그 추적 (담당자/시각/사유)
- Firebase Functions 통합 (푸시 알림 자리표시자)

### ✅ Phase 2-6: 완료
- 관리자 메뉴 관리 (/admin/menus)
- 메뉴 목록 (카테고리 필터/검색/정렬)
- 품절/판매 토글 (즉시 반영)
- 시간제 판매 설정 (시작/종료 시간)
- 가격/설명 수정 (변경 로그)
- 상태 자동 계산 (시간 기준)
- 통계 대시보드 (전체/판매중/품절/시간외)

### ✅ Phase 2-7: 완료
- 관리자 설정 관리 (/admin/settings)
- 영업시간 설정 (요일별/전체 적용)
- 배달비 설정 (거리 구간별)
- 최소 주문 금액 (배달/포장)
- KS컴퍼니 크레딧 카드 (고정 정보)
- 변경사항 추적 (저장/되돌리기)

### ✅ Phase 2-8: 완료
- 고객 쿠폰함 (/coupons)
- 관리자 쿠폰 발급 (/admin/promotions)
- 쿠폰 통계 및 상태별 필터
- 사진 리뷰 보상 쿠폰 (3,000원)

### ✅ Phase 2-9: 완료
- 관제 대시보드 (/admin/analytics)
- KPI 카드 5종 (매출/주문/평점/설치율/전환율)
- 차트 3종 (일별 매출/시간대별 주문/메뉴Top5)
- 집계 정보 및 리포트 안내

### 📊 Phase 2 전체 요약 (2-1 ~ 2-9) ✅ 완료
**완성된 기능**: 고객 주문 전체 플로우 + 관리자 운영 대시보드  
**구현된 페이지**: 16개 (고객 9개 + 관리자 7개)  
**Mock 데이터**: 완전히 동작하는 데모 (USE_FIREBASE=false)  
**브랜드 적용**: 5개 컬러 시스템 완벽 일관성  
**개발사 정보**: KS컴퍼니 크레딧 모든 화면 표시  
**체크리스트**: 피그마 확인용 전체 체크리스트 작성 완료

### ✅ Phase 3-1: 완료
- GPS 배달 추적 시스템
- 배달 대행사 Provider 어댑터 패턴
- Mock/실제 API 전환 가능
- 실시간 배달원 위치 추적
- 관리자 배달 관제 페이지

### ✅ Phase 3-2: 완료
- 고객센터 1:1 채팅 시스템
- 실시간 메시지 동기화
- 읽음 상태 관리
- 파일 첨부 지원
- 관리자 채팅 관리 페이지

### ✅ 환경 변수 시스템 개선: 완료
- 안전한 환경 변수 접근 (`getEnv` 헬퍼)
- `.env.example` 템플릿 제공
- `.gitignore` 보안 설정
- 중앙 관리 시스템 (`config/env.ts`)

### 🔄 다음 단계 (Phase 3-3)
- 포인트 리워드 시스템 구현
- 이미지 최적화 & 성능 튜닝
- PWA 매니페스트 검증 (Lighthouse 90+)
- Firebase Hosting 배포

## 🚀 실행 방법

### 앱 접근 경로

- **배달앱 PWA**: `/` (기본 화면) ← 고객용 메인 앱
- **관리자 대시보드**: `/admin` ← 사장님/관리자용 (권한 필요)
- **브랜드 가이드**: `/brand` ← 브랜드 아이덴티티 가이드라인
- **개발자 도구**: `/dev` ← 권한 전환 (개발용, 프로덕션 제거 필요)

### 1. 빠른 시작 (로컬 개발)

**환경 변수 설정**:
```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env
```

기본 설정 (`.env`):
```env
# Mock 모드로 개발 (Firebase 불필요)
VITE_USE_FIREBASE=false

# Phase 3 기능 테스트 활성화
VITE_DELIVERY_ENABLED=true
VITE_DELIVERY_PROVIDER=mock
VITE_SUPPORT_ENABLED=true
VITE_POINTS_ENABLED=true
```

**개발 서버 실행**:
```bash
npm install
npm run dev
```

현재 `USE_FIREBASE = false`로 설정되어 있어 Firebase 없이 로컬 개발이 가능합니다:
- 메뉴 탐색 ✅
- 장바구니 담기 ✅
- 옵션 선택 ✅
- 결제 플로우 UI ✅
- 주문 데이터 localStorage 저장 ✅

### 2. Firebase 연동 시

Firebase 프로젝트를 생성한 후 `.env` 파일 수정:

```env
# Firebase 활성화
VITE_USE_FIREBASE=true

# Firebase 설정 (Firebase Console에서 확인)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# NICEPAY 설정 (프로덕션)
VITE_NICEPAY_MID=your_mid
VITE_NICEPAY_CLIENT_KEY=your_client_key
```

**Firebase Functions 배포**:
```bash
cd functions
npm install
firebase deploy --only functions
```

**자세한 환경 변수 가이드**: [`docs/03-development/환경변수-설정가이드.md`](docs/03-development/환경변수-설정가이드.md)

## 📂 프로젝트 구조

```
├── /pages/
│   ├── /app/                 # 고객용 PWA 페이지
│   │   ├── Home.tsx          # 홈 화면
│   │   ├── MenuList.tsx      # 메뉴 목록
│   │   ├── MenuDetail.tsx    # 메뉴 상세
│   │   ├── Cart.tsx          # 장바구니
│   │   ├── Checkout.tsx      # 결제
│   │   ├── OrderTracking.tsx # 주문 추적
│   │   ├── ReviewWrite.tsx   # 리뷰 작성
│   │   └── ReviewList.tsx    # 리뷰 목록
│   │
│   ├── /admin/               # 관리자 대시보드
│   │   ├── /_layout/
│   │   │   └── AdminLayout.tsx  # 관리자 레이아웃
│   │   ├── Dashboard.tsx     # 대시보드 (KPI)
│   │   ├── Orders.tsx        # 주문 관리
│   │   ├── Reviews.tsx       # 리뷰 관리
│   │   ├── Menus.tsx         # 메뉴 관리
│   │   └── Settings.tsx      # 설정
│   │
│   └── DevTools.tsx          # 개발자 도구 (권한 전환)
│
├── /components/
│   ├── /app/                 # 앱 전용 컴포넌트
│   ├── /admin/common/        # 관리자 공통 컴포넌트
│   │   ├── StatCard.tsx      # KPI 카드
│   │   ├── DataTable.tsx     # 데이터 테이블
│   │   └── Modal.tsx         # 모달
│   ├── /shared/              # 공통 컴포넌트
│   │   └── Credits.tsx       # 개발사 정보
│   ├── /ui/                  # shadcn UI 컴포넌트
│   └── /icons/               # 커스텀 아이콘
│
├── /contexts/
│   └── CartContext.tsx       # 장바구니 상태 관리
│
├── /lib/
│   ├── auth.ts              # 권한 관리 (mockAuth)
│   ├── firebase.ts          # Firebase 설정
│   ├── nicepay.ts           # NICEPAY 결제
│   └── imageUtils.ts        # 이미지 처리 (리사이징/WebP)
│
├── /types/
│   ├── cart.ts              # 장바구니 타입
│   ├── order.ts             # 주문 타입
│   ├── review.ts            # 리뷰 타입
│   ├── coupon.ts            # 쿠폰 타입
│   └── payment.ts           # 결제 타입
│
├── /functions/              # Firebase Functions
│   └── src/index.ts         # 결제/리뷰/쿠폰 서버 로직
│
├── /data/
│   └── menus.json           # 메뉴 Mock 데이터
│
└── /docs/                   # 문서
    ├── 01-planning/         # 기획서
    ├── 02-design/           # 디자인 가이드
    ├── 03-development/      # 개발 가이드
    ├── 04-operations/       # 운영 체크리스트
    └── 05-company/          # 개발사 정보
```

## 🎨 브랜드 컬러

- **현풍레드** `#D61C1C` - 메인 CTA, 강조
- **신칼오렌지** `#F37021` - 서브 액센트
- **황동식기색** `#C7A45A` - 포인트, 프리미엄
- **먹색** `#2E1C10` - 텍스트, 타이포

## 🛠 기술 스택

### 프론트엔드
- React 18 + TypeScript
- React Router v6
- Tailwind CSS v4
- shadcn/ui 컴포넌트
- Context API (상태 관리)

### 백엔드 (Firebase)
- Firebase Authentication
- Cloud Firestore
- Cloud Storage
- Cloud Functions
- Cloud Messaging (FCM)

### 결제
- NICEPAY 결제 모듈
- Firebase Functions (서버 인증)

## 📋 주요 기능

### 고객용 PWA
- [x] QR 코드 스캔 → 앱 설치
- [x] 메뉴 탐색 및 검색
- [x] 옵션 선택 (면양/맵기/토핑)
- [x] 장바구니 관리
- [x] 배달/포장 선택
- [x] 결제 (NICEPAY)
- [x] 실시간 주문 추적
- [x] 리뷰 작성 (별점/사진 업로드)
- [x] 사진 리뷰 쿠폰 (3,000원)
- [ ] 쿠폰 적용 (결제 시)
- [ ] 주문 내역

### 관리자 대시보드
- [x] 레이아웃 & 네비게이션
- [x] KPI 대시보드 (매출/주문/평점/설치율)
- [x] 권한 가드 (mockAuth)
- [x] 리뷰 관리 & 답글 (Phase 2-4 ✅)
  - [x] 리뷰 목록 (필터/정렬/페이지네이션)
  - [x] 통계 (평균 평점, 별점 분포)
  - [x] 답글 작성/수정/삭제
  - [x] 리뷰 신고 (중복 방지)
  - [x] 리뷰 숨김 처리
- [x] 실시간 주문 관리 (Phase 2-5 ✅)
  - [x] 주문 목록 (필터/검색/정렬)
  - [x] 상태 전이 (상태머신)
  - [x] 취소 사유 입력
  - [x] 주문 상세 드로어
  - [x] 감사 로그
- [x] 메뉴 관리 (Phase 2-6 ✅)
  - [x] 메뉴 목록 (카테고리/검색/정렬)
  - [x] 품절 토글
  - [x] 시간제 판매 설정
  - [x] 가격/설명 수정
  - [x] 변경 로그
- [x] 설정 관리 (Phase 2-7 ✅)
  - [x] 영업시간 설정 (요일별)
  - [x] 배달비 설정 (거리 구간별)
  - [x] 최소 주문 금액
  - [x] KS컴퍼니 크레딧 카드
- [x] 쿠폰/프로모션 (Phase 2-8 ✅)
  - [x] 고객 쿠폰함
  - [x] 관리자 쿠폰 발급
  - [x] 쿠폰 통계
- [x] 관제/메트릭 (Phase 2-9 ✅)
  - [x] KPI 대시보드
  - [x] 차트 3종
  - [x] 집계 정보

## 🔐 개발사 정보

**KS컴퍼니**
- 사업자번호: 553-17-00098
- 대표: 석경선
- 공동대표: 배종수

모든 앱 화면, 대시보드, 영수증, 고지 문서에 일관되게 표시됩니다.

## 📄 라이선스

© 2024 KS컴퍼니. All rights reserved.

---

**개발 문의**: docs/05-company/01-개발사_정보.md 참고
