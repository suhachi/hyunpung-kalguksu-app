/**
 * 운영/보안 설정 탭
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';
import { Copy, RefreshCw, CheckCircle2, XCircle, AlertTriangle, Play } from 'lucide-react';
import { generateDeployScript } from '../../../lib/admin/adminSettings.api';
import type { HealthCheckResult } from '../../../types/adminSettings';
import { toast } from 'sonner';

interface OperationsTabProps {
  health: HealthCheckResult | null;
  onRefresh: () => void;
}

export function OperationsTab({ health, onRefresh }: OperationsTabProps) {
  const [running, setRunning] = useState(false);

  const handleCopyDeployScript = () => {
    const script = generateDeployScript();
    navigator.clipboard.writeText(script);
    toast.success('배포 스크립트가 복사되었습니다');
  };

  const handleRunDiagnostics = async () => {
    setRunning(true);
    try {
      // 간단한 진단 실행
      const checks = [
        { name: 'Firestore 연결', check: () => health?.firestore.connected },
        { name: 'Storage 연결', check: () => health?.storage.connected },
        { name: 'Functions 연결', check: () => health?.functions.connected },
        { name: 'CORS 설정', check: () => health?.storage.corsConfigured },
      ];

      const results = checks.map((c) => ({ name: c.name, result: c.check() }));
      const allOk = results.every((r) => r.result);

      if (allOk) {
        toast.success('모든 진단 항목이 정상입니다');
      } else {
        const failed = results.filter((r) => !r.result).map((r) => r.name);
        toast.warning(`다음 항목을 확인하세요: ${failed.join(', ')}`);
      }
    } catch (error) {
      console.error('Diagnostics failed:', error);
      toast.error('진단 실행 중 오류가 발생했습니다');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 상태 패널 */}
      <Card>
        <CardHeader>
          <CardTitle>상태 진단</CardTitle>
          <CardDescription>운영 환경 상태 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">Firestore</span>
            <Badge variant={health?.firestore.connected ? 'default' : 'destructive'}>
              {health?.firestore.connected ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">Storage</span>
            <Badge variant={health?.storage.connected ? 'default' : 'destructive'}>
              {health?.storage.connected ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">CORS 설정</span>
            <Badge variant={health?.storage.corsConfigured ? 'default' : 'secondary'}>
              {health?.storage.corsConfigured ? 'OK' : 'Check'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2E1C10]">Functions</span>
            <Badge variant={health?.functions.connected ? 'default' : 'destructive'}>
              {health?.functions.connected ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>

          <Button
            onClick={handleRunDiagnostics}
            disabled={running}
            variant="outline"
            size="sm"
            className="w-full"
          >
            {running ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                실행 중...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                진단 실행
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={onRefresh} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            새로고침
          </Button>
        </CardContent>
      </Card>

      {/* 배포 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>배포 스크립트</CardTitle>
          <CardDescription>Firebase 배포 순서</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-xs">
              아래 순서대로 배포해야 합니다.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>배포 스크립트</Label>
            <div className="p-3 bg-gray-50 rounded-lg text-xs font-mono overflow-x-auto">
              <code className="whitespace-pre">{generateDeployScript()}</code>
            </div>
          </div>

          <Button onClick={handleCopyDeployScript} className="w-full">
            <Copy className="w-4 h-4 mr-2" />
            배포 스크립트 복사
          </Button>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>배포 순서:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Firestore 인덱스 및 규칙</li>
                <li>Storage Rules</li>
                <li>Functions</li>
                <li>Frontend 빌드 및 Hosting</li>
              </ol>
              <p className="mt-2 text-red-600 font-semibold">
                ⚠️ 순서를 반드시 지켜주세요. 인덱스가 없으면 쿼리가 실패할 수 있습니다.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

