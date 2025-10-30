/**
 * 배달 대행사 Webhook 수신
 * HTTPS onRequest 핸들러
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';
import { verifyWebhookSignature, getWebhookSecret, verifyAllowedIP } from './verify';
import { updateDeliveryTask } from './service';
import type { WebhookEvent } from './types';

const db = admin.firestore();

// Functions 리소스 제한 설정
const WEBHOOK_RUN_OPTIONS = {
  timeoutSeconds: 30,
  memory: '256MB' as const,
  minInstances: 0,
  maxInstances: 5,
  concurrency: 10,
};

/**
 * Webhook 이벤트 중복 처리 방지 (Idempotency)
 */
async function isEventProcessed(eventId: string): Promise<boolean> {
  try {
    const eventDoc = await db.collection('deliveryEvents').doc(eventId).get();
    return eventDoc.exists;
  } catch (error) {
    console.error('[isEventProcessed] Error:', error);
    return false;
  }
}

/**
 * Webhook 이벤트 처리 완료 표시
 */
async function markEventProcessed(eventId: string, event: WebhookEvent): Promise<void> {
  try {
    await db.collection('deliveryEvents').doc(eventId).set({
      taskId: event.taskId,
      type: event.type,
      timestamp: event.timestamp,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      hash: crypto.createHash('sha256')
        .update(JSON.stringify(event))
        .digest('hex'),
    });
  } catch (error) {
    console.error('[markEventProcessed] Error:', error);
  }
}

/**
 * 이벤트 ID 생성 (taskId + type + timestamp)
 */
function generateEventId(event: WebhookEvent): string {
  return `${event.taskId}_${event.type}_${event.timestamp}`;
}

/**
 * 배달 Webhook 수신 엔드포인트
 * 
 * POST /deliveryWebhook
 * Headers:
 *   - x-webhook-signature: HMAC-SHA256 서명
 * Body: WebhookEvent JSON
 */
export const deliveryWebhook = functions
  .region('asia-northeast3')
  .runWith(WEBHOOK_RUN_OPTIONS)
  .https.onRequest(async (req, res) => {
  // CORS 헤더 설정 (서버→서버이지만 필요 시)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, x-webhook-signature');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // POST만 허용
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // IP 화이트리스트 검증 (선택)
    const clientIP = req.ip || req.connection.remoteAddress || '';
    if (!verifyAllowedIP(clientIP)) {
      console.warn(`[deliveryWebhook] IP not allowed: ${clientIP}`);
      res.status(403).json({ error: 'IP not allowed' });
      return;
    }

    // 서명 검증
    const signature = req.headers['x-webhook-signature'] as string;
    if (!signature) {
      res.status(401).json({ error: 'Missing signature' });
      return;
    }

    const secret = getWebhookSecret();
    const payloadString = JSON.stringify(req.body);
    
    if (!verifyWebhookSignature(payloadString, signature, secret)) {
      console.warn('[deliveryWebhook] Invalid signature');
      res.status(401).json({ error: 'Invalid signature' });
      return;
    }

    // 이벤트 파싱
    const event = req.body as WebhookEvent;
    
    if (!event.type || !event.taskId || !event.timestamp) {
      res.status(400).json({ error: 'Invalid event format' });
      return;
    }

    // 중복 처리 방지
    const eventId = generateEventId(event);
    if (await isEventProcessed(eventId)) {
      console.log(`[deliveryWebhook] Event already processed: ${eventId}`);
      res.status(200).json({ message: 'Event already processed' });
      return;
    }

    // 이벤트 타입별 처리
    switch (event.type) {
      case 'task.created':
      case 'task.assigned':
      case 'task.picked_up':
      case 'task.delivering':
      case 'task.completed':
      case 'task.canceled':
        // 상태 업데이트
        await updateDeliveryTask(event.taskId, {
          status: event.data.status,
          eta: event.data.eta,
          driverId: event.data.driverId,
        });
        break;

      case 'driver.location':
        // 위치 업데이트만
        if (event.data.location) {
          await updateDeliveryTask(event.taskId, {
            lastCoord: {
              lat: event.data.location.lat,
              lng: event.data.location.lng,
              at: event.data.location.at || event.timestamp,
            },
          });
        }
        break;

      default:
        console.warn(`[deliveryWebhook] Unknown event type: ${event.type}`);
        res.status(400).json({ error: `Unknown event type: ${event.type}` });
        return;
    }

    // 이벤트 처리 완료 표시
    await markEventProcessed(eventId, event);

    console.log(`[deliveryWebhook] Processed event: ${eventId} (${event.type})`);
    
    res.status(200).json({ message: 'OK', eventId });
  } catch (error: any) {
    console.error('[deliveryWebhook] Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

