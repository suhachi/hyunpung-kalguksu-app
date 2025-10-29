import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ChevronRight, CloudSun, Star, Settings, Gift, Ticket } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { FEATURE_FLAGS } from '../../config/env';

export function Home() {
  const navigate = useNavigate();

  // 개발자 전용: 관리자 권한으로 전환
  const handleAdminAccess = (path: string) => {
    localStorage.setItem('mockRole', 'owner');
    navigate(path);
  };
  return (
    <div className="space-y-6">
      {/* 히어로 섹션 */}
      <section className="relative h-[300px] bg-gradient-to-b from-[#D61C1C] to-[#F37021]/20 mt-6">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-3xl mb-4 text-center drop-shadow-lg">현풍닭칼국수</h1>
          <p className="text-lg text-center drop-shadow-md opacity-90">
            정성껏 끓여낸 진한 국물과 쫄깃한 수타면
          </p>
          <Button 
            onClick={() => navigate('/menu')} 
            size="lg" 
            className="mt-6 bg-white text-[#D61C1C] hover:bg-gray-100"
          >
            메뉴 보러가기
          </Button>
        </div>
      </section>
      
      <div className="px-4 space-y-6">
        {/* 영업 상태 */}
        <div className="flex items-center gap-2 p-4 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-center w-3 h-3">
            <span className="w-full h-full bg-green-500 rounded-full animate-pulse" />
          </div>
          <span className="text-sm text-[#2E1C10]">
            영업중
          </span>
          <span className="text-sm text-[#2E1C10]/60">
            10:00 - 22:00
          </span>
        </div>
        
        {/* 빠른 액션 */}
        <div className="grid grid-cols-2 gap-3">
          {FEATURE_FLAGS.points && (
            <Link 
              to="/points" 
              className="p-4 bg-gradient-to-br from-[#D61C1C] to-[#F37021] rounded-2xl shadow-sm text-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <Gift className="w-6 h-6" />
                <ChevronRight className="w-5 h-5" />
              </div>
              <p className="text-sm opacity-90 mb-1">내 포인트</p>
              <p className="text-xl">0P</p>
            </Link>
          )}
          
          <Link 
            to="/coupons" 
            className="p-4 bg-gradient-to-br from-[#F37021] to-[#C7A45A] rounded-2xl shadow-sm text-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <Ticket className="w-6 h-6" />
              <ChevronRight className="w-5 h-5" />
            </div>
            <p className="text-sm opacity-90 mb-1">내 쿠폰</p>
            <p className="text-xl">0개</p>
          </Link>
        </div>
        
        {/* 날씨 기반 추천 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CloudSun className="w-5 h-5 text-[#F37021]" />
            <h2 className="text-[#2E1C10]">
              오늘의 추천 메뉴
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RecommendCard
              name="현풍닭칼국수"
              price={9000}
              image="https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBub29kbGUlMjBzb3VwfGVufDF8fHx8MTc2MTYyMzMxOXww&ixlib=rb-4.1.0&q=80&w=1080"
              badge="베스트"
            />
            <RecommendCard
              name="수육 (중)"
              price={20000}
              image="https://images.unsplash.com/photo-1645530656505-1b8a4057889b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBwb3JrJTIwYmVsbHl8ZW58MXx8fHwxNzYxNjIzMzE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            />
          </div>
        </section>
        
        {/* 리뷰 하이라이트 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-[#F37021] text-[#F37021]" />
              <h2 className="text-[#2E1C10]">고객 리뷰</h2>
            </div>
            <Link to="/reviews" className="text-sm text-[#D61C1C] flex items-center gap-1">
              전체보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F37021] text-[#F37021]" />
                ))}
              </div>
              <span className="text-sm text-[#2E1C10]/60">김고객 님</span>
            </div>
            <p className="text-sm text-[#2E1C10] mb-3">
              칼국수 진짜 맛있어요! 국물이 진하고 면발도 쫄깃해요. 닭고기도 부드럽고 양도 푸짐합니다.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800"
                  alt="리뷰 사진"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800"
                  alt="리뷰 사진"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* 공지사항 */}
        <section className="p-4 bg-[#F37021]/10 rounded-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-[#F37021] text-[#F37021]">
                  공지
                </Badge>
                <span className="text-xs text-[#2E1C10]/60">
                  2024.10.28
                </span>
              </div>
              <h3 className="text-sm text-[#2E1C10] mb-1">
                사진 리뷰 쓰고 3,000원 쿠폰 받으세요!
              </h3>
              <p className="text-sm text-[#2E1C10]/60">
                사진과 함께 리뷰를 남겨주시면 다음 주문에 사용 가능한 쿠폰을 드립니다.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#2E1C10]/40 flex-shrink-0" />
          </div>
        </section>
        
        {/* CTA 버튼 */}
        <Link to="/menu">
          <Button 
            size="lg"
            className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          >
            메뉴 보기
          </Button>
        </Link>
        
        {/* 개발자 전용: 관리자 페이지 바로가기 */}
        {/* TODO: 배포 전 삭제 필요 */}
        <div className="mt-4 p-4 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <p className="text-xs text-gray-500 mb-2 text-center">개발자 전용</p>
          <Button 
            variant="outline"
            size="sm"
            className="w-full border-gray-400 text-gray-700 hover:bg-gray-200"
            onClick={() => handleAdminAccess('/admin/dashboard')}
          >
            <Settings className="w-4 h-4 mr-2" />
            관리자 대시보드
          </Button>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button 
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => handleAdminAccess('/admin/orders')}
            >
              주문 관리
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => handleAdminAccess('/admin/reviews')}
            >
              리뷰 관리
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RecommendCardProps {
  name: string;
  price: number;
  image: string;
  badge?: string;
}

function RecommendCard({ name, price, image, badge }: RecommendCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="aspect-square bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {badge && (
            <Badge className="bg-[#D61C1C] text-white text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <h3 className="text-sm text-[#2E1C10] mb-1">
          {name}
        </h3>
        <p className="text-[#D61C1C]">
          {price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
