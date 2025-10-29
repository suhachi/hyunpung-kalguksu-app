# Phase 3: 고급 기능 개발

## 📋 개요

Phase 3에서는 현풍닭칼국수 배달앱의 고급 기능들을 구현합니다.
**모든 기능은 Mock 환경(USE_FIREBASE=false)에서 개발 및 테스트**되며, Phase 3 전체 완료 후 Firebase 연동을 진행합니다.

## 🎯 Phase 3 목표

1. **GPS 배달 추적** - 실시간 배달 현황 모니터링
2. **1:1 채팅 지원** - 고객센터 실시간 채팅
3. **포인트 시스템** - 리워드 적립/사용
4. **다국어 지원** - 한/영/중 3개 국어
5. **오프라인 모드** - PWA 강화 (Service Worker, IndexedDB)
6. **푸시 알림** - 고객/관리자 알림
7. **통합 리포트** - 운영 지표 분석

## 🏗️ 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    고객 PWA 앱                           │
│  ┌──────────┬──────────┬──────────┬──────────┐         │
│  │GPS 추적  │1:1 채팅  │포인트    │다국어    │         │
│  │/tracking │/support  │/mypoints │i18n      │         │
│  └──────────┴──────────┴──────────┴──────────┘         │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│                Service Worker Layer                      │
│  ┌──────────────────────────────────────────┐          │
│  │ Offline Cache + Background Sync          │          │
│  │ IndexedDB: menus, orders, messages       │          │
│  └──────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Feature Adapters                        │
│  ┌──────────┬──────────┬──────────┐                    │
│  │Delivery  │Support   │Points    │                    │
│  │Provider  │Chat      │System    │                    │
│  └──────────┴──────────┴──────────┘                    │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Backend (Firebase Functions)                │
│  ┌──────────┬──────────┬──────────┬──────────┐         │
│  │Delivery  │Chat      │Points    │Push      │         │
│  │Webhook   │Realtime  │Ledger    │FCM       │         │
│  └──────────┴──────────┴──────────┴──────────┘         │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│                관리자 대시보드                           │
│  ┌──────────┬──────────┬──────────┬──────────┐         │
│  │배달관제  │채팅관리  │포인트    │통합      │         │
│  │/delivery │/support  │정책      │리포트    │         │
│  └──────────┴──────────┴──────────┴──────────┘         │
└─────────────────────────────────────────────────────────┘
```

## 🔧 환경 변수

```bash
# Firebase 사용 여부 (Phase 3에서는 false 유지)
VITE_USE_FIREBASE=false

# Phase 3-1: 배달 추적
VITE_DELIVERY_ENABLED=true
VITE_DELIVERY_PROVIDER=mock
VITE_DELIVERY_WEBHOOK_SECRET=change_me

# Phase 3-2: 고객 지원
VITE_SUPPORT_ENABLED=true

# Phase 3-3: 포인트 시스템
VITE_POINTS_ENABLED=true
VITE_POINTS_RATE=0.03
VITE_POINTS_MIN_USE=1000
VITE_POINTS_EXPIRE_DAYS=365
```

## 📊 데이터 모델 (Firestore ERD)

### Phase 3-1: 배달 추적

```
deliveries/{taskId}
├── taskId: string
├── orderId: string
├── driverId: string
├── status: "assigned" | "picked_up" | "delivering" | "completed" | "canceled"
├── eta: number
├── lastCoord: { lat, lng, at }
├── createdAt: timestamp
└── updatedAt: timestamp

drivers/{driverId}
├── driverId: string
├── name: string
├── phone: string
├── lastCoord: { lat, lng, at }
└── status: "idle" | "assigned" | "delivering" | "offline"

orders/{orderId}.delivery
├── taskId: string
├── status: string
├── eta: number
└── lastCoord: { lat, lng, at }
```

### Phase 3-2: 채팅 지원

```
chat_sessions/{sessionId}
├── id: string
├── userId: string
├── userName: string
├── open: boolean
├── lastAt: timestamp
├── lastMessage: string
├── assignedTo: string (admin UID)
└── messages (subcollection)
    └── {messageId}
        ├── id: string
        ├── sessionId: string
        ├── from: "user" | "admin" | "bot"
        ├── type: "text" | "image"
        ├── text: string
        ├── imageUrl: string
        ├── at: timestamp
        ├── readByAdmin: boolean
        └── readByUser: boolean
```

### Phase 3-3: 포인트 시스템

```
users/{uid}/points_balance
├── uid: string
├── balance: number
└── updatedAt: timestamp

users/{uid}/points_ledger/{id}
├── id: string
├── uid: string
├── type: "earn" | "spend" | "expire" | "adjust"
├── amount: number
├── ref: { kind: "order" | "review" | "admin", id: string }
├── at: timestamp
├── note: string
└── expiresAt: timestamp (earn only)
```

## 🔐 보안 정책

### Firestore Rules

```javascript
// 배달 정보: 관리자 + 해당 주문 고객만
match /deliveries/{taskId} {
  allow read: if isAdmin() || isOrderOwner(taskId);
  allow write: if false; // Functions only
}

// 드라이버 정보: 관리자만
match /drivers/{driverId} {
  allow read: if isAdmin();
  allow write: if false; // Functions only
}

// 채팅 세션: 본인 + 관리자
match /chat_sessions/{sessionId} {
  allow read: if isSessionOwner(sessionId) || isAdmin();
  allow write: if isSessionOwner(sessionId) || isAdmin();
}

// 포인트 잔액: 본인 읽기만, 쓰기는 서버만
match /users/{uid}/points_balance {
  allow read: if request.auth.uid == uid;
  allow write: if false; // Functions only
}

// 포인트 원장: 본인 읽기만, 쓰기는 서버만
match /users/{uid}/points_ledger/{id} {
  allow read: if request.auth.uid == uid;
  allow write: if false; // Functions only
}
```

### Storage Rules

```javascript
// 채팅 첨부 파일
match /support/{sessionId}/{messageId} {
  allow read: if isSessionOwner(sessionId) || isAdmin();
  allow write: if isSessionOwner(sessionId);
}
```

## 📈 성능 최적화

### Firestore Indexes

```json
{
  "indexes": [
    {
      "collectionGroup": "deliveries",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "drivers",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "lastCoord.at", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "chat_sessions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "open", "order": "ASCENDING" },
        { "fieldPath": "lastAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "points_ledger",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "uid", "order": "ASCENDING" },
        { "fieldPath": "at", "order": "DESCENDING" }
      ]
    }
  ]
}
```

## 🔄 플로우 다이어그램

### Phase 3-1: 배달 추적 플로우

```
주문 완료 → Functions: createDeliveryTask
           ↓
  Provider.createTask(pickup, dropoff)
           ↓
  Firestore: deliveries/{taskId}
           ↓
  고객 앱: 실시간 구독
           ↓
  지도 표시 + ETA 업데이트
           ↓
  Webhook: driver.location
           ↓
  Functions: updateDeliveryLocation
           ↓
  고객 앱: 마커 이동
```

### Phase 3-2: 채팅 플로우

```
고객: 메시지 전송
     ↓
Firestore: chat_sessions/{id}/messages/{msgId}
     ↓
Functions: onMessageCreate
     ↓
FCM: 관리자 푸시 알림
     ↓
관리자: 답장 전송
     ↓
FCM: 고객 푸시 알림
     ↓
읽음 상태 업데이트
```

### Phase 3-3: 포인트 플로우

```
주문 완료 → Functions: onOrderCompleted
          ↓
  amount * RATE → earnPoints
          ↓
  points_ledger 추가
          ↓
  points_balance 증가
          ↓
  고객 앱: 포인트 적립 알림
          
결제 시 → Checkout: 포인트 사용
       ↓
  검증 (잔액/최소금액/만료)
       ↓
  spendPoints Callable
       ↓
  points_ledger 추가 (음수)
       ↓
  points_balance 차감
       ↓
  결제 금액 차감
```

## 🧪 테스트 시나리오

### Phase 3-1: GPS 추적

1. ✅ 주문 완료 시 배달 태스크 자동 생성
2. ✅ 고객 앱에서 실시간 드라이버 위치 확인
3. ✅ ETA 자동 업데이트 (5-10초 주기)
4. ✅ 관리자 관제에서 전체 배달 현황 모니터링
5. ✅ SLA 지연 시 알림 표시

### Phase 3-2: 채팅

1. ✅ 고객: 세션 자동 생성 및 메시지 전송
2. ✅ 관리자: 미응답 세션 우선 표시
3. ✅ 실시간 메시지 송수신
4. ✅ 읽음 상태 표시
5. ✅ 운영시간 외 자동 응답

### Phase 3-3: 포인트

1. ✅ 주문 완료 시 3% 자동 적립
2. ✅ 리뷰 작성 시 추가 적립 (사진: 200pt, 텍스트: 100pt)
3. ✅ 결제 시 포인트 사용 (1,000원 이상부터)
4. ✅ 만료 예정 포인트 알림
5. ✅ 포인트 내역 조회

## 📝 Phase별 진행 순서

1. ✅ **Setup** - 환경 변수, 타입, README (현재)
2. 🔄 **Phase 3-1** - GPS 배달 추적
3. ⏳ **Phase 3-2** - 1:1 채팅 지원
4. ⏳ **Phase 3-3** - 포인트 시스템
5. ⏳ **Phase 3-4** - 다국어 지원
6. ⏳ **Phase 3-5** - 오프라인 모드
7. ⏳ **Phase 3-6** - 푸시 알림
8. ⏳ **Phase 3-7** - 통합 리포트

## 🎯 완료 기준

각 Phase 완료 시:
1. Mock 환경에서 기능 정상 작동
2. 타입 정의 완료
3. UI/UX 구현 완료
4. 완료 보고서 작성 (`Phase-3-X-완료보고서.md`)

Phase 3 전체 완료 시:
1. 모든 7개 Phase 완료
2. 통합 테스트 시나리오 통과
3. 전체 완료 보고서 작성
4. Firebase 연동 준비 완료

## 📚 참고 문서

- [Phase 2 전체 완료 보고서](./08-Phase-2-전체-완료보고서.md)
- [전체 구조 코드 설계](./01-전체구조_코드설계_v1.0.md)
- [전범위 누락작업 체크리스트](../04-operations/01-전범위_누락작업_체크리스트_v1.md)

---

**작성일**: 2025-10-28  
**작성자**: KS컴퍼니 개발팀  
**문서 버전**: 1.0
