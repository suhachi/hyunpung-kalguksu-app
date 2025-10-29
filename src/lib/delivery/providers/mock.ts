/**
 * Mock 배달 대행사 Provider
 * Phase 3-1: GPS Tracking
 * 
 * 실제 배달 대행사 API 대신 로컬 시뮬레이션 제공
 */

import type {
  DeliveryProvider,
  DeliveryTask,
  CreateTaskParams,
  CreateTaskResult,
  Coordinates,
  DeliveryStatus
} from '../../../types/delivery';

const MOCK_TASKS_KEY = 'hyunpung_mock_delivery_tasks';
const SIMULATION_INTERVAL = 5000; // 5초마다 업데이트
const BASE_ETA = 30; // 기본 30분

/**
 * Mock 배달 태스크 저장소
 */
class MockDeliveryStorage {
  private tasks: Map<string, DeliveryTask> = new Map();

  constructor() {
    this.loadFromStorage();
    this.startSimulation();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(MOCK_TASKS_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.tasks = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error('[MockDelivery] Failed to load tasks:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = Object.fromEntries(this.tasks);
      localStorage.setItem(MOCK_TASKS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('[MockDelivery] Failed to save tasks:', error);
    }
  }

  /**
   * 배달 진행 시뮬레이션
   */
  private startSimulation() {
    setInterval(() => {
      let hasChanges = false;

      this.tasks.forEach((task) => {
        // 완료/취소된 태스크는 스킵
        if (task.status === 'completed' || task.status === 'canceled') {
          return;
        }

        // ETA 감소
        if (task.eta && task.eta > 0) {
          task.eta = Math.max(0, task.eta - 1);
        }

        // 상태 전환 시뮬레이션
        const now = Date.now();
        const elapsed = (now - task.createdAt) / 1000 / 60; // 분

        if (task.status === 'assigned' && elapsed > 3) {
          task.status = 'picked_up';
          hasChanges = true;
        } else if (task.status === 'picked_up' && elapsed > 5) {
          task.status = 'delivering';
          hasChanges = true;
        } else if (task.status === 'delivering' && task.eta === 0) {
          task.status = 'completed';
          hasChanges = true;
        }

        // 좌표 이동 시뮬레이션 (배달 중일 때만)
        if (task.status === 'delivering' && task.lastCoord) {
          // 목적지로 천천히 이동 (간단한 시뮬레이션)
          const deltaLat = (Math.random() - 0.5) * 0.001;
          const deltaLng = (Math.random() - 0.5) * 0.001;
          
          task.lastCoord = {
            lat: task.lastCoord.lat + deltaLat,
            lng: task.lastCoord.lng + deltaLng,
            at: now,
          };
          hasChanges = true;
        }

        task.updatedAt = now;
      });

      if (hasChanges) {
        this.saveToStorage();
        // 실제로는 Firebase에서 onSnapshot으로 자동 업데이트됨
        this.notifyListeners();
      }
    }, SIMULATION_INTERVAL);
  }

  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  createTask(params: CreateTaskParams): DeliveryTask {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const driverId = `driver_${Math.floor(Math.random() * 100)}`;
    const now = Date.now();

    // 픽업 위치에서 시작
    const task: DeliveryTask = {
      taskId,
      orderId: params.orderId,
      driverId,
      status: 'assigned',
      eta: BASE_ETA,
      lastCoord: {
        lat: params.pickup.lat,
        lng: params.pickup.lng,
        at: now,
      },
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.set(taskId, task);
    this.saveToStorage();

    return task;
  }

  getTask(taskId: string): DeliveryTask | undefined {
    return this.tasks.get(taskId);
  }

  cancelTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    task.status = 'canceled';
    task.updatedAt = Date.now();
    this.saveToStorage();

    return true;
  }

  getAllTasks(): DeliveryTask[] {
    return Array.from(this.tasks.values());
  }
}

const storage = new MockDeliveryStorage();

/**
 * Mock Delivery Provider 구현
 */
export const mockDelivery: DeliveryProvider = {
  async createTask(params: CreateTaskParams): Promise<CreateTaskResult> {
    console.log('[MockDelivery] Creating task:', params);

    const task = storage.createTask(params);

    return {
      taskId: task.taskId,
    };
  },

  async getTask(taskId: string): Promise<DeliveryTask> {
    console.log('[MockDelivery] Getting task:', taskId);

    const task = storage.getTask(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    return task;
  },

  async cancelTask(taskId: string): Promise<void> {
    console.log('[MockDelivery] Canceling task:', taskId);

    const success = storage.cancelTask(taskId);
    if (!success) {
      throw new Error(`Task not found: ${taskId}`);
    }
  },
};

/**
 * Mock 전용: 모든 태스크 조회 (관리자 대시보드용)
 */
export function getAllMockTasks(): DeliveryTask[] {
  return storage.getAllTasks();
}

/**
 * Mock 전용: 실시간 구독
 */
export function subscribeMockTasks(listener: () => void) {
  return storage.subscribe(listener);
}
