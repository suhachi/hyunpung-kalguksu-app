# 현풍닭칼국수 디자인 토큰 가이드

## 개요
이 문서는 현풍닭칼국수 브랜드의 디자인 시스템에서 사용되는 모든 디자인 토큰을 정의합니다.
모든 토큰은 CSS 변수로 관리되며, Tailwind CSS와 통합되어 일관된 디자인을 보장합니다.

---

## 🎨 컬러 토큰

### 브랜드 컬러 (Primary)
```css
/* CSS 변수 */
--color-hyunpung-red: #D61C1C;
--color-shinkal-orange: #F37021;
--color-dark-brown: #2E1C10;
--color-cream-bg: #F9F6F3;
--color-brass-gold: #C7A45A;
```

```jsx
// Tailwind 클래스 사용법
<div className="bg-hyunpung-red">           // 배경
<div className="text-shinkal-orange">       // 텍스트
<div className="border-brass-gold">         // 테두리
```

### 시맨틱 컬러 매핑

#### Primary (현풍레드)
- **기본**: `bg-brand-primary` → `#D61C1C`
- **Hover**: `hover:bg-brand-primary-hover` → `#b71616`
- **Light**: `bg-brand-primary-light` → `rgba(214, 28, 28, 0.1)`

**사용처**: 주요 버튼, CTA, '닭' 글자, 브랜드 강조 요소

#### Secondary (신칼오렌지)
- **기본**: `bg-brand-secondary` → `#F37021`
- **Hover**: `hover:bg-brand-secondary-hover` → `#d45e1a`
- **Light**: `bg-brand-secondary-light` → `rgba(243, 112, 33, 0.1)`

**사용처**: 보조 버튼, 심볼 리본, 강조 텍스트

#### Accent (황동식기색)
- **기본**: `bg-brand-accent` → `#C7A45A`
- **Hover**: `hover:bg-brand-accent-hover` → `#b08f4a`
- **Light**: `bg-brand-accent-light` → `rgba(199, 164, 90, 0.1)`

**사용처**: 프리미엄 요소, 인테리어 포인트, 식기 톤

---

## 📐 Border Radius 토큰

```css
--radius-sm: 0.5rem;      /* 8px - 작은 요소 */
--radius-md: 0.75rem;     /* 12px - 기본 버튼 */
--radius-lg: 1rem;        /* 16px - 카드 */
--radius-xl: 1.5rem;      /* 24px - 큰 카드 */
--radius-2xl: 2rem;       /* 32px - 섹션 */
--radius-full: 9999px;    /* 완전한 원형 */
```

### Tailwind 클래스 매핑
```jsx
<div className="rounded-lg">     // 16px (기본 카드)
<div className="rounded-xl">     // 24px (큰 카드)
<div className="rounded-2xl">    // 32px (섹션, 컨테이너)
<div className="rounded-full">   // 9999px (원형 버튼, 뱃지)
```

**권장 사용**:
- **버튼**: `rounded-lg` (16px)
- **카드**: `rounded-2xl` (32px)
- **입력 필드**: `rounded-lg` (16px)
- **뱃지/태그**: `rounded-full`
- **이미지**: `rounded-xl` (24px)

---

## 🌑 Shadow 토큰

```css
--shadow-soft-1: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-soft-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-soft-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-medium: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
--shadow-large: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
```

### 사용 가이드
```jsx
// Inline 스타일로 사용
<div style={{ boxShadow: 'var(--shadow-soft-2)' }}>

// 또는 Tailwind 기본 클래스
<div className="shadow-sm">    // 아주 미세한 그림자
<div className="shadow-md">    // 중간 그림자
<div className="shadow-lg">    // 큰 그림자
<div className="shadow-xl">    // 매우 큰 그림자
```

**권장 매핑**:
- `shadow-soft-1` ≈ `shadow-sm` - 미세한 구분 (입력 필드)
- `shadow-soft-2` ≈ `shadow-md` - 카드 기본
- `shadow-soft-3` ≈ `shadow-lg` - 떠있는 요소
- `shadow-medium` - 모달, 드롭다운
- `shadow-large` - 오버레이, 중요한 모달

---

## 📏 Z-Index 토큰

```css
--z-base: 0;              /* 기본 레이어 */
--z-dropdown: 50;         /* 드롭다운 메뉴 */
--z-sticky: 100;          /* 고정 헤더 */
--z-fixed: 200;           /* 고정 요소 (사이드바) */
--z-modal-backdrop: 900;  /* 모달 배경 */
--z-modal: 1000;          /* 모달 창 */
--z-popover: 1050;        /* 팝오버 */
--z-toast: 1100;          /* 토스트 알림 */
--z-tooltip: 1200;        /* 툴팁 */
```

### 사용 방법
```jsx
// Inline 스타일로 사용 (권장)
<header style={{ zIndex: 'var(--z-sticky)' }}>
<div style={{ zIndex: 'var(--z-modal)' }}>

// 또는 Tailwind 유틸리티 (숫자 직접 입력)
<header className="z-[100]">   // sticky header
<div className="z-[1000]">     // modal
```

### 레이어 계층 구조
```
1200 - Tooltip (최상위)
1100 - Toast
1050 - Popover
1000 - Modal
 900 - Modal Backdrop
 200 - Fixed Elements
 100 - Sticky Header ★ (우리 헤더)
  50 - Dropdown
   0 - Base
```

---

## 📦 Spacing 토큰

```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
```

### Tailwind 클래스 매핑
```jsx
<div className="gap-2">      // 8px (spacing-sm)
<div className="gap-4">      // 16px (spacing-md)
<div className="gap-6">      // 24px (spacing-lg)
<div className="gap-8">      // 32px (spacing-xl)
<div className="gap-12">     // 48px (spacing-2xl)
<div className="gap-16">     // 64px (spacing-3xl)

<div className="p-4">        // padding 16px
<div className="px-6 py-3">  // padding x:24px, y:12px
```

---

## 🎯 실제 사용 예시

### 1. 버튼 컴포넌트
```jsx
// Primary Button
<button className="
  px-8 py-3 
  bg-brand-primary 
  hover:bg-brand-primary-hover 
  text-white 
  rounded-lg 
  shadow-md 
  hover:shadow-lg
  transition-all
">
  메뉴 보기
</button>

// Secondary Button
<button className="
  px-8 py-3 
  bg-brand-secondary 
  hover:bg-brand-secondary-hover 
  text-white 
  rounded-lg
">
  창업 상담
</button>

// Outline Button
<button className="
  px-6 py-2 
  border border-brand-primary 
  text-brand-primary 
  hover:bg-brand-primary 
  hover:text-white 
  rounded-lg
">
  다운로드
</button>
```

### 2. 카드 컴포넌트
```jsx
<div className="
  bg-cream-bg 
  rounded-2xl 
  p-8 
  shadow-lg 
  hover:shadow-xl 
  transition-shadow
">
  <h3 className="text-dark-brown mb-4">제목</h3>
  <p className="text-muted-foreground">내용</p>
</div>
```

### 3. 헤더 컴포넌트
```jsx
<header 
  className="bg-white border-b border-border sticky top-0"
  style={{ zIndex: 'var(--z-sticky)' }}
>
  {/* 헤더 내용 */}
</header>
```

### 4. 뱃지 컴포넌트
```jsx
<span className="
  inline-block 
  px-4 py-2 
  bg-brand-primary 
  text-white 
  rounded-full 
  text-sm
">
  대표메뉴
</span>
```

### 5. 섹션 레이아웃
```jsx
<section className="py-20 bg-cream-bg">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-8">
      {/* 그리드 아이템들 */}
    </div>
  </div>
</section>
```

---

## 🔄 마이그레이션 가이드

### 하드코딩된 값 → 토큰 사용

| 기존 코드 | 새 코드 | 설명 |
|----------|---------|------|
| `text-[#D61C1C]` | `text-hyunpung-red` | 브랜드 레드 |
| `bg-[#F37021]` | `bg-shinkal-orange` | 브랜드 오렌지 |
| `text-[#2E1C10]` | `text-dark-brown` | 다크 브라운 |
| `bg-[#F9F6F3]` | `bg-cream-bg` | 미색 배경 |
| `z-50` | `style={{ zIndex: 'var(--z-sticky)' }}` | 헤더 z-index |
| `z-[1000]` | `style={{ zIndex: 'var(--z-modal)' }}` | 모달 z-index |
| `rounded-[16px]` | `rounded-2xl` | 16px 라운드 |
| `shadow-lg` | `shadow-lg` (변경 없음) | 그림자는 Tailwind 기본 사용 |

---

## ✅ 체크리스트

새 컴포넌트를 만들 때 다음을 확인하세요:

- [ ] 브랜드 컬러는 토큰 사용 (`bg-hyunpung-red` 등)
- [ ] Border radius는 시스템 값 사용 (`rounded-2xl` 등)
- [ ] Z-index는 정의된 레이어 사용 (`var(--z-sticky)` 등)
- [ ] 간격은 일관된 spacing 토큰 사용 (`gap-8`, `p-6` 등)
- [ ] 그림자는 `shadow-{size}` 클래스 사용
- [ ] Hover 상태는 정의된 hover 컬러 사용

---

## 📞 문의

디자인 토큰 관련 문의사항이 있으시면 다음으로 연락주세요:
- 이메일: design@shinkal.co.kr
- 전화: 1566-5046
