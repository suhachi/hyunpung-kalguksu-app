/**
 * Webhook 서명 검증
 * HMAC-SHA256 기반 위변조 방지
 */

import * as crypto from 'crypto';
import * as functions from 'firebase-functions';

/**
 * Webhook 서명 검증
 * 
 * @param payload 요청 본문 (JSON 문자열 또는 객체)
 * @param signature x-webhook-signature 헤더 값
 * @param secret Webhook 비밀 키
 * @returns 검증 성공 여부
 */
export function verifyWebhookSignature(
  payload: string | object,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }

  try {
    // payload를 JSON 문자열로 변환
    const payloadString = typeof payload === 'string'
      ? payload
      : JSON.stringify(payload);

    // HMAC-SHA256 해시 계산
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payloadString);
    const expectedSignature = hmac.digest('hex');

    // 타임링 세이프 비교 (타이밍 공격 방지)
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('[verifyWebhookSignature] Error:', error);
    return false;
  }
}

/**
 * Webhook 비밀 키 조회
 * 환경 변수 또는 Functions Config에서 가져옴
 */
export function getWebhookSecret(): string {
  // Functions Config 우선
  const configSecret = functions.config().delivery?.webhook_secret;
  if (configSecret) {
    return configSecret;
  }

  // 환경 변수 (Secret Manager 또는 .env)
  const envSecret = process.env.DELIVERYA_SECRET || process.env.DELIVERY_WEBHOOK_SECRET;
  if (envSecret) {
    return envSecret;
  }

  // 기본값 (프로덕션에서는 반드시 설정 필요)
  console.warn('[getWebhookSecret] Using default secret. Set DELIVERYA_SECRET in production!');
  return 'change_me_default_secret';
}

/**
 * IP 화이트리스트 검증 (선택)
 */
export function verifyAllowedIP(clientIP: string): boolean {
  const allowedIPs = process.env.WEBHOOK_ALLOWED_IPS;
  
  if (!allowedIPs) {
    // 화이트리스트 미설정 시 모든 IP 허용
    return true;
  }

  const ips = allowedIPs.split(',').map(ip => ip.trim());
  return ips.includes(clientIP);
}

