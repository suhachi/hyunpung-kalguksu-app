export type MenuCategory = 
  | 'noodle'        // 칼국수/메인메뉴
  | 'set'           // 세트메뉴
  | 'side'          // 사이드메뉴
  | 'drink'         // 음료
  | 'alcohol';      // 주류

export type MenuBadge = 
  | 'best'      // 베스트
  | 'signature' // 시그니처
  | 'spicy'     // 매운맛
  | 'cold'      // 냉메뉴
  | 'seasonal'; // 계절메뉴

// 옵션 항목 (옵션명-수량-가격)
export interface OptionItem {
  id: string;
  name: string;       // 옵션 이름 (예: "보통", "곱빼기", "순한맛")
  quantity: number;   // 수량
  price: number;      // 추가 가격
}

// 옵션 그룹 (관리자가 생성)
export interface OptionGroup {
  id: string;
  name: string;           // 옵션 그룹 이름 (예: "면양", "맵기", "토핑")
  required: boolean;      // 필수 선택 여부
  multiSelect: boolean;   // 다중 선택 가능 여부
  maxSelect?: number;     // 최대 선택 개수 (multiSelect=true일 때)
  items: OptionItem[];    // 옵션 항목들
  order: number;          // 표시 순서
}

// 메뉴에 연결된 옵션 그룹
export interface MenuOptionGroup extends OptionGroup {
  // 메뉴별로 옵션 그룹을 커스터마이즈할 수 있도록
}

export interface Menu {
  menuId: string;
  category: MenuCategory;
  name: string;
  price: number;
  description: string;
  image: string;
  badges: MenuBadge[];
  options?: {               // 간단한 옵션 구조 (기존 호환성)
    noodle?: { label: string; price: number }[];
    spicy?: { label: string; price: number }[];
    toppings?: { label: string; price: number }[];
  };
  optionGroups?: MenuOptionGroup[];  // 이 메뉴에 적용된 옵션 그룹들 (고급)
  allergens: string[];      // 알레르기 유발 성분
  origin: string;           // 원산지
  isAvailable: boolean;     // 판매 가능 여부
  availableHours?: {        // 시간제 판매
    start: string;
    end: string;
  };
  order: number;            // 정렬 순서
}

export interface MenuItem extends Menu {
  selectedOptions?: {
    noodle?: string;
    spicy?: string;
    toppings?: string[];
  };
  quantity: number;
  subtotal: number;
}

// 관리자용 메뉴 필터
export interface MenuFilters {
  category?: MenuCategory | 'all';
  search?: string;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'order';
  availableOnly?: boolean;
}

// 메뉴 수정 로그
export interface MenuLog {
  id: string;
  menuId: string;
  field: string;
  oldValue: any;
  newValue: any;
  by: string;
  byName: string;
  at: Date;
  reason?: string;
}

// 메뉴 상태 (시간제 판매 고려)
export type MenuStatus = 
  | 'available'     // 판매 중
  | 'soldout'       // 품절
  | 'time-limited'  // 시간제 (현재 시간 밖)
  | 'hidden';       // 숨김

// 카테고리 라벨 맵
export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  noodle: '메인',
  set: '세트',
  side: '사이드',
  drink: '음료',
  alcohol: '주류',
};

// 배지 라벨 맵
export const BADGE_LABELS: Record<MenuBadge, string> = {
  best: '베스트',
  signature: '시그니처',
  spicy: '매운맛',
  cold: '냉메뉴',
  seasonal: '계절메뉴',
};
