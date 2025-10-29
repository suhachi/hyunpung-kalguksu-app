# Firestore 사용자 문서 생성 가이드

**일시**: 2025-01-29  
**사용자 UID**: `ukjp1Q5vRHSGUhi37w8FFLeARu82`  
**이메일**: `admin@hp-kal.com`

---

## ✅ Firebase Console에서 직접 생성 (권장)

### 방법 1: Firebase Console 웹 UI

**단계**:
1. [Firebase Console - Firestore](https://console.firebase.google.com/project/hp-kal/firestore/data) 접속
2. **데이터** 탭 선택
3. **컬렉션 시작** 또는 기존 `users` 컬렉션 선택
4. **문서 추가** 클릭

**문서 ID**: `ukjp1Q5vRHSGUhi37w8FFLeARu82` (수동 입력)

**필드 추가**:
| 필드명 | 타입 | 값 |
|--------|------|-----|
| `role` | string | `owner` |
| `email` | string | `admin@hp-kal.com` |
| `name` | string | `관리자` |

**저장** 클릭

---

## 🔍 생성 확인

### Firebase Console에서 확인
1. Firestore Database → 데이터
2. `users` 컬렉션 선택
3. 문서 ID: `ukjp1Q5vRHSGUhi37w8FFLeARu82` 확인
4. 필드 확인:
   - ✅ `role`: "owner"
   - ✅ `email`: "admin@hp-kal.com"
   - ✅ `name`: "관리자"

---

## 📝 문서 구조

```json
{
  "role": "owner",
  "email": "admin@hp-kal.com",
  "name": "관리자"
}
```

**경로**: `users/ukjp1Q5vRHSGUhi37w8FFLeARu82`

---

## ⚠️ 중요 사항

### 1. Role 필드 필수
- `role`이 `"owner"` 또는 `"admin"`이어야 Storage 업로드 가능
- `"customer"`는 Storage 업로드 불가

### 2. 문서 ID
- Firebase Auth UID와 일치해야 함
- 현재 UID: `ukjp1Q5vRHSGUhi37w8FFLeARu82`

### 3. Firestore Rules 확인
- 현재 Rules는 인증된 사용자만 자신의 문서를 읽을 수 있음
- 관리자 계정으로 로그인 후 생성 시 권한 통과

---

## 🔧 스크립트 실행 불가 원인

**오류**: `PERMISSION_DENIED: Missing or insufficient permissions`

**원인**: 
- Firestore Rules에서 클라이언트 SDK로 문서 생성 권한이 제한됨
- `users/{userId}` 경로는 자신의 문서만 생성 가능 (`request.auth.uid == userId`)

**해결**: 
- Firebase Console에서 직접 생성 (관리자 권한)
- 또는 Firebase Admin SDK 사용 (서버 사이드)

---

## 📊 생성 후 기대 효과

✅ 로그인 후 `useCurrentUser()`가 role을 올바르게 가져옴
✅ Storage 업로드 시 권한 통과 (`role: "owner"`)
✅ 관리자 페이지 접근 가능
✅ 이미지 업로드 정상 작동

---

**작성자**: 개발팀  
**상태**: ✅ 가이드 작성 완료, Firebase Console에서 수동 생성 필요

