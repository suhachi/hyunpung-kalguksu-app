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
