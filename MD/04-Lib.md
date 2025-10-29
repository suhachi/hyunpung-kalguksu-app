# LIB 파일들

총 27개 파일

## 1. src/functions/src/lib/coupons.ts

```typescript
/**
 * 쿠폰 발급 유틸리티
 * 자동 쿠폰 발급 로직
 */

import * as admin from 'firebase-admin';

export interface IssueCouponParams {
  uid: string;
  amount: number;
  min: number;
  days: number;
  type: string;
  description?: string;
}

/**
 * 사용자에게 쿠폰 발급
 */
export async function issueCoupon(params: IssueCouponParams): Promise<string> {
  const { uid, amount, min, days, type, description } = params;
  
  const expiresAt = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  );

  const couponData = {
    userId: uid,
    type,
    amount,
    minOrderAmount: min,
    status: 'unused',
    issuedAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt,
    description: description || `${type} 쿠폰`,
  };

  const docRef = await admin.firestore().collection('coupons').add(couponData);
  
  console.log(`Coupon issued: ${docRef.id} for user ${uid}`);
  return docRef.id;
}

/**
 * 사진 리뷰 쿠폰 발급
 */
export async function issuePhotoReviewCoupon(uid: string): Promise<string> {
  return issueCoupon({
    uid,
    amount: 3000,
    min: 15000,
    days: 30,
    type: 'photo_review',
    description: '사진 리뷰 감사 쿠폰',
  });
}

/**
 * 첫 주문 쿠폰 발급
 */
export async function issueFirstOrderCoupon(uid: string): Promise<string> {
  return issueCoupon({
    uid,
    amount: 5000,
    min: 20000,
    days: 7,
    type: 'first_order',
    description: '첫 주문 환영 쿠폰',
  });
}

/**
 * 재구매 쿠폰 발급
 */
export async function issueRepeatOrderCoupon(uid: string): Promise<string> {
  return issueCoupon({
    uid,
    amount: 2000,
    min: 10000,
    days: 14,
    type: 'repeat_order',
    description: '단골 고객 감사 쿠폰',
  });
}
```

## 2. src/functions/src/lib/nicepay.ts

```typescript
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
```

## 3. src/functions/src/lib/pdf.ts

```typescript
/**
 * PDF 생성 유틸리티
 * 영수증 PDF 생성
 */

import PDFDocument from 'pdfkit';
import { Storage } from '@google-cloud/storage';
import * as admin from 'firebase-admin';

const storage = new Storage();

export interface ReceiptData {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  storeName: string;
  storePhone: string;
  storeAddress: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  itemsTotal: number;
  deliveryFee: number;
  discount: number;
  finalAmount: number;
  paymentMethod: string;
  developerInfo: {
    company: string;
    bizNo: string;
    ceo: string;
  };
}

/**
 * 영수증 PDF 생성
 */
export async function generateReceiptPDF(data: ReceiptData): Promise<string> {
  const projectId = process.env.GCLOUD_PROJECT || 'demo-project';
  const bucketName = process.env.FUNCTIONS_EMULATOR
    ? 'demo.appspot.com'
    : `${projectId}.appspot.com`;

  const bucket = storage.bucket(bucketName);
  const filename = `receipts/${data.orderId}.pdf`;
  const file = bucket.file(filename);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      const stream = file.createWriteStream({
        contentType: 'application/pdf',
        metadata: {
          contentType: 'application/pdf',
        },
      });

      doc.pipe(stream);

      // 헤더
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('현풍닭칼국수 영수증', { align: 'center' });

      doc.moveDown();

      // 매장 정보
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(data.storeName, { align: 'center' })
        .text(data.storeAddress, { align: 'center' })
        .text(`전화: ${data.storePhone}`, { align: 'center' });

      doc.moveDown();

      // 주문 정보
      doc
        .fontSize(12)
        .text(`주문번호: ${data.orderNumber}`)
        .text(`주문일시: ${data.orderDate}`)
        .text(`고객명: ${data.customerName}`)
        .text(`연락처: ${data.customerPhone}`);

      doc.moveDown();

      // 구분선
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

      // 주문 항목
      doc.fontSize(11).font('Helvetica-Bold').text('주문 내역');
      doc.moveDown(0.5);

      data.items.forEach((item) => {
        doc
          .fontSize(10)
          .font('Helvetica')
          .text(
            `${item.name} x ${item.quantity}개`,
            50,
            doc.y,
            { width: 350, continued: true }
          )
          .text(`${item.subtotal.toLocaleString()}원`, { align: 'right' });
      });

      doc.moveDown();

      // 구분선
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

      // 금액 합계
      const addAmountLine = (label: string, amount: number, bold = false) => {
        doc
          .fontSize(10)
          .font(bold ? 'Helvetica-Bold' : 'Helvetica')
          .text(label, 50, doc.y, { width: 350, continued: true })
          .text(`${amount.toLocaleString()}원`, { align: 'right' });
      };

      addAmountLine('주문 금액', data.itemsTotal);
      addAmountLine('배달비', data.deliveryFee);
      if (data.discount > 0) {
        addAmountLine('할인', -data.discount);
      }

      doc.moveDown();

      // 총 결제금액
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('총 결제금액', 50, doc.y, { width: 350, continued: true })
        .text(`${data.finalAmount.toLocaleString()}원`, { align: 'right' });

      doc.moveDown();

      // 결제수단
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(`결제수단: ${data.paymentMethod}`);

      doc.moveDown(2);

      // 구분선
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

      // 개발사 정보 (하단)
      doc
        .fontSize(8)
        .font('Helvetica')
        .text('시스템 개발', { align: 'center' })
        .text(
          `${data.developerInfo.company} | 사업자번호: ${data.developerInfo.bizNo}`,
          { align: 'center' }
        )
        .text(`대표: ${data.developerInfo.ceo}`, { align: 'center' });

      doc.end();

      stream.on('finish', async () => {
        try {
          // 서명된 URL 생성 (10분 유효)
          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 10 * 60 * 1000,
          });
          resolve(url);
        } catch (error) {
          reject(error);
        }
      });

      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
}
```

## 4. src/functions/src/lib/push.ts

```typescript
/**
 * 푸시 알림 유틸리티
 * FCM 토큰을 통한 푸시 전송
 * Phase 3-6: 푸시 알림 시스템
 */

import * as admin from 'firebase-admin';

// 알림 타입별 템플릿
interface NotificationTemplate {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
}

const NOTIFICATION_TEMPLATES: Record<string, NotificationTemplate> = {
  order_received: {
    title: '✅ 주문 접수',
    body: '주문이 접수되었습니다. 따끈하게 준비할게요!',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  order_cooking: {
    title: '👨‍🍳 조리 시작',
    body: '주문하신 메뉴를 조리 중입니다.',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  order_delivering: {
    title: '🚚 배달 출발',
    body: '주문하신 메뉴가 배달을 시작했습니다.',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  order_completed: {
    title: '✅ 주문 완료',
    body: '주문이 완료되었습니다. 맛있게 드세요!',
    icon: '/icons/icon-192x192.png',
    tag: 'order',
  },
  coupon_issued: {
    title: '🎁 쿠폰 발급',
    body: '새로운 쿠폰이 발급되었습니다!',
    icon: '/icons/icon-192x192.png',
    tag: 'coupon',
  },
  review_reminder: {
    title: '✍️ 리뷰 작성',
    body: '오늘 식사는 어떠셨어요? 사진 리뷰 쿠폰이 기다려요.',
    icon: '/icons/icon-192x192.png',
    tag: 'review',
  },
};

/**
 * 특정 사용자에게 푸시 알림 전송
 */
export async function sendPushToUser(
  uid: string,
  payload: admin.messaging.MessagingPayload
): Promise<void> {
  try {
    const tokenSnap = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('meta')
      .doc('fcm')
      .get();

    const token = tokenSnap.get('token');
    if (!token) {
      console.log(`No FCM token for user ${uid}`);
      return;
    }

    // 알림 설정 확인
    const settingsSnap = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('notifications')
      .get();

    if (settingsSnap.exists) {
      const settings = settingsSnap.data();
      if (!settings?.enabled) {
        console.log(`Notifications disabled for user ${uid}`);
        return;
      }
    }

    await admin.messaging().sendToDevice(token, payload);
    console.log(`Push sent to user ${uid}`);
    
    // Firestore에 알림 기록 저장
    await admin
      .firestore()
      .collection('notifications')
      .add({
        userId: uid,
        title: payload.notification?.title || '',
        body: payload.notification?.body || '',
        data: payload.data || {},
        type: payload.data?.type || 'system',
        priority: 'normal',
        read: false,
        clicked: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error(`Failed to send push to user ${uid}:`, error);
  }
}

/**
 * 여러 사용자에게 푸시 알림 전송
 */
export async function sendPushToUsers(
  uids: string[],
  payload: admin.messaging.MessagingPayload
): Promise<void> {
  await Promise.all(uids.map((uid) => sendPushToUser(uid, payload)));
}

/**
 * 관리자들에게 푸시 알림 전송
 */
export async function sendPushToAdmins(
  payload: admin.messaging.MessagingPayload
): Promise<void> {
  const db = admin.firestore();
  const adminSnap = await db
    .collection('users')
    .where('role', 'in', ['owner', 'admin'])
    .get();

  const adminUids = adminSnap.docs.map((doc) => doc.id);
  await sendPushToUsers(adminUids, payload);
}

/**
 * 주문 상태 변경 알림 전송
 */
export async function sendOrderStatusNotification(
  uid: string,
  orderId: string,
  status: string
): Promise<void> {
  const template = NOTIFICATION_TEMPLATES[`order_${status}`];
  if (!template) {
    console.warn(`No template for order status: ${status}`);
    return;
  }

  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: template.title,
      body: template.body,
      icon: template.icon,
      tag: template.tag,
      clickAction: `/app/order-tracking?orderId=${orderId}`,
    },
    data: {
      type: `order_${status}`,
      orderId,
      status,
    },
  };

  await sendPushToUser(uid, payload);
}

/**
 * 쿠폰 발급 알림 전송
 */
export async function sendCouponIssuedNotification(
  uid: string,
  couponType: string,
  amount: number
): Promise<void> {
  const template = NOTIFICATION_TEMPLATES.coupon_issued;

  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: template.title,
      body: `${amount.toLocaleString()}원 할인 쿠폰이 발급되었습니다!`,
      icon: template.icon,
      tag: template.tag,
      clickAction: '/app/coupons',
    },
    data: {
      type: 'coupon_issued',
      couponType,
      amount: amount.toString(),
    },
  };

  await sendPushToUser(uid, payload);
}

/**
 * 리뷰 작성 요청 알림 전송
 */
export async function sendReviewReminderNotification(
  uid: string,
  orderId: string
): Promise<void> {
  const template = NOTIFICATION_TEMPLATES.review_reminder;

  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: template.title,
      body: template.body,
      icon: template.icon,
      tag: template.tag,
      clickAction: `/app/review/write?orderId=${orderId}`,
    },
    data: {
      type: 'review_reminder',
      orderId,
    },
  };

  await sendPushToUser(uid, payload);
}

/**
 * 포인트 적립 알림 전송
 */
export async function sendPointsEarnedNotification(
  uid: string,
  amount: number,
  orderId: string
): Promise<void> {
  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: '💰 포인트 적립',
      body: `${amount.toLocaleString()} 포인트가 적립되었습니다.`,
      icon: '/icons/icon-192x192.png',
      tag: 'points',
      clickAction: '/app/points',
    },
    data: {
      type: 'points_earned',
      amount: amount.toString(),
      orderId,
    },
  };

  await sendPushToUser(uid, payload);
}
```

## 5. src/functions/src/lib/report.ts

```typescript
/**
 * 리포트 및 메시지 유틸리티
 */

/**
 * 주문 상태 변경 메시지
 */
export function getStatusChangeMessage(status: string): string {
  const messages: Record<string, string> = {
    pending: '주문이 접수 대기 상태입니다.',
    accepted: '주문이 접수되었습니다.',
    preparing: '주문을 조리 중입니다.',
    ready: '배달 준비가 완료되었습니다.',
    delivering: '배달 중입니다.',
    done: '주문이 완료되었습니다. 맛있게 드세요!',
    canceled: '주문이 취소되었습니다.',
  };

  return messages[status] || '주문 상태가 변경되었습니다.';
}

/**
 * 주문 상태 변경 제목
 */
export function getStatusChangeTitle(status: string): string {
  const titles: Record<string, string> = {
    pending: '주문 접수 대기',
    accepted: '주문 접수 완료',
    preparing: '조리 중',
    ready: '배달 준비 완료',
    delivering: '배달 출발',
    done: '주문 완료',
    canceled: '주문 취소',
  };

  return titles[status] || '주문 상태 변경';
}

/**
 * 주간 리포트 생성
 */
export async function generateWeeklyReport(): Promise<any> {
  // TODO: 실제 주문/리뷰 데이터 집계
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    period: {
      start: weekAgo.toISOString(),
      end: now.toISOString(),
    },
    summary: {
      totalOrders: 0,
      totalRevenue: 0,
      totalReviews: 0,
      avgRating: 0,
    },
    topMenus: [],
    // 추후 실제 데이터로 채움
  };
}
```

## 6. src/lib/admin/analytics.api.ts

```typescript
/**
 * 관제/메트릭 API
 * Phase 2-9: KPI 및 차트 데이터
 */

const USE_FIREBASE = false;

// KPI 데이터
export interface KPIData {
  todaySales: number;
  todayOrders: number;
  avgRating: number;
  installRate: number; // A2HS 설치율 (%)
  conversionRate: number; // 주문 전환율 (%)
}

// 시간대별 주문
export interface HourlyOrders {
  hour: number;
  orders: number;
}

// 메뉴별 매출
export interface MenuSales {
  menuName: string;
  sales: number;
  orders: number;
}

// 일별 매출
export interface DailySales {
  date: string;
  sales: number;
  orders: number;
}

/**
 * KPI 데이터 조회
 */
export async function getKPIData(): Promise<KPIData> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    todaySales: 1250000,
    todayOrders: 42,
    avgRating: 4.7,
    installRate: 23.5,
    conversionRate: 8.2,
  };
}

/**
 * 시간대별 주문 (오늘)
 */
export async function getHourlyOrders(): Promise<HourlyOrders[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore query
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { hour: 10, orders: 2 },
    { hour: 11, orders: 5 },
    { hour: 12, orders: 12 },
    { hour: 13, orders: 8 },
    { hour: 14, orders: 3 },
    { hour: 17, orders: 4 },
    { hour: 18, orders: 10 },
    { hour: 19, orders: 15 },
    { hour: 20, orders: 8 },
    { hour: 21, orders: 5 },
  ];
}

/**
 * 메뉴별 매출 Top 5
 */
export async function getTopMenuSales(): Promise<MenuSales[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { menuName: '현풍닭칼국수', sales: 450000, orders: 50 },
    { menuName: '얼큰닭칼국수', sales: 380000, orders: 40 },
    { menuName: '냉닭칼국수', sales: 285000, orders: 30 },
    { menuName: '수육 (대)', sales: 200000, orders: 10 },
    { menuName: '닭칼국수 세트', sales: 180000, orders: 10 },
  ];
}

/**
 * 일별 매출 추이 (최근 7일)
 */
export async function getDailySales(): Promise<DailySales[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  const today = new Date();
  const data: DailySales[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

    data.push({
      date: dateStr,
      sales: Math.floor(Math.random() * 500000) + 800000,
      orders: Math.floor(Math.random() * 20) + 30,
    });
  }

  return data;
}
```

## 7. src/lib/admin/integrated-analytics.api.ts

```typescript
/**
 * 통합 분석 API
 * Phase 3-7: 통합 리포트
 */

import { USE_FIREBASE } from '../../config/env';
import type {
  IntegratedKPI,
  IntegratedReport,
  HourlyAnalysis,
  DayOfWeekAnalysis,
  MenuPerformance,
  CustomerBehavior,
  CouponEffectiveness,
  PointsEffectiveness,
  ReviewAnalysis,
  DeliveryPerformance,
  NotificationEffectiveness,
  DateRange,
  ReportPeriod,
} from '../../types/analytics';

/**
 * 통합 KPI 데이터 조회
 */
export async function getIntegratedKPI(dateRange: DateRange): Promise<IntegratedKPI> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting integrated KPI for range:', dateRange);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      // 매출 지표
      totalSales: 8750000,
      averageOrderValue: 29800,
      totalOrders: 294,
      
      // 고객 지표
      newCustomers: 45,
      returningCustomers: 78,
      customerRetentionRate: 63.4,
      
      // 평점 지표
      averageRating: 4.7,
      totalReviews: 142,
      photoReviewRate: 68.3,
      
      // 포인트 지표
      totalPointsEarned: 262500,
      totalPointsSpent: 124000,
      pointsRedemptionRate: 47.2,
      
      // 쿠폰 지표
      totalCouponsIssued: 380,
      totalCouponsUsed: 228,
      couponUsageRate: 60.0,
      totalDiscount: 684000,
      
      // 전환율 지표
      installRate: 23.5,
      cartConversionRate: 68.9,
      paymentSuccessRate: 96.8,
    };
  }

  // TODO: Firestore aggregation
  throw new Error('Firebase not implemented');
}

/**
 * 시간대별 분석
 */
export async function getHourlyAnalysis(dateRange: DateRange): Promise<HourlyAnalysis[]> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting hourly analysis');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { hour: 10, orders: 8, sales: 238400, averageOrderValue: 29800 },
      { hour: 11, orders: 15, sales: 447000, averageOrderValue: 29800 },
      { hour: 12, orders: 35, sales: 1043000, averageOrderValue: 29800 },
      { hour: 13, orders: 28, sales: 834400, averageOrderValue: 29800 },
      { hour: 14, orders: 12, sales: 357600, averageOrderValue: 29800 },
      { hour: 17, orders: 18, sales: 536400, averageOrderValue: 29800 },
      { hour: 18, orders: 32, sales: 953600, averageOrderValue: 29800 },
      { hour: 19, orders: 42, sales: 1251600, averageOrderValue: 29800 },
      { hour: 20, orders: 26, sales: 774800, averageOrderValue: 29800 },
      { hour: 21, orders: 18, sales: 536400, averageOrderValue: 29800 },
    ];
  }

  throw new Error('Firebase not implemented');
}

/**
 * 요일별 분석
 */
export async function getDayOfWeekAnalysis(dateRange: DateRange): Promise<DayOfWeekAnalysis[]> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting day of week analysis');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { dayOfWeek: 0, dayName: '일요일', orders: 52, sales: 1549600, averageOrderValue: 29800 },
      { dayOfWeek: 1, dayName: '월요일', orders: 38, sales: 1132400, averageOrderValue: 29800 },
      { dayOfWeek: 2, dayName: '화요일', orders: 35, sales: 1043000, averageOrderValue: 29800 },
      { dayOfWeek: 3, dayName: '수요일', orders: 40, sales: 1192000, averageOrderValue: 29800 },
      { dayOfWeek: 4, dayName: '목요일', orders: 42, sales: 1251600, averageOrderValue: 29800 },
      { dayOfWeek: 5, dayName: '금요일', orders: 48, sales: 1430400, averageOrderValue: 29800 },
      { dayOfWeek: 6, dayName: '토요일', orders: 56, sales: 1668800, averageOrderValue: 29800 },
    ];
  }

  throw new Error('Firebase not implemented');
}

/**
 * 메뉴별 성과
 */
export async function getMenuPerformance(dateRange: DateRange): Promise<MenuPerformance[]> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting menu performance');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        menuId: 'm1',
        menuName: '현풍닭칼국수',
        category: '칼국수',
        totalOrders: 120,
        totalSales: 1080000,
        averageRating: 4.8,
        reviewCount: 65,
      },
      {
        menuId: 'm2',
        menuName: '얼큰닭칼국수',
        category: '칼국수',
        totalOrders: 85,
        totalSales: 850000,
        averageRating: 4.7,
        reviewCount: 42,
      },
      {
        menuId: 'm3',
        menuName: '냉닭칼국수',
        category: '칼국수',
        totalOrders: 72,
        totalSales: 792000,
        averageRating: 4.6,
        reviewCount: 38,
      },
      {
        menuId: 'm4',
        menuName: '수육 (대)',
        category: '사이드',
        totalOrders: 45,
        totalSales: 900000,
        averageRating: 4.9,
        reviewCount: 28,
      },
      {
        menuId: 'm5',
        menuName: '닭칼국수 세트',
        category: '세트',
        totalOrders: 38,
        totalSales: 532000,
        averageRating: 4.8,
        reviewCount: 22,
      },
    ];
  }

  throw new Error('Firebase not implemented');
}

/**
 * 고객 행동 분석
 */
export async function getCustomerBehavior(dateRange: DateRange): Promise<CustomerBehavior[]> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting customer behavior');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        userId: 'user-1',
        userName: '김**',
        totalOrders: 18,
        totalSpent: 536400,
        averageOrderValue: 29800,
        lastOrderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        favoriteMenu: '현풍닭칼국수',
        loyaltyTier: 'gold',
      },
      {
        userId: 'user-2',
        userName: '이**',
        totalOrders: 15,
        totalSpent: 447000,
        averageOrderValue: 29800,
        lastOrderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        favoriteMenu: '얼큰닭칼국수',
        loyaltyTier: 'silver',
      },
      {
        userId: 'user-3',
        userName: '박**',
        totalOrders: 12,
        totalSpent: 357600,
        averageOrderValue: 29800,
        lastOrderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        favoriteMenu: '수육 (대)',
        loyaltyTier: 'silver',
      },
    ];
  }

  throw new Error('Firebase not implemented');
}

/**
 * 쿠폰 효과 분석
 */
export async function getCouponEffectiveness(dateRange: DateRange): Promise<CouponEffectiveness[]> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting coupon effectiveness');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        couponType: '사진 리뷰 쿠폰',
        totalIssued: 142,
        totalUsed: 97,
        usageRate: 68.3,
        totalDiscount: 291000,
        averageOrderIncrease: 4200,
        roi: 3.8,
      },
      {
        couponType: '신규 가입 쿠폰',
        totalIssued: 128,
        totalUsed: 76,
        usageRate: 59.4,
        totalDiscount: 380000,
        averageOrderIncrease: 6500,
        roi: 2.9,
      },
      {
        couponType: '이벤트 쿠폰',
        totalIssued: 85,
        totalUsed: 42,
        usageRate: 49.4,
        totalDiscount: 126000,
        averageOrderIncrease: 5800,
        roi: 2.1,
      },
    ];
  }

  throw new Error('Firebase not implemented');
}

/**
 * 포인트 효과 분석
 */
export async function getPointsEffectiveness(dateRange: DateRange): Promise<PointsEffectiveness> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting points effectiveness');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      totalEarned: 262500,
      totalSpent: 124000,
      totalExpired: 12300,
      activeUsers: 123,
      averageBalance: 1876,
      redemptionRate: 47.2,
      orderIncreaseWithPoints: 8500,
    };
  }

  throw new Error('Firebase not implemented');
}

/**
 * 리뷰 분석
 */
export async function getReviewAnalysis(dateRange: DateRange): Promise<ReviewAnalysis> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting review analysis');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      totalReviews: 142,
      averageRating: 4.7,
      photoReviewCount: 97,
      photoReviewRate: 68.3,
      sentimentScore: 4.5,
      topKeywords: [
        { keyword: '국물', count: 89 },
        { keyword: '수육', count: 76 },
        { keyword: '깔끔', count: 65 },
        { keyword: '맛있다', count: 142 },
        { keyword: '푸짐', count: 54 },
      ],
      responseRate: 92.3,
      responseTime: 125, // 분
    };
  }

  throw new Error('Firebase not implemented');
}

/**
 * 배달 성과
 */
export async function getDeliveryPerformance(dateRange: DateRange): Promise<DeliveryPerformance> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting delivery performance');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      totalDeliveries: 234,
      averageDeliveryTime: 28.5, // 분
      onTimeRate: 94.2,
      delayedOrders: 14,
      averageDistance: 2.8, // km
    };
  }

  throw new Error('Firebase not implemented');
}

/**
 * 알림 효과
 */
export async function getNotificationEffectiveness(dateRange: DateRange): Promise<NotificationEffectiveness> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting notification effectiveness');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      totalSent: 1847,
      totalRead: 1425,
      totalClicked: 892,
      readRate: 77.2,
      clickRate: 62.6,
      conversionRate: 12.8,
      byType: {
        order_received: { sent: 294, read: 289, clicked: 245 },
        order_cooking: { sent: 294, read: 276, clicked: 198 },
        order_delivering: { sent: 234, read: 228, clicked: 212 },
        order_completed: { sent: 294, read: 245, clicked: 134 },
        coupon_issued: { sent: 380, read: 298, clicked: 87 },
        review_reminder: { sent: 251, read: 89, clicked: 16 },
      },
    };
  }

  throw new Error('Firebase not implemented');
}

/**
 * 통합 리포트 생성
 */
export async function generateIntegratedReport(
  period: ReportPeriod,
  dateRange: DateRange
): Promise<IntegratedReport> {
  console.log('[Mock] Generating integrated report:', period, dateRange);
  
  const [
    kpi,
    hourlyAnalysis,
    dayOfWeekAnalysis,
    topMenus,
    topCustomers,
    couponEffectiveness,
    pointsEffectiveness,
    reviewAnalysis,
    deliveryPerformance,
    notificationEffectiveness,
  ] = await Promise.all([
    getIntegratedKPI(dateRange),
    getHourlyAnalysis(dateRange),
    getDayOfWeekAnalysis(dateRange),
    getMenuPerformance(dateRange),
    getCustomerBehavior(dateRange),
    getCouponEffectiveness(dateRange),
    getPointsEffectiveness(dateRange),
    getReviewAnalysis(dateRange),
    getDeliveryPerformance(dateRange),
    getNotificationEffectiveness(dateRange),
  ]);

  return {
    period,
    dateRange,
    generatedAt: new Date(),
    
    kpi,
    hourlyAnalysis,
    dayOfWeekAnalysis,
    topMenus,
    topCustomers,
    
    couponEffectiveness,
    pointsEffectiveness,
    reviewAnalysis,
    deliveryPerformance,
    notificationEffectiveness,
    
    insights: [
      '🔥 금요일과 토요일 주문량이 평일 대비 30% 높습니다.',
      '⏰ 점심 시간대(12-13시)와 저녁 시간대(18-20시) 집중도가 높습니다.',
      '📸 사진 리뷰 쿠폰의 ROI가 3.8배로 가장 높습니다.',
      '💰 포인트 사용 시 평균 주문 금액이 8,500원 증가합니다.',
      '⭐ 평점 4.7점 유지 중이며, 92.3%의 리뷰에 답글을 달았습니다.',
    ],
    recommendations: [
      '주말 특별 프로모션을 고려해보세요.',
      '점심/저녁 피크 타임 인력 배치를 최적화하세요.',
      '사진 리뷰 쿠폰 예산을 증액하세요.',
      '포인트 사용 유도 캠페인을 진행하세요.',
      '고평점 리뷰를 SNS에 공유하세요.',
    ],
  };
}

/**
 * 리포트 내보내기 (CSV)
 */
export function exportReportToCSV(report: IntegratedReport): string {
  const lines: string[] = [];
  
  // 헤더
  lines.push('현풍닭칼국수 통합 리포트');
  lines.push(`기간: ${report.dateRange.start.toLocaleDateString()} ~ ${report.dateRange.end.toLocaleDateString()}`);
  lines.push(`생성일: ${report.generatedAt.toLocaleString()}`);
  lines.push('');
  
  // KPI
  lines.push('## 핵심 지표 (KPI)');
  lines.push('지표,값');
  lines.push(`총 매출,${report.kpi.totalSales.toLocaleString()}원`);
  lines.push(`평균 주문 금액,${report.kpi.averageOrderValue.toLocaleString()}원`);
  lines.push(`총 주문 수,${report.kpi.totalOrders}건`);
  lines.push(`신규 고객,${report.kpi.newCustomers}명`);
  lines.push(`재방문 고객,${report.kpi.returningCustomers}명`);
  lines.push(`고객 유지율,${report.kpi.customerRetentionRate}%`);
  lines.push(`평균 평점,${report.kpi.averageRating}점`);
  lines.push(`총 리뷰 수,${report.kpi.totalReviews}개`);
  lines.push('');
  
  // 메뉴 성과
  lines.push('## 메뉴별 성과');
  lines.push('메뉴명,주문수,매출,평점,리뷰수');
  report.topMenus.forEach(menu => {
    lines.push(`${menu.menuName},${menu.totalOrders},${menu.totalSales},${menu.averageRating},${menu.reviewCount}`);
  });
  lines.push('');
  
  // 쿠폰 효과
  lines.push('## 쿠폰 효과');
  lines.push('쿠폰 타입,발급수,사용수,사용률,할인액,ROI');
  report.couponEffectiveness.forEach(coupon => {
    lines.push(`${coupon.couponType},${coupon.totalIssued},${coupon.totalUsed},${coupon.usageRate}%,${coupon.totalDiscount},${coupon.roi}`);
  });
  lines.push('');
  
  return lines.join('\n');
}
```

## 8. src/lib/admin/menus.api.ts

```typescript
/**
 * 관리자 메뉴 관리 API
 * USE_FIREBASE=false: Mock 데이터 반환
 * USE_FIREBASE=true: Firestore 연동
 */

import { Menu, MenuFilters, MenuLog, MenuStatus } from '../../types/menu';
import menusData from '../../data/menus.json';

const USE_FIREBASE = false;

// Mock 데이터 (menus.json 기반)
let mockMenus: Menu[] = Array.isArray(menusData) ? menusData : [];

// Mock 로그
let mockMenuLogs: MenuLog[] = [];

/**
 * 메뉴 현재 상태 계산 (시간제 고려)
 */
export function getMenuStatus(menu: Menu): MenuStatus {
  if (!menu.isAvailable) {
    return 'soldout';
  }

  if (menu.availableHours) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = menu.availableHours.start.split(':').map(Number);
    const [endHour, endMinute] = menu.availableHours.end.split(':').map(Number);
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (currentTime < startTime || currentTime >= endTime) {
      return 'time-limited';
    }
  }

  return 'available';
}

/**
 * 메뉴 목록 조회 (필터/정렬)
 */
export async function getMenus(filters: MenuFilters = {}): Promise<Menu[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  // Mock 동작
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockMenus];

  // 카테고리 필터
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(m => m.category === filters.category);
  }

  // 검색 (이름/태그)
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(search) ||
      m.description.toLowerCase().includes(search) ||
      m.badges.some(b => b.toLowerCase().includes(search))
    );
  }

  // 판매 가능만
  if (filters.availableOnly) {
    filtered = filtered.filter(m => getMenuStatus(m) === 'available');
  }

  // 정렬
  switch (filters.sortBy) {
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'order':
    default:
      filtered.sort((a, b) => a.order - b.order);
      break;
  }

  return filtered;
}

/**
 * 메뉴 단건 조회
 */
export async function getMenuById(menuId: string): Promise<Menu | null> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));
  return mockMenus.find(m => m.menuId === menuId) || null;
}

/**
 * 메뉴 품절/판매 토글
 */
export async function toggleMenuAvailability(
  menuId: string,
  by: string,
  byName: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  const oldValue = menu.isAvailable;
  const newValue = !oldValue;

  menu.isAvailable = newValue;

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'isAvailable',
    oldValue,
    newValue,
    by,
    byName,
    at: new Date(),
    reason: newValue ? '판매 재개' : '품절 처리',
  });

  return menu;
}

/**
 * 메뉴 시간제 설정
 */
export async function updateMenuAvailableHours(
  menuId: string,
  availableHours: { start: string; end: string } | null,
  by: string,
  byName: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  const oldValue = menu.availableHours;
  menu.availableHours = availableHours || undefined;

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'availableHours',
    oldValue,
    newValue: availableHours,
    by,
    byName,
    at: new Date(),
    reason: availableHours ? '시간제 판매 설정' : '시간제 판매 해제',
  });

  return menu;
}

/**
 * 메뉴 수정 (가격/설명)
 */
export async function updateMenu(
  menuId: string,
  updates: Partial<Pick<Menu, 'price' | 'description'>>,
  by: string,
  byName: string,
  reason?: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  // 변경 사항 적용 및 로그 기록
  Object.entries(updates).forEach(([field, newValue]) => {
    const oldValue = menu[field as keyof Menu];
    if (oldValue !== newValue) {
      (menu as any)[field] = newValue;

      mockMenuLogs.push({
        id: `log-${Date.now()}-${field}`,
        menuId,
        field,
        oldValue,
        newValue,
        by,
        byName,
        at: new Date(),
        reason,
      });
    }
  });

  return menu;
}

/**
 * 메뉴 로그 조회
 */
export async function getMenuLogs(menuId: string): Promise<MenuLog[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));
  return mockMenuLogs
    .filter(log => log.menuId === menuId)
    .sort((a, b) => b.at.getTime() - a.at.getTime());
}

/**
 * 메뉴 통계
 */
export interface MenuStats {
  total: number;
  available: number;
  soldout: number;
  timeLimited: number;
  byCategory: Record<string, number>;
}

export async function getMenuStats(): Promise<MenuStats> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));

  const stats: MenuStats = {
    total: mockMenus.length,
    available: 0,
    soldout: 0,
    timeLimited: 0,
    byCategory: {},
  };

  mockMenus.forEach(menu => {
    const status = getMenuStatus(menu);
    if (status === 'available') stats.available++;
    else if (status === 'soldout') stats.soldout++;
    else if (status === 'time-limited') stats.timeLimited++;

    stats.byCategory[menu.category] = (stats.byCategory[menu.category] || 0) + 1;
  });

  return stats;
}

/**
 * 메뉴 생성
 */
export async function createMenu(
  menuData: Partial<Menu>,
  by: string,
  byName: string
): Promise<Menu> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  // 중복 확인 (같은 이름 + 카테고리)
  const duplicate = mockMenus.find(
    m => m.name === menuData.name && m.category === menuData.category
  );

  if (duplicate) {
    throw new Error('동일한 이름과 카테고리의 메뉴가 이미 존재합니다');
  }

  // ID 생성
  const maxId = mockMenus.reduce((max, m) => {
    const num = parseInt(m.menuId.replace('menu-', ''));
    return Math.max(max, isNaN(num) ? 0 : num);
  }, 0);
  const menuId = `menu-${String(maxId + 1).padStart(3, '0')}`;

  // 새 메뉴 생성
  const newMenu: Menu = {
    menuId,
    category: menuData.category || 'main',
    name: menuData.name || '',
    price: menuData.price || 0,
    description: menuData.description || '',
    image: menuData.image || '',
    badges: menuData.badges || [],
    options: menuData.options,
    allergens: menuData.allergens || [],
    origin: menuData.origin || '-',
    isAvailable: menuData.isAvailable !== false,
    order: menuData.order || mockMenus.length + 1,
  };

  // 목록 최상단에 추가
  mockMenus.unshift(newMenu);

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'created',
    oldValue: null,
    newValue: newMenu,
    by,
    byName,
    at: new Date(),
    reason: '신규 메뉴 등록',
  });

  return newMenu;
}

/**
 * 메뉴 삭제 (Undo용)
 */
export async function deleteMenu(
  menuId: string,
  by: string,
  byName: string
): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  const menu = mockMenus.find(m => m.menuId === menuId);
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }

  mockMenus = mockMenus.filter(m => m.menuId !== menuId);

  // 로그 기록
  mockMenuLogs.push({
    id: `log-${Date.now()}`,
    menuId,
    field: 'deleted',
    oldValue: menu,
    newValue: null,
    by,
    byName,
    at: new Date(),
    reason: '메뉴 삭제',
  });
}
```

## 9. src/lib/admin/optionGroups.api.ts

```typescript
/**
 * 옵션 그룹 관리 API
 * 관리자가 옵션 그룹을 생성/수정/삭제하는 기능
 */

import { OptionGroup, OptionItem } from '../../types/menu';

const USE_FIREBASE = false;

// Mock 옵션 그룹 데이터
let mockOptionGroups: OptionGroup[] = [
  {
    id: 'og-001',
    name: '면양',
    required: true,
    multiSelect: false,
    order: 1,
    items: [
      { id: 'oi-001', name: '보통', quantity: 1, price: 0 },
      { id: 'oi-002', name: '곱빼기', quantity: 1, price: 2000 },
      { id: 'oi-003', name: '2배', quantity: 2, price: 3000 },
    ],
  },
  {
    id: 'og-002',
    name: '맵기',
    required: true,
    multiSelect: false,
    order: 2,
    items: [
      { id: 'oi-004', name: '순한맛', quantity: 1, price: 0 },
      { id: 'oi-005', name: '보통', quantity: 1, price: 0 },
      { id: 'oi-006', name: '얼큰', quantity: 1, price: 0 },
    ],
  },
  {
    id: 'og-003',
    name: '토핑',
    required: false,
    multiSelect: true,
    maxSelect: 3,
    order: 3,
    items: [
      { id: 'oi-007', name: '수육', quantity: 1, price: 5000 },
      { id: 'oi-008', name: '김치', quantity: 1, price: 2000 },
      { id: 'oi-009', name: '만두', quantity: 4, price: 3000 },
    ],
  },
];

/**
 * 모든 옵션 그룹 조회
 */
export async function getOptionGroups(): Promise<OptionGroup[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  // Mock 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mockOptionGroups].sort((a, b) => a.order - b.order);
}

/**
 * 옵션 그룹 ID로 조회
 */
export async function getOptionGroupById(id: string): Promise<OptionGroup | null> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockOptionGroups.find((g) => g.id === id) || null;
}

/**
 * 옵션 그룹 생성
 */
export async function createOptionGroup(
  data: Omit<OptionGroup, 'id'>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  // ID 생성
  const id = `og-${Date.now()}`;

  const newGroup: OptionGroup = {
    id,
    ...data,
  };

  mockOptionGroups.push(newGroup);

  await new Promise((resolve) => setTimeout(resolve, 300));
  return newGroup;
}

/**
 * 옵션 그룹 수정
 */
export async function updateOptionGroup(
  id: string,
  data: Partial<OptionGroup>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const index = mockOptionGroups.findIndex((g) => g.id === id);
  if (index === -1) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  mockOptionGroups[index] = {
    ...mockOptionGroups[index],
    ...data,
    id, // ID는 변경 불가
  };

  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockOptionGroups[index];
}

/**
 * 옵션 그룹 삭제
 */
export async function deleteOptionGroup(id: string): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const index = mockOptionGroups.findIndex((g) => g.id === id);
  if (index === -1) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  mockOptionGroups.splice(index, 1);

  await new Promise((resolve) => setTimeout(resolve, 300));
}

/**
 * 옵션 그룹에 항목 추가
 */
export async function addOptionItem(
  groupId: string,
  item: Omit<OptionItem, 'id'>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const group = mockOptionGroups.find((g) => g.id === groupId);
  if (!group) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  const newItem: OptionItem = {
    id: `oi-${Date.now()}`,
    ...item,
  };

  group.items.push(newItem);

  await new Promise((resolve) => setTimeout(resolve, 300));
  return group;
}

/**
 * 옵션 항목 수정
 */
export async function updateOptionItem(
  groupId: string,
  itemId: string,
  data: Partial<OptionItem>
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const group = mockOptionGroups.find((g) => g.id === groupId);
  if (!group) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  const itemIndex = group.items.findIndex((i) => i.id === itemId);
  if (itemIndex === -1) {
    throw new Error('옵션 항목을 찾을 수 없습니다');
  }

  group.items[itemIndex] = {
    ...group.items[itemIndex],
    ...data,
    id: itemId, // ID는 변경 불가
  };

  await new Promise((resolve) => setTimeout(resolve, 300));
  return group;
}

/**
 * 옵션 항목 삭제
 */
export async function deleteOptionItem(
  groupId: string,
  itemId: string
): Promise<OptionGroup> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  const group = mockOptionGroups.find((g) => g.id === groupId);
  if (!group) {
    throw new Error('옵션 그룹을 찾을 수 없습니다');
  }

  const itemIndex = group.items.findIndex((i) => i.id === itemId);
  if (itemIndex === -1) {
    throw new Error('옵션 항목을 찾을 수 없습니다');
  }

  group.items.splice(itemIndex, 1);

  await new Promise((resolve) => setTimeout(resolve, 300));
  return group;
}

/**
 * Mock 데이터 리셋 (개발용)
 */
export function resetMockOptionGroups(): void {
  mockOptionGroups = [
    {
      id: 'og-001',
      name: '면양',
      required: true,
      multiSelect: false,
      order: 1,
      items: [
        { id: 'oi-001', name: '보통', quantity: 1, price: 0 },
        { id: 'oi-002', name: '곱빼기', quantity: 1, price: 2000 },
        { id: 'oi-003', name: '2배', quantity: 2, price: 3000 },
      ],
    },
    {
      id: 'og-002',
      name: '맵기',
      required: true,
      multiSelect: false,
      order: 2,
      items: [
        { id: 'oi-004', name: '순한맛', quantity: 1, price: 0 },
        { id: 'oi-005', name: '보통', quantity: 1, price: 0 },
        { id: 'oi-006', name: '얼큰', quantity: 1, price: 0 },
      ],
    },
    {
      id: 'og-003',
      name: '토핑',
      required: false,
      multiSelect: true,
      maxSelect: 3,
      order: 3,
      items: [
        { id: 'oi-007', name: '수육', quantity: 1, price: 5000 },
        { id: 'oi-008', name: '김치', quantity: 1, price: 2000 },
        { id: 'oi-009', name: '만두', quantity: 4, price: 3000 },
      ],
    },
  ];
}
```

## 10. src/lib/admin/orders.api.ts

```typescript
/**
 * 관리자 주문 API
 * USE_FIREBASE 플래그에 따라 Mock 또는 Firestore 사용
 */

import type { Order, OrderStatus, OrderLog } from '../../types/order';

// 환경 플래그
const USE_FIREBASE = false;

// Mock 데이터
const mockOrders: Order[] = [
  {
    orderId: 'ORD-20250128-001',
    userId: 'user-001',
    storeId: 'store-hyunpung',
    items: [
      {
        menuId: 'menu-001',
        menuName: '현풍닭칼국수',
        menuImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
        quantity: 2,
        options: { noodle: '기본면', spicy: '보통' },
        price: 9000,
        subtotal: 18000,
      },
      {
        menuId: 'menu-002',
        menuName: '신칼 매운닭칼국수',
        menuImage: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
        quantity: 1,
        options: { noodle: '기본면', spicy: '매운맛', toppings: ['계란', '김'] },
        price: 10000,
        subtotal: 10000,
      },
    ],
    subtotal: 28000,
    discount: 2000,
    couponId: 'WELCOME10',
    deliveryFee: 3000,
    finalAmount: 29000,
    deliveryType: 'delivery',
    deliveryAddress: {
      address: '대구광역시 달성군 현풍면 중앙로 123',
      detail: '101동 201호',
    },
    phone: '010-1234-5678',
    email: 'customer@example.com',
    requests: '문 앞에 놓아주세요',
    status: 'pending',
    payment: {
      method: 'card',
      status: 'approved',
      tid: 'TID-20250128-001',
      cardName: '신한카드',
      cardNum: '1234-****-****-5678',
      amount: 29000,
      paidAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
    },
    timeline: {
      pending: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
    },
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
    updatedAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    orderId: 'ORD-20250128-002',
    userId: 'user-002',
    storeId: 'store-hyunpung',
    items: [
      {
        menuId: 'menu-003',
        menuName: '황동칼비빔',
        menuImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
        quantity: 1,
        options: { noodle: '기본면', spicy: '보통' },
        price: 9500,
        subtotal: 9500,
      },
    ],
    subtotal: 9500,
    discount: 0,
    deliveryFee: 0,
    finalAmount: 9500,
    deliveryType: 'pickup',
    phone: '010-9876-5432',
    requests: '',
    status: 'accepted',
    payment: {
      method: 'on_site',
      status: 'pending',
      amount: 9500,
    },
    timeline: {
      pending: { seconds: (Date.now() - 600000) / 1000, nanoseconds: 0 } as any,
      accepted: { seconds: (Date.now() - 300000) / 1000, nanoseconds: 0 } as any,
    },
    createdAt: { seconds: (Date.now() - 600000) / 1000, nanoseconds: 0 } as any,
    updatedAt: { seconds: (Date.now() - 300000) / 1000, nanoseconds: 0 } as any,
  },
  {
    orderId: 'ORD-20250128-003',
    userId: 'user-003',
    storeId: 'store-hyunpung',
    items: [
      {
        menuId: 'menu-001',
        menuName: '현풍닭칼국수',
        menuImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
        quantity: 3,
        options: { noodle: '기본면', spicy: '보통' },
        price: 9000,
        subtotal: 27000,
      },
    ],
    subtotal: 27000,
    discount: 0,
    deliveryFee: 3000,
    finalAmount: 30000,
    deliveryType: 'delivery',
    deliveryAddress: {
      address: '대구광역시 달성군 현풍면 현풍중앙로 456',
      detail: '2층',
    },
    phone: '010-5555-6666',
    requests: '매운 양념 추가 부탁드립니다',
    status: 'preparing',
    payment: {
      method: 'easy_pay',
      status: 'approved',
      tid: 'TID-20250128-003',
      amount: 30000,
      paidAt: { seconds: (Date.now() - 1200000) / 1000, nanoseconds: 0 } as any,
    },
    timeline: {
      pending: { seconds: (Date.now() - 1200000) / 1000, nanoseconds: 0 } as any,
      accepted: { seconds: (Date.now() - 900000) / 1000, nanoseconds: 0 } as any,
      preparing: { seconds: (Date.now() - 600000) / 1000, nanoseconds: 0 } as any,
    },
    createdAt: { seconds: (Date.now() - 1200000) / 1000, nanoseconds: 0 } as any,
    updatedAt: { seconds: (Date.now() - 600000) / 1000, nanoseconds: 0 } as any,
  },
  {
    orderId: 'ORD-20250127-042',
    userId: 'user-004',
    storeId: 'store-hyunpung',
    items: [
      {
        menuId: 'menu-002',
        menuName: '신칼 매운닭칼국수',
        menuImage: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
        quantity: 2,
        options: { noodle: '기본면', spicy: '매운맛' },
        price: 10000,
        subtotal: 20000,
      },
    ],
    subtotal: 20000,
    discount: 0,
    deliveryFee: 3000,
    finalAmount: 23000,
    deliveryType: 'delivery',
    deliveryAddress: {
      address: '대구광역시 달성군 현풍면 자미로 789',
      detail: '',
    },
    phone: '010-7777-8888',
    requests: '',
    status: 'completed',
    payment: {
      method: 'card',
      status: 'approved',
      tid: 'TID-20250127-042',
      cardName: '우리카드',
      cardNum: '9876-****-****-4321',
      amount: 23000,
      paidAt: { seconds: (Date.now() - 86400000) / 1000, nanoseconds: 0 } as any,
    },
    timeline: {
      pending: { seconds: (Date.now() - 86400000) / 1000, nanoseconds: 0 } as any,
      accepted: { seconds: (Date.now() - 86100000) / 1000, nanoseconds: 0 } as any,
      preparing: { seconds: (Date.now() - 85800000) / 1000, nanoseconds: 0 } as any,
      completed: { seconds: (Date.now() - 84600000) / 1000, nanoseconds: 0 } as any,
    },
    createdAt: { seconds: (Date.now() - 86400000) / 1000, nanoseconds: 0 } as any,
    updatedAt: { seconds: (Date.now() - 84600000) / 1000, nanoseconds: 0 } as any,
  },
  {
    orderId: 'ORD-20250127-038',
    userId: 'user-005',
    storeId: 'store-hyunpung',
    items: [
      {
        menuId: 'menu-001',
        menuName: '현풍닭칼국수',
        menuImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
        quantity: 1,
        options: { noodle: '기본면', spicy: '보통' },
        price: 9000,
        subtotal: 9000,
      },
    ],
    subtotal: 9000,
    discount: 0,
    deliveryFee: 3000,
    finalAmount: 12000,
    deliveryType: 'delivery',
    deliveryAddress: {
      address: '대구광역시 달성군 현풍면 현풍로 321',
      detail: '상가 2층',
    },
    phone: '010-3333-4444',
    requests: '조금 늦어도 괜찮습니다',
    status: 'canceled',
    payment: {
      method: 'card',
      status: 'refunded',
      tid: 'TID-20250127-038',
      cardName: 'KB국민카드',
      cardNum: '5555-****-****-9999',
      amount: 12000,
      paidAt: { seconds: (Date.now() - 90000000) / 1000, nanoseconds: 0 } as any,
      canceledAt: { seconds: (Date.now() - 88800000) / 1000, nanoseconds: 0 } as any,
      cancelReason: '재료 소진으로 인한 취소',
    },
    timeline: {
      pending: { seconds: (Date.now() - 90000000) / 1000, nanoseconds: 0 } as any,
      canceled: { seconds: (Date.now() - 88800000) / 1000, nanoseconds: 0 } as any,
    },
    createdAt: { seconds: (Date.now() - 90000000) / 1000, nanoseconds: 0 } as any,
    updatedAt: { seconds: (Date.now() - 88800000) / 1000, nanoseconds: 0 } as any,
  },
];

const mockLogs: OrderLog[] = [
  {
    logId: 'log-001',
    orderId: 'ORD-20250128-002',
    action: 'status_changed',
    by: 'owner-001',
    byName: '석경선',
    at: { seconds: (Date.now() - 300000) / 1000, nanoseconds: 0 } as any,
    from: 'pending',
    to: 'accepted',
  },
  {
    logId: 'log-002',
    orderId: 'ORD-20250128-003',
    action: 'status_changed',
    by: 'owner-001',
    byName: '석경선',
    at: { seconds: (Date.now() - 900000) / 1000, nanoseconds: 0 } as any,
    from: 'pending',
    to: 'accepted',
  },
  {
    logId: 'log-003',
    orderId: 'ORD-20250128-003',
    action: 'status_changed',
    by: 'owner-001',
    byName: '석경선',
    at: { seconds: (Date.now() - 600000) / 1000, nanoseconds: 0 } as any,
    from: 'accepted',
    to: 'preparing',
  },
  {
    logId: 'log-004',
    orderId: 'ORD-20250127-038',
    action: 'canceled',
    by: 'owner-001',
    byName: '석경선',
    at: { seconds: (Date.now() - 88800000) / 1000, nanoseconds: 0 } as any,
    from: 'pending',
    to: 'canceled',
    reason: '재료 소진으로 인한 취소',
  },
];

// 필터 옵션
export interface OrderFilters {
  status?: OrderStatus | 'all';
  paymentMethod?: string;
  startDate?: Date;
  endDate?: Date;
  searchQuery?: string;
}

// 정렬 옵션
export type OrderSortField = 'createdAt' | 'amount';
export type OrderSortDirection = 'asc' | 'desc';

/**
 * 주문 목록 조회 (필터/정렬 지원)
 */
export async function fetchOrders(
  storeId: string,
  filters: OrderFilters = {},
  sortField: OrderSortField = 'createdAt',
  sortDirection: OrderSortDirection = 'desc'
): Promise<Order[]> {
  if (!USE_FIREBASE) {
    // Mock 데이터 필터링
    let filtered = mockOrders.filter((order) => order.storeId === storeId);

    // 상태 필터
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    // 결제수단 필터
    if (filters.paymentMethod) {
      filtered = filtered.filter((order) => order.payment.method === filters.paymentMethod);
    }

    // 기간 필터
    if (filters.startDate) {
      const startTime = filters.startDate.getTime() / 1000;
      filtered = filtered.filter((order) => order.createdAt.seconds >= startTime);
    }
    if (filters.endDate) {
      const endTime = filters.endDate.getTime() / 1000;
      filtered = filtered.filter((order) => order.createdAt.seconds <= endTime);
    }

    // 검색어 필터
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(query) ||
          order.phone.includes(query) ||
          order.items.some((item) => item.menuName.toLowerCase().includes(query))
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      let aVal: number, bVal: number;
      if (sortField === 'createdAt') {
        aVal = a.createdAt.seconds;
        bVal = b.createdAt.seconds;
      } else {
        aVal = a.finalAmount;
        bVal = b.finalAmount;
      }
      return sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return new Promise((resolve) => setTimeout(() => resolve(filtered), 500));
  }

  // TODO: Firestore 연동
  throw new Error('Firestore 연동이 아직 구현되지 않았습니다');
}

/**
 * 주문 상세 조회
 */
export async function fetchOrderById(orderId: string): Promise<Order | null> {
  if (!USE_FIREBASE) {
    const order = mockOrders.find((o) => o.orderId === orderId);
    return new Promise((resolve) => setTimeout(() => resolve(order || null), 300));
  }

  // TODO: Firestore 연동
  throw new Error('Firestore 연동이 아직 구현되지 않았습니다');
}

/**
 * 주문 상태 변경
 */
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  if (!USE_FIREBASE) {
    const order = mockOrders.find((o) => o.orderId === orderId);
    if (!order) {
      return { success: false, error: '주문을 찾을 수 없습니다' };
    }

    // 상태 전이 검증은 컴포넌트에서 처리
    order.status = newStatus;
    order.timeline[newStatus] = { seconds: Date.now() / 1000, nanoseconds: 0 } as any;
    order.updatedAt = { seconds: Date.now() / 1000, nanoseconds: 0 } as any;

    if (newStatus === 'canceled' && reason) {
      order.payment.cancelReason = reason;
      order.payment.canceledAt = { seconds: Date.now() / 1000, nanoseconds: 0 } as any;
    }

    // 로그 추가
    mockLogs.push({
      logId: `log-${Date.now()}`,
      orderId,
      action: newStatus === 'canceled' ? 'canceled' : 'status_changed',
      by: 'owner-001', // TODO: 실제 사용자 ID
      byName: '석경선',
      at: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      from: order.status,
      to: newStatus,
      reason,
    });

    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
  }

  // TODO: Firestore + Functions 연동
  throw new Error('Firestore 연동이 아직 구현되지 않았습니다');
}

/**
 * 주문 로그 조회
 */
export async function fetchOrderLogs(orderId: string): Promise<OrderLog[]> {
  if (!USE_FIREBASE) {
    const logs = mockLogs.filter((log) => log.orderId === orderId);
    return new Promise((resolve) => setTimeout(() => resolve(logs), 300));
  }

  // TODO: Firestore 연동
  throw new Error('Firestore 연동이 아직 구현되지 않았습니다');
}

/**
 * 주문 통계 (대시보드용)
 */
export interface OrderStats {
  total: number;
  pending: number;
  accepted: number;
  preparing: number;
  completed: number;
  canceled: number;
  todayRevenue: number;
  todayOrders: number;
}

export async function fetchOrderStats(storeId: string): Promise<OrderStats> {
  if (!USE_FIREBASE) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime() / 1000;

    const orders = mockOrders.filter((o) => o.storeId === storeId);
    const todayOrders = orders.filter((o) => o.createdAt.seconds >= todayTimestamp);

    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            total: orders.length,
            pending: orders.filter((o) => o.status === 'pending').length,
            accepted: orders.filter((o) => o.status === 'accepted').length,
            preparing: orders.filter((o) => o.status === 'preparing').length,
            completed: orders.filter((o) => o.status === 'completed').length,
            canceled: orders.filter((o) => o.status === 'canceled').length,
            todayRevenue: todayOrders
              .filter((o) => o.status !== 'canceled')
              .reduce((sum, o) => sum + o.finalAmount, 0),
            todayOrders: todayOrders.length,
          }),
        300
      )
    );
  }

  // TODO: Firestore 연동
  throw new Error('Firestore 연동이 아직 구현되지 않았습니다');
}
```

## 11. src/lib/admin/reviews.api.ts

```typescript
/**
 * 관리자 리뷰 관리 API
 * USE_FIREBASE=false: Mock 데이터 사용
 * USE_FIREBASE=true: Firestore 연동
 */

import type { Review, ReviewReply, ReviewReport, ReviewReportReason, ReviewStats } from '../../types/review';

// Firebase 사용 여부
const USE_FIREBASE = false;

// Mock 리뷰 데이터
const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-001',
    storeId: 'store-hyunpung',
    orderId: 'order-001',
    uid: 'user-001',
    userName: '김민수',
    rating: 5,
    text: '진짜 맛있어요! 닭칼국수는 역시 현풍이 최고네요. 국물이 진하고 면발도 쫄깃해서 너무 좋았습니다. 사장님도 친절하시고 배달도 빨리 왔어요. 다음에 또 주문할게요!',
    photos: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2시간 전
    rewardIssued: true,
    reportedCount: 0,
  },
  {
    id: 'review-002',
    storeId: 'store-hyunpung',
    orderId: 'order-002',
    uid: 'user-002',
    userName: '이영희',
    rating: 4,
    text: '맛있어요. 다만 조금 매웠어요. 덜 맵게 해달라고 했는데도 제 입맛엔 매운 편이었습니다. 맛은 정말 좋았어요!',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 5, // 5시간 전
    rewardIssued: false,
    reportedCount: 0,
    reply: {
      text: '리뷰 감사합니다! 다음번엔 더 맵지 않게 조리해드리겠습니다. 맛있게 드셔주셔서 감사해요 :)',
      by: '관리자',
      at: Date.now() - 1000 * 60 * 60 * 4,
    },
  },
  {
    id: 'review-003',
    storeId: 'store-hyunpung',
    orderId: 'order-003',
    uid: 'user-003',
    userName: '박철수',
    rating: 5,
    text: '최고입니다!! 온 가족이 다 맛있게 먹었어요. 양도 푸짐하고 가격도 합리적이에요. 특히 닭고기가 부드럽고 육수가 깊은 맛이 나서 좋았습니다.',
    photos: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1일 전
    rewardIssued: true,
    reportedCount: 0,
  },
  {
    id: 'review-004',
    storeId: 'store-hyunpung',
    orderId: 'order-004',
    uid: 'user-004',
    userName: '정미영',
    rating: 3,
    text: '보통이에요. 기대했던 것보다는 평범했습니다.',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2일 전
    rewardIssued: false,
    reportedCount: 0,
  },
  {
    id: 'review-005',
    storeId: 'store-hyunpung',
    orderId: 'order-005',
    uid: 'user-005',
    userName: '최동욱',
    rating: 5,
    text: '진짜 찐 맛집! 회사 근처라서 자주 시켜먹는데 항상 만족스러워요. 특히 비오는 날엔 칼국수가 최고죠!',
    photos: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3일 전
    rewardIssued: true,
    reportedCount: 0,
    reply: {
      text: '단골 고객님 감사합니다! 항상 맛있게 드셔주셔서 감사해요 ❤️',
      by: '사장님',
      at: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
  },
  {
    id: 'review-006',
    storeId: 'store-hyunpung',
    orderId: 'order-006',
    uid: 'user-006',
    userName: '강호진',
    rating: 2,
    text: '배달이 너무 늦게 왔어요. 음식은 맛있는데 식어서 와서 아쉬웠습니다.',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4, // 4일 전
    rewardIssued: false,
    reportedCount: 0,
  },
  {
    id: 'review-007',
    storeId: 'store-hyunpung',
    orderId: 'order-007',
    uid: 'user-007',
    userName: '윤서현',
    rating: 5,
    text: '사진으로 보는 것보다 실제로 먹어보니 훨씬 맛있네요! 국물이 진짜 깊은 맛이 나요. 강추합니다!',
    photos: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
    ],
    hasPhoto: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5일 전
    rewardIssued: true,
    reportedCount: 0,
  },
  {
    id: 'review-008',
    storeId: 'store-hyunpung',
    orderId: 'order-008',
    uid: 'user-008',
    userName: '홍길동',
    rating: 1,
    text: '이건 광고입니다 http://spam.com',
    photos: [],
    hasPhoto: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6, // 6일 전
    rewardIssued: false,
    reportedCount: 3, // 신고된 리뷰
    isHidden: false,
  },
];

// Mock 신고 데이터
const mockReports: Map<string, ReviewReport[]> = new Map();

/**
 * 리뷰 목록 조회
 */
export async function getReviews(params: {
  storeId: string;
  photoOnly?: boolean;
  reported?: boolean;
  sortBy?: 'latest' | 'rating_high' | 'rating_low';
  limit?: number;
  offset?: number;
}): Promise<{ reviews: Review[]; hasMore: boolean }> {
  if (USE_FIREBASE) {
    // TODO: Firestore 쿼리
    throw new Error('Firebase not implemented');
  }

  // Mock 데이터 필터링
  await new Promise((resolve) => setTimeout(resolve, 300)); // 네트워크 지연 시뮬레이션

  let filtered = [...MOCK_REVIEWS];

  // 필터: 사진 리뷰만
  if (params.photoOnly) {
    filtered = filtered.filter((r) => r.hasPhoto);
  }

  // 필터: 신고된 리뷰만
  if (params.reported) {
    filtered = filtered.filter((r) => (r.reportedCount || 0) > 0);
  }

  // 정렬
  switch (params.sortBy) {
    case 'rating_high':
      filtered.sort((a, b) => b.rating - a.rating || b.createdAt - a.createdAt);
      break;
    case 'rating_low':
      filtered.sort((a, b) => a.rating - b.rating || b.createdAt - a.createdAt);
      break;
    case 'latest':
    default:
      filtered.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }

  // 페이지네이션
  const limit = params.limit || 10;
  const offset = params.offset || 0;
  const reviews = filtered.slice(offset, offset + limit);
  const hasMore = offset + limit < filtered.length;

  return { reviews, hasMore };
}

/**
 * 리뷰 통계
 */
export async function getReviewStats(storeId: string): Promise<ReviewStats> {
  if (USE_FIREBASE) {
    // TODO: Firestore aggregation
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  const reviews = MOCK_REVIEWS.filter((r) => r.storeId === storeId);
  const totalCount = reviews.length;
  const photoCount = reviews.filter((r) => r.hasPhoto).length;

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = totalCount > 0 ? sum / totalCount : 0;

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return {
    totalCount,
    averageRating,
    photoCount,
    ratingDistribution,
  };
}

/**
 * 답글 작성/수정
 */
export async function addReviewReply(
  reviewId: string,
  reply: { text: string; by: string }
): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore update
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (!review) throw new Error('Review not found');

  review.reply = {
    text: reply.text,
    by: reply.by,
    at: Date.now(),
  };
}

/**
 * 답글 삭제
 */
export async function deleteReviewReply(reviewId: string): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore update
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (!review) throw new Error('Review not found');

  delete review.reply;
}

/**
 * 리뷰 신고
 */
export async function reportReview(
  reviewId: string,
  reason: ReviewReportReason,
  reportedBy: string,
  description?: string
): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore create reviews_reports
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  // 중복 신고 체크
  const reports = mockReports.get(reviewId) || [];
  const alreadyReported = reports.some((r) => r.reportedBy === reportedBy);
  if (alreadyReported) {
    throw new Error('이미 신고한 리뷰입니다.');
  }

  // 신고 추가
  const report: ReviewReport = {
    id: `report-${Date.now()}`,
    reviewId,
    reportedBy,
    reason,
    description,
    createdAt: Date.now(),
  };

  reports.push(report);
  mockReports.set(reviewId, reports);

  // 리뷰의 신고 카운트 증가
  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (review) {
    review.reportedCount = (review.reportedCount || 0) + 1;
  }
}

/**
 * 리뷰 숨김 처리
 */
export async function hideReview(reviewId: string, hidden: boolean): Promise<void> {
  if (USE_FIREBASE) {
    // TODO: Firestore update
    throw new Error('Firebase not implemented');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = MOCK_REVIEWS.find((r) => r.id === reviewId);
  if (!review) throw new Error('Review not found');

  review.isHidden = hidden;
}
```

## 12. src/lib/admin/settings.api.ts

```typescript
/**
 * 관리자 설정 API
 * USE_FIREBASE=false: Mock 데이터 반환
 * USE_FIREBASE=true: Firestore appConfig 연동
 */

import { 
  StoreSettings, 
  DEFAULT_BUSINESS_HOURS, 
  DEFAULT_DELIVERY_FEES 
} from '../../types/settings';

const USE_FIREBASE = false;

// Mock 데이터
let mockSettings: StoreSettings = {
  storeId: 'store-001',
  businessHours: DEFAULT_BUSINESS_HOURS,
  deliveryFees: DEFAULT_DELIVERY_FEES,
  deliveryRadius: 6,
  minDeliveryOrder: 15000,
  minPickupOrder: 5000,
  holidays: [],
  updatedAt: new Date(),
  updatedBy: 'admin',
  updatedByName: '관리자',
};

/**
 * 설정 조회
 */
export async function getSettings(storeId: string): Promise<StoreSettings> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    // const doc = await db.collection('appConfig').doc(storeId).get();
    // return doc.data() as StoreSettings;
    throw new Error('Firebase not configured');
  }

  // Mock 동작
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSettings;
}

/**
 * 설정 저장
 */
export async function saveSettings(
  storeId: string,
  settings: Partial<StoreSettings>,
  by: string,
  byName: string
): Promise<StoreSettings> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    // await db.collection('appConfig').doc(storeId).set({
    //   ...settings,
    //   updatedAt: new Date(),
    //   updatedBy: by,
    //   updatedByName: byName,
    // }, { merge: true });
    throw new Error('Firebase not configured');
  }

  // Mock 동작
  await new Promise(resolve => setTimeout(resolve, 500));

  mockSettings = {
    ...mockSettings,
    ...settings,
    storeId,
    updatedAt: new Date(),
    updatedBy: by,
    updatedByName: byName,
  };

  return mockSettings;
}

/**
 * 현재 영업 상태 확인
 */
export function isOpenNow(settings: StoreSettings): boolean {
  const now = new Date();
  const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 휴무일 체크
  const today = now.toISOString().split('T')[0];
  if (settings.holidays.includes(today)) {
    return false;
  }

  // 요일별 영업시간 체크
  const todayHours = settings.businessHours.find(h => h.day === dayOfWeek);
  if (!todayHours || !todayHours.isOpen) {
    return false;
  }

  return currentTime >= todayHours.openTime && currentTime < todayHours.closeTime;
}

/**
 * 배달비 계산
 */
export function calculateDeliveryFee(
  settings: StoreSettings,
  distance: number
): number | null {
  if (distance > settings.deliveryRadius) {
    return null; // 배달 불가
  }

  const fee = settings.deliveryFees.find(
    f => distance >= f.minDistance && distance < f.maxDistance
  );

  return fee ? fee.fee : null;
}
```

## 13. src/lib/analytics.ts

```typescript
/**
 * Firebase Analytics
 * 사용자 행동 추적 및 분석
 */

const USE_FIREBASE = false; // TODO: config/env.ts로 통합

/**
 * 이벤트 로깅
 */
export function trackEvent(
  name: string,
  params?: Record<string, any>
): void {
  if (USE_FIREBASE) {
    // TODO: Firebase Analytics 설정
    // import('firebase/analytics').then(({ logEvent }) => {
    //   import('./firebase').then(({ analytics }) => {
    //     logEvent(analytics, name, params);
    //   });
    // });
    console.log(`[Analytics - Firebase] ${name}`, params);
  } else {
    console.log(`[Analytics - Mock] ${name}`, params);
  }
}

/**
 * 페이지 뷰 추적
 */
export function trackPageView(pageName: string, params?: Record<string, any>): void {
  trackEvent('page_view', {
    page_name: pageName,
    ...params,
  });
}

/**
 * 메뉴 조회 추적
 */
export function trackMenuView(menuId: string, menuName: string): void {
  trackEvent('menu_view', {
    menu_id: menuId,
    menu_name: menuName,
  });
}

/**
 * 장바구니 추가 추적
 */
export function trackAddToCart(
  menuId: string,
  menuName: string,
  quantity: number,
  price: number
): void {
  trackEvent('add_to_cart', {
    menu_id: menuId,
    menu_name: menuName,
    quantity,
    price,
    value: price * quantity,
  });
}

/**
 * 장바구니 제거 추적
 */
export function trackRemoveFromCart(
  menuId: string,
  menuName: string,
  quantity: number
): void {
  trackEvent('remove_from_cart', {
    menu_id: menuId,
    menu_name: menuName,
    quantity,
  });
}

/**
 * 체크아웃 시작 추적
 */
export function trackBeginCheckout(
  itemCount: number,
  totalAmount: number
): void {
  trackEvent('begin_checkout', {
    item_count: itemCount,
    value: totalAmount,
  });
}

/**
 * 결제 완료 추적
 */
export function trackPurchase(
  orderId: string,
  orderNumber: string,
  amount: number,
  paymentMethod: string,
  itemCount: number
): void {
  trackEvent('purchase', {
    transaction_id: orderId,
    order_number: orderNumber,
    value: amount,
    payment_method: paymentMethod,
    item_count: itemCount,
  });
}

/**
 * 쿠폰 사용 추적
 */
export function trackCouponUsed(
  couponId: string,
  couponType: string,
  discount: number
): void {
  trackEvent('coupon_used', {
    coupon_id: couponId,
    coupon_type: couponType,
    discount,
  });
}

/**
 * 리뷰 작성 추적
 */
export function trackReviewWritten(
  orderId: string,
  rating: number,
  hasPhoto: boolean
): void {
  trackEvent('review_written', {
    order_id: orderId,
    rating,
    has_photo: hasPhoto,
  });
}

/**
 * 검색 추적
 */
export function trackSearch(searchTerm: string, resultCount: number): void {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount,
  });
}

/**
 * 공유 추적
 */
export function trackShare(
  contentType: string,
  itemId: string,
  method: string
): void {
  trackEvent('share', {
    content_type: contentType,
    item_id: itemId,
    method,
  });
}

/**
 * 사용자 속성 설정
 */
export function setUserProperties(properties: Record<string, any>): void {
  if (USE_FIREBASE) {
    // TODO: Firebase Analytics 설정
    // import('firebase/analytics').then(({ setUserProperties }) => {
    //   import('./firebase').then(({ analytics }) => {
    //     setUserProperties(analytics, properties);
    //   });
    // });
    console.log('[Analytics - Firebase] User properties:', properties);
  } else {
    console.log('[Analytics - Mock] User properties:', properties);
  }
}
```

## 14. src/lib/auth.ts

```typescript
/**
 * 인증 및 권한 관리 유틸리티
 * USE_FIREBASE=false: mockAuth 사용
 * USE_FIREBASE=true: Firebase Auth 사용
 */

export type UserRole = 'customer' | 'owner' | 'admin';

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  storeId?: string; // owner인 경우 관리하는 매장 ID
}

// Firebase 사용 여부 (개발 시 false)
const USE_FIREBASE = false;

/**
 * Mock 인증 사용자 (개발용)
 */
const MOCK_ADMIN: AuthUser = {
  uid: 'admin-001',
  email: 'admin@hyunpungkalguksu.com',
  displayName: '관리자',
  role: 'owner',
  storeId: 'store-hyunpung',
};

const MOCK_CUSTOMER: AuthUser = {
  uid: 'user-001',
  email: 'customer@example.com',
  displayName: '김고객',
  role: 'customer',
};

/**
 * 현재 로그인한 사용자 정보 가져오기
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (USE_FIREBASE) {
    // TODO: Firebase Auth에서 사용자 정보 가져오기
    // const firebaseUser = auth.currentUser;
    // if (!firebaseUser) return null;
    // const userDoc = await db.collection('users').doc(firebaseUser.uid).get();
    // return userDoc.data() as AuthUser;
    return null;
  }

  // Mock: localStorage에서 역할 가져오기 (테스트용)
  const mockRole = localStorage.getItem('mockRole') || 'customer';
  return mockRole === 'owner' || mockRole === 'admin' ? MOCK_ADMIN : MOCK_CUSTOMER;
}

/**
 * 사용자가 특정 역할을 가지고 있는지 확인
 */
export function hasRole(user: AuthUser | null, roles: UserRole[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

/**
 * 관리자 권한 확인
 */
export function isAdmin(user: AuthUser | null): boolean {
  return hasRole(user, ['owner', 'admin']);
}

/**
 * 고객 권한 확인
 */
export function isCustomer(user: AuthUser | null): boolean {
  return hasRole(user, ['customer']);
}

/**
 * Mock 로그인 (테스트용)
 */
export function mockLogin(role: UserRole): void {
  localStorage.setItem('mockRole', role);
  window.location.reload();
}

/**
 * Mock 로그아웃 (테스트용)
 */
export function mockLogout(): void {
  localStorage.removeItem('mockRole');
  window.location.reload();
}

/**
 * 관리자 페이지 접근 가드
 * 관리자가 아니면 홈으로 리다이렉트
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await getCurrentUser();
  
  if (!isAdmin(user)) {
    // 관리자가 아니면 홈으로 이동
    window.location.href = '/';
    throw new Error('Unauthorized');
  }
  
  return user!;
}
```

## 15. src/lib/coupons.api.ts

```typescript
/**
 * 쿠폰 API
 * USE_FIREBASE=false: Mock 데이터 반환
 * USE_FIREBASE=true: Firestore 연동
 */

import { Coupon, CouponFilters, CouponStats, CouponIssue, getCouponStatus } from '../types/coupon';

const USE_FIREBASE = false;

// Mock 데이터
let mockCoupons: Coupon[] = [
  {
    id: 'coupon-001',
    uid: 'user-001',
    type: 'photo_review',
    amount: 3000,
    minSpend: 10000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5일 전
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 25, // 25일 후
    used: false,
    title: '사진 리뷰 작성 감사 쿠폰',
    description: '10,000원 이상 주문 시 사용 가능',
  },
  {
    id: 'coupon-002',
    uid: 'user-001',
    type: 'welcome',
    amount: 5000,
    minSpend: 15000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10일 전
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 20, // 20일 후
    used: false,
    title: '신규 가입 축하 쿠폰',
    description: '15,000원 이상 주문 시 사용 가능',
  },
  {
    id: 'coupon-003',
    uid: 'user-001',
    type: 'event',
    amount: 2000,
    minSpend: 10000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 40, // 40일 전
    expiresAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10일 전 (만료됨)
    used: false,
    title: '이벤트 쿠폰',
    description: '만료됨',
  },
  {
    id: 'coupon-004',
    uid: 'user-001',
    type: 'admin',
    amount: 10000,
    minSpend: 20000,
    issuedAt: Date.now() - 1000 * 60 * 60 * 24 * 15, // 15일 전
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 15, // 15일 후
    used: true,
    usedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    orderId: 'order-123',
    title: '고객 보상 쿠폰',
    description: '이미 사용됨',
  },
];

/**
 * 사용자 쿠폰 목록 조회
 */
export async function getCoupons(
  uid: string,
  filters: CouponFilters = {}
): Promise<Coupon[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = mockCoupons.filter(c => c.uid === uid);

  // 상태 필터
  if (filters.status) {
    filtered = filtered.filter(c => getCouponStatus(c) === filters.status);
  }

  // 타입 필터
  if (filters.type) {
    filtered = filtered.filter(c => c.type === filters.type);
  }

  // 정렬
  switch (filters.sortBy) {
    case 'issuedAt':
      filtered.sort((a, b) => b.issuedAt - a.issuedAt);
      break;
    case 'expiresAt':
      filtered.sort((a, b) => a.expiresAt - b.expiresAt);
      break;
    case 'amount':
      filtered.sort((a, b) => b.amount - a.amount);
      break;
    default:
      filtered.sort((a, b) => b.issuedAt - a.issuedAt);
  }

  return filtered;
}

/**
 * 사용 가능한 쿠폰만 조회 (결제 시)
 */
export async function getAvailableCoupons(
  uid: string,
  orderAmount: number
): Promise<Coupon[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return mockCoupons.filter(c =>
    c.uid === uid &&
    !c.used &&
    Date.now() <= c.expiresAt &&
    orderAmount >= c.minSpend
  );
}

/**
 * 쿠폰 사용
 */
export async function useCoupon(
  couponId: string,
  orderId: string
): Promise<Coupon> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  const coupon = mockCoupons.find(c => c.id === couponId);
  if (!coupon) {
    throw new Error('쿠폰을 찾을 수 없습니다');
  }

  if (coupon.used) {
    throw new Error('이미 사용된 쿠폰입니다');
  }

  if (Date.now() > coupon.expiresAt) {
    throw new Error('만료된 쿠폰입니다');
  }

  coupon.used = true;
  coupon.usedAt = Date.now();
  coupon.orderId = orderId;

  return coupon;
}

/**
 * 쿠폰 발급 (관리자)
 */
export async function issueCoupon(
  issue: CouponIssue,
  by: string,
  byName: string
): Promise<Coupon[]> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    // TODO: Functions로 발급 처리
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  const targetUsers = issue.targetUsers || ['user-001']; // Mock: 기본 사용자
  const expiresAt = Date.now() + issue.expiryDays * 24 * 60 * 60 * 1000;

  const issued: Coupon[] = targetUsers.slice(0, issue.issueLimit || 999).map((uid, index) => {
    const coupon: Coupon = {
      id: `coupon-${Date.now()}-${index}`,
      uid,
      type: issue.type,
      amount: issue.amount,
      minSpend: issue.minSpend,
      issuedAt: Date.now(),
      expiresAt,
      used: false,
      title: issue.title,
      description: issue.description,
    };
    mockCoupons.push(coupon);
    return coupon;
  });

  return issued;
}

/**
 * 쿠폰 통계 (관리자)
 */
export async function getCouponStats(): Promise<CouponStats> {
  if (USE_FIREBASE) {
    // TODO: Firestore 연동
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 200));

  const stats: CouponStats = {
    totalIssued: mockCoupons.length,
    totalUsed: mockCoupons.filter(c => c.used).length,
    totalAmount: mockCoupons.filter(c => c.used).reduce((sum, c) => sum + c.amount, 0),
    expiredCount: mockCoupons.filter(c => !c.used && Date.now() > c.expiresAt).length,
  };

  return stats;
}

/**
 * 만료 처리 (스케줄러용)
 */
export async function expireCoupons(): Promise<number> {
  if (USE_FIREBASE) {
    // TODO: Cloud Functions Scheduler
    // TODO: 매일 04:00 실행
    throw new Error('Firebase not configured');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  const expiredCount = mockCoupons.filter(
    c => !c.used && Date.now() > c.expiresAt
  ).length;

  return expiredCount;
}
```

## 16. src/lib/delivery/index.ts

```typescript
/**
 * Delivery 모듈 메인 진입점
 * Phase 3-1: GPS Tracking
 */

export { delivery, isDeliveryEnabled, currentProvider } from './provider';
export { getAllMockTasks, subscribeMockTasks } from './providers/mock';
```

## 17. src/lib/delivery/provider.ts

```typescript
/**
 * Delivery Provider 어댑터
 * Phase 3-1: GPS Tracking
 * 
 * 환경 변수에 따라 적절한 배달 대행사 Provider를 반환
 */

import type { DeliveryProvider } from '../../types/delivery';
import { mockDelivery } from './providers/mock';
import { providerA } from './providers/providerA';
import { FEATURE_FLAGS } from '../../config/env';

/**
 * Provider 맵
 */
const providers: Record<string, DeliveryProvider> = {
  mock: mockDelivery,
  providerA: providerA,
};

/**
 * 현재 활성화된 배달 Provider
 */
export const delivery = providers[FEATURE_FLAGS.deliveryProvider] || mockDelivery;

/**
 * 배달 추적 기능이 활성화되어 있는지 확인
 */
export const isDeliveryEnabled = FEATURE_FLAGS.delivery;

/**
 * 현재 사용 중인 Provider 이름
 */
export const currentProvider = FEATURE_FLAGS.deliveryProvider;
```

## 18. src/lib/delivery/providers/mock.ts

```typescript
/**
 * Mock 배달 대행사 Provider
 * Phase 3-1: GPS Tracking
 * 
 * 실제 배달 대행사 API 대신 로컬 시뮬레이션 제공
 */

import type {
  DeliveryProvider,
  DeliveryTask,
  CreateTaskParams,
  CreateTaskResult,
  Coordinates,
  DeliveryStatus
} from '../../../types/delivery';

const MOCK_TASKS_KEY = 'hyunpung_mock_delivery_tasks';
const SIMULATION_INTERVAL = 5000; // 5초마다 업데이트
const BASE_ETA = 30; // 기본 30분

/**
 * Mock 배달 태스크 저장소
 */
class MockDeliveryStorage {
  private tasks: Map<string, DeliveryTask> = new Map();

  constructor() {
    this.loadFromStorage();
    this.startSimulation();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(MOCK_TASKS_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.tasks = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error('[MockDelivery] Failed to load tasks:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = Object.fromEntries(this.tasks);
      localStorage.setItem(MOCK_TASKS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('[MockDelivery] Failed to save tasks:', error);
    }
  }

  /**
   * 배달 진행 시뮬레이션
   */
  private startSimulation() {
    setInterval(() => {
      let hasChanges = false;

      this.tasks.forEach((task) => {
        // 완료/취소된 태스크는 스킵
        if (task.status === 'completed' || task.status === 'canceled') {
          return;
        }

        // ETA 감소
        if (task.eta && task.eta > 0) {
          task.eta = Math.max(0, task.eta - 1);
        }

        // 상태 전환 시뮬레이션
        const now = Date.now();
        const elapsed = (now - task.createdAt) / 1000 / 60; // 분

        if (task.status === 'assigned' && elapsed > 3) {
          task.status = 'picked_up';
          hasChanges = true;
        } else if (task.status === 'picked_up' && elapsed > 5) {
          task.status = 'delivering';
          hasChanges = true;
        } else if (task.status === 'delivering' && task.eta === 0) {
          task.status = 'completed';
          hasChanges = true;
        }

        // 좌표 이동 시뮬레이션 (배달 중일 때만)
        if (task.status === 'delivering' && task.lastCoord) {
          // 목적지로 천천히 이동 (간단한 시뮬레이션)
          const deltaLat = (Math.random() - 0.5) * 0.001;
          const deltaLng = (Math.random() - 0.5) * 0.001;
          
          task.lastCoord = {
            lat: task.lastCoord.lat + deltaLat,
            lng: task.lastCoord.lng + deltaLng,
            at: now,
          };
          hasChanges = true;
        }

        task.updatedAt = now;
      });

      if (hasChanges) {
        this.saveToStorage();
        // 실제로는 Firebase에서 onSnapshot으로 자동 업데이트됨
        this.notifyListeners();
      }
    }, SIMULATION_INTERVAL);
  }

  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  createTask(params: CreateTaskParams): DeliveryTask {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const driverId = `driver_${Math.floor(Math.random() * 100)}`;
    const now = Date.now();

    // 픽업 위치에서 시작
    const task: DeliveryTask = {
      taskId,
      orderId: params.orderId,
      driverId,
      status: 'assigned',
      eta: BASE_ETA,
      lastCoord: {
        lat: params.pickup.lat,
        lng: params.pickup.lng,
        at: now,
      },
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.set(taskId, task);
    this.saveToStorage();

    return task;
  }

  getTask(taskId: string): DeliveryTask | undefined {
    return this.tasks.get(taskId);
  }

  cancelTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    task.status = 'canceled';
    task.updatedAt = Date.now();
    this.saveToStorage();

    return true;
  }

  getAllTasks(): DeliveryTask[] {
    return Array.from(this.tasks.values());
  }
}

const storage = new MockDeliveryStorage();

/**
 * Mock Delivery Provider 구현
 */
export const mockDelivery: DeliveryProvider = {
  async createTask(params: CreateTaskParams): Promise<CreateTaskResult> {
    console.log('[MockDelivery] Creating task:', params);

    const task = storage.createTask(params);

    return {
      taskId: task.taskId,
    };
  },

  async getTask(taskId: string): Promise<DeliveryTask> {
    console.log('[MockDelivery] Getting task:', taskId);

    const task = storage.getTask(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    return task;
  },

  async cancelTask(taskId: string): Promise<void> {
    console.log('[MockDelivery] Canceling task:', taskId);

    const success = storage.cancelTask(taskId);
    if (!success) {
      throw new Error(`Task not found: ${taskId}`);
    }
  },
};

/**
 * Mock 전용: 모든 태스크 조회 (관리자 대시보드용)
 */
export function getAllMockTasks(): DeliveryTask[] {
  return storage.getAllTasks();
}

/**
 * Mock 전용: 실시간 구독
 */
export function subscribeMockTasks(listener: () => void) {
  return storage.subscribe(listener);
}
```

## 19. src/lib/delivery/providers/providerA.ts

```typescript
/**
 * Provider A (실제 배달 대행사) - 스켈레톤
 * Phase 3-1: GPS Tracking
 * 
 * TODO: 실제 배달 대행사 API 엔드포인트 및 인증 정보 설정
 */

import type {
  DeliveryProvider,
  DeliveryTask,
  CreateTaskParams,
  CreateTaskResult,
} from '../../../types/delivery';
import { PROVIDER_A_CONFIG } from '../../../config/env';

/**
 * Provider A API Client
 */
class ProviderAClient {
  private baseUrl: string;
  private apiKey: string;
  private merchantId: string;

  constructor(config: typeof PROVIDER_A_CONFIG) {
    this.baseUrl = config.apiUrl;
    this.apiKey = config.apiKey;
    this.merchantId = config.merchantId;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
      'X-Merchant-Id': this.merchantId,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Provider A API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[ProviderA] Request failed:', error);
      throw error;
    }
  }

  /**
   * 배달 태스크 생성
   * 
   * TODO: 실제 API 스펙에 맞게 수정
   */
  async createDeliveryTask(params: {
    orderId: string;
    pickup: { address: string; lat: number; lng: number };
    dropoff: { address: string; lat: number; lng: number };
  }) {
    return this.request<{ taskId: string }>('/v1/tasks', {
      method: 'POST',
      body: JSON.stringify({
        order_id: params.orderId,
        pickup_location: {
          address: params.pickup.address,
          latitude: params.pickup.lat,
          longitude: params.pickup.lng,
        },
        dropoff_location: {
          address: params.dropoff.address,
          latitude: params.dropoff.lat,
          longitude: params.dropoff.lng,
        },
      }),
    });
  }

  /**
   * 배달 태스크 조회
   * 
   * TODO: 실제 API 스펙에 맞게 수정
   */
  async getDeliveryTask(taskId: string) {
    return this.request<any>(`/v1/tasks/${taskId}`, {
      method: 'GET',
    });
  }

  /**
   * 배달 태스크 취소
   * 
   * TODO: 실제 API 스펙에 맞게 수정
   */
  async cancelDeliveryTask(taskId: string) {
    return this.request<void>(`/v1/tasks/${taskId}/cancel`, {
      method: 'POST',
    });
  }
}

const client = new ProviderAClient(PROVIDER_A_CONFIG);

/**
 * Provider A Delivery Provider 구현
 */
export const providerA: DeliveryProvider = {
  async createTask(params: CreateTaskParams): Promise<CreateTaskResult> {
    console.log('[ProviderA] Creating task:', params);

    const response = await client.createDeliveryTask({
      orderId: params.orderId,
      pickup: {
        address: params.pickup.addr,
        lat: params.pickup.lat,
        lng: params.pickup.lng,
      },
      dropoff: {
        address: params.dropoff.addr,
        lat: params.dropoff.lat,
        lng: params.dropoff.lng,
      },
    });

    return {
      taskId: response.taskId,
    };
  },

  async getTask(taskId: string): Promise<DeliveryTask> {
    console.log('[ProviderA] Getting task:', taskId);

    const data = await client.getDeliveryTask(taskId);

    // TODO: API 응답을 DeliveryTask 타입으로 변환
    return {
      taskId: data.id || taskId,
      orderId: data.order_id || '',
      driverId: data.driver_id,
      status: mapProviderAStatus(data.status),
      eta: data.eta,
      lastCoord: data.driver_location
        ? {
            lat: data.driver_location.latitude,
            lng: data.driver_location.longitude,
            at: Date.now(),
          }
        : undefined,
      createdAt: new Date(data.created_at).getTime(),
      updatedAt: new Date(data.updated_at).getTime(),
    };
  },

  async cancelTask(taskId: string): Promise<void> {
    console.log('[ProviderA] Canceling task:', taskId);

    await client.cancelDeliveryTask(taskId);
  },
};

/**
 * Provider A 상태를 내부 상태로 매핑
 * 
 * TODO: 실제 API 상태 값에 맞게 수정
 */
function mapProviderAStatus(status: string): DeliveryTask['status'] {
  const statusMap: Record<string, DeliveryTask['status']> = {
    'assigned': 'assigned',
    'picked_up': 'picked_up',
    'in_transit': 'delivering',
    'delivered': 'completed',
    'cancelled': 'canceled',
  };

  return statusMap[status] || 'assigned';
}
```

## 20. src/lib/fcm.ts

```typescript
/**
 * FCM (Firebase Cloud Messaging) 클라이언트
 * 푸시 알림 권한 요청 및 토큰 관리
 * Phase 3-6: 푸시 알림 시스템
 */

import { USE_FIREBASE } from '../config/env';
import type { NotificationSettings } from '../types/notification';

/**
 * FCM 권한 요청 및 토큰 저장
 */
export async function requestNotificationPermission(
  userId: string
): Promise<string | null> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Notification permission requested for user:', userId);
    
    // Mock: localStorage에 권한 상태 저장
    localStorage.setItem('notification_permission', 'granted');
    const mockToken = `mock-fcm-token-${userId}-${Date.now()}`;
    localStorage.setItem('fcm_token', mockToken);
    
    return mockToken;
  }

  try {
    // 브라우저 알림 권한 요청
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Firebase Messaging 설정
    const { getToken } = await import('firebase/messaging');
    const { messaging } = await import('./firebase');
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    // Firestore에 토큰 저장
    const { doc, setDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    await setDoc(
      doc(db, `users/${userId}/meta/fcm`),
      {
        token,
        platform: 'web',
        updatedAt: new Date(),
      },
      { merge: true }
    );

    return token;
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
}

/**
 * 포그라운드 메시지 리스너 설정
 */
export async function setupForegroundMessageListener(
  onMessage: (payload: any) => void
): Promise<(() => void) | null> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Foreground message listener setup');
    
    // Mock: 개발 환경에서 테스트 알림 시뮬레이션
    if (import.meta.env.MODE === 'development') {
      // 10초마다 Mock 알림 생성 (테스트용)
      const interval = setInterval(() => {
        const mockMessages = [
          {
            notification: {
              title: '🚚 배달 출발',
              body: '주문하신 메뉴가 배달을 시작했습니다.',
            },
            data: { type: 'order_delivering', orderId: 'mock-order-1' },
          },
          {
            notification: {
              title: '🎁 쿠폰 발급',
              body: '감사 쿠폰이 발급되었습니다!',
            },
            data: { type: 'coupon_issued' },
          },
        ];
        
        // 랜덤하게 가끔 알림 발송 (20% 확률)
        if (Math.random() < 0.2) {
          const mockMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
          console.log('[Mock] Foreground message:', mockMessage);
          onMessage(mockMessage);
        }
      }, 10000);
      
      return () => clearInterval(interval);
    }
    
    return null;
  }

  try {
    const { onMessage: onFCMMessage } = await import('firebase/messaging');
    const { messaging } = await import('./firebase');
    const unsubscribe = onFCMMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      onMessage(payload);
    });
    return unsubscribe;
  } catch (error) {
    console.error('Failed to setup message listener:', error);
    return null;
  }
}

/**
 * 알림 권한 상태 확인
 */
export function checkNotificationPermission(): NotificationPermission | null {
  if (!('Notification' in window)) {
    return null;
  }

  return Notification.permission;
}

/**
 * 알림 권한이 있는지 확인
 */
export function hasNotificationPermission(): boolean {
  return checkNotificationPermission() === 'granted';
}

/**
 * 브라우저가 알림을 지원하는지 확인
 */
export function isNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

/**
 * 알림 설정 저장
 */
export async function saveNotificationSettings(
  userId: string,
  settings: NotificationSettings
): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Saving notification settings:', settings);
    localStorage.setItem(`notification_settings_${userId}`, JSON.stringify(settings));
    return;
  }

  try {
    const { doc, setDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    await setDoc(
      doc(db, `users/${userId}/settings/notifications`),
      {
        ...settings,
        updatedAt: new Date(),
      }
    );
  } catch (error) {
    console.error('Failed to save notification settings:', error);
    throw error;
  }
}

/**
 * 알림 설정 조회
 */
export async function getNotificationSettings(
  userId: string
): Promise<NotificationSettings> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting notification settings');
    const stored = localStorage.getItem(`notification_settings_${userId}`);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    // 기본 설정
    return {
      userId,
      enabled: true,
      orderUpdates: true,
      promotions: true,
      reviews: true,
      points: true,
      sound: true,
      vibration: true,
      updatedAt: new Date(),
    };
  }

  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const docSnap = await getDoc(doc(db, `users/${userId}/settings/notifications`));
    
    if (docSnap.exists()) {
      return docSnap.data() as NotificationSettings;
    }
    
    // 기본 설정 반환
    return {
      userId,
      enabled: true,
      orderUpdates: true,
      promotions: true,
      reviews: true,
      points: true,
      sound: true,
      vibration: true,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Failed to get notification settings:', error);
    throw error;
  }
}

/**
 * 테스트 푸시 알림 전송 (Mock 전용)
 */
export function sendTestNotification(): void {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return;
  }

  new Notification('현풍닭칼국수', {
    body: '테스트 알림입니다 🍜',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'test-notification',
    requireInteraction: false,
  });
}
```

## 21. src/lib/firebase.ts

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase 설정
// 실제 프로젝트에서는 환경변수(.env)에서 불러옵니다
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app };
export default app;
```

## 22. src/lib/functions.ts

```typescript
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
```

## 23. src/lib/imageUtils.ts

```typescript
/**
 * 이미지 처리 유틸리티
 * - 리사이징 (1600px max)
 * - WebP 변환 (품질 0.8)
 */

export interface ImageProcessOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: 'webp' | 'jpeg' | 'png';
}

const DEFAULT_OPTIONS: Required<ImageProcessOptions> = {
  maxWidth: 1600,
  maxHeight: 1600,
  quality: 0.8,
  outputFormat: 'webp',
};

/**
 * 이미지 파일을 리사이징하고 WebP로 변환
 */
export async function processImage(
  file: File,
  options: ImageProcessOptions = {}
): Promise<Blob> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file'));

    img.onload = () => {
      try {
        // 리사이징 계산
        let { width, height } = img;
        const aspectRatio = width / height;

        if (width > opts.maxWidth || height > opts.maxHeight) {
          if (width > height) {
            width = opts.maxWidth;
            height = Math.round(width / aspectRatio);
          } else {
            height = opts.maxHeight;
            width = Math.round(height * aspectRatio);
          }
        }

        // Canvas에 그리기
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Blob으로 변환
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert canvas to blob'));
            }
          },
          `image/${opts.outputFormat}`,
          opts.quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));

    reader.readAsDataURL(file);
  });
}

/**
 * 여러 이미지 파일을 병렬 처리
 */
export async function processImages(
  files: File[],
  options: ImageProcessOptions = {}
): Promise<Blob[]> {
  return Promise.all(files.map((file) => processImage(file, options)));
}

/**
 * 파일 크기 검증 (3MB 제한)
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 3 * 1024 * 1024; // 3MB

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: '이미지 파일만 업로드 가능합니다.' };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: '이미지는 3MB 이하로 업로드해주세요.' };
  }

  return { valid: true };
}

/**
 * 파일 배열 검증
 */
export function validateImageFiles(files: File[]): { valid: boolean; error?: string } {
  if (files.length === 0) {
    return { valid: true }; // 사진 없는 리뷰도 허용
  }

  if (files.length > 5) {
    return { valid: false, error: '사진은 최대 5장까지 업로드 가능합니다.' };
  }

  for (const file of files) {
    const result = validateImageFile(file);
    if (!result.valid) {
      return result;
    }
  }

  return { valid: true };
}

/**
 * 이미지 URL을 Blob으로 변환 (미리보기용)
 */
export function createImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * 미리보기 URL 해제
 */
export function revokeImagePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
```

## 24. src/lib/nicepay.ts

```typescript
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
```

## 25. src/lib/notifications.api.ts

```typescript
/**
 * 알림 API
 * Phase 3-6: 푸시 알림 시스템
 */

import { USE_FIREBASE } from '../config/env';
import type { Notification, NotificationType, NotificationTemplate } from '../types/notification';

/**
 * 알림 템플릿 정의
 */
export const NOTIFICATION_TEMPLATES: Record<NotificationType, NotificationTemplate> = {
  order_received: {
    type: 'order_received',
    title: '✅ 주문 접수',
    body: '주문이 접수되었습니다. 따끈하게 준비할게요!',
    priority: 'high',
  },
  order_cooking: {
    type: 'order_cooking',
    title: '👨‍🍳 조리 시작',
    body: '주문하신 메뉴를 조리 중입니다.',
    priority: 'normal',
  },
  order_ready: {
    type: 'order_ready',
    title: '🍜 조리 완료',
    body: '주문하신 메뉴가 준비되었습니다!',
    priority: 'high',
  },
  order_delivering: {
    type: 'order_delivering',
    title: '🚚 배달 출발',
    body: '주문하신 메뉴가 배달을 시작했습니다.',
    priority: 'high',
  },
  order_completed: {
    type: 'order_completed',
    title: '✅ 주문 완료',
    body: '주문이 완료되었습니다. 맛있게 드세요!',
    priority: 'normal',
  },
  order_cancelled: {
    type: 'order_cancelled',
    title: '❌ 주문 취소',
    body: '주문이 취소되었습니다.',
    priority: 'high',
  },
  coupon_issued: {
    type: 'coupon_issued',
    title: '🎁 쿠폰 발급',
    body: '새로운 쿠폰이 발급되었습니다!',
    priority: 'normal',
  },
  points_earned: {
    type: 'points_earned',
    title: '💰 포인트 적립',
    body: '포인트가 적립되었습니다.',
    priority: 'low',
  },
  review_reminder: {
    type: 'review_reminder',
    title: '✍️ 리뷰 작성',
    body: '오늘 식사는 어떠셨어요? 사진 리뷰 쿠폰이 기다려요.',
    priority: 'low',
  },
  review_reply: {
    type: 'review_reply',
    title: '💬 리뷰 답글',
    body: '작성하신 리뷰에 답글이 달렸습니다.',
    priority: 'normal',
  },
  promotion: {
    type: 'promotion',
    title: '🎉 프로모션',
    body: '특별한 이벤트를 확인하세요!',
    priority: 'low',
  },
  system: {
    type: 'system',
    title: '📢 시스템 공지',
    body: '중요한 공지사항이 있습니다.',
    priority: 'normal',
  },
};

/**
 * 알림 목록 조회
 */
export async function getNotifications(
  userId: string,
  limit: number = 50
): Promise<Notification[]> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting notifications for user:', userId);
    
    const mockNotifications: Notification[] = [
      {
        id: 'notif-1',
        userId,
        type: 'order_delivering',
        title: '🚚 배달 출발',
        body: '주문하신 메뉴가 배달을 시작했습니다.',
        data: { orderId: 'order-1', status: 'delivering' },
        priority: 'high',
        read: false,
        clicked: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10분 전
      },
      {
        id: 'notif-2',
        userId,
        type: 'coupon_issued',
        title: '🎁 쿠폰 발급',
        body: '리뷰 감사 쿠폰이 발급되었습니다.',
        data: { couponType: 'photo_review', amount: 3000 },
        priority: 'normal',
        read: false,
        clicked: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
      },
      {
        id: 'notif-3',
        userId,
        type: 'points_earned',
        title: '💰 포인트 적립',
        body: '900 포인트가 적립되었습니다.',
        data: { amount: 900, orderId: 'order-2' },
        priority: 'low',
        read: true,
        clicked: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5시간 전
      },
      {
        id: 'notif-4',
        userId,
        type: 'order_completed',
        title: '✅ 주문 완료',
        body: '주문이 완료되었습니다. 맛있게 드세요!',
        data: { orderId: 'order-2', status: 'done' },
        priority: 'normal',
        read: true,
        clicked: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1일 전
      },
      {
        id: 'notif-5',
        userId,
        type: 'review_reminder',
        title: '✍️ 리뷰 작성',
        body: '오늘 식사는 어떠셨어요? 사진 리뷰 쿠폰이 기다려요.',
        data: { orderId: 'order-2' },
        priority: 'low',
        read: true,
        clicked: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2일 전
      },
      {
        id: 'notif-6',
        userId,
        type: 'promotion',
        title: '🎉 주말 특가!',
        body: '이번 주말만! 현풍닭칼국수 20% 할인',
        data: { promoCode: 'WEEKEND20' },
        priority: 'low',
        read: true,
        clicked: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
      },
    ];
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNotifications.slice(0, limit);
  }

  try {
    const { collection, query, where, orderBy, limit: firestoreLimit, getDocs } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limit)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      expiresAt: doc.data().expiresAt?.toDate(),
    })) as Notification[];
  } catch (error) {
    console.error('Failed to get notifications:', error);
    throw error;
  }
}

/**
 * 알림을 읽음으로 표시
 */
export async function markAsRead(notificationId: string): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Marking notification as read:', notificationId);
    return;
  }

  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true,
      readAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    throw error;
  }
}

/**
 * 모든 알림을 읽음으로 표시
 */
export async function markAllAsRead(userId: string): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Marking all notifications as read for user:', userId);
    return;
  }

  try {
    const { collection, query, where, getDocs, writeBatch, doc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    
    snapshot.docs.forEach((docSnapshot) => {
      batch.update(docSnapshot.ref, {
        read: true,
        readAt: new Date(),
      });
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
    throw error;
  }
}

/**
 * 알림 클릭 처리
 */
export async function markAsClicked(notificationId: string): Promise<void> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Marking notification as clicked:', notificationId);
    return;
  }

  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    await updateDoc(doc(db, 'notifications', notificationId), {
      clicked: true,
      clickedAt: new Date(),
      read: true, // 클릭 시 자동으로 읽음 처리
    });
  } catch (error) {
    console.error('Failed to mark notification as clicked:', error);
    throw error;
  }
}

/**
 * 알림 생성 (서버 전용 - Mock 시뮬레이션용)
 */
export async function createNotification(
  userId: string,
  type: NotificationType,
  customTitle?: string,
  customBody?: string,
  data?: Record<string, any>
): Promise<Notification> {
  const template = NOTIFICATION_TEMPLATES[type];
  
  const notification: Notification = {
    id: `notif-${Date.now()}`,
    userId,
    type,
    title: customTitle || template.title,
    body: customBody || template.body,
    data,
    priority: template.priority,
    read: false,
    clicked: false,
    createdAt: new Date(),
  };

  if (!USE_FIREBASE) {
    console.log('[Mock] Creating notification:', notification);
    
    // Mock: localStorage에 저장 (실제로는 서버에서 Firestore에 저장)
    const key = `notifications_${userId}`;
    const stored = localStorage.getItem(key);
    const notifications = stored ? JSON.parse(stored) : [];
    notifications.unshift(notification);
    localStorage.setItem(key, JSON.stringify(notifications.slice(0, 50))); // 최대 50개
    
    return notification;
  }

  try {
    const { collection, addDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...notification,
      createdAt: new Date(),
    });
    
    return {
      ...notification,
      id: docRef.id,
    };
  } catch (error) {
    console.error('Failed to create notification:', error);
    throw error;
  }
}

/**
 * 읽지 않은 알림 개수 조회
 */
export async function getUnreadCount(userId: string): Promise<number> {
  if (!USE_FIREBASE) {
    console.log('[Mock] Getting unread count for user:', userId);
    
    const key = `notifications_${userId}`;
    const stored = localStorage.getItem(key);
    if (!stored) return 0;
    
    const notifications = JSON.parse(stored) as Notification[];
    return notifications.filter(n => !n.read).length;
  }

  try {
    const { collection, query, where, getCountFromServer } = await import('firebase/firestore');
    const { db } = await import('./firebase');
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error('Failed to get unread count:', error);
    return 0;
  }
}
```

## 26. src/lib/points.api.ts

```typescript
/**
 * 포인트 리워드 시스템 API
 * Phase 3-3: Points System
 * 
 * Mock/Firebase 전환 가능
 */

import { USE_FIREBASE, FEATURE_FLAGS } from '../config/env';
import type {
  PointsLedger,
  PointsBalance,
  PointsHistory,
  EarnPointsParams,
  SpendPointsParams,
  PointsPolicy,
  PointsTransactionType,
} from '../types/points';

/**
 * 포인트 정책 (환경 변수 기반)
 */
export const POINTS_POLICY: PointsPolicy = {
  earnRate: FEATURE_FLAGS.pointsRate,
  minUse: FEATURE_FLAGS.pointsMinUse,
  expireDays: FEATURE_FLAGS.pointsExpireDays,
  reviewPhotoBonus: 200,
  reviewTextBonus: 100,
};

/**
 * 만료일 계산
 */
function calculateExpiryDate(): number {
  return Date.now() + (POINTS_POLICY.expireDays * 24 * 60 * 60 * 1000);
}

// ============================================================================
// Mock 구현 (localStorage)
// ============================================================================

const STORAGE_KEY_LEDGER = 'points_ledger';
const STORAGE_KEY_BALANCE = 'points_balance';

/**
 * Mock: 포인트 원장 저장
 */
function mockSaveLedger(ledger: PointsLedger[]): void {
  localStorage.setItem(STORAGE_KEY_LEDGER, JSON.stringify(ledger));
}

/**
 * Mock: 포인트 원장 로드
 */
function mockLoadLedger(): PointsLedger[] {
  const data = localStorage.getItem(STORAGE_KEY_LEDGER);
  return data ? JSON.parse(data) : [];
}

/**
 * Mock: 잔액 저장
 */
function mockSaveBalance(balances: Record<string, PointsBalance>): void {
  localStorage.setItem(STORAGE_KEY_BALANCE, JSON.stringify(balances));
}

/**
 * Mock: 잔액 로드
 */
function mockLoadBalance(): Record<string, PointsBalance> {
  const data = localStorage.getItem(STORAGE_KEY_BALANCE);
  return data ? JSON.parse(data) : {};
}

/**
 * Mock: 포인트 적립
 */
async function mockEarnPoints(params: EarnPointsParams): Promise<PointsLedger> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();

  // 새 원장 생성
  const newEntry: PointsLedger = {
    id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uid: params.uid,
    type: 'earn',
    amount: params.amount,
    ref: params.ref,
    note: params.note,
    at: Date.now(),
    expiresAt: calculateExpiryDate(),
  };

  // 원장 추가
  ledger.push(newEntry);
  mockSaveLedger(ledger);

  // 잔액 업데이트
  const currentBalance = balances[params.uid]?.balance || 0;
  balances[params.uid] = {
    uid: params.uid,
    balance: currentBalance + params.amount,
    updatedAt: Date.now(),
  };
  mockSaveBalance(balances);

  console.log(`[Points Mock] Earned ${params.amount} points for ${params.uid}`);
  return newEntry;
}

/**
 * Mock: 포인트 사용
 */
async function mockSpendPoints(params: SpendPointsParams): Promise<PointsLedger> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();

  const currentBalance = balances[params.uid]?.balance || 0;

  // 잔액 부족 체크
  if (currentBalance < params.amount) {
    throw new Error('포인트 잔액이 부족합니다');
  }

  // 최소 사용 금액 체크
  if (params.amount < POINTS_POLICY.minUse) {
    throw new Error(`최소 ${POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능합니다`);
  }

  // 새 원장 생성 (음수로 기록)
  const newEntry: PointsLedger = {
    id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uid: params.uid,
    type: 'spend',
    amount: -params.amount,
    ref: params.ref,
    note: params.note,
    at: Date.now(),
  };

  // 원장 추가
  ledger.push(newEntry);
  mockSaveLedger(ledger);

  // 잔액 업데이트
  balances[params.uid] = {
    uid: params.uid,
    balance: currentBalance - params.amount,
    updatedAt: Date.now(),
  };
  mockSaveBalance(balances);

  console.log(`[Points Mock] Spent ${params.amount} points for ${params.uid}`);
  return newEntry;
}

/**
 * Mock: 포인트 잔액 조회
 */
async function mockGetBalance(uid: string): Promise<number> {
  const balances = mockLoadBalance();
  return balances[uid]?.balance || 0;
}

/**
 * Mock: 포인트 내역 조회
 */
async function mockGetHistory(uid: string): Promise<PointsHistory> {
  const ledger = mockLoadLedger();
  const userLedger = ledger
    .filter((entry) => entry.uid === uid)
    .sort((a, b) => b.at - a.at);

  const balance = await mockGetBalance(uid);

  // 만료 예정 포인트 계산
  const now = Date.now();
  const expiringMap = new Map<number, number>();

  userLedger
    .filter((entry) => entry.type === 'earn' && entry.expiresAt && entry.expiresAt > now)
    .forEach((entry) => {
      if (entry.expiresAt) {
        const existing = expiringMap.get(entry.expiresAt) || 0;
        expiringMap.set(entry.expiresAt, existing + entry.amount);
      }
    });

  const expiringPoints = Array.from(expiringMap.entries())
    .map(([expiresAt, amount]) => ({ amount, expiresAt }))
    .sort((a, b) => a.expiresAt - b.expiresAt);

  return {
    ledger: userLedger,
    balance,
    expiringPoints,
  };
}

/**
 * Mock: 만료된 포인트 처리
 */
async function mockExpirePoints(): Promise<void> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();
  const now = Date.now();

  // 만료 대상 찾기
  const toExpire = ledger.filter(
    (entry) =>
      entry.type === 'earn' &&
      entry.expiresAt &&
      entry.expiresAt <= now &&
      !ledger.some((e) => e.ref?.kind === 'admin' && e.ref?.id === entry.id)
  );

  if (toExpire.length === 0) {
    return;
  }

  // 만료 원장 생성
  toExpire.forEach((entry) => {
    const expireEntry: PointsLedger = {
      id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      uid: entry.uid,
      type: 'expire',
      amount: -entry.amount,
      ref: {
        kind: 'admin',
        id: entry.id,
      },
      note: '포인트 만료',
      at: now,
    };

    ledger.push(expireEntry);

    // 잔액 차감
    if (balances[entry.uid]) {
      balances[entry.uid].balance -= entry.amount;
      balances[entry.uid].updatedAt = now;
    }
  });

  mockSaveLedger(ledger);
  mockSaveBalance(balances);

  console.log(`[Points Mock] Expired ${toExpire.length} point entries`);
}

/**
 * Mock: 관리자 포인트 조정
 */
async function mockAdjustPoints(
  uid: string,
  amount: number,
  note: string
): Promise<PointsLedger> {
  const ledger = mockLoadLedger();
  const balances = mockLoadBalance();

  const newEntry: PointsLedger = {
    id: `pts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uid,
    type: 'adjust',
    amount,
    ref: {
      kind: 'admin',
      id: 'admin_adjust',
    },
    note,
    at: Date.now(),
    expiresAt: amount > 0 ? calculateExpiryDate() : undefined,
  };

  ledger.push(newEntry);
  mockSaveLedger(ledger);

  const currentBalance = balances[uid]?.balance || 0;
  balances[uid] = {
    uid,
    balance: currentBalance + amount,
    updatedAt: Date.now(),
  };
  mockSaveBalance(balances);

  console.log(`[Points Mock] Adjusted ${amount} points for ${uid}`);
  return newEntry;
}

/**
 * Mock: 모든 사용자 포인트 조회 (관리자)
 */
async function mockGetAllBalances(): Promise<
  Array<PointsBalance & { phone?: string; name?: string }>
> {
  const balances = mockLoadBalance();
  
  return Object.values(balances).map((balance) => ({
    ...balance,
    phone: `010-****-****`, // Mock 데이터
    name: `사용자${balance.uid.slice(-4)}`,
  }));
}

// ============================================================================
// Firebase 구현 (TODO)
// ============================================================================

async function firebaseEarnPoints(params: EarnPointsParams): Promise<PointsLedger> {
  // TODO: Firestore에 원장 추가 및 잔액 업데이트
  throw new Error('Firebase points not implemented yet');
}

async function firebaseSpendPoints(params: SpendPointsParams): Promise<PointsLedger> {
  // TODO: Firestore에서 트랜잭션으로 처리
  throw new Error('Firebase points not implemented yet');
}

async function firebaseGetBalance(uid: string): Promise<number> {
  // TODO: Firestore에서 잔액 조회
  throw new Error('Firebase points not implemented yet');
}

async function firebaseGetHistory(uid: string): Promise<PointsHistory> {
  // TODO: Firestore에서 원장 조회
  throw new Error('Firebase points not implemented yet');
}

async function firebaseExpirePoints(): Promise<void> {
  // TODO: Cloud Function으로 스케줄링
  throw new Error('Firebase points not implemented yet');
}

async function firebaseAdjustPoints(
  uid: string,
  amount: number,
  note: string
): Promise<PointsLedger> {
  // TODO: Firestore에 관리자 조정 기록
  throw new Error('Firebase points not implemented yet');
}

async function firebaseGetAllBalances(): Promise<
  Array<PointsBalance & { phone?: string; name?: string }>
> {
  // TODO: Firestore에서 모든 잔액 조회
  throw new Error('Firebase points not implemented yet');
}

// ============================================================================
// Public API (Mock/Firebase 전환)
// ============================================================================

/**
 * 포인트 적립
 */
export async function earnPoints(params: EarnPointsParams): Promise<PointsLedger> {
  if (!FEATURE_FLAGS.points) {
    throw new Error('포인트 기능이 비활성화되어 있습니다');
  }

  return USE_FIREBASE ? firebaseEarnPoints(params) : mockEarnPoints(params);
}

/**
 * 포인트 사용
 */
export async function spendPoints(params: SpendPointsParams): Promise<PointsLedger> {
  if (!FEATURE_FLAGS.points) {
    throw new Error('포인트 기능이 비활성화되어 있습니다');
  }

  return USE_FIREBASE ? firebaseSpendPoints(params) : mockSpendPoints(params);
}

/**
 * 포인트 잔액 조회
 */
export async function getPointsBalance(uid: string): Promise<number> {
  if (!FEATURE_FLAGS.points) {
    return 0;
  }

  return USE_FIREBASE ? firebaseGetBalance(uid) : mockGetBalance(uid);
}

/**
 * 포인트 내역 조회
 */
export async function getPointsHistory(uid: string): Promise<PointsHistory> {
  if (!FEATURE_FLAGS.points) {
    return { ledger: [], balance: 0, expiringPoints: [] };
  }

  return USE_FIREBASE ? firebaseGetHistory(uid) : mockGetHistory(uid);
}

/**
 * 만료된 포인트 처리 (크론잡)
 */
export async function expirePoints(): Promise<void> {
  if (!FEATURE_FLAGS.points) {
    return;
  }

  return USE_FIREBASE ? firebaseExpirePoints() : mockExpirePoints();
}

/**
 * 관리자: 포인트 조정
 */
export async function adjustPoints(
  uid: string,
  amount: number,
  note: string
): Promise<PointsLedger> {
  if (!FEATURE_FLAGS.points) {
    throw new Error('포인트 기능이 비활성화되어 있습니다');
  }

  return USE_FIREBASE
    ? firebaseAdjustPoints(uid, amount, note)
    : mockAdjustPoints(uid, amount, note);
}

/**
 * 관리자: 모든 사용자 포인트 조회
 */
export async function getAllPointsBalances(): Promise<
  Array<PointsBalance & { phone?: string; name?: string }>
> {
  if (!FEATURE_FLAGS.points) {
    return [];
  }

  return USE_FIREBASE ? firebaseGetAllBalances() : mockGetAllBalances();
}

/**
 * 주문 금액에 따른 적립 포인트 계산
 */
export function calculateEarnPoints(orderAmount: number): number {
  return Math.floor(orderAmount * POINTS_POLICY.earnRate);
}

/**
 * 리뷰 작성 시 적립 포인트 계산
 */
export function calculateReviewPoints(hasPhoto: boolean): number {
  return hasPhoto ? POINTS_POLICY.reviewPhotoBonus : POINTS_POLICY.reviewTextBonus;
}
```

## 27. src/lib/admin/menuImages.api.ts

```typescript
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../firebase';
import { processImage, validateImageFile } from '../imageUtils';

/**
 * 메뉴 이미지 업로드: menus/{menuId}/{fileName}
 * Firebase Storage SDK만 사용 (CORS 문제 방지)
 * @param menuId 메뉴 ID
 * @param file 업로드할 파일 또는 처리된 Blob
 * @param fileName 저장할 파일명 (기본값: image.webp, 타임스탬프 추가 가능)
 */
export async function uploadMenuImage(
  menuId: string, 
  file: File | Blob, 
  fileName: string = 'image.webp'
): Promise<string> {
  let processed: Blob;

  // File인 경우 검증 및 처리
  if (file instanceof File) {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    processed = await processImage(file, {
      maxWidth: 1600,
      outputFormat: 'webp',
      quality: 0.86,
    });
  } else {
    // 이미 처리된 Blob인 경우 그대로 사용
    processed = file;
  }

  // Firebase Storage SDK 인스턴스 사용
  const storage = getStorage(app);
  const objectRef = ref(storage, `menus/${menuId}/${fileName}`);
  
  await uploadBytes(objectRef, processed, { contentType: 'image/webp' });
  return await getDownloadURL(objectRef);
}

/**
 * 메뉴 이미지 삭제
 */
export async function deleteMenuImage(menuId: string): Promise<void> {
  const storage = getStorage(app);
  const storageRef = ref(storage, `menus/${menuId}/image.webp`);
  try {
    await deleteObject(storageRef);
  } catch {
    // 존재하지 않아도 무시
  }
}
```

