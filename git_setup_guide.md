# GitHub 연동 가이드

## 📋 현재 상태

```
Git 저장소: ❌ 없음
.gitignore: ✅ 생성됨
```

## 🔧 GitHub 연동 단계

### 1단계: Git 저장소 초기화

```bash
# 프로젝트 루트에서
git init

# 브랜치 이름 설정
git branch -M main

# 초기 커밋 생성
git add .
git commit -m "Initial commit: 현풍닭칼국수 배달앱 프로젝트"
```

### 2단계: GitHub 저장소 생성

1. **GitHub 접속**: https://github.com
2. **새 레포지토리 생성**:
   - Repository name: `hyunpung-kalguksu-app`
   - Description: 현풍닭칼국수 PWA 배달앱
   - Public 또는 Private 선택
   - **Initialize with README 체크하지 않기** (이미 파일 존재)

### 3단계: 원격 저장소 연결

```bash
# GitHub에서 제공하는 URL 사용
git remote add origin https://github.com/YOUR_USERNAME/hyunpung-kalguksu-app.git

# 확인
git remote -v
```

### 4단계: 첫 푸시

```bash
# 수정사항 커밋 (분석 보고서 제외)
git add .
git commit -m "feat: 프로젝트 초기 구조 및 코어 기능 구현

- React 18 + TypeScript + Vite 기반
- 13개 고객 페이지 구현
- 11개 관리자 페이지 구현
- 장바구니 Context API
- Mock 데이터 기반 전체 기능
- Firebase Rules 및 Indexes 정의
- Phase 2, 3 기능 완료"

# 첫 푸시
git push -u origin main
```

## ⚠️ 주의사항

### 커밋 전 확인할 파일들

**분석 보고서는 제외 권장**:
```bash
# 루트의 분석 보고서는 별도 관리
현풍칼국수_배달앱_*.md
Pre-Flight_체크리스트_점검보고서.md
```

**환경 변수 파일**:
```bash
# .env 파일은 절대 커밋하지 않음
# .env.example만 커밋
```

### 커밋되지 말아야 할 것들

1. ❌ `node_modules/` (용량이 큼)
2. ❌ `.env` (민감 정보)
3. ❌ `dist/`, `build/` (빌드 결과물)
4. ❌ IDE 설정 파일
5. ❌ 로그 파일

## 📁 권장 파일 구조

```
.hyunpung-kalguksu-app/
├── .gitignore          ✅ 생성됨
├── package.json        ✅
├── vite.config.ts      ✅
├── index.html          ✅
├── README.md           ✅
├── src/                ✅
│   ├── App.tsx
│   ├── main.tsx
│   ├── pages/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── ...
├── public/             (필요 시)
└── functions/          ✅ (Firebase Functions)
```

## 🎯 권장 커밋 전략

### 초기 커밋
```bash
git commit -m "feat: 프로젝트 초기 설정 및 코어 기능

- React 18 + TypeScript + Vite 설정
- Tailwind CSS + shadcn/ui
- 라우팅 구조 (고객 13개, 관리자 11개)
- 장바구니 Context API
- Firebase Rules 및 Indexes 정의"
```

### Branch 전략
```bash
# main 브랜치: 프로덕션 준비 버전
# develop: 개발 브랜치
# feature/xxx: 기능별 브랜치

git checkout -b develop
git checkout -b feature/firebase-integration
```

## 🔍 커밋 전 체크리스트

### 필수 수정 사항 (커밋 전 권장)

1. **Import 구문 수정** (92개)
   ```bash
   # from '@package@version' → from '@package'
   ```

2. **Package.json 버전 고정**
   ```json
   // "*" 제거하고 버전 명시
   ```

3. **루트 tsconfig.json 생성**
   ```bash
   # TypeScript 설정 파일 생성
   ```

4. **라우팅 경로 수정**
   ```typescript
   # navigate('/app/cart') → navigate('/cart')
   ```

## 📊 프로젝트 정보

### 저장소 이름 제안
```
hyunpung-kalguksu-app
또는
hyunpung-delivery-app
```

### README.md 업데이트
```markdown
# 현풍닭칼국수 PWA 배달앱

현풍닭칼국수 가게 전용 커스텀 PWA 배달 주문 시스템

## 기술 스택
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Firebase (Auth, Firestore, Functions, FCM)
- NICEPAY 결제 연동

## 개발 상태
- UI 구현: 95% ✅
- 백엔드 연동: 0% ⚠️ (Mock 환경)
- PWA 기능: 10% ⚠️
```

## 🚀 추천 플로우

```bash
# 1. Git 초기화
git init
git branch -M main

# 2. 기본 파일 커밋 (분석 보고서 제외)
git add .gitignore
git add package.json
git add vite.config.ts
git add index.html
git add README.md
git add src/
git commit -m "feat: 초기 프로젝트 구조"

# 3. GitHub 원격 연결
git remote add origin https://github.com/USERNAME/hyunpung-kalguksu-app.git

# 4. 푸시
git push -u origin main
```

## 💡 Git Aliases 추천

```bash
# 편리한 명령어 등록
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

---

**작성일**: 2025-10-29 10:58  
**프로젝트**: 현풍닭칼국수 배달앱


