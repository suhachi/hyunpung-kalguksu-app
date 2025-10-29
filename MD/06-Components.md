# COMPONENTS 파일들

총 96개 파일

## 53. src/components/BrandIdentity.tsx

```typescript
import { LogoSystem } from './brand/LogoSystem';
import { ColorSystem } from './brand/ColorSystem';
import { BrandPhilosophy } from './brand/BrandPhilosophy';
import { UsageGuidelines } from './brand/UsageGuidelines';
import { BrandHeader } from './brand/BrandHeader';
import { DownloadSection } from './brand/DownloadSection';
import { DesignTokenDemo } from './brand/DesignTokenDemo';
import { IconSystem } from './brand/IconSystem';

export function BrandIdentity() {
  return (
    <div className="min-h-screen">
      <BrandHeader />
      <main>
        <BrandPhilosophy />
        <DesignTokenDemo />
        <LogoSystem />
        <ColorSystem />
        <IconSystem />
        <UsageGuidelines />
        <DownloadSection />
      </main>
    </div>
  );
}
```

## 54. src/components/BrandStory.tsx

```typescript
import { Heart, Utensils, Award, Users } from 'lucide-react';
import brandIdentityImage from 'figma:asset/326493a3b65735707c0e5d3d387262bcd7cdcc21.png';

export function BrandStory() {
  const values = [
    {
      icon: Heart,
      title: '신뢰',
      description: '정직한 식재료와 깊은 육수로 만드는 한 그릇',
      color: '#D61C1C'
    },
    {
      icon: Utensils,
      title: '전통',
      description: '1992년부터 이어온 전통의 제면 방식',
      color: '#F37021'
    },
    {
      icon: Award,
      title: '정직',
      description: '신의를 지키는 정직한 한 끼를 제공',
      color: '#C7A45A'
    },
    {
      icon: Users,
      title: '따뜻함',
      description: '가족처럼 따뜻하게 대접하는 마음',
      color: '#D61C1C'
    }
  ];

  return (
    <section id="brand" className="py-20 bg-[#F9F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#2E1C10] mb-4">브랜드 스토리</h2>
          <p className="text-[#F37021] mb-2">SHIN KAL · Fine Korean Noodle</p>
          <p className="text-gray-700 max-w-3xl mx-auto">
            "신뢰할 수 있는 칼국수를 만드는 기업"<br/>
            ㈜지앤씨신칼은 2021년 사명을 변경하며, '칼국수의 대중화와 세계화'를 목표로<br/>
            정직한 식재료와 깊은 육수, 전통의 제면 방식을 고수하고 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={brandIdentityImage} 
              alt="현풍닭칼국수 브랜드 아이덴티티" 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div>
            <div className="mb-8">
              <h3 className="text-[#2E1C10] mb-4">브랜드 철학</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                '신(信)'은 신뢰를, '칼(刃)'은 칼국수를 뜻하며,<br/>
                '신의와 정성을 지키는 칼국수'를 의미합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                매장 식기는 전통 황동그릇을 사용하며,<br/>
                모든 메뉴는 <span className="text-[#D61C1C]">'정직한 한 끼'</span>를 상징합니다.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#D61C1C] rounded-full"></div>
                <span className="text-gray-700">설립연도: 1992년 (상호명 '신칼')</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#F37021] rounded-full"></div>
                <span className="text-gray-700">운영법인: ㈜지앤씨신칼</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#C7A45A] rounded-full"></div>
                <span className="text-gray-700">본사: 대구광역시 달성군 현풍면</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${value.color}20` }}
              >
                <value.icon className="w-8 h-8" style={{ color: value.color }} />
              </div>
              <h4 className="text-[#2E1C10] mb-2">{value.title}</h4>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 55. src/components/Contact.tsx

```typescript
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#F9F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#2E1C10] mb-4">매장 안내 & 창업 문의</h2>
          <p className="text-gray-700">
            현풍닭칼국수와 함께 성공적인 창업을 시작하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-[#2E1C10] mb-6">본사 정보</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D61C1C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#D61C1C]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">주소</p>
                  <p className="text-gray-700">대구광역시 달성군 현풍면</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F37021]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#F37021]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">대표 전화</p>
                  <p className="text-gray-700">1566-5046</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C7A45A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#C7A45A]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">운영 시간</p>
                  <p className="text-gray-700">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D61C1C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#D61C1C]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">운영 법인</p>
                  <p className="text-gray-700">㈜지앤씨신칼</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-[#2E1C10] mb-6">창업 상담 문의</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-[#2E1C10] mb-2">성함</label>
                <input 
                  type="text" 
                  placeholder="이름을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C]"
                />
              </div>

              <div>
                <label className="block text-[#2E1C10] mb-2">연락처</label>
                <input 
                  type="tel" 
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C]"
                />
              </div>

              <div>
                <label className="block text-[#2E1C10] mb-2">관심 지역</label>
                <input 
                  type="text" 
                  placeholder="예) 서울시 강남구"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C]"
                />
              </div>

              <div>
                <label className="block text-[#2E1C10] mb-2">문의 내용</label>
                <textarea 
                  rows={4}
                  placeholder="창업 문의 내용을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C] resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#D61C1C] text-white rounded-lg hover:bg-[#b71616] transition-colors"
              >
                상담 신청하기
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
          <h3 className="text-[#2E1C10] mb-6 text-center">브랜드 컬러 시스템</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-full h-24 bg-[#D61C1C] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">현풍레드</p>
              <p className="text-gray-500 text-xs">#D61C1C</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#F37021] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">신칼오렌지</p>
              <p className="text-gray-500 text-xs">#F37021</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#2E1C10] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">흑갈필기</p>
              <p className="text-gray-500 text-xs">#2E1C10</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#F9F6F3] rounded-lg mb-3 shadow-md border border-gray-200"></div>
              <p className="text-[#2E1C10] text-sm">미색배경</p>
              <p className="text-gray-500 text-xs">#F9F6F3</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#C7A45A] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">황동식기색</p>
              <p className="text-gray-500 text-xs">#C7A45A</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## 56. src/components/Footer.tsx

```typescript
import { Facebook, Instagram, Youtube } from 'lucide-react';
import logoImage from 'figma:asset/92c9b32635da68466319c6dfafbaf99b129ec904.png';

export function Footer() {
  return (
    <footer className="bg-[#2E1C10] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logoImage} alt="SHIN KAL 로고" className="h-16 mb-4" />
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
```

## 57. src/components/Header.tsx

```typescript
import { Phone } from 'lucide-react';
import logoImage from 'figma:asset/326493a3b65735707c0e5d3d387262bcd7cdcc21.png';

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
            <img src={logoImage} alt="현풍닭칼국수 로고" className="h-16" />
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
```

## 58. src/components/Hero.tsx

```typescript
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
```

## 59. src/components/MenuSection.tsx

```typescript
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
  badge?: string;
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('main');

  const mainMenuItems: MenuItem[] = [
    {
      name: '닭곰탕 + 공깃밥',
      description: '삼계 닭 반마리 + 당면 + 공깃밥 + 반찬 (매운 김치, 단무지)',
      price: '9,500원',
      image: 'https://images.unsplash.com/photo-1732338033977-1010c61f6cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwbm9vZGxlJTIwc291cHxlbnwxfHx8fDE3NjE0ODMwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: '대표메뉴'
    },
    {
      name: '김치말이 냉국수',
      description: '계란 지단 + 배 + 오이 + 열무 + 김치 + 반찬',
      price: '9,500원',
      image: 'https://images.unsplash.com/photo-1743419612786-19d116bb8c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjb2xkJTIwbm9vZGxlcyUyMGtpbWNoaXxlbnwxfHx8fDE3NjE0ODMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: '대표메뉴'
    },
    {
      name: '현풍 닭칼국수',
      description: '닭 가슴살 + 김 고명 + 반찬 (매운 김치, 단무지)',
      price: '9,000원',
      image: 'https://images.unsplash.com/photo-1732338033977-1010c61f6cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwbm9vZGxlJTIwc291cHxlbnwxfHx8fDE3NjE0ODMwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '얼큰 닭칼국수',
      description: '매운 버전, 칼칼한 닭육수',
      price: '9,500원',
      image: 'https://images.unsplash.com/photo-1732338033977-1010c61f6cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwbm9vZGxlJTIwc291cHxlbnwxfHx8fDE3NjE0ODMwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '삼계 칼국수',
      description: '닭 반마리 + 면 + 소금 + 반찬',
      price: '11,500원',
      image: 'https://images.unsplash.com/photo-1732338033977-1010c61f6cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwbm9vZGxlJTIwc291cHxlbnwxfHx8fDE3NjE0ODMwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '얼큰 삼계 칼국수',
      description: '매운 삼계탕 스타일 칼국수',
      price: '12,000원',
      image: 'https://images.unsplash.com/photo-1732338033977-1010c61f6cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwbm9vZGxlJTIwc291cHxlbnwxfHx8fDE3NjE0ODMwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '한방 수육',
      description: '450g (고추, 마늘, 쌈장 제공)',
      price: '24,000원',
      image: 'https://images.unsplash.com/photo-1708388064278-707e85eaddc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzdGVhbWVkJTIwcG9ya3xlbnwxfHx8fDE3NjE0ODMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '안동찜닭',
      description: '닭고기 + 야채 + 단짠간장소스 찜닭',
      price: '26,000원',
      image: 'https://images.unsplash.com/photo-1616627152550-5aac9b71a949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBicmFpc2VkJTIwY2hpY2tlbnxlbnwxfHx8fDE3NjE0ODMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const setMenuItems: MenuItem[] = [
    {
      name: '삼계 수육 세트',
      description: '삼계칼국수 1인분 + 미니 수육(150g)',
      price: '20,000원',
      image: 'https://images.unsplash.com/photo-1708388064278-707e85eaddc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzdGVhbWVkJTIwcG9ya3xlbnwxfHx8fDE3NjE0ODMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '닭칼 수육 세트',
      description: '닭칼국수 1인분 + 미니 수육(150g)',
      price: '18,000원',
      image: 'https://images.unsplash.com/photo-1708388064278-707e85eaddc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzdGVhbWVkJTIwcG9ya3xlbnwxfHx8fDE3NjE0ODMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '얼큰 닭곰탕 수육 세트',
      description: '얼큰 닭곰탕 + 공깃밥 + 미니 수육',
      price: '19,500원',
      image: 'https://images.unsplash.com/photo-1708388064278-707e85eaddc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzdGVhbWVkJTIwcG9ya3xlbnwxfHx8fDE3NjE0ODMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '김치말이 냉국수 수육세트',
      description: '냉국수 1인분 + 미니 수육(150g)',
      price: '19,000원',
      image: 'https://images.unsplash.com/photo-1708388064278-707e85eaddc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzdGVhbWVkJTIwcG9ya3xlbnwxfHx8fDE3NjE0ODMwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const sideMenuItems: MenuItem[] = [
    {
      name: '김치 볶음 만두',
      description: '5개 + 반찬 (만두장)',
      price: '5,500원',
      image: 'https://images.unsplash.com/photo-1652265541147-560e6464aaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBkdW1wbGluZ3MlMjBtYW5kdXxlbnwxfHx8fDE3NjE0ODMwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '감자 순대 만두',
      description: '8개 + 반찬 (만두장)',
      price: '5,500원',
      image: 'https://images.unsplash.com/photo-1652265541147-560e6464aaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBkdW1wbGluZ3MlMjBtYW5kdXxlbnwxfHx8fDE3NjE0ODMwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '갈비 고기 만두',
      description: '8개 + 반찬 (만두장)',
      price: '5,500원',
      image: 'https://images.unsplash.com/photo-1652265541147-560e6464aaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBkdW1wbGluZ3MlMjBtYW5kdXxlbnwxfHx8fDE3NjE0ODMwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '공깃밥',
      description: '추가 밥',
      price: '1,000원'
    },
    {
      name: '김치 추가',
      description: '추가 반찬',
      price: '2,500원'
    }
  ];

  const beverageItems: MenuItem[] = [
    {
      name: '카스 / 테라 / 캘리',
      description: '맥주',
      price: '4,000원'
    },
    {
      name: '조은데이 / 진로 / 참이슬',
      description: '소주',
      price: '4,000원'
    },
    {
      name: '코카콜라 제로',
      description: '355ml',
      price: '2,000원'
    },
    {
      name: '칠성 사이다 제로',
      description: '355ml',
      price: '2,000원'
    }
  ];

  const categories = [
    { id: 'main', label: '메인 메뉴', items: mainMenuItems },
    { id: 'set', label: '세트 메뉴', items: setMenuItems },
    { id: 'side', label: '사이드 메뉴', items: sideMenuItems },
    { id: 'beverage', label: '음료 / 주류', items: beverageItems }
  ];

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#2E1C10] mb-4">메뉴 소개</h2>
          <p className="text-gray-700">
            정직한 재료와 깊은 맛으로 만든 현풍닭칼국수의 시그니처 메뉴
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeCategory === category.id
                  ? 'bg-[#D61C1C] text-white shadow-lg'
                  : 'bg-[#F9F6F3] text-[#2E1C10] hover:bg-[#F37021] hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory?.items.map((item, index) => (
            <div 
              key={index}
              className="bg-[#F9F6F3] rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {item.image && (
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {item.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#D61C1C] text-white rounded-full text-sm">
                      {item.badge}
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <h4 className="text-[#2E1C10] mb-2">{item.name}</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#D61C1C]">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 60. src/components/admin/BusinessHoursForm.tsx

```typescript
/**
 * 영업시간 설정 폼
 */

import { BusinessHours, DAY_LABELS } from '../../types/settings';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';

interface BusinessHoursFormProps {
  value: BusinessHours[];
  onChange: (hours: BusinessHours[]) => void;
}

export function BusinessHoursForm({ value, onChange }: BusinessHoursFormProps) {
  const handleToggle = (day: string) => {
    const updated = value.map(h =>
      h.day === day ? { ...h, isOpen: !h.isOpen } : h
    );
    onChange(updated);
  };

  const handleTimeChange = (day: string, field: 'openTime' | 'closeTime', time: string) => {
    const updated = value.map(h =>
      h.day === day ? { ...h, [field]: time } : h
    );
    onChange(updated);
  };

  const handleApplyToAll = (day: string) => {
    const source = value.find(h => h.day === day);
    if (!source) return;

    const updated = value.map(h => ({
      ...h,
      openTime: source.openTime,
      closeTime: source.closeTime,
    }));
    onChange(updated);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-[#333]">요일별 영업시간</h3>
        </div>

        <div className="space-y-3">
          {value.map((hours, index) => (
            <div
              key={hours.day}
              className="flex items-center gap-3 p-3 rounded-lg border bg-white"
            >
              {/* 요일 + 토글 */}
              <div className="w-24 flex items-center gap-2">
                <Switch
                  checked={hours.isOpen}
                  onCheckedChange={() => handleToggle(hours.day)}
                />
                <Label className="text-sm text-[#333]">
                  {DAY_LABELS[hours.day]}
                </Label>
              </div>

              {/* 시간 입력 */}
              {hours.isOpen ? (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={hours.openTime}
                      onChange={(e) => handleTimeChange(hours.day, 'openTime', e.target.value)}
                      className="w-32"
                    />
                    <span className="text-gray-400">~</span>
                    <Input
                      type="time"
                      value={hours.closeTime}
                      onChange={(e) => handleTimeChange(hours.day, 'closeTime', e.target.value)}
                      className="w-32"
                    />
                  </div>

                  {/* 전체 적용 버튼 */}
                  <button
                    type="button"
                    onClick={() => handleApplyToAll(hours.day)}
                    className="text-xs text-[#F37021] hover:underline whitespace-nowrap"
                  >
                    전체 적용
                  </button>
                </>
              ) : (
                <div className="flex-1 text-sm text-gray-400">휴무</div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
          <p className="text-xs text-blue-800">
            💡 <strong>전체 적용</strong> 버튼을 누르면 해당 요일의 시간을 모든 요일에 일괄 적용합니다.
          </p>
        </div>
      </div>
    </Card>
  );
}
```

## 61. src/components/admin/CreditsCard.tsx

```typescript
/**
 * 개발사 크레딧 카드
 * KS컴퍼니 고정 정보 표시
 */

import { Card } from '../ui/card';
import { Building2, Mail, Phone, Globe } from 'lucide-react';

export function CreditsCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-[#2E1C10]/5 to-[#F9F6F3]">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#D61C1C] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-[#333]">개발 · 운영</h3>
            <p className="text-sm text-[#8B7355]">Service Provider</p>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-4 h-4 text-[#8B7355] mt-1" />
            <div className="flex-1">
              <p className="text-sm text-[#333]">
                <strong>KS컴퍼니</strong> (KS Company)
              </p>
              <p className="text-xs text-[#8B7355] mt-1">
                사업자등록번호: 553-17-00098
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#8B7355] mt-1" />
            <div className="flex-1">
              <p className="text-sm text-[#333]">대표이사</p>
              <p className="text-xs text-[#8B7355] mt-1">
                석경선 (대표) · 배종수 (공동대표)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#8B7355] mt-1" />
            <div className="flex-1">
              <p className="text-sm text-[#333]">연락처</p>
              <p className="text-xs text-[#8B7355] mt-1">
                이메일: kskim7@khu.ac.kr
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-4 h-4 text-[#8B7355] mt-1" />
            <div className="flex-1">
              <p className="text-sm text-[#333]">서비스</p>
              <p className="text-xs text-[#8B7355] mt-1">
                현풍닭칼국수 브랜드 PWA 배달앱
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#F9F6F3] rounded p-3 border border-[#C7A45A]/20 mt-4">
          <p className="text-xs text-[#8B7355] leading-relaxed">
            본 앱은 현풍닭칼국수 브랜드 아이덴티티를 기반으로 개발된 
            Progressive Web App (PWA) 배달 주문 시스템입니다. 
            브랜드 디자인 시스템, Firebase 백엔드, NICEPAY 결제 연동이 
            포함된 완전한 솔루션을 제공합니다.
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <p className="text-xs text-[#8B7355]">
            © 2025 KS Company. All rights reserved.
          </p>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 bg-[#D61C1C]/10 text-[#D61C1C] rounded">
              v2.6
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

## 62. src/components/admin/FeesForm.tsx

```typescript
/**
 * 배달비/최소주문 설정 폼
 */

import { DeliveryFee } from '../../types/settings';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface FeesFormProps {
  deliveryFees: DeliveryFee[];
  deliveryRadius: number;
  minDeliveryOrder: number;
  minPickupOrder: number;
  onDeliveryFeesChange: (fees: DeliveryFee[]) => void;
  onDeliveryRadiusChange: (radius: number) => void;
  onMinDeliveryOrderChange: (amount: number) => void;
  onMinPickupOrderChange: (amount: number) => void;
}

export function FeesForm({
  deliveryFees,
  deliveryRadius,
  minDeliveryOrder,
  minPickupOrder,
  onDeliveryFeesChange,
  onDeliveryRadiusChange,
  onMinDeliveryOrderChange,
  onMinPickupOrderChange,
}: FeesFormProps) {
  const handleAddFee = () => {
    const lastFee = deliveryFees[deliveryFees.length - 1];
    const newFee: DeliveryFee = {
      minDistance: lastFee ? lastFee.maxDistance : 0,
      maxDistance: lastFee ? lastFee.maxDistance + 2 : 2,
      fee: lastFee ? lastFee.fee + 1000 : 3000,
    };
    onDeliveryFeesChange([...deliveryFees, newFee]);
  };

  const handleRemoveFee = (index: number) => {
    if (deliveryFees.length <= 1) return;
    onDeliveryFeesChange(deliveryFees.filter((_, i) => i !== index));
  };

  const handleFeeChange = (index: number, field: keyof DeliveryFee, value: number) => {
    const updated = deliveryFees.map((fee, i) =>
      i === index ? { ...fee, [field]: value } : fee
    );
    onDeliveryFeesChange(updated);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* 배달비 설정 */}
        <div>
          <h3 className="text-lg text-[#333] mb-4">거리별 배달비</h3>
          <div className="space-y-3">
            {deliveryFees.map((fee, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-white">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="number"
                    value={fee.minDistance}
                    onChange={(e) => handleFeeChange(index, 'minDistance', Number(e.target.value))}
                    min="0"
                    step="0.5"
                    className="w-20"
                  />
                  <span className="text-gray-400">~</span>
                  <Input
                    type="number"
                    value={fee.maxDistance}
                    onChange={(e) => handleFeeChange(index, 'maxDistance', Number(e.target.value))}
                    min="0"
                    step="0.5"
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">km</span>
                  <span className="text-gray-400 mx-2">→</span>
                  <Input
                    type="number"
                    value={fee.fee}
                    onChange={(e) => handleFeeChange(index, 'fee', Number(e.target.value))}
                    min="0"
                    step="500"
                    className="w-28"
                  />
                  <span className="text-sm text-gray-600">원</span>
                </div>
                {deliveryFees.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFee(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddFee}
            className="mt-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            구간 추가
          </Button>
        </div>

        {/* 최대 배달 반경 */}
        <div>
          <Label htmlFor="deliveryRadius" className="text-sm text-[#333]">
            최대 배달 반경 (km)
          </Label>
          <Input
            id="deliveryRadius"
            type="number"
            value={deliveryRadius}
            onChange={(e) => onDeliveryRadiusChange(Number(e.target.value))}
            min="1"
            step="0.5"
            className="mt-2 w-32"
          />
          <p className="text-xs text-gray-500 mt-1">
            {deliveryRadius}km 이상은 배달 불가로 표시됩니다
          </p>
        </div>

        {/* 최소 배달 주문 금액 */}
        <div>
          <Label htmlFor="minDeliveryOrder" className="text-sm text-[#333]">
            최소 배달 주문 금액 (원)
          </Label>
          <Input
            id="minDeliveryOrder"
            type="number"
            value={minDeliveryOrder}
            onChange={(e) => onMinDeliveryOrderChange(Number(e.target.value))}
            min="0"
            step="1000"
            className="mt-2 w-40"
          />
          <p className="text-xs text-gray-500 mt-1">
            {minDeliveryOrder.toLocaleString()}원 미만 주문 시 배달 불가
          </p>
        </div>

        {/* 최소 포장 주문 금액 */}
        <div>
          <Label htmlFor="minPickupOrder" className="text-sm text-[#333]">
            최소 포장 주문 금액 (원)
          </Label>
          <Input
            id="minPickupOrder"
            type="number"
            value={minPickupOrder}
            onChange={(e) => onMinPickupOrderChange(Number(e.target.value))}
            min="0"
            step="1000"
            className="mt-2 w-40"
          />
          <p className="text-xs text-gray-500 mt-1">
            {minPickupOrder.toLocaleString()}원 미만 주문 시 포장 불가
          </p>
        </div>
      </div>
    </Card>
  );
}
```

## 63. src/components/admin/MenuCSVImport.tsx

```typescript
/**
 * 메뉴 CSV 일괄 등록
 * Phase 2-6: CSV 파일로 메뉴 대량 등록
 */

import { useState } from 'react';
import { Menu } from '../../types/menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CSVRow {
  name: string;
  category: string;
  price: string;
  description: string;
  badges: string;
  options: string;
  imageUrl: string;
  allergens: string;
  origin: string;
}

interface ParsedMenu {
  data: Partial<Menu>;
  errors: string[];
  row: number;
}

interface MenuCSVImportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (menus: Partial<Menu>[]) => Promise<void>;
}

export function MenuCSVImport({
  open,
  onOpenChange,
  onImport,
}: MenuCSVImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedMenus, setParsedMenus] = useState<ParsedMenu[]>([]);
  const [loading, setLoading] = useState(false);

  // CSV 파싱
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      toast.error('CSV 파일만 업로드 가능합니다');
      return;
    }

    setFile(selectedFile);

    try {
      const text = await selectedFile.text();
      const lines = text.split('\n').filter(line => line.trim());

      if (lines.length < 2) {
        toast.error('CSV 파일에 데이터가 없습니다');
        return;
      }

      // 헤더 확인
      const headers = lines[0].split(',').map(h => h.trim());
      const requiredHeaders = ['name', 'category', 'price'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

      if (missingHeaders.length > 0) {
        toast.error(`필수 컬럼이 누락되었습니다: ${missingHeaders.join(', ')}`);
        return;
      }

      // 데이터 파싱
      const parsed: ParsedMenu[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        const errors: string[] = [];
        const menuData: Partial<Menu> = {};

        // 이름 검증
        if (!row.name || row.name.length > 50) {
          errors.push('이름은 필수이며 50자 이내여야 합니다');
        } else {
          menuData.name = row.name;
        }

        // 카테고리 검증
        const validCategories = ['noodle', 'set', 'side', 'drink', 'alcohol'];
        if (!validCategories.includes(row.category)) {
          errors.push('유효하지 않은 카테고리입니다');
        } else {
          menuData.category = row.category as any;
        }

        // 가격 검증
        const price = parseInt(row.price);
        if (isNaN(price) || price < 0) {
          errors.push('가격은 0 이상의 정수여야 합니다');
        } else {
          menuData.price = price;
        }

        // 설명
        if (row.description) {
          menuData.description = row.description;
        }

        // 배지
        if (row.badges) {
          const badges = row.badges.split('|').map(b => b.trim());
          menuData.badges = badges as any;
        }

        // 옵션 (JSON)
        if (row.options) {
          try {
            menuData.options = JSON.parse(row.options);
          } catch {
            errors.push('옵션 JSON 형식이 잘못되었습니다');
          }
        }

        // 이미지
        if (row.imageUrl) {
          menuData.image = row.imageUrl;
        } else {
          errors.push('이미지 URL은 필수입니다');
        }

        // 알레르기
        if (row.allergens) {
          menuData.allergens = row.allergens.split('|').map(a => a.trim());
        }

        // 원산지
        if (row.origin) {
          menuData.origin = row.origin;
        }

        menuData.isAvailable = true;
        menuData.order = 999;

        parsed.push({
          data: menuData,
          errors,
          row: i + 1,
        });
      }

      setParsedMenus(parsed);
      toast.success(`${parsed.length}개 메뉴를 확인했습니다`);
    } catch (error) {
      console.error('CSV parsing error:', error);
      toast.error('CSV 파일을 읽는데 실패했습니다');
    }
  };

  // 일괄 등록
  const handleImport = async () => {
    const validMenus = parsedMenus.filter(m => m.errors.length === 0);

    if (validMenus.length === 0) {
      toast.error('등록 가능한 메뉴가 없습니다');
      return;
    }

    setLoading(true);

    try {
      await onImport(validMenus.map(m => m.data));
      
      toast.success(`${validMenus.length}개 메뉴가 등록되었습니다`);
      onOpenChange(false);
      
      // 초기화
      setFile(null);
      setParsedMenus([]);
    } catch (error: any) {
      console.error('Import error:', error);
      toast.error(error.message || '일괄 등록에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const validCount = parsedMenus.filter(m => m.errors.length === 0).length;
  const errorCount = parsedMenus.filter(m => m.errors.length > 0).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>CSV 일괄 등록</DialogTitle>
          <DialogDescription>
            CSV 파일로 여러 메뉴를 한 번에 등록합니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* CSV 형식 안내 */}
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              <p className="mb-2">CSV 파일 형식:</p>
              <code className="text-xs bg-gray-100 p-2 block rounded">
                name,category,price,description,badges,options,imageUrl,allergens,origin
              </code>
              <p className="mt-2 text-xs">
                • 필수: name, category, price, imageUrl<br />
                • badges: 파이프(|)로 구분 (예: best|signature)<br />
                • options: JSON 형식<br />
                • allergens/origin: 파이프(|)로 구분
              </p>
            </AlertDescription>
          </Alert>

          {/* 파일 선택 */}
          <div className="space-y-2">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>

          {/* 미리보기 */}
          {parsedMenus.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="default">
                  정상 {validCount}개
                </Badge>
                {errorCount > 0 && (
                  <Badge variant="destructive">
                    오류 {errorCount}개
                  </Badge>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-3">
                {parsedMenus.map((menu, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded ${
                      menu.errors.length > 0 ? 'bg-red-50' : 'bg-green-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-[#333]">
                          {menu.errors.length > 0 ? (
                            <AlertCircle className="w-4 h-4 inline mr-1 text-red-600" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 inline mr-1 text-green-600" />
                          )}
                          <span className="font-medium">
                            {menu.data.name || '(이름 없음)'}
                          </span>
                          {' - '}
                          {menu.data.price?.toLocaleString()}원
                        </p>
                        {menu.errors.length > 0 && (
                          <ul className="mt-1 text-xs text-red-600 ml-5">
                            {menu.errors.map((error, i) => (
                              <li key={i}>• {error}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        행 {menu.row}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            onClick={handleImport}
            disabled={loading || validCount === 0}
          >
            {loading ? '등록 중...' : `${validCount}개 메뉴 등록`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## 64. src/components/admin/MenuCreateDialog.tsx

```typescript
/**
 * 메뉴 등록 다이얼로그
 * Phase 2-6: 신규 메뉴 생성 폼
 * 옵션 그룹을 동적으로 선택하고 사용
 */

import { useState, useEffect } from 'react';
import { Menu, MenuCategory, MenuBadge, CATEGORY_LABELS, BADGE_LABELS, MenuOptionGroup } from '../../types/menu';
import { OptionGroup } from '../../types/menu';
import { getOptionGroups } from '../../lib/admin/optionGroups.api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { uploadMenuImage } from '../../lib/admin/menuImages.api';
import { toast } from 'sonner';

interface MenuCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (menuData: Partial<Menu>, imageFile?: File) => Promise<void>;
}

export function MenuCreateDialog({
  open,
  onOpenChange,
  onSave,
}: MenuCreateDialogProps) {
  // 기본 정보
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MenuCategory>('noodle');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBadges, setSelectedBadges] = useState<MenuBadge[]>([]);
  const [allergens, setAllergens] = useState('');
  const [origin, setOrigin] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  // 이미지
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const MAX_DESC = 200;

  // 옵션 그룹 관리
  const [availableOptionGroups, setAvailableOptionGroups] = useState<OptionGroup[]>([]);
  const [selectedOptionGroupIds, setSelectedOptionGroupIds] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // 옵션 그룹 로드
  useEffect(() => {
    if (open) {
      loadOptionGroups();
    }
  }, [open]);

  const loadOptionGroups = async () => {
    try {
      const groups = await getOptionGroups();
      setAvailableOptionGroups(groups);
    } catch (error) {
      console.error('Failed to load option groups:', error);
    }
  };

  // 배지 토글
  const handleToggleBadge = (badge: MenuBadge) => {
    setSelectedBadges(prev =>
      prev.includes(badge)
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
  };

  // 이미지 URL 설정
  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    setImagePreview(url);
    setImageFile(null);
  };

  // 옵션 그룹 선택/해제
  const handleToggleOptionGroup = (groupId: string) => {
    setSelectedOptionGroupIds(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  // 폼 초기화
  const resetForm = () => {
    setName('');
    setCategory('noodle');
    setPrice('');
    setDescription('');
    setSelectedBadges([]);
    setAllergens('');
    setOrigin('');
    setIsAvailable(true);
    setImageUrl('');
    setImagePreview('');
    setImageFile(null);
    setSelectedOptionGroupIds([]);
  };

  // 저장
  const handleSave = async () => {
    // 검증
    if (!name.trim()) {
      toast.error('메뉴 이름을 입력하세요');
      return;
    }

    if (!price || parseFloat(price) < 0) {
      toast.error('올바른 가격을 입력하세요');
      return;
    }

    if (!imageUrl.trim() && !imageFile) {
      toast.error('이미지를 업로드하거나 URL을 입력하세요');
      return;
    }

    setLoading(true);

    try {
      // 선택된 옵션 그룹 가져오기
      const selectedGroups = availableOptionGroups
        .filter(g => selectedOptionGroupIds.includes(g.id))
        .map(g => ({ ...g })); // 복사

      const menuData: Partial<Menu> = {
        name: name.trim(),
        category,
        price: parseFloat(price),
        description: description.trim(),
        image: imageUrl.trim(),
        badges: selectedBadges,
        optionGroups: selectedGroups,
        allergens: allergens
          .split(',')
          .map(a => a.trim())
          .filter(Boolean),
        origin: origin.trim() || '국내산',
        isAvailable,
      };

      await onSave(menuData, imageFile || undefined);
      resetForm();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || '메뉴 등록에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>메뉴 등록</DialogTitle>
          <DialogDescription>
            새로운 메뉴를 등록합니다. 필수 항목(*)을 입력하세요.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="options">옵션</TabsTrigger>
            <TabsTrigger value="detail">상세 정보</TabsTrigger>
          </TabsList>

          {/* 기본 정보 탭 */}
          <TabsContent value="basic" className="space-y-4">
            {/* 메뉴명 */}
            <div>
              <Label htmlFor="name">메뉴명 *</Label>
              <Input
                id="name"
                placeholder="현풍닭칼국수"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">{name.length}/50</p>
            </div>

            {/* 카테고리 */}
            <div>
              <Label htmlFor="category">카테고리 *</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as MenuCategory)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 가격 */}
            <div>
              <Label htmlFor="price">가격 (원) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="9000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
              />
            </div>

            {/* 설명 */}
            <div>
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="메뉴 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={MAX_DESC}
              />
              <p className="text-xs text-gray-500 text-right">{description.length}/{MAX_DESC}자</p>
            </div>

            {/* 배지 */}
            <div>
              <Label>배지</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(BADGE_LABELS).map(([key, label]) => (
                  <Badge
                    key={key}
                    variant={selectedBadges.includes(key as MenuBadge) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleToggleBadge(key as MenuBadge)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 이미지 URL */}
            <div>
              <Label htmlFor="imageUrl">이미지 URL *</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                권장: 1600px, WebP 형식, 3MB 이하
              </p>

              {/* 파일 선택 */}
              <div className="mt-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    setImageFile(f);
                    setImagePreview(URL.createObjectURL(f));
                  }}
                />
              </div>

              {/* 이미지 미리보기 */}
              {imagePreview && (
                <div className="mt-3 relative">
                  <img
                    src={imagePreview}
                    alt="미리보기"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={() => {
                      setImagePreview('');
                      toast.error('이미지를 불러올 수 없습니다');
                    }}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImageUrl('');
                      setImagePreview('');
                      setImageFile(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* 판매 여부 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAvailable"
                checked={isAvailable}
                onCheckedChange={(checked) => setIsAvailable(!!checked)}
              />
              <Label htmlFor="isAvailable" className="cursor-pointer">
                판매 중
              </Label>
            </div>
          </TabsContent>

          {/* 옵션 탭 */}
          <TabsContent value="options" className="space-y-4">
            <div>
              <div className="mb-3">
                <h4 className="text-sm mb-1">옵션 그룹 선택</h4>
                <p className="text-xs text-gray-500">
                  이 메뉴에 적용할 옵션 그룹을 선택하세요. 
                  설정 &gt; 옵션 관리에서 옵션 그룹을 추가할 수 있습니다.
                </p>
              </div>

              {availableOptionGroups.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8 text-gray-500">
                    <p className="mb-2">등록된 옵션 그룹이 없습니다</p>
                    <p className="text-xs">설정 &gt; 옵션 관리에서 먼저 옵션 그룹을 생성하세요</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {availableOptionGroups.map((group) => (
                    <Card
                      key={group.id}
                      className={`cursor-pointer transition-all ${
                        selectedOptionGroupIds.includes(group.id)
                          ? 'border-[#D61C1C] bg-[#D61C1C]/5'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => handleToggleOptionGroup(group.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Checkbox
                                checked={selectedOptionGroupIds.includes(group.id)}
                                onCheckedChange={() => handleToggleOptionGroup(group.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              {group.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              {group.required && (
                                <Badge variant="secondary" className="text-xs">
                                  필수
                                </Badge>
                              )}
                              {group.multiSelect && (
                                <Badge variant="outline" className="text-xs">
                                  다중선택
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <div
                              key={item.id}
                              className="text-xs px-2 py-1 bg-gray-100 rounded"
                            >
                              {item.name}
                              {item.quantity > 1 && ` (${item.quantity}개)`}
                              {item.price > 0 && ` +${item.price.toLocaleString()}원`}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {selectedOptionGroupIds.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ✓ {selectedOptionGroupIds.length}개의 옵션 그룹이 선택되었습니다
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* 상세 정보 탭 */}
          <TabsContent value="detail" className="space-y-4">
            {/* 알레르기 유발 성분 */}
            <div>
              <Label htmlFor="allergens">알레르기 유발 성분</Label>
              <Input
                id="allergens"
                placeholder="밀, 대두, 닭고기 (쉼표로 구분)"
                value={allergens}
                onChange={(e) => setAllergens(e.target.value)}
              />
            </div>

            {/* 원산지 */}
            <div>
              <Label htmlFor="origin">원산지</Label>
              <Input
                id="origin"
                placeholder="국내산"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
            disabled={loading}
          >
            취소
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? '등록 중...' : '등록'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## 65. src/components/admin/MenuEditDialog.tsx

```typescript
/**
 * 메뉴 편집 다이얼로그 (가격/설명 수정)
 */

import { useState } from 'react';
import { Menu } from '../../types/menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { uploadMenuImage, deleteMenuImage, extractFileNameFromUrl } from '../../lib/admin/menuImages.api';
import { processImage } from '../../lib/imageUtils';
import { toast } from 'sonner';

interface MenuEditDialogProps {
  menu: Menu | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: { price?: number; description?: string; image?: string }, reason: string) => Promise<void>;
  loading?: boolean;
}

export function MenuEditDialog({
  menu,
  open,
  onOpenChange,
  onSave,
  loading,
}: MenuEditDialogProps) {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(menu?.image ?? '');
  const [imageReason, setImageReason] = useState('');
  const [saving, setSaving] = useState(false);

  // 다이얼로그 열릴 때 초기값 설정
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && menu) {
      setPrice(menu.price.toString());
      setDescription(menu.description);
      setReason('');
      setImageFile(null);
      setImagePreview(menu.image);
      setImageReason('');
    }
    onOpenChange(newOpen);
  };

  // 변경 사유 생성 헬퍼
  const makeReason = (): string => {
    const parts = [
      reason.trim(),
      imageFile && imageReason ? `이미지: ${imageReason}` : imageFile ? '이미지 변경' : null
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(' | ') : '이미지 변경';
  };

  const handleSave = async () => {
    if (!menu) return;

    // 가격/설명 변경 시 reason 필수 체크
    const priceChanged = parseInt(price) !== menu.price && !isNaN(parseInt(price));
    const descChanged = description.trim() !== menu.description;
    if ((priceChanged || descChanged) && !reason.trim()) {
      toast.error('변경 사유를 입력하세요');
      return;
    }

    setSaving(true);
    
    try {
      const updates: { price?: number; description?: string; image?: string } = {};

      const priceValue = parseInt(price);
      if (!isNaN(priceValue) && priceValue !== menu.price) {
        updates.price = priceValue;
      }

      const desc = description.trim();
      if (desc !== menu.description) {
        updates.description = desc;
      }

      // 이미지가 선택된 경우 업로드 전 기존 이미지 삭제
      if (imageFile) {
        // 기존 이미지 URL에서 파일명 추출하여 삭제
        if (menu.image) {
          const oldFileName = extractFileNameFromUrl(menu.image);
          if (oldFileName) {
            try {
              await deleteMenuImage(menu.menuId, oldFileName);
            } catch (e) {
              // 삭제 실패해도 업로드는 계속 진행
              console.warn('기존 이미지 삭제 실패:', e);
            }
          }
        }

        const processed = await processImage(imageFile, { 
          maxWidth: 1600, 
          outputFormat: 'webp',
          quality: 0.86
        });
        // 캐시 회피를 위해 파일명에 타임스탬프 추가
        const url = await uploadMenuImage(menu.menuId, processed, `${Date.now()}.webp`);
        updates.image = url;
      }

      if (Object.keys(updates).length === 0) {
        toast.info('변경된 내용이 없습니다.');
        setSaving(false);
        return;
      }

      await onSave(updates, makeReason());
      
      toast.success('저장 완료');
      onOpenChange(false);
    } catch (e: any) {
      console.error('Failed to save menu:', e);
      toast.error(e?.message ?? '저장 중 오류가 발생했습니다');
    } finally {
      setSaving(false); // ✅ 항상 복구
    }
  };

  if (!menu) return null;

  const hasChanges = 
    (parseInt(price) !== menu.price && !isNaN(parseInt(price))) ||
    description.trim() !== menu.description ||
    !!imageFile;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <DialogHeader>
            <DialogTitle>메뉴 수정</DialogTitle>
            <DialogDescription>
              {menu.name}의 가격과 설명을 수정합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 이미지 변경 */}
            <div className="space-y-2">
              <Label>메뉴 이미지</Label>
              {imagePreview && (
                <img src={imagePreview} alt="미리보기" className="w-32 h-32 rounded object-cover" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setImageFile(f);
                  setImagePreview(URL.createObjectURL(f));
                }}
              />
              {imageFile && (
                <Input
                  placeholder="이미지 변경 사유"
                  value={imageReason}
                  onChange={(e) => setImageReason(e.target.value)}
                />
              )}
            </div>
            {/* 가격 */}
            <div className="space-y-2">
              <Label htmlFor="price">가격 (원)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min="0"
                step="500"
                placeholder="9000"
              />
              {parseInt(price) !== menu.price && !isNaN(parseInt(price)) && (
                <p className="text-xs text-[#F37021]">
                  {menu.price.toLocaleString()}원 → {parseInt(price).toLocaleString()}원
                </p>
              )}
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                maxLength={200}
                placeholder="메뉴 설명을 입력하세요"
              />
              <p className="text-xs text-gray-500 text-right">
                {description.length}/200자
              </p>
            </div>

            {/* 변경 사유 */}
            {hasChanges && (
              <div className="space-y-2">
                <Label htmlFor="reason">
                  변경 사유 
                  {((parseInt(price) !== menu.price && !isNaN(parseInt(price))) || description.trim() !== menu.description) && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder={
                    imageFile && !(parseInt(price) !== menu.price || description.trim() !== menu.description)
                      ? "이미지 변경 사유 (선택)"
                      : "예: 원가 상승으로 인한 가격 조정"
                  }
                  required={!!((parseInt(price) !== menu.price && !isNaN(parseInt(price))) || description.trim() !== menu.description)}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={
                saving ||
                loading ||
                !hasChanges ||
                // 가격/설명 변경 시에만 reason 필수
                (((parseInt(price) !== menu.price && !isNaN(parseInt(price))) || description.trim() !== menu.description) && !reason.trim())
              }
              className="bg-[#D61C1C] hover:bg-[#D61C1C]/90"
            >
              {saving || loading ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

## 66. src/components/admin/MenuTable.tsx

```typescript
/**
 * 관리자 메뉴 테이블
 * 썸네일/이름/카테고리/가격/배지/상태/액션
 */

import { Menu, CATEGORY_LABELS, BADGE_LABELS } from '../../types/menu';
import { getMenuStatus } from '../../lib/admin/menus.api';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreVertical, Edit2, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MenuTableProps {
  menus: Menu[];
  onToggleAvailability: (menuId: string) => void;
  onEdit?: (menu: Menu) => void;
  onSetTimeLimit?: (menu: Menu) => void;
  loading?: boolean;
}

export function MenuTable({
  menus,
  onToggleAvailability,
  onEdit,
  onSetTimeLimit,
  loading,
}: MenuTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <>
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-600 w-20">이미지</th>
              <th className="px-4 py-3 text-left text-xs text-gray-600">메뉴명</th>
              <th className="px-4 py-3 text-left text-xs text-gray-600">카테고리</th>
              <th className="px-4 py-3 text-right text-xs text-gray-600">가격</th>
              <th className="px-4 py-3 text-left text-xs text-gray-600">배지</th>
              <th className="px-4 py-3 text-center text-xs text-gray-600">상태</th>
              <th className="px-4 py-3 text-center text-xs text-gray-600 w-24">판매</th>
              <th className="px-4 py-3 text-center text-xs text-gray-600 w-12">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {menus.map(menu => {
              const status = getMenuStatus(menu);
              return (
                <tr key={menu.menuId} className="hover:bg-gray-50">
                  {/* 썸네일 */}
                  <td className="px-4 py-3">
                    <ImageWithFallback
                      src={menu.image}
                      alt={menu.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  {/* 메뉴명 */}
                  <td className="px-4 py-3">
                    <div className="text-sm text-[#333]">{menu.name}</div>
                    {menu.availableHours && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {menu.availableHours.start} - {menu.availableHours.end}
                      </div>
                    )}
                  </td>

                  {/* 카테고리 */}
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {CATEGORY_LABELS[menu.category]}
                    </Badge>
                  </td>

                  {/* 가격 */}
                  <td className="px-4 py-3 text-right text-sm">
                    {menu.price.toLocaleString()}원
                  </td>

                  {/* 배지 */}
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {menu.badges.map(badge => (
                        <Badge
                          key={badge}
                          variant={
                            badge === 'best' ? 'default' :
                            badge === 'signature' ? 'secondary' :
                            'outline'
                          }
                          className={
                            badge === 'best' ? 'bg-[#D61C1C]' :
                            badge === 'signature' ? 'bg-[#C7A45A]' :
                            badge === 'spicy' ? 'bg-[#F37021] text-white' :
                            badge === 'cold' ? 'bg-blue-500 text-white' :
                            ''
                          }
                        >
                          {BADGE_LABELS[badge]}
                        </Badge>
                      ))}
                    </div>
                  </td>

                  {/* 상태 */}
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant="outline"
                      className={
                        status === 'available' ? 'border-green-500 text-green-700' :
                        status === 'soldout' ? 'border-gray-400 text-gray-600' :
                        status === 'time-limited' ? 'border-yellow-500 text-yellow-700' :
                        ''
                      }
                    >
                      {status === 'available' ? '판매중' :
                       status === 'soldout' ? '품절' :
                       status === 'time-limited' ? '시간외' :
                       '숨김'}
                    </Badge>
                  </td>

                  {/* 판매 스위치 */}
                  <td className="px-4 py-3 text-center">
                    <Switch
                      checked={menu.isAvailable}
                      onCheckedChange={() => onToggleAvailability(menu.menuId)}
                    />
                  </td>

                  {/* 액션 */}
                  <td className="px-4 py-3 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(menu)}>
                            <Edit2 className="w-4 h-4 mr-2" />
                            가격/설명 수정
                          </DropdownMenuItem>
                        )}
                        {onSetTimeLimit && (
                          <DropdownMenuItem onClick={() => onSetTimeLimit(menu)}>
                            <Clock className="w-4 h-4 mr-2" />
                            시간제 설정
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 모바일 카드 */}
      <div className="md:hidden space-y-3">
        {menus.map(menu => {
          const status = getMenuStatus(menu);
          return (
            <div key={menu.menuId} className="bg-white border rounded-lg p-4 space-y-3">
              {/* 헤더: 썸네일 + 정보 */}
              <div className="flex gap-3">
                <ImageWithFallback
                  src={menu.image}
                  alt={menu.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#333] mb-1">{menu.name}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    {CATEGORY_LABELS[menu.category]} • {menu.price.toLocaleString()}원
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {menu.badges.map(badge => (
                      <Badge
                        key={badge}
                        variant="outline"
                        className={
                          badge === 'best' ? 'bg-[#D61C1C] text-white border-[#D61C1C]' :
                          badge === 'signature' ? 'bg-[#C7A45A] text-white border-[#C7A45A]' :
                          badge === 'spicy' ? 'bg-[#F37021] text-white border-[#F37021]' :
                          badge === 'cold' ? 'bg-blue-500 text-white border-blue-500' :
                          ''
                        }
                      >
                        {BADGE_LABELS[badge]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* 상태 & 액션 */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      status === 'available' ? 'border-green-500 text-green-700' :
                      status === 'soldout' ? 'border-gray-400 text-gray-600' :
                      status === 'time-limited' ? 'border-yellow-500 text-yellow-700' :
                      ''
                    }
                  >
                    {status === 'available' ? '판매중' :
                     status === 'soldout' ? '품절' :
                     status === 'time-limited' ? '시간외' :
                     '숨김'}
                  </Badge>
                  {menu.availableHours && (
                    <span className="text-xs text-gray-500">
                      {menu.availableHours.start}-{menu.availableHours.end}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={menu.isAvailable}
                    onCheckedChange={() => onToggleAvailability(menu.menuId)}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(menu)}>
                          <Edit2 className="w-4 h-4 mr-2" />
                          가격/설명 수정
                        </DropdownMenuItem>
                      )}
                      {onSetTimeLimit && (
                        <DropdownMenuItem onClick={() => onSetTimeLimit(menu)}>
                          <Clock className="w-4 h-4 mr-2" />
                          시간제 설정
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
```

## 67. src/components/admin/OptionGroupsManagement.tsx

```typescript
/**
 * 옵션 그룹 관리 컴포넌트
 * 관리자가 옵션 그룹과 옵션 항목을 생성/수정/삭제
 */

import { useState, useEffect } from 'react';
import { OptionGroup, OptionItem } from '../../types/menu';
import {
  getOptionGroups,
  createOptionGroup,
  updateOptionGroup,
  deleteOptionGroup,
  addOptionItem,
  updateOptionItem,
  deleteOptionItem,
} from '../../lib/admin/optionGroups.api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

export function OptionGroupsManagement() {
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // 옵션 그룹 다이얼로그
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<OptionGroup | null>(null);
  const [groupForm, setGroupForm] = useState({
    name: '',
    required: true,
    multiSelect: false,
    maxSelect: 1,
  });

  // 옵션 항목 다이얼로그
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ groupId: string; item: OptionItem } | null>(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    quantity: 1,
    price: 0,
  });
  const [currentGroupId, setCurrentGroupId] = useState<string>('');

  // 데이터 로드
  useEffect(() => {
    loadOptionGroups();
  }, []);

  const loadOptionGroups = async () => {
    try {
      setLoading(true);
      const groups = await getOptionGroups();
      setOptionGroups(groups);
    } catch (error) {
      toast.error('옵션 그룹을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  // 옵션 그룹 펼치기/접기
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  // 옵션 그룹 생성/수정 다이얼로그 열기
  const openGroupDialog = (group?: OptionGroup) => {
    if (group) {
      setEditingGroup(group);
      setGroupForm({
        name: group.name,
        required: group.required,
        multiSelect: group.multiSelect,
        maxSelect: group.maxSelect || 1,
      });
    } else {
      setEditingGroup(null);
      setGroupForm({
        name: '',
        required: true,
        multiSelect: false,
        maxSelect: 1,
      });
    }
    setGroupDialogOpen(true);
  };

  // 옵션 그룹 저장
  const handleSaveGroup = async () => {
    try {
      if (!groupForm.name.trim()) {
        toast.error('옵션 그룹 이름을 입력하세요');
        return;
      }

      if (editingGroup) {
        // 수정
        await updateOptionGroup(editingGroup.id, groupForm);
        toast.success('옵션 그룹이 수정되었습니다');
      } else {
        // 생성
        await createOptionGroup({
          ...groupForm,
          items: [],
          order: optionGroups.length + 1,
        });
        toast.success('옵션 그룹이 생성되었습니다');
      }

      setGroupDialogOpen(false);
      loadOptionGroups();
    } catch (error) {
      toast.error('저장에 실패했습니다');
    }
  };

  // 옵션 그룹 삭제
  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm('이 옵션 그룹을 삭제하시겠습니까?')) return;

    try {
      await deleteOptionGroup(groupId);
      toast.success('옵션 그룹이 삭제되었습니다');
      loadOptionGroups();
    } catch (error) {
      toast.error('삭제에 실패했습니다');
    }
  };

  // 옵션 항목 추가/수정 다이얼로그 열기
  const openItemDialog = (groupId: string, item?: OptionItem) => {
    setCurrentGroupId(groupId);
    if (item) {
      setEditingItem({ groupId, item });
      setItemForm({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      });
    } else {
      setEditingItem(null);
      setItemForm({
        name: '',
        quantity: 1,
        price: 0,
      });
    }
    setItemDialogOpen(true);
  };

  // 옵션 항목 저장
  const handleSaveItem = async () => {
    try {
      if (!itemForm.name.trim()) {
        toast.error('옵션 이름을 입력하세요');
        return;
      }

      if (itemForm.quantity < 1) {
        toast.error('수량은 1 이상이어야 합니다');
        return;
      }

      if (editingItem) {
        // 수정
        await updateOptionItem(editingItem.groupId, editingItem.item.id, itemForm);
        toast.success('옵션이 수정되었습니다');
      } else {
        // 추가
        await addOptionItem(currentGroupId, itemForm);
        toast.success('옵션이 추가되었습니다');
      }

      setItemDialogOpen(false);
      loadOptionGroups();
    } catch (error) {
      toast.error('저장에 실패했습니다');
    }
  };

  // 옵션 항목 삭제
  const handleDeleteItem = async (groupId: string, itemId: string) => {
    if (!confirm('이 옵션을 삭제하시겠습니까?')) return;

    try {
      await deleteOptionItem(groupId, itemId);
      toast.success('옵션이 삭제되었습니다');
      loadOptionGroups();
    } catch (error) {
      toast.error('삭제에 실패했습니다');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg">옵션 그룹 관리</h3>
          <p className="text-sm text-gray-500">메뉴에 사용할 옵션 그룹을 관리합니다</p>
        </div>
        <Button onClick={() => openGroupDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          옵션 그룹 추가
        </Button>
      </div>

      {optionGroups.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-gray-500">
            등록된 옵션 그룹이 없습니다
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {optionGroups.map((group) => (
            <Card key={group.id}>
              <Collapsible open={expandedGroups.has(group.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CollapsibleTrigger onClick={() => toggleGroup(group.id)}>
                        {expandedGroups.has(group.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </CollapsibleTrigger>
                      <div>
                        <CardTitle className="text-base">{group.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {group.required && (
                            <Badge variant="secondary" className="text-xs">
                              필수
                            </Badge>
                          )}
                          {group.multiSelect && (
                            <Badge variant="outline" className="text-xs">
                              다중선택 (최대 {group.maxSelect || '무제한'})
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {group.items.length}개 항목
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openItemDialog(group.id)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        옵션 추가
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openGroupDialog(group)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CollapsibleContent>
                  <CardContent>
                    {group.items.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        옵션 항목이 없습니다
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>옵션명</TableHead>
                            <TableHead>수량</TableHead>
                            <TableHead>추가 가격</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                {item.price > 0
                                  ? `+${item.price.toLocaleString()}원`
                                  : '무료'}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openItemDialog(group.id, item)}
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteItem(group.id, item.id)}
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      )}

      {/* 옵션 그룹 생성/수정 다이얼로그 */}
      <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGroup ? '옵션 그룹 수정' : '옵션 그룹 추가'}
            </DialogTitle>
            <DialogDescription>
              옵션 그룹 정보를 입력하세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="groupName">옵션 그룹 이름 *</Label>
              <Input
                id="groupName"
                placeholder="예: 면양, 맵기, 토핑, 사이즈"
                value={groupForm.name}
                onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={groupForm.required}
                onCheckedChange={(checked) =>
                  setGroupForm({ ...groupForm, required: !!checked })
                }
              />
              <Label htmlFor="required" className="cursor-pointer">
                필수 선택
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiSelect"
                checked={groupForm.multiSelect}
                onCheckedChange={(checked) =>
                  setGroupForm({ ...groupForm, multiSelect: !!checked })
                }
              />
              <Label htmlFor="multiSelect" className="cursor-pointer">
                다중 선택 가능
              </Label>
            </div>

            {groupForm.multiSelect && (
              <div>
                <Label htmlFor="maxSelect">최대 선택 개수</Label>
                <Input
                  id="maxSelect"
                  type="number"
                  min="1"
                  value={groupForm.maxSelect}
                  onChange={(e) =>
                    setGroupForm({ ...groupForm, maxSelect: parseInt(e.target.value) || 1 })
                  }
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setGroupDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSaveGroup}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 옵션 항목 추가/수정 다이얼로그 */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? '옵션 수정' : '옵션 추가'}
            </DialogTitle>
            <DialogDescription>
              옵션명, 수량, 가격을 입력하세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="itemName">옵션명 *</Label>
              <Input
                id="itemName"
                placeholder="예: 보통, 곱빼기, 순한맛, 수육"
                value={itemForm.name}
                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="quantity">수량 *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={itemForm.quantity}
                onChange={(e) =>
                  setItemForm({ ...itemForm, quantity: parseInt(e.target.value) || 1 })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                이 옵션을 선택하면 제공되는 수량입니다
              </p>
            </div>

            <div>
              <Label htmlFor="price">추가 가격 (원)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={itemForm.price}
                onChange={(e) =>
                  setItemForm({ ...itemForm, price: parseInt(e.target.value) || 0 })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                0원이면 추가 비용이 없습니다
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSaveItem}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## 68. src/components/admin/OrderActionBar.tsx

```typescript
import { useRef, useState } from 'react';
import { Bell, Printer, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { generateReceipt } from '../../lib/functions';
import type { Order } from '../../types/order';

interface OrderActionBarProps {
  order: Order;
}

export function OrderActionBar({ order }: OrderActionBarProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleBellRing = () => {
    // 자리표시자: 실제로는 주방 벨 시스템 연동
    toast.success('알림이 전송되었습니다', {
      description: '주방에 새로운 주문 알림을 보냈습니다.',
    });
  };

  const handlePrint = () => {
    try {
      // 브라우저 프린트 API 사용
      window.print();
      
      toast.success('인쇄 창이 열렸습니다', {
        description: `주문번호: ${order.orderId.slice(0, 8).toUpperCase()}`,
      });
    } catch (error) {
      console.error('Failed to print:', error);
      toast.error('인쇄 실패', {
        description: '프린터 설정을 확인해주세요.',
      });
    }
  };

  const handleDownloadReceipt = async () => {
    setDownloading(true);
    try {
      const receiptUrl = await generateReceipt(order.orderId);
      
      // 새 탭에서 열기
      window.open(receiptUrl, '_blank');
      toast.success('영수증이 다운로드되었습니다');
    } catch (error) {
      console.error('Failed to download receipt:', error);
      toast.error('영수증 다운로드에 실패했습니다');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBellRing}
        className="gap-2"
      >
        <Bell className="w-4 h-4" />
        알림
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        className="gap-2"
      >
        <Printer className="w-4 h-4" />
        주문서
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadReceipt}
        disabled={downloading}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        영수증
      </Button>
    </div>
  );
}
```

## 69. src/components/admin/OrderDetailDrawer.tsx

```typescript
import { useEffect, useState } from 'react';
import type { Order, OrderLog } from '../../types/order';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { MapPin, Phone, Mail, FileText, CreditCard, Clock } from 'lucide-react';
import { fetchOrderLogs } from '../../lib/admin/orders.api';
import { OrderActionBar } from './OrderActionBar';

interface OrderDetailDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailDrawer({ order, open, onClose }: OrderDetailDrawerProps) {
  const [logs, setLogs] = useState<OrderLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    if (order && open) {
      setLogsLoading(true);
      fetchOrderLogs(order.orderId)
        .then(setLogs)
        .finally(() => setLogsLoading(false));
    }
  }, [order, open]);

  if (!order) return null;

  // 날짜 포맷팅
  const formatDateTime = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 금액 포맷팅
  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()}원`;
  };

  // 상태 라벨
  const statusLabels: Record<string, string> = {
    pending: '접수대기',
    accepted: '접수확인',
    preparing: '조리중',
    completed: '완료',
    canceled: '취소',
  };

  // 결제수단 라벨
  const paymentMethodLabels: Record<string, string> = {
    card: '카드',
    transfer: '계좌이체',
    easy_pay: '간편결제',
    on_site: '만나서결제',
  };

  // 타임라인 항목
  const timelineItems = Object.entries(order.timeline)
    .filter(([_, timestamp]) => timestamp)
    .map(([status, timestamp]) => ({
      status,
      label: statusLabels[status] || status,
      timestamp: timestamp!,
    }))
    .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>주문 상세</SheetTitle>
          <SheetDescription>{order.orderId}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          <div className="space-y-6">
            {/* 액션 바 */}
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  order.status === 'completed'
                    ? 'default'
                    : order.status === 'canceled'
                    ? 'destructive'
                    : 'secondary'
                }
                className={
                  order.status === 'pending'
                    ? 'bg-gray-100 text-gray-700'
                    : order.status === 'accepted'
                    ? 'bg-blue-100 text-blue-700'
                    : order.status === 'preparing'
                    ? 'bg-amber-100 text-amber-700'
                    : order.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : ''
                }
              >
                {statusLabels[order.status]}
              </Badge>
              <OrderActionBar order={order} />
            </div>

            <Separator />

            {/* 주문 항목 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">주문 항목</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <img
                      src={item.menuImage}
                      alt={item.menuName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#333] mb-1">{item.menuName}</div>
                      <div className="text-xs text-[#8B7355] space-y-0.5">
                        {item.options.noodle && <div>면: {item.options.noodle}</div>}
                        {item.options.spicy && <div>맵기: {item.options.spicy}</div>}
                        {item.options.toppings && item.options.toppings.length > 0 && (
                          <div>토핑: {item.options.toppings.join(', ')}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#333]">{item.quantity}개</div>
                      <div className="text-sm text-[#8B7355]">
                        {formatAmount(item.subtotal)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#8B7355]">
                  <span>소계</span>
                  <span>{formatAmount(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#D61C1C]">
                    <span>할인 {order.couponId && `(${order.couponId})`}</span>
                    <span>-{formatAmount(order.discount)}</span>
                  </div>
                )}
                {order.deliveryFee > 0 && (
                  <div className="flex justify-between text-[#8B7355]">
                    <span>배달비</span>
                    <span>{formatAmount(order.deliveryFee)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-[#333]">
                  <span>최종 금액</span>
                  <span>{formatAmount(order.finalAmount)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* 배달 정보 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">배달 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <Badge variant="outline">
                    {order.deliveryType === 'delivery' ? '배달' : '포장'}
                  </Badge>
                </div>

                {order.deliveryAddress && (
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[#333]">{order.deliveryAddress.address}</div>
                      {order.deliveryAddress.detail && (
                        <div className="text-[#8B7355]">{order.deliveryAddress.detail}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Phone className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                  <div className="text-[#333]">{order.phone}</div>
                </div>

                {order.email && (
                  <div className="flex gap-2">
                    <Mail className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                    <div className="text-[#333]">{order.email}</div>
                  </div>
                )}

                {order.requests && (
                  <div className="flex gap-2">
                    <FileText className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                    <div className="text-[#333]">{order.requests}</div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 결제 정보 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">결제 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <CreditCard className="w-4 h-4 text-[#8B7355]" />
                    <span className="text-[#333]">
                      {paymentMethodLabels[order.payment.method]}
                    </span>
                  </div>
                  <Badge
                    variant={
                      order.payment.status === 'approved' ? 'default' : 'secondary'
                    }
                    className={
                      order.payment.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : order.payment.status === 'refunded'
                        ? 'bg-red-100 text-red-700'
                        : ''
                    }
                  >
                    {order.payment.status === 'approved'
                      ? '승인'
                      : order.payment.status === 'pending'
                      ? '대기'
                      : order.payment.status === 'refunded'
                      ? '환불'
                      : order.payment.status}
                  </Badge>
                </div>

                {order.payment.tid && (
                  <div className="text-xs text-[#8B7355]">거래ID: {order.payment.tid}</div>
                )}

                {order.payment.cardName && (
                  <div className="text-xs text-[#8B7355]">
                    {order.payment.cardName} {order.payment.cardNum}
                  </div>
                )}

                {order.payment.paidAt && (
                  <div className="text-xs text-[#8B7355]">
                    결제일시: {formatDateTime(order.payment.paidAt)}
                  </div>
                )}

                {order.payment.cancelReason && (
                  <div className="p-3 bg-red-50 rounded-lg text-xs text-red-700">
                    취소 사유: {order.payment.cancelReason}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 타임라인 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">타임라인</h3>
              <div className="space-y-3">
                {timelineItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-[#D61C1C] mt-1.5" />
                      {index < timelineItems.length - 1 && (
                        <div className="absolute left-1 top-4 w-px h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#333]">{item.label}</span>
                        <Clock className="w-3 h-3 text-[#8B7355]" />
                        <span className="text-xs text-[#8B7355]">
                          {formatTime(item.timestamp)}
                        </span>
                      </div>
                      <div className="text-xs text-[#8B7355] mt-0.5">
                        {formatDateTime(item.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 로그 */}
            <div>
              <h3 className="text-sm text-[#333] mb-3">변경 이력</h3>
              {logsLoading ? (
                <div className="text-xs text-[#8B7355]">로딩 중...</div>
              ) : logs.length === 0 ? (
                <div className="text-xs text-[#8B7355]">변경 이력이 없습니다</div>
              ) : (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div
                      key={log.logId}
                      className="p-3 bg-gray-50 rounded-lg text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[#333]">
                          {log.action === 'status_changed'
                            ? '상태 변경'
                            : log.action === 'canceled'
                            ? '주문 취소'
                            : log.action === 'created'
                            ? '주문 생성'
                            : log.action}
                        </span>
                        <span className="text-[#8B7355]">
                          {formatDateTime(log.at)}
                        </span>
                      </div>
                      {log.from && log.to && (
                        <div className="text-[#8B7355]">
                          {statusLabels[log.from]} → {statusLabels[log.to]}
                        </div>
                      )}
                      {log.byName && (
                        <div className="text-[#8B7355]">담당자: {log.byName}</div>
                      )}
                      {log.reason && (
                        <div className="text-[#D61C1C]">사유: {log.reason}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
```

## 70. src/components/admin/OrderTable.tsx

```typescript
import { useState } from 'react';
import type { Order, OrderStatus } from '../../types/order';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface OrderTableProps {
  orders: Order[];
  onViewDetail: (order: Order) => void;
  onUpdateStatus: (order: Order, newStatus: OrderStatus) => void;
  isLoading?: boolean;
}

// 상태별 배지 스타일
const statusConfig: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  pending: { label: '접수대기', variant: 'secondary' },
  accepted: { label: '접수확인', variant: 'default' },
  preparing: { label: '조리중', variant: 'outline' },
  completed: { label: '완료', variant: 'default' },
  canceled: { label: '취소', variant: 'destructive' },
};

// 결제수단 라벨
const paymentMethodLabels: Record<string, string> = {
  card: '카드',
  transfer: '계좌이체',
  easy_pay: '간편결제',
  on_site: '만나서결제',
};

export function OrderTable({ orders, onViewDetail, onUpdateStatus, isLoading }: OrderTableProps) {
  // 날짜 포맷팅
  const formatDate = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;

    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 금액 포맷팅
  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()}원`;
  };

  // 메뉴 요약
  const getMenuSummary = (order: Order) => {
    const first = order.items[0];
    const rest = order.items.length - 1;
    return rest > 0 ? `${first.menuName} 외 ${rest}개` : first.menuName;
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주문번호</TableHead>
              <TableHead>시간</TableHead>
              <TableHead>메뉴</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>결제</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={7}>
                  <div className="h-12 bg-gray-100 animate-pulse rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-3xl">📦</span>
        </div>
        <p className="text-[#8B7355]">주문이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주문번호</TableHead>
              <TableHead>시간</TableHead>
              <TableHead>메뉴</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>결제</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId} className="hover:bg-gray-50">
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-[#333]">{order.orderId}</div>
                    <div className="text-xs text-[#8B7355]">{order.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-[#333]">{formatDate(order.createdAt)}</div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-[#333]">{getMenuSummary(order)}</div>
                    {order.deliveryType === 'delivery' && (
                      <Badge variant="outline" className="text-xs">
                        배달
                      </Badge>
                    )}
                    {order.deliveryType === 'pickup' && (
                      <Badge variant="outline" className="text-xs">
                        포장
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-[#333]">{formatAmount(order.finalAmount)}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-[#8B7355]">
                    {paymentMethodLabels[order.payment.method] || order.payment.method}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig[order.status].variant}
                    className={
                      order.status === 'pending'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : order.status === 'accepted'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : order.status === 'preparing'
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : order.status === 'completed'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : ''
                    }
                  >
                    {statusConfig[order.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetail(order)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetail(order)}>
                          상세 보기
                        </DropdownMenuItem>
                        {order.status === 'pending' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'accepted')}
                            >
                              접수 확인
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'canceled')}
                              className="text-red-600"
                            >
                              주문 취소
                            </DropdownMenuItem>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'preparing')}
                            >
                              조리 시작
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'canceled')}
                              className="text-red-600"
                            >
                              주문 취소
                            </DropdownMenuItem>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'completed')}
                            >
                              완료 처리
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUpdateStatus(order, 'canceled')}
                              className="text-red-600"
                            >
                              주문 취소
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 모바일 카드 */}
      <div className="md:hidden divide-y">
        {orders.map((order) => (
          <div key={order.orderId} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="text-sm text-[#333]">{order.orderId}</div>
                <div className="text-xs text-[#8B7355]">{formatDate(order.createdAt)}</div>
              </div>
              <Badge
                variant={statusConfig[order.status].variant}
                className={
                  order.status === 'pending'
                    ? 'bg-gray-100 text-gray-700'
                    : order.status === 'accepted'
                    ? 'bg-blue-100 text-blue-700'
                    : order.status === 'preparing'
                    ? 'bg-amber-100 text-amber-700'
                    : order.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : ''
                }
              >
                {statusConfig[order.status].label}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-[#333]">{getMenuSummary(order)}</div>
              <div className="flex items-center gap-2 text-xs text-[#8B7355]">
                <span>{order.phone}</span>
                <span>·</span>
                <span>{formatAmount(order.finalAmount)}</span>
                <span>·</span>
                <span>{paymentMethodLabels[order.payment.method]}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetail(order)}
                className="flex-1"
              >
                상세보기
              </Button>
              {order.status !== 'completed' && order.status !== 'canceled' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {order.status === 'pending' && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(order, 'accepted')}>
                        접수 확인
                      </DropdownMenuItem>
                    )}
                    {order.status === 'accepted' && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(order, 'preparing')}>
                        조리 시작
                      </DropdownMenuItem>
                    )}
                    {order.status === 'preparing' && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(order, 'completed')}>
                        완료 처리
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(order, 'canceled')}
                      className="text-red-600"
                    >
                      주문 취소
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 71. src/components/admin/PrintableOrder.tsx

```typescript
import { forwardRef } from 'react';
import type { Order } from '../../types/order';

interface PrintableOrderProps {
  order: Order;
}

/**
 * 인쇄용 주문서 컴포넌트
 * - 브라우저 print() API용 레이아웃
 * - 영수증 프린터 호환 포맷
 */
export const PrintableOrder = forwardRef<HTMLDivElement, PrintableOrderProps>(
  ({ order }, ref) => {
    const createdAt = order.createdAt
      ? new Date((order.createdAt as any).toDate?.() || order.createdAt).toLocaleString('ko-KR')
      : '';

    return (
      <div ref={ref} className="print:block hidden">
        <style>
          {`
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
              }
              .print-content {
                width: 80mm;
                font-family: 'Courier New', monospace;
                font-size: 10pt;
                padding: 5mm;
              }
              .print-content h1 {
                font-size: 14pt;
                margin: 0 0 5mm 0;
                text-align: center;
              }
              .print-content h2 {
                font-size: 12pt;
                margin: 3mm 0 2mm 0;
                border-bottom: 1px dashed #000;
                padding-bottom: 1mm;
              }
              .print-content table {
                width: 100%;
                border-collapse: collapse;
              }
              .print-content td {
                padding: 1mm 0;
              }
              .print-divider {
                border-top: 1px dashed #000;
                margin: 3mm 0;
              }
            }
          `}
        </style>

        <div className="print-content">
          {/* 헤더 */}
          <h1>현풍닭칼국수</h1>
          <div style={{ textAlign: 'center', fontSize: '9pt', marginBottom: '5mm' }}>
            주문서
          </div>

          {/* 주문 정보 */}
          <table>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>주문번호:</td>
                <td>{order.orderId.slice(0, 8).toUpperCase()}</td>
              </tr>
              <tr>
                <td>주문시각:</td>
                <td>{createdAt}</td>
              </tr>
              <tr>
                <td>주문유형:</td>
                <td>{order.deliveryType === 'delivery' ? '배달' : '포장'}</td>
              </tr>
              <tr>
                <td>연락처:</td>
                <td>{order.phone}</td>
              </tr>
            </tbody>
          </table>

          {/* 배달 주소 */}
          {order.deliveryType === 'delivery' && order.deliveryAddress && (
            <>
              <div className="print-divider" />
              <h2>배달 주소</h2>
              <div style={{ fontSize: '9pt', lineHeight: '1.4' }}>
                {order.deliveryAddress.address}
                {order.deliveryAddress.detail && (
                  <>
                    <br />
                    {order.deliveryAddress.detail}
                  </>
                )}
              </div>
            </>
          )}

          {/* 주문 항목 */}
          <div className="print-divider" />
          <h2>주문 내역</h2>
          <table>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td colSpan={2}>
                    <div>
                      <strong>{item.menuName}</strong> x {item.quantity}
                    </div>
                    {(item.options.noodle || item.options.spicy || item.options.toppings) && (
                      <div style={{ fontSize: '8pt', color: '#666', marginLeft: '2mm' }}>
                        {[
                          item.options.noodle && `면양: ${item.options.noodle}`,
                          item.options.spicy && `맵기: ${item.options.spicy}`,
                          item.options.toppings &&
                            item.options.toppings.length > 0 &&
                            `토핑: ${item.options.toppings.join(', ')}`,
                        ]
                          .filter(Boolean)
                          .join(' / ')}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {item.subtotal.toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 금액 합계 */}
          <div className="print-divider" />
          <table>
            <tbody>
              <tr>
                <td>소계</td>
                <td style={{ textAlign: 'right' }}>{order.subtotal.toLocaleString()}원</td>
              </tr>
              {order.discount > 0 && (
                <tr>
                  <td>할인</td>
                  <td style={{ textAlign: 'right' }}>-{order.discount.toLocaleString()}원</td>
                </tr>
              )}
              {order.deliveryType === 'delivery' && (
                <tr>
                  <td>배달비</td>
                  <td style={{ textAlign: 'right' }}>+{order.deliveryFee.toLocaleString()}원</td>
                </tr>
              )}
              <tr style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                <td>총 결제액</td>
                <td style={{ textAlign: 'right' }}>{order.finalAmount.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>

          {/* 결제 정보 */}
          <div className="print-divider" />
          <table>
            <tbody>
              <tr>
                <td>결제수단</td>
                <td style={{ textAlign: 'right' }}>
                  {order.payment.method === 'card'
                    ? '카드'
                    : order.payment.method === 'easy_pay'
                    ? '간편결제'
                    : order.payment.method === 'transfer'
                    ? '계좌이체'
                    : '만나서결제'}
                </td>
              </tr>
              <tr>
                <td>결제상태</td>
                <td style={{ textAlign: 'right' }}>
                  {order.payment.status === 'approved' ? '승인완료' : '대기중'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* 요청사항 */}
          {order.requests && (
            <>
              <div className="print-divider" />
              <h2>요청사항</h2>
              <div style={{ fontSize: '9pt', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                {order.requests}
              </div>
            </>
          )}

          {/* 하단 정보 */}
          <div className="print-divider" />
          <div style={{ fontSize: '8pt', textAlign: 'center', color: '#666' }}>
            감사합니다
            <br />
            시스템 개발: KS컴퍼니
          </div>
        </div>
      </div>
    );
  }
);

PrintableOrder.displayName = 'PrintableOrder';
```

## 72. src/components/admin/ReplyModal.tsx

```typescript
import { useState, useEffect } from 'react';
import { Modal } from './common/Modal';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import type { Review } from '../../types/review';

export interface ReplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: Review | null;
  onSubmit: (reviewId: string, text: string) => Promise<void>;
  onDelete?: (reviewId: string) => Promise<void>;
}

export function ReplyModal({
  open,
  onOpenChange,
  review,
  onSubmit,
  onDelete,
}: ReplyModalProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const maxLength = 200;
  const isEditing = !!review?.reply;

  useEffect(() => {
    if (review?.reply) {
      setText(review.reply.text);
    } else {
      setText('');
    }
  }, [review]);

  async function handleSubmit() {
    if (!review) return;

    if (text.trim().length < 10) {
      toast.error('답글은 최소 10자 이상 입력해주세요.');
      return;
    }

    if (text.length > maxLength) {
      toast.error(`답글은 최대 ${maxLength}자까지 입력 가능합니다.`);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(review.id!, text.trim());
      toast.success(isEditing ? '답글이 수정되었습니다.' : '답글이 등록되었습니다.');
      onOpenChange(false);
    } catch (error) {
      console.error('답글 저장 실패:', error);
      toast.error('답글 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!review?.id || !onDelete) return;

    if (!confirm('답글을 삭제하시겠습니까?')) return;

    setLoading(true);
    try {
      await onDelete(review.id);
      toast.success('답글이 삭제되었습니다.');
      onOpenChange(false);
    } catch (error) {
      console.error('답글 삭제 실패:', error);
      toast.error('답글 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  if (!review) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? '답글 수정' : '답글 작성'}
      description={`${review.userName}님의 리뷰에 답글을 남겨보세요.`}
      size="md"
    >
      <div className="space-y-4">
        {/* 원본 리뷰 */}
        <div className="bg-[#F9F6F3] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#333]">{review.userName}</span>
            <span className="text-[#8B7355]">·</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-[#F37021]">⭐</span>
              ))}
            </div>
          </div>
          <p className="text-[#333] line-clamp-3">{review.text}</p>
        </div>

        {/* 답글 입력 */}
        <div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="고객님께 전할 답글을 입력하세요..."
            rows={5}
            maxLength={maxLength}
            className="resize-none"
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[#8B7355]">
              {text.length}/{maxLength}자
            </span>
            <span className="text-[#8B7355]">
              최소 10자 이상
            </span>
          </div>
        </div>

        {/* 도움말 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-900">
            💡 <strong>답글 작성 팁:</strong>
          </p>
          <ul className="mt-2 space-y-1 text-blue-800">
            <li>• 감사 인사로 시작하세요</li>
            <li>• 구체적인 개선 사항이나 설명을 덧붙이세요</li>
            <li>• 친근하고 진심 어린 톤을 사용하세요</li>
          </ul>
        </div>

        {/* 버튼 */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1"
          >
            취소
          </Button>

          {isEditing && onDelete && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={loading}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              삭제
            </Button>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading || text.trim().length < 10}
            className="flex-1 bg-[#D61C1C] hover:bg-[#B91818]"
          >
            {loading ? '저장 중...' : isEditing ? '수정' : '등록'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
```

## 73. src/components/admin/ReportDialog.tsx

```typescript
import { useState } from 'react';
import { Modal } from './common/Modal';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner@2.0.3';
import type { ReviewReportReason } from '../../types/review';
import { REPORT_REASON_LABELS } from '../../types/review';

export interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: string | null;
  onSubmit: (reviewId: string, reason: ReviewReportReason, description?: string) => Promise<void>;
}

export function ReportDialog({
  open,
  onOpenChange,
  reviewId,
  onSubmit,
}: ReportDialogProps) {
  const [reason, setReason] = useState<ReviewReportReason>('spam');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!reviewId) return;

    setLoading(true);
    try {
      await onSubmit(reviewId, reason, description.trim() || undefined);
      toast.success('리뷰 신고가 접수되었습니다.');
      onOpenChange(false);
      
      // 초기화
      setReason('spam');
      setDescription('');
    } catch (error: any) {
      console.error('리뷰 신고 실패:', error);
      toast.error(error.message || '리뷰 신고에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="리뷰 신고"
      description="부적절한 리뷰를 신고해주세요."
      size="md"
    >
      <div className="space-y-4">
        {/* 신고 사유 선택 */}
        <div>
          <Label className="mb-3 block text-[#333]">신고 사유</Label>
          <RadioGroup value={reason} onValueChange={(v) => setReason(v as ReviewReportReason)}>
            {(Object.keys(REPORT_REASON_LABELS) as ReviewReportReason[]).map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={`reason-${key}`} />
                <Label htmlFor={`reason-${key}`} className="cursor-pointer">
                  {REPORT_REASON_LABELS[key]}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 상세 설명 (선택사항) */}
        <div>
          <Label htmlFor="description" className="mb-2 block text-[#333]">
            상세 설명 (선택사항)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="신고 사유에 대한 자세한 설명을 입력하세요..."
            rows={3}
            maxLength={500}
            className="resize-none"
            disabled={loading}
          />
          <div className="flex justify-end mt-1">
            <span className="text-[#8B7355]">
              {description.length}/500자
            </span>
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-amber-900">
            ⚠️ <strong>신고 안내:</strong>
          </p>
          <ul className="mt-2 space-y-1 text-amber-800">
            <li>• 신고는 관리자가 검토 후 조치합니다</li>
            <li>• 허위 신고 시 제재를 받을 수 있습니다</li>
            <li>• 중복 신고는 불가능합니다</li>
          </ul>
        </div>

        {/* 버튼 */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1"
          >
            취소
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? '신고 중...' : '신고하기'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
```

## 74. src/components/admin/ReviewCard.tsx

```typescript
import { useState } from 'react';
import { Star, Image as ImageIcon, MessageSquare, Flag, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Review } from '../../types/review';

export interface ReviewCardProps {
  review: Review;
  onReply?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
  onToggleHidden?: (reviewId: string, hidden: boolean) => void;
}

export function ReviewCard({ review, onReply, onReport, onToggleHidden }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxPreviewLength = 100;
  const needsExpansion = review.text.length > maxPreviewLength;

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#333]">{review.userName || '익명'}</span>
            {review.hasPhoto && (
              <Badge variant="outline" className="text-[#F37021] border-[#F37021]">
                <ImageIcon className="w-3 h-3 mr-1" />
                사진리뷰
              </Badge>
            )}
            {(review.reportedCount || 0) > 0 && (
              <Badge variant="destructive">
                <Flag className="w-3 h-3 mr-1" />
                신고 {review.reportedCount}건
              </Badge>
            )}
            {review.isHidden && (
              <Badge variant="secondary">
                <EyeOff className="w-3 h-3 mr-1" />
                숨김
              </Badge>
            )}
          </div>

          {/* 별점 */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-[#F37021] text-[#F37021]'
                    : 'text-[#E5DDD5]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 날짜 */}
        <time className="text-[#8B7355]">
          {formatDate(review.createdAt)}
        </time>
      </div>

      {/* 리뷰 내용 */}
      <div className="mb-4">
        <p className="text-[#333] whitespace-pre-wrap break-words">
          {needsExpansion && !isExpanded
            ? review.text.slice(0, maxPreviewLength) + '...'
            : review.text}
        </p>
        {needsExpansion && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#D61C1C] hover:underline mt-1"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* 사진 */}
      {review.photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {review.photos.map((photo, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden bg-[#F9F6F3]"
            >
              <img
                src={photo}
                alt={`리뷰 사진 ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                onClick={() => window.open(photo, '_blank')}
              />
            </div>
          ))}
        </div>
      )}

      {/* 답글 */}
      {review.reply && (
        <div className="bg-[#F9F6F3] rounded-lg p-4 mb-4 border-l-4 border-[#D61C1C]">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[#D61C1C]" />
            <span className="text-[#D61C1C]">{review.reply.by}</span>
            <span className="text-[#8B7355]">·</span>
            <time className="text-[#8B7355]">
              {formatDate(review.reply.at)}
            </time>
          </div>
          <p className="text-[#333] whitespace-pre-wrap">{review.reply.text}</p>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex items-center gap-2 flex-wrap">
        {onReply && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReply(review.id!)}
            className="text-[#D61C1C] border-[#D61C1C] hover:bg-[#D61C1C] hover:text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {review.reply ? '답글 수정' : '답글 달기'}
          </Button>
        )}

        {onToggleHidden && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleHidden(review.id!, !review.isHidden)}
          >
            {review.isHidden ? (
              <>
                <Eye className="w-4 h-4 mr-2" />
                표시
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                숨기기
              </>
            )}
          </Button>
        )}

        {onReport && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReport(review.id!)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Flag className="w-4 h-4 mr-2" />
            신고
          </Button>
        )}
      </div>

      {/* 주문 정보 */}
      <div className="mt-4 pt-4 border-t border-[#E5DDD5]">
        <p className="text-[#8B7355]">
          주문번호: {review.orderId}
          {review.rewardIssued && (
            <span className="ml-2 text-[#F37021]">🎁 쿠폰 발급됨</span>
          )}
        </p>
      </div>
    </Card>
  );
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

## 75. src/components/admin/TimeSettingDialog.tsx

```typescript
/**
 * 시간제 판매 설정 다이얼로그
 */

import { useState } from 'react';
import { Menu } from '../../types/menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface TimeSettingDialogProps {
  menu: Menu | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (hours: { start: string; end: string } | null) => void;
  loading?: boolean;
}

export function TimeSettingDialog({
  menu,
  open,
  onOpenChange,
  onSave,
  loading,
}: TimeSettingDialogProps) {
  const [enabled, setEnabled] = useState(false);
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('14:00');

  // 다이얼로그 열릴 때 초기값 설정
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && menu) {
      if (menu.availableHours) {
        setEnabled(true);
        setStartTime(menu.availableHours.start);
        setEndTime(menu.availableHours.end);
      } else {
        setEnabled(false);
        setStartTime('11:00');
        setEndTime('14:00');
      }
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!menu) return;

    if (enabled) {
      onSave({ start: startTime, end: endTime });
    } else {
      onSave(null);
    }
  };

  if (!menu) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>시간제 판매 설정</DialogTitle>
            <DialogDescription>
              {menu.name}의 판매 시간을 제한합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* 활성화 체크박스 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enabled"
                checked={enabled}
                onCheckedChange={(checked) => setEnabled(checked as boolean)}
              />
              <Label htmlFor="enabled" className="cursor-pointer">
                시간제 판매 사용
              </Label>
            </div>

            {enabled && (
              <>
                {/* 시작 시간 */}
                <div className="space-y-2">
                  <Label htmlFor="start">시작 시간</Label>
                  <Input
                    id="start"
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    required
                  />
                </div>

                {/* 종료 시간 */}
                <div className="space-y-2">
                  <Label htmlFor="end">종료 시간</Label>
                  <Input
                    id="end"
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-xs text-blue-800">
                    💡 <strong>{startTime} ~ {endTime}</strong> 시간대에만 주문이 가능합니다.
                    <br />
                    시간 외에는 "시간외" 상태로 표시됩니다.
                  </p>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

## 76. src/components/admin/common/DataTable.tsx

```typescript
import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Skeleton } from '../../ui/skeleton';

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  render?: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  loading,
  emptyMessage = '데이터가 없습니다.',
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-[#E5DDD5] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} style={{ width: col.width }}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#E5DDD5] p-12 text-center">
        <p className="text-[#8B7355]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#E5DDD5] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} style={{ width: col.width }}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id || index}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-[#F9F6F3]' : ''}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render
                    ? col.render(item)
                    : String((item as any)[col.key] || '-')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

## 77. src/components/admin/common/Modal.tsx

```typescript
import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <DialogTitle className="text-[#333]">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-[#8B7355]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-4">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  variant = 'default',
  loading,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button
            variant="outline"
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            disabled={loading}
            className={
              variant === 'destructive'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#D61C1C] hover:bg-[#B91818]'
            }
          >
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}
```

## 78. src/components/admin/common/StatCard.tsx

```typescript
import { LucideIcon } from 'lucide-react';
import { Card } from '../../ui/card';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number; // 퍼센트
    isPositive: boolean;
  };
  subtitle?: string;
  loading?: boolean;
  variant?: 'default' | 'success' | 'info' | 'warning';
}

export function StatCard({ title, value, icon: Icon, trend, subtitle, loading, variant = 'default' }: StatCardProps) {
  const variantColors = {
    default: 'bg-[#D61C1C]/10 text-[#D61C1C]',
    success: 'bg-green-500/10 text-green-600',
    info: 'bg-blue-500/10 text-blue-600',
    warning: 'bg-amber-500/10 text-amber-600',
  };

  if (loading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-24 h-4 bg-[#E5DDD5] rounded" />
          <div className="w-10 h-10 bg-[#E5DDD5] rounded-lg" />
        </div>
        <div className="w-32 h-8 bg-[#E5DDD5] rounded mb-2" />
        {subtitle && <div className="w-20 h-3 bg-[#E5DDD5] rounded" />}
      </Card>
    );
  }

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-[#8B7355] mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-[#333]">{value}</span>
            {trend && (
              <span
                className={`text-sm ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-[#8B7355] mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${variantColors[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
```

## 79. src/components/app/AppHeader.tsx

```typescript
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { FEATURE_FLAGS } from '../../config/env';

interface AppHeaderProps {
  showBack?: boolean;
  title?: string;
}

export function AppHeader({ showBack = false, title }: AppHeaderProps) {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#2E1C10]/10">
      <div className="flex items-center justify-between h-14 px-4">
        {/* 왼쪽: 뒤로가기 또는 로고 */}
        <div className="flex items-center">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-[#2E1C10]/5"
              aria-label="뒤로가기"
            >
              <ArrowLeft className="w-6 h-6 text-[#2E1C10]" />
            </button>
          ) : (
            <Link to="/app" className="flex items-center gap-2">
              <ChickenLogo />
              <span className="text-[#2E1C10]">
                현풍닭칼국수
              </span>
            </Link>
          )}
          {title && (
            <h1 className="ml-2 text-[#2E1C10]">
              {title}
            </h1>
          )}
        </div>
        
        {/* 오른쪽: 고객지원, 알림, 장바구니 */}
        <div className="flex items-center gap-1">
          {FEATURE_FLAGS.support && (
            <Link
              to="/support"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#2E1C10]/5"
              aria-label="고객 지원"
            >
              <MessageCircle className="w-6 h-6 text-[#2E1C10]" />
            </Link>
          )}
          
          <Link
            to="/notifications"
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#2E1C10]/5"
            aria-label="알림"
          >
            <Bell className="w-6 h-6 text-[#2E1C10]" />
          </Link>
          
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#2E1C10]/5"
            aria-label="장바구니"
          >
            <ShoppingCart className="w-6 h-6 text-[#2E1C10]" />
            {/* 장바구니 아이템 수 뱃지 */}
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#D61C1C] rounded-full">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

// 간단한 닭 로고 (SVG)
function ChickenLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#D61C1C" fillOpacity="0.12" />
      <path
        d="M16 8C13 8 11 10 11 13C11 15 12 16.5 13.5 17.5L13 22H19L18.5 17.5C20 16.5 21 15 21 13C21 10 19 8 16 8Z"
        stroke="#D61C1C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
      <circle cx="14.5" cy="12.5" r="1" fill="#D61C1C" />
      <path
        d="M16 14C15.5 14 15 14.5 15 15"
        stroke="#D61C1C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
```

## 80. src/components/app/AppLayout.tsx

```typescript
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { Credits } from '../shared/Credits';

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6F3]">
      {/* 헤더 */}
      <AppHeader />
      
      {/* 메인 콘텐츠 */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      {/* 개발사 정보 푸터 */}
      <Credits variant="footer" />
      
      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
}
```

## 81. src/components/app/BottomNav.tsx

```typescript
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Star, User } from 'lucide-react';

export function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: '홈' },
    { to: '/menu', icon: UtensilsCrossed, label: '메뉴' },
    { to: '/reviews', icon: Star, label: '리뷰' },
    { to: '/my', icon: User, label: '마이' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#2E1C10]/10">
      <div className="grid grid-cols-4 h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'text-[#D61C1C]'
                  : 'text-[#2E1C10]/60 hover:text-[#2E1C10]'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
```

## 82. src/components/app/CouponCard.tsx

```typescript
/**
 * 쿠폰 카드 컴포넌트
 */

import { Coupon, getCouponStatus, COUPON_TYPE_LABELS } from '../../types/coupon';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Ticket } from 'lucide-react';

interface CouponCardProps {
  coupon: Coupon;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (coupon: Coupon) => void;
}

export function CouponCard({ coupon, selectable, selected, onSelect }: CouponCardProps) {
  const status = getCouponStatus(coupon);
  const expiryDate = new Date(coupon.expiresAt);
  const daysLeft = Math.ceil((coupon.expiresAt - Date.now()) / (1000 * 60 * 60 * 24));

  const isAvailable = status === 'available';
  const isExpiringSoon = isAvailable && daysLeft <= 7;

  return (
    <Card
      className={`p-4 ${
        selectable
          ? isAvailable
            ? 'cursor-pointer hover:border-[#D61C1C] transition-colors'
            : 'opacity-50 cursor-not-allowed'
          : ''
      } ${selected ? 'border-[#D61C1C] border-2' : ''}`}
      onClick={() => {
        if (selectable && isAvailable && onSelect) {
          onSelect(coupon);
        }
      }}
    >
      <div className="flex gap-4">
        {/* 금액 */}
        <div className="flex-shrink-0 w-24 flex flex-col items-center justify-center bg-gradient-to-br from-[#D61C1C] to-[#F37021] rounded-lg text-white p-3">
          <Ticket className="w-6 h-6 mb-1" />
          <div className="text-xl">{coupon.amount.toLocaleString()}</div>
          <div className="text-xs opacity-90">원</div>
        </div>

        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-sm text-[#333]">{coupon.title}</h3>
            <Badge
              variant="outline"
              className={
                status === 'available'
                  ? isExpiringSoon
                    ? 'border-yellow-500 text-yellow-700'
                    : 'border-green-500 text-green-700'
                  : status === 'used'
                  ? 'border-gray-400 text-gray-600'
                  : 'border-red-500 text-red-700'
              }
            >
              {status === 'available'
                ? isExpiringSoon
                  ? `${daysLeft}일 남음`
                  : '사용가능'
                : status === 'used'
                ? '사용완료'
                : '만료됨'}
            </Badge>
          </div>

          <p className="text-xs text-[#8B7355] mb-2">{coupon.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{coupon.minSpend.toLocaleString()}원 이상 주문 시</span>
            <span>
              {expiryDate.getFullYear()}.{String(expiryDate.getMonth() + 1).padStart(2, '0')}.
              {String(expiryDate.getDate()).padStart(2, '0')}까지
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

## 83. src/components/brand/BrandHeader.tsx

```typescript
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
```

## 84. src/components/brand/BrandPhilosophy.tsx

```typescript
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
```

## 85. src/components/brand/ColorSystem.tsx

```typescript
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
```

## 86. src/components/brand/DesignTokenDemo.tsx

```typescript
import { Check, Palette, Layers, Radius, Sun } from 'lucide-react';

export function DesignTokenDemo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-brand-primary text-white rounded-full mb-4 text-sm">
            DESIGN TOKEN SYSTEM
          </div>
          <h2 className="text-dark-brown mb-4">디자인 토큰 시스템</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CSS 변수와 Tailwind CSS를 활용한 체계적인 디자인 시스템
          </p>
        </div>

        {/* 컬러 토큰 데모 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-brand-primary" />
            <h3 className="text-dark-brown">컬러 토큰</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-cream-bg rounded-2xl p-6">
              <div className="w-full h-32 bg-brand-primary rounded-xl mb-4"></div>
              <h4 className="text-dark-brown mb-2">Primary</h4>
              <code className="text-sm text-muted-foreground">bg-brand-primary</code>
              <p className="text-sm text-muted-foreground mt-2">#D61C1C</p>
            </div>
            <div className="bg-cream-bg rounded-2xl p-6">
              <div className="w-full h-32 bg-brand-secondary rounded-xl mb-4"></div>
              <h4 className="text-dark-brown mb-2">Secondary</h4>
              <code className="text-sm text-muted-foreground">bg-brand-secondary</code>
              <p className="text-sm text-muted-foreground mt-2">#F37021</p>
            </div>
            <div className="bg-cream-bg rounded-2xl p-6">
              <div className="w-full h-32 bg-brand-accent rounded-xl mb-4"></div>
              <h4 className="text-dark-brown mb-2">Accent</h4>
              <code className="text-sm text-muted-foreground">bg-brand-accent</code>
              <p className="text-sm text-muted-foreground mt-2">#C7A45A</p>
            </div>
          </div>
        </div>

        {/* 버튼 스타일 데모 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Check className="w-6 h-6 text-brand-primary" />
            <h3 className="text-dark-brown">버튼 스타일</h3>
          </div>
          <div className="bg-cream-bg rounded-2xl p-8">
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-lg shadow-soft-2 hover:shadow-soft-3 transition-all">
                Primary Button
              </button>
              <button className="px-8 py-3 bg-brand-secondary hover:bg-brand-secondary-hover text-white rounded-lg transition-all">
                Secondary Button
              </button>
              <button className="px-6 py-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-all">
                Outline Button
              </button>
              <button className="px-6 py-2 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-full transition-all">
                Rounded Button
              </button>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">코드 예시:</p>
              <code className="text-xs text-dark-brown block">
                {`<button className="px-8 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-lg">`}
              </code>
            </div>
          </div>
        </div>

        {/* Border Radius 데모 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Radius className="w-6 h-6 text-brand-primary" />
            <h3 className="text-dark-brown">Border Radius</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { name: 'sm', size: '8px', class: 'rounded-sm' },
              { name: 'md', size: '12px', class: 'rounded-md' },
              { name: 'lg', size: '16px', class: 'rounded-lg' },
              { name: 'xl', size: '24px', class: 'rounded-xl' },
              { name: '2xl', size: '32px', class: 'rounded-2xl' },
              { name: 'full', size: '∞', class: 'rounded-full' },
            ].map((item) => (
              <div key={item.name} className="bg-cream-bg p-6 rounded-lg text-center">
                <div className={`w-16 h-16 bg-brand-primary mx-auto mb-3 ${item.class}`}></div>
                <p className="text-sm text-dark-brown">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.size}</p>
                <code className="text-xs text-brand-secondary">{item.class}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Shadow 데모 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-6 h-6 text-brand-primary" />
            <h3 className="text-dark-brown">그림자 시스템</h3>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { name: 'soft-1', label: 'Soft 1' },
              { name: 'soft-2', label: 'Soft 2' },
              { name: 'soft-3', label: 'Soft 3' },
              { name: 'medium', label: 'Medium' },
              { name: 'large', label: 'Large' },
            ].map((shadow) => (
              <div key={shadow.name} className="text-center">
                <div 
                  className="bg-white p-8 rounded-xl mb-3"
                  style={{ boxShadow: `var(--shadow-${shadow.name})` }}
                >
                  <div className="w-12 h-12 bg-brand-primary rounded-lg mx-auto"></div>
                </div>
                <p className="text-sm text-dark-brown">{shadow.label}</p>
                <code className="text-xs text-muted-foreground">--shadow-{shadow.name}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Z-Index 데모 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Sun className="w-6 h-6 text-brand-primary" />
            <h3 className="text-dark-brown">Z-Index 레이어</h3>
          </div>
          <div className="bg-cream-bg rounded-2xl p-8">
            <div className="space-y-3">
              {[
                { level: 1200, name: 'Tooltip', var: '--z-tooltip', usage: '툴팁' },
                { level: 1100, name: 'Toast', var: '--z-toast', usage: '토스트 알림' },
                { level: 1050, name: 'Popover', var: '--z-popover', usage: '팝오버' },
                { level: 1000, name: 'Modal', var: '--z-modal', usage: '모달 창' },
                { level: 900, name: 'Modal Backdrop', var: '--z-modal-backdrop', usage: '모달 배경' },
                { level: 200, name: 'Fixed', var: '--z-fixed', usage: '고정 요소' },
                { level: 100, name: 'Sticky', var: '--z-sticky', usage: '고정 헤더 ★' },
                { level: 50, name: 'Dropdown', var: '--z-dropdown', usage: '드롭다운' },
                { level: 0, name: 'Base', var: '--z-base', usage: '기본 레이어' },
              ].map((layer) => (
                <div 
                  key={layer.level}
                  className="flex items-center justify-between bg-white p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center text-white text-xs"
                      style={{ 
                        opacity: layer.level === 100 ? 1 : 0.3 + (layer.level / 1200) * 0.7 
                      }}
                    >
                      {layer.level}
                    </div>
                    <div>
                      <p className="text-sm text-dark-brown">{layer.name}</p>
                      <code className="text-xs text-brand-secondary">{layer.var}</code>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{layer.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 사용 가이드 */}
        <div className="mt-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-2xl p-12 text-center">
          <h3 className="mb-4">디자인 토큰 사용 가이드</h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            모든 컴포넌트는 정의된 디자인 토큰을 사용하여 일관성을 유지합니다.<br/>
            자세한 내용은 <code className="px-2 py-1 bg-white/20 rounded">DesignTokens.md</code> 문서를 참조하세요.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/guidelines/DesignTokens.md" 
              className="px-6 py-3 bg-white text-brand-primary rounded-lg hover:bg-gray-100 transition-colors"
            >
              가이드 문서 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## 87. src/components/brand/DownloadSection.tsx

```typescript
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
```

## 88. src/components/brand/IconSystem.tsx

```typescript
import { useState } from 'react';
import { 
  ChickenIcon, 
  BowlIcon, 
  NoodleIcon, 
  SteamIcon, 
  ChiliIcon, 
  DeliveryIcon, 
  CouponIcon,
  IceIcon,
  PackageIcon,
  CameraIcon,
  StarIcon,
  ReceiptIcon,
  BellIcon,
  PrinterIcon,
  ChartIcon,
  ClockIcon,
  LockIcon,
  PinIcon,
  InfoIcon,
  QRIcon
} from '../icons';
import { Copy, Check, Download } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function IconSystem() {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<string>('48');

  const copyCode = async (code: string, iconName: string) => {
    try {
      // 최신 Clipboard API 시도
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopiedIcon(iconName);
        setTimeout(() => setCopiedIcon(null), 2000);
      } else {
        // Fallback: 구형 방식 사용
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopiedIcon(iconName);
          setTimeout(() => setCopiedIcon(null), 2000);
        } catch (err) {
          console.error('복사 실패:', err);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Clipboard API 에러:', err);
      // 최종 Fallback
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopiedIcon(iconName);
        setTimeout(() => setCopiedIcon(null), 2000);
      } catch (fallbackErr) {
        console.error('복사 실패:', fallbackErr);
      }
      
      document.body.removeChild(textArea);
    }
  };

  const downloadIcon = (IconComponent: any, name: string, size: string) => {
    // SVG를 다운로드하는 함수
    const svg = document.createElement('div');
    svg.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        ${IconComponent}
      </svg>
    `;
    
    const svgData = svg.innerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/\s+/g, '_')}_${size}px.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const brandIcons = [
    {
      name: '닭 마크',
      component: ChickenIcon,
      description: '브랜드 시그니처, 닭 실루엣 + 볏 라운드',
      usage: '로고, 배지, 브랜드 강조',
      code: '<ChickenIcon variant="duotone" state="active" size={48} />',
      color: '#D61C1C'
    },
    {
      name: '황동그릇',
      component: BowlIcon,
      description: '타원 상부 하이라이트, 황동색 12% 투명',
      usage: '메뉴 카테고리, 전통 감성',
      code: '<BowlIcon variant="duotone" state="active" size={48} />',
      color: '#C7A45A'
    },
    {
      name: '면발 회오리',
      component: NoodleIcon,
      description: '3회전 나선 곡선, Round Cap',
      usage: '메뉴 아이콘, 로딩 애니메이션',
      code: '<NoodleIcon size={48} />',
      color: '#2E1C10'
    },
    {
      name: '수증기',
      component: SteamIcon,
      description: '3개 물결 스트로크, 60% 불투명',
      usage: '따뜻함 표현, 국물 메뉴',
      code: '<SteamIcon size={48} />',
      color: '#2E1C10'
    },
    {
      name: '매운맛 칠리',
      component: ChiliIcon,
      description: '고추 형태, 꼬리 라운드, 빨강 15% 칠',
      usage: '매운맛 표시, 맵기 단계',
      code: '<ChiliIcon variant="duotone" state="active" size={48} />',
      color: '#D61C1C'
    },
    {
      name: '배달 스쿠터',
      component: DeliveryIcon,
      description: '오토바이 실루엣, 속도선 2줄',
      usage: '배달 상태, 주문 추적',
      code: '<DeliveryIcon variant="duotone" state="active" size={48} />',
      color: '#F37021'
    },
    {
      name: '쿠폰 티켓',
      component: CouponIcon,
      description: '티켓 모양, 재단선, 퍼포레이션 점',
      usage: '할인, 프로모션',
      code: '<CouponIcon variant="duotone" state="active" size={48} />',
      color: '#F37021'
    }
  ];

  const utilityIcons = [
    { name: '냉국수 얼음', component: IceIcon, usage: '냉 메뉴', code: '<IceIcon size={24} />', color: '#4A90E2' },
    { name: '포장 봉투', component: PackageIcon, usage: '픽업/포장', code: '<PackageIcon size={24} />', color: '#C7A45A' },
    { name: '카메라', component: CameraIcon, usage: '사진 리뷰', code: '<CameraIcon size={24} />', color: '#2E1C10' },
    { name: '리뷰 별', component: StarIcon, usage: '평점', code: '<StarIcon size={24} />', color: '#F37021' },
    { name: '영수증', component: ReceiptIcon, usage: '주문 확인', code: '<ReceiptIcon size={24} />', color: '#2E1C10' },
    { name: '알림 벨', component: BellIcon, usage: '푸시 알림', code: '<BellIcon size={24} />', color: '#D61C1C' },
    { name: '프린터', component: PrinterIcon, usage: '영수증 출력', code: '<PrinterIcon size={24} />', color: '#2E1C10' },
    { name: '차트', component: ChartIcon, usage: '통계', code: '<ChartIcon size={24} />', color: '#F37021' },
    { name: '시계', component: ClockIcon, usage: 'SLA 경고', code: '<ClockIcon size={24} />', color: '#2E1C10' },
    { name: '잠금', component: LockIcon, usage: '보안/권한', code: '<LockIcon size={24} />', color: '#2E1C10' },
    { name: '위치 핀', component: PinIcon, usage: '배달권역', code: '<PinIcon size={24} />', color: '#D61C1C' },
    { name: '정보', component: InfoIcon, usage: '안내 툴팁', code: '<InfoIcon size={24} />', color: '#2E1C10' },
    { name: 'QR/설치', component: QRIcon, usage: 'PWA 설치', code: '<QRIcon size={24} />', color: '#2E1C10' }
  ];

  return (
    <section id="icons" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-brand-accent text-white rounded-full mb-4 text-sm">
            ICON SYSTEM
          </div>
          <h2 className="text-dark-brown mb-4">브랜드 아이콘 시스템</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            현풍닭칼국수만의 감성을 담은 전용 아이콘 세트입니다.<br/>
            48px 그리드, 2.5px stroke, Round Cap/Join 규격을 준수합니다.
          </p>
        </div>

        {/* 디자인 원칙 */}
        <div className="bg-cream-bg rounded-2xl p-8 mb-16">
          <h3 className="text-dark-brown mb-6">아이콘 디자인 원칙</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="w-12 h-12 bg-brand-primary-light rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">📐</span>
              </div>
              <h4 className="text-dark-brown mb-2">48px 그리드</h4>
              <p className="text-sm text-muted-foreground">
                2.5px stroke<br/>
                Round Cap & Join
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-brand-secondary-light rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-dark-brown mb-2">2가지 스타일</h4>
              <p className="text-sm text-muted-foreground">
                Outlined (기본)<br/>
                Duotone (강조)
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-brand-accent-light rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="text-dark-brown mb-2">4가지 상태</h4>
              <p className="text-sm text-muted-foreground">
                Default / Active<br/>
                Disabled / Critical
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-hyunpung-red/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-dark-brown mb-2">브랜드 컬러</h4>
              <p className="text-sm text-muted-foreground">
                현풍레드<br/>
                신칼오렌지<br/>
                황동색
              </p>
            </div>
          </div>
        </div>

        {/* 다운로드 사이즈 선택 */}
        <div className="flex justify-center items-center gap-4 mb-12 bg-cream-bg p-6 rounded-2xl">
          <label className="text-dark-brown">다운로드 사이즈:</label>
          <Select value={downloadSize} onValueChange={setDownloadSize}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24">24px</SelectItem>
              <SelectItem value="32">32px</SelectItem>
              <SelectItem value="48">48px</SelectItem>
              <SelectItem value="64">64px</SelectItem>
              <SelectItem value="128">128px</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            (개별 아이콘 다운로드 시 적용)
          </span>
        </div>

        {/* 브랜드 핵심 아이콘 */}
        <div className="mb-16">
          <h3 className="text-dark-brown mb-8">핵심 브랜드 아이콘</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandIcons.map((icon, index) => (
              <div 
                key={index}
                className="bg-cream-bg rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <icon.component size={64} variant="duotone" state="active" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyCode(icon.code, icon.name)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      title="코드 복사"
                    >
                      {copiedIcon === icon.name ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    <button
                      onClick={() => downloadIcon(icon.component, icon.name, downloadSize)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      title={`${downloadSize}px로 다운로드`}
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div 
                  className="w-full h-1 rounded-full mb-4" 
                  style={{ backgroundColor: icon.color, opacity: 0.3 }}
                />
                <h4 className="text-dark-brown mb-2">{icon.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{icon.description}</p>
                <div className="mb-4">
                  <p className="text-xs text-brand-primary mb-1">사용처</p>
                  <p className="text-sm text-dark-brown">{icon.usage}</p>
                </div>
                <code className="text-xs bg-white px-3 py-2 rounded-lg block overflow-x-auto border border-border">
                  {icon.code}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* 유틸리티 아이콘 */}
        <div className="mb-16">
          <h3 className="text-dark-brown mb-8">유틸리티 아이콘</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {utilityIcons.map((icon, index) => (
              <div 
                key={index}
                className="bg-cream-bg rounded-xl p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <icon.component size={32} className="text-dark-brown" />
                </div>
                <p className="text-sm text-dark-brown mb-1">{icon.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{icon.usage}</p>
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => copyCode(icon.code, icon.name)}
                    className="p-1.5 hover:bg-white rounded transition-colors"
                    title="코드 복사"
                  >
                    {copiedIcon === icon.name ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 상태 데모 */}
        <div className="bg-gradient-to-r from-cream-bg to-white rounded-2xl p-8 mb-16">
          <h3 className="text-dark-brown mb-6">아이콘 상태 변화</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {['default', 'active', 'disabled', 'critical'].map((state) => (
              <div key={state} className="text-center">
                <div className="bg-white p-8 rounded-2xl mb-4 shadow-sm">
                  <ChickenIcon 
                    size={64} 
                    variant={state === 'active' ? 'duotone' : 'outline'}
                    state={state as any}
                  />
                </div>
                <p className="text-sm text-dark-brown capitalize mb-1">{state}</p>
                <p className="text-xs text-muted-foreground">
                  {state === 'default' && '기본 상태'}
                  {state === 'active' && '활성/선택'}
                  {state === 'disabled' && '비활성'}
                  {state === 'critical' && '경고/오류'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 사용 가이드 */}
        <div className="bg-dark-brown text-white rounded-2xl p-12 text-center">
          <h3 className="mb-4">아이콘 사용 가이드</h3>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            모든 아이콘은 React 컴포넌트로 제공되며,<br/>
            variant, state, size props로 완벽하게 제어할 수 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 px-6 py-4 rounded-lg text-left">
              <p className="text-xs text-white/60 mb-2">Import</p>
              <code className="text-sm text-white break-all">
                {`import { ChickenIcon } from '@/components/icons'`}
              </code>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg text-left">
              <p className="text-xs text-white/60 mb-2">Usage</p>
              <code className="text-sm text-white break-all">
                {`<ChickenIcon variant="duotone" size={48} />`}
              </code>
            </div>
          </div>
          <Button className="bg-white text-dark-brown hover:bg-white/90">
            <Download className="w-4 h-4 mr-2" />
            전체 아이콘 세트 다운로드
          </Button>
        </div>
      </div>
    </section>
  );
}
```

## 89. src/components/brand/LogoSystem.tsx

```typescript
import logoSymbol from 'figma:asset/1710e1c0c8f0aa11de622128fdd40c7e0ada1ddd.png';
import logoFull from 'figma:asset/72ab99587b1fb72aa04a7051333c2c1411037d0e.png';
import { Download } from 'lucide-react';

export function LogoSystem() {
  const logoVariations = [
    {
      title: 'Full Signature',
      subtitle: '기본 로고 (심볼 + 한글)',
      image: logoFull,
      usage: '기본 간판, 웹사이트 헤더, 공식 문서',
      bgColor: 'white'
    },
    {
      title: 'Symbol Only',
      subtitle: '심볼 로고 (원형 마크)',
      image: logoSymbol,
      usage: '포장용기, SNS 프로필, 아이콘',
      bgColor: 'white'
    },
    {
      title: 'Symbol Only',
      subtitle: '심볼 로고 (미색 배경)',
      image: logoSymbol,
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
                <img 
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
```

## 90. src/components/brand/UsageGuidelines.tsx

```typescript
import { Check, X } from 'lucide-react';
import logoSymbol from 'figma:asset/1710e1c0c8f0aa11de622128fdd40c7e0ada1ddd.png';

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
              <img src={logoSymbol} alt="로고 여백 가이드" className="w-full" />
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
```

## 91. src/components/figma/ImageWithFallback.tsx

```typescript
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
```

## 92. src/components/icons/BowlIcon.tsx

```typescript
interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function BowlIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  const isActive = state === 'active' || variant === 'duotone';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 그릇 받침대 */}
      <path 
        d="M16 38L14 42L34 42L32 38Z" 
        fill={isActive ? '#C7A45A' : '#2E1C10'}
        fillOpacity={isActive ? '0.3' : '1'}
      />
      <path 
        d="M16 38L14 42L34 42L32 38" 
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* 그릇 받침대 상단 라인 */}
      <line 
        x1="13" 
        y1="38" 
        x2="35" 
        y2="38" 
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* 그릇 본체 (사다리꼴) */}
      <path 
        d="M10 14L8 38L40 38L38 14Z" 
        fill={isActive ? '#C7A45A' : '#2E1C10'}
        fillOpacity={isActive ? '0.15' : '1'}
      />
      <path 
        d="M10 14L8 38L40 38L38 14Z" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* 그릇 상단 테두리 */}
      <path 
        d="M8 14L40 14" 
        stroke="#2E1C10" 
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* 황동 광택 효과 (왼쪽) */}
      {isActive && (
        <>
          <path 
            d="M12 18C12 18 13 24 14 30" 
            stroke="#C7A45A" 
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path 
            d="M14 16C14 16 15 22 16 28C17 34 18 36 18 36" 
            stroke="#C7A45A" 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          
          {/* 황동 광택 효과 (오른쪽) */}
          <path 
            d="M36 18C36 18 35 24 34 30" 
            stroke="#C7A45A" 
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          {/* 내부 하이라이트 */}
          <ellipse 
            cx="24" 
            cy="16" 
            rx="10" 
            ry="2" 
            stroke="#C7A45A" 
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* 황동 질감 */}
          <line 
            x1="20" 
            y1="14" 
            x2="20" 
            y2="10" 
            stroke="#C7A45A" 
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
          <line 
            x1="24" 
            y1="14" 
            x2="24" 
            y2="9" 
            stroke="#C7A45A" 
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
          <line 
            x1="28" 
            y1="14" 
            x2="28" 
            y2="10" 
            stroke="#C7A45A" 
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
        </>
      )}
    </svg>
  );
}
```

## 93. src/components/icons/ChickenIcon.tsx

```typescript
interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function ChickenIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  const isActive = state === 'active' || variant === 'duotone';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 볏 (상단 3개 원) */}
      <circle 
        cx="16" 
        cy="9" 
        r="4" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.2' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
      />
      <circle 
        cx="24" 
        cy="7" 
        r="4.5" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.2' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
      />
      <circle 
        cx="32" 
        cy="9" 
        r="4" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.2' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
      />
      
      {/* 닭 머리/몸통 메인 실루엣 (큰 타원) */}
      <path 
        d="M 10 15 C 10 15 8 18 8 24 C 8 30 8 36 10 40 C 12 44 16 46 24 46 L 36 46 L 36 15 C 36 15 34 13 30 13 C 26 13 20 13 16 13 C 12 13 10 15 10 15 Z" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.15' : '0'}
        stroke="#D61C1C" 
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 눈 (검은 원) */}
      <circle 
        cx="22" 
        cy="24" 
        r="2.5" 
        fill="#D61C1C"
      />
      
      {/* 부리 (오른쪽 작은 삼각형) */}
      <path 
        d="M 36 22 L 42 24 L 36 26 Z" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.3' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
        strokeLinejoin="round"
      />
      
      {/* 턱살/목 부분 (하단 곡선 디테일) */}
      <path 
        d="M 12 32 C 12 32 14 36 18 38" 
        stroke="#D61C1C" 
        strokeWidth="3"
        strokeLinecap="round"
        opacity={isActive ? '0.4' : '0.2'}
      />
    </svg>
  );
}
```

## 94. src/components/icons/ChiliIcon.tsx

```typescript
interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function ChiliIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  const isActive = state === 'active' || variant === 'duotone';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 고추 몸통 */}
      <path 
        d="M20 10C20 10 18 12 18 16C18 20 19 24 21 28C23 32 25 36 27 40C27.5 41.5 28.5 43 30 43C31.5 43 32.5 41.5 33 40C34 37 33 33 31 29C29 25 27 21 25 17C23 13 21 10 20 10Z" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.15' : '0'}
        stroke="#D61C1C" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 고추 하이라이트 */}
      <path 
        d="M23 16C23 16 24 20 25 24C26 28 27 32 28 36" 
        stroke="#D61C1C" 
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* 꼭지 (라운드) */}
      <path 
        d="M20 10C20 10 19 8 18 7C17 6 16 6 15 7C14.5 7.5 14.5 8.5 15 9" 
        stroke="#2E7D32" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M20.5 9C20.5 9 21 7 22 6C23 5 24 5 25 6C25.5 6.5 25.5 7.5 25 8.5" 
        stroke="#2E7D32" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M21 8.5C21 8.5 22 7.5 22.5 7C23 6.5 23.5 6.5 24 7" 
        stroke="#2E7D32" 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
```

## 95. src/components/icons/CouponIcon.tsx

```typescript
interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function CouponIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  const isActive = state === 'active' || variant === 'duotone';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 티켓 외곽 */}
      <path 
        d="M6 14L42 14L42 20C40 20 38 22 38 24C38 26 40 28 42 28L42 36L6 36L6 28C8 28 10 26 10 24C10 22 8 20 6 20L6 14Z" 
        fill={isActive ? '#F37021' : 'none'}
        fillOpacity={isActive ? '0.12' : '0'}
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* 재단선 상단 */}
      <line 
        x1="6" 
        y1="14" 
        x2="42" 
        y2="14" 
        stroke="#2E1C10" 
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      
      {/* 재단선 하단 */}
      <line 
        x1="6" 
        y1="36" 
        x2="42" 
        y2="36" 
        stroke="#2E1C10" 
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      
      {/* 퍼포레이션 점 세로줄 */}
      <circle cx="24" cy="18" r="1" fill="#2E1C10" />
      <circle cx="24" cy="22" r="1" fill="#2E1C10" />
      <circle cx="24" cy="26" r="1" fill="#2E1C10" />
      <circle cx="24" cy="30" r="1" fill="#2E1C10" />
      <circle cx="24" cy="34" r="1" fill="#2E1C10" />
      
      {/* 할인 표시 */}
      <text 
        x="18" 
        y="27" 
        fill="#D61C1C" 
        fontSize="12" 
        fontWeight="bold"
      >
        %
      </text>
    </svg>
  );
}
```

## 96. src/components/icons/DeliveryIcon.tsx

```typescript
interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function DeliveryIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  const isActive = state === 'active' || variant === 'duotone';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 핸들바 */}
      <line 
        x1="10" 
        y1="12" 
        x2="20" 
        y2="12" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* 왼쪽 핸들 그립 */}
      <circle 
        cx="10" 
        cy="12" 
        r="2.5" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
      />
      
      {/* 오른쪽 핸들 그립 */}
      <circle 
        cx="20" 
        cy="12" 
        r="2.5" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
      />
      
      {/* 헤드라이트 영역 */}
      <rect 
        x="9" 
        y="14" 
        width="12" 
        height="8" 
        rx="1" 
        fill={isActive ? '#D61C1C' : '#2E1C10'}
        fillOpacity={isActive ? '0.25' : '1'}
      />
      
      {/* 헤드라이트 (왼쪽) */}
      <circle 
        cx="12" 
        cy="18" 
        r="1.5" 
        fill={isActive ? '#FFFFFF' : '#FFFFFF'}
        opacity={isActive ? '0.9' : '0.5'}
      />
      
      {/* 헤드라이트 (오른쪽) */}
      <circle 
        cx="18" 
        cy="18" 
        r="1.5" 
        fill={isActive ? '#FFFFFF' : '#FFFFFF'}
        opacity={isActive ? '0.9' : '0.5'}
      />
      
      {/* 스쿠터 바디 (메인) */}
      <path 
        d="M9 22L9 32C9 32 10 36 15 36C20 36 21 32 21 32L21 22Z" 
        fill={isActive ? '#D61C1C' : '#2E1C10'}
        fillOpacity={isActive ? '0.2' : '1'}
      />
      
      {/* 스쿠터 바디 윤곽선 */}
      <path 
        d="M9 22L9 32C9 32 10 36 15 36C20 36 21 32 21 32L21 22" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* 바퀴 (앞바퀴) */}
      <rect 
        x="11" 
        y="36" 
        width="8" 
        height="8" 
        rx="4" 
        fill={isActive ? '#D61C1C' : '#2E1C10'}
        fillOpacity={isActive ? '0.3' : '1'}
      />
      
      {/* 바퀴 윤곽선 */}
      <rect 
        x="11" 
        y="36" 
        width="8" 
        height="8" 
        rx="4" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        fill="none"
      />
      
      {/* 바퀴 내부 원 */}
      <circle 
        cx="15" 
        cy="40" 
        r="2" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="2"
      />
      
      {/* 속도선 (빨강 강조) */}
      {isActive && (
        <g opacity="0.7">
          <line 
            x1="4" 
            y1="24" 
            x2="7" 
            y2="24" 
            stroke="#D61C1C" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line 
            x1="2" 
            y1="28" 
            x2="6" 
            y2="28" 
            stroke="#D61C1C" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line 
            x1="3" 
            y1="32" 
            x2="8" 
            y2="32" 
            stroke="#D61C1C" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
```

## 97. src/components/icons/NoodleIcon.tsx

```typescript
interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function NoodleIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  const isActive = state === 'active' || variant === 'duotone';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 그릇 하단 받침대 */}
      <path 
        d="M 16 38 L 14 44 L 34 44 L 32 38 Z" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 그릇 본체 (사다리꼴) */}
      <path 
        d="M 10 12 L 8 38 L 40 38 L 38 12 Z" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* 그릇 상단 테두리 */}
      <line 
        x1="8" 
        y1="12" 
        x2="40" 
        y2="12" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* 면발 1 (왼쪽 작은 아치) */}
      <g>
        <path d="M 14 22 Q 14 18 18 18 Q 22 18 22 22" stroke="#2E1C10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 14.5 21 Q 14.5 19 18 19 Q 21.5 19 21.5 21" stroke="#2E1C10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 15 20 Q 15 19.5 18 19.5 Q 21 19.5 21 20" stroke="#2E1C10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 15.5 19.5 Q 15.5 19.2 18 19.2 Q 20.5 19.2 20.5 19.5" stroke="#2E1C10" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
      
      {/* 면발 2 (중간 아치) */}
      <g>
        <path d="M 20 28 Q 20 22 24 22 Q 28 22 28 28" stroke="#2E1C10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 20.5 27 Q 20.5 23 24 23 Q 27.5 23 27.5 27" stroke="#2E1C10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 21 26 Q 21 24 24 24 Q 27 24 27 26" stroke="#2E1C10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 21.5 25 Q 21.5 24.5 24 24.5 Q 26.5 24.5 26.5 25" stroke="#2E1C10" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M 22 24.5 Q 22 24.2 24 24.2 Q 26 24.2 26 24.5" stroke="#2E1C10" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      </g>
      
      {/* 면발 3 (오른쪽 큰 아치) */}
      <g>
        <path d="M 26 32 Q 26 24 30 24 Q 34 24 34 32" stroke="#2E1C10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 26.5 31 Q 26.5 25 30 25 Q 33.5 25 33.5 31" stroke="#2E1C10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 27 30 Q 27 26 30 26 Q 33 26 33 30" stroke="#2E1C10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 27.5 29 Q 27.5 27 30 27 Q 32.5 27 32.5 29" stroke="#2E1C10" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M 28 28 Q 28 27.5 30 27.5 Q 32 27.5 32 28" stroke="#2E1C10" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      </g>
      
      {/* 오른쪽 그림자 (활성 상태) */}
      {isActive && (
        <g opacity="0.3">
          <path 
            d="M 38 14 L 36 38 L 42 38 L 44 14 Z" 
            fill="#6B7280"
          />
          <line 
            x1="38" 
            y1="14" 
            x2="44" 
            y2="14" 
            stroke="#6B7280" 
            strokeWidth="2"
          />
          <path 
            d="M 36 38 L 34 44 L 38 44 L 40 38 Z" 
            fill="#6B7280"
          />
        </g>
      )}
    </svg>
  );
}
```

## 98. src/components/icons/SteamIcon.tsx

```typescript
interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function SteamIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.6"
    >
      {/* 수증기 물결 1 (왼쪽) */}
      <path 
        d="M14 34C14 34 16 30 18 30C20 30 22 34 22 34C22 34 24 38 26 38" 
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 수증기 물결 2 (중앙) */}
      <path 
        d="M18 24C18 24 20 20 22 20C24 20 26 24 26 24C26 24 28 28 30 28C32 28 34 24 34 24" 
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 수증기 물결 3 (오른쪽) */}
      <path 
        d="M22 14C22 14 24 10 26 10C28 10 30 14 30 14C30 14 32 18 34 18" 
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 작은 증기 방울들 */}
      <circle cx="16" cy="38" r="1.5" fill="#2E1C10" opacity="0.4" />
      <circle cx="32" cy="38" r="1.5" fill="#2E1C10" opacity="0.4" />
      <circle cx="24" cy="8" r="1.5" fill="#2E1C10" opacity="0.4" />
    </svg>
  );
}
```

## 99. src/components/icons/index.ts

```typescript
export { ChickenIcon } from './ChickenIcon';
export { BowlIcon } from './BowlIcon';
export { NoodleIcon } from './NoodleIcon';
export { SteamIcon } from './SteamIcon';
export { ChiliIcon } from './ChiliIcon';
export { DeliveryIcon } from './DeliveryIcon';
export { CouponIcon } from './CouponIcon';

// 간단한 아이콘들 (lucide-react 활용)
export { 
  Snowflake as IceIcon,
  Package as PackageIcon,
  Camera as CameraIcon,
  Star as StarIcon,
  Receipt as ReceiptIcon,
  Bell as BellIcon,
  Printer as PrinterIcon,
  BarChart as ChartIcon,
  Clock as ClockIcon,
  Lock as LockIcon,
  MapPin as PinIcon,
  Info as InfoIcon,
  Smartphone as QRIcon
} from 'lucide-react';
```

## 100. src/components/shared/Credits.tsx

```typescript
interface CreditsProps {
  variant?: 'footer' | 'card';
}

export function Credits({ variant = 'footer' }: CreditsProps) {
  if (variant === 'footer') {
    return (
      <footer className="bg-white border-t border-[#2E1C10]/10 px-4 py-4 mb-16">
        <p className="text-xs text-center text-[#2E1C10]/60 leading-relaxed">
          개발·운영: KS컴퍼니 | 사업자 553-17-00098 | 010-2068-4732
        </p>
      </footer>
    );
  }
  
  // Card variant (마이페이지 > 앱 정보)
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D61C1C]/12">
          <span className="text-[#D61C1C]">ℹ️</span>
        </div>
        <h3 className="text-[#2E1C10]">개발·운영 정보</h3>
      </div>
      
      <div className="space-y-3">
        <InfoRow label="제작·개발" value="KS컴퍼니" />
        <InfoRow label="대표" value="석경선 (운영·관리)" />
        <InfoRow label="공동대표" value="배종수 (개발·기술·관리)" />
        <InfoRow label="사업자등록번호" value="553-17-00098" />
        <InfoRow 
          label="주소" 
          value="경남 양산시 물금읍 범어리 2699-9 202호"
          copyable
        />
        <InfoRow 
          label="연락처" 
          value="010-2068-4732"
          linkable="tel:010-2068-4732"
        />
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  copyable?: boolean;
  linkable?: string;
}

function InfoRow({ label, value, copyable, linkable }: InfoRowProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // 토스트 알림 (나중에 구현)
  };
  
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-[#2E1C10]/60 whitespace-nowrap">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {linkable ? (
          <a 
            href={linkable} 
            className="text-sm text-[#D61C1C] hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-[#2E1C10] text-right">
            {value}
          </span>
        )}
        {copyable && (
          <button
            onClick={handleCopy}
            className="text-xs text-[#D61C1C] hover:underline"
            aria-label="복사"
          >
            복사
          </button>
        )}
      </div>
    </div>
  );
}
```

## 101. src/components/ui/accordion.tsx

```typescript
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion@1.2.3";
import { ChevronDownIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

## 102. src/components/ui/alert-dialog.tsx

```typescript
"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog@1.1.6";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
```

## 103. src/components/ui/alert.tsx

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
```

## 104. src/components/ui/aspect-ratio.tsx

```typescript
"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
```

## 105. src/components/ui/avatar.tsx

```typescript
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar@1.1.3";

import { cn } from "./utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
```

## 106. src/components/ui/badge.tsx

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
```

## 107. src/components/ui/breadcrumb.tsx

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { ChevronRight, MoreHorizontal } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
```

## 108. src/components/ui/button.tsx

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

## 109. src/components/ui/calendar.tsx

```typescript
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import { DayPicker } from "react-day-picker@8.10.1";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
```

## 110. src/components/ui/card.tsx

```typescript
import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
```

## 111. src/components/ui/carousel.tsx

```typescript
"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react@8.6.0";
import { ArrowLeft, ArrowRight } from "lucide-react@0.487.0";

import { cn } from "./utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
```

## 112. src/components/ui/chart.tsx

```typescript
"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts@2.15.2";

import { cn } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div
              key={item.dataKey}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          },
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
```

## 113. src/components/ui/checkbox.tsx

```typescript
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
```

## 114. src/components/ui/collapsible.tsx

```typescript
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible@1.1.3";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
```

## 115. src/components/ui/command.tsx

```typescript
"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk@1.1.1";
import { SearchIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
```

## 116. src/components/ui/context-menu.tsx

```typescript
"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu@2.2.6";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
```

## 117. src/components/ui/dialog.tsx

```typescript
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-[60] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <XIcon />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
```

## 118. src/components/ui/drawer.tsx

```typescript
"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul@1.1.2";

import { cn } from "./utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
```

## 119. src/components/ui/dropdown-menu.tsx

```typescript
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu@2.1.6";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
```

## 120. src/components/ui/form.tsx

```typescript
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form@7.55.0";

import { cn } from "./utils";
import { Label } from "./label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
```

## 121. src/components/ui/hover-card.tsx

```typescript
"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card@1.1.6";

import { cn } from "./utils";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
```

## 122. src/components/ui/input-otp.tsx

```typescript
"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp@1.4.2";
import { MinusIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
```

## 123. src/components/ui/input.tsx

```typescript
import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
```

## 124. src/components/ui/label.tsx

```typescript
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";

import { cn } from "./utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
```

## 125. src/components/ui/menubar.tsx

```typescript
"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar@1.1.6";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
```

## 126. src/components/ui/navigation-menu.tsx

```typescript
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu@1.2.5";
import { cva } from "class-variance-authority@0.7.1";
import { ChevronDownIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center",
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
```

## 127. src/components/ui/pagination.tsx

```typescript
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react@0.487.0";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
```

## 128. src/components/ui/popover.tsx

```typescript
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover@1.1.6";

import { cn } from "./utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
```

## 129. src/components/ui/progress.tsx

```typescript
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
```

## 130. src/components/ui/radio-group.tsx

```typescript
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group@1.2.3";
import { CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
```

## 131. src/components/ui/resizable.tsx

```typescript
"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react@0.487.0";
import * as ResizablePrimitive from "react-resizable-panels@2.1.7";

import { cn } from "./utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
```

## 132. src/components/ui/scroll-area.tsx

```typescript
"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area@1.2.3";

import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
```

## 133. src/components/ui/select.tsx

```typescript
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select@2.1.6";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react@0.487.0";

import { cn } from "./utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
```

## 134. src/components/ui/separator.tsx

```typescript
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator@1.1.2";

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
```

## 135. src/components/ui/sheet.tsx

```typescript
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
```

## 136. src/components/ui/sidebar.tsx

```typescript
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { VariantProps, cva } from "class-variance-authority@0.7.1";
import { PanelLeftIcon } from "lucide-react@0.487.0";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
```

## 137. src/components/ui/skeleton.tsx

```typescript
import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
```

## 138. src/components/ui/slider.tsx

```typescript
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider@1.2.3";

import { cn } from "./utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
```

## 139. src/components/ui/sonner.tsx

```typescript
"use client";

import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
```

## 140. src/components/ui/switch.tsx

```typescript
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
```

## 141. src/components/ui/table.tsx

```typescript
"use client";

import * as React from "react";

import { cn } from "./utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
```

## 142. src/components/ui/tabs.tsx

```typescript
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs@1.1.3";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

## 143. src/components/ui/textarea.tsx

```typescript
import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
```

## 144. src/components/ui/toggle-group.tsx

```typescript
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group@1.1.2";
import { type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
```

## 145. src/components/ui/toggle.tsx

```typescript
"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
```

## 146. src/components/ui/tooltip.tsx

```typescript
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip@1.1.8";

import { cn } from "./utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

## 147. src/components/ui/use-mobile.ts

```typescript
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```

## 148. src/components/ui/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

