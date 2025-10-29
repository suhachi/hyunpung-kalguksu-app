import heroImage from 'figma:asset/f881b2d8bf23006ccae73c3d977f87a2e2dccf47.png';

export function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-[#D61C1C] rounded-full mb-4">
              FINE KOREAN NOODLE · SINCE 1992
            </div>
          </div>
          <p className="text-xl mb-4 text-[#F37021]">한 끼의 진심, 신의로 담다</p>
          <p className="text-gray-200 mb-8 leading-relaxed">
            공정하고 바람직한 시장 환경 속에서 맛집답게도 가가 20년 동안 신의와 정성은 변함이 없습니다
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-[#D61C1C] text-white rounded-lg hover:bg-[#b71616] transition-colors">
              메뉴 보기
            </button>
            <button className="px-8 py-3 bg-white text-[#D61C1C] rounded-lg hover:bg-gray-100 transition-colors">
              창업 상담
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
