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
