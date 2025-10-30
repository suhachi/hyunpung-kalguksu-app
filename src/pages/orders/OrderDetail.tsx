/**
 * 주문 상세 페이지
 * 영수증/쿠폰/결제정보/배달상태 표시
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Package,
  MapPin,
  CreditCard,
  Ticket,
  Clock,
  Receipt,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { getOrder } from '../../lib/orders.api';
import { useCart } from '../../contexts/CartContext';
import type { Order, OrderStatus } from '../../types/order';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toast } from 'sonner';

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

export function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { addItem, clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  async function loadOrder() {
    if (!orderId) return;

    setLoading(true);
    try {
      const data = await getOrder(orderId);
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
      toast.error('주문을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  async function handleReorder() {
    if (!order) return;

    setReordering(true);
    const warnings: string[] = [];
    const errors: string[] = [];

    try {
      // 장바구니 비우기
      clearCart();

      // 주문 아이템들을 장바구니에 추가
      for (const item of order.items) {
        try {
          // 메뉴 정보 조회 (가격 확인용)
          let menu;
          try {
            menu = await getMenuById(item.menuId);
            
            // 가격 변경 확인
            if (menu && menu.price !== item.price) {
              warnings.push(`${item.menuName}: 가격이 변경되었습니다 (${item.price.toLocaleString()}원 → ${menu.price.toLocaleString()}원)`);
            }

            // 품절 확인
            if (menu && !menu.isAvailable) {
              errors.push(`${item.menuName}: 품절된 메뉴입니다`);
              continue;
            }
          } catch (error) {
            warnings.push(`${item.menuName}: 메뉴 정보를 불러올 수 없습니다 (기존 가격으로 추가됩니다)`);
          }

          // 옵션 가격 계산 (간단하게, 실제로는 옵션 그룹 API에서 조회 필요)
          const optionPrices = {
            noodle: 0, // 기본값
            toppings: 0, // 기본값
          };

          addItem({
            menuId: item.menuId,
            menuName: item.menuName,
            menuImage: item.menuImage,
            menuPrice: menu?.price || item.price,
            quantity: item.quantity,
            options: item.options,
            optionPrices,
            subtotal: (menu?.price || item.price) * item.quantity,
          });
        } catch (error) {
          errors.push(`${item.menuName}: 장바구니 추가 실패`);
        }
      }

      // 경고/에러 표시
      if (warnings.length > 0) {
        toast.warning(warnings.join(', '));
      }
      if (errors.length > 0) {
        toast.error(errors.join(', '));
      }

      if (errors.length === 0) {
        toast.success('장바구니에 담았습니다');
        navigate('/cart');
      }
    } catch (error) {
      console.error('Reorder failed:', error);
      toast.error('재주문 처리 중 오류가 발생했습니다');
    } finally {
      setReordering(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-6 h-6 animate-spin text-[#D61C1C]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p className="text-[#2E1C10]/60 mb-4">주문을 찾을 수 없습니다</p>
        <Button onClick={() => navigate('/orders')}>주문 내역으로</Button>
      </div>
    );
  }

  const createdAt = order.createdAt?.seconds
    ? new Date(order.createdAt.seconds * 1000)
    : typeof order.createdAt === 'string'
      ? new Date(order.createdAt)
      : new Date();

  return (
    <div className="space-y-6 pb-32">
      {/* 헤더 */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/orders')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl text-[#2E1C10]">주문 상세</h1>
          <p className="text-sm text-[#2E1C10]/60">{order.orderId}</p>
        </div>
        <Badge className={`${STATUS_COLORS[order.status]} text-white`}>
          {STATUS_LABELS[order.status]}
        </Badge>
      </div>

      {/* 주문 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#D61C1C]" />
            주문 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-[#2E1C10]/60">주문 일시</p>
            <p className="text-[#2E1C10]">
              {format(createdAt, 'yyyy년 MM월 dd일 HH:mm:ss', { locale: ko })}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#2E1C10]/60 mb-2">주문 메뉴</p>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="text-[#2E1C10]">
                      {item.menuName} x {item.quantity}
                    </p>
                    {item.options.noodle && (
                      <p className="text-xs text-[#2E1C10]/60">
                        면: {item.options.noodle}
                        {item.options.spicy && `, 맵기: ${item.options.spicy}`}
                      </p>
                    )}
                  </div>
                  <span className="text-[#2E1C10]">{item.subtotal.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">주문 금액</span>
              <span className="text-[#2E1C10]">{order.subtotal.toLocaleString()}원</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">할인</span>
                <span className="text-[#D61C1C]">-{order.discount.toLocaleString()}원</span>
              </div>
            )}
            {order.couponSnapshot && (
              <div className="text-xs text-[#2E1C10]/60 pl-2">
                쿠폰: {order.couponSnapshot.title || '쿠폰 할인'}
              </div>
            )}
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">배달비</span>
                <span className="text-[#2E1C10]">+{order.deliveryFee.toLocaleString()}원</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span className="text-[#2E1C10]">최종 결제 금액</span>
              <span className="text-xl text-[#D61C1C]">
                {order.finalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 결제 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#D61C1C]" />
            결제 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-[#2E1C10]/60">결제 수단</span>
            <span className="text-[#2E1C10]">
              {order.payment.method === 'card' && '카드 결제'}
              {order.payment.method === 'transfer' && '계좌이체'}
              {order.payment.method === 'easy_pay' && '간편결제'}
              {order.payment.method === 'on_site' && '만나서 결제'}
            </span>
          </div>
          {order.payment.cardName && (
            <div className="flex justify-between">
              <span className="text-sm text-[#2E1C10]/60">카드사</span>
              <span className="text-[#2E1C10]">{order.payment.cardName}</span>
            </div>
          )}
          {order.payment.tid && (
            <div className="flex justify-between">
              <span className="text-sm text-[#2E1C10]/60">거래 ID</span>
              <span className="text-sm text-[#2E1C10]/60 font-mono">{order.payment.tid}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 배달 정보 */}
      {order.deliveryType === 'delivery' && order.deliveryAddress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#D61C1C]" />
              배달 주소
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2E1C10]">{order.deliveryAddress.address}</p>
            {order.deliveryAddress.detail && (
              <p className="text-sm text-[#2E1C10]/60 mt-1">
                {order.deliveryAddress.detail}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* 요청사항 */}
      {order.requests && (
        <Card>
          <CardHeader>
            <CardTitle>요청사항</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2E1C10]">{order.requests}</p>
          </CardContent>
        </Card>
      )}

      {/* 재주문 버튼 */}
      {order.status !== 'canceled' && (
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-[#D61C1C] hover:bg-[#D61C1C]/90"
            onClick={handleReorder}
            disabled={reordering}
          >
            {reordering ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                재주문 중...
              </>
            ) : (
              <>
                <Package className="w-4 h-4 mr-2" />
                재주문
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

