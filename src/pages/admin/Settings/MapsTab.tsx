/**
 * 지도/지오코딩 설정 탭
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';
import { Download, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { generateEnvTemplate } from '../../../lib/admin/adminSettings.api';
import type { HealthCheckResult } from '../../../types/adminSettings';
import { toast } from 'sonner';

interface MapsTabProps {
  health: HealthCheckResult | null;
  onRefresh: () => void;
}

export function MapsTab({ health, onRefresh }: MapsTabProps) {
  const [kakaoKey, setKakaoKey] = useState('');
  const [googleKey, setGoogleKey] = useState('');
  const mapsStatus = health?.maps || { kakao: false, google: false };

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 상태 패널 */}
      <Card>
        <CardHeader>
          <CardTitle>상태 진단</CardTitle>
          <CardDescription>지도/지오코딩 API 상태 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">Kakao Maps API</span>
            <Badge variant={mapsStatus.kakao ? 'default' : 'destructive'}>
              {mapsStatus.kakao ? 'Set' : 'Missing'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">Google Maps API</span>
            <Badge variant={mapsStatus.google ? 'default' : 'destructive'}>
              {mapsStatus.google ? 'Set' : 'Missing'}
            </Badge>
          </div>

          <Alert variant={mapsStatus.kakao || mapsStatus.google ? 'default' : 'destructive'}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {mapsStatus.kakao || mapsStatus.google
                ? '지도 API가 설정되었습니다.'
                : '지도 API가 설정되지 않았습니다. .env.local 파일에 키를 추가하세요.'}
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
          <CardDescription>지도 API 키 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-xs">
              지도 API 키는 클라이언트 환경 변수(.env.local)에 저장됩니다.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="kakaoKey">Kakao Maps API Key</Label>
            <Input
              id="kakaoKey"
              type="password"
              placeholder="YOUR_KAKAO_API_KEY"
              value={kakaoKey}
              onChange={(e) => setKakaoKey(e.target.value)}
            />
            <p className="text-xs text-[#2E1C10]/60">
              .env.local 파일에 <code>VITE_KAKAO_MAPS_API_KEY=...</code> 추가
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleKey">Google Maps API Key</Label>
            <Input
              id="googleKey"
              type="password"
              placeholder="YOUR_GOOGLE_API_KEY"
              value={googleKey}
              onChange={(e) => setGoogleKey(e.target.value)}
            />
            <p className="text-xs text-[#2E1C10]/60">
              .env.local 파일에 <code>VITE_GOOGLE_MAPS_API_KEY=...</code> 추가
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Label>.env.local 템플릿</Label>
            <p className="text-xs text-[#2E1C10]/60 mb-2">
              모든 클라이언트 환경 변수가 포함된 템플릿을 다운로드하세요.
            </p>
            <Button onClick={handleDownloadEnvTemplate} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              .env 템플릿 다운로드
            </Button>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>설정 방법:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>.env 템플릿을 다운로드합니다</li>
                <li>프로젝트 루트에 .env.local 파일을 생성합니다</li>
                <li>템플릿의 값을 실제 값으로 채웁니다</li>
                <li>개발 서버를 재시작합니다 (Vite는 .env 변경 시 재시작 필요)</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

