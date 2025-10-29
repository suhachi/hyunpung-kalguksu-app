# CORS 오류 해결 보고서

**발생 일시**: 2025-01-29  
**오류 내용**: Firebase Storage CORS 프리플라이트 요청 실패

---

## 🔴 발견된 오류

### 1. CORS 오류 (프리플라이트 실패)
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

### 2. Firebase Storage 재시도 한계 초과
```
FirebaseError: Firebase Storage: 
Max retry time for operation exceeded, please try again. 
(storage/retry-limit-exceeded)
```

**원인**: CORS 오류로 인해 요청이 계속 실패하여 재시도 한계 초과

---

## 🔍 원인 분석

### 문제 1: CORS 설정에 `localhost:3000` 누락

**현재 CORS 설정**:
```json
{
  "origin": [
    "https://hp-kal.web.app",
    "https://hp-kal.firebaseapp.com",
    "http://localhost:5173"  // ❌ 3000 포트 누락
  ],
  ...
}
```

**실제 개발 서버**: `http://localhost:3000`

**결과**: `localhost:3000`에서의 요청이 CORS에 의해 차단됨

### 문제 2: 버킷 이름 불일치 가능성

**CORS 설정 대상**: `hp-kal.firebasestorage.app`  
**실제 요청 URL**: `hp-kal.appspot.com`

하지만 이 둘은 별칭 관계이므로 문제가 아닐 수 있음.

---

## ✅ 해결 방법

### 즉시 수정: cors.json 업데이트 ✅ 완료

모든 로컬 개발 주소를 origin 목록에 추가:

```json
[
  {
    "origin": [
      "https://hp-kal.web.app",
      "https://hp-kal.firebaseapp.com",
      "http://localhost:3000",      // ✅ 추가 완료
      "http://127.0.0.1:3000",      // ✅ 추가 완료
      "http://localhost:5173",      // ✅ 기존
      "http://127.0.0.1:5173"       // ✅ 추가 완료
    ],
    "method": ["GET","HEAD","POST","PUT","DELETE","OPTIONS"],
    "responseHeader": ["Authorization","Content-Type","x-goog-meta-*","x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
```

### 적용 명령어 ✅ 완료

```bash
# cors.json 파일 수정 후
gcloud storage buckets update gs://hp-kal.firebasestorage.app --cors-file=cors.json

# 확인
gcloud storage buckets describe gs://hp-kal.firebasestorage.app --format="default(cors_config)"
```

**✅ 적용 완료**: 2025-01-29
- 모든 로컬 개발 주소 추가 완료
- Firebase Storage에 재적용 완료

---

## 📝 상세 오류 로그

### Console 오류
1. CORS 정책 위반 (3회 반복)
   - Origin: `http://localhost:3000`
   - Target: `https://firebasestorage.googleapis.com/v0/b/hp-kal.appspot.com/...`
   - 오류: 프리플라이트 요청이 HTTP OK 상태를 반환하지 않음

2. 리소스 로드 실패
   - `net::ERR_FAILED`
   - URL: `firebasestorage.googleapis.com/...webp`

3. Firebase Storage 에러
   - `storage/retry-limit-exceeded`
   - 최대 재시도 시간 초과

---

## 🎯 근본 원인

**CORS 설정에 `http://localhost:3000`이 포함되지 않음**

이전에 `http://localhost:5173`만 설정했지만, 실제 개발 서버는 `3000` 포트에서 실행 중입니다.

**vite.config.ts 확인**:
```typescript
server: {
  port: 3000,  // ✅ 실제 포트
  open: true,
},
```

---

## 🔧 즉시 조치 사항

### 1. cors.json 수정
```json
"http://localhost:3000" 추가
```

### 2. CORS 설정 재적용
```bash
gcloud storage buckets update gs://hp-kal.firebasestorage.app --cors-file=cors.json
```

### 3. 확인
```bash
gcloud storage buckets describe gs://hp-kal.firebasestorage.app --format="default(cors_config)"
```

### 4. 브라우저 새로고침
- 하드 리프레시 (Ctrl+Shift+R)
- 브라우저 캐시 클리어

---

## 📊 예상 결과

### 수정 후 예상 동작:
1. ✅ OPTIONS 요청 → 200 OK
2. ✅ PUT/POST 요청 → 200 OK
3. ✅ 이미지 업로드 성공
4. ✅ "저장 완료" 토스트 표시
5. ✅ 다이얼로그 자동 닫힘

---

## ⚠️ 추가 확인 사항

### 1. 포트 통일 고려
개발 환경에서 포트를 통일하는 것을 고려:
- `localhost:5173` (Vite 기본값) 사용
- 또는 `localhost:3000` 사용으로 통일

### 2. 환경별 CORS 관리
- 개발: `localhost:3000`, `localhost:5173` 모두 포함
- 프로덕션: `hp-kal.web.app`, `hp-kal.firebaseapp.com`만 포함

---

**작성자**: 개발팀  
**작성 일시**: 2025-01-29  
**우선순위**: 🔥 **긴급**

