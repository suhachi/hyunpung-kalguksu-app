/**
 * Firestore에 사용자 문서 생성 스크립트
 * 실행: node scripts/create-user-doc.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// .env 파일 읽기
function loadEnv() {
  try {
    const envContent = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        env[key.trim()] = valueParts.join('=').trim();
      }
    });
    return env;
  } catch (error) {
    console.error('❌ .env 파일을 읽을 수 없습니다:', error.message);
    process.exit(1);
  }
}

const env = loadEnv();

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyCM3AZF1REwj22E6GsSOmHRcXwxu19T6f4",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "hp-kal.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "hp-kal",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "hp-kal.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "742663074507",
  appId: env.VITE_FIREBASE_APP_ID || "1:742663074507:web:dcc8fdabf58bd4bf48214e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createUserDocument() {
  const userId = 'ukjp1Q5vRHSGUhi37w8FFLeARu82';
  const userData = {
    role: 'owner',
    email: 'admin@hp-kal.com',
    name: '관리자',
  };

  try {
    console.log('📝 사용자 문서 생성 중...');
    console.log(`경로: users/${userId}`);
    console.log('데이터:', userData);
    
    await setDoc(doc(db, 'users', userId), userData);
    
    console.log('✅ 사용자 문서 생성 성공!');
    console.log('\n생성된 문서:');
    console.log(`- 경로: users/${userId}`);
    console.log(`- role: ${userData.role}`);
    console.log(`- email: ${userData.email}`);
    console.log(`- name: ${userData.name}`);
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

