/**
 * 배달대행 설정 탭
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';
import { Copy, RefreshCw, CheckCircle2, XCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { generateDeliveryCLI, getAdminSettings, saveAdminSettings } from '../../../lib/admin/adminSettings.api';
import type { HealthCheckResult, DeliveryConfig } from '../../../types/adminSettings';
import { toast } from 'sonner';

interface DeliveryTabProps {
  health: HealthCheckResult | null;
  onRefresh: () => void;
}

export function DeliveryTab({ health, onRefresh }: DeliveryTabProps) {
  const [secret, setSecret] = useState('');
  const [allowedIps, setAllowedIps] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [config, setConfig] = useState<DeliveryConfig | null>(null);
  const [maxDistance, setMaxDistance] = useState(5);
  const [nightSurcharge, setNightSurcharge] = useState(1000);
  const [loading, setLoading] = useState(true);

  const deliveryStatus = health?.functions.delivery || { secret: false };

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    setLoading(true);
    try {
      const settings = await getAdminSettings();
      if (settings?.delivery) {
        setConfig(settings.delivery);
        setMaxDistance(settings.delivery.maxDistanceKm);
        setNightSurcharge(settings.delivery.nightSurcharge);
      }
    } catch (error) {
      console.error('Failed to load delivery config:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveConfig() {
    try {
      await saveAdminSettings({
        delivery: {
          ...config,
          maxDistanceKm: maxDistance,
          nightSurcharge,
          feeTable: config?.feeTable || [],
          weightFees: config?.weightFees || { light: 0, normal: 0, heavy: 1000 },
        },
      });
      toast.success('배달 설정이 저장되었습니다');
    } catch (error) {
      console.error('Failed to save config:', error);
      toast.error('설정 저장에 실패했습니다');
    }
  }

  const handleCopyCLI = () => {
    if (!secret) {
      toast.error('Webhook Secret을 입력해주세요');
      return;
    }

    const cliCommand = generateDeliveryCLI({
      secret,
      allowedIps: allowedIps || undefined,
    });

    navigator.clipboard.writeText(cliCommand);
    toast.success('CLI 명령이 복사되었습니다');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 상태 패널 */}
      <Card>
        <CardHeader>
          <CardTitle>상태 진단</CardTitle>
          <CardDescription>배달대행사 설정 상태 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {health?.functions.connected ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="text-sm text-[#2E1C10]">Functions 연결</span>
            </div>
            <Badge variant={health?.functions.connected ? 'default' : 'destructive'}>
              {health?.functions.connected ? 'Connected' : 'Not set'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">Webhook Secret</span>
            <Badge variant={deliveryStatus.secret ? 'default' : 'destructive'}>
              {deliveryStatus.secret ? 'Set' : 'Missing'}
            </Badge>
          </div>

          <Alert variant={deliveryStatus.secret ? 'default' : 'destructive'}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {deliveryStatus.secret
                ? '배달대행사 Webhook 설정이 완료되었습니다.'
                : 'Webhook Secret이 설정되지 않았습니다.'}
            </AlertDescription>
          </Alert>

          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            새로고침
          </Button>
        </CardContent>
      </Card>

      {/* 설정/가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>설정 가이드</CardTitle>
          <CardDescription>배달대행사 Webhook 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-xs">
              ⚠️ Webhook Secret은 Functions Config에만 저장됩니다.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="secret">Webhook Secret *</Label>
            <div className="relative">
              <Input
                id="secret"
                type={showSecret ? 'text' : 'password'}
                placeholder="webhook_secret_key"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowedIps">허용 IP 목록 (선택)</Label>
            <Input
              id="allowedIps"
              placeholder="1.2.3.4,5.6.7.8"
              value={allowedIps}
              onChange={(e) => setAllowedIps(e.target.value)}
            />
            <p className="text-xs text-[#2E1C10]/60">쉼표로 구분하여 입력하세요</p>
          </div>

          <div className="space-y-2">
            <Label>CLI 명령 미리보기</Label>
            <div className="p-3 bg-gray-50 rounded-lg text-xs font-mono overflow-x-auto">
              {secret ? (
                <code>{generateDeliveryCLI({ secret, allowedIps: allowedIps || undefined })}</code>
              ) : (
                <span className="text-gray-400">Webhook Secret을 입력하면 CLI 명령이 표시됩니다</span>
              )}
            </div>
          </div>

          <Button onClick={handleCopyCLI} disabled={!secret} className="w-full">
            <Copy className="w-4 h-4 mr-2" />
            CLI 복사
          </Button>

          {/* 배달 설정 (비밀 아님) */}
          <div className="border-t pt-4 space-y-4">
            <h3 className="font-semibold text-[#2E1C10]">배달 설정</h3>

            <div className="space-y-2">
              <Label htmlFor="maxDistance">최대 배달 거리 (km)</Label>
              <Input
                id="maxDistance"
                type="number"
                min="0"
                step="0.1"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nightSurcharge">야간 할증 (원)</Label>
              <Input
                id="nightSurcharge"
                type="number"
                min="0"
                value={nightSurcharge}
                onChange={(e) => setNightSurcharge(Number(e.target.value))}
              />
            </div>

            <Button onClick={handleSaveConfig} className="w-full">
              배달 설정 저장
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

