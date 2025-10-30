/**
 * 결제 설정 탭 (NICEPAY)
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';
import { Copy, CheckCircle2, XCircle, RefreshCw, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { generateNicepayCLI } from '../../../lib/admin/adminSettings.api';
import type { HealthCheckResult } from '../../../types/adminSettings';
import { toast } from 'sonner';

interface PaymentTabProps {
  health: HealthCheckResult | null;
  onRefresh: () => void;
}

export function PaymentTab({ health, onRefresh }: PaymentTabProps) {
  const [endpoint, setEndpoint] = useState('');
  const [mid, setMid] = useState('');
  const [key, setKey] = useState('');
  const [returnUrl, setReturnUrl] = useState('');
  const [cancelUrl, setCancelUrl] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const nicepayStatus = health?.functions.nicepay || { endpoint: false, mid: false, key: false };
  const allConfigured = nicepayStatus.endpoint && nicepayStatus.mid && nicepayStatus.key;

  const handleCopyCLI = () => {
    if (!endpoint || !mid || !key || !returnUrl || !cancelUrl) {
      toast.error('모든 필드를 입력해주세요');
      return;
    }

    const cliCommand = generateNicepayCLI({
      endpoint,
      mid,
      key,
      returnUrl: returnUrl || `https://${window.location.host}/pay/return`,
      cancelUrl: cancelUrl || `https://${window.location.host}/pay/cancel`,
    });

    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    toast.success('CLI 명령이 복사되었습니다');
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyConfigGet = () => {
    const command = 'firebase functions:config:get';
    navigator.clipboard.writeText(command);
    toast.success('명령이 복사되었습니다');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 상태 패널 */}
      <Card>
        <CardHeader>
          <CardTitle>상태 진단</CardTitle>
          <CardDescription>NICEPAY 설정 상태 확인</CardDescription>
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#2E1C10]">Endpoint</span>
              <Badge variant={nicepayStatus.endpoint ? 'default' : 'destructive'}>
                {nicepayStatus.endpoint ? 'Set' : 'Missing'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#2E1C10]">MID</span>
              <Badge variant={nicepayStatus.mid ? 'default' : 'destructive'}>
                {nicepayStatus.mid ? 'Set' : 'Missing'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#2E1C10]">Key</span>
              <Badge variant={nicepayStatus.key ? 'default' : 'destructive'}>
                {nicepayStatus.key ? 'Set' : 'Missing'}
              </Badge>
            </div>
          </div>

          <Alert variant={allConfigured ? 'default' : 'destructive'}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {allConfigured
                ? '모든 NICEPAY 설정이 완료되었습니다.'
                : '일부 필수 설정이 누락되었습니다. CLI 명령으로 설정하세요.'}
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
          <CardDescription>서버 비밀키는 Functions Config에만 저장됩니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              ⚠️ 보안 원칙: 서버 비밀키는 클라이언트에 절대 노출되지 않습니다.
              아래 값들은 CLI 명령 생성용이며 저장되지 않습니다.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint *</Label>
            <Input
              id="endpoint"
              type="url"
              placeholder="https://sandbox-api.nicepay.co.kr"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mid">Merchant ID (MID) *</Label>
            <Input
              id="mid"
              placeholder="YOUR_MID"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key">API Key *</Label>
            <div className="relative">
              <Input
                id="key"
                type={showKey ? 'text' : 'password'}
                placeholder="YOUR_API_KEY"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnUrl">Return URL *</Label>
            <Input
              id="returnUrl"
              type="url"
              placeholder={`https://${window.location.host}/pay/return`}
              value={returnUrl}
              onChange={(e) => setReturnUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cancelUrl">Cancel URL *</Label>
            <Input
              id="cancelUrl"
              type="url"
              placeholder={`https://${window.location.host}/pay/cancel`}
              value={cancelUrl}
              onChange={(e) => setCancelUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>CLI 명령 미리보기</Label>
            <div className="p-3 bg-gray-50 rounded-lg text-xs font-mono overflow-x-auto">
              {endpoint && mid && key && returnUrl && cancelUrl ? (
                <code>{generateNicepayCLI({ endpoint, mid, key, returnUrl, cancelUrl })}</code>
              ) : (
                <span className="text-gray-400">모든 필드를 입력하면 CLI 명령이 표시됩니다</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleCopyCLI}
              disabled={!endpoint || !mid || !key || !returnUrl || !cancelUrl}
              className="flex-1"
            >
              <Copy className="w-4 h-4 mr-2" />
              CLI 복사
            </Button>
            <Button variant="outline" onClick={handleCopyConfigGet}>
              <Copy className="w-4 h-4 mr-2" />
              확인 명령
            </Button>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>설정 방법:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>위 CLI 명령을 복사합니다</li>
                <li>터미널에서 실행합니다</li>
                <li>“확인 명령”을 실행하여 설정을 확인합니다</li>
                <li>새로고침 버튼을 눌러 상태를 업데이트합니다</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

