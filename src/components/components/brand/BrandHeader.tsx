import { ImageWithFallback } from '../figma/ImageWithFallback';

const LOGO_URL = 'https://images.unsplash.com/photo-1694020868262-d01a54b45a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nbyUyMGRlc2lnbnxlbnwxfHx8fDE3NjE3MDQ1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080';

export function BrandHeader() {
  return (
    <header className="bg-white border-b border-border sticky top-0" style={{ zIndex: 'var(--z-sticky)' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <ImageWithFallback src={LOGO_URL} alt="현풍닭칼국수" className="h-12" />
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
