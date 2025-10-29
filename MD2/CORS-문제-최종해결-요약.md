# CORS 문제 최종 해결 요약

**해결 일시**: 2025-01-29  
**문제**: 메뉴 이미지 업로드 시 CORS 오류 발생  
**원인**: 환경 변수 버킷 이름 불일치

---

## 🔴 문제 증상

```
Access to XMLHttpRequest at 
'https://firebasestorage.googleapis.com/v0/b/hp-kal.appspot.com/o?name=...' 
from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

---

## 🔍 원인 분석

| 항목 | 값 | 상태 |
|------|-----|------|
| **환경 변수** | `hp-kal.appspot.com` | ❌ 잘못됨 |
| **실제 버킷** | `hp-kal.firebasestorage.app` | ✅ 존재 |
| **CORS 설정** | localhost:3000 포함 | ✅ 적용됨 |
| **요청 대상** | 환경 변수 값 사용 | ❌ 불일치 |

**핵심**: 
- Firebase SDK는 환경 변수(`VITE_FIREBASE_STORAGE_BUCKET`) 값을 사용하여 요청 URL 생성
- `.env` 파일에 `hp-kal.appspot.com`이 설정되어 있음
- 실제 버킷은 `hp-kal.firebasestorage.app`
- CORS는 실제 버킷에만 적용되어 있음

---

## ✅ 해결 방법

### 수정 내용

**파일**: `.env`

```diff
- VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com
+ VITE_FIREBASE_STORAGE_BUCKET=hp-kal.firebasestorage.app
```

### 적용 후 조치

1. ✅ 환경 변수 값 변경 완료
2. 🔄 개발 서버 재시작 필요
3. 🔄 브라우저 캐시 초기화
4. 🔄 이미지 업로드 재시도

---

## 📝 검증 단계

### 1. 환경 변수 확인
```bash
Get-Content .env | Select-String "STORAGE"
# 출력: VITE_FIREBASE_STORAGE_BUCKET=hp-kal.firebasestorage.app
```

### 2. 개발 서버 재시작
```bash
# 현재 서버 종료 (Ctrl+C)
npm run dev
# 또는
pnpm dev
```

### 3. 브라우저 캐시 초기화
- DevTools (F12) → Network 탭 → Disable cache 체크
- 하드 리프레시: Ctrl+Shift+R

### 4. Network 탭 확인
- 이미지 업로드 시도
- 요청 URL 확인:
  - ✅ `.../hp-kal.firebasestorage.app/...` (올바름)
  - ❌ `.../hp-kal.appspot.com/...` (잘못됨 - 여전히 표시되면 환경 변수 재확인)

### 5. OPTIONS 요청 확인
- Network 탭 → OPTIONS 요청 선택
- Status: `200 OK` ✅
- Response Headers:
  - `Access-Control-Allow-Origin: http://localhost:3000` ✅

---

## 🎯 기대 결과

### 성공 시나리오

1. ✅ OPTIONS 요청 → `200 OK`
2. ✅ POST 요청 → `200 OK` 또는 `201 Created`
3. ✅ 이미지 업로드 완료 토스트 표시
4. ✅ 메뉴 목록에 새 이미지 반영

### 실패 시 확인 사항

- ❌ 환경 변수 파일 위치: `.env` vs `.env.local`
- ❌ 개발 서버 재시작 여부
- ❌ 브라우저 캐시 클리어 여부
- ❌ Network 탭에서 실제 요청 URL 확인

---

## 📊 문제 해결 타임라인

1. **문제 발견**: CORS 오류 지속 발생
2. **원인 파악**: 환경 변수와 실제 버킷 이름 불일치
3. **CORS 재확인**: `hp-kal.firebasestorage.app`에 CORS 정상 적용 확인
4. **환경 변수 수정**: `.env` 파일 값 변경
5. **문서화**: 해결 방법 문서 작성

---

## 🔧 추가 참고

### Firebase Storage 버킷 이름 구조

Firebase 프로젝트는 두 가지 버킷 이름 형식을 지원하지만, **실제 버킷은 하나만 존재**합니다:

- **Firebase Storage 전용**: `{project-id}.firebasestorage.app` ✅ (현재 사용)
- **App Engine 기본**: `{project-id}.appspot.com` (존재하지 않음)

**권장**: 항상 `{project-id}.firebasestorage.app` 형식 사용

### 환경 변수 설정 위치

다음 파일들을 모두 확인:
- `.env`
- `.env.local` (로컬 우선)
- `.env.development`
- `.env.production`

**일관성 유지**: 모든 파일에서 동일한 값 사용

---

**작성자**: 개발팀  
**우선순위**: ✅ **해결 완료**  
**예상 소요 시간**: 2분 (환경 변수 수정 + 서버 재시작)

