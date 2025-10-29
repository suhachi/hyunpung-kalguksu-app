# Firebase Storage CORS 설정 가이드

## 문제
이미지 변경 후 저장이 멈추는 현상이 발생했습니다. 원인은 Firebase Storage CORS 미설정으로 인해 브라우저에서 업로드 POST/PUT 요청이 사전요청(preflight) 단계에서 차단되기 때문입니다.

## 해결 방법

### 1. CORS 설정 파일 생성
프로젝트 루트에 `cors.json` 파일이 생성되었습니다.

### 2. CORS 설정 적용 방법

#### 방법 1: gsutil 명령어 사용 (권장)

```bash
# CORS 설정 적용
gsutil cors set cors.json gs://hp-kal.appspot.com

# 설정 확인
gsutil cors get gs://hp-kal.appspot.com
```

**필수 사전 조건:**
- Google Cloud SDK가 설치되어 있어야 합니다.
- Firebase 프로젝트에 연결된 Google Cloud 프로젝트의 서비스 계정 권한이 필요합니다.

#### 방법 2: Google Cloud Console 사용

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 프로젝트 선택: `hp-kal`
3. **Storage** → **Browser** → `hp-kal.appspot.com` 선택
4. **Configuration** 탭 클릭
5. **CORS** 섹션에서 **Edit** 클릭
6. 다음 JSON 내용 붙여넣기:

```json
[
  {
    "origin": [
      "https://hp-kal.web.app",
      "https://hp-kal.firebaseapp.com",
      "http://localhost:5173"
    ],
    "method": ["GET","HEAD","POST","PUT","DELETE","OPTIONS"],
    "responseHeader": ["Authorization","Content-Type","x-goog-meta-*","x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
```

7. **Save** 클릭

### 3. 설정 확인

CORS 설정이 적용되었는지 확인:

```bash
gsutil cors get gs://hp-kal.appspot.com
```

또는 개발자 도구 네트워크 탭에서:
- 이미지 업로드 시 POST/PUT 요청이 `firebasestorage.googleapis.com`에 200 OK로 응답하는지 확인

### 4. 재배포 없이 즉시 반영

CORS 설정은 Storage 규칙과 달리 **즉시 반영**됩니다. 별도의 배포 과정 없이 설정 후 바로 테스트할 수 있습니다.

---

## 참고사항

### 현재 CORS 설정 내용 (`cors.json`)

```json
[
  {
    "origin": [
      "https://hp-kal.web.app",
      "https://hp-kal.firebaseapp.com",
      "http://localhost:5173"
    ],
    "method": ["GET","HEAD","POST","PUT","DELETE","OPTIONS"],
    "responseHeader": ["Authorization","Content-Type","x-goog-meta-*","x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
```

### 허용된 오리진
- `https://hp-kal.web.app` (프로덕션 호스팅)
- `https://hp-kal.firebaseapp.com` (프로덕션 대체 URL)
- `http://localhost:5173` (개발 환경)

### 허용된 메서드
- GET, HEAD, POST, PUT, DELETE, OPTIONS

### 허용된 응답 헤더
- Authorization
- Content-Type
- x-goog-meta-* (메타데이터)
- x-goog-resumable (재개 가능 업로드)

---

## 적용 후 확인 사항

1. ✅ 이미지 변경 후 저장 버튼이 정상적으로 작동하는지 확인
2. ✅ 네트워크 탭에서 POST/PUT 요청이 200 OK로 성공하는지 확인
3. ✅ 저장 완료 토스트 메시지가 정상적으로 표시되는지 확인
4. ✅ 업데이트 후 메뉴 목록에 썸네일이 교체되었는지 확인 (캐시 문제 시 Hard Reload)

---

**작성일**: 2025-01-XX
**버전**: v1.0

