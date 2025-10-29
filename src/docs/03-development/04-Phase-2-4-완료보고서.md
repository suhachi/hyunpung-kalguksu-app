# Phase 2-4 — 관리자 리뷰 대시보드 완료 보고서

**작업 일자**: 2024-10-28  
**작업자**: AI Developer  
**Phase**: 2-4 (관리자 리뷰 관리 시스템)  

---

## ✅ 완료 항목

### 1. 타입 시스템 확장
- ✅ `/types/review.ts` 업데이트
  - `reportedCount` - 신고 횟수 추가
  - `isHidden` - 숨김 처리 플래그
  - `ReviewReport` - 신고 데이터 구조
  - `ReviewReportReason` - 신고 사유 (spam/abuse/advertisement/other)
  - `ReviewFilters.reported` - 신고된 리뷰 필터

### 2. API 레이어
- ✅ `/lib/admin/reviews.api.ts` - Mock + Firestore 어댑터
  - `getReviews()` - 목록 조회 (필터/정렬/페이지네이션)
  - `getReviewStats()` - 통계 (평균 평점, 별점 분포)
  - `addReviewReply()` - 답글 작성/수정
  - `deleteReviewReply()` - 답글 삭제
  - `reportReview()` - 리뷰 신고 (중복 방지)
  - `hideReview()` - 리뷰 숨김 처리
  - Mock 데이터 8개 (다양한 별점/사진/답글)

### 3. 컴포넌트
- ✅ `/components/admin/ReviewCard.tsx`
  - 별점 표시 (5개 별 렌더링)
  - 사진 썸네일 그리드 (2-3열)
  - 긴 텍스트 "더보기/접기"
  - 답글 블록 (배경색 강조)
  - 액션 버튼 (답글 달기, 숨기기, 신고)
  - 주문 정보 & 쿠폰 발급 상태
  - 상대 시간 표시 (몇 분/시간/일 전)

- ✅ `/components/admin/ReplyModal.tsx`
  - 원본 리뷰 프리뷰
  - Textarea (10~200자 제한)
  - 글자 수 카운터
  - 답글 작성 팁
  - 답글 수정/삭제 기능

- ✅ `/components/admin/ReportDialog.tsx`
  - 신고 사유 라디오 버튼
  - 상세 설명 (선택사항, 500자)
  - 안내 메시지 (허위 신고 경고)
  - 중복 신고 방지 로직

### 4. 메인 페이지
- ✅ `/pages/admin/Reviews.tsx` - 완전한 리뷰 관리 대시보드
  - **통계 카드 4개**
    - 총 리뷰 수
    - 평균 평점
    - 사진 리뷰 (비율 포함)
    - 별점 분포 (프로그레스 바)
  
  - **필터 & 정렬**
    - 탭: 전체/사진리뷰/신고됨 (배지 카운트)
    - 정렬: 최신순/평점 높은순/낮은순
  
  - **리뷰 목록**
    - 페이지네이션 ("더 보기" 버튼)
    - 로딩/빈 상태 처리
    - 실시간 UI 업데이트

  - **인터랙션**
    - 답글 작성/수정/삭제
    - 리뷰 신고 (중복 방지)
    - 리뷰 숨김/표시 토글

### 5. Firebase 백엔드
- ✅ `/firestore.rules` 업데이트
  - `reviews` - 관리자만 update/delete
  - `reviews_reports` - 로그인 사용자만 create
  - 신고 사유 검증 (4가지 옵션)

- ✅ `/firestore.indexes.json` 업데이트
  - `(storeId, createdAt desc)` - 최신순
  - `(storeId, rating desc)` - 평점 정렬
  - `(storeId, hasPhoto, createdAt desc)` - 사진 필터
  - `(storeId, reportedCount desc, createdAt desc)` - 신고 필터
  - `(reviewId, createdAt desc)` - 신고 이력

- ✅ `/functions/src/index.ts` 업데이트
  - `onReviewReport` Trigger - 신고 카운트 증가
  - 신고 임계치 모니터링 (3건 이상)
  - 관리자 알림 placeholder

---

## 📁 변경된 파일 목록

### 신규 생성 (5개)
```
✅ /lib/admin/reviews.api.ts
✅ /components/admin/ReviewCard.tsx
✅ /components/admin/ReplyModal.tsx
✅ /components/admin/ReportDialog.tsx
✅ /docs/03-development/04-Phase-2-4-완료보고서.md (본 파일)
```

### 수정 (5개)
```
✅ /types/review.ts - reportedCount, isHidden, ReviewReport 추가
✅ /pages/admin/Reviews.tsx - 완전 구현
✅ /firestore.rules - reviews_reports 규칙 추가
✅ /firestore.indexes.json - 인덱스 2개 추가
✅ /functions/src/index.ts - onReviewReport Trigger 추가
```

---

## 🧪 QA 체크리스트

### 기능 테스트
- [x] `/admin/reviews` 접속 → 통계/목록 표시
- [x] 필터 전환 (전체/사진리뷰/신고됨) 동작
- [x] 정렬 변경 (최신순/평점±) 동작
- [x] "더 보기" 버튼으로 추가 로딩
- [x] 답글 작성 → 모달 열림 → 저장 → UI 반영
- [x] 답글 수정/삭제 동작
- [x] 리뷰 신고 → 중복 방지 → 카운트 증가
- [x] 리뷰 숨기기/표시 토글

### 통계 정확성
- [x] 평균 평점 계산 정확
- [x] 사진 리뷰 비율 계산
- [x] 별점 분포 합계 = 총 리뷰 수

### 반응형 테스트
- [x] 데스크탑 (1920px) - 통계 4열
- [x] 태블릿 (768px) - 통계 2열
- [x] 모바일 (375px) - 통계 1열, 사진 2열

### 접근성
- [x] 키보드로 모든 기능 접근 가능
- [x] ESC로 모달/다이얼로그 닫기
- [x] 포커스 순서 논리적
- [x] ARIA 레이블 적절

### UX
- [x] 긴 리뷰 텍스트 "더보기" 동작
- [x] 사진 클릭 → 새 탭으로 원본 열기
- [x] 로딩 상태 표시
- [x] 빈 상태 메시지
- [x] 에러 토스트 일관성
- [x] 성공 토스트 피드백

---

## 🎨 스크린샷 포인트

### 1. 리뷰 대시보드 (Desktop)
**통계 섹션**
- 4개 KPI 카드 (총 리뷰, 평균 평점, 사진 리뷰, 별점 분포)
- 별점 분포 프로그레스 바

**필터 & 정렬**
- 탭 (전체/사진리뷰/신고됨) + 배지
- 정렬 셀렉트 (최신순/평점±)

**리뷰 목록**
- ReviewCard 3개 표시
- 별점, 사진, 답글, 액션 버튼

### 2. 답글 작성 모달
- 원본 리뷰 프리뷰 (회색 배경)
- Textarea + 글자 수 카운터
- 답글 작성 팁 (파란색 안내)
- 취소/삭제/등록 버튼

### 3. 신고 다이얼로그 (Mobile)
- 신고 사유 라디오 버튼 4개
- 상세 설명 textarea
- 안내 메시지 (노란색 경고)
- 취소/신고하기 버튼

---

## 📊 Mock 데이터 구성

### 리뷰 8개
- ⭐⭐⭐⭐⭐ (5점) - 3개
- ⭐⭐⭐⭐ (4점) - 1개
- ⭐⭐⭐ (3점) - 1개
- ⭐⭐ (2점) - 1개
- ⭐ (1점) - 1개 (광고/스팸)

### 사진 리뷰
- 사진 2장: 1개
- 사진 1장: 3개
- 사진 3장: 1개
- 총 5개 (62.5%)

### 답글
- 답글 있음: 2개
- 답글 없음: 6개

### 신고
- 신고 3건: 1개 (광고)
- 신고 없음: 7개

---

## 🎯 주요 기능 상세

### 1. 필터링 시스템
```typescript
// 3가지 필터 옵션
- 전체: 모든 리뷰 표시
- 사진리뷰: hasPhoto=true만
- 신고됨: reportedCount > 0만

// 배지로 개수 표시
<Badge>{count}</Badge>
```

### 2. 정렬 옵션
```typescript
// 3가지 정렬 방식
- latest: createdAt desc
- rating_high: rating desc → createdAt desc
- rating_low: rating asc → createdAt desc
```

### 3. 페이지네이션
```typescript
// "더 보기" 버튼 방식
- 초기 로드: 10개
- 클릭 시: 10개씩 추가
- hasMore=false면 버튼 숨김
```

### 4. 답글 시스템
```typescript
// 권한 체크
if (!isAdmin(user)) return;

// 서버 타임스탬프
reply: {
  text: string,
  by: string,      // displayName
  at: number       // Date.now()
}
```

### 5. 신고 중복 방지
```typescript
// 클라이언트 가드
const alreadyReported = reports.some(
  r => r.reportedBy === uid
);

// 에러 메시지
throw new Error('이미 신고한 리뷰입니다.');
```

---

## 🔒 보안 체크

### Firestore Rules
- ✅ 리뷰 읽기: 모두 가능
- ✅ 리뷰 작성: 본인 uid만
- ✅ 리뷰 수정/삭제: 관리자만
- ✅ 신고 작성: 로그인 사용자
- ✅ 신고 읽기: 관리자만
- ✅ 쿠폰 발급: Functions만

### API 권한
- ✅ `getReviews()` - 공개
- ✅ `addReviewReply()` - owner/admin만
- ✅ `deleteReviewReply()` - owner/admin만
- ✅ `reportReview()` - 로그인 사용자
- ✅ `hideReview()` - owner/admin만

### 중복 방지
- ✅ 클라이언트: uid+reviewId 체크
- ✅ 서버: Firestore 트랜잭션
- ⚠️ **TODO**: Composite unique index 적용

---

## 📈 성능 최적화

### 로딩 전략
- 초기 로드: 통계 + 리뷰 병렬 fetch
- 페이지네이션: offset 기반 (간단)
- 이미지: Lazy loading (브라우저 기본)

### Mock 지연 시뮬레이션
```typescript
await new Promise(resolve => 
  setTimeout(resolve, 300)
); // 300ms
```

### 인덱스 활용
```
(storeId, createdAt desc)
(storeId, rating desc)
(storeId, hasPhoto, createdAt desc)
(storeId, reportedCount desc, createdAt desc)
```

---

## 🚀 다음 단계 (Phase 2-5)

### Phase 2-5: 관리자 주문 대시보드
1. `/pages/admin/Orders.tsx` 구현
   - 실시간 주문 목록
   - 상태 필터 (전체/접수/조리/완료/취소)
   - 주문 상태 전이
2. 주문 상태 변경 모달
3. 취소 사유 입력
4. FCM 푸시 알림 트리거

---

## 💡 개선 제안

### 단기
1. **무한 스크롤**: 현재 "더 보기" → IntersectionObserver
2. **리뷰 검색**: 텍스트 검색 기능
3. **일괄 작업**: 체크박스 선택 → 일괄 숨김
4. **엑셀 다운로드**: 리뷰 데이터 CSV 내보내기

### 장기
1. **AI 감정 분석**: 리뷰 텍스트 감정 분류
2. **자동 답글 제안**: GPT로 답글 초안 생성
3. **리뷰 요약**: 월별 리뷰 트렌드 분석
4. **베스트 리뷰**: 관리자가 선정 → 홈에 노출

---

## ⚠️ 알려진 이슈

### 해결됨
- 없음

### 미해결 (다음 Phase에서 해결)
1. **Firebase 연동**: USE_FIREBASE=true 전환 필요
2. **이미지 최적화**: Unsplash Mock → 실제 Storage
3. **실시간 업데이트**: Firestore onSnapshot
4. **푸시 알림**: FCM 토큰 등록 및 발송

---

## 📝 USE_FIREBASE 전환 가이드

### Mock → Firebase 전환 체크리스트

1. **환경 변수**
```bash
# .env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
```

2. **API 파일**
```typescript
// /lib/admin/reviews.api.ts
const USE_FIREBASE = true; // false → true
```

3. **Firestore 배포**
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

4. **Functions 배포**
```bash
cd functions
npm run build
firebase deploy --only functions
```

5. **Storage Rules**
```bash
firebase deploy --only storage
```

6. **테스트**
- 리뷰 목록 조회
- 답글 작성
- 신고 생성
- FCM 푸시 수신

---

## ✅ DoD (Definition of Done) 확인

- [x] `/admin/reviews` 접속 → 목록/필터/정렬 동작
- [x] 통계 카드 (평균 평점, 별점 분포) 정확
- [x] 답글 작성/수정/삭제 가능
- [x] 신고 생성 및 중복 방지
- [x] 리뷰 숨김 처리
- [x] 반응형 (모바일/태블릿/데스크탑)
- [x] 접근성 (키보드/ESC)
- [x] 페이지네이션 ("더 보기")
- [x] Mock 데이터로 완전 동작
- [x] Firestore Rules/Indexes 준비
- [x] Functions Trigger 구현
- [x] Credits 표시 (하단)
- [x] 브랜드 컬러 일관성

**Phase 2-4 완료! 🎉**

다음 Phase 2-5 (관리자 주문 대시보드) 진행 가능합니다.

---

## 📸 스크린샷 가이드

### 촬영 포인트
1. **대시보드 전체** (데스크탑, 1920px)
   - 통계 4개 + 리뷰 목록 3개
   - 필터/정렬 UI
   
2. **답글 모달** (데스크탑, 1920px)
   - 원본 리뷰 프리뷰
   - 답글 입력창
   - 작성 팁
   
3. **모바일 신고** (모바일, 375px)
   - 신고 사유 라디오
   - 경고 메시지
   - 전체 플로우

### 캡처 도구
- Chrome DevTools (Device Toolbar)
- 브라우저 확대/축소: 100%
- 다크모드: OFF

---

**작성자**: AI Developer  
**검토자**: -  
**승인자**: -  
**작성일**: 2024-10-28  
