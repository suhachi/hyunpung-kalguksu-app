/**
 * 지오코딩 (주소 → 좌표 변환)
 * Kakao/Google Maps API 지원, Mock fallback
 */

import type { DeliveryAddress } from '../../types/cart';

export interface GeocodeResult {
  lat: number;
  lng: number;
  address: string;
  formattedAddress?: string;
}

/**
 * 지오코딩 에러
 */
export class GeocodeError extends Error {
  constructor(message: string, public code: string = 'GEOCODE_ERROR') {
    super(message);
    this.name = 'GeocodeError';
  }
}

/**
 * Kakao Maps API를 사용한 지오코딩
 */
async function geocodeKakao(address: string): Promise<GeocodeResult> {
  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  
  if (!KAKAO_API_KEY) {
    throw new GeocodeError('Kakao API Key가 설정되지 않았습니다', 'NO_API_KEY');
  }

  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new GeocodeError(`Kakao API 오류: ${response.status}`, 'API_ERROR');
    }

    const data = await response.json();
    
    if (!data.documents || data.documents.length === 0) {
      throw new GeocodeError('주소를 찾을 수 없습니다', 'NOT_FOUND');
    }

    const result = data.documents[0];
    return {
      lat: parseFloat(result.y),
      lng: parseFloat(result.x),
      address: result.address_name,
      formattedAddress: result.road_address?.address_name || result.address_name,
    };
  } catch (error) {
    if (error instanceof GeocodeError) {
      throw error;
    }
    throw new GeocodeError(`지오코딩 실패: ${error}`, 'NETWORK_ERROR');
  }
}

/**
 * Google Maps API를 사용한 지오코딩
 */
async function geocodeGoogle(address: string): Promise<GeocodeResult> {
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  
  if (!GOOGLE_API_KEY) {
    throw new GeocodeError('Google API Key가 설정되지 않았습니다', 'NO_API_KEY');
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}&language=ko`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new GeocodeError(`Google API 오류: ${response.status}`, 'API_ERROR');
    }

    const data = await response.json();
    
    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      throw new GeocodeError('주소를 찾을 수 없습니다', 'NOT_FOUND');
    }

    const result = data.results[0];
    const location = result.geometry.location;
    
    return {
      lat: location.lat,
      lng: location.lng,
      address: result.formatted_address,
      formattedAddress: result.formatted_address,
    };
  } catch (error) {
    if (error instanceof GeocodeError) {
      throw error;
    }
    throw new GeocodeError(`지오코딩 실패: ${error}`, 'NETWORK_ERROR');
  }
}

/**
 * Mock 지오코딩 (개발/테스트용)
 */
async function geocodeMock(address: string): Promise<GeocodeResult> {
  // Mock: 주소에서 간단한 좌표 생성 (대구 지역 중심)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 실제로는 랜덤하지만 대구 지역 내 좌표
  const baseLat = 35.8783;
  const baseLng = 128.6264;
  
  const lat = baseLat + (Math.random() - 0.5) * 0.1;
  const lng = baseLng + (Math.random() - 0.5) * 0.1;
  
  return {
    lat,
    lng,
    address,
    formattedAddress: address,
  };
}

/**
 * 주소를 좌표로 변환 (지오코딩)
 * 
 * @param address 주소 문자열
 * @returns 좌표 및 정제된 주소
 */
export async function geocode(address: string): Promise<GeocodeResult> {
  const provider = import.meta.env.VITE_GEOCODE_PROVIDER || 'mock';
  
  try {
    switch (provider) {
      case 'kakao':
        return await geocodeKakao(address);
      case 'google':
        return await geocodeGoogle(address);
      case 'mock':
      default:
        return await geocodeMock(address);
    }
  } catch (error) {
    // API 실패 시 Mock으로 폴백
    if (provider !== 'mock') {
      console.warn(`[geocode] ${provider} 실패, Mock으로 폴백:`, error);
      return await geocodeMock(address);
    }
    throw error;
  }
}

/**
 * 거리 계산 (Haversine 공식)
 * 
 * @param lat1 시작 위도
 * @param lng1 시작 경도
 * @param lat2 종료 위도
 * @param lng2 종료 경도
 * @returns 거리 (미터)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // 지구 반지름 (미터)
  
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance); // 미터 단위로 반올림
}

/**
 * 도(degree)를 라디안으로 변환
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

