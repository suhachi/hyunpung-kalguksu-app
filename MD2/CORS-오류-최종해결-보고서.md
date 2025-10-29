# CORS 오류 최종 해결 보고서

**해결 일시**: 2025-01-29  
**문제**: Firebase Storage CORS 프리플라이트 요청 실패  
**원인**: `localhost:3000` 및 `127.0.0.1` 주소 누락

---

## 🔴 발견된 오류

### 콘솔 에러
```
Access to XMLHttpRequest at 
'https://firebasestorage.googleapis.com/v0/b/hp-kal.appspot.com/o?name=menus%2F...' 
from origin 'http://localhost:3000' 
has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
It does not have HTTP ok status.
```

**문제점**:
- Origin: `http://localhost:3000`
- 요청 URL: `https://firebasestorage.googleapis.com/v0/b/hp-kal.appspot.com/...`
- 프리플라이트(OPTIONS) 요청이 HTTP OK 상태를 반환하지 않음

**추가 에러**:
```
FirebaseError: Firebase Storage: 
Max retry time for operation exceeded, please try again. 
(storage/retry-limit-exceeded)
```

---

## 🔍 원인 분석

### 핵심 원인: CORS 미적용 (오리진 누락)

1. **실제 앱 오리진**: `http://localhost:3000`
2. **CORS 설정에 포함된 오리진**: `http://localhost:5173`만 포함
3. **결과**: `localhost:3000`에서의 요청이 CORS 차단됨

### 개발 포트 확인
- **vite.config.ts**: `port: 3000`
- **실제 개발 서버**: `http://localhost:3000`에서 실행

---

## ✅ 해결 조치

### 1. cors.json 수정 ✅ 완료

모든 로컬 개발 주소 추가:

```json
[
  {
    "origin": [
      "https://hp-kal.web.app",
      "https://hp-kal.firebaseapp.com",
      "http://localhost:3000",      // ✅ 추가
      "http://127.0.0.1:3000",      // ✅ 추가 (IPv4 주소)
      "http://localhost:5173",      // ✅ 기존
      "http://127.0.0.1:5173"       // ✅ 추가 (IPv4 주소)
    ],
    "method": ["GET","HEAD","POST","PUT","DELETE","OPTIONS"],
    "responseHeader": ["Authorization","Content-Type","x-goog-meta-*","x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
```

**추가한 이유**:
- `localhost:3000`: 실제 개발 서버 포트
- `127.0.0.1:3000`: IPv4 주소 (일부 브라우저/환경에서 사용)
- `127.0.0.1:5173`: IPv4 주소 (Vite 기본 포트)
- 모든 경우를 포괄하여 CORS 오류 방지

---

### 2. 버킷에 적용 ✅ 완료 (두 버킷 모두 적용)

**⚠️ 중요 발견**: 요청 URL은 `hp-kal.appspot.com`을 사용하므로 두 버킷 모두에 적용 필요

**적용 방법**: gcloud CLI
```bash
# Firebase Storage URL 버킷
gcloud storage buckets update gs://hp-kal.firebasestorage.app --cors-file=cors.json

# 실제 요청 URL 버킷 (중요!)
gcloud storage buckets update gs://hp-kal.appspot.com --cors-file=cors.json
```

**확인 결과 (hp-kal.appspot.com)**:
```yaml
cors_config:
- maxAgeSeconds: 3600
  method: [GET, HEAD, POST, PUT, DELETE, OPTIONS]
  origin:
  - https://hp-kal.web.app ✅
  - https://hp-kal.firebaseapp.com ✅
  - http://localhost:3000 ✅
  - http://127.0.0.1:3000 ✅
  - http://localhost:5173 ✅
  - http://127.0.0.1:5173 ✅
```

**대안 방법** (콘솔):
- GCP 콘솔 → Storage → `hp-kal.appspot.com` → Configuration → CORS → Edit
- 위 JSON 붙여넣기 → Save

---

### 3. 브라우저 캐시/프리플라이트 캐시 초기화 필요

**조치 방법**:
1. **DevTools 열기** (F12)
2. **Network 탭** → **Disable cache** 체크
3. **하드 리프레시**: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
4. 또는 **브라우저 완전 재시작**

**왜 필요한가?**:
- 브라우저가 이전 CORS 설정을 캐시하고 있을 수 있음
- 프리플라이트(OPTIONS) 응답이 `maxAgeSeconds: 3600` 동안 캐시됨
- 새로고침으로 최신 CORS 설정 적용

---

### 4. 재테스트 절차

**테스트 순서**:
1. 브라우저 캐시 클리어 및 새로고침
2. 관리자 로그인 (`localStorage.setItem('mockRole', 'owner')`)
3. 메뉴 수정 화면 열기
4. 이미지 파일 선택
5. 저장 버튼 클릭
6. **Network 탭 확인**:
   - ✅ `OPTIONS ...firebasestorage.googleapis.com...` → **200 OK**
   - ✅ 이어지는 `POST/PUT` → **200 OK**

**예상 결과**:
- ✅ CORS 오류 없음
- ✅ 이미지 업로드 성공
- ✅ "저장 완료" 토스트 표시
- ✅ 다이얼로그 자동 닫힘
- ✅ 저장 버튼 정상 상태로 복구

---

## 📊 상세 오류 로그 분석

### 1. CORS 정책 위반 (프리플라이트 실패)
```
Access to XMLHttpRequest ... blocked by CORS policy
Response to preflight request doesn't pass access control check: 
It does not have HTTP ok status
```

**의미**:
- OPTIONS 요청이 HTTP 200을 받지 못함
- CORS 설정에 해당 origin이 없어서 403 또는 다른 오류 반환

### 2. 리소스 로드 실패
```
Failed to load resource: net::ERR_FAILED
```

**의미**:
- CORS 오류로 인해 실제 요청도 차단됨

### 3. Firebase Storage 재시도 한계 초과
```
storage/retry-limit-exceeded
```

**의미**:
- CORS 오류가 계속 발생하여 Firebase SDK가 재시도
- 최대 재시도 시간 초과로 최종 실패

---

## 🎯 근본 원인

### 문제 1: CORS 설정 불완전
- `localhost:5173`만 포함되어 있었음
- 실제 개발 서버는 `localhost:3000`에서 실행 중

### 문제 2: IPv4 주소 누락
- 브라우저나 환경에 따라 `127.0.0.1`을 사용할 수 있음
- `localhost`와 `127.0.0.1`은 다른 origin으로 인식됨

### 문제 3: 포트 통일 부족
- Vite 기본 포트: `5173`
- 설정된 포트: `3000`
- 두 포트 모두 대응 필요

---

## 🔧 추가 점검 사항

### 1. 버킷 이름 확인 ✅
- CORS 설정 대상: `hp-kal.firebasestorage.app`
- 실제 요청 URL: `hp-kal.appspot.com` 사용
- ✅ 별칭 관계이므로 정상 (두 이름 모두 같은 버킷)

### 2. 헤더 허용 확인 ✅
- `x-goog-resumable`: 재개편 업로드 지원
- ✅ JSON에 포함되어 있음

### 3. Storage Rules 권한 확인 ✅
- 인증된 사용자만 업로드 가능
- Mock 모드에서는 모든 사용자가 인증된 것으로 처리
- ✅ 문제 없음

### 4. Hosting/프록시 포트 확인 ✅
- `vite.config.ts`: `port: 3000`
- ✅ CORS에 `localhost:3000` 추가 완료

---

## ✅ 최종 확인 사항

### 완료된 작업
1. ✅ `cors.json`에 모든 로컬 주소 추가 (`localhost:3000`, `127.0.0.1:3000`, `localhost:5173`, `127.0.0.1:5173`)
2. ✅ Firebase Storage CORS 설정 재적용 완료
3. ✅ 적용 확인 완료 (6개 origin 모두 확인됨)

### 다음 단계 (사용자)
1. ⏳ 브라우저 캐시 클리어 및 새로고침
2. ⏳ 메뉴 이미지 업로드 재테스트
3. ⏳ Network 탭에서 OPTIONS 200 OK 확인

---

## 📝 권장 사항

### 향후 개발 환경 통일
1. **포트 통일**: 
   - Vite 기본 포트 `5173` 사용으로 통일
   - 또는 `3000` 포트로 통일하여 설정 간소화

2. **환경별 CORS 관리**:
   - 개발 환경: 모든 localhost/127.0.0.1 포트 포함
   - 프로덕션: `hp-kal.web.app`, `hp-kal.firebaseapp.com`만 포함

3. **자동화 스크립트**:
   ```bash
   # CORS 설정 자동 적용
   gcloud storage buckets update gs://hp-kal.firebasestorage.app --cors-file=cors.json
   ```

---

## 🎯 최종 상태

**CORS 설정**: ✅ **완료**  
- 프로덕션 도메인 2개
- 로컬 개발 주소 4개
- 총 6개 origin 허용

**적용 상태**: ✅ **확인됨**
- Firebase Storage에 정상적으로 적용됨
- `gcloud storage buckets describe`로 확인 완료

**다음 단계**: 
- 브라우저 새로고침 후 재테스트 필요
- Network 탭에서 OPTIONS 200 OK 확인

---

**작성자**: 개발팀  
**해결 일시**: 2025-01-29  
**상태**: ✅ **CORS 설정 완료, 재테스트 대기**

