import { Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const LOGO_URL = 'https://images.unsplash.com/photo-1758720793993-0d191e578741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwbG9nbyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MTcwNDU0OHww&ixlib=rb-4.1.0&q=80&w=1080';

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <ImageWithFallback src={LOGO_URL} alt="현풍닭칼국수 로고" className="h-16" />
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('about')} className="text-[#2E1C10] hover:text-[#D61C1C] transition-colors">
                회사소개
              </button>
              <button onClick={() => scrollToSection('brand')} className="text-[#2E1C10] hover:text-[#D61C1C] transition-colors">
                브랜드 스토리
              </button>
              <button onClick={() => scrollToSection('menu')} className="text-[#2E1C10] hover:text-[#D61C1C] transition-colors">
                메뉴소개
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-[#2E1C10] hover:text-[#D61C1C] transition-colors">
                매장안내
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#D61C1C]">
              <Phone className="w-5 h-5" />
              <span>1566-5046</span>
            </div>
            <button className="hidden md:block px-6 py-2 bg-[#D61C1C] text-white rounded hover:bg-[#b71616] transition-colors">
              창업상담 · 문의
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
