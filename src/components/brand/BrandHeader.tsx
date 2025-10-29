import logoFull from 'figma:asset/75b3c0027407bb9d32080f5b3eb51096c93f9933.png';

export function BrandHeader() {
  return (
    <header className="bg-white border-b border-border sticky top-0" style={{ zIndex: 'var(--z-sticky)' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src={logoFull} alt="현풍닭칼국수" className="h-12" />
            <nav className="hidden md:flex items-center gap-6">
              <a href="#philosophy" className="text-dark-brown hover:text-hyunpung-red transition-colors">
                브랜드 철학
              </a>
              <a href="#logo" className="text-dark-brown hover:text-hyunpung-red transition-colors">
                로고 시스템
              </a>
              <a href="#color" className="text-dark-brown hover:text-hyunpung-red transition-colors">
                컬러 시스템
              </a>
              <a href="#icons" className="text-dark-brown hover:text-hyunpung-red transition-colors">
                아이콘 시스템
              </a>
              <a href="#guidelines" className="text-dark-brown hover:text-hyunpung-red transition-colors">
                사용 가이드
              </a>
              <a href="#download" className="text-dark-brown hover:text-hyunpung-red transition-colors">
                다운로드
              </a>
            </nav>
          </div>
          <div className="text-sm text-muted-foreground">
            Brand Identity Guidelines
          </div>
        </div>
      </div>
    </header>
  );
}
