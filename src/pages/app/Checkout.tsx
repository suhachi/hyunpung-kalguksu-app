import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, HandCoins, Loader2, AlertCircle, Gift } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../../components/ui/separator';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Switch } from '../../components/ui/switch';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import { getPointsBalance, spendPoints, POINTS_POLICY } from '../../lib/points.api';
import { FEATURE_FLAGS, USE_FIREBASE } from '../../config/env';
import type { PaymentMethod } from '../../types/order';

export function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    deliveryType,
    deliveryAddress,
    requests,
    couponDiscount,
    getSubtotal,
    getDeliveryFee,
    getTotalAmount,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 포인트 관련 상태
  const [pointsBalance, setPointsBalance] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const baseTotal = subtotal - couponDiscount + deliveryFee;
  const pointsDiscount = usePoints ? pointsToUse : 0;
  const totalAmount = baseTotal - pointsDiscount;

  // 장바구니 비어있으면 리다이렉트
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // 포인트 잔액 로드
  useEffect(() => {
    if (FEATURE_FLAGS.points) {
      loadPointsBalance();
    }
  }, []);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  async function loadPointsBalance() {
    try {
      const balance = await getPointsBalance(uid);
      setPointsBalance(balance);
    } catch (error) {
      console.error('Failed to load points balance:', error);
    }
  }

  // 포인트 사용 토글
  function handlePointsToggle(checked: boolean) {
    if (!checked) {
      setUsePoints(false);
      setPointsToUse(0);
      return;
    }

    // 사용 가능한 최대 포인트 계산
    const maxUsable = Math.min(pointsBalance, baseTotal);

    if (maxUsable < POINTS_POLICY.minUse) {
      toast.error(`최소 ${POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능합니다`);
      return;
    }

    setUsePoints(true);
    setPointsToUse(maxUsable);
  }

  // 포인트 사용 금액 변경
  function handlePointsChange(value: string) {
    const amount = parseInt(value) || 0;
    const maxUsable = Math.min(pointsBalance, baseTotal);

    if (amount > maxUsable) {
      setPointsToUse(maxUsable);
    } else if (amount < 0) {
      setPointsToUse(0);
    } else {
      setPointsToUse(amount);
    }
  }

  // 배달 시 주소 필수 확인
  const canProceed = agreeTerms && phone && (deliveryType === 'pickup' || deliveryAddress);

  const handlePayment = async () => {
    if (!canProceed) {
      toast.error('필수 정보를 입력해 주세요');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. 주문 ID 생성
      const orderId = `ORD${Date.now()}`;
      
      // 2. 포인트 사용 처리
      if (usePoints && pointsToUse > 0) {
        try {
          await spendPoints({
            uid,
            amount: pointsToUse,
            ref: {
              kind: 'order',
              id: orderId,
            },
            note: `주문 결제 시 포인트 사용`,
          });
        } catch (error) {
          toast.error('포인트 사용 중 오류가 발생했습니다');
          setIsProcessing(false);
          return;
        }
      }
      
      if (USE_FIREBASE) {
        // Firebase 연동 코드 (나중에 활성화)
        // TODO: Firestore에 주문 저장
        // TODO: NICEPAY 결제 호출
      } else {
        // 로컬 개발 모드: 주문 데이터를 localStorage에 저장
        const orderData = {
          orderId,
          items: items.map((item) => ({
            menuId: item.menuId,
            menuName: item.menuName,
            quantity: item.quantity,
            options: item.options,
            price: item.menuPrice,
            subtotal: item.subtotal,
          })),
          subtotal,
          discount: couponDiscount,
          pointsDiscount: pointsDiscount,
          deliveryFee,
          finalAmount: totalAmount,
          deliveryType,
          deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
          phone,
          email: email || undefined,
          requests: requests || undefined,
          status: 'placed',
          payment: {
            method: paymentMethod,
            status: paymentMethod === 'on_site' ? 'pending' : 'authorized',
            amount: totalAmount,
          },
          timeline: {
            pending: new Date().toISOString(),
            placed: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
        };

        // localStorage에 저장
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        orders[orderId] = orderData;
        localStorage.setItem('orders', JSON.stringify(orders));

        // 장바구니 비우기
        clearCart();

        // 성공 메시지
        if (paymentMethod === 'on_site') {
          toast.success('주문이 접수되었습니다');
          navigate(`/order/${orderId}?result=on_site`);
        } else {
          toast.success('결제가 완료되었습니다');
          navigate(`/order/${orderId}?result=success`);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('결제 처리 중 오류가 발생했습니다');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pb-32">
      <div className="px-4 py-6 space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-2xl text-[#2E1C10] mb-1">
            결제
          </h1>
          <p className="text-[#2E1C10]/60">
            결제 정보를 입력해 주세요
          </p>
        </div>

        {/* 주문 요약 */}
        <div className="bg-white rounded-2xl p-4 space-y-3">
          <h2 className="text-[#2E1C10]">주문 요약</h2>
          <div className="space-y-2">
            {items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/80">
                  {item.menuName} x {item.quantity}
                </span>
                <span className="text-[#2E1C10]">
                  {item.subtotal.toLocaleString()}원
                </span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-sm text-[#2E1C10]/60">
                외 {items.length - 3}개 메뉴
              </p>
            )}
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#2E1C10]/60">소계</span>
              <span className="text-[#2E1C10]">{subtotal.toLocaleString()}원</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">할인</span>
                <span className="text-[#D61C1C]">-{couponDiscount.toLocaleString()}원</span>
              </div>
            )}
            {deliveryType === 'delivery' && (
              <div className="flex justify-between text-sm">
                <span className="text-[#2E1C10]/60">배달비</span>
                <span className="text-[#2E1C10]">+{deliveryFee.toLocaleString()}원</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between">
              <span className="text-[#2E1C10]">총 결제액</span>
              <span className="text-xl text-[#D61C1C]">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* 포인트 사용 */}
        {FEATURE_FLAGS.points && (
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#D61C1C]" />
                <h2 className="text-[#2E1C10]">포인트 사용</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#2E1C10]/60">
                  보유: {pointsBalance.toLocaleString()}P
                </span>
                <Switch
                  checked={usePoints}
                  onCheckedChange={handlePointsToggle}
                  disabled={pointsBalance < POINTS_POLICY.minUse}
                />
              </div>
            </div>

            {usePoints && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={pointsToUse}
                    onChange={(e) => handlePointsChange(e.target.value)}
                    placeholder="사용할 포인트"
                    min={0}
                    max={Math.min(pointsBalance, baseTotal)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPointsToUse(Math.min(pointsBalance, baseTotal))}
                  >
                    전액 사용
                  </Button>
                </div>
                <p className="text-xs text-[#2E1C10]/60">
                  최소 {POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능 • 
                  최대 {Math.min(pointsBalance, baseTotal).toLocaleString()}P 사용 가능
                </p>
                {pointsToUse > 0 && (
                  <div className="flex justify-between text-sm p-3 bg-[#FBF9F6] rounded-lg">
                    <span className="text-[#2E1C10]/60">포인트 할인</span>
                    <span className="text-[#D61C1C] font-medium">
                      -{pointsToUse.toLocaleString()}원
                    </span>
                  </div>
                )}
              </div>
            )}

            {pointsBalance < POINTS_POLICY.minUse && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 text-sm">
                  포인트가 {POINTS_POLICY.minUse.toLocaleString()}P 미만입니다. 
                  주문 후 포인트를 적립하세요!
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* 연락처 정보 */}
        <div className="space-y-4">
          <h2 className="text-[#2E1C10]">연락처 정보</h2>
          <div>
            <Label htmlFor="phone">전화번호 *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">이메일 (선택)</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-[#2E1C10]/60 mt-1">
              이메일 영수증을 받으실 수 있어요
            </p>
          </div>
        </div>

        {/* 배달 주소 (배달 시만) */}
        {deliveryType === 'delivery' && !deliveryAddress && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              배달 주소를 입력해 주세요.{' '}
              <button className="underline" onClick={() => navigate('/cart')}>
                장바구니에서 설정
              </button>
            </AlertDescription>
          </Alert>
        )}

        {deliveryType === 'delivery' && deliveryAddress && (
          <div className="bg-white rounded-2xl p-4">
            <h2 className="text-[#2E1C10] mb-2">배달 주소</h2>
            <p className="text-sm text-[#2E1C10]">{deliveryAddress.address}</p>
            <p className="text-sm text-[#2E1C10]/60">{deliveryAddress.detail}</p>
          </div>
        )}

        {/* 결제 수단 */}
        <div>
          <h2 className="text-[#2E1C10] mb-3">결제 수단</h2>
          <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="w-5 h-5 text-[#D61C1C]" />
                <div>
                  <p className="text-[#2E1C10]">신용/체크카드</p>
                  <p className="text-sm text-[#2E1C10]/60">NICEPAY 안전 결제</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="easy_pay" id="easy_pay" />
              <Label htmlFor="easy_pay" className="flex items-center gap-2 cursor-pointer flex-1">
                <Wallet className="w-5 h-5 text-[#F37021]" />
                <div>
                  <p className="text-[#2E1C10]">간편결제</p>
                  <p className="text-sm text-[#2E1C10]/60">카카오페이, 네이버페이 등</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#2E1C10]/10">
              <RadioGroupItem value="on_site" id="on_site" />
              <Label htmlFor="on_site" className="flex items-center gap-2 cursor-pointer flex-1">
                <HandCoins className="w-5 h-5 text-[#C7A45A]" />
                <div>
                  <p className="text-[#2E1C10]">만나서 결제</p>
                  <p className="text-sm text-[#2E1C10]/60">현금 또는 카드</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* 약관 동의 */}
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
              <span className="text-[#2E1C10]">
                전자금융거래 이용약관, 주문 내역 확인 및 결제 동의
              </span>
            </Label>
          </div>
          <p className="text-xs text-[#2E1C10]/60 pl-6">
            위 내용을 확인하였으며 결제에 동의합니다.
          </p>
        </div>
      </div>

      {/* 하단 고정 결제 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#2E1C10]/10 px-4 py-4">
        <Button
          size="lg"
          className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          disabled={!canProceed || isProcessing}
          onClick={handlePayment}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              결제 처리 중...
            </>
          ) : (
            `${totalAmount.toLocaleString()}원 결제하기`
          )}
        </Button>
      </div>
    </div>
  );
}
