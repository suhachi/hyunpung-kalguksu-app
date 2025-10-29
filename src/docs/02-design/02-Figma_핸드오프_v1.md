# Figma – 디자인·기능 통합 핸드오프 (v1)

> 목적: 피그마 팀이 **디자인+프로토+핸드오프**를 한 번에 완성하도록 단계별로 정리한 실행 문서.  
> 산출물: Design Tokens, 컴포넌트, 페이지 11화면, 상태/예외, 프로토, Export, Usage Docs.

---

## Phase 0. 세팅 & 스탠다드

* 파일구조: `00_Foundation` `10_Components` `20_Pages_App` `30_Pages_Admin` `40_Prototypes` `90_Docs`
* Variables: Colors/Type/Radius/Spacing/Shadow/Breakpoints = **Design Tokens** 동기화(JSON)
* Grid: 모바일 4/8pt, 데스크탑 12컬럼; 카드 라운드 **16px**
* Typography: 본문 Pretendard 14/16, 섹션 18/20, 타이틀 24/28; 손글씨 아트는 타이틀만
* 아이콘: 24px/1.5px/라운드, Outlined 기본, Duo‑Tone Variant 제공(Primary 12%/Accent 16%)

### Export 규칙

* SVG: `ic-*.svg`(outline 유지), PNG 1x/2x, Lottie(json)
* 이미지: WebP 1080 정사각, 품질 80

---

## Phase 1. 토큰 & 컴포넌트(Atoms→Organisms)

### 1.1 Design Tokens(Variables)

* Colors: primary `#D61C1C`, secondary `#F37021`, ink `#2E1C10`, bg `#F9F6F3`, accent `#C7A45A`
* States: success `#198754`, warning `#F59E0B`, danger `#DC2626`, info `#2563EB`
* Radius: 4/8/12/**16**/24; Shadow: soft‑1/2
* Spacing scale: 4/8/12/16/20/24/32

### 1.2 Components

* Buttons(Primary/Secondary/Outline), Inputs, Select, Radio/Checkbox, Tabs, Badge, Toast, Modal, BottomSheet, Skeleton
* Cards: Menu, Category, Review, Notice; Timeline(Status)
* Banners: A2HS, Offline, Update
* States: 품절/시간제/망취소/결제오류/권한부족

### 1.3 아이콘 24종

* 닭/황동그릇/면발/수증기/김치/대추수삼/수육/얼음/칠리/포장/스쿠터/쿠폰/QR/리뷰별/카메라/영수증/벨/프린터/차트/시간/잠금/핀/정보

> **체크**: 24px 그리드, Stroke 1.5px, Round cap/join, Halo 옵션(사진 위)

---

## Phase 2. 앱(모바일) 7화면

1. 홈: 히어로/추천/공지/설치배너
2. 목록: 카테고리 탭, 베스트/시그니처/매운/냉/품절 뱃지
3. 상세: 옵션(면양/맵기/토핑), 세트 업셀, 알러지/원산지
4. 장바구니: 쿠폰/배달·포장, 요청사항, 최소주문/배달비
5. 결제: NICEPAY 호출, 약관, 승인 대기/망취소/오류 상태
6. 추적: 타임라인/ETA/문의, 상태별 아이콘
7. 리뷰: 별점/텍스트/사진, 보상쿠폰 뱃지

**에지케이스 프레임**: 오프라인, 설치전/후, 품절/시간제, 결제 실패/망취소, 푸시 차단, 긴 메뉴명

---

## Phase 3. 대시보드 4화면

1. 대시보드: KPI 카드, 영업 토글, 새주문 벨/프린터 상태
2. 주문관리: 상태 전환/취소/타임아웃, 영수증 프린트
3. 메뉴관리: CRUD, 옵션/세트, CSV 업로드/롤백, 품절/시간제
4. 프로모션: 쿠폰/배너/푸시 캠페인, 템플릿(날씨/시간대)

---

## Phase 4. 프로토타입 & 상호작용

* 플로우: QR→설치→온보딩→주문→결제→추적→리뷰(푸시)
* 트리거: `onClick`, `onSwipe`, `onTimer`(로딩→상태 전이), `onNetwork`(오프라인 배너)
* 애니메이션: 버튼 프레스(80ms), Lottie 완료(0.8s), 토스트(2.4s)

---

## Phase 5. 사양서 & 핸드오프

* 레드라인: 컬러/간격/라운드/타이포/아이콘/상태/모션 표
* Handoff 표: 페이지별 Props/상태/이벤트/에러/카피 키
* Export: 아이콘 SVG/PNG, Lottie json, 이미지 WebP, 배너 일러스트

---

## Phase 6. QA & 접근성

* WCAG 대비 4.5:1, 포커스/키보드, 스크린리더 레이블
* 이미지 대체텍스트, 상태 아이콘+텍스트 병행

---

## Phase 7. 산출물 리스트(완료 기준)

* [ ] Design Tokens(JSON & Variables)
* [ ] Icon 24종(Outlined/Duo‑Tone/States)
* [ ] Components & Variants(상태 매트릭스)
* [ ] App 7화면 + Edge cases
* [ ] Admin 4화면
* [ ] Prototype 링크(모바일/데스크탑)
* [ ] Export 패키지(SVG/PNG/WebP/Lottie)
* [ ] Handoff 표(Props/이벤트/상태/카피 키)

---

### 부록 A. 이름 규칙 & 주석

* 네이밍: `Page/Section/Cmp:Variant.State.Size`
* 주석: 좌표/간격 단위(px), 정렬 기준, 오토레이아웃 방향

### 부록 B. 카피 리소스 키(예시)

* `copy.home.hero_line`, `copy.menu.badge_best`, `copy.order.timeline.accepted`, `copy.toast.offline`, `copy.pay.failed`, `copy.review.reward`

### 부록 C. 디자인 점검 체크리스트

* 토큰 일치성, 아이콘 규격, 에지케이스 반영, 설치/오프라인/망취소 화면, 접근성, Export 세트 누락 없음

---

**문서 버전**: v1  
**작성일**: 2024-10-28  
**작성자**: KS컴퍼니
