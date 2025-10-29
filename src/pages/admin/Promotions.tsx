/**
 * 관리자 쿠폰/프로모션 관리 페이지
 * Phase 2-8: 쿠폰 발급 및 통계
 */

import { useState, useEffect } from 'react';
import { CouponStats, CouponIssue } from '../../types/coupon';
import { getCouponStats, issueCoupon } from '../../lib/coupons.api';
import { getCurrentUser } from '../../lib/auth';
import { StatCard } from '../../components/admin/common/StatCard';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Plus, Ticket } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export default function Promotions() {
  const [stats, setStats] = useState<CouponStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [issuing, setIssuing] = useState(false);

  // 발급 폼
  const [issueForm, setIssueForm] = useState<CouponIssue>({
    type: 'admin',
    title: '',
    description: '',
    amount: 5000,
    minSpend: 15000,
    expiryDays: 30,
    issueLimit: 100,
  });

  const user = getCurrentUser();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getCouponStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
      toast.error('통계를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleIssue = async () => {
    if (!user) return;

    if (!issueForm.title.trim() || !issueForm.description.trim()) {
      toast.error('제목과 설명을 입력하세요');
      return;
    }

    setIssuing(true);
    try {
      const issued = await issueCoupon(issueForm, user.uid, user.name);
      
      toast.success(`쿠폰 ${issued.length}장을 발급했습니다`);
      setIssueDialogOpen(false);
      loadStats();

      // 폼 초기화
      setIssueForm({
        type: 'admin',
        title: '',
        description: '',
        amount: 5000,
        minSpend: 15000,
        expiryDays: 30,
        issueLimit: 100,
      });
    } catch (error: any) {
      console.error('Failed to issue coupons:', error);
      toast.error(error.message || '쿠폰 발급에 실패했습니다');
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">쿠폰/프로모션</h1>
          <p className="text-[#8B7355]">
            쿠폰을 발급하고 사용 현황을 관리하세요
          </p>
        </div>
        <Button onClick={() => setIssueDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          쿠폰 발급
        </Button>
      </div>

      {/* 통계 */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="발급 총량"
            value={stats.totalIssued}
            subtitle="총 발급 쿠폰"
          />
          <StatCard
            title="사용 완료"
            value={stats.totalUsed}
            subtitle="사용된 쿠폰"
            variant="success"
          />
          <StatCard
            title="할인 금액"
            value={`${(stats.totalAmount / 10000).toFixed(0)}만원`}
            subtitle="총 할인액"
            variant="info"
          />
          <StatCard
            title="만료됨"
            value={stats.expiredCount}
            subtitle="미사용 만료"
            variant="warning"
          />
        </div>
      )}

      {/* 발급 가이드 */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-[#D61C1C]" />
          쿠폰 발급 가이드
        </h3>
        <div className="space-y-3 text-sm text-[#8B7355]">
          <div className="flex items-start gap-2">
            <span className="text-[#D61C1C]">•</span>
            <span><strong>사진 리뷰 보상:</strong> 자동 발급 (3,000원, 10,000원 이상 주문 시)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#F37021]">•</span>
            <span><strong>신규 가입:</strong> 자동 발급 (5,000원, 15,000원 이상 주문 시)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C7A45A]">•</span>
            <span><strong>관리자 발급:</strong> 수동 발급 (금액/조건 설정 가능)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            <span><strong>만료 처리:</strong> 매일 04:00 자동 처리 (Firebase Functions)</span>
          </div>
        </div>
      </Card>

      {/* 발급 내역 (Placeholder) */}
      <Card className="p-6">
        <h3 className="text-lg text-[#333] mb-4">최근 발급 내역</h3>
        <div className="text-center py-8 text-gray-500">
          <Ticket className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>발급 내역이 표시됩니다</p>
          <p className="text-sm text-gray-400 mt-1">
            Firebase 연동 시 실시간 내역 조회
          </p>
        </div>
      </Card>

      {/* 발급 다이얼로그 */}
      <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>쿠폰 발급</DialogTitle>
            <DialogDescription>
              새로운 쿠폰을 발급합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 타입 */}
            <div className="space-y-2">
              <Label>쿠폰 타입</Label>
              <Select
                value={issueForm.type}
                onValueChange={(v) => setIssueForm({ ...issueForm, type: v as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">관리자 발급</SelectItem>
                  <SelectItem value="event">이벤트</SelectItem>
                  <SelectItem value="compensation">보상</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 제목 */}
            <div className="space-y-2">
              <Label>제목</Label>
              <Input
                value={issueForm.title}
                onChange={(e) => setIssueForm({ ...issueForm, title: e.target.value })}
                placeholder="예: 설날 특별 할인 쿠폰"
              />
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label>설명</Label>
              <Textarea
                value={issueForm.description}
                onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                placeholder="예: 20,000원 이상 주문 시 사용 가능"
                rows={2}
              />
            </div>

            {/* 금액 & 최소주문 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>할인 금액 (원)</Label>
                <Input
                  type="number"
                  value={issueForm.amount}
                  onChange={(e) => setIssueForm({ ...issueForm, amount: Number(e.target.value) })}
                  min="1000"
                  step="1000"
                />
              </div>
              <div className="space-y-2">
                <Label>최소 주문 (원)</Label>
                <Input
                  type="number"
                  value={issueForm.minSpend}
                  onChange={(e) => setIssueForm({ ...issueForm, minSpend: Number(e.target.value) })}
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            {/* 유효기간 & 발급상한 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>유효 기간 (일)</Label>
                <Input
                  type="number"
                  value={issueForm.expiryDays}
                  onChange={(e) => setIssueForm({ ...issueForm, expiryDays: Number(e.target.value) })}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label>발급 상한 (장)</Label>
                <Input
                  type="number"
                  value={issueForm.issueLimit}
                  onChange={(e) => setIssueForm({ ...issueForm, issueLimit: Number(e.target.value) })}
                  min="1"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIssueDialogOpen(false)}
              disabled={issuing}
            >
              취소
            </Button>
            <Button onClick={handleIssue} disabled={issuing}>
              {issuing ? '발급 중...' : '발급'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
