/**
 * 관리자 포인트 관리 페이지
 * Phase 3-3: Points System
 */

import { useState, useEffect } from 'react';
import { Gift, TrendingUp, TrendingDown, Users, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Skeleton } from '../../components/ui/skeleton';
import { StatCard } from '../../components/admin/common/StatCard';
import { getAllPointsBalances, adjustPoints, POINTS_POLICY } from '../../lib/points.api';
import { FEATURE_FLAGS } from '../../config/env';
import { toast } from 'sonner';
import type { PointsBalance } from '../../types/points';

export default function AdminPoints() {
  const [balances, setBalances] = useState<Array<PointsBalance & { phone?: string; name?: string }>>([]);
  const [loading, setLoading] = useState(true);
  
  // 조정 다이얼로그
  const [adjustDialog, setAdjustDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof balances[0] | null>(null);
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustNote, setAdjustNote] = useState('');
  const [adjusting, setAdjusting] = useState(false);

  useEffect(() => {
    loadBalances();
  }, []);

  async function loadBalances() {
    try {
      setLoading(true);
      const data = await getAllPointsBalances();
      setBalances(data);
    } catch (error) {
      console.error('Failed to load points balances:', error);
      toast.error('포인트 내역 로드 실패');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdjust() {
    if (!selectedUser || !adjustAmount || !adjustNote) {
      toast.error('모든 필드를 입력해주세요');
      return;
    }

    const amount = parseInt(adjustAmount);
    if (isNaN(amount) || amount === 0) {
      toast.error('올바른 포인트 금액을 입력해주세요');
      return;
    }

    try {
      setAdjusting(true);
      await adjustPoints(selectedUser.uid, amount, adjustNote);
      toast.success('포인트가 조정되었습니다');
      setAdjustDialog(false);
      setSelectedUser(null);
      setAdjustAmount('');
      setAdjustNote('');
      loadBalances();
    } catch (error: any) {
      console.error('Failed to adjust points:', error);
      toast.error(error.message || '포인트 조정 실패');
    } finally {
      setAdjusting(false);
    }
  }

  function openAdjustDialog(user: typeof balances[0]) {
    setSelectedUser(user);
    setAdjustDialog(true);
  }

  if (!FEATURE_FLAGS.points) {
    return (
      <div className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            포인트 기능이 비활성화되어 있습니다.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // 통계 계산
  const totalUsers = balances.length;
  const totalPoints = balances.reduce((sum, b) => sum + b.balance, 0);
  const avgPoints = totalUsers > 0 ? Math.floor(totalPoints / totalUsers) : 0;
  const activeUsers = balances.filter(b => b.balance > 0).length;

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl text-[#2E1C10] mb-1">포인트 관리</h1>
        <p className="text-[#2E1C10]/60">
          고객 포인트 현황을 관리하고 조정할 수 있습니다
        </p>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="전체 사용자"
          value={totalUsers.toLocaleString()}
          icon={Users}
          variant="info"
        />
        
        <StatCard
          title="전체 포인트"
          value={`${totalPoints.toLocaleString()}P`}
          icon={Gift}
          variant="default"
        />
        
        <StatCard
          title="평균 보유 포인트"
          value={`${avgPoints.toLocaleString()}P`}
          icon={TrendingUp}
          variant="success"
        />
        
        <StatCard
          title="활성 사용자"
          value={activeUsers.toLocaleString()}
          icon={DollarSign}
          variant="warning"
        />
      </div>

      {/* 포인트 정책 */}
      <Card>
        <CardHeader>
          <CardTitle>포인트 정책</CardTitle>
          <CardDescription>현재 적용 중인 포인트 정책입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">주문 적립률</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {(POINTS_POLICY.earnRate * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">최소 사용 금액</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {POINTS_POLICY.minUse.toLocaleString()}P
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">유효기간</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {POINTS_POLICY.expireDays}일
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-[#2E1C10]/60 mb-1">사진 리뷰 보너스</p>
              <p className="text-2xl font-medium text-[#D61C1C]">
                {POINTS_POLICY.reviewPhotoBonus}P
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용자 포인트 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자별 포인트</CardTitle>
          <CardDescription>
            전체 {balances.length}명의 사용자
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : balances.length > 0 ? (
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>사용자</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>보유 포인트</TableHead>
                    <TableHead>최종 업데이트</TableHead>
                    <TableHead>관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {balances.map((balance) => (
                    <TableRow key={balance.uid}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#D61C1C]/10 flex items-center justify-center">
                            <span className="text-xs text-[#D61C1C]">
                              {balance.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{balance.name || balance.uid}</p>
                            <p className="text-xs text-gray-500">{balance.uid}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{balance.phone || '-'}</TableCell>
                      <TableCell>
                        <Badge
                          variant={balance.balance > 0 ? 'default' : 'secondary'}
                          className={balance.balance > 0 ? 'bg-green-100 text-green-800' : ''}
                        >
                          {balance.balance.toLocaleString()}P
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(balance.updatedAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAdjustDialog(balance)}
                        >
                          조정
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>아직 포인트 사용자가 없습니다</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 포인트 조정 다이얼로그 */}
      <Dialog open={adjustDialog} onOpenChange={setAdjustDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>포인트 조정</DialogTitle>
            <DialogDescription>
              사용자: {selectedUser?.name || selectedUser?.uid}
              <br />
              현재 보유 포인트: {selectedUser?.balance.toLocaleString()}P
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">조정 포인트</Label>
              <Input
                id="amount"
                type="number"
                placeholder="양수는 증가, 음수는 차감"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                예: +1000 (증가), -500 (차감)
              </p>
            </div>

            <div>
              <Label htmlFor="note">사유</Label>
              <Textarea
                id="note"
                placeholder="포인트 조정 사유를 입력하세요"
                value={adjustNote}
                onChange={(e) => setAdjustNote(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            {adjustAmount && (
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  조정 후 포인트: {(selectedUser!.balance + parseInt(adjustAmount || '0')).toLocaleString()}P
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAdjustDialog(false);
                setSelectedUser(null);
                setAdjustAmount('');
                setAdjustNote('');
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleAdjust}
              disabled={adjusting || !adjustAmount || !adjustNote}
            >
              {adjusting ? '처리 중...' : '조정하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
