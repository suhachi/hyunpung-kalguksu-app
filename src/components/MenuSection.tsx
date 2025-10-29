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
