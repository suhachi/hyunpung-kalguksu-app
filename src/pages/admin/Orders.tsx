import { useState, useEffect } from 'react';
import type { Order, OrderStatus } from '../../types/order';
import { ORDER_STATUS_TRANSITIONS } from '../../types/order';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { OrderTable } from '../../components/admin/OrderTable';
import { OrderDetailDrawer } from '../../components/admin/OrderDetailDrawer';
import { PrintableOrder } from '../../components/admin/PrintableOrder';
import {
  fetchOrders,
  updateOrderStatus,
  type OrderFilters,
  type OrderSortField,
  type OrderSortDirection,
} from '../../lib/admin/orders.api';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 필터/정렬 상태
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<OrderSortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<OrderSortDirection>('desc');

  // 취소 다이얼로그
  const [cancelDialog, setCancelDialog] = useState<{
    open: boolean;
    order: Order | null;
  }>({ open: false, order: null });
  const [cancelReason, setCancelReason] = useState('');

  // 데이터 로드
  const loadOrders = async () => {
    setLoading(true);
    try {
      const filters: OrderFilters = {
        status: statusFilter === 'all' ? undefined : statusFilter,
        paymentMethod: paymentFilter === 'all' ? undefined : paymentFilter,
        searchQuery: searchQuery || undefined,
      };

      const data = await fetchOrders('store-hyunpung', filters, sortField, sortDirection);
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('주문 로드 실패:', error);
      toast.error('주문 목록을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter, paymentFilter, searchQuery, sortField, sortDirection]);

  // 상태 변경 처리
  const handleUpdateStatus = async (order: Order, newStatus: OrderStatus) => {
    // 취소 처리는 사유 입력 모달 표시
    if (newStatus === 'canceled') {
      setCancelDialog({ open: true, order });
      return;
    }

    // 상태 전이 검증
    const allowedTransitions = ORDER_STATUS_TRANSITIONS[order.status];
    if (!allowedTransitions.includes(newStatus)) {
      toast.error('상태 변경 불가', {
        description: `${order.status} 상태에서 ${newStatus}로 변경할 수 없습니다`,
      });
      return;
    }

    try {
      const result = await updateOrderStatus(order.orderId, newStatus);
      if (result.success) {
        toast.success('상태가 변경되었습니다', {
          description: `주문번호: ${order.orderId}`,
        });
        loadOrders();
      } else {
        toast.error('상태 변경 실패', {
          description: result.error,
        });
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
      toast.error('상태 변경 중 오류가 발생했습니다');
    }
  };

  // 취소 확인
  const handleCancelConfirm = async () => {
    if (!cancelDialog.order || !cancelReason.trim()) {
      toast.error('취소 사유를 입력해주세요');
      return;
    }

    try {
      const result = await updateOrderStatus(
        cancelDialog.order.orderId,
        'canceled',
        cancelReason
      );

      if (result.success) {
        toast.success('주문이 취소되었습니다', {
          description: `주문번호: ${cancelDialog.order.orderId}`,
        });
        setCancelDialog({ open: false, order: null });
        setCancelReason('');
        loadOrders();
      } else {
        toast.error('주문 취소 실패', {
          description: result.error,
        });
      }
    } catch (error) {
      console.error('주문 취소 실패:', error);
      toast.error('주문 취소 중 오류가 발생했습니다');
    }
  };

  // 상세보기
  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  // 정렬 토글
  const toggleSort = (field: OrderSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // 통계
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    accepted: orders.filter((o) => o.status === 'accepted').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    canceled: orders.filter((o) => o.status === 'canceled').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-[#333] mb-2">주문 관리</h1>
        <p className="text-[#8B7355]">실시간 주문 현황을 확인하고 상태를 관리하세요</p>
      </div>

      {/* 상태별 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <Card className="p-4">
          <div className="text-2xl text-[#333] mb-1">{stats.total}</div>
          <div className="text-xs text-[#8B7355]">전체</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-gray-700 mb-1">{stats.pending}</div>
          <div className="text-xs text-[#8B7355]">접수대기</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-blue-600 mb-1">{stats.accepted}</div>
          <div className="text-xs text-[#8B7355]">접수확인</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-amber-600 mb-1">{stats.preparing}</div>
          <div className="text-xs text-[#8B7355]">조리중</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-green-600 mb-1">{stats.completed}</div>
          <div className="text-xs text-[#8B7355]">완료</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl text-red-600 mb-1">{stats.canceled}</div>
          <div className="text-xs text-[#8B7355]">취소</div>
        </Card>
      </div>

      {/* 필터/검색 */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* 상태 탭 */}
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="pending">접수대기</TabsTrigger>
              <TabsTrigger value="accepted">접수확인</TabsTrigger>
              <TabsTrigger value="preparing">조리중</TabsTrigger>
              <TabsTrigger value="completed">완료</TabsTrigger>
              <TabsTrigger value="canceled">취소</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 검색 및 필터 */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
              <Input
                placeholder="주문번호, 전화번호, 메뉴명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-2">
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[140px]">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 결제</SelectItem>
                  <SelectItem value="card">카드</SelectItem>
                  <SelectItem value="easy_pay">간편결제</SelectItem>
                  <SelectItem value="transfer">계좌이체</SelectItem>
                  <SelectItem value="on_site">만나서결제</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={`${sortField}-${sortDirection}`}
                onValueChange={(v) => {
                  const [field, dir] = v.split('-');
                  setSortField(field as OrderSortField);
                  setSortDirection(dir as OrderSortDirection);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">최신순</SelectItem>
                  <SelectItem value="createdAt-asc">오래된순</SelectItem>
                  <SelectItem value="amount-desc">금액 높은순</SelectItem>
                  <SelectItem value="amount-asc">금액 낮은순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* 주문 테이블 */}
      <OrderTable
        orders={filteredOrders}
        onViewDetail={handleViewDetail}
        onUpdateStatus={handleUpdateStatus}
        isLoading={loading}
      />

      {/* 상세 드로어 */}
      <OrderDetailDrawer
        order={selectedOrder}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedOrder(null);
        }}
      />

      {/* 인쇄용 주문서 (숨김) */}
      {selectedOrder && <PrintableOrder order={selectedOrder} />}

      {/* 취소 확인 다이얼로그 */}
      <Dialog
        open={cancelDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setCancelDialog({ open: false, order: null });
            setCancelReason('');
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>주문 취소</DialogTitle>
            <DialogDescription>
              주문번호: {cancelDialog.order?.orderId}
              <br />
              취소 사유를 입력해주세요. 고객에게 전달됩니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cancel-reason">취소 사유 *</Label>
              <Textarea
                id="cancel-reason"
                placeholder="예: 재료 소진으로 인한 취소"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
              />
            </div>

            {cancelDialog.order?.payment.method !== 'on_site' && (
              <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
                ⚠️ 결제가 승인된 주문입니다. 취소 시 자동으로 환불 처리됩니다.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCancelDialog({ open: false, order: null });
                setCancelReason('');
              }}
            >
              닫기
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelConfirm}
              disabled={!cancelReason.trim()}
            >
              주문 취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
