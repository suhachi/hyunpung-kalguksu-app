/**
 * 관리자 배달 관제 페이지
 * Phase 3-1: GPS Tracking
 * 
 * 모든 배달 현황을 실시간으로 모니터링
 */

import { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, AlertTriangle, RefreshCw, Package, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { getAllMockTasks, subscribeMockTasks, getDeliveryProvider, isDeliveryEnabled, currentProvider } from '../../lib/delivery';
import { useDeliveryTasks } from '../../lib/delivery/hooks';
import { USE_FIREBASE } from '../../config/env';
import type { DeliveryTask, DeliveryStatus } from '../../types/delivery';

const STATUS_CONFIG: Record<DeliveryStatus, { label: string; color: string }> = {
  created: { label: '생성됨', color: 'bg-gray-500' },
  assigned: { label: '배정됨', color: 'bg-blue-500' },
  picked_up: { label: '픽업 완료', color: 'bg-purple-500' },
  delivering: { label: '배달 중', color: 'bg-orange-500' },
  completed: { label: '완료', color: 'bg-green-500' },
  canceled: { label: '취소', color: 'bg-gray-500' },
};

const SLA_THRESHOLD_MINUTES = 45; // SLA 기준: 45분

export default function Delivery() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'delayed'>('all');
  const [cancelingTaskId, setCancelingTaskId] = useState<string | null>(null);

  // Firestore 실시간 구독 (USE_FIREBASE=true일 때)
  const { tasks: firestoreTasks, loading: firestoreLoading, error: firestoreError } = useDeliveryTasks();
  
  // Mock 모드 (USE_FIREBASE=false일 때)
  const [mockTasks, setMockTasks] = useState<DeliveryTask[]>([]);
  const [mockLoading, setMockLoading] = useState(true);

  useEffect(() => {
    if (!isDeliveryEnabled) return;

    if (USE_FIREBASE) {
      // Firestore 모드: useDeliveryTasks 훅이 자동으로 처리
      return;
    }

    // Mock 모드: 기존 방식
    loadMockTasks();
    const unsubscribe = subscribeMockTasks(() => {
      loadMockTasks();
    });
    return unsubscribe;
  }, []);

  function loadMockTasks() {
    try {
      setMockLoading(true);
      const allTasks = getAllMockTasks();
      setMockTasks(allTasks);
    } catch (error) {
      console.error('Failed to load delivery tasks:', error);
    } finally {
      setMockLoading(false);
    }
  }

  // Firebase 모드면 Firestore 데이터, 아니면 Mock 데이터
  const tasks = USE_FIREBASE ? firestoreTasks : mockTasks;
  const loading = USE_FIREBASE ? firestoreLoading : mockLoading;

  async function handleCancelTask(taskId: string) {
    if (!confirm('이 배달을 취소하시겠습니까?')) {
      return;
    }

    setCancelingTaskId(taskId);
    try {
      const provider = getDeliveryProvider();
      await provider.cancelTask(taskId);
      // 실시간 업데이트는 자동으로 반영됨
    } catch (error) {
      console.error('Failed to cancel task:', error);
      alert('배달 취소에 실패했습니다.');
    } finally {
      setCancelingTaskId(null);
    }
  }

  if (!isDeliveryEnabled) {
    return (
      <div className="p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            배달 추적 기능이 비활성화되어 있습니다. 환경 변수에서 VITE_DELIVERY_ENABLED=true로 설정하세요.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // 통계 계산
  const activeTasks = tasks.filter(
    (t) => t.status !== 'completed' && t.status !== 'canceled'
  );
  const delayedTasks = activeTasks.filter((t) => {
    const elapsed = (Date.now() - t.createdAt) / 1000 / 60; // 분
    return elapsed > SLA_THRESHOLD_MINUTES;
  });

  const filteredTasks =
    selectedTab === 'all'
      ? tasks
      : selectedTab === 'active'
      ? activeTasks
      : delayedTasks;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2E1C10]">배달 관제</h1>
          <p className="text-sm text-[#2E1C10]/60">
            실시간 배달 현황 모니터링
            {currentProvider && (
              <Badge variant="secondary" className="ml-2">
                {currentProvider === 'mock' && 'Mock (테스트)'}
                {currentProvider === 'providerA' && 'Provider A'}
              </Badge>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/settings?tab=delivery')}
          >
            <Settings className="w-4 h-4 mr-2" />
            설정
          </Button>
          {!USE_FIREBASE && (
            <Button
              variant="outline"
              onClick={loadMockTasks}
              disabled={mockLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${mockLoading ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          )}
        </div>
      </div>

      {/* Firebase 에러 표시 */}
      {USE_FIREBASE && firestoreError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            배달 태스크를 불러오는 중 오류가 발생했습니다: {firestoreError.message}
          </AlertDescription>
        </Alert>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 배달</CardDescription>
            <CardTitle className="text-3xl">{tasks.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Package className="w-3 h-3 inline mr-1" />
              총 배달 건수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>진행 중</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{activeTasks.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Navigation className="w-3 h-3 inline mr-1" />
              현재 배달 중
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>완료</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {tasks.filter((t) => t.status === 'completed').length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Package className="w-3 h-3 inline mr-1" />
              배달 완료
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>SLA 지연</CardDescription>
            <CardTitle className="text-3xl text-red-600">{delayedTasks.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              {SLA_THRESHOLD_MINUTES}분 초과
            </p>
          </CardContent>
        </Card>
      </div>

      {/* SLA 지연 알림 */}
      {delayedTasks.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {delayedTasks.length}개의 배달이 SLA 기준({SLA_THRESHOLD_MINUTES}분)을 초과했습니다.
            즉시 확인이 필요합니다.
          </AlertDescription>
        </Alert>
      )}

      {/* 배달 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>배달 목록</CardTitle>
          <CardDescription>
            실시간으로 업데이트되는 배달 현황
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
            <TabsList>
              <TabsTrigger value="all">
                전체 ({tasks.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                진행 중 ({activeTasks.length})
              </TabsTrigger>
              <TabsTrigger value="delayed">
                지연 ({delayedTasks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  배달 내역이 없습니다
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <DeliveryTaskCard
                      key={task.taskId}
                      task={task}
                      onCancel={handleCancelTask}
                      canceling={cancelingTaskId === task.taskId}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 지도 뷰 (TODO) */}
      <Card>
        <CardHeader>
          <CardTitle>배달 지도</CardTitle>
          <CardDescription>
            모든 배달 기사의 실시간 위치
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="w-16 h-16 text-[#D61C1C] mx-auto" />
              <p className="text-[#2E1C10]">지도 뷰</p>
              <p className="text-sm text-[#2E1C10]/60">
                TODO: Kakao Maps / Google Maps 연동
              </p>
              <p className="text-xs text-[#2E1C10]/40">
                {activeTasks.length}개의 배달이 진행 중입니다
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 개별 배달 태스크 카드
 */
function DeliveryTaskCard({
  task,
  onCancel,
  canceling,
}: {
  task: DeliveryTask;
  onCancel?: (taskId: string) => void;
  canceling?: boolean;
}) {
  const elapsed = (Date.now() - task.createdAt) / 1000 / 60; // 분
  const isDelayed = elapsed > SLA_THRESHOLD_MINUTES && 
                    task.status !== 'completed' && 
                    task.status !== 'canceled';

  const statusInfo = STATUS_CONFIG[task.status];

  return (
    <div 
      className={`p-4 rounded-lg border-2 ${
        isDelayed ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono text-[#2E1C10]">
              {task.taskId}
            </span>
            <Badge 
              variant="secondary" 
              className={`${statusInfo.color} text-white`}
            >
              {statusInfo.label}
            </Badge>
            {isDelayed && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" />
                SLA 초과
              </Badge>
            )}
          </div>
          <p className="text-sm text-[#2E1C10]/60">
            주문 ID: {task.orderId}
          </p>
        </div>

        {task.eta !== undefined && task.eta > 0 && (
          <div className="text-right">
            <p className="text-xs text-[#2E1C10]/60">예상 도착</p>
            <p className={`text-lg ${isDelayed ? 'text-red-600' : 'text-[#F37021]'}`}>
              {task.eta}분
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-[#2E1C10]/60 mb-1">배달기사</p>
          <p className="text-[#2E1C10] font-mono">
            {task.driverId || '-'}
          </p>
        </div>

        <div>
          <p className="text-[#2E1C10]/60 mb-1">경과 시간</p>
          <p className={`text-[#2E1C10] ${isDelayed ? 'text-red-600' : ''}`}>
            {Math.floor(elapsed)}분
          </p>
        </div>
      </div>

      {task.lastCoord && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs font-mono text-[#2E1C10]/60">
          <MapPin className="w-3 h-3 inline mr-1" />
          위치: {task.lastCoord.lat.toFixed(4)}, {task.lastCoord.lng.toFixed(4)}
          <span className="ml-2 text-[#2E1C10]/40">
            ({new Date(task.lastCoord.at).toLocaleTimeString('ko-KR')})
          </span>
        </div>
      )}

      {/* 액션 버튼 */}
      {onCancel && task.status !== 'completed' && task.status !== 'canceled' && (
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancel(task.taskId)}
            disabled={canceling}
            className="flex-1"
          >
            {canceling ? '취소 중...' : '배달 취소'}
          </Button>
        </div>
      )}
    </div>
  );
}
