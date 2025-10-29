/**
 * 배달 추적 관련 타입 정의
 * Phase 3-1: GPS Tracking
 */

export interface Coordinates {
  lat: number;
  lng: number;
  at: number; // timestamp
}

export type DeliveryStatus = 
  | 'assigned'      // 배정됨
  | 'picked_up'     // 픽업 완료
  | 'delivering'    // 배달 중
  | 'completed'     // 배달 완료
  | 'canceled';     // 취소됨

export interface DeliveryTask {
  taskId: string;
  orderId: string;
  driverId?: string;
  status: DeliveryStatus;
  eta?: number; // 예상 도착 시간 (분)
  lastCoord?: Coordinates;
  createdAt: number;
  updatedAt: number;
}

export type DriverStatus = 
  | 'idle'          // 대기 중
  | 'assigned'      // 배정됨
  | 'delivering'    // 배달 중
  | 'offline';      // 오프라인

export interface Driver {
  driverId: string;
  name?: string;
  phone?: string;
  lastCoord?: Coordinates;
  status: DriverStatus;
}

export interface PickupLocation {
  addr: string;
  lat: number;
  lng: number;
}

export interface DropoffLocation {
  addr: string;
  lat: number;
  lng: number;
}

export interface CreateTaskParams {
  orderId: string;
  pickup: PickupLocation;
  dropoff: DropoffLocation;
}

export interface CreateTaskResult {
  taskId: string;
}

/**
 * 배달 대행사 Provider 인터페이스
 */
export interface DeliveryProvider {
  /**
   * 배달 태스크 생성
   */
  createTask(params: CreateTaskParams): Promise<CreateTaskResult>;
  
  /**
   * 배달 태스크 조회
   */
  getTask(taskId: string): Promise<DeliveryTask>;
  
  /**
   * 배달 태스크 취소
   */
  cancelTask(taskId: string): Promise<void>;
}

/**
 * Webhook 이벤트 타입
 */
export type WebhookEventType = 
  | 'task.created'
  | 'task.assigned'
  | 'task.picked_up'
  | 'task.delivering'
  | 'task.completed'
  | 'task.canceled'
  | 'driver.location';

export interface WebhookEvent {
  type: WebhookEventType;
  taskId: string;
  timestamp: number;
  data: {
    status?: DeliveryStatus;
    driverId?: string;
    location?: Coordinates;
    eta?: number;
  };
}
