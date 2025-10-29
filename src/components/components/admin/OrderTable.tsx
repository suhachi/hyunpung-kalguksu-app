import { useState } from 'react';
import type { Order, OrderStatus } from '../../types/order';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface OrderTableProps {
  orders: Order[];
  onViewDetail: (order: Order) => void;
  onUpdateStatus: (order: Order, newStatus: OrderStatus) => void;
  isLoading?: boolean;
}

// 상태별 배지 스타일
const statusConfig: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  pending: { label: '접수대기', variant: 'secondary' },
  accepted: { label: '접수확인', variant: 'default' },
  preparing: { label: '조리중', variant: 'outline' },
  completed: { label: '완료', variant: 'default' },
  canceled: { label: '취소', variant: 'destructive' },
};

// 결제수단 라벨
const paymentMethodLabels: Record<string, string> = {
  card: '카드',
  transfer: '계좌이체',
  easy_pay: '간편결제',
  on_site: '만나서결제',
};

export function OrderTable({ orders, onViewDetail, onUpdateStatus, isLoading }: OrderTableProps) {
  // 날짜 포맷팅
  const formatDate = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;

    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 금액 포맷팅
  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()}원`;
  };

  // 메뉴 요약
  const getMenuSummary = (order: Order) => {
    const first = order.items[0];
    const rest = order.items.length - 1;
    return rest > 0 ? `${first.menuName} 외 ${rest}개` : first.menuName;
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주문번호</TableHead>
              <TableHead>시간</TableHead>
              <TableHead>메뉴</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>결제</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={7}>
                  <div className="h-12 bg-gray-100 animate-pulse rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-3xl">📦</span>
        </div>
        <p className="text-[#8B7355]">주문이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주문번호</TableHead>
              <TableHead>시간</TableHead>
              <TableHead>메뉴</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>결제</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId} className="hover:bg-gray-50">
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-[#333]">{order.orderId}</div>
                    <div className="text-xs text-[#8B7355]">{order.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-[#333]">{formatDate(order.createdAt)}</div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-[#333]">{getMenuSummary(order)}</div>
                    {order.deliveryType === 'delivery' && (
                      <Badge variant="outline" className="text-xs">
                        배달
                      </Badge>
                    )}
                    {order.deliveryType === 'pickup' && (
                      <Badge variant="outline" className="text-xs">
                        포장
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-[#333]">{formatAmount(order.finalAmount)}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-[#8B7355]">
                    {paymentMethodLabels[order.payment.method] || order.payment.method}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig[order.status].variant}
                    className={
                      order.status === 'pending'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : order.status === 'accepted'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : order.status === 'preparing'
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : order.status === 'completed'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : ''
                    }
                  >
                    {statusConfig[order.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetail(order)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetail(order)}>
                          상세 보기
                        </DropdownMenuItem>
                        {order.status === 'pending' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'accepted')}
                            >
                              접수 확인
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'canceled')}
                              className="text-red-600"
                            >
                              주문 취소
                            </DropdownMenuItem>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'preparing')}
                            >
                              조리 시작
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'canceled')}
                              className="text-red-600"
                            >
                              주문 취소
                            </DropdownMenuItem>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'completed')}
                            >
                              완료 처리
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'canceled')}
                              className="text-red-600"
                            >
                              주문 취소
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 모바일 카드 */}
      <div className="md:hidden divide-y">
        {orders.map((order) => (
          <div key={order.orderId} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="text-sm text-[#333]">{order.orderId}</div>
                <div className="text-xs text-[#8B7355]">{formatDate(order.createdAt)}</div>
              </div>
              <Badge
                variant={statusConfig[order.status].variant}
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
                {statusConfig[order.status].label}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-[#333]">{getMenuSummary(order)}</div>
              <div className="flex items-center gap-2 text-xs text-[#8B7355]">
                <span>{order.phone}</span>
                <span>·</span>
                <span>{formatAmount(order.finalAmount)}</span>
                <span>·</span>
                <span>{paymentMethodLabels[order.payment.method]}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetail(order)}
                className="flex-1"
              >
                상세보기
              </Button>
              {order.status !== 'completed' && order.status !== 'canceled' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {order.status === 'pending' && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(order, 'accepted')}>
                        접수 확인
                      </DropdownMenuItem>
                    )}
                    {order.status === 'accepted' && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(order, 'preparing')}>
                        조리 시작
                      </DropdownMenuItem>
                    )}
                    {order.status === 'preparing' && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(order, 'completed')}>
                        완료 처리
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(order, 'canceled')}
                      className="text-red-600"
                    >
                      주문 취소
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
