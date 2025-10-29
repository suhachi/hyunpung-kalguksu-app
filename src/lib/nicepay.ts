import { getFunctions, httpsCallable } from 'firebase/functions';
import type { PaymentRequest, PaymentResult } from '../types/payment';

// NICEPAY 설정
const NICEPAY_CONFIG = {
  dev: {
    mid: import.meta.env.VITE_NICEPAY_MID_DEV || 'nicepay00m',
    key: import.meta.env.VITE_NICEPAY_KEY_DEV || 'YOUR_DEV_KEY',
    apiUrl: 'https://sandbox-api.nicepay.co.kr',
  },
  prod: {
    mid: import.meta.env.VITE_NICEPAY_MID_PROD || 'YOUR_PROD_MID',
    key: import.meta.env.VITE_NICEPAY_KEY_PROD || 'YOUR_PROD_KEY',
    apiUrl: 'https://api.nicepay.co.kr',
  },
};

const isDev = import.meta.env.VITE_ENV !== 'production';
const config = isDev ? NICEPAY_CONFIG.dev : NICEPAY_CONFIG.prod;

/**
 * SHA-256 해시 생성
 */
async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * 전문 생성일시 (YYYYMMDDhhmmss)
 */
function getEdiDate(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}${hh}${mi}${ss}`;
}

/**
 * NICEPAY 결제 인증 시작
 */
export async function initiatePayment(request: PaymentRequest): Promise<{ authUrl: string; authToken: string }> {
  const functions = getFunctions();
  const createPaymentFn = httpsCallable<PaymentRequest, { authUrl: string; authToken: string }>(
    functions,
    'createPayment'
  );

  try {
    const result = await createPaymentFn(request);
    return result.data;
  } catch (error) {
    console.error('Failed to initiate payment:', error);
    throw new Error('결제 요청에 실패했습니다. 다시 시도해 주세요.');
  }
}

/**
 * NICEPAY 결제 승인
 * (Firebase Functions에서 호출됨)
 */
export async function approvePayment(orderId: string, authToken: string): Promise<PaymentResult> {
  const functions = getFunctions();
  const approvePaymentFn = httpsCallable<{ orderId: string; authToken: string }, PaymentResult>(
    functions,
    'approvePayment'
  );

  try {
    const result = await approvePaymentFn({ orderId, authToken });
    return result.data;
  } catch (error) {
    console.error('Failed to approve payment:', error);
    throw new Error('결제 승인에 실패했습니다.');
  }
}

/**
 * 결제 취소 (망취소 포함)
 */
export async function cancelPayment(
  orderId: string,
  tid: string,
  cancelReason: string
): Promise<PaymentResult> {
  const functions = getFunctions();
  const cancelPaymentFn = httpsCallable<
    { orderId: string; tid: string; cancelReason: string },
    PaymentResult
  >(functions, 'cancelPayment');

  try {
    const result = await cancelPaymentFn({ orderId, tid, cancelReason });
    return result.data;
  } catch (error) {
    console.error('Failed to cancel payment:', error);
    throw new Error('결제 취소에 실패했습니다.');
  }
}

/**
 * 만나서 결제 (결제 스킵)
 */
export async function createOnSitePaymentOrder(request: PaymentRequest): Promise<{ orderId: string }> {
  const functions = getFunctions();
  const createOnSiteOrderFn = httpsCallable<PaymentRequest, { orderId: string }>(
    functions,
    'createOnSitePaymentOrder'
  );

  try {
    const result = await createOnSiteOrderFn(request);
    return result.data;
  } catch (error) {
    console.error('Failed to create on-site payment order:', error);
    throw new Error('주문 생성에 실패했습니다.');
  }
}

/**
 * NICEPAY 결제창 열기 (PC/모바일 분기)
 */
export function openNicePayWindow(authUrl: string): Window | null {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // 모바일: 현재 창에서 리다이렉트
    window.location.href = authUrl;
    return null;
  } else {
    // PC: 팝업 창
    const width = 500;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const options = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=no`;

    return window.open(authUrl, 'NICEPAY_PAYMENT', options);
  }
}

/**
 * 결제 결과 폴링 (팝업 닫힌 후)
 */
export async function pollPaymentResult(orderId: string, maxAttempts = 30): Promise<PaymentResult> {
  const functions = getFunctions();
  const getPaymentResultFn = httpsCallable<{ orderId: string }, PaymentResult>(
    functions,
    'getPaymentResult'
  );

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const result = await getPaymentResultFn({ orderId });
      
      // 결제 완료 또는 실패 시 반환
      if (result.data.success || result.data.resultCode !== 'PENDING') {
        return result.data;
      }
      
      // 1초 대기 후 재시도
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to poll payment result:', error);
    }
  }

  throw new Error('결제 결과 확인 시간이 초과되었습니다.');
}

export { config as NICEPAY_CONFIG, getEdiDate, generateHash };
