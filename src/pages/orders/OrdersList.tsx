/**
 * 주문 내역 목록 페이지
 * 상태 필터, 기간 필터, 무한 스크롤
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Filter, Calendar, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { listUserOrders } from '../../lib/orders.api';
import { getCurrentUser } from '../../lib/auth';
import type { Order, OrderStatus } from '../../types/order';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: '접수 대기',
  accepted: '접수 완료',
  preparing: '조리 중',
  completed: '완료',
  canceled: '취소됨',
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-gray-500',
  accepted: 'bg-blue-500',
  preparing: 'bg-orange-500',
  completed: 'bg-green-500',
  canceled: 'bg-red-500',
};

export function OrdersList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [periodFilter, setPeriodFilter] = useState<'all' | 'week' | 'month' | '3months'>('all');
  const lastDocRef = useRef<any>(null);

  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      loadOrders(true);
    }
  }, [user, statusFilter, periodFilter]);

  function getPeriodDates(): { startDate?: number; endDate?: number } {
    const now = Date.now();
    switch (periodFilter) {
      case 'week':
        return { startDate: now - 7 * 24 * 60 * 60 * 1000 };
      case 'month':
        return { startDate: now - 30 * 24 * 60 * 60 * 1000 };
      case '3months':
        return { startDate: now - 90 * 24 * 60 * 60 * 1000 };
      default:
        return {};
    }
  }

  async function loadOrders(reset: boolean = false) {
    if (!user) return;

    if (reset) {
      setLoading(true);
      setOrders([]);
      lastDocRef.current = null;
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const periodDates = getPeriodDates();
      const filters = {
        status: statusFilter === 'all' ? undefined : statusFilter,
        ...periodDates,
      };

      const result = await listUserOrders(
        user.uid,
        filters,
        20,
        reset ? undefined : lastDocRef.current
      );

      if (reset) {
        setOrders(result.orders);
      } else {
        setOrders((prev) => [...prev, ...result.orders]);
      }

      lastDocRef.current = result.lastDoc;
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      loadOrders(false);
    }
  }, [loadingMore, hasMore]);

  // 스크롤 감지 (무한 스크롤)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-[#2E1C10]/60">로그인이 필요합니다</p>
        <Button onClick={() => navigate('/login')} className="mt-4">
          로그인
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2E1C10]">주문 내역</h1>
          <p className="text-sm text-[#2E1C10]/60">
            {orders.length}건의 주문
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => loadOrders(true)}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          새로고침
        </Button>
      </div>

      {/* 필터 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#D61C1C]" />
            필터
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#2E1C10] mb-2 block">주문 상태</label>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as OrderStatus | 'all')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending">접수 대기</SelectItem>
                <SelectItem value="accepted">접수 완료</SelectItem>
                <SelectItem value="preparing">조리 중</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
                <SelectItem value="canceled">취소됨</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-[#2E1C10] mb-2 block flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              기간
            </label>
            <Select value={periodFilter} onValueChange={(v) => setPeriodFilter(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="week">최근 1주일</SelectItem>
                <SelectItem value="month">최근 1개월</SelectItem>
                <SelectItem value="3months">최근 3개월</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 주문 목록 */}
      {loading && orders.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[#D61C1C]" />
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-[#2E1C10]/20" />
            <p className="text-[#2E1C10]/60">주문 내역이 없습니다</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onClick={() => navigate(`/orders/${order.orderId}`)}
            />
          ))}

          {/* 무한 스크롤 로딩 */}
          {loadingMore && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-[#D61C1C]" />
            </div>
          )}

          {/* 더 이상 없음 */}
          {!hasMore && orders.length > 0 && (
            <div className="text-center py-4 text-sm text-[#2E1C10]/60">
              모든 주문을 불러왔습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * 개별 주문 카드
 */
interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

function OrderCard({ order, onClick }: OrderCardProps) {
  const createdAt = order.createdAt?.seconds
    ? new Date(order.createdAt.seconds * 1000)
    : typeof order.createdAt === 'string'
      ? new Date(order.createdAt)
      : new Date();

  return (
    <Card
      className="cursor-pointer hover:border-[#D61C1C]/50 transition-colors"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-[#D61C1C]" />
            <div>
              <CardTitle className="text-lg">{order.orderId}</CardTitle>
              <CardDescription>
                {format(createdAt, 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
              </CardDescription>
            </div>
          </div>
          <Badge className={`${STATUS_COLORS[order.status]} text-white`}>
            {STATUS_LABELS[order.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#2E1C10]/60">주문 금액</span>
            <span className="text-[#2E1C10] font-medium">
              {order.subtotal.toLocaleString()}원
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">할인</span>
              <span className="text-[#D61C1C]">-{order.discount.toLocaleString()}원</span>
            </div>
          )}
          {order.deliveryFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">배달비</span>
              <span className="text-[#2E1C10]">+{order.deliveryFee.toLocaleString()}원</span>
            </div>
          )}
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span className="text-[#2E1C10]">최종 결제 금액</span>
            <span className="text-[#D61C1C]">
              {order.finalAmount.toLocaleString()}원
            </span>
          </div>
        </div>
        <div className="mt-3 text-xs text-[#2E1C10]/60">
          {order.items.length}개 메뉴
        </div>
      </CardContent>
    </Card>
  );
}

