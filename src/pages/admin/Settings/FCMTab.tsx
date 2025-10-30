/**
 * FCM 알림 설정 탭
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';
import { RefreshCw, CheckCircle2, XCircle, AlertTriangle, Download } from 'lucide-react';
import { generateEnvTemplate } from '../../../lib/admin/adminSettings.api';
import type { HealthCheckResult } from '../../../types/adminSettings';
import { toast } from 'sonner';

interface FCMTabProps {
  health: HealthCheckResult | null;
  onRefresh: () => void;
}

export function FCMTab({ health, onRefresh }: FCMTabProps) {
  const [vapidKey, setVapidKey] = useState('');
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);

  const fcmStatus = health?.fcm || { vapidKey: false, supported: false };

  useEffect(() => {
    checkBrowserSupport();
    checkPermission();
  }, []);

  function checkBrowserSupport() {
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
    setSupported(isSupported);
  }

  function checkPermission() {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }

  const handleDownloadEnvTemplate = () => {
    const template = generateEnvTemplate();
    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.env.local.template';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('.env 템플릿이 다운로드되었습니다');
  };

  const handleRequestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('이 브라우저는 알림을 지원하지 않습니다');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      if (permission === 'granted') {
        toast.success('알림 권한이 허용되었습니다');
      } else {
        toast.warning('알림 권한이 거부되었습니다');
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
      toast.error('권한 요청에 실패했습니다');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 상태 패널 */}
      <Card>
        <CardHeader>
          <CardTitle>상태 진단</CardTitle>
          <CardDescription>FCM 알림 설정 상태 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {fcmStatus.supported ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="text-sm text-[#2E1C10]">브라우저 지원</span>
            </div>
            <Badge variant={fcmStatus.supported ? 'default' : 'destructive'}>
              {fcmStatus.supported ? 'Supported' : 'Not Supported'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">VAPID Key</span>
            <Badge variant={fcmStatus.vapidKey ? 'default' : 'destructive'}>
              {fcmStatus.vapidKey ? 'Set' : 'Missing'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">알림 권한</span>
            <Badge
              variant={
                permission === 'granted' ? 'default' : permission === 'denied' ? 'destructive' : 'secondary'
              }
            >
              {permission === 'granted'
                ? 'Granted'
                : permission === 'denied'
                ? 'Denied'
                : permission === 'default'
                ? 'Default'
                : 'Unknown'}
            </Badge>
          </div>

          <Alert
            variant={
              fcmStatus.supported && fcmStatus.vapidKey && permission === 'granted'
                ? 'default'
                : 'destructive'
            }
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {fcmStatus.supported && fcmStatus.vapidKey && permission === 'granted'
                ? 'FCM 알림이 정상적으로 설정되었습니다.'
                : 'FCM 알림 설정이 완료되지 않았습니다.'}
            </AlertDescription>
          </Alert>

          {permission !== 'granted' && (
            <Button onClick={handleRequestPermission} variant="outline" size="sm" className="w-full">
              알림 권한 요청
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={onRefresh} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            새로고침
          </Button>
        </CardContent>
      </Card>

      {/* 설정/가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>설정 가이드</CardTitle>
          <CardDescription>FCM VAPID Key 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-xs">
              VAPID Key는 클라이언트 환경 변수(.env.local)에 저장됩니다.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="vapidKey">FCM VAPID Key</Label>
            <Input
              id="vapidKey"
              type="password"
              placeholder="YOUR_VAPID_KEY"
              value={vapidKey}
              onChange={(e) => setVapidKey(e.target.value)}
            />
            <p className="text-xs text-[#2E1C10]/60">
              .env.local 파일에 <code>VITE_FIREBASE_VAPID_KEY=...</code> 추가
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Label>.env.local 템플릿</Label>
            <p className="text-xs text-[#2E1C10]/60 mb-2">
              VAPID Key를 포함한 .env 템플릿을 다운로드하세요.
            </p>
            <Button onClick={handleDownloadEnvTemplate} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              .env 템플릿 다운로드
            </Button>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>체크리스트:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Firebase Console에서 VAPID Key 발급</li>
                <li>.env.local에 VAPID Key 추가</li>
                <li>Service Worker 등록 (public/firebase-messaging-sw.js)</li>
                <li>알림 권한 요청</li>
                <li>FCM 토큰 등록</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

