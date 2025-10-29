/**
 * NICEPAY 결제 연동
 * DEV/STG/PRD 환경별 엔드포인트 관리
 */

import * as functions from 'firebase-functions';
import fetch from 'node-fetch';

// NICEPAY 환경 설정
const NICEPAY_CONFIG = {
  dev: {
    endpoint: 'https://sandbox-api.nicepay.co.kr',
    mid: functions.config().nice?.mid || 'NICE_DEV_MID',
    key: functions.config().nice?.key || 'NICE_DEV_KEY',
    siteCode: functions.config().nice?.site || 'NICE_DEV_SITE_CODE',
  },
  // TODO: STG, PRD 환경 추가
};

const ENV = 'dev'; // 환경 변수로 관리

/**
 * 결제 승인
 */
export async function authorizePayment(data: {
  amount: number;
  orderId: string;
  cardInfo?: any;
  [key: string]: any;
}): Promise<any> {
  const config = NICEPAY_CONFIG[ENV];

  try {
    // TODO: NICEPAY 실제 API 스펙에 맞춰 구현
    // 현재는 Mock 응답
    console.log('NICEPAY authorize request:', {
      mid: config.mid,
      amount: data.amount,
      orderId: data.orderId,
    });

    // Mock 성공 응답
    return {
      success: true,
      tid: `TID${Date.now()}`,
      amount: data.amount,
      orderId: data.orderId,
      approvedAt: new Date().toISOString(),
    };

    /* 실제 구현 예시:
    const response = await fetch(`${config.endpoint}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key}`,
      },
      body: JSON.stringify({
        mid: config.mid,
        amount: data.amount,
        orderId: data.orderId,
        // ... 기타 필수 파라미터
      }),
    });

    const result = await response.json();
    return result;
    */
  } catch (error) {
    console.error('NICEPAY authorize error:', error);
    throw new Error('결제 승인에 실패했습니다');
  }
}

/**
 * 결제 취소 (망취소)
 */
export async function cancelPayment(data: {
  tid: string;
  reason: string;
  amount?: number;
}): Promise<any> {
  const config = NICEPAY_CONFIG[ENV];

  try {
    console.log('NICEPAY cancel request:', {
      mid: config.mid,
      tid: data.tid,
      reason: data.reason,
    });

    // Mock 성공 응답
    return {
      success: true,
      tid: data.tid,
      canceledAt: new Date().toISOString(),
      reason: data.reason,
    };

    /* 실제 구현 예시:
    const response = await fetch(`${config.endpoint}/api/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key}`,
      },
      body: JSON.stringify({
        mid: config.mid,
        tid: data.tid,
        cancelAmt: data.amount,
        cancelMsg: data.reason,
        // ... 기타 필수 파라미터
      }),
    });

    const result = await response.json();
    return result;
    */
  } catch (error) {
    console.error('NICEPAY cancel error:', error);
    throw new Error('결제 취소에 실패했습니다');
  }
}

/**
 * 현금영수증 발급
 */
export async function issueCashReceipt(data: {
  tid: string;
  phoneOrBizNo: string;
  amount: number;
}): Promise<any> {
  const config = NICEPAY_CONFIG[ENV];

  try {
    console.log('NICEPAY cash receipt request:', {
      mid: config.mid,
      tid: data.tid,
      phoneOrBizNo: data.phoneOrBizNo,
    });

    // Mock 성공 응답
    return {
      success: true,
      tid: data.tid,
      receiptNo: `CR${Date.now()}`,
      issuedAt: new Date().toISOString(),
    };

    /* 실제 구현 예시:
    const response = await fetch(`${config.endpoint}/api/cash-receipt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key}`,
      },
      body: JSON.stringify({
        mid: config.mid,
        tid: data.tid,
        identityNo: data.phoneOrBizNo,
        amt: data.amount,
        // ... 기타 필수 파라미터
      }),
    });

    const result = await response.json();
    return result;
    */
  } catch (error) {
    console.error('NICEPAY cash receipt error:', error);
    throw new Error('현금영수증 발급에 실패했습니다');
  }
}
