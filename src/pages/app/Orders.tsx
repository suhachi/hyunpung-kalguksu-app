/**
 * 주문 내역 페이지
 * 고객의 주문 목록 확인 및 추적
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Clock, MapPin, Package, CheckCircle, Star, RefreshCw } from "lucide-react";
import type { OrderStatus } from "../../types/order";

// 로컬 Order 인터페이스 (간소화된 목록용)
interface Order {
  id: string;
  orderNumber: string;
  menuItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
  estimatedArrival?: string;
}

// Mock 데이터 (실제로는 API에서 가져옴)
// 표준 OrderStatus로 매핑
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    menuItems: [
      { name: '닭칼국수', quantity: 2, price: 14000 },
      { name: '물만두', quantity: 1, price: 5000 },
    ],
    totalAmount: 33000,
    status: 'preparing', // delivering → preparing (표준화)
    createdAt: '2025-10-29T09:30:00',
    deliveryAddress: '대구광역시 현풍읍',
    estimatedArrival: '10:45',
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    menuItems: [
      { name: '닭칼국수', quantity: 1, price: 14000 },
    ],
    totalAmount: 14000,
    status: 'completed', // 표준
    createdAt: '2025-10-28T18:20:00',
    deliveryAddress: '대구광역시 현풍읍',
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-003',
    menuItems: [
      { name: '닭칼국수', quantity: 3, price: 14000 },
      { name: '물만두', quantity: 2, price: 5000 },
    ],
    totalAmount: 52000,
    status: 'accepted', // pending → accepted
    createdAt: '2025-10-29T10:00:00',
    deliveryAddress: '대구광역시 현풍읍',
  },
];

// 표준 OrderStatus에 맞춘 상태 설정
const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: '주문 접수', color: 'bg-gray-500', icon: <Clock className="w-4 h-4" /> },
  accepted: { label: '주문 확정', color: 'bg-blue-500', icon: <CheckCircle className="w-4 h-4" /> },
  preparing: { label: '조리 중', color: 'bg-yellow-500', icon: <RefreshCw className="w-4 h-4" /> },
  completed: { label: '배달 완료', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> },
  canceled: { label: '주문 취소', color: 'bg-red-500', icon: <Clock className="w-4 h-4" /> },
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'completed'>('all');

  // 필터링된 주문 목록 (표준 OrderStatus 기준)
  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ongoing') return ['pending', 'accepted', 'preparing'].includes(order.status);
    if (activeTab === 'completed') return order.status === 'completed';
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F6F3] pb-24">
      <div className="sticky top-0 z-10 bg-white border-b border-[#2E1C10]/10">
        <div className="flex items-center justify-between h-14 px-4">
          <h1 className="text-lg font-semibold text-[#2E1C10]">주문 내역</h1>
        </div>
      </div>

      <div className="p-4">
        {/* 탭 */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#D61C1C]/10 data-[state=active]:text-[#D61C1C]">
              전체
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="data-[state=active]:bg-[#D61C1C]/10 data-[state=active]:text-[#D61C1C]">
              진행중
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-[#D61C1C]/10 data-[state=active]:text-[#D61C1C]">
              완료
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 주문 목록 */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="rounded-2xl border-[#E5DDD5]">
              <CardContent className="py-12 text-center">
                <Package className="w-16 h-16 mx-auto text-[#2E1C10]/30 mb-4" />
                <p className="text-[#2E1C10] font-medium mb-2">주문 내역이 없습니다</p>
                <p className="text-sm text-[#8B7355] mb-4">맛있는 칼국수를 주문해보세요!</p>
                <Link to="/menu">
                  <Button className="bg-[#D61C1C] hover:bg-[#D61C1C]/90">
                    메뉴 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = statusConfig[order.status];
              
              return (
                <Card key={order.id} className="rounded-2xl border-[#E5DDD5] overflow-hidden">
                  <CardContent className="p-4">
                    {/* 헤더 */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[#2E1C10]">{order.orderNumber}</h3>
                          <Badge className={`${statusInfo.color} text-white border-0 flex items-center gap-1`}>
                            {statusInfo.icon}
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#8B7355]">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    {/* 메뉴 항목 */}
                    <div className="space-y-2 mb-3">
                      {order.menuItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-[#2E1C10]">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-[#8B7355]">
                            {item.price.toLocaleString()}원
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 배달 정보 */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-[#8B7355]">
                      <MapPin className="w-4 h-4" />
                      <span>{order.deliveryAddress}</span>
                    </div>

                    {/* 금액 */}
                    <div className="flex items-center justify-between border-t border-[#E5DDD5] pt-3">
                      <span className="text-sm text-[#8B7355]">총 주문 금액</span>
                      <span className="text-lg font-bold text-[#D61C1C]">
                        {order.totalAmount.toLocaleString()}원
                      </span>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex gap-2 mt-3">
                      {(['pending', 'accepted', 'preparing'].includes(order.status)) && (
                        <Link to={`/order/${order.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-[#D61C1C] text-[#D61C1C] hover:bg-[#D61C1C]/10">
                            주문 현황
                          </Button>
                        </Link>
                      )}
                      {order.status === 'completed' && (
                        <Link to={`/review/${order.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-[#D61C1C] text-[#D61C1C] hover:bg-[#D61C1C]/10">
                            <Star className="w-4 h-4 mr-2" />
                            리뷰 작성
                          </Button>
                        </Link>
                      )}
                      <Link to={`/order/${order.id}`} className="flex-1">
                        <Button className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90">
                          상세보기
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
