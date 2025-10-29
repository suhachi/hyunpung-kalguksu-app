import { Download } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const LOGO_SYMBOL_URL = 'https://images.unsplash.com/photo-1726293534804-13edb56db7aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwbG9nbyUyMHN5bWJvbHxlbnwxfHx8fDE3NjE3MDQ1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080';
const LOGO_FULL_URL = 'https://images.unsplash.com/photo-1694020868262-d01a54b45a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nbyUyMGRlc2lnbnxlbnwxfHx8fDE3NjE3MDQ1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080';

export function LogoSystem() {
  const logoVariations = [
    {
      title: 'Full Signature',
      subtitle: '기본 로고 (심볼 + 한글)',
      image: LOGO_FULL_URL,
      usage: '기본 간판, 웹사이트 헤더, 공식 문서',
      bgColor: 'white'
    },
    {
      title: 'Symbol Only',
      subtitle: '심볼 로고 (원형 마크)',
      image: LOGO_SYMBOL_URL,
      usage: '포장용기, SNS 프로필, 아이콘',
      bgColor: 'white'
    },
    {
      title: 'Symbol Only',
      subtitle: '심볼 로고 (미색 배경)',
      image: LOGO_SYMBOL_URL,
      usage: '미색/베이지 배경 적용 시',
      bgColor: '#F9F6F3'
    }
  ];

  return (
    <section id="logo" className="py-20 bg-[#F9F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#F37021] text-white rounded-full mb-4 text-sm">
            LOGO SYSTEM
          </div>
          <h2 className="text-[#2E1C10] mb-4">로고 시스템</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            현풍닭칼국수의 브랜드 아이덴티티를 대표하는 로고 시스템입니다.<br/>
            상황과 매체에 따라 적절한 로고를 선택하여 사용하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {logoVariations.map((logo, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div 
                className="p-12 flex items-center justify-center min-h-[280px]"
                style={{ backgroundColor: logo.bgColor }}
              >
                <ImageWithFallback 
                  src={logo.image} 
                  alt={logo.title}
                  className="max-w-full h-auto"
                  style={{ maxHeight: '180px' }}
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-[#2E1C10] mb-1">{logo.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{logo.subtitle}</p>
                <p className="text-sm text-gray-700 mb-4">{logo.usage}</p>
                <button className="w-full py-2 border border-[#D61C1C] text-[#D61C1C] rounded-lg hover:bg-[#D61C1C] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  다운로드
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8">
          <h3 className="text-[#2E1C10] mb-6">로고 의미 & 구성</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-[#F9F6F3] p-6 rounded-lg mb-4">
                <h4 className="text-[#D61C1C] mb-3">SHIN KAL 심볼</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F37021] mt-1">•</span>
                    <span>왕관(Crown): 프리미엄 품질과 전통의 권위</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F37021] mt-1">•</span>
                    <span>레드 & 오렌지 리본: 열정과 따뜻함</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F37021] mt-1">•</span>
                    <span>원형 배지: 신뢰와 완전함의 상징</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="bg-[#F9F6F3] p-6 rounded-lg mb-4">
                <h4 className="text-[#D61C1C] mb-3">한글 로고 타입</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F37021] mt-1">•</span>
                    <span>손글씨체: 전통과 정성의 감성 표현</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F37021] mt-1">•</span>
                    <span>'닭(赤)' 강조: 브랜드 핵심 메뉴 시각화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F37021] mt-1">•</span>
                    <span>닭 아이콘 삽입: 친근하고 직관적인 메시지</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
