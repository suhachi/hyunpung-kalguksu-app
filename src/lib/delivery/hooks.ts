/**
 * 배달 추적 Firestore 실시간 훅
 * Phase 3-1: GPS Tracking
 */

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { USE_FIREBASE } from '../config/env';
import type { DeliveryTask } from '../../types/delivery';

/**
 * Firestore DeliveryTask를 로컬 DeliveryTask로 변환
 */
function convertFirestoreTask(docData: any, docId: string): DeliveryTask {
  const data = docData;
  
  return {
    taskId: docId,
    orderId: data.orderId || '',
    driverId: data.driverId,
    status: data.status || 'created',
    eta: data.eta,
    lastCoord: data.lastCoord ? {
      lat: data.lastCoord.lat,
      lng: data.lastCoord.lng,
      at: data.lastCoord.at?.toMillis?.() || data.lastCoord.at || Date.now(),
    } : undefined,
    createdAt: data.createdAt?.toMillis?.() || data.createdAt || Date.now(),
    updatedAt: data.updatedAt?.toMillis?.() || data.updatedAt || Date.now(),
  };
}

/**
 * 모든 배달 태스크 실시간 구독 (관리자용)
 * 
 * @param filterStatus 상태 필터 (옵션)
 * @returns 배달 태스크 배열 및 로딩 상태
 */
export function useDeliveryTasks(filterStatus?: string) {
  const [tasks, setTasks] = useState<DeliveryTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!USE_FIREBASE) {
      // Mock 모드에서는 빈 배열 반환 (기존 Mock Provider 사용)
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    try {
      const tasksRef = collection(db, 'deliveryTasks');
      let q = query(tasksRef, orderBy('updatedAt', 'desc'));

      // 상태 필터 적용
      if (filterStatus) {
        q = query(tasksRef, where('status', '==', filterStatus), orderBy('updatedAt', 'desc'));
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const tasksList: DeliveryTask[] = [];
          
          snapshot.forEach((docSnap) => {
            try {
              const task = convertFirestoreTask(docSnap.data(), docSnap.id);
              tasksList.push(task);
            } catch (err) {
              console.error(`Failed to convert task ${docSnap.id}:`, err);
            }
          });

          setTasks(tasksList);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('[useDeliveryTasks] Error:', err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('[useDeliveryTasks] Setup error:', err);
      setError(err as Error);
      setLoading(false);
    }
  }, [filterStatus]);

  return { tasks, loading, error };
}

/**
 * 특정 배달 태스크 실시간 구독
 * 
 * @param taskId 태스크 ID
 * @returns 배달 태스크 및 로딩 상태
 */
export function useDeliveryTask(taskId: string | null) {
  const [task, setTask] = useState<DeliveryTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!USE_FIREBASE || !taskId) {
      setTask(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const taskRef = doc(db, 'deliveryTasks', taskId);

      const unsubscribe = onSnapshot(
        taskRef,
        (docSnap) => {
          if (docSnap.exists()) {
            try {
              const taskData = convertFirestoreTask(docSnap.data(), docSnap.id);
              setTask(taskData);
              setError(null);
            } catch (err) {
              console.error(`Failed to convert task ${taskId}:`, err);
              setError(err as Error);
            }
          } else {
            setTask(null);
          }
          setLoading(false);
        },
        (err) => {
          console.error('[useDeliveryTask] Error:', err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('[useDeliveryTask] Setup error:', err);
      setError(err as Error);
      setLoading(false);
    }
  }, [taskId]);

  return { task, loading, error };
}

