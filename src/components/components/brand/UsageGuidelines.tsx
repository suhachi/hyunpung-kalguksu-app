import { Check, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const LOGO_SYMBOL_URL = 'https://images.unsplash.com/photo-1726293534804-13edb56db7aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwbG9nbyUyMHN5bWJvbHxlbnwxfHx8fDE3NjE3MDQ1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080';

export function UsageGuidelines() {
  const doList = [
    '충분한 여백(Clear Space)을 확보하세요',
    '지정된 컬러 시스템을 사용하세요',
    '로고의 원본 비율을 유지하세요',
    '고해상도 원본 파일을 사용하세요',
    '배경과의 충분한 대비를 확인하세요'
  ];

  const dontList = [
    '로고의 색상을 임의로 변경하지 마세요',
    '로고의 비율을 왜곡하지 마세요',
    '그라데이션을 추가하지 마세요',
    '윤곽선(Outline)을 추가하지 마세요',
    '로고를 회전시키거나 기울이지 마세요',
    '복잡한 배경 위에 로고를 배치하지 마세요'
  ];

  return (
    <section id="guidelines" className="py-20 bg-[#F9F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#2E1C10] text-white rounded-full mb-4 text-sm">
            USAGE GUIDELINES
          </div>
          <h2 className="text-[#2E1C10] mb-4">사용 가이드라인</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            브랜드 아이덴티티의 일관성을 유지하기 위한 필수 규정입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-[#2E1C10]">올바른 사용 (DO)</h3>
            </div>
            <ul className="space-y-3">
              {doList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-[#2E1C10]">금지 사항 (DON'T)</h3>
            </div>
            <ul className="space-y-3">
              {dontList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h3 className="text-[#2E1C10] mb-6">Clear Space (여백 규정)</h3>
          <div className="bg-[#F9F6F3] p-12 rounded-lg">
            <div className="max-w-md mx-auto relative">
              <ImageWithFallback src={LOGO_SYMBOL_URL} alt="로고 여백 가이드" className="w-full" />
              <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-8 border-t-2 border-l-2 border-r-2 border-dashed border-[#D61C1C] opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-8 border-b-2 border-l-2 border-r-2 border-dashed border-[#D61C1C] opacity-50"></div>
                <div className="absolute top-0 left-0 h-full w-8 border-l-2 border-t-2 border-b-2 border-dashed border-[#D61C1C] opacity-50"></div>
                <div className="absolute top-0 right-0 h-full w-8 border-r-2 border-t-2 border-b-2 border-dashed border-[#D61C1C] opacity-50"></div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-6">
              로고 높이의 최소 1/4 이상의 여백을 확보하세요
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#D61C1C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📏</span>
            </div>
            <h4 className="text-[#2E1C10] mb-2">최소 사이즈</h4>
            <p className="text-sm text-gray-600">
              인쇄물: 20mm 이상<br/>
              디지털: 80px 이상
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#F37021]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h4 className="text-[#2E1C10] mb-2">배경 사용</h4>
            <p className="text-sm text-gray-600">
              화이트, 미색배경 권장<br/>
              복잡한 패턴 배경 금지
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#C7A45A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💾</span>
            </div>
            <h4 className="text-[#2E1C10] mb-2">파일 형식</h4>
            <p className="text-sm text-gray-600">
              인쇄: AI, PDF, EPS<br/>
              디지털: PNG, SVG
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
