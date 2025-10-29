/**
 * Firebase Functions 호출 래퍼
 * USE_FIREBASE 플래그에 따라 실제 호출 또는 Mock 처리
 */

const USE_FIREBASE = false; // TODO: config/env.ts로 통합

/**
 * 결제 승인
 */
export async function authorizePayment(payload: {
  amount: number;
  orderId: string;
  cardInfo?: any;
  [key: string]: any;
}): Promise<any> {
  if (USE_FIREBASE) {
    // TODO: Firebase Functions 호출
    // const { httpsCallable } = await import('firebase/functions');
    // const { functions } = await import('./firebase');
    // const callable = httpsCallable(functions, 'payAuthorize');
    // const result = await callable(payload);
    // return result.data;
    throw new Error('Firebase not configured');
  } else {
    // Mock 성공 응답
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      tid: `TID${Date.now()}`,
      amount: payload.amount,
      orderId: payload.orderId,
      approvedAt: new Date().toISOString(),
    };
  }
}

/**
 * 결제 취소 (망취소)
 */
export async function cancelPayment(payload: {
  tid: string;
  reason: string;
  amount?: number;
}): Promise<any> {
  if (USE_FIREBASE) {
    // TODO: Firebase Functions 호출
    // const { httpsCallable } = await import('firebase/functions');
    // const { functions } = await import('./firebase');
    // const callable = httpsCallable(functions, 'payCancel');
    // const result = await callable(payload);
    // return result.data;
    throw new Error('Firebase not configured');
  } else {
    // Mock 성공 응답
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      tid: payload.tid,
      canceledAt: new Date().toISOString(),
      reason: payload.reason,
    };
  }
}

/**
 * 영수증 PDF 생성
 */
export async function generateReceipt(orderId: string): Promise<string> {
  if (USE_FIREBASE) {
    // TODO: Firebase Functions 호출
    // const { httpsCallable } = await import('firebase/functions');
    // const { functions } = await import('./firebase');
    // const callable = httpsCallable(functions, 'generateReceipt');
    // const result = await callable({ orderId });
    // return (result.data as any).url;
    throw new Error('Firebase not configured');
  } else {
    // Mock URL 반환
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `https://example.com/receipts/${orderId}.pdf`;
  }
}

/**
 * 현금영수증 발급
 */
export async function requestCashReceipt(
  orderId: string,
  phoneOrBizNo: string
): Promise<{ success: boolean; receiptNo: string }> {
  if (USE_FIREBASE) {
    // TODO: Firebase Functions 호출
    // const { httpsCallable } = await import('firebase/functions');
    // const { functions } = await import('./firebase');
    // const callable = httpsCallable(functions, 'requestCashReceipt');
    // const result = await callable({ orderId, phoneOrBizNo });
    // return result.data as any;
    throw new Error('Firebase not configured');
  } else {
    // Mock 성공 응답
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      receiptNo: `CR${Date.now()}`,
    };
  }
}
