/**
 * 고객 쿠폰함 페이지
 * Phase 2-8: 쿠폰 목록 및 상태별 필터
 */

import { useState, useEffect } from 'react';
import { Coupon, CouponStatus, getCouponStatus, COUPON_TYPE_LABELS } from '../../types/coupon';
import { getCoupons } from '../../lib/coupons.api';
import { getCurrentUser } from '../../lib/auth';
import { CouponCard } from '../../components/app/CouponCard';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Ticket, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  const [statusFilter, setStatusFilter] = useState<CouponStatus | 'all'>('available');
  const [loading, setLoading] = useState(true);
  
  // 쿠폰 코드 입력
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [applying, setApplying] = useState(false);

  const user = getCurrentUser();

  useEffect(() => {
    loadCoupons();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredCoupons(coupons);
    } else {
      setFilteredCoupons(coupons.filter(c => getCouponStatus(c) === statusFilter));
    }
  }, [coupons, statusFilter]);

  const loadCoupons = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getCoupons(user.uid);
      setCoupons(data);
    } catch (error) {
      console.error('Failed to load coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCouponCode = async () => {
    if (!user) return;
    if (!couponCode.trim()) {
      toast.error('쿠폰 코드를 입력하세요');
      return;
    }

    setApplying(true);
    try {
      // Mock: 쿠폰 코드 검증 및 발급
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 쿠폰 코드 검증 (실제로는 서버에서 처리)
      const validCodes: Record<string, { title: string; amount: number; minSpend: number }> = {
        'WELCOME2025': { title: '신년 맞이 특별 할인', amount: 10000, minSpend: 30000 },
        'FIRSTORDER': { title: '첫 주문 감사 쿠폰', amount: 5000, minSpend: 15000 },
        'REVIEW500': { title: '리뷰 이벤트 쿠폰', amount: 3000, minSpend: 10000 },
      };

      const codeUpper = couponCode.toUpperCase().trim();
      const couponData = validCodes[codeUpper];

      if (!couponData) {
        toast.error('유효하지 않은 쿠폰 코드입니다');
        return;
      }

      // 이미 등록된 코드인지 확인
      const alreadyHas = coupons.some(c => c.title === couponData.title);
      if (alreadyHas) {
        toast.error('이미 등록된 쿠폰입니다');
        return;
      }

      // 쿠폰 발급
      const newCoupon: Coupon = {
        id: `coupon-code-${Date.now()}`,
        uid: user.uid,
        type: 'code',
        amount: couponData.amount,
        minSpend: couponData.minSpend,
        issuedAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30일
        used: false,
        title: couponData.title,
        description: `${couponData.minSpend.toLocaleString()}원 이상 주문 시 사용 가능`,
      };

      setCoupons([newCoupon, ...coupons]);
      toast.success(`🎉 ${couponData.title} 쿠폰이 등록되었습니다!`);
      setCodeDialogOpen(false);
      setCouponCode('');
    } catch (error) {
      console.error('Failed to apply coupon code:', error);
      toast.error('쿠폰 등록에 실패했습니다');
    } finally {
      setApplying(false);
    }
  };

  const availableCount = coupons.filter(c => getCouponStatus(c) === 'available').length;
  const usedCount = coupons.filter(c => getCouponStatus(c) === 'used').length;
  const expiredCount = coupons.filter(c => getCouponStatus(c) === 'expired').length;

  return (
    <div className="min-h-screen bg-[#F9F6F3] pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl text-[#333] flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#D61C1C]" />
            내 쿠폰
          </h1>
          <p className="text-sm text-[#8B7355] mt-1">
            사용 가능한 쿠폰 {availableCount}장
          </p>
        </div>
      </div>

      {/* 탭 필터 */}
      <div className="bg-white border-b sticky top-[73px] z-10">
        <div className="container mx-auto px-4 py-3">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="available">
                사용가능 ({availableCount})
              </TabsTrigger>
              <TabsTrigger value="used">
                사용완료 ({usedCount})
              </TabsTrigger>
              <TabsTrigger value="expired">
                만료됨 ({expiredCount})
              </TabsTrigger>
              <TabsTrigger value="all">
                전체 ({coupons.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* 쿠폰 목록 */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">쿠폰이 없습니다</p>
            <p className="text-sm text-gray-400 mt-2">
              사진 리뷰를 작성하면 3,000원 쿠폰을 드려요!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCoupons.map(coupon => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        )}
      </div>

      {/* 쿠폰 획득 안내 */}
      {availableCount === 0 && !loading && (
        <div className="container mx-auto px-4 pb-6">
          <div className="bg-gradient-to-br from-[#D61C1C]/10 to-[#F37021]/10 rounded-lg p-6 border border-[#D61C1C]/20">
            <h3 className="text-lg text-[#333] mb-3">쿠폰 받는 방법</h3>
            <ul className="space-y-2 text-sm text-[#8B7355]">
              <li className="flex items-start gap-2">
                <span className="text-[#D61C1C]">•</span>
                <span>주문 후 <strong>사진 리뷰</strong>를 남기면 3,000원 쿠폰</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F37021]">•</span>
                <span>신규 가입 시 5,000원 쿠폰</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C7A45A]">•</span>
                <span>특별 이벤트 쿠폰 (수시 발급)</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
