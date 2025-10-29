import { useEffect, useState } from 'react';
import type { Order, OrderLog } from '../../types/order';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { MapPin, Phone, Mail, FileText, CreditCard, Clock } from 'lucide-react';
import { fetchOrderLogs } from '../../lib/admin/orders.api';
import { OrderActionBar } from './OrderActionBar';

interface OrderDetailDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailDrawer({ order, open, onClose }: OrderDetailDrawerProps) {
  const [logs, setLogs] = useState<OrderLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    if (order && open) {
      setLogsLoading(true);
      fetchOrderLogs(order.orderId)
        .then(setLogs)
        .finally(() => setLogsLoading(false));
    }
  }, [order, open]);

  if (!order) return null;

  // 날짜 포맷팅
  const formatDateTime = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 금액 포맷팅
  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()}원`;
  };

  // 상태 라벨
  const statusLabels: Record<string, string> = {
    pending: '접수대기',
    accepted: '접수확인',
    preparing: '조리중',
    completed: '완료',
    canceled: '취소',
  };

  // 결제수단 라벨
  const paymentMethodLabels: Record<string, string> = {
    card: '카드',
    transfer: '계좌이체',
    easy_pay: '간편결제',
    on_site: '만나서결제',
  };

  // 타임라인 항목
  const timelineItems = Object.entries(order.timeline)
    .filter(([_, timestamp]) => timestamp)
    .map(([status, timestamp]) => ({
      status,
      label: statusLabels[status] || status,
      timestamp: timestamp!,
    }))
    .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>주문 상세</SheetTitle>
          <SheetDescription>{order.orderId}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          <div className="space-y-6">
            {/* 액션 바 */}
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  order.status === 'completed'
                    ? 'default'
                    : order.status === 'canceled'
                    ? 'destructive'
                    : 'secondary'
                }
                className={
                  order.status === 'pending'
                    ? 'bg-gray-100 text-gray-700'
                    : order.status === 'accepted'
                    ? 'bg-blue-100 text-blue-700'
                    : order.status === 'preparing'
                    ? 'bg-amber-100 text-amber-700'
                    : order.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : ''
                }
              >
                {statusLabels[order.status]}
              </Badge>
              <OrderActionBar order={order} />
            </div>

            <Separator />

            {/* 주문 항목 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">주문 항목</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <img
                      src={item.menuImage}
                      alt={item.menuName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#333] mb-1">{item.menuName}</div>
                      <div className="text-xs text-[#8B7355] space-y-0.5">
                        {item.options.noodle && <div>면: {item.options.noodle}</div>}
                        {item.options.spicy && <div>맵기: {item.options.spicy}</div>}
                        {item.options.toppings && item.options.toppings.length > 0 && (
                          <div>토핑: {item.options.toppings.join(', ')}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#333]">{item.quantity}개</div>
                      <div className="text-sm text-[#8B7355]">
                        {formatAmount(item.subtotal)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#8B7355]">
                  <span>소계</span>
                  <span>{formatAmount(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#D61C1C]">
                    <span>할인 {order.couponId && `(${order.couponId})`}</span>
                    <span>-{formatAmount(order.discount)}</span>
                  </div>
                )}
                {order.deliveryFee > 0 && (
                  <div className="flex justify-between text-[#8B7355]">
                    <span>배달비</span>
                    <span>{formatAmount(order.deliveryFee)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-[#333]">
                  <span>최종 금액</span>
                  <span>{formatAmount(order.finalAmount)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* 배달 정보 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">배달 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <Badge variant="outline">
                    {order.deliveryType === 'delivery' ? '배달' : '포장'}
                  </Badge>
                </div>

                {order.deliveryAddress && (
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[#333]">{order.deliveryAddress.address}</div>
                      {order.deliveryAddress.detail && (
                        <div className="text-[#8B7355]">{order.deliveryAddress.detail}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Phone className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                  <div className="text-[#333]">{order.phone}</div>
                </div>

                {order.email && (
                  <div className="flex gap-2">
                    <Mail className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                    <div className="text-[#333]">{order.email}</div>
                  </div>
                )}

                {order.requests && (
                  <div className="flex gap-2">
                    <FileText className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                    <div className="text-[#333]">{order.requests}</div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 결제 정보 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">결제 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <CreditCard className="w-4 h-4 text-[#8B7355]" />
                    <span className="text-[#333]">
                      {paymentMethodLabels[order.payment.method]}
                    </span>
                  </div>
                  <Badge
                    variant={
                      order.payment.status === 'approved' ? 'default' : 'secondary'
                    }
                    className={
                      order.payment.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : order.payment.status === 'refunded'
                        ? 'bg-red-100 text-red-700'
                        : ''
                    }
                  >
                    {order.payment.status === 'approved'
                      ? '승인'
                      : order.payment.status === 'pending'
                      ? '대기'
                      : order.payment.status === 'refunded'
                      ? '환불'
                      : order.payment.status}
                  </Badge>
                </div>

                {order.payment.tid && (
                  <div className="text-xs text-[#8B7355]">거래ID: {order.payment.tid}</div>
                )}

                {order.payment.cardName && (
                  <div className="text-xs text-[#8B7355]">
                    {order.payment.cardName} {order.payment.cardNum}
                  </div>
                )}

                {order.payment.paidAt && (
                  <div className="text-xs text-[#8B7355]">
                    결제일시: {formatDateTime(order.payment.paidAt)}
                  </div>
                )}

                {order.payment.cancelReason && (
                  <div className="p-3 bg-red-50 rounded-lg text-xs text-red-700">
                    취소 사유: {order.payment.cancelReason}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 타임라인 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">타임라인</h3>
              <div className="space-y-3">
                {timelineItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-[#D61C1C] mt-1.5" />
                      {index < timelineItems.length - 1 && (
                        <div className="absolute left-1 top-4 w-px h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#333]">{item.label}</span>
                        <Clock className="w-3 h-3 text-[#8B7355]" />
                        <span className="text-xs text-[#8B7355]">
                          {formatTime(item.timestamp)}
                        </span>
                      </div>
                      <div className="text-xs text-[#8B7355] mt-0.5">
                        {formatDateTime(item.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 로그 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">변경 이력</h3>
              {logsLoading ? (
                <div className="text-xs text-[#8B7355]">로딩 중...</div>
              ) : logs.length === 0 ? (
                <div className="text-xs text-[#8B7355]">변경 이력이 없습니다</div>
              ) : (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div
                      key={log.logId}
                      className="p-3 bg-gray-50 rounded-lg text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[#333]">
                          {log.action === 'status_changed'
                            ? '상태 변경'
                            : log.action === 'canceled'
                            ? '주문 취소'
                            : log.action === 'created'
                            ? '주문 생성'
                            : log.action}
                        </span>
                        <span className="text-[#8B7355]">
                          {formatDateTime(log.at)}
                        </span>
                      </div>
                      {log.from && log.to && (
                        <div className="text-[#8B7355]">
                          {statusLabels[log.from]} → {statusLabels[log.to]}
                        </div>
                      )}
                      {log.byName && (
                        <div className="text-[#8B7355]">담당자: {log.byName}</div>
                      )}
                      {log.reason && (
                        <div className="text-[#D61C1C]">사유: {log.reason}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
