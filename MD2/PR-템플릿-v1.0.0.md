# v1.0.0 — 핵심 기능 구현 완료 (결제/쿠폰/배달비/주문내역/이미지파이프라인/FCM/관제)

## 요약

이번 PR은 현풍닭칼국수 PWA 배달앱의 v1.0.0 핵심 기능 7가지를 모두 구현한 것입니다:

### ✅ 구현 완료 기능

1. **결제(NICEPAY) 승인·망취소·환불**
   - Firebase Functions에서 NICEPAY API 연동
   - Idempotency 키 관리 (중복 결제 방지)
   - 서명 검증 (HMAC-SHA256)
   - 결제 금액 일치 검증

2. **체크아웃 쿠폰 적용/검증 + 스냅샷 저장**
   - 쿠폰 검증 로직 (최소 금액, 만료일, 사용 여부)
   - 체크아웃 페이지 쿠폰 UI 컴포넌트
   - 주문 시 쿠폰 스냅샷 저장

3. **거리기반 배달비(구간표/야간/불가권역 UX)**
   - 주소 → 좌표 변환 (Geocoding)
   - 거리 계산 및 구간별 배달비 계산
   - 야간 할증 및 무게 할증 지원
   - 배달 불가 지역 차단

4. **주문 내역/상세/재주문(품절·가격변경 경고)**
   - 주문 목록 페이지 (필터링, 무한 스크롤)
   - 주문 상세 페이지
   - 재주문 기능 (가격/재고 경고 포함)

5. **Storage Rules 강화 + 이미지 파이프라인(WebP/리사이즈/썸네일)**
   - Storage Rules 강화 (경로 스코프, MIME 타입, 파일 크기 제한)
   - Firebase Functions 이미지 변환 트리거
   - 썸네일 생성 (640px), 리사이즈 이미지 생성 (1200px)
   - WebP 포맷 변환 및 Cache-Control 설정

6. **FCM 주문상태 알림(딥링크/인박스)**
   - Firebase Functions 트리거 (`onOrderUpdated`)
   - FCM 토큰 관리 및 권한 요청
   - 포그라운드 메시지 리스너
   - 알림 인박스 페이지 및 딥링크 처리

7. **배달관제 API 연동(Provider/Webhook/HMAC/Idempotency/관제 UI)**
   - Pluggable Provider 시스템 (Mock/Provider A/Custom)
   - Firebase Functions Webhook 엔드포인트
   - HMAC-SHA256 서명 검증
   - Idempotency 처리
   - Firestore 실시간 구독 (useDeliveryTasks 훅)
   - 배달 관제 UI (관리자 대시보드)

---

## 변경 핵심

### Backend (Firebase Functions)
- **새로운 함수들**:
  - `createPayment`, `approvePayment`, `cancelPayment`, `refundPayment` (결제)
  - `onMenuImageFinalize` (이미지 변환)
  - `deliveryWebhook` (배달대행사 Webhook 수신)
  - `onOrderUpdated` (주문 상태 변경 → FCM 알림)

- **공통 유틸리티**:
  - `idempotency.ts`: Idempotency 키 관리
  - `signature.ts`: 서명 검증
  - `push.ts`: FCM 푸시 알림
  - `delivery/service.ts`: 배달 상태 전이 검증

### Frontend (React)
- **새로운 페이지/컴포넌트**:
  - `CouponApply.tsx`: 쿠폰 적용 UI
  - `AddressForm.tsx`: 주소 입력 및 Geocoding
  - `OrdersList.tsx`: 주문 목록
  - `OrderDetail.tsx`: 주문 상세 (재주문 기능 포함)
  - `Inbox.tsx`: 알림 인박스
  - `FCMInitializer.tsx`: FCM 초기화
  - `Delivery.tsx`: 배달 관제 UI (개선)

- **새로운 API/유틸리티**:
  - `orders.api.ts`: 주문 조회/재주문
  - `geo/geocode.ts`: Geocoding
  - `cart/deliveryFee.ts`: 배달비 계산
  - `delivery/provider.ts`: Provider 어댑터
  - `delivery/hooks.ts`: Firestore 실시간 구독

### Firestore 스키마/인덱스 확장
- **새로운 컬렉션**:
  - `deliveryTasks`: 배달 태스크
  - `deliveryEvents`: Webhook 이벤트 로그 (Idempotency)
  - `notifications`: 알림 기록
  - `idempotency_keys`: Idempotency 키 (결제/Webhook)

- **인덱스 추가**:
  - `orders`: `[userId asc, status asc, createdAt desc]`, `[userId asc, createdAt desc]`
  - `deliveryTasks`: `[status asc, updatedAt desc]`, `[orderId asc, updatedAt desc]`

### 보안 규칙 강화
- **Storage Rules**:
  - `orig_*`, `thumb_*`, `resized_*` 파일은 Functions만 생성
  - 파일 크기 제한 (5MB)
  - MIME 타입 검증 (`image/*`)

- **Firestore Rules**:
  - `deliveryTasks`, `deliveryEvents`: 관리자 읽기, Functions만 쓰기

---

## 릴리즈 체크리스트

### ✅ 사전 준비사항

- [ ] Functions 환경키 설정 (`functions:config:set`)
  ```bash
  firebase functions:config:set nicepay.endpoint="..." nicepay.mid="..." nicepay.key="..."
  firebase functions:config:set delivery.secret="..." delivery.allowed_ips="..."
  ```
- [ ] Frontend 환경 변수 설정 (`.env.local`)
  ```bash
  VITE_FIREBASE_VAPID_KEY=...  # FCM (선택사항)
  VITE_DELIVERY_PROVIDER=mock  # 또는 providerA
  ```
- [ ] Firestore 인덱스 배포
  ```bash
  firebase deploy --only firestore:indexes
  ```

### ✅ 배포 순서

1. [ ] Firestore 인덱스 및 규칙 배포
   ```bash
   firebase deploy --only firestore:indexes,firestore:rules
   ```

2. [ ] Storage Rules 배포
   ```bash
   firebase deploy --only storage
   ```

3. [ ] Functions 배포
   ```bash
   firebase deploy --only functions
   ```

4. [ ] Frontend 빌드 및 Hosting 배포
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### ✅ 배포 후 확인사항

- [ ] 스모크 6/6 재확인 (배포 환경)
  1. 로그인/인증
  2. 메뉴 이미지 업로드
  3. 장바구니 → 체크아웃
  4. 결제 플로우 (Mock)
  5. 주문 내역 조회
  6. 관리자 대시보드 접근

- [ ] GitHub Actions 자동 QA 이슈 생성 확인 (main 병합 후)
  - Actions 워크플로우가 실행되어 QA 이슈가 자동 생성되는지 확인

- [ ] 주요 기능 End-to-End 테스트
  - [ ] 결제 승인/망취소/환불
  - [ ] 쿠폰 적용 및 검증
  - [ ] 배달비 계산 (거리 기반)
  - [ ] 주문 내역/재주문
  - [ ] 이미지 업로드 → 파이프라인 동작
  - [ ] FCM 알림 수신 및 딥링크
  - [ ] 배달관제 실시간 업데이트

---

## QA 스냅샷 (필수 항목)

다음 항목에 대한 스크린샷/로그 캡처 필요:

1. **결제 승인/망취소/환불 happy-path & 에러 케이스 캡처**
   - 결제 인증 요청 성공
   - 결제 승인 성공
   - 결제 취소 성공
   - Idempotency 키 중복 요청 처리 (이전 응답 반환)

2. **쿠폰 최소금액/만료/중복/사용횟수 거절 메시지**
   - 최소 주문 금액 미달 시 에러 메시지
   - 만료된 쿠폰 거절 메시지
   - 이미 사용된 쿠폰 거절 메시지
   - 유효한 쿠폰 적용 성공 화면

3. **0.9/2/4.5km 배달비 산정 및 불가권역 차단 화면**
   - 0.9km: 3,000원
   - 2km: 4,000원
   - 4.5km: 5,000원
   - 배달 불가 지역 입력 시 경고 메시지 및 배달비 0원 표시

4. **재주문 시 품절/가격변경 경고 모달**
   - 가격 변경 경고 Toast
   - 품절 항목 차단 및 에러 Toast
   - 재주문 성공 시 장바구니 이동

5. **이미지 업로드 → orig/thumb/resized 생성/교체 로그**
   - Functions 로그에서 `onMenuImageFinalize` 트리거 확인
   - Storage에 `orig_*`, `thumb_640_*`, `resized_1200_*` 파일 생성 확인
   - 이미지 교체 시 기존 파일 삭제 확인

6. **FCM 수신/딥링크 인앱 이동**
   - 브라우저 알림 표시
   - 알림 클릭 시 `/orders/{orderId}` 페이지로 이동
   - 알림 인박스에서 읽음/삭제 기능

7. **배달관제 실시간 업데이트**
   - Firestore 실시간 구독 동작 확인
   - 배달 상태 변경 시 UI 자동 업데이트
   - Webhook 서명 검증 실패 시 에러 처리

---

## 관련 문서

- [전체 작업 완료 보고서](./2025-01-30-전체작업완료보고서.md)
- [결제 승인/망취소/환불 완료 보고서](./2025-01-30-결제-승인-망취소-환불-완료보고서.md)
- [쿠폰 체크아웃 검증로직 완료 보고서](./2025-01-30-쿠폰-체크아웃-검증로직-완료보고서.md)
- [배달비 거리기반 설계 및 테스트](./2025-01-30-배달비-거리기반-설계및테스트.md)
- [주문내역 재주문 테스트케이스](./2025-01-30-주문내역-재주문-테스트케이스.md)
- [이미지 파이프라인 완료 보고서](./2025-01-30-이미지-파이프라인-완료보고서.md)
- [FCM 주문상태 알림 완료 보고서](./2025-01-30-FCM-주문상태-알림-완료보고서.md)
- [배달관제 연동 적용 보고서](./2025-01-30-배달관제-연동-적용-보고서.md)

---

## 라벨

`release`, `report`, `qa-check`

---

## 이슈 링크

MD2 완료보고서 일괄 참조 (위 관련 문서 섹션 참고)

