/**
 * 관리자 설정 페이지
 * Phase 2-7: 영업시간/배달비/최소주문/크레딧
 */

import { useState, useEffect } from 'react';
import { StoreSettings, BusinessHours, DeliveryFee } from '../../types/settings';
import { getSettings, saveSettings } from '../../lib/admin/settings.api';
import { getCurrentUser } from '../../lib/auth';
import { BusinessHoursForm } from '../../components/admin/BusinessHoursForm';
import { FeesForm } from '../../components/admin/FeesForm';
import { CreditsCard } from '../../components/admin/CreditsCard';
import { OptionGroupsManagement } from '../../components/admin/OptionGroupsManagement';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [originalSettings, setOriginalSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const user = getCurrentUser();

  // 데이터 로드
  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getSettings('store-001');
      setSettings(data);
      setOriginalSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('설정을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // 저장
  const handleSave = async () => {
    if (!settings || !user) return;

    setSaving(true);
    try {
      const updated = await saveSettings(
        'store-001',
        {
          businessHours: settings.businessHours,
          deliveryFees: settings.deliveryFees,
          deliveryRadius: settings.deliveryRadius,
          minDeliveryOrder: settings.minDeliveryOrder,
          minPickupOrder: settings.minPickupOrder,
          holidays: settings.holidays,
        },
        user.uid,
        user.name
      );

      setSettings(updated);
      setOriginalSettings(updated);
      toast.success('설정을 저장했습니다');
    } catch (error: any) {
      console.error('Failed to save settings:', error);
      toast.error(error.message || '설정 저장에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  // 되돌리기
  const handleReset = () => {
    if (originalSettings) {
      setSettings({ ...originalSettings });
      toast.info('변경사항을 되돌렸습니다');
    }
  };

  // 변경사항 확인
  const hasChanges = settings && originalSettings && (
    JSON.stringify(settings.businessHours) !== JSON.stringify(originalSettings.businessHours) ||
    JSON.stringify(settings.deliveryFees) !== JSON.stringify(originalSettings.deliveryFees) ||
    settings.deliveryRadius !== originalSettings.deliveryRadius ||
    settings.minDeliveryOrder !== originalSettings.minDeliveryOrder ||
    settings.minPickupOrder !== originalSettings.minPickupOrder
  );

  if (loading || !settings) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">설정</h1>
          <p className="text-[#8B7355]">매장 운영 정보와 시스템 설정을 관리하세요</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">설정</h1>
          <p className="text-[#8B7355]">
            매장 운영 정보와 시스템 설정을 관리하세요
          </p>
        </div>

        {/* 액션 버튼 */}
        {hasChanges && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={saving}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              되돌리기
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? '저장 중...' : '저장'}
            </Button>
          </div>
        )}
      </div>

      {/* 변경사항 알림 */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ 저장하지 않은 변경사항이 있습니다. 변경사항을 적용하려면 <strong>저장</strong> 버튼을 눌러주세요.
          </p>
        </div>
      )}

      {/* 탭 메뉴 */}
      <Tabs defaultValue="business" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business">영업 설정</TabsTrigger>
          <TabsTrigger value="options">옵션 관리</TabsTrigger>
          <TabsTrigger value="credits">개발사 정보</TabsTrigger>
        </TabsList>

        {/* 영업 설정 탭 */}
        <TabsContent value="business" className="space-y-4">
          {/* 영업시간 */}
          <BusinessHoursForm
            value={settings.businessHours}
            onChange={(hours) => setSettings({ ...settings, businessHours: hours })}
          />

          {/* 배달비/최소주문 */}
          <FeesForm
            deliveryFees={settings.deliveryFees}
            deliveryRadius={settings.deliveryRadius}
            minDeliveryOrder={settings.minDeliveryOrder}
            minPickupOrder={settings.minPickupOrder}
            onDeliveryFeesChange={(fees) => setSettings({ ...settings, deliveryFees: fees })}
            onDeliveryRadiusChange={(radius) => setSettings({ ...settings, deliveryRadius: radius })}
            onMinDeliveryOrderChange={(amount) => setSettings({ ...settings, minDeliveryOrder: amount })}
            onMinPickupOrderChange={(amount) => setSettings({ ...settings, minPickupOrder: amount })}
          />
        </TabsContent>

        {/* 옵션 관리 탭 */}
        <TabsContent value="options">
          <OptionGroupsManagement />
        </TabsContent>

        {/* 크레딧 탭 */}
        <TabsContent value="credits">
          <CreditsCard />
        </TabsContent>
      </Tabs>

      {/* 하단 저장 버튼 (모바일) */}
      {hasChanges && (
        <div className="md:hidden sticky bottom-4 flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={saving}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            되돌리기
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? '저장 중...' : '저장'}
          </Button>
        </div>
      )}
    </div>
  );
}
