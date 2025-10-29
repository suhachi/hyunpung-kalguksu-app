# Firebase Auth 로그인 구현 가이드

**일시**: 2025-01-29  
**사용자 정보**: 
- Email: `admin@hp-kal.com`
- UID: `ukjp1Q5vRHSGUhi37w8FFLeARu82`
- Role: `owner`

---

## ✅ 완료된 단계

### 1. Firebase Auth 계정 생성
- ✅ Email: `admin@hp-kal.com`
- ✅ UID: `ukjp1Q5vRHSGUhi37w8FFLeARu82`
- ✅ 생성일: 2025-10-29

### 2. Firestore 사용자 문서 생성 필요

**경로**: `users/ukjp1Q5vRHSGUhi37w8FFLeARu82`

**필드**:
```json
{
  "role": "owner",
  "email": "admin@hp-kal.com",
  "name": "관리자"
}
```

**생성 방법**:
1. Firebase Console → Firestore Database → 데이터
2. `users` 컬렉션 선택 (없으면 생성)
3. 문서 ID: `ukjp1Q5vRHSGUhi37w8FFLeARu82`
4. 필드 추가:
   - `role` (string): `owner`
   - `email` (string): `admin@hp-kal.com`
   - `name` (string): `관리자`

---

## 🔧 구현할 코드

### 1. Storage Rules 업데이트

**파일**: `storage.rules`

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 메뉴 이미지 (5MB, 이미지 MIME) - owner/admin만
    match /menus/{menuId}/{file} {
      allow read: if true;
      allow write: if request.auth != null
                   && exists(/databases/(default)/documents/users/$(request.auth.uid))
                   && get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ['owner','admin']
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }

    // 리뷰 사진 (3MB)
    match /reviews/{uid}/{reviewId}/{fileId} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.uid == uid
                   && request.resource.size < 3 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

**변경 사항**:
- ✅ `exists(/databases/(default)/documents/users/$(request.auth.uid))` 추가
- ✅ `get(...).data.role in ['owner','admin']` 추가

---

### 2. Auth 모듈 수정

**파일**: `src/lib/auth.ts`

**추가할 기능**:
- Firebase Auth 로그인 함수
- Firebase Auth 상태 감지
- Firestore에서 사용자 role 가져오기

---

### 3. 앱 초기화 시 자동 로그인

**옵션 1: 관리자 페이지 접속 시 자동 로그인**
- `/admin` 접속 시 `admin@hp-kal.com`으로 자동 로그인

**옵션 2: 로그인 버튼 추가**
- 관리자 페이지에 로그인 UI 추가

---

## 🎯 구현 순서

1. ✅ Firestore 문서 생성 (수동)
2. 🔄 Storage Rules 업데이트 및 배포
3. 🔄 Auth 모듈 수정 (Firebase Auth 로그인 추가)
4. 🔄 관리자 페이지 접속 시 자동 로그인
5. 🔄 테스트 (이미지 업로드)

---

## 📝 테스트 코드

### 로그인 테스트

```typescript
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./lib/firebase";

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, "admin@hp-kal.com", "비밀번호");
    console.log("로그인 성공:", auth.currentUser?.uid);
    // 예상 출력: ukjp1Q5vRHSGUhi37w8FFLeARu82
  } catch (error) {
    console.error("로그인 실패:", error);
  }
};
```

---

**작성자**: 개발팀  
**다음 단계**: Firestore 문서 생성 → Storage Rules 업데이트 → Auth 코드 구현

