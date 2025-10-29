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
