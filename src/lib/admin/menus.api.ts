/**
 * 관리자 메뉴 관리 API
 * USE_FIREBASE=false: Mock 데이터 반환
 * USE_FIREBASE=true: Firestore 연동
 */

import { Menu, MenuFilters, MenuLog, MenuStatus } from '../../types/menu';
import menusData from '../../data/menus.json';

const USE_FIREBASE = false;

// Mock 데이터 (menus.json 기반)
let mockMenus: Menu[] = Array.isArray(menusData) ? menusData : [];

// Mock 로그
let mockMenuLogs: MenuLog[] = [];

/**
 * 메뉴 현재 상태 계산 (시간제 고려)
 */
export function getMenuStatus(menu: Menu): MenuStatus {
  if (!menu.isAvailable) {
    return 'soldout';
  }

  if (menu.availableHours) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = menu.availableHours.start.split(':').map(Number);
    const [endHour, endMinute] = menu.availableHours.end.split(':').map(Number);
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (currentTime < startTime || currentTime >= endTime) {
      return 'time-limited';
    }
  }

  return 'available';
}

/**
 * 메뉴 목록 조회 (필터/정렬)
 */
export async function getMenus(filters: MenuFilters = {}): Promise<Menu[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  // Mock 동작
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockMenus];

  // 카테고리 필터
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(m => m.category === filters.category);
  }

  // 검색 (이름/태그)
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(search) ||
      m.description.toLowerCase().includes(search) ||
      m.badges.some(b => b.toLowerCase().includes(search))
    );
  }

  // 판매 가능만
  if (filters.availableOnly) {
    filtered = filtered.filter(m => getMenuStatus(m) === 'available');
  }

  // 정렬
  switch (filters.sortBy) {
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'order':
    default:
      filtered.sort((a, b) => a.order - b.order);
      break;
  }

  return filtered;
}

/**
 * 메뉴 단건 조회
 */
export async function getMenuById(menuId: string): Promise<Menu | null> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));
  return mockMenus.find(m => m.menuId === menuId) || null;
}

/**
 * 메뉴 품절/판매 토글
 */
export async function toggleMenuAvailability(
  menuId: string,
  by: string,
  byName: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  const oldValue = menu.isAvailable;
  const newValue = !oldValue;

  menu.isAvailable = newValue;

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'isAvailable',
    oldValue,
    newValue,
    by,
    byName,
    at: new Date(),
    reason: newValue ? '판매 재개' : '품절 처리',
  });

  return menu;
}

/**
 * 메뉴 시간제 설정
 */
export async function updateMenuAvailableHours(
  menuId: string,
  availableHours: { start: string; end: string } | null,
  by: string,
  byName: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  const oldValue = menu.availableHours;
  menu.availableHours = availableHours || undefined;

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'availableHours',
    oldValue,
    newValue: availableHours,
    by,
    byName,
    at: new Date(),
    reason: availableHours ? '시간제 판매 설정' : '시간제 판매 해제',
  });

  return menu;
}

/**
 * 메뉴 수정 (가격/설명)
 */
export async function updateMenu(
  menuId: string,
  updates: Partial<Pick<Menu, 'price' | 'description'>>,
  by: string,
  byName: string,
  reason?: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  // 변경 사항 적용 및 로그 기록
  Object.entries(updates).forEach(([field, newValue]) => {
    const oldValue = menu[field as keyof Menu];
    if (oldValue !== newValue) {
      (menu as any)[field] = newValue;

      mockMenuLogs.push({
        id: `log-${Date.now()}-${field}`,
        menuId,
        field,
        oldValue,
        newValue,
        by,
        byName,
        at: new Date(),
        reason,
      });
    }
  });

  return menu;
}

/**
 * 메뉴 로그 조회
 */
export async function getMenuLogs(menuId: string): Promise<MenuLog[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));
  return mockMenuLogs
    .filter(log => log.menuId === menuId)
    .sort((a, b) => b.at.getTime() - a.at.getTime());
}

/**
 * 메뉴 통계
 */
export interface MenuStats {
  total: number;
  available: number;
  soldout: number;
  timeLimited: number;
  byCategory: Record<string, number>;
}

export async function getMenuStats(): Promise<MenuStats> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));

  const stats: MenuStats = {
    total: mockMenus.length,
    available: 0,
    soldout: 0,
    timeLimited: 0,
    byCategory: {},
  };

  mockMenus.forEach(menu => {
    const status = getMenuStatus(menu);
    if (status === 'available') stats.available++;
    else if (status === 'soldout') stats.soldout++;
    else if (status === 'time-limited') stats.timeLimited++;

    stats.byCategory[menu.category] = (stats.byCategory[menu.category] || 0) + 1;
  });

  return stats;
}

/**
 * 메뉴 생성
 */
export async function createMenu(
  menuData: Partial<Menu>,
  by: string,
  byName: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  // 중복 확인 (같은 이름 + 카테고리)
  const duplicate = mockMenus.find(
    m => m.name === menuData.name && m.category === menuData.category
  );

  if (duplicate) {
    throw new Error('동일한 이름과 카테고리의 메뉴가 이미 존재합니다');
  }

  // ID 생성
  const maxId = mockMenus.reduce((max, m) => {
    const num = parseInt(m.menuId.replace('menu-', ''));
    return Math.max(max, isNaN(num) ? 0 : num);
  }, 0);
  const menuId = `menu-${String(maxId + 1).padStart(3, '0')}`;

  // 새 메뉴 생성
  const newMenu: Menu = {
    menuId,
    category: menuData.category || 'main',
    name: menuData.name || '',
    price: menuData.price || 0,
    description: menuData.description || '',
    image: menuData.image || '',
    badges: menuData.badges || [],
    options: menuData.options,
    allergens: menuData.allergens || [],
    origin: menuData.origin || '-',
    isAvailable: menuData.isAvailable !== false,
    order: menuData.order || mockMenus.length + 1,
  };

  // 목록 최상단에 추가
  mockMenus.unshift(newMenu);

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'created',
    oldValue: null,
    newValue: newMenu,
    by,
    byName,
    at: new Date(),
    reason: '신규 메뉴 등록',
  });

  return newMenu;
}

/**
 * 메뉴 삭제 (Undo용)
 */
export async function deleteMenu(
  menuId: string,
  by: string,
  byName: string
): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  mockMenus = mockMenus.filter(m => m.menuId !== menuId);

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'deleted',
    oldValue: menu,
    newValue: null,
    by,
    byName,
    at: new Date(),
    reason: '메뉴 삭제',
  });
}
