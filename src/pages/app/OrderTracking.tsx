import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Phone, CheckCircle2, Clock, Loader2, XCircle, AlertCircle, Receipt, Download, MapPin, Navigation, Gift } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Separator } from '../../components/ui/separator';
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
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { generateReceipt, requestCashReceipt } from '../../lib/functions';
import { toast } from 'sonner@2.0.3';
import { delivery, isDeliveryEnabled } from '../../lib/delivery';
import { earnPoints, calculateEarnPoints } from '../../lib/points.api';
import { FEATURE_FLAGS } from '../../config/env';
import type { OrderStatus } from '../../types/order';
import type { DeliveryTask } from '../../types/delivery';

// Firebase는 나중에 연동 (현재는 로컬 개발 모드)
const USE_FIREBASE = false;

// 로컬 개발용 Order 타입 (간소화)
interface LocalOrder {
  orderId: string;
  items: Array<{
    menuId: string;
    menuName: string;
    quantity: number;
    options: {
      noodle?: string;
      spicy?: string;
      toppings?: string[];
    };
    price: number;
    subtotal: number;
  }>;
  subtotal: number;
  discount: number;
  pointsDiscount?: number;
  deliveryFee: number;
  finalAmount: number;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: {
    address: string;
    detail: string;
  };
  phone: string;
  email?: string;
  requests?: string;
  status: OrderStatus;
  payment: {
    method: string;
    status: string;
    amount: number;
  };
  timeline: {
    pending?: string;
    placed?: string;
    accepted?: string;
    cooking?: string;
    out_for_delivery?: string;
    pickup_ready?: string;
    done?: string;
  };
  createdAt: string;
  pointsEarned?: number; // 적립된 포인트 (완료 시)
}

const statusConfig: Record<OrderStatus, { label: string; icon: any; color: string }> = {
  pending: { label: '결제 대기', icon: Clock, color: 'text-gray-500' },
  payment_failed: { label: '결제 실패', icon: XCircle, color: 'text-red-500' },
  placed: { label: '주문 접수', icon: CheckCircle2, color: 'text-green-500' },
  accepted: { label: '접수 확인', icon: CheckCircle2, color: 'text-green-500' },
  cooking: { label: '조리 중', icon: Loader2, color: 'text-orange-500' },
  out_for_delivery: { label: '배달 중', icon: Loader2, color: 'text-blue-500' },
  pickup_ready: { label: '포장 완료', icon: CheckCircle2, color: 'text-green-500' },
  done: { label: '완료', icon: CheckCircle2, color: 'text-green-500' },
  canceled: { label: '취소', icon: XCircle, color: 'text-gray-500' },
};

export function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<LocalOrder | null>(null);
  const [loading, setLoading] = useState(true);

  // 배달 추적 상태
  const [deliveryTask, setDeliveryTask] = useState<DeliveryTask | null>(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  // 현금영수증 신청 상태
  const [cashReceiptDialog, setCashReceiptDialog] = useState(false);
  const [cashReceiptType, setCashReceiptType] = useState<'personal' | 'business'>('personal');
  const [cashReceiptNumber, setCashReceiptNumber] = useState('');
  const [issuingCashReceipt, setIssuingCashReceipt] = useState(false);

  // 영수증 다운로드 상태
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  // 포인트 적립 처리 여부
  const [pointsProcessed, setPointsProcessed] = useState(false);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  const result = searchParams.get('result');
  const resultMsg = searchParams.get('msg');

  useEffect(() => {
    if (!orderId) return;

    if (USE_FIREBASE) {
      // Firebase 연동 코드 (나중에 활성화)
      // TODO: Firestore 실시간 리스너
    } else {
      // 로컬 개발 모드: localStorage에서 주문 조회
      try {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        const foundOrder = orders[orderId];
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setOrder(null);
        }
      } catch (error) {
        console.error('Failed to load order:', error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
  }, [orderId]);

  // 배달 추적 정보 로드 (배달 중일 때)
  useEffect(() => {
    if (!order || !isDeliveryEnabled || order.deliveryType !== 'delivery') return;

    // 배달 중 상태일 때만 추적 정보 로드
    if (order.status === 'out_for_delivery') {
      loadDeliveryTracking();
      
      // 5초마다 배달 정보 업데이트
      const interval = setInterval(loadDeliveryTracking, 5000);
      return () => clearInterval(interval);
    }
  }, [order]);

  // 포인트 적립 처리 (주문 완료 시)
  useEffect(() => {
    if (!order || !FEATURE_FLAGS.points || pointsProcessed) return;

    // 주문 완료 상태이고 아직 포인트 적립이 안된 경우
    if (order.status === 'done' && !order.pointsEarned) {
      processPointsEarn();
    }
  }, [order, pointsProcessed]);

  async function processPointsEarn() {
    if (!order || !orderId) return;

    try {
      // 적립 포인트 계산 (결제 금액 기준)
      const earnAmount = calculateEarnPoints(order.finalAmount);

      if (earnAmount > 0) {
        await earnPoints({
          uid,
          amount: earnAmount,
          ref: {
            kind: 'order',
            id: orderId,
          },
          note: `주문 완료 포인트 적립 (주문번호: ${orderId})`,
        });

        // 주문 정보 업데이트
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        orders[orderId].pointsEarned = earnAmount;
        localStorage.setItem('orders', JSON.stringify(orders));

        // 상태 업데이트
        setOrder({ ...order, pointsEarned: earnAmount });
        setPointsProcessed(true);

        // 토스트 알림
        toast.success(`${earnAmount.toLocaleString()}P 포인트가 적립되었습니다!`, {
          icon: <Gift className="w-4 h-4" />,
        });
      }
    } catch (error) {
      console.error('Failed to earn points:', error);
      // 에러가 발생해도 다시 시도하지 않도록 처리됨으로 표시
      setPointsProcessed(true);
    }
  }

  async function loadDeliveryTracking() {
    if (!orderId) return;

    try {
      setDeliveryLoading(true);
      
      // localStorage에서 배달 taskId 조회
      const deliveryMeta = localStorage.getItem(`delivery_${orderId}`);
      if (deliveryMeta) {
        const { taskId } = JSON.parse(deliveryMeta);
        const task = await delivery.getTask(taskId);
        setDeliveryTask(task);
      }
    } catch (error) {
      console.error('Failed to load delivery tracking:', error);
    } finally {
      setDeliveryLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D61C1C]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <AlertCircle className="w-16 h-16 text-[#2E1C10]/40 mb-4" />
        <h2 className="text-xl text-[#2E1C10] mb-2">
          주문을 찾을 수 없습니다
        </h2>
        <Button onClick={() => navigate('/app')}>홈으로</Button>
      </div>
    );
  }

  const statusInfo = statusConfig[order.status];
  const StatusIcon = statusInfo.icon;

  // 결제 결과 메시지
  const paymentResultMessage = result === 'success'
    ? '결제가 완료되었습니다'
    : result === 'failed'
    ? `결제 실패: ${resultMsg || '알 수 없는 오류'}`
    : result === 'timeout'
    ? '결제 결과 확인 시간이 초과되었습니다'
    : result === 'on_site'
    ? '주문이 접수되었습니다. 만나서 결제해 주세요.'
    : null;

  return (
    <div className="pb-6">
      <div className="px-4 py-6 space-y-6">
        {/* 결제 결과 알림 */}
        {paymentResultMessage && (
          <Alert variant={result === 'success' || result === 'on_site' ? 'default' : 'destructive'}>
            {result === 'success' || result === 'on_site' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertDescription>{paymentResultMessage}</AlertDescription>
          </Alert>
        )}

        {/* 주문 상태 */}
        <div className="bg-white rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 rounded-full bg-${statusInfo.color.split('-')[1]}-100 flex items-center justify-center`}>
              <StatusIcon className={`w-8 h-8 ${statusInfo.color} ${statusInfo.icon === Loader2 ? 'animate-spin' : ''}`} />
            </div>
          </div>
          <h1 className="text-2xl text-[#2E1C10] mb-2">
            {statusInfo.label}
          </h1>
          <p className="text-[#2E1C10]/60">
            주문번호: {order.orderId}
          </p>
        </div>

        {/* 타임라인 */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-[#2E1C10] mb-4">주문 진행 상황</h2>
          <div className="space-y-4">
            {order.deliveryType === 'delivery' ? (
              <>
                <TimelineItem
                  label="주문 접수"
                  timestamp={order.timeline.placed}
                  completed={!!order.timeline.placed}
                  active={order.status === 'placed'}
                />
                <TimelineItem
                  label="접수 확인"
                  timestamp={order.timeline.accepted}
                  completed={!!order.timeline.accepted}
                  active={order.status === 'accepted'}
                />
                <TimelineItem
                  label="조리 중"
                  timestamp={order.timeline.cooking}
                  completed={!!order.timeline.cooking}
                  active={order.status === 'cooking'}
                />
                <TimelineItem
                  label="배달 중"
                  timestamp={order.timeline.out_for_delivery}
                  completed={!!order.timeline.out_for_delivery}
                  active={order.status === 'out_for_delivery'}
                />
                <TimelineItem
                  label="완료"
                  timestamp={order.timeline.done}
                  completed={!!order.timeline.done}
                  active={order.status === 'done'}
                  isLast
                />
              </>
            ) : (
              <>
                <TimelineItem
                  label="주문 접수"
                  timestamp={order.timeline.placed}
                  completed={!!order.timeline.placed}
                  active={order.status === 'placed'}
                />
                <TimelineItem
                  label="조리 중"
                  timestamp={order.timeline.cooking}
                  completed={!!order.timeline.cooking}
                  active={order.status === 'cooking'}
                />
                <TimelineItem
                  label="포장 완료"
                  timestamp={order.timeline.pickup_ready}
                  completed={!!order.timeline.pickup_ready}
                  active={order.status === 'pickup_ready'}
                />
                <TimelineItem
                  label="완료"
                  timestamp={order.timeline.done}
                  completed={!!order.timeline.done}
                  active={order.status === 'done'}
                  isLast
                />
              </>
            )}
          </div>
        </div>

        {/* GPS 배달 추적 (배달 중일 때) */}
        {isDeliveryEnabled && 
         order.deliveryType === 'delivery' && 
         order.status === 'out_for_delivery' && 
         deliveryTask && (
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* 지도 플레이스홀더 */}
            <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-[#D61C1C] mx-auto animate-bounce" />
                  <p className="text-[#2E1C10]/60 text-sm">실시간 배달 추적</p>
                  <p className="text-xs text-[#2E1C10]/40">
                    {deliveryTask.lastCoord 
                      ? `위도 ${deliveryTask.lastCoord.lat.toFixed(4)}, 경도 ${deliveryTask.lastCoord.lng.toFixed(4)}`
                      : '위치 정보 로딩 중...'}
                  </p>
                </div>
              </div>
              
              {/* TODO: 실제 지도 API 연동 (Kakao Maps, Google Maps 등) */}
              {/* <div id="delivery-map" className="w-full h-full" /> */}
            </div>

            {/* 배달 정보 */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#D61C1C]/10 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-[#D61C1C]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#2E1C10]/60">배달 상태</p>
                    <p className="text-[#2E1C10]">
                      {deliveryTask.status === 'delivering' ? '배달 중' : 
                       deliveryTask.status === 'picked_up' ? '픽업 완료' :
                       deliveryTask.status === 'assigned' ? '배정됨' : '처리 중'}
                    </p>
                  </div>
                </div>
                
                {deliveryTask.eta !== undefined && deliveryTask.eta > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-[#2E1C10]/60">예상 도착</p>
                    <p className="text-xl text-[#F37021]">
                      약 {deliveryTask.eta}분
                    </p>
                  </div>
                )}
              </div>

              {deliveryTask.driverId && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-[#2E1C10]/60 mb-1">배달기사 정보</p>
                  <p className="text-sm text-[#2E1C10]">
                    기사 ID: {deliveryTask.driverId}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 예상 시간 (조리 중일 때만, 또는 배달추적 미활성화 시) */}
        {(order.status === 'cooking' || 
          (order.status === 'out_for_delivery' && (!isDeliveryEnabled || !deliveryTask))) && (
          <div className="bg-[#F37021]/10 rounded-2xl p-4 text-center">
            <Clock className="w-6 h-6 text-[#F37021] mx-auto mb-2" />
            <p className="text-[#2E1C10]">
              {order.deliveryType === 'delivery' ? '예상 도착' : '예상 완료'}
            </p>
            <p className="text-xl text-[#F37021]">
              약 30-40분
            </p>
          </div>
        )}

        {/* 가게 문의 */}
        <div className="bg-white rounded-2xl p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = 'tel:010-2068-4732')}
          >
            <Phone className="w-5 h-5 mr-2" />
            가게에 문의하기
          </Button>
        </div>

        <Separator />

        {/* 주문 상세 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">주문 내역</h2>
          <div className="bg-white rounded-2xl p-4 space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex-1">
                  <p className="text-[#2E1C10]">
                    {item.menuName} x {item.quantity}
                  </p>
                  {(item.options.noodle || item.options.spicy || item.options.toppings) && (
                    <p className="text-sm text-[#2E1C10]/60">
                      {[
                        item.options.noodle && `면양: ${item.options.noodle}`,
                        item.options.spicy && `맵기: ${item.options.spicy}`,
                        item.options.toppings && item.options.toppings.length > 0 && `토핑: ${item.options.toppings.join(', ')}`,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                </div>
                <span className="text-[#2E1C10]">
                  {item.subtotal.toLocaleString()}원
                </span>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">소계</span>
                <span className="text-[#2E1C10]">{order.subtotal.toLocaleString()}원</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#2E1C10]/60">쿠폰 할인</span>
                  <span className="text-[#D61C1C]">-{order.discount.toLocaleString()}원</span>
                </div>
              )}
              {order.pointsDiscount && order.pointsDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-[#2E1C10]/60">
                    <Gift className="w-3 h-3" />
                    <span>포인트 할인</span>
                  </div>
                  <span className="text-[#D61C1C]">-{order.pointsDiscount.toLocaleString()}P</span>
                </div>
              )}
              {order.deliveryType === 'delivery' && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#2E1C10]/60">배달비</span>
                  <span className="text-[#2E1C10]">+{order.deliveryFee.toLocaleString()}원</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className="text-[#2E1C10]">총 결제액</span>
                <span className="text-xl text-[#D61C1C]">
                  {order.finalAmount.toLocaleString()}원
                </span>
              </div>
              
              {/* 포인트 적립 정보 */}
              {FEATURE_FLAGS.points && order.pointsEarned && (
                <>
                  <Separator />
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#D61C1C]/5 to-[#F37021]/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#D61C1C]" />
                      <span className="text-sm text-[#2E1C10]">적립 포인트</span>
                    </div>
                    <span className="font-medium text-[#D61C1C]">
                      +{order.pointsEarned.toLocaleString()}P
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 배달 주소 */}
        {order.deliveryType === 'delivery' && order.deliveryAddress && (
          <div>
            <h2 className="text-[#2E1C10] mb-3">배달 주소</h2>
            <div className="bg-white rounded-2xl p-4">
              <p className="text-sm text-[#2E1C10]">{order.deliveryAddress.address}</p>
              <p className="text-sm text-[#2E1C10]/60">{order.deliveryAddress.detail}</p>
            </div>
          </div>
        )}

        {/* 요청사항 */}
        {order.requests && (
          <div>
            <h2 className="text-[#2E1C10] mb-3">요청사항</h2>
            <div className="bg-white rounded-2xl p-4">
              <p className="text-sm text-[#2E1C10]">{order.requests}</p>
            </div>
          </div>
        )}

        {/* 영수증 관련 버튼 (완료 시) */}
        {order.status === 'done' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleDownloadReceipt}
                disabled={downloadingReceipt}
              >
                {downloadingReceipt ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                영수증 보기
              </Button>
              <Button
                variant="outline"
                onClick={() => setCashReceiptDialog(true)}
              >
                <Receipt className="w-4 h-4 mr-2" />
                현금영수증
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
              onClick={() => navigate(`/review/${orderId}`)}
            >
              리뷰 작성하고 쿠폰 받기 🎁
            </Button>
          </div>
        )}
      </div>

      {/* 현금영수증 신청 다이얼로그 */}
      <Dialog open={cashReceiptDialog} onOpenChange={setCashReceiptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>현금영수증 신청</DialogTitle>
            <DialogDescription>
              현금영수증 발급 정보를 입력해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>발급 유형</Label>
              <RadioGroup value={cashReceiptType} onValueChange={(v) => setCashReceiptType(v as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="font-normal cursor-pointer">
                    개인 소득공제용
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business" className="font-normal cursor-pointer">
                    사업자 지출증빙용
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt-number">
                {cashReceiptType === 'personal' ? '휴대폰 번호' : '사업자등록번호'}
              </Label>
              <Input
                id="receipt-number"
                placeholder={
                  cashReceiptType === 'personal'
                    ? '01012345678'
                    : '000-00-00000'
                }
                value={cashReceiptNumber}
                onChange={(e) => setCashReceiptNumber(e.target.value)}
              />
            </div>

            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              💡 현금영수증은 신청 후 즉시 발급되며, 국세청 홈택스에서 확인할 수 있습니다.
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCashReceiptDialog(false);
                setCashReceiptNumber('');
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleRequestCashReceipt}
              disabled={!cashReceiptNumber.trim() || issuingCashReceipt}
            >
              {issuingCashReceipt ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  발급 중...
                </>
              ) : (
                '신청하기'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  // 영수증 다운로드
  async function handleDownloadReceipt() {
    if (!orderId) return;

    setDownloadingReceipt(true);
    try {
      const receiptUrl = await generateReceipt(orderId);
      
      // 새 탭에서 열기
      window.open(receiptUrl, '_blank');
      toast.success('영수증이 다운로드되었습니다');
    } catch (error) {
      console.error('Failed to download receipt:', error);
      toast.error('영수증 다운로드에 실패했습니다', {
        description: '잠시 후 다시 시도해주세요',
      });
    } finally {
      setDownloadingReceipt(false);
    }
  }

  // 현금영수증 신청
  async function handleRequestCashReceipt() {
    if (!orderId || !cashReceiptNumber.trim()) return;

    setIssuingCashReceipt(true);
    try {
      const result = await requestCashReceipt(orderId, cashReceiptNumber);
      
      if (result.success) {
        toast.success('현금영수증이 발급되었습니다', {
          description: `발급번호: ${result.receiptNo}`,
        });
        setCashReceiptDialog(false);
        setCashReceiptNumber('');
      } else {
        toast.error('현금영수증 발급에 실패했습니다');
      }
    } catch (error) {
      console.error('Failed to request cash receipt:', error);
      toast.error('현금영수증 발급에 실패했습니다', {
        description: '잠시 후 다시 시도해주세요',
      });
    } finally {
      setIssuingCashReceipt(false);
    }
  }
}

interface TimelineItemProps {
  label: string;
  timestamp: any;
  completed: boolean;
  active: boolean;
  isLast?: boolean;
}

function TimelineItem({ label, timestamp, completed, active, isLast }: TimelineItemProps) {
  let time = '';
  
  if (timestamp) {
    try {
      // ISO string 또는 Firestore Timestamp 처리
      const date = typeof timestamp === 'string' 
        ? new Date(timestamp)
        : timestamp.toDate?.() 
        ? new Date(timestamp.toDate()) 
        : null;
      
      if (date) {
        time = date.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    } catch (e) {
      // 타임스탬프 파싱 실패 시 무시
    }
  }

  return (
    <div className="flex items-start gap-3">
      {/* 아이콘 */}
      <div className="relative">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed
              ? 'bg-green-500'
              : active
              ? 'bg-[#D61C1C]'
              : 'bg-gray-200'
          }`}
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-white" />
          ) : active ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Clock className="w-5 h-5 text-gray-400" />
          )}
        </div>
        {!isLast && (
          <div
            className={`absolute left-1/2 top-8 w-0.5 h-8 -translate-x-1/2 ${
              completed ? 'bg-green-500' : 'bg-gray-200'
            }`}
          />
        )}
      </div>

      {/* 텍스트 */}
      <div className="flex-1 pt-1">
        <p className={`${completed || active ? 'text-[#2E1C10]' : 'text-[#2E1C10]/60'}`}>
          {label}
        </p>
        {time && (
          <p className="text-sm text-[#2E1C10]/60">{time}</p>
        )}
      </div>
    </div>
  );
}
