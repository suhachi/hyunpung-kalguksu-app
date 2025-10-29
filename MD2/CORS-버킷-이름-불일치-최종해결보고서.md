# CORS 버킷 이름 불일치 문제 - 최종 해결 보고서

**일시**: 2025-01-29  
**상태**: 🔍 원인 파악 완료 → 🔧 해결 방법 제시

---

## ✅ 확인 완료 사항

### 1. 실제 버킷 확인
```bash
gcloud storage buckets describe gs://hp-kal.firebasestorage.app
```

**결과**:
- ✅ 버킷 존재: `hp-kal.firebasestorage.app`
- ✅ CORS 적용 완료 (localhost:3000 포함)
- ✅ 모든 origin 포함:
  - `https://hp-kal.web.app`
  - `https://hp-kal.firebaseapp.com`
  - `http://localhost:3000` ✅
  - `http://127.0.0.1:3000` ✅
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`

### 2. CORS 설정 상태
```yaml
cors_config:
  - maxAgeSeconds: 3600
    method: [GET, HEAD, POST, PUT, DELETE, OPTIONS]
    origin:
      - https://hp-kal.web.app
      - https://hp-kal.firebaseapp.com
      - http://localhost:3000  # ✅ 포함됨
      - http://127.0.0.1:3000  # ✅ 포함됨
      - http://localhost:5173
      - http://127.0.0.1:5173
```

---

## 🔴 문제의 핵심

### 발견된 불일치

**요청 URL**:
```
https://firebasestorage.googleapis.com/v0/b/hp-kal.appspot.com/o?...
```

**실제 버킷**:
```
gs://hp-kal.firebasestorage.app
```

**결론**: 
- 환경 변수에서 `hp-kal.appspot.com` 사용
- 실제 버킷은 `hp-kal.firebasestorage.app`
- Firebase SDK가 잘못된 버킷 이름으로 요청을 보내고 있음

---

## 💡 해결 방법

### 방법 1: 환경 변수 수정 (권장) ⭐

**`.env` 또는 `.env.local` 파일 수정**:
```bash
# 변경 전
VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com

# 변경 후
VITE_FIREBASE_STORAGE_BUCKET=hp-kal.firebasestorage.app
```

**적용 순서**:
1. `.env` 또는 `.env.local` 파일 열기
2. `VITE_FIREBASE_STORAGE_BUCKET` 값 확인
3. `hp-kal.appspot.com` → `hp-kal.firebasestorage.app` 변경
4. 개발 서버 재시작: `npm run dev` 또는 `pnpm dev`

### 방법 2: Google Cloud Console에서 버킷 별칭 확인 (선택)

**Firebase Console 확인**:
1. [Firebase Console](https://console.firebase.google.com/project/hp-kal/settings/general)
2. Storage 탭 확인
3. 기본 버킷 이름 확인

**Google Cloud Console 확인**:
1. [Storage Browser](https://console.cloud.google.com/storage/browser?project=hp-kal)
2. 버킷 목록에서:
   - `hp-kal.firebasestorage.app` ✅ 존재
   - `hp-kal.appspot.com` ❌ 존재하지 않음

---

## 🔧 즉시 조치 단계

### Step 1: 환경 변수 파일 위치 확인
```bash
# 루트 디렉토리에서
ls -la .env* 2>/dev/null || dir .env* 2>nul
```

### Step 2: 환경 변수 값 확인
```bash
# Windows PowerShell
Get-Content .env | Select-String "STORAGE"

# 또는
type .env | findstr "STORAGE"
```

### Step 3: 값 수정
```bash
# VITE_FIREBASE_STORAGE_BUCKET=hp-kal.appspot.com
# ↓ 변경
# VITE_FIREBASE_STORAGE_BUCKET=hp-kal.firebasestorage.app
```

### Step 4: 개발 서버 재시작
```bash
# Ctrl+C로 현재 서버 종료
npm run dev
# 또는
pnpm dev
```

### Step 5: 브라우저 캐시 초기화
- DevTools 열기 (F12)
- Network 탭 → Disable cache 체크
- 하드 리프레시 (Ctrl+Shift+R)

---

## 📝 코드에서 확인할 위치

### 파일: `src/lib/firebase.ts`
```typescript
const firebaseConfig = {
  // ...
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  // ...
};
```

**확인 사항**:
- `import.meta.env.VITE_FIREBASE_STORAGE_BUCKET` 값이 올바른지
- 환경 변수가 로드되는지 (빌드 시점에 주입됨)

---

## 🎯 검증 방법

### 1. 브라우저 콘솔 확인
```javascript
// 개발자 도구 Console에서 실행
console.log(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
// 출력: "hp-kal.firebasestorage.app" 이어야 함
```

### 2. Network 탭 확인
- 이미지 업로드 시도
- 요청 URL 확인:
  - ❌ `.../hp-kal.appspot.com/...` (잘못됨)
  - ✅ `.../hp-kal.firebasestorage.app/...` (올바름)

### 3. OPTIONS 요청 확인
- Network 탭에서 OPTIONS 요청 선택
- Status: `200 OK` 확인
- Response Headers에 `Access-Control-Allow-Origin` 포함 확인

---

## ⚠️ 추가 확인 사항

### 1. 여러 환경 변수 파일 확인
- `.env`
- `.env.local`
- `.env.development`
- `.env.production`

**모든 파일에서 일관성 유지**:
```bash
VITE_FIREBASE_STORAGE_BUCKET=hp-kal.firebasestorage.app
```

### 2. 빌드 후 환경 변수 확인
```bash
npm run build
# 빌드된 파일에서 환경 변수 주입 확인
```

---

## 📊 문제 요약

| 항목 | 값 | 상태 |
|------|-----|------|
| **실제 버킷** | `hp-kal.firebasestorage.app` | ✅ 존재 |
| **CORS 설정** | localhost:3000 포함 | ✅ 적용됨 |
| **환경 변수** | `hp-kal.appspot.com` (추정) | ❌ 불일치 |
| **요청 URL** | `hp-kal.appspot.com` 사용 | ❌ 잘못됨 |

---

## ✅ 최종 해결 체크리스트

- [ ] `.env` 파일 확인
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` 값 변경
- [ ] 개발 서버 재시작
- [ ] 브라우저 캐시 초기화
- [ ] Network 탭에서 올바른 버킷 이름 확인
- [ ] OPTIONS → 200 OK 확인
- [ ] 이미지 업로드 성공 확인

---

**작성자**: 개발팀  
**우선순위**: 🔥 **긴급 - 즉시 조치**  
**예상 소요 시간**: 2분

