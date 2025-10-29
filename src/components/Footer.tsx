import { Facebook, Instagram, Youtube } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const LOGO_URL = 'https://images.unsplash.com/photo-1709170262709-855a36d38858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwYnJhbmRpbmd8ZW58MXx8fHwxNzYxNzA0NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080';

export function Footer() {
  return (
    <footer className="bg-[#2E1C10] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <ImageWithFallback src={LOGO_URL} alt="SHIN KAL 로고" className="h-16 mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              신의를 지키는 칼국수<br/>
              Fine Korean Noodle
            </p>
            <p className="text-gray-400 text-sm">Since 1992</p>
          </div>

          <div>
            <h4 className="mb-4">회사 정보</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>운영법인: ㈜지앤씨신칼</li>
              <li>본사: 대구광역시 달성군 현풍면</li>
              <li>대표전화: 1566-5046</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">메뉴</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-[#F37021] transition-colors">회사소개</a></li>
              <li><a href="#brand" className="hover:text-[#F37021] transition-colors">브랜드 스토리</a></li>
              <li><a href="#menu" className="hover:text-[#F37021] transition-colors">메뉴소개</a></li>
              <li><a href="#contact" className="hover:text-[#F37021] transition-colors">창업문의</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">소셜 미디어</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D61C1C] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D61C1C] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D61C1C] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 현풍닭칼국수 (SHIN KAL). All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#F37021] transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-[#F37021] transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
