import { Heart, Utensils, Award, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const BRAND_IDENTITY_URL = 'https://images.unsplash.com/photo-1701009203098-3bab61afe474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtvcmVhbiUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxNzA0NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080';

export function BrandStory() {
  const values = [
    {
      icon: Heart,
      title: '신뢰',
      description: '정직한 식재료와 깊은 육수로 만드는 한 그릇',
      color: '#D61C1C'
    },
    {
      icon: Utensils,
      title: '전통',
      description: '1992년부터 이어온 전통의 제면 방식',
      color: '#F37021'
    },
    {
      icon: Award,
      title: '정직',
      description: '신의를 지키는 정직한 한 끼를 제공',
      color: '#C7A45A'
    },
    {
      icon: Users,
      title: '따뜻함',
      description: '가족처럼 따뜻하게 대접하는 마음',
      color: '#D61C1C'
    }
  ];

  return (
    <section id="brand" className="py-20 bg-[#F9F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#2E1C10] mb-4">브랜드 스토리</h2>
          <p className="text-[#F37021] mb-2">SHIN KAL · Fine Korean Noodle</p>
          <p className="text-gray-700 max-w-3xl mx-auto">
            "신뢰할 수 있는 칼국수를 만드는 기업"<br/>
            ㈜지앤씨신칼은 2021년 사명을 변경하며, '칼국수의 대중화와 세계화'를 목표로<br/>
            정직한 식재료와 깊은 육수, 전통의 제면 방식을 고수하고 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <ImageWithFallback 
              src={BRAND_IDENTITY_URL} 
              alt="현풍닭칼국수 브랜드 아이덴티티" 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div>
            <div className="mb-8">
              <h3 className="text-[#2E1C10] mb-4">브랜드 철학</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                '신(信)'은 신뢰를, '칼(刃)'은 칼국수를 뜻하며,<br/>
                '신의와 정성을 지키는 칼국수'를 의미합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                매장 식기는 전통 황동그릇을 사용하며,<br/>
                모든 메뉴는 <span className="text-[#D61C1C]">'정직한 한 끼'</span>를 상징합니다.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#D61C1C] rounded-full"></div>
                <span className="text-gray-700">설립연도: 1992년 (상호명 '신칼')</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#F37021] rounded-full"></div>
                <span className="text-gray-700">운영법인: ㈜지앤씨신칼</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#C7A45A] rounded-full"></div>
                <span className="text-gray-700">본사: 대구광역시 달성군 현풍면</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${value.color}20` }}
              >
                <value.icon className="w-8 h-8" style={{ color: value.color }} />
              </div>
              <h4 className="text-[#2E1C10] mb-2">{value.title}</h4>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
