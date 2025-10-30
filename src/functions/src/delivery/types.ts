export type DeliveryStatus =
  | 'created'
  | 'requested'
  | 'assigned'
  | 'picked'
  | 'delivered'
  | 'canceled'
  | 'failed';

export type WebhookEventType =
  | 'task.created'
  | 'task.updated'
  | 'task.canceled'
  | 'driver.location'
  | 'driver.assigned'
  | 'driver.arrived'
  | 'driver.completed';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DeliveryTask {
  taskId: string;
  orderId: string;
  status: DeliveryStatus;
  eta?: number; // seconds
  lastCoord?: Coordinates;
  provider?: string;
  updatedAt?: number; // epoch ms
}

export interface DeliveryEvent {
  eventId: string;
  taskId: string;
  type: WebhookEventType;
  payload?: unknown;
  timestamp: number; // epoch ms
  signature?: string;
}


