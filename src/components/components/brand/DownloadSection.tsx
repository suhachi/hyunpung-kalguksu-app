import { Download, FileImage, FileText, Package } from 'lucide-react';

export function DownloadSection() {
  const downloadItems = [
    {
      icon: FileImage,
      title: '로고 파일',
      description: 'PNG, SVG, AI 형식',
      items: ['Full Signature', 'Symbol Only', 'Text Only'],
      color: '#D61C1C'
    },
    {
      icon: FileText,
      title: '브랜드 가이드라인',
      description: 'PDF 문서',
      items: ['BI 가이드북', '컬러 가이드', '사용 규정'],
      color: '#F37021'
    },
    {
      icon: Package,
      title: '전체 패키지',
      description: 'ZIP 압축 파일',
      items: ['모든 로고 파일', '가이드라인', '템플릿'],
      color: '#C7A45A'
    }
  ];

  return (
    <section id="download" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#D61C1C] text-white rounded-full mb-4 text-sm">
            DOWNLOADS
          </div>
          <h2 className="text-[#2E1C10] mb-4">다운로드 센터</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            현풍닭칼국수 브랜드 아이덴티티 자료를 다운로드하세요.<br/>
            모든 자료는 공식 승인 후 사용 가능합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {downloadItems.map((item, index) => (
            <div 
              key={index}
              className="bg-[#F9F6F3] rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </div>
              <h3 className="text-[#2E1C10] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{item.description}</p>
              <ul className="space-y-2 mb-6">
                {item.items.map((subItem, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    {subItem}
                  </li>
                ))}
              </ul>
              <button 
                className="w-full py-3 rounded-lg text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: item.color }}
              >
                <Download className="w-5 h-5" />
                다운로드
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#2E1C10] to-[#2E1C10]/80 text-white rounded-2xl p-12 text-center">
          <h3 className="mb-4">브랜드 자료 사용 문의</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            브랜드 아이덴티티 자료의 사용을 원하시거나 추가 문의사항이 있으신 경우<br/>
            아래 연락처로 문의해 주시기 바랍니다.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <span className="text-white/70">전화:</span>
              <span>1566-5046</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span className="text-white/70">이메일:</span>
              <span>brand@shinkal.co.kr</span>
            </div>
          </div>
          <button className="mt-8 px-8 py-3 bg-white text-[#2E1C10] rounded-lg hover:bg-gray-100 transition-colors">
            문의하기
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            © 2025 현풍닭칼국수 (SHIN KAL). All rights reserved.<br/>
            모든 브랜드 자료는 ㈜지앤씨신칼의 저작권으로 보호됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
