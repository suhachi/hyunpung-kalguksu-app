# OrderStatus 상태 키 통일 가이드

**작성일**: 2025년 1월 29일  
**목적**: 모든 OrderStatus를 표준 상태로 통일

---

## 📋 표준 상태 목록

### 주문 상태 (OrderStatus)
```typescript
type OrderStatus = 
  | 'pending'     // 대기중
  | 'accepted'    // 접수됨
  | 'preparing'   // 준비중 (조리 중)
  | 'completed'   // 완료
  | 'canceled';   // 취소됨
```

---

## ❌ 제거된 과거 상태

다음 상태는 더 이상 사용하지 않습니다:

- ❌ `ready` → `preparing`로 통일
- ❌ `delivering` → `preparing`로 통일  
- ❌ `confirmed` → `accepted`로 통일
- ❌ `done` → `completed`로 통일
- ❌ `cancelled` → `canceled`로 통일

---

## ✅ 해결 방법

### 1. normalizeStatus() 함수 사용

**파일**: `src/lib/orderStatus.ts`

```typescript
import { normalizeStatus, getStatusLabel } from '@/lib/orderStatus';

// 사용 예시
const status = 'ready';
const normalized = normalizeStatus(status); // 'preparing'로 변환
const label = getStatusLabel(status);      // '준비중'으로 표시
```

### 2. 모든 주문 상태 처리에 적용

#### Before
```typescript
if (order.status === 'ready') {
  // ...
}
```

#### After
```typescript
import { normalizeStatus } from '@/lib/orderStatus';

if (normalizeStatus(order.status) === 'preparing') {
  // ...
}
```

---

## 📝 수정된 파일

### 1. src/functions/src/lib/report.ts
**변경사항**:
- `ready`, `delivering`, `done` 제거
- 표준 상태(`pending`, `accepted`, `preparing`, `completed`, `canceled`)만 사용

**변경 전**:
```typescript
const messages = {
  ready: '배달 준비가 완료되었습니다.',
  delivering: '배달 중입니다.',
  done: '주문이 완료되었습니다.',
};
```

**변경 후**:
```typescript
const messages = {
  preparing: '주문을 조리 중입니다.',
  completed: '주문이 완료되었습니다.',
};
```

---

## 🔍 검증 방법

### 코드베이스 전체 검색
```bash
# 과거 상태 키 검색
grep -r "\bready\b\|\bdelivering\b\|\bdone\b" src/ --include="*.ts" --include="*.tsx"
```

**검색 대상**:
- `src/pages/app/Orders.tsx` - 고객 주문 목록
- `src/pages/admin/Orders.tsx` - 관리자 주문 목록
- `src/lib/admin/orders.api.ts` - 주문 API
- `src/pages/admin/Delivery.tsx` - 배달 관리

### 배달 상태는 별도 관리

**참고**: `src/types/delivery.ts`의 `delivering` 상태는 **배달 작업 상태**이므로 유지합니다.

```typescript
// 배달 작업 상태 (유지)
type DeliveryTaskStatus = 
  | 'assigned'      // 배정됨
  | 'picked_up'     // 픽업 완료
  | 'delivering'    // 배달 중 ✅ (배달 전용)
  | 'completed'     // 배달 완료
  | 'canceled';     // 취소됨
```

---

## 🧪 테스트 체크리스트

### 주문 상태 필터
- [ ] `/orders` 탭에서 "진행중" 필터 → pending/accepted/preparing 표시
- [ ] `/orders` 탭에서 "완료" 필터 → completed 표시
- [ ] `/orders` 탭에서 "취소" 필터 → canceled 표시

### 주문 상태 변경
- [ ] 관리자가 주문 상태 변경 → 표준 상태로 저장
- [ ] 상태 변경 메시지 정상 표시
- [ ] 상태 배지 색상 정상 표시

---

## 📌 핵심 원칙

1. **주문 상태**: `normalizeStatus()` 사용 필수
2. **배달 상태**: `delivering` 유지 (배달 전용)
3. **표시명**: `getStatusLabel()` 사용
4. **새로운 상태 추가 금지**: 표준 상태 5가지만 사용

---

## ✅ 완료 확인

다음 명령어로 과거 상태 키 검색:
```bash
grep -r "status.*ready\|status.*delivering\|status.*done" src/ --include="*.ts" --include="*.tsx" -n
```

**예상 결과**: 0건 (배달 관련 파일 제외)

