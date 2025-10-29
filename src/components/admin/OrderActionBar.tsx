import { useRef, useState } from 'react';
import { Bell, Printer, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { generateReceipt } from '../../lib/functions';
import type { Order } from '../../types/order';

interface OrderActionBarProps {
  order: Order;
}

export function OrderActionBar({ order }: OrderActionBarProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleBellRing = () => {
    // 자리표시자: 실제로는 주방 벨 시스템 연동
    toast.success('알림이 전송되었습니다', {
      description: '주방에 새로운 주문 알림을 보냈습니다.',
    });
  };

  const handlePrint = () => {
    try {
      // 브라우저 프린트 API 사용
      window.print();
      
      toast.success('인쇄 창이 열렸습니다', {
        description: `주문번호: ${order.orderId.slice(0, 8).toUpperCase()}`,
      });
    } catch (error) {
      console.error('Failed to print:', error);
      toast.error('인쇄 실패', {
        description: '프린터 설정을 확인해주세요.',
      });
    }
  };

  const handleDownloadReceipt = async () => {
    setDownloading(true);
    try {
      const receiptUrl = await generateReceipt(order.orderId);
      
      // 새 탭에서 열기
      window.open(receiptUrl, '_blank');
      toast.success('영수증이 다운로드되었습니다');
    } catch (error) {
      console.error('Failed to download receipt:', error);
      toast.error('영수증 다운로드에 실패했습니다');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBellRing}
        className="gap-2"
      >
        <Bell className="w-4 h-4" />
        알림
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        className="gap-2"
      >
        <Printer className="w-4 h-4" />
        주문서
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadReceipt}
        disabled={downloading}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        영수증
      </Button>
    </div>
  );
}
