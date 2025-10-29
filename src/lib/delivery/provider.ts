/**
 * Delivery Provider 어댑터
 * Phase 3-1: GPS Tracking
 * 
 * 환경 변수에 따라 적절한 배달 대행사 Provider를 반환
 */

import type { DeliveryProvider } from '../../types/delivery';
import { mockDelivery } from './providers/mock';
import { providerA } from './providers/providerA';
import { FEATURE_FLAGS } from '../../config/env';

/**
 * Provider 맵
 */
const providers: Record<string, DeliveryProvider> = {
  mock: mockDelivery,
  providerA: providerA,
};

/**
 * 현재 활성화된 배달 Provider
 */
export const delivery = providers[FEATURE_FLAGS.deliveryProvider] || mockDelivery;

/**
 * 배달 추적 기능이 활성화되어 있는지 확인
 */
export const isDeliveryEnabled = FEATURE_FLAGS.delivery;

/**
 * 현재 사용 중인 Provider 이름
 */
export const currentProvider = FEATURE_FLAGS.deliveryProvider;
