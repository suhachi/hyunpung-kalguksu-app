import { Heart, Shield, Award, Crown } from 'lucide-react';

export function BrandPhilosophy() {
  const values = [
    {
      icon: Heart,
      title: '건강',
      description: '정직한 식재료로 만드는 건강한 한 그릇',
      color: '#D61C1C'
    },
    {
      icon: Shield,
      title: '신뢰',
      description: '1992년부터 지켜온 신의와 정성',
      color: '#F37021'
    },
    {
      icon: Award,
      title: '전통',
      description: '전통의 제면 방식과 깊은 육수',
      color: '#C7A45A'
    },
    {
      icon: Crown,
      title: '정직',
      description: '변함없는 맛과 품질의 약속',
      color: '#D61C1C'
    }
  ];

  return (
    <section id="philosophy" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#D61C1C] text-white rounded-full mb-4 text-sm">
            BRAND PHILOSOPHY
          </div>
          <h1 className="text-[#2E1C10] mb-6">브랜드 아이덴티티</h1>
          <p className="text-[#F37021] text-xl mb-4">Fine Korean Noodle · Since 1992</p>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            "신뢰할 수 있는 칼국수를 만드는 기업"<br/>
            '신(信)'은 신뢰를, '칼(刃)'은 칼국수를 뜻하며,<br/>
            '신의와 정성을 지키는 칼국수'를 의미합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-[#F9F6F3] p-8 rounded-lg text-center hover:shadow-xl transition-all"
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${value.color}20` }}
              >
                <value.icon className="w-8 h-8" style={{ color: value.color }} />
              </div>
              <h3 className="text-[#2E1C10] mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#D61C1C] to-[#F37021] text-white p-12 rounded-2xl text-center">
          <h2 className="mb-4">브랜드 메시지</h2>
          <p className="text-2xl mb-2">"한 끼의 진심, 신의로 담다"</p>
          <p className="text-white/90">신뢰와 정성으로 한 그릇을 완성하다</p>
        </div>
      </div>
    </section>
  );
}
