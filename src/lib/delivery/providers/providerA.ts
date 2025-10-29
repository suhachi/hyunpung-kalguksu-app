/**
 * Provider A (실제 배달 대행사) - 스켈레톤
 * Phase 3-1: GPS Tracking
 * 
 * TODO: 실제 배달 대행사 API 엔드포인트 및 인증 정보 설정
 */

import type {
  DeliveryProvider,
  DeliveryTask,
  CreateTaskParams,
  CreateTaskResult,
} from '../../../types/delivery';
import { PROVIDER_A_CONFIG } from '../../../config/env';

/**
 * Provider A API Client
 */
class ProviderAClient {
  private baseUrl: string;
  private apiKey: string;
  private merchantId: string;

  constructor(config: typeof PROVIDER_A_CONFIG) {
    this.baseUrl = config.apiUrl;
    this.apiKey = config.apiKey;
    this.merchantId = config.merchantId;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
      'X-Merchant-Id': this.merchantId,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Provider A API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[ProviderA] Request failed:', error);
      throw error;
    }
  }

  /**
   * 배달 태스크 생성
   * 
   * TODO: 실제 API 스펙에 맞게 수정
   */
  async createDeliveryTask(params: {
    orderId: string;
    pickup: { address: string; lat: number; lng: number };
    dropoff: { address: string; lat: number; lng: number };
  }) {
    return this.request<{ taskId: string }>('/v1/tasks', {
      method: 'POST',
      body: JSON.stringify({
        order_id: params.orderId,
        pickup_location: {
          address: params.pickup.address,
          latitude: params.pickup.lat,
          longitude: params.pickup.lng,
        },
        dropoff_location: {
          address: params.dropoff.address,
          latitude: params.dropoff.lat,
          longitude: params.dropoff.lng,
        },
      }),
    });
  }

  /**
   * 배달 태스크 조회
   * 
   * TODO: 실제 API 스펙에 맞게 수정
   */
  async getDeliveryTask(taskId: string) {
    return this.request<any>(`/v1/tasks/${taskId}`, {
      method: 'GET',
    });
  }

  /**
   * 배달 태스크 취소
   * 
   * TODO: 실제 API 스펙에 맞게 수정
   */
  async cancelDeliveryTask(taskId: string) {
    return this.request<void>(`/v1/tasks/${taskId}/cancel`, {
      method: 'POST',
    });
  }
}

const client = new ProviderAClient(PROVIDER_A_CONFIG);

/**
 * Provider A Delivery Provider 구현
 */
export const providerA: DeliveryProvider = {
  async createTask(params: CreateTaskParams): Promise<CreateTaskResult> {
    console.log('[ProviderA] Creating task:', params);

    const response = await client.createDeliveryTask({
      orderId: params.orderId,
      pickup: {
        address: params.pickup.addr,
        lat: params.pickup.lat,
        lng: params.pickup.lng,
      },
      dropoff: {
        address: params.dropoff.addr,
        lat: params.dropoff.lat,
        lng: params.dropoff.lng,
      },
    });

    return {
      taskId: response.taskId,
    };
  },

  async getTask(taskId: string): Promise<DeliveryTask> {
    console.log('[ProviderA] Getting task:', taskId);

    const data = await client.getDeliveryTask(taskId);

    // TODO: API 응답을 DeliveryTask 타입으로 변환
    return {
      taskId: data.id || taskId,
      orderId: data.order_id || '',
      driverId: data.driver_id,
      status: mapProviderAStatus(data.status),
      eta: data.eta,
      lastCoord: data.driver_location
        ? {
            lat: data.driver_location.latitude,
            lng: data.driver_location.longitude,
            at: Date.now(),
          }
        : undefined,
      createdAt: new Date(data.created_at).getTime(),
      updatedAt: new Date(data.updated_at).getTime(),
    };
  },

  async cancelTask(taskId: string): Promise<void> {
    console.log('[ProviderA] Canceling task:', taskId);

    await client.cancelDeliveryTask(taskId);
  },
};

/**
 * Provider A 상태를 내부 상태로 매핑
 * 
 * TODO: 실제 API 상태 값에 맞게 수정
 */
function mapProviderAStatus(status: string): DeliveryTask['status'] {
  const statusMap: Record<string, DeliveryTask['status']> = {
    'assigned': 'assigned',
    'picked_up': 'picked_up',
    'in_transit': 'delivering',
    'delivered': 'completed',
    'cancelled': 'canceled',
  };

  return statusMap[status] || 'assigned';
}
