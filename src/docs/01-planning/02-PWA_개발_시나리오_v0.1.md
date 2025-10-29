# 현풍닭칼국수 PWA 배달앱 – 개발 시나리오 (v0.1)

> **목적**: 고객 PWA 앱의 전체 사용자 플로우를 상세히 정의  
> **범위**: QR 스캔 → 설치 → 주문 → 결제 → 추적 → 리뷰

---

## 1. QR 스캔 & 초기 진입

### 1.1 시나리오
고객이 테이블에 놓인 QR 코드를 스마트폰으로 스캔합니다.

### 1.2 플로우
```
QR 스캔
  ↓
https://brand.hyunpungkalguksu.com/app?table=T01
  ↓
[미설치 시] A2HS 배너 표시
[설치 시] 앱으로 즉시 전환
```

### 1.3 구현 요구사항
- [ ] QR 코드에 테이블 번호 포함 (`?table=T01`)
- [ ] 설치 여부 감지 (`window.matchMedia('(display-mode: standalone)')`)
- [ ] A2HS 배너 표시 (iOS/Android 분기)

---

## 2. A2HS 설치 프로세스

### 2.1 Android (Chrome)
1. 배너 표시: "홈 화면에 추가하고 빠르게 주문하세요"
2. 사용자가 "설치" 버튼 클릭
3. Chrome 네이티브 프롬프트 표시
4. 설치 완료 → 앱 아이콘 생성

### 2.2 iOS (Safari)
1. 배너 표시: "Safari 공유 버튼 > '홈 화면에 추가'"
2. 3단계 가이드 이미지 표시
3. 수동 설치 안내

### 2.3 설치 후 동작
- Local Storage에 `pwa_installed=true` 저장
- 배너 숨김
- 온보딩 화면으로 이동

---

## 3. 온보딩

### 3.1 Step 1: 위치 권한
```
"배달 가능 여부를 확인하려면 위치 권한이 필요해요"
[권한 허용] [건너뛰기]
```
- 허용 시: Geolocation API로 현재 위치 확인
- 거부 시: 주소 직접 입력으로 우회

### 3.2 Step 2: 배달/포장 선택
```
"어떻게 받으시겠어요?"
[배달 🚚] [포장 🛍️]
```
- Context에 `deliveryType` 저장
- 배달 선택 시: 주소 입력 화면
- 포장 선택 시: 가게 위치 안내

### 3.3 Step 3: 약관 동의
```
[필수] 이용약관 동의
[필수] 개인정보 처리방침 동의
[선택] 마케팅 수신 동의

[동의하고 시작하기]
```
- 전체 동의 체크박스
- 각 약관 펼쳐보기 링크
- 필수 미동의 시 진행 차단

### 3.4 완료 후
- Local Storage에 `onboarding_completed=true` 저장
- 홈 화면으로 이동

---

## 4. 홈 화면

### 4.1 레이아웃
```
┌─────────────────────┐
│  [Logo] 현풍닭칼국수  │ ← Header
├─────────────────────┤
│   🍜 히어로 이미지    │ ← 브랜드 비주얼
│  "정성을 담은 한 그릇"│
├─────────────────────┤
│ 🟢 영업중 (10:00-22:00) │ ← 영업 상태
├─────────────────────┤
│  오늘의 추천 메뉴 🌤️  │ ← 날씨/시간대 추천
│  [칼국수] [수육]      │
├─────────────────────┤
│  📢 공지사항          │
│  "신메뉴 출시..."     │
├─────────────────────┤
│  [메뉴 보기] 버튼     │ ← CTA
└─────────────────────┘
```

### 4.2 영업 상태 로직
```typescript
const now = new Date();
const hour = now.getHours();

if (hour >= 10 && hour < 22) {
  status = '영업중';
  color = 'green';
} else if (hour >= 9 && hour < 10) {
  status = '준비중';
  color = 'yellow';
} else {
  status = '영업종료';
  color = 'gray';
}
```

### 4.3 추천 메뉴 로직
```typescript
// 날씨 기반
if (weather === 'rainy' || temp < 10) {
  recommend = ['얼큰닭칼국수', '닭곰탕칼국수'];
} else if (temp > 25) {
  recommend = ['냉닭칼국수', '닭비빔칼국수'];
}

// 시간대 기반
if (hour >= 11 && hour < 14) {
  recommend = ['현풍닭칼국수 세트']; // 점심 세트
}
```

---

## 5. 메뉴 목록

### 5.1 카테고리 탭
```
[대표] [메인] [세트] [단품] [사이드] [음료] [주류]
```
- 스크롤 가능한 탭
- 현재 탭 하이라이트 (현풍레드)

### 5.2 메뉴 카드
```
┌──────────────┐
│   [이미지]    │ ← 1:1 비율, WebP
│  현풍닭칼국수  │ ← 이름
│   9,000원     │ ← 가격
│ [베스트] [시그니처] │ ← 뱃지
└──────────────┘
```

### 5.3 뱃지 우선순위
1. **품절** (회색, 클릭 차단)
2. **시간제** (노란색, 시간 표시)
3. **베스트** (현풍레드)
4. **시그니처** (황동골드)
5. **매운맛** (신칼오렌지)
6. **냉메뉴** (파란색)

### 5.4 검색/정렬
```
[🔍 검색] [인기순 ▼]
```
- 인기순 / 가격 낮은 순 / 가격 높은 순 / 이름순

### 5.5 무한 스크롤
- 20개씩 로드
- 하단 도달 시 다음 페이지 자동 로드
- Skeleton UI 표시

---

## 6. 메뉴 상세

### 6.1 레이아웃
```
┌─────────────────────┐
│   [← 뒤로가기]       │
├─────────────────────┤
│                     │
│   [메뉴 이미지]      │ ← 1080x1080
│                     │
├─────────────────────┤
│ 현풍닭칼국수 [베스트] │
│ 9,000원             │
│                     │
│ "정성스럽게 끓인..." │ ← 설명
├─────────────────────┤
│ 면양 선택            │
│ ○ 보통  ○ 곱빼기(+2,000) │
├─────────────────────┤
│ 맵기 선택            │
│ ○ 순한맛 ● 보통 ○ 얼큰 │
├─────────────────────┤
│ 토핑 추가 (선택)     │
│ ☑ 수육(+3,000)      │
│ ☐ 김치(+1,500)      │
├─────────────────────┤
│ 세트 메뉴로 업그레이드? │
│ "미니수육 150g 추가" │
│ [+5,000원으로 세트]  │
├─────────────────────┤
│ ⚠️ 알레르기: 밀, 콩  │
│ 📍 원산지: 닭고기(국내산) │
├─────────────────────┤
│ 이런 메뉴는 어때요?   │
│ [얼큰칼국수] [수제비] │
├─────────────────────┤
│ 수량: [-] 1 [+]      │
│ 총 9,000원          │
│ [장바구니 담기]      │
└─────────────────────┘
```

### 6.2 옵션 로직
```typescript
let basePrice = 9000;
let options = {
  noodle: 'normal', // +0
  spicy: 'medium',  // +0
  toppings: ['수육'] // +3000
};

const total = basePrice + (options.noodle === 'extra' ? 2000 : 0)
                        + options.toppings.reduce((sum, t) => sum + toppingPrices[t], 0);
// total = 12,000원
```

### 6.3 세트 업셀
- 버튼 클릭 시 모달 표시
- "미니수육 150g이 추가되어 2,000원 절약!"
- 확인 시 세트 메뉴로 대체

---

## 7. 장바구니

### 7.1 항목 리스트
```
┌─────────────────────┐
│ 장바구니 (3개)       │
├─────────────────────┤
│ 현풍닭칼국수 세트     │
│ • 곱빼기, 보통, 수육  │
│ 수량: 1  14,000원   │
│ [수정] [삭제]        │
├─────────────────────┤
│ 닭만두국            │
│ • 보통, 순한맛       │
│ 수량: 2  18,000원   │
│ [수정] [삭제]        │
├─────────────────────┤
│ 왕만두 (10개)       │
│ 수량: 1  8,000원    │
│ [수정] [삭제]        │
└─────────────────────┘
```

### 7.2 할인/추가 비용
```
┌─────────────────────┐
│ 쿠폰 적용            │
│ [쿠폰 선택] 3,000원 할인 │
├─────────────────────┤
│ 배달/포장 선택        │
│ ● 배달 (+3,000원)    │
│ ○ 포장 (무료)        │
├─────────────────────┤
│ 요청사항 (선택)       │
│ [면 부드럽게 해주세요] │
│ 0/150자             │
├─────────────────────┤
│ 주문 금액  40,000원  │
│ 할인      -3,000원   │
│ 배달비    +3,000원   │
│ ───────────────────  │
│ 총 결제액  40,000원  │
│ [결제하기]           │
└─────────────────────┘
```

### 7.3 최소 주문 금액 체크
```typescript
const deliveryMinOrder = 15000;
const pickupMinOrder = 5000;

if (deliveryType === 'delivery' && subtotal < deliveryMinOrder) {
  showError(`배달은 ${deliveryMinOrder.toLocaleString()}원 이상부터 가능해요.`);
}
```

### 7.4 배달비 계산
```typescript
function calculateDeliveryFee(distance: number): number {
  if (distance <= 2) return 3000;
  if (distance <= 4) return 4000;
  if (distance <= 6) return 5000;
  return null; // 배달 불가
}
```

---

## 8. 결제

### 8.1 NICEPAY 연동 흐름
```
[결제하기] 클릭
  ↓
Firebase Function 호출: /createPayment
  ← 응답: { authToken, paymentId }
  ↓
NICEPAY 결제창 오픈 (PC/모바일 분기)
  ↓
사용자가 결제 정보 입력 (카드/간편결제/계좌이체)
  ↓
NICEPAY 서버 인증 완료
  ↓
ReturnURL: /api/pay/nice/return?authToken=xxx
  ↓
Firebase Function: /approvePayment
  - 금액 일치 확인
  - 서명 검증
  - 최종 승인 API 호출
  ↓
Firestore에 주문 생성 (status: 'placed')
  ↓
주문 완료 화면으로 이동
```

### 8.2 결제 수단
- 신용카드 / 체크카드
- 간편결제 (카카오페이/네이버페이/토스)
- 계좌이체
- **만나서 결제** (현금/카드 - 결제 스킵)

### 8.3 망취소 처리
```
결제 승인 대기 중 (30초 타임아웃)
  ↓
네트워크 오류 발생
  ↓
CancelURL: /api/pay/nice/cancel?authToken=xxx
  ↓
Firebase Function: /cancelPayment
  - NICEPAY 취소 API 호출
  - 주문 상태: 'payment_failed'
  ↓
에러 메시지 표시: "결제 처리 중 문제가 발생했어요"
[다시 시도] [주문 취소]
```

### 8.4 영수증
- 이메일 영수증 발송 (선택)
- 현금영수증 신청 (개인/사업자)
- 세금계산서 요청 (사업자만)

---

## 9. 주문 추적

### 9.1 타임라임 UI
```
┌─────────────────────┐
│ 주문 #12345         │
│ 14:23 주문 완료      │
├─────────────────────┤
│ ✅ 주문 접수 (14:23) │
│ ✅ 조리 시작 (14:25) │
│ 🔄 배달 준비 중...   │
│ ⏳ 완료 예정 (15:10) │
├─────────────────────┤
│ 예상 도착: 약 40분   │
├─────────────────────┤
│ [가게에 문의하기 📞] │
└─────────────────────┘
```

### 9.2 상태별 아이콘
- `placed`: ⏳ (회색)
- `accepted`: ✅ (초록)
- `cooking`: 🔥 (빨강)
- `out_for_delivery`: 🚚 (파랑)
- `pickup_ready`: 🛍️ (노랑)
- `done`: ✅ (초록)
- `canceled`: ❌ (회색)

### 9.3 푸시 알림 트리거
```typescript
// Functions에서 Firestore Trigger
exports.onOrderStatusChange = functions.firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data().status;
    const after = change.after.data().status;
    
    if (before !== after) {
      const messages = {
        accepted: "주문이 접수되었어요. 따끈하게 준비할게요!",
        cooking: "지금 정성껏 조리하고 있어요.",
        out_for_delivery: "배달을 시작했어요. 잠시 후 도착!",
        done: "주문이 완료되었어요. 맛있게 드세요!"
      };
      
      await sendPushNotification(userId, messages[after]);
    }
  });
```

### 9.4 ETA (예상 도착 시간)
```typescript
const cookingTime = 15; // 분
const deliveryTime = distance * 5; // km당 5분
const eta = new Date(order.createdAt.toMillis() + (cookingTime + deliveryTime) * 60000);
```

---

## 10. 리뷰 작성

### 10.1 트리거
- 주문 완료 후 1시간 뒤 푸시 알림
- "오늘 식사는 어떠셨어요? 사진 리뷰 쿠폰이 기다려요."

### 10.2 리뷰 폼
```
┌─────────────────────┐
│ 리뷰 작성           │
├─────────────────────┤
│ 별점 선택            │
│ ⭐⭐⭐⭐⭐ (5점)      │
├─────────────────────┤
│ 어떤 점이 좋았나요?  │
│ [텍스트 입력]        │
│ 10-500자            │
├─────────────────────┤
│ 사진 첨부 (최대 3장) │
│ [+] [+] [+]         │
│ 📸 사진 리뷰 작성 시 │
│    3,000원 쿠폰 증정 │
├─────────────────────┤
│ [등록하기]           │
└─────────────────────┘
```

### 10.3 사진 업로드
- Storage에 `/reviews/{userId}/{reviewId}/photo_{index}.jpg` 저장
- 리사이즈: 1080px 정사각
- 용량 제한: 5MB/장

### 10.4 보상 쿠폰 자동 발급
```typescript
if (review.photos.length > 0) {
  const coupon = {
    userId: review.userId,
    code: generateCouponCode(),
    type: 'fixed',
    value: 3000,
    minOrder: 10000,
    expiresAt: addDays(new Date(), 30)
  };
  await db.collection('coupons').add(coupon);
  
  showToast('사진 리뷰 감사해요! 3,000원 쿠폰을 드렸어요.');
}
```

---

## 11. 마이페이지

### 11.1 주문 내역
```
┌─────────────────────┐
│ 2024.10.28  14:23   │
│ 현풍닭칼국수 세트 외 2 │
│ 40,000원            │
│ [재주문] [리뷰 쓰기]  │
├─────────────────────┤
│ 2024.10.25  19:10   │
│ 얼큰닭칼국수         │
│ 9,500원             │
│ [재주문] [리뷰 보기]  │
└─────────────────────┘
```

### 11.2 재주문 기능
- 이전 주문 정확히 복제 → 장바구니 담기
- 옵션/수량 동일 적용
- "이전 주문을 장바구니에 담았어요" 토스트

### 11.3 쿠폰함
```
┌─────────────────────┐
│ 사용 가능 (3장)      │
├─────────────────────┤
│ 3,000원 할인 쿠폰    │
│ 10,000원 이상 주문 시 │
│ ~ 2024.11.28        │
│ [사용하기]           │
├─────────────────────┤
│ 만료됨 (1장)         │
│ ...                 │
└─────────────────────┘
```

### 11.4 주소지 관리
- 최대 5개 등록
- 기본 배달지 설정
- 지도 API로 주소 검색 (Kakao/Naver)

### 11.5 알림 설정
```
주문 상태 알림  [🔔 ON]
프로모션 알림    [🔕 OFF]
리뷰 요청       [🔔 ON]
```

### 11.6 회원 탈퇴
```
회원 탈퇴를 요청하시겠어요?
- 주문 내역은 5년간 보관됩니다 (전자상거래법)
- 리뷰는 익명 처리됩니다
- 30일 내 재로그인 시 복구 가능

[취소] [탈퇴하기]
```

---

## 12. 설치 & 업데이트

### 12.1 A2HS 배너 (미설치 시)
```
┌─────────────────────┐
│ 🚀 앱으로 더 빠르게! │
│ 홈 화면에 추가하고   │
│ 편리하게 주문하세요  │
│ [설치하기] [닫기]    │
└─────────────────────┘
```
- 홈 화면 상단 고정
- 하루에 한 번만 표시 (Local Storage)
- 닫기 후 3일간 숨김

### 12.2 업데이트 토스트
```
Service Worker에서 새 버전 감지
  ↓
"새 버전이 있어요. 업데이트하시겠어요?"
[지금 업데이트] [나중에]
  ↓
[지금 업데이트] 클릭 시
  ↓
skipWaiting() → 페이지 새로고침
```

### 12.3 오프라인 배너
```
navigator.onLine === false 감지
  ↓
┌─────────────────────┐
│ ⚠️ 인터넷 연결 끊김  │
│ 일부 기능 제한돼요   │
│ [다시 시도]          │
└─────────────────────┘
```
- 메뉴 목록: 캐시된 데이터 표시
- 장바구니: Local Storage 유지
- 주문: "네트워크에 연결해 주세요" 차단

---

## 13. 에러 처리

### 13.1 품절
```
[장바구니 담기] 클릭 시
  ↓
Firestore에서 재고 확인
  ↓
if (!menu.isAvailable) {
  showToast('죄송해요, 지금은 품절이에요.');
  return;
}
```

### 13.2 시간제 메뉴
```
if (menu.availableHours) {
  const now = new Date().getHours();
  const { start, end } = menu.availableHours;
  
  if (now < start || now >= end) {
    showToast(`이 메뉴는 ${start}:00~${end}:00에만 주문 가능해요.`);
    return;
  }
}
```

### 13.3 결제 실패
```
┌─────────────────────┐
│ ❌ 결제 실패         │
│                     │
│ 카드 승인이 거부되었어요 │
│ 다른 결제 수단을 시도해 주세요 │
│                     │
│ [다시 시도]          │
│ [주문 취소]          │
└─────────────────────┘
```

### 13.4 네트워크 오류
```
try {
  await submitOrder();
} catch (error) {
  if (error.code === 'unavailable') {
    showToast('네트워크 연결을 확인해 주세요.');
    // 재시도 큐에 추가
    retryQueue.push(order);
  }
}
```

---

## 14. 성능 최적화

### 14.1 이미지 레이지 로딩
```jsx
<img 
  src={menu.image} 
  loading="lazy"
  alt={menu.name}
/>
```

### 14.2 코드 스플리팅
```typescript
const MenuDetail = lazy(() => import('./pages/MenuDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
```

### 14.3 메뉴 데이터 캐싱
```typescript
// Service Worker
const MENU_CACHE = 'menu-v1';

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/menus')) {
    event.respondWith(
      caches.open(MENU_CACHE).then((cache) => {
        return cache.match(event.request).then((cached) => {
          const fetched = fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          });
          return cached || fetched;
        });
      })
    );
  }
});
```

---

## 15. 접근성

### 15.1 스크린리더 레이블
```jsx
<button aria-label="장바구니에 담기">
  <ShoppingCart />
</button>

<img src={menu.image} alt={`${menu.name} 사진`} />
```

### 15.2 포커스 스타일
```css
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### 15.3 키보드 탐색
- Tab: 다음 요소
- Shift+Tab: 이전 요소
- Enter/Space: 버튼 클릭
- Esc: 모달 닫기

---

## 부록 A. 에러 코드

| 코드 | 메시지 | 해결 방법 |
|------|--------|----------|
| `PAY_AUTH_FAIL` | 결제 인증 실패 | 다른 카드 시도 |
| `PAY_APPROVE_FAIL` | 승인 실패 | 고객센터 문의 |
| `PAY_NET_CANCEL` | 망취소 | 다시 시도 |
| `ORDER_TIMEOUT` | 주문 타임아웃 | 가게 확인 필요 |
| `STOCK_OUT` | 품절 | 다른 메뉴 선택 |
| `RULES_DENY` | 권한 없음 | 로그인 확인 |

---

## 부록 B. Local Storage 키

| 키 | 값 | 용도 |
|----|-----|------|
| `pwa_installed` | boolean | 설치 여부 |
| `onboarding_completed` | boolean | 온보딩 완료 |
| `delivery_type` | 'delivery'\|'pickup' | 배달/포장 |
| `cart` | JSON | 장바구니 |
| `delivery_address` | JSON | 배달지 |
| `last_banner_dismissed` | timestamp | 배너 숨김 시간 |

---

**문서 버전**: v0.1  
**작성일**: 2024-10-28  
**작성자**: KS컴퍼니
