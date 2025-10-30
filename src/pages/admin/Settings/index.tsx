/**
 * 관리자 설정 센터
 * API 키/설정의 상태 진단 + 안전한 입력/가이드 제공
 */

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Settings as SettingsIcon, Shield } from 'lucide-react';
import { getCurrentUser } from '../../../lib/auth';
import { checkHealth } from '../../../lib/admin/adminSettings.api';
import type { HealthCheckResult, SettingsStatus } from '../../../types/adminSettings';
import { PaymentTab } from './PaymentTab';
import { DeliveryTab } from './DeliveryTab';
import { MapsTab } from './MapsTab';
import { FCMTab } from './FCMTab';
import { OperationsTab } from './OperationsTab';

export function SettingsCenter() {
  const [selectedTab, setSelectedTab] = useState<string>('payment');
  const [health, setHealth] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'owner' | 'admin' | null>(null);

  const user = getCurrentUser();

  useEffect(() => {
    loadHealthCheck();
    loadUserRole();
  }, []);

  async function loadHealthCheck() {
    setLoading(true);
    try {
      const result = await checkHealth();
      setHealth(result);
    } catch (error) {
      console.error('Failed to load health check:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadUserRole() {
    if (!user) return;
    
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('../../../lib/firebase');
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        setUserRole(role === 'owner' || role === 'admin' ? role : null);
      }
    } catch (error) {
      console.error('Failed to load user role:', error);
    }
  }

  function getOverallStatus(): SettingsStatus {
    if (!health) {
      return { functions: 'not_set', nicepay: 'missing', delivery: 'missing', fcm: 'missing', maps: 'missing', health: 'error' };
    }

    const nicepayConfigured = health.functions.nicepay.endpoint && health.functions.nicepay.mid && health.functions.nicepay.key;
    const deliveryConfigured = health.functions.delivery.secret;
    const fcmConfigured = health.fcm.vapidKey && health.fcm.supported;
    const mapsConfigured = health.maps.kakao || health.maps.google;

    return {
      functions: health.functions.connected ? 'connected' : 'not_set',
      nicepay: nicepayConfigured ? 'configured' : 'missing',
      delivery: deliveryConfigured ? 'configured' : 'missing',
      fcm: !health.fcm.supported ? 'not_supported' : health.fcm.vapidKey ? 'configured' : 'missing',
      maps: mapsConfigured ? 'configured' : 'missing',
      health: health.functions.connected ? 'ok' : 'error',
    };
  }

  const status = getOverallStatus();

  if (!userRole || (userRole !== 'owner' && userRole !== 'admin')) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-[#D61C1C]" />
            <h2 className="text-xl font-semibold text-[#2E1C10] mb-2">접근 권한이 없습니다</h2>
            <p className="text-[#2E1C10]/60">관리자 또는 소유자만 설정 센터에 접근할 수 있습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-6 h-6 text-[#D61C1C]" />
          <div>
            <h1 className="text-2xl text-[#2E1C10]">설정 센터</h1>
            <p className="text-sm text-[#2E1C10]/60">
              API 키 및 운영 설정 관리
              {userRole && (
                <Badge variant="secondary" className="ml-2">
                  {userRole === 'owner' ? '소유자' : '관리자'}
                </Badge>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 전체 상태 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>전체 상태</CardTitle>
          <CardDescription>주요 설정 항목의 상태를 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatusBadge label="Functions" status={status.functions} />
              <StatusBadge label="NICEPAY" status={status.nicepay} />
              <StatusBadge label="배달대행" status={status.delivery} />
              <StatusBadge label="FCM" status={status.fcm} />
              <StatusBadge label="지도" status={status.maps} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 탭 네비게이션 */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="payment">결제</TabsTrigger>
          <TabsTrigger value="delivery">배달대행</TabsTrigger>
          <TabsTrigger value="maps">지도/지오코딩</TabsTrigger>
          <TabsTrigger value="fcm">알림/FCM</TabsTrigger>
          <TabsTrigger value="operations">운영/보안</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="mt-6">
          <PaymentTab health={health} onRefresh={loadHealthCheck} />
        </TabsContent>

        <TabsContent value="delivery" className="mt-6">
          <DeliveryTab health={health} onRefresh={loadHealthCheck} />
        </TabsContent>

        <TabsContent value="maps" className="mt-6">
          <MapsTab health={health} onRefresh={loadHealthCheck} />
        </TabsContent>

        <TabsContent value="fcm" className="mt-6">
          <FCMTab health={health} onRefresh={loadHealthCheck} />
        </TabsContent>

        <TabsContent value="operations" className="mt-6">
          <OperationsTab health={health} onRefresh={loadHealthCheck} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * 상태 배지 컴포넌트
 */
function StatusBadge({ label, status }: { label: string; status: string }) {
  const config: Record<string, { color: string; text: string }> = {
    connected: { color: 'bg-green-500', text: '연결됨' },
    configured: { color: 'bg-green-500', text: '설정됨' },
    not_set: { color: 'bg-gray-500', text: '미설정' },
    missing: { color: 'bg-red-500', text: '누락' },
    not_supported: { color: 'bg-yellow-500', text: '미지원' },
  };

  const { color, text } = config[status] || { color: 'bg-gray-500', text: '알 수 없음' };

  return (
    <div className="space-y-1">
      <p className="text-xs text-[#2E1C10]/60">{label}</p>
      <Badge className={`${color} text-white`}>{text}</Badge>
    </div>
  );
}

