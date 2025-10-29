/**
 * 옵션 그룹 관리 API
 * 관리자가 옵션 그룹을 생성/수정/삭제하는 기능
 */

import { OptionGroup, OptionItem } from '../../types/menu';

const USE_FIREBASE = false;

// Mock 옵션 그룹 데이터
let mockOptionGroups: OptionGroup[] = [
  {
    id: 'og-001',
    name: '면양',
    required: true,
    multiSelect: false,
    order: 1,
    items: [
      { id: 'oi-001', name: '보통', quantity: 1, price: 0 },
      { id: 'oi-002', name: '곱빼기', quantity: 1, price: 2000 },
      { id: 'oi-003', name: '2배', quantity: 2, price: 3000 },
    ],
  },
  {
    id: 'og-002',
    name: '맵기',
    required: true,
    multiSelect: false,
    order: 2,
    items: [
      { id: 'oi-004', name: '순한맛', quantity: 1, price: 0 },
      { id: 'oi-005', name: '보통', quantity: 1, price: 0 },
      { id: 'oi-006', name: '얼큰', quantity: 1, price: 0 },
    ],
  },
  {
    id: 'og-003',
    name: '토핑',
    required: false,
    multiSelect: true,
    maxSelect: 3,
    order: 3,
    items: [
      { id: 'oi-007', name: '수육', quantity: 1, price: 5000 },
      { id: 'oi-008', name: '김치', quantity: 1, price: 2000 },
      { id: 'oi-009', name: '만두', quantity: 4, price: 3000 },
    ],
  },
];

/**
 * 모든 옵션 그룹 조회
 */
export async function getOptionGroups(): Promise<OptionGroup[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  // Mock 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mockOptionGroups].sort((a, b) => a.order - b.order);
}

/**
 * 옵션 그룹 ID로 조회
 */
export async function getOptionGroupById(id: string): Promise<OptionGroup | null> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockOptionGroups.find((g) => g.id === id) || null;
}

/**
 * 옵션 그룹 생성
 */
export async function createOptionGroup(
  data: Omit<OptionGroup, 'id'>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  // ID 생성
  const id = `og-${Date.now()}`;

  const newGroup: OptionGroup = {
    id,
    ...data,
  };

  mockOptionGroups.push(newGroup);

  await new Promise((resolve) => setTimeout(resolve, 300));
  return newGroup;
}

/**
 * 옵션 그룹 수정
 */
export async function updateOptionGroup(
  id: string,
  data: Partial<OptionGroup>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const index = mockOptionGroups.findIndex((g) => g.id === id);
  if (index === -1) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  mockOptionGroups[index] = {
    ...mockOptionGroups[index],
    ...data,
    id, // ID는 변경 불가
  };

  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockOptionGroups[index];
}

/**
 * 옵션 그룹 삭제
 */
export async function deleteOptionGroup(id: string): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const index = mockOptionGroups.findIndex((g) => g.id === id);
  if (index === -1) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  mockOptionGroups.splice(index, 1);

  await new Promise((resolve) => setTimeout(resolve, 300));
}

/**
 * 옵션 그룹에 항목 추가
 */
export async function addOptionItem(
  groupId: string,
  item: Omit<OptionItem, 'id'>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const group = mockOptionGroups.find((g) => g.id === groupId);
  if (!group) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  const newItem: OptionItem = {
    id: `oi-${Date.now()}`,
    ...item,
  };

  group.items.push(newItem);

  await new Promise((resolve) => setTimeout(resolve, 300));
  return group;
}

/**
 * 옵션 항목 수정
 */
export async function updateOptionItem(
  groupId: string,
  itemId: string,
  data: Partial<OptionItem>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const group = mockOptionGroups.find((g) => g.id === groupId);
  if (!group) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  const itemIndex = group.items.findIndex((i) => i.id === itemId);
  if (itemIndex === -1) {
    throw new Error('옵션 항목을 찾을 수 없습니다');
  }

  group.items[itemIndex] = {
    ...group.items[itemIndex],
    ...data,
    id: itemId, // ID는 변경 불가
  };

  await new Promise((resolve) => setTimeout(resolve, 300));
  return group;
}

/**
 * 옵션 항목 삭제
 */
export async function deleteOptionItem(
  groupId: string,
  itemId: string
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const group = mockOptionGroups.find((g) => g.id === groupId);
  if (!group) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  const itemIndex = group.items.findIndex((i) => i.id === itemId);
  if (itemIndex === -1) {
    throw new Error('옵션 항목을 찾을 수 없습니다');
  }

  group.items.splice(itemIndex, 1);

  await new Promise((resolve) => setTimeout(resolve, 300));
  return group;
}

/**
 * Mock 데이터 리셋 (개발용)
 */
export function resetMockOptionGroups(): void {
  mockOptionGroups = [
    {
      id: 'og-001',
      name: '면양',
      required: true,
      multiSelect: false,
      order: 1,
      items: [
        { id: 'oi-001', name: '보통', quantity: 1, price: 0 },
        { id: 'oi-002', name: '곱빼기', quantity: 1, price: 2000 },
        { id: 'oi-003', name: '2배', quantity: 2, price: 3000 },
      ],
    },
    {
      id: 'og-002',
      name: '맵기',
      required: true,
      multiSelect: false,
      order: 2,
      items: [
        { id: 'oi-004', name: '순한맛', quantity: 1, price: 0 },
        { id: 'oi-005', name: '보통', quantity: 1, price: 0 },
        { id: 'oi-006', name: '얼큰', quantity: 1, price: 0 },
      ],
    },
    {
      id: 'og-003',
      name: '토핑',
      required: false,
      multiSelect: true,
      maxSelect: 3,
      order: 3,
      items: [
        { id: 'oi-007', name: '수육', quantity: 1, price: 5000 },
        { id: 'oi-008', name: '김치', quantity: 1, price: 2000 },
        { id: 'oi-009', name: '만두', quantity: 4, price: 3000 },
      ],
    },
  ];
}
