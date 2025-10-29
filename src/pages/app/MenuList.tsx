import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import menusData from '../../data/menus.json';
import type { Menu, MenuCategory } from '../../types/menu';

const categories: { value: MenuCategory; label: string }[] = [
  { value: 'noodle', label: '메인' },
  { value: 'set', label: '세트' },
  { value: 'side', label: '사이드' },
  { value: 'drink', label: '음료' },
  { value: 'alcohol', label: '주류' },
];

const badgeStyles = {
  best: 'bg-[#D61C1C] text-white',
  signature: 'bg-[#C7A45A] text-white',
  spicy: 'bg-[#F37021] text-white',
  cold: 'bg-blue-500 text-white',
  seasonal: 'bg-green-600 text-white',
};

const badgeLabels = {
  best: '베스트',
  signature: '시그니처',
  spicy: '매운맛',
  cold: '냉메뉴',
  seasonal: '계절메뉴',
};

export function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('noodle');
  const [searchQuery, setSearchQuery] = useState('');
  
  // JSON 데이터를 배열로 변환
  const menus = useMemo(() => {
    return Array.isArray(menusData) ? (menusData as Menu[]) : [];
  }, []);
  
  const filteredMenus = useMemo(() => {
    if (!Array.isArray(menus) || menus.length === 0) {
      return [];
    }
    return menus.filter((menu) => {
      const matchesCategory = menu.category === selectedCategory;
      const matchesSearch = menu.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menus, selectedCategory, searchQuery]);
  
  return (
    <div className="pb-6">
      {/* 검색 */}
      <div className="sticky top-14 z-40 bg-[#F9F6F3] pt-4 px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2E1C10]/40" />
          <Input
            type="search"
            placeholder="메뉴 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>
      
      {/* 카테고리 탭 */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as MenuCategory)}>
        <div className="sticky top-[104px] z-40 bg-[#F9F6F3] px-4 pb-3">
          <TabsList className="w-full justify-start overflow-x-auto bg-white">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="data-[state=active]:bg-[#D61C1C] data-[state=active]:text-white"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {/* 메뉴 리스트 */}
        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value} className="px-4 mt-0">
            {filteredMenus.length === 0 ? (
              <div className="text-center py-12 text-[#2E1C10]/60">
                검색 결과가 없습니다
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMenus.map((menu) => (
                  <MenuCard key={menu.menuId} menu={menu} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface MenuCardProps {
  menu: Menu;
}

function MenuCard({ menu }: MenuCardProps) {
  return (
    <Link to={`/menu/${menu.menuId}`}>
      <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        !menu.isAvailable ? 'opacity-60' : ''
      }`}>
        <div className="flex gap-4 p-4">
          {/* 메뉴 이미지 */}
          <div className="relative flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#F9F6F3] to-[#C7A45A]/20 rounded-xl overflow-hidden">
            {menu.image ? (
              <ImageWithFallback
                src={menu.image}
                alt={menu.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl">🍜</span>
              </div>
            )}
            {!menu.isAvailable && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge className="bg-gray-600 text-white">품절</Badge>
              </div>
            )}
            {menu.availableHours && (
              <div className="absolute bottom-1 right-1">
                <Badge className="bg-yellow-500 text-white text-xs">시간제</Badge>
              </div>
            )}
          </div>
          
          {/* 메뉴 정보 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-[#2E1C10] truncate">
                {menu.name}
              </h3>
            </div>
            
            {/* 뱃지 */}
            {menu.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {menu.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className={`text-xs ${badgeStyles[badge]}`}
                  >
                    {badgeLabels[badge]}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* 설명 */}
            <p className="text-sm text-[#2E1C10]/60 line-clamp-2 mb-2">
              {menu.description}
            </p>
            
            {/* 가격 */}
            <p className="text-[#D61C1C]">
              {menu.price.toLocaleString()}원
            </p>
            
            {/* 시간제 안내 */}
            {menu.availableHours && (
              <p className="text-xs text-yellow-600 mt-1">
                {menu.availableHours.start} - {menu.availableHours.end}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
