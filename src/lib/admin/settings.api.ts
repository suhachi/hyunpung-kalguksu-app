/**
 * 관리자 설정 API
 * USE_FIREBASE=false: Mock 데이터 반환
 * USE_FIREBASE=true: Firestore appConfig 연동
 */

import { 
  StoreSettings, 
  DEFAULT_BUSINESS_HOURS, 
  DEFAULT_DELIVERY_FEES 
} from '../../types/settings';
import { USE_FIREBASE } from '../../config/env';

// Mock 데이터
let mockSettings: StoreSettings = {
  storeId: 'store-001',
  businessHours: DEFAULT_BUSINESS_HOURS,
  deliveryFees: DEFAULT_DELIVERY_FEES,
  deliveryRadius: 6,
  minDeliveryOrder: 15000,
  minPickupOrder: 5000,
  holidays: [],
  updatedAt: new Date(),
  updatedBy: 'admin',
  updatedByName: '관리자',
};

/**
 * 설정 조회
 */
export async function getSettings(storeId: string): Promise<StoreSettings> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    // const doc = await db.collection('appConfig').doc(storeId).get();
    // return doc.data() as StoreSettings;
    throw new Error('Firebase not configured');
  }

  // Mock 동작
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSettings;
}

/**
 * 설정 저장
 */
export async function saveSettings(
  storeId: string,
  settings: Partial<StoreSettings>,
  by: string,
  byName: string
): Promise<StoreSettings> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    // await db.collection('appConfig').doc(storeId).set({
    //   ...settings,
    //   updatedAt: new Date(),
    //   updatedBy: by,
    //   updatedByName: byName,
    // }, { merge: true });
    throw new Error('Firebase not configured');
  }

  // Mock 동작
  await new Promise(resolve => setTimeout(resolve, 500));

  mockSettings = {
    ...mockSettings,
    ...settings,
    storeId,
    updatedAt: new Date(),
    updatedBy: by,
    updatedByName: byName,
  };

  return mockSettings;
}

/**
 * 현재 영업 상태 확인
 */
export function isOpenNow(settings: StoreSettings): boolean {
  const now = new Date();
  const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 휴무일 체크
  const today = now.toISOString().split('T')[0];
  if (settings.holidays.includes(today)) {
    return false;
  }

  // 요일별 영업시간 체크
  const todayHours = settings.businessHours.find(h => h.day === dayOfWeek);
  if (!todayHours || !todayHours.isOpen) {
    return false;
  }

  return currentTime >= todayHours.openTime && currentTime < todayHours.closeTime;
}

/**
 * 배달비 계산
 */
export function calculateDeliveryFee(
  settings: StoreSettings,
  distance: number
): number | null {
  if (distance > settings.deliveryRadius) {
    return null; // 배달 불가
  }

  const fee = settings.deliveryFees.find(
    f => distance >= f.minDistance && distance < f.maxDistance
  );

  return fee ? fee.fee : null;
}
