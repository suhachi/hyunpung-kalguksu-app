/**
 * 알림 설정 페이지
 * Phase 3-6: 푸시 알림 시스템
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { ArrowLeft, Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner';
import {
  requestNotificationPermission,
  hasNotificationPermission,
  isNotificationSupported,
  getNotificationSettings,
  saveNotificationSettings,
  sendTestNotification,
} from '../../lib/fcm';
import type { NotificationSettings } from '../../types/notification';

export default function NotificationSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  
  // Mock user ID (실제로는 인증된 사용자 ID 사용)
  const userId = 'mock-user-1';

  useEffect(() => {
    loadSettings();
    setHasPermission(hasNotificationPermission());
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getNotificationSettings(userId);
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('설정을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPermission = async () => {
    if (!isNotificationSupported()) {
      toast.error('이 브라우저는 알림을 지원하지 않습니다');
      return;
    }

    try {
      const token = await requestNotificationPermission(userId);
      if (token) {
        setHasPermission(true);
        toast.success('알림 권한이 허용되었습니다');
      } else {
        toast.error('알림 권한이 거부되었습니다');
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
      toast.error('알림 권한 요청에 실패했습니다');
    }
  };

  const handleToggle = async (key: keyof NotificationSettings, value: boolean) => {
    if (!settings) return;

    const newSettings = {
      ...settings,
      [key]: value,
      updatedAt: new Date(),
    };

    setSettings(newSettings);

    // 즉시 저장
    try {
      await saveNotificationSettings(userId, newSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('설정 저장에 실패했습니다');
      // 롤백
      setSettings(settings);
    }
  };

  const handleTestNotification = () => {
    if (!hasPermission) {
      toast.error('알림 권한이 필요합니다');
      return;
    }

    sendTestNotification();
    toast.success('테스트 알림을 전송했습니다');
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">알림 설정</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="h-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">알림 설정</h1>
          </div>
        </div>
      </div>

      {/* 설정 */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 권한 상태 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasPermission ? (
                  <Bell className="w-5 h-5 text-[#D61C1C]" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <h3 className="text-sm">알림 권한</h3>
                  <CardDescription className="text-xs">
                    {hasPermission
                      ? '알림 권한이 허용되었습니다'
                      : '알림을 받으려면 권한을 허용해주세요'}
                  </CardDescription>
                </div>
              </div>
              {!hasPermission && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRequestPermission}
                >
                  허용
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* 전체 알림 설정 */}
        <Card>
          <CardHeader>
            <h3 className="text-sm">전체 알림</h3>
            <CardDescription className="text-xs">
              모든 푸시 알림 활성화/비활성화
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="enabled">알림 받기</Label>
              <Switch
                id="enabled"
                checked={settings.enabled}
                onCheckedChange={(value) => handleToggle('enabled', value)}
                disabled={!hasPermission}
              />
            </div>
          </CardContent>
        </Card>

        {/* 알림 타입별 설정 */}
        <Card>
          <CardHeader>
            <h3 className="text-sm">알림 종류</h3>
            <CardDescription className="text-xs">
              받고 싶은 알림을 선택하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderUpdates">주문 상태 알림</Label>
                <p className="text-xs text-gray-500">
                  주문 접수, 조리, 배달 등
                </p>
              </div>
              <Switch
                id="orderUpdates"
                checked={settings.orderUpdates}
                onCheckedChange={(value) => handleToggle('orderUpdates', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions">프로모션 알림</Label>
                <p className="text-xs text-gray-500">
                  이벤트, 할인 정보 등
                </p>
              </div>
              <Switch
                id="promotions"
                checked={settings.promotions}
                onCheckedChange={(value) => handleToggle('promotions', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reviews">리뷰 알림</Label>
                <p className="text-xs text-gray-500">
                  리뷰 요청, 답글 등
                </p>
              </div>
              <Switch
                id="reviews"
                checked={settings.reviews}
                onCheckedChange={(value) => handleToggle('reviews', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="points">포인트 알림</Label>
                <p className="text-xs text-gray-500">
                  포인트 적립, 만료 예정 등
                </p>
              </div>
              <Switch
                id="points"
                checked={settings.points}
                onCheckedChange={(value) => handleToggle('points', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>
          </CardContent>
        </Card>

        {/* 알림 효과 설정 */}
        <Card>
          <CardHeader>
            <h3 className="text-sm">알림 효과</h3>
            <CardDescription className="text-xs">
              알림을 받을 때의 효과 설정
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound">알림음</Label>
              <Switch
                id="sound"
                checked={settings.sound}
                onCheckedChange={(value) => handleToggle('sound', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="vibration">진동</Label>
              <Switch
                id="vibration"
                checked={settings.vibration}
                onCheckedChange={(value) => handleToggle('vibration', value)}
                disabled={!settings.enabled || !hasPermission}
              />
            </div>
          </CardContent>
        </Card>

        {/* 테스트 */}
        {hasPermission && settings.enabled && (
          <Card>
            <CardHeader>
              <h3 className="text-sm">테스트</h3>
              <CardDescription className="text-xs">
                테스트 알림을 전송해보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleTestNotification}
              >
                테스트 알림 보내기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
