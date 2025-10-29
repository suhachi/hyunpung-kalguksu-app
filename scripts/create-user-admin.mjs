/**
 * Firebase Admin SDK를 사용하여 Firestore 사용자 문서 생성
 * 실행: node scripts/create-user-admin.mjs
 */

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Firebase 프로젝트 ID
const projectId = 'hp-kal';

// Admin SDK 초기화 (애플리케이션 기본 자격 증명 사용)
// gcloud auth application-default login 후 실행 필요
try {
  // 기본 자격 증명으로 초기화 시도
  admin.initializeApp({
    projectId: projectId,
    credential: admin.credential.applicationDefault(),
  });
} catch (error) {
  console.error('❌ Firebase Admin 초기화 실패:', error.message);
  console.log('\n💡 해결 방법:');
  console.log('1. gcloud auth application-default login 실행');
  console.log('2. 또는 Firebase Console에서 직접 생성');
  process.exit(1);
}

const db = admin.firestore();

async function createUserDocument() {
  const userId = 'ukjp1Q5vRHSGUhi37w8FFLeARu82';
  const userData = {
    role: 'owner',
    email: 'admin@hp-kal.com',
    name: '관리자',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    console.log('📝 사용자 문서 생성 중...');
    console.log(`경로: users/${userId}`);
    console.log('데이터:', userData);
    
    await db.collection('users').doc(userId).set(userData);
    
    console.log('✅ 사용자 문서 생성 성공!');
    console.log('\n생성된 문서:');
    console.log(`- 경로: users/${userId}`);
    console.log(`- role: ${userData.role}`);
    console.log(`- email: ${userData.email}`);
    console.log(`- name: ${userData.name}`);
    
    // 생성 확인
    const doc = await db.collection('users').doc(userId).get();
    if (doc.exists) {
      console.log('\n✅ 문서 확인 완료:', doc.data());
    }
  } catch (error) {
    console.error('❌ 사용자 문서 생성 실패:', error);
    console.error('오류 상세:', error.message);
    process.exit(1);
  }
}

createUserDocument()
  .then(() => {
    console.log('\n✅ 스크립트 완료');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ 스크립트 실행 실패:', error);
    process.exit(1);
  });

