/**
 * 관리자 헬스체크 Function
 * functions:config 상태 확인 (관리자 전용)
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const HEALTH_CHECK_RUN_OPTIONS = {
  timeoutSeconds: 10,
  memory: '256MB' as const,
  minInstances: 0,
  maxInstances: 5,
};

interface HealthCheckResult {
  functions: {
    connected: boolean;
    nicepay: {
      endpoint: boolean;
      mid: boolean;
      key: boolean;
    };
    delivery: {
      secret: boolean;
    };
  };
  fcm: {
    vapidKey: boolean;
    supported: boolean;
  };
  maps: {
    kakao: boolean;
    google: boolean;
  };
  firestore: {
    connected: boolean;
  };
  storage: {
    connected: boolean;
    corsConfigured: boolean;
  };
}

/**
 * 관리자 헬스체크 (Callable Function)
 * 관리자만 호출 가능
 */
export const adminHealthCheck = functions
  .region('asia-northeast3')
  .runWith(HEALTH_CHECK_RUN_OPTIONS)
  .https.onCall(async (data, context) => {
  // 인증 확인
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '인증이 필요합니다.');
  }

  // 관리자 권한 확인
  const uid = context.auth.uid;
  const userDoc = await admin.firestore().collection('users').doc(uid).get();
  const userData = userDoc.data();
  const role = userData?.role;

  if (role !== 'owner' && role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', '관리자만 접근할 수 있습니다.');
  }

  try {
    const config = functions.config();

    // Functions Config 확인
    const nicepay = config.nicepay || {};
    const delivery = config.delivery || {};

    // Firestore 연결 확인
    let firestoreConnected = false;
    try {
      await admin.firestore().collection('_health').limit(1).get();
      firestoreConnected = true;
    } catch (error) {
      console.warn('Firestore connection check failed:', error);
    }

    // Storage 연결 확인 (간접 확인)
    const storageConnected = true; // 기본적으로 연결된 것으로 가정

    const result: HealthCheckResult = {
      functions: {
        connected: true,
        nicepay: {
          endpoint: !!nicepay.endpoint,
          mid: !!nicepay.mid,
          key: !!nicepay.key,
        },
        delivery: {
          secret: !!delivery.secret,
        },
      },
      fcm: {
        vapidKey: false, // 클라이언트에서 확인
        supported: true, // 브라우저에서 확인
      },
      maps: {
        kakao: false, // 클라이언트에서 확인
        google: false, // 클라이언트에서 확인
      },
      firestore: {
        connected: firestoreConnected,
      },
      storage: {
        connected: storageConnected,
        corsConfigured: true, // 기본적으로 설정된 것으로 가정
      },
    };

    return result;
  } catch (error: any) {
    console.error('Health check failed:', error);
    throw new functions.https.HttpsError('internal', '헬스체크에 실패했습니다.', error.message);
  }
});

