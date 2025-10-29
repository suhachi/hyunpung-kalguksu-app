import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function ColorSystem() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = [
    {
      role: 'Primary',
      name: '현풍레드',
      nameEn: 'Hyunpung Red',
      hex: '#D61C1C',
      rgb: '214, 28, 28',
      cmyk: '0, 87, 87, 16',
      usage: "브랜드 대표색, '닭' 글자, 주요 버튼 및 강조 요소",
      description: '신뢰와 열정을 상징하는 브랜드의 핵심 컬러'
    },
    {
      role: 'Secondary',
      name: '신칼오렌지',
      nameEn: 'ShinKal Orange',
      hex: '#F37021',
      rgb: '243, 112, 33',
      cmyk: '0, 70, 95, 0',
      usage: 'SHIN KAL 심볼 리본, 보조 강조색',
      description: '따뜻함과 활력을 전달하는 보조 컬러'
    },
    {
      role: 'Neutral Dark',
      name: '흑갈필기',
      nameEn: 'Dark Brown',
      hex: '#2E1C10',
      rgb: '46, 28, 16',
      cmyk: '0, 39, 65, 82',
      usage: '한글 로고, 본문 텍스트, 제목',
      description: '전통과 깊이를 나타내는 다크 컬러'
    },
    {
      role: 'Neutral Light',
      name: '미색배경',
      nameEn: 'Cream Background',
      hex: '#F9F6F3',
      rgb: '249, 246, 243',
      cmyk: '0, 1, 2, 3',
      usage: '배경, 카드, 메뉴판',
      description: '따뜻하고 청결한 느낌의 배경 컬러'
    },
    {
      role: 'Accent',
      name: '황동식기색',
      nameEn: 'Brass Gold',
      hex: '#C7A45A',
      rgb: '199, 164, 90',
      cmyk: '0, 18, 55, 22',
      usage: '식기, 인테리어 포인트, 프리미엄 요소',
      description: '전통 황동 식기를 연상시키는 고급스러운 골드'
    }
  ];

  return (
    <section id="color" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#C7A45A] text-white rounded-full mb-4 text-sm">
            COLOR SYSTEM
          </div>
          <h2 className="text-[#2E1C10] mb-4">컬러 시스템</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            현풍닭칼국수의 브랜드 정체성을 표현하는 공식 컬러 팔레트입니다.<br/>
            각 컬러는 브랜드의 가치와 철학을 시각적으로 전달합니다.
          </p>
        </div>

        <div className="space-y-6">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="bg-[#F9F6F3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="grid md:grid-cols-3 gap-0">
                <div 
                  className="p-12 flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-full border-4 border-white"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                    </div>
                    <p className="text-white text-sm opacity-90">{color.role}</p>
                  </div>
                </div>

                <div className="col-span-2 p-8">
                  <div className="mb-6">
                    <h3 className="text-[#2E1C10] mb-1">{color.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{color.nameEn}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{color.description}</p>
                    <p className="text-sm text-gray-600">
                      <span className="text-[#D61C1C]">사용처:</span> {color.usage}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-2">HEX</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-[#2E1C10]">{color.hex}</code>
                        <button
                          onClick={() => copyToClipboard(color.hex, `${color.name}-hex`)}
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          {copiedColor === `${color.name}-hex` ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">RGB</p>
                      <code className="text-sm text-[#2E1C10]">{color.rgb}</code>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">CMYK</p>
                      <code className="text-sm text-[#2E1C10]">{color.cmyk}</code>
                    </div>
                    <div className="flex items-end">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-gray-200"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#F9F6F3] to-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-[#2E1C10] mb-6">컬러 조합 가이드</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 h-16 bg-[#D61C1C] rounded-lg"></div>
                <div className="flex-1 h-16 bg-[#F9F6F3] rounded-lg border border-gray-200"></div>
              </div>
              <p className="text-sm text-gray-700">현풍레드 + 미색배경</p>
              <p className="text-xs text-gray-500 mt-1">메인 조합 (간판, 메뉴판)</p>
            </div>
            <div className="text-center">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 h-16 bg-[#F37021] rounded-lg"></div>
                <div className="flex-1 h-16 bg-white rounded-lg border border-gray-200"></div>
              </div>
              <p className="text-sm text-gray-700">신칼오렌지 + 화이트</p>
              <p className="text-xs text-gray-500 mt-1">보조 조합 (강조 요소)</p>
            </div>
            <div className="text-center">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 h-16 bg-[#C7A45A] rounded-lg"></div>
                <div className="flex-1 h-16 bg-[#2E1C10] rounded-lg"></div>
              </div>
              <p className="text-sm text-gray-700">황동식기색 + 흑갈필기</p>
              <p className="text-xs text-gray-500 mt-1">프리미엄 조합 (특별 메뉴)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
