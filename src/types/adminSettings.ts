/**
 * 관리자 설정 센터 타입 정의
 * 비밀 키는 포함하지 않음 (functions:config에만 저장)
 */

/**
 * 배달 설정 (비밀 아님)
 */
export interface DeliveryConfig {
  maxDistanceKm: number;
  feeTable: DeliveryFeeTableItem[];
  nightSurcharge: number;
  weightFees: {
    light: number;
    normal: number;
    heavy: number;
  };
  blacklistAreas?: Array<{
    addressKeyword: string;
    reason: string;
  }>;
}

export interface DeliveryFeeTableItem {
  toKm: number;  // 최대 거리 (km)
  fee: number;   // 배달비 (원)
}

/**
 * 영업 시간 설정
 */
export interface BusinessHoursConfig {
  enabled: boolean;
  hours: Array<{
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    isOpen: boolean;
    openTime: string;  // "HH:mm"
    closeTime: string; // "HH:mm"
  }>;
  holidays?: string[]; // ISO date strings
}

/**
 * 시간제 판매 설정
 */
export interface TimeSalesConfig {
  enabled: boolean;
  items: Array<{
    id: string;
    menuId: string;
    startTime: string; // "HH:mm"
    endTime: string;   // "HH:mm"
    discountRate?: number;
    discountAmount?: number;
  }>;
}

/**
 * 알림 설정
 */
export interface NotificationsConfig {
  orderUpdates: boolean;
  marketing: boolean;
  promotions: boolean;
}

/**
 * 운영 설정
 */
export interface OperationsConfig {
  maintenanceMode: boolean;
  allowPickup: boolean;
  allowDelivery: boolean;
  minOrderAmount: {
    delivery: number;
    pickup: number;
  };
}

/**
 * 관리자 설정 (Firestore adminSettings/core)
 */
export interface AdminSettings {
  delivery?: DeliveryConfig;
  businessHours?: BusinessHoursConfig;
  timeSales?: TimeSalesConfig;
  notifications?: NotificationsConfig;
  operations?: OperationsConfig;
  updatedAt?: Date;
  updatedBy?: string;
}

/**
 * 헬스체크 결과
 */
export interface HealthCheckResult {
  functions: {
    connected: boolean;
    nicepay: {
      endpoint: boolean;
      mid: boolean;
      key: boolean;
    };
    delivery: {
      secret: boolean;
    };
  };
  fcm: {
    vapidKey: boolean;
    supported: boolean;
  };
  maps: {
    kakao: boolean;
    google: boolean;
  };
  firestore: {
    connected: boolean;
  };
  storage: {
    connected: boolean;
    corsConfigured: boolean;
  };
}

/**
 * 설정 상태 (UI 표시용)
 */
export interface SettingsStatus {
  functions: 'connected' | 'not_set';
  nicepay: 'configured' | 'missing';
  delivery: 'configured' | 'missing';
  fcm: 'configured' | 'missing' | 'not_supported';
  maps: 'configured' | 'missing';
  health: 'ok' | 'warning' | 'error';
  message?: string;
}

