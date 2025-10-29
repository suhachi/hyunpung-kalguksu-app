#!/bin/bash

###############################################################################
# Firebase 배포 스크립트
# 현풍닭칼국수 PWA - Functions, Rules, Indexes 일괄 배포
###############################################################################

set -e  # 오류 발생 시 중단

echo "======================================"
echo "Firebase 배포 시작"
echo "======================================"
echo ""

# 1. Functions 빌드 및 배포
echo "📦 Step 1: Firebase Functions 빌드 및 배포"
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
echo "✅ Functions 배포 완료"
echo ""

# 2. Firestore Rules 배포
echo "🔒 Step 2: Firestore Rules 배포"
firebase deploy --only firestore:rules
echo "✅ Firestore Rules 배포 완료"
echo ""

# 3. Firestore Indexes 배포
echo "📇 Step 3: Firestore Indexes 배포"
firebase deploy --only firestore:indexes
echo "✅ Firestore Indexes 배포 완료"
echo ""

# 4. Storage Rules 배포
echo "🗄️  Step 4: Storage Rules 배포"
firebase deploy --only storage
echo "✅ Storage Rules 배포 완료"
echo ""

echo "======================================"
echo "✨ 모든 Firebase 리소스 배포 완료!"
echo "======================================"
echo ""
echo "다음 명령어로 Functions 로그를 확인하세요:"
echo "  firebase functions:log"
echo ""
echo "Functions 설정 (NICEPAY):"
echo "  firebase functions:config:set nice.mid=\"YOUR_MID\" nice.key=\"YOUR_KEY\" nice.site=\"YOUR_SITE\""
echo ""
