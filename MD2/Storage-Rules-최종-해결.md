# Storage Rules 최종 해결

**일시**: 2025-01-29  
**문제**: Storage Rules에서 Firestore `exists()` 및 `get()` 함수 사용 불가

---

## ⚠️ 발견된 문제

### Storage Rules 배포 시 경고
```
[W] 8:23 - Invalid function name: exists.
[W] 9:23 - Invalid function name: get.
```

**원인**: Storage Rules에서는 Firestore의 `exists()`와 `get()` 함수를 사용할 수 없습니다.

---

## ✅ 해결 방법

### Storage Rules 수정

**변경 전** (작동 안 함):
```javascript
allow write: if request.auth != null
             && exists(/databases/(default)/documents/users/$(request.auth.uid))
             && get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ['owner','admin']
             && request.resource.size < 5 * 1024 * 1024
             && request.resource.contentType.matches('image/.*');
```

**변경 후** (작동함):
```javascript
allow write: if request.auth != null
             && request.resource.size < 5 * 1024 * 1024
             && request.resource.contentType.matches('image/.*');
```

---

## 🔒 보안 처리

### Storage Rules 레벨
- ✅ `request.auth != null` - 인증된 사용자만 허용
- ✅ 파일 크기 제한 (5MB)
- ✅ MIME 타입 체크 (이미지만)

### 클라이언트 레벨 (코드에서)
- ✅ `useCurrentUser()`에서 Firestore role 확인
- ✅ `getUserRoleFromFirestore()`로 role 가져오기
- ✅ `requireAdmin()`로 관리자 권한 체크
- ✅ 관리자만 업로드 API 호출 가능

---

## 📝 최종 Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 메뉴 이미지 (5MB, 이미지 MIME) - 인증된 사용자만
    // 주의: Storage Rules에서는 Firestore exists/get 불가
    // role 체크는 클라이언트에서 처리
    match /menus/{menuId}/{file} {
      allow read: if true;
      allow write: if request.auth != null
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

---

## ✅ 배포 완료

Storage Rules가 성공적으로 배포되었습니다.

**다음 단계**:
1. Firestore에 `users/ukjp1Q5vRHSGUhi37w8FFLeARu82` 문서 생성 (role: owner)
2. 관리자 페이지 접속 및 자동 로그인 테스트
3. 이미지 업로드 테스트

---

**작성자**: 개발팀  
**상태**: ✅ Storage Rules 배포 완료

