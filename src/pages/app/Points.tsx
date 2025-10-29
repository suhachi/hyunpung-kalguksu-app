/**
 * 고객용 포인트 페이지
 * Phase 3-3: Points System
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Skeleton } from '../../components/ui/skeleton';
import { getPointsHistory, POINTS_POLICY } from '../../lib/points.api';
import { FEATURE_FLAGS } from '../../config/env';
import type { PointsHistory, PointsLedger } from '../../types/points';

export default function Points() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<PointsHistory | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);
      const data = await getPointsHistory(uid);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load points history:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!FEATURE_FLAGS.points) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            포인트 기능이 비활성화되어 있습니다.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1">내 포인트</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* 포인트 잔액 카드 */}
        <Card className="bg-gradient-to-br from-[#D61C1C] to-[#F37021] text-white">
          <CardHeader>
            <CardDescription className="text-white/80">보유 포인트</CardDescription>
            <CardTitle className="text-4xl">
              {loading ? (
                <Skeleton className="h-12 w-40 bg-white/20" />
              ) : (
                <>{history?.balance.toLocaleString()}P</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Gift className="w-4 h-4" />
              <span>
                {POINTS_POLICY.minUse.toLocaleString()}P부터 사용 가능
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 만료 예정 포인트 */}
        {!loading && history && history.expiringPoints.length > 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <div className="space-y-1">
                {history.expiringPoints.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {new Date(item.expiresAt).toLocaleDateString()} 만료 예정
                    </span>
                    <span className="font-medium">
                      {item.amount.toLocaleString()}P
                    </span>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* 포인트 적립 정책 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">포인트 적립 혜택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">주문 시 적립</span>
              <span className="font-medium text-[#D61C1C]">
                {(POINTS_POLICY.earnRate * 100).toFixed(1)}%
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">사진 리뷰 작성</span>
              <span className="font-medium text-[#D61C1C]">
                +{POINTS_POLICY.reviewPhotoBonus.toLocaleString()}P
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">일반 리뷰 작성</span>
              <span className="font-medium text-[#D61C1C]">
                +{POINTS_POLICY.reviewTextBonus.toLocaleString()}P
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">포인트 유효기간</span>
              <span className="font-medium text-gray-700">
                {POINTS_POLICY.expireDays}일
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 포인트 내역 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">포인트 내역</CardTitle>
            <CardDescription>
              최근 포인트 적립 및 사용 내역
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : history && history.ledger.length > 0 ? (
              <div className="space-y-3">
                {history.ledger.map((entry) => (
                  <PointsHistoryItem key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>아직 포인트 내역이 없습니다</p>
                <p className="text-sm mt-2">
                  주문하고 포인트를 적립해보세요!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * 포인트 내역 아이템
 */
function PointsHistoryItem({ entry }: { entry: PointsLedger }) {
  const isPositive = entry.amount > 0;
  const isExpired = entry.type === 'expire';

  const getIcon = () => {
    if (isExpired) return <Clock className="w-5 h-5 text-gray-400" />;
    if (isPositive) return <TrendingUp className="w-5 h-5 text-green-600" />;
    return <TrendingDown className="w-5 h-5 text-red-600" />;
  };

  const getLabel = () => {
    switch (entry.type) {
      case 'earn':
        return entry.ref?.kind === 'order' ? '주문 적립' :
               entry.ref?.kind === 'review' ? '리뷰 적립' : '적립';
      case 'spend':
        return '포인트 사용';
      case 'expire':
        return '포인트 만료';
      case 'adjust':
        return '관리자 조정';
      default:
        return entry.type;
    }
  };

  const getColor = () => {
    if (isExpired) return 'text-gray-600';
    if (isPositive) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0">{getIcon()}</div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium">{getLabel()}</p>
          {entry.type === 'earn' && entry.expiresAt && (
            <Badge variant="outline" className="text-xs">
              {new Date(entry.expiresAt).toLocaleDateString()} 만료
            </Badge>
          )}
        </div>
        
        {entry.note && (
          <p className="text-sm text-gray-600 truncate">{entry.note}</p>
        )}
        
        <p className="text-xs text-gray-500">
          {new Date(entry.at).toLocaleString()}
        </p>
      </div>
      
      <div className={`font-medium ${getColor()}`}>
        {isPositive ? '+' : ''}
        {entry.amount.toLocaleString()}P
      </div>
    </div>
  );
}
