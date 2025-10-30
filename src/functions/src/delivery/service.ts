/**
 * 배달 태스크 업데이트 서비스
 * 상태 전이 및 유효성 검증
 */

import * as admin from 'firebase-admin';
import type { DeliveryStatus } from './types';

const db = admin.firestore();

/**
 * 허용된 상태 전이 정의
 */
const ALLOWED_TRANSITIONS: Record<DeliveryStatus, DeliveryStatus[]> = {
  created: ['assigned', 'canceled'],
  assigned: ['picked_up', 'canceled'],
  picked_up: ['delivering', 'canceled'],
  delivering: ['completed', 'canceled'],
  completed: [], // 완료 후 전이 불가
  canceled: [], // 취소 후 전이 불가
};

/**
 * 상태 전이 검증
 */
function validateStatusTransition(
  currentStatus: DeliveryStatus,
  newStatus: DeliveryStatus
): boolean {
  if (currentStatus === newStatus) {
    return true; // 동일 상태는 허용
  }

  const allowed = ALLOWED_TRANSITIONS[currentStatus];
  return allowed.includes(newStatus);
}

/**
 * 배달 태스크 업데이트
 * 
 * @param taskId 태스크 ID
 * @param patch 업데이트할 필드
 * @returns 업데이트된 문서 스냅샷
 */
export async function updateDeliveryTask(
  taskId: string,
  patch: {
    status?: DeliveryStatus;
    eta?: number;
    lastCoord?: { lat: number; lng: number; at: number };
    driverId?: string;
  }
): Promise<void> {
  const taskRef = db.collection('deliveryTasks').doc(taskId);
  const taskDoc = await taskRef.get();

  if (!taskDoc.exists) {
    throw new Error(`Delivery task not found: ${taskId}`);
  }

  const currentData = taskDoc.data();
  const currentStatus = currentData?.status as DeliveryStatus;

  // 상태 전이 검증
  if (patch.status && currentStatus !== patch.status) {
    if (!validateStatusTransition(currentStatus, patch.status)) {
      throw new Error(
        `Invalid status transition: ${currentStatus} → ${patch.status}`
      );
    }
  }

  // 업데이트 데이터 준비
  const updateData: any = {
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (patch.status) {
    updateData.status = patch.status;
  }

  if (patch.eta !== undefined) {
    updateData.eta = patch.eta;
  }

  if (patch.lastCoord) {
    updateData.lastCoord = {
      lat: patch.lastCoord.lat,
      lng: patch.lastCoord.lng,
      at: admin.firestore.Timestamp.fromMillis(patch.lastCoord.at),
    };
  }

  if (patch.driverId) {
    updateData.driverId = patch.driverId;
  }

  // Firestore 업데이트
  await taskRef.update(updateData);

  console.log(`[updateDeliveryTask] Updated task ${taskId}:`, updateData);
}

/**
 * 배달 태스크 취소
 */
export async function cancelDeliveryTask(taskId: string): Promise<void> {
  await updateDeliveryTask(taskId, {
    status: 'canceled',
  });
}

