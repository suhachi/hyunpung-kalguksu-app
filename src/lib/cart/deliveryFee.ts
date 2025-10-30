/**
 * 거리 기반 배달비 계산
 * 구간표 기반, 야간 배달비, 가중치 옵션 지원
 */

import { calculateDistance } from '../geo/geocode';
import deliveryZonesConfig from '../../config/delivery-zones.json';

export interface DeliveryZone {
  id: string;
  name: string;
  minDistance: number;
  maxDistance: number;
  baseFee: number;
  nightFee: number;
  enabled: boolean;
}

export interface DeliveryFeeOptions {
  useNightFee?: boolean; // 야간 배달비 적용 여부
  weight?: 'light' | 'normal' | 'heavy'; // 무게 가중치
}

export interface DeliveryFeeResult {
  fee: number;
  distance: number;
  zone: DeliveryZone | null;
  isNightDelivery: boolean;
  isBlacklisted: boolean;
  canDeliver: boolean;
}

/**
 * 배달 가능 여부 확인
 */
function isBlacklisted(address: string): boolean {
  const blacklist = deliveryZonesConfig.blacklist || [];
  return blacklist.some(item =>
    address.includes(item.address)
  );
}

/**
 * 야간 배달 시간 확인
 */
function isNightTime(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const nightHours = deliveryZonesConfig.nightHours || { start: 22, end: 6 };
  
  // 22시~06시
  return hour >= nightHours.start || hour < nightHours.end;
}

/**
 * 거리 기반 배달비 계산
 * 
 * @param fromLat 출발지 위도
 * @param fromLng 출발지 경도
 * @param toLat 도착지 위도
 * @param toLng 도착지 경도
 * @param address 도착지 주소 (블랙리스트 체크용)
 * @param options 옵션 (야간 배달비, 무게 가중치)
 * @returns 배달비 계산 결과
 */
export function calculateDeliveryFee(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  address: string,
  options: DeliveryFeeOptions = {}
): DeliveryFeeResult {
  // 블랙리스트 확인
  const isBlacklistedAddr = isBlacklisted(address);
  
  if (isBlacklistedAddr) {
    return {
      fee: 0,
      distance: 0,
      zone: null,
      isNightDelivery: false,
      isBlacklisted: true,
      canDeliver: false,
    };
  }

  // 거리 계산 (미터)
  const distance = calculateDistance(fromLat, fromLng, toLat, toLng);
  
  // 최대 배달 거리 확인
  const maxDistance = deliveryZonesConfig.maxDistance || 5000;
  
  if (distance > maxDistance) {
    return {
      fee: 0,
      distance,
      zone: null,
      isNightDelivery: false,
      isBlacklisted: false,
      canDeliver: false,
    };
  }

  // 적절한 구간 찾기
  const zones = (deliveryZonesConfig.zones || []) as DeliveryZone[];
  const zone = zones.find(
    z => z.enabled && distance >= z.minDistance && distance < z.maxDistance
  );

  if (!zone) {
    // 구간에 없으면 기본 배달비 또는 배달 불가
    return {
      fee: 0,
      distance,
      zone: null,
      isNightDelivery: false,
      isBlacklisted: false,
      canDeliver: false,
    };
  }

  // 기본 배달비
  let fee = zone.baseFee;

  // 야간 배달비 적용
  const isNightDelivery = isNightTime();
  if (options.useNightFee && isNightDelivery) {
    fee += zone.nightFee;
  }

  // 무게 가중치 적용
  const weightMultiplier = deliveryZonesConfig.weightMultiplier || {};
  const weight = options.weight || 'normal';
  const multiplier = weightMultiplier[weight] || 1.0;
  fee = Math.round(fee * multiplier);

  return {
    fee,
    distance,
    zone,
    isNightDelivery,
    isBlacklisted: false,
    canDeliver: true,
  };
}

/**
 * 배달 가능 여부 확인
 */
export function canDeliverTo(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  address: string
): boolean {
  const result = calculateDeliveryFee(fromLat, fromLng, toLat, toLng, address);
  return result.canDeliver;
}

