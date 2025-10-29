import { forwardRef } from 'react';
import type { Order } from '../../types/order';

interface PrintableOrderProps {
  order: Order;
}

/**
 * 인쇄용 주문서 컴포넌트
 * - 브라우저 print() API용 레이아웃
 * - 영수증 프린터 호환 포맷
 */
export const PrintableOrder = forwardRef<HTMLDivElement, PrintableOrderProps>(
  ({ order }, ref) => {
    const createdAt = order.createdAt
      ? new Date((order.createdAt as any).toDate?.() || order.createdAt).toLocaleString('ko-KR')
      : '';

    return (
      <div ref={ref} className="print:block hidden">
        <style>
          {`
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
              }
              .print-content {
                width: 80mm;
                font-family: 'Courier New', monospace;
                font-size: 10pt;
                padding: 5mm;
              }
              .print-content h1 {
                font-size: 14pt;
                margin: 0 0 5mm 0;
                text-align: center;
              }
              .print-content h2 {
                font-size: 12pt;
                margin: 3mm 0 2mm 0;
                border-bottom: 1px dashed #000;
                padding-bottom: 1mm;
              }
              .print-content table {
                width: 100%;
                border-collapse: collapse;
              }
              .print-content td {
                padding: 1mm 0;
              }
              .print-divider {
                border-top: 1px dashed #000;
                margin: 3mm 0;
              }
            }
          `}
        </style>

        <div className="print-content">
          {/* 헤더 */}
          <h1>현풍닭칼국수</h1>
          <div style={{ textAlign: 'center', fontSize: '9pt', marginBottom: '5mm' }}>
            주문서
          </div>

          {/* 주문 정보 */}
          <table>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>주문번호:</td>
                <td>{order.orderId.slice(0, 8).toUpperCase()}</td>
              </tr>
              <tr>
                <td>주문시각:</td>
                <td>{createdAt}</td>
              </tr>
              <tr>
                <td>주문유형:</td>
                <td>{order.deliveryType === 'delivery' ? '배달' : '포장'}</td>
              </tr>
              <tr>
                <td>연락처:</td>
                <td>{order.phone}</td>
              </tr>
            </tbody>
          </table>

          {/* 배달 주소 */}
          {order.deliveryType === 'delivery' && order.deliveryAddress && (
            <>
              <div className="print-divider" />
              <h2>배달 주소</h2>
              <div style={{ fontSize: '9pt', lineHeight: '1.4' }}>
                {order.deliveryAddress.address}
                {order.deliveryAddress.detail && (
                  <>
                    <br />
                    {order.deliveryAddress.detail}
                  </>
                )}
              </div>
            </>
          )}

          {/* 주문 항목 */}
          <div className="print-divider" />
          <h2>주문 내역</h2>
          <table>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td colSpan={2}>
                    <div>
                      <strong>{item.menuName}</strong> x {item.quantity}
                    </div>
                    {(item.options.noodle || item.options.spicy || item.options.toppings) && (
                      <div style={{ fontSize: '8pt', color: '#666', marginLeft: '2mm' }}>
                        {[
                          item.options.noodle && `면양: ${item.options.noodle}`,
                          item.options.spicy && `맵기: ${item.options.spicy}`,
                          item.options.toppings &&
                            item.options.toppings.length > 0 &&
                            `토핑: ${item.options.toppings.join(', ')}`,
                        ]
                          .filter(Boolean)
                          .join(' / ')}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {item.subtotal.toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 금액 합계 */}
          <div className="print-divider" />
          <table>
            <tbody>
              <tr>
                <td>소계</td>
                <td style={{ textAlign: 'right' }}>{order.subtotal.toLocaleString()}원</td>
              </tr>
              {order.discount > 0 && (
                <tr>
                  <td>할인</td>
                  <td style={{ textAlign: 'right' }}>-{order.discount.toLocaleString()}원</td>
                </tr>
              )}
              {order.deliveryType === 'delivery' && (
                <tr>
                  <td>배달비</td>
                  <td style={{ textAlign: 'right' }}>+{order.deliveryFee.toLocaleString()}원</td>
                </tr>
              )}
              <tr style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                <td>총 결제액</td>
                <td style={{ textAlign: 'right' }}>{order.finalAmount.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>

          {/* 결제 정보 */}
          <div className="print-divider" />
          <table>
            <tbody>
              <tr>
                <td>결제수단</td>
                <td style={{ textAlign: 'right' }}>
                  {order.payment.method === 'card'
                    ? '카드'
                    : order.payment.method === 'easy_pay'
                    ? '간편결제'
                    : order.payment.method === 'transfer'
                    ? '계좌이체'
                    : '만나서결제'}
                </td>
              </tr>
              <tr>
                <td>결제상태</td>
                <td style={{ textAlign: 'right' }}>
                  {order.payment.status === 'approved' ? '승인완료' : '대기중'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* 요청사항 */}
          {order.requests && (
            <>
              <div className="print-divider" />
              <h2>요청사항</h2>
              <div style={{ fontSize: '9pt', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                {order.requests}
              </div>
            </>
          )}

          {/* 하단 정보 */}
          <div className="print-divider" />
          <div style={{ fontSize: '8pt', textAlign: 'center', color: '#666' }}>
            감사합니다
            <br />
            시스템 개발: KS컴퍼니
          </div>
        </div>
      </div>
    );
  }
);

PrintableOrder.displayName = 'PrintableOrder';
