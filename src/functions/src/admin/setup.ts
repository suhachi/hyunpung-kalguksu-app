import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const RUN_OPTIONS = {
  timeoutSeconds: 30,
  memory: '256MB' as const,
  minInstances: 0,
  maxInstances: 5,
};

// 관리자 계정/역할 설정 임시 엔드포인트 (1회용 토큰 필요)
export const adminSetup = functions
  .region('asia-northeast3')
  .runWith(RUN_OPTIONS)
  .https.onRequest(async (req, res) => {
    try {
      if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type, x-setup-token');
        res.status(204).send('');
        return;
      }

      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
      }

      const token = (req.headers['x-setup-token'] as string) || String(req.query.token || '');
      const expected = (functions.config()?.admin && functions.config().admin.setup_token) || process.env.ADMIN_SETUP_TOKEN || '';

      if (!expected || !token || token !== expected) {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      const { email, role } = (req.body || {}) as { email?: string; role?: string };
      if (!email) {
        res.status(400).json({ error: 'email is required' });
        return;
      }
      const targetRole = (role || 'owner').toLowerCase();

      // 사용자 조회 또는 생성
      let user = null as admin.auth.UserRecord | null;
      try {
        user = await admin.auth().getUserByEmail(email);
      } catch (_) {
        user = null;
      }
      if (!user) {
        user = await admin.auth().createUser({ email, password: 'test1234', emailVerified: true, disabled: false });
      }

      // 커스텀 클레임 설정
      await admin.auth().setCustomUserClaims(user.uid, { role: targetRole });

      // Firestore 사용자 문서 업데이트
      const db = admin.firestore();
      await db.collection('users').doc(user.uid).set(
        {
          email,
          role: targetRole,
          status: 'active',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      res.status(200).json({ ok: true, uid: user.uid, email, role: targetRole });
    } catch (error: any) {
      console.error('[adminSetup] error:', error);
      res.status(500).json({ error: error?.message || 'internal error' });
    }
  });


