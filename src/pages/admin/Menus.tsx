/**
 * 관리자 메뉴 관리 페이지
 * Phase 2-6: 목록/검색/필터/품절 토글/시간제 설정/가격·설명 수정
 */

import { useState, useEffect } from 'react';
import { Menu, MenuCategory, MenuFilters, CATEGORY_LABELS } from '../../types/menu';
import {
  getMenus,
  getMenuStats,
  MenuStats,
  toggleMenuAvailability,
  updateMenu,
  updateMenuAvailableHours,
  createMenu,
  deleteMenu,
} from '../../lib/admin/menus.api';
import { getCurrentUser } from '../../lib/auth';
import { MenuTable } from '../../components/admin/MenuTable';
import { MenuEditDialog } from '../../components/admin/MenuEditDialog';
import { MenuCreateDialog } from '../../components/admin/MenuCreateDialog';
import { MenuCSVImport } from '../../components/admin/MenuCSVImport';
import { TimeSettingDialog } from '../../components/admin/TimeSettingDialog';
import { StatCard } from '../../components/admin/common/StatCard';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Search, RefreshCw, Plus, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Menus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [stats, setStats] = useState<MenuStats | null>(null);
  const [filters, setFilters] = useState<MenuFilters>({
    category: 'all',
    search: '',
    sortBy: 'order',
    availableOnly: false,
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // 생성 다이얼로그
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // CSV 임포트 다이얼로그
  const [csvImportOpen, setCsvImportOpen] = useState(false);

  // 편집 다이얼로그
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // 시간제 다이얼로그
  const [timeSettingMenu, setTimeSettingMenu] = useState<Menu | null>(null);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);

  // Undo 관련
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);

  const user = getCurrentUser();

  // 데이터 로드
  const loadData = async () => {
    setLoading(true);
    try {
      const [menusData, statsData] = await Promise.all([
        getMenus(filters),
        getMenuStats(),
      ]);
      setMenus(menusData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load menus:', error);
      toast.error('메뉴 목록을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  // 품절 토글
  const handleToggleAvailability = async (menuId: string) => {
    if (!user) return;

    setActionLoading(true);
    try {
      const updated = await toggleMenuAvailability(menuId, user.uid, user.name);
      
      // UI 즉시 반영
      setMenus(prev => 
        prev.map(m => m.menuId === menuId ? updated : m)
      );

      toast.success(
        updated.isAvailable ? '판매를 재개했습니다' : '품절 처리했습니다'
      );

      // 통계 갱신
      loadData();
    } catch (error: any) {
      console.error('Failed to toggle availability:', error);
      toast.error(error.message || '상태 변경에 실패했습니다');
    } finally {
      setActionLoading(false);
    }
  };

  // 메뉴 편집
  const handleEditMenu = (menu: Menu) => {
    setEditingMenu(menu);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (
    updates: { price?: number; description?: string },
    reason: string
  ) => {
    if (!user || !editingMenu) return;

    setActionLoading(true);
    try {
      const updated = await updateMenu(
        editingMenu.menuId,
        updates,
        user.uid,
        user.name,
        reason
      );

      // UI 즉시 반영
      setMenus(prev =>
        prev.map(m => m.menuId === editingMenu.menuId ? updated : m)
      );

      toast.success('메뉴 정보를 수정했습니다');
      setEditDialogOpen(false);
      setEditingMenu(null);
    } catch (error: any) {
      console.error('Failed to update menu:', error);
      toast.error(error.message || '메뉴 수정에 실패했습니다');
    } finally {
      setActionLoading(false);
    }
  };

  // 시간제 설정
  const handleSetTimeLimit = (menu: Menu) => {
    setTimeSettingMenu(menu);
    setTimeDialogOpen(true);
  };

  const handleSaveTimeLimit = async (
    hours: { start: string; end: string } | null
  ) => {
    if (!user || !timeSettingMenu) return;

    setActionLoading(true);
    try {
      const updated = await updateMenuAvailableHours(
        timeSettingMenu.menuId,
        hours,
        user.uid,
        user.name
      );

      // UI 즉시 반영
      setMenus(prev =>
        prev.map(m => m.menuId === timeSettingMenu.menuId ? updated : m)
      );

      toast.success(
        hours ? '시간제 판매를 설정했습니다' : '시간제 판매를 해제했습니다'
      );
      setTimeDialogOpen(false);
      setTimeSettingMenu(null);

      // 통계 갱신
      loadData();
    } catch (error: any) {
      console.error('Failed to update time limit:', error);
      toast.error(error.message || '시간제 설정에 실패했습니다');
    } finally {
      setActionLoading(false);
    }
  };

  // 메뉴 생성
  const handleCreateMenu = async (menuData: Partial<Menu>) => {
    if (!user) return;

    const newMenu = await createMenu(menuData, user.uid, user.displayName || '관리자');

    // UI 즉시 반영 (최상단 추가)
    setMenus(prev => [newMenu, ...prev]);
    setLastCreatedMenuId(newMenu.menuId);

    // 통계 갱신
    loadData();

    // Undo 토스트 (5초)
    toast.success('메뉴가 등록되었습니다', {
      duration: 5000,
      action: {
        label: '취소',
        onClick: () => handleUndoCreate(newMenu.menuId),
      },
    });
  };

  // 생성 취소 (Undo)
  const handleUndoCreate = async (menuId: string) => {
    if (!user) return;

    try {
      await deleteMenu(menuId, user.uid, user.displayName || '관리자');

      // UI에서 제거
      setMenus(prev => prev.filter(m => m.menuId !== menuId));
      setLastCreatedMenuId(null);

      toast.success('메뉴 등록이 취소되었습니다');

      // 통계 갱신
      loadData();
    } catch (error: any) {
      console.error('Failed to undo create:', error);
      toast.error(error.message || '취소에 실패했습니다');
    }
  };

  // CSV 일괄 등록
  const handleCSVImport = async (menus: Partial<Menu>[]) => {
    if (!user) return;

    const createdMenus: Menu[] = [];

    for (const menuData of menus) {
      try {
        const newMenu = await createMenu(menuData, user.uid, user.displayName || '관리자');
        createdMenus.push(newMenu);
      } catch (error) {
        console.error('Failed to create menu:', error);
      }
    }

    // UI 반영
    setMenus(prev => [...createdMenus, ...prev]);

    // 통계 갱신
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#333] mb-2">메뉴 관리</h1>
          <p className="text-[#8B7355]">
            메뉴 정보를 관리하고 품절 상태를 변경하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCsvImportOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            CSV 일괄등록
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            메뉴 등록
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="전체 메뉴"
            value={stats.total}
            subtitle="등록된 메뉴"
          />
          <StatCard
            title="판매 중"
            value={stats.available}
            subtitle="현재 주문 가능"
            variant="success"
          />
          <StatCard
            title="품절"
            value={stats.soldout}
            subtitle="일시 품절"
            variant="warning"
          />
          <StatCard
            title="시간외"
            value={stats.timeLimited}
            subtitle="시간제 메뉴"
            variant="info"
          />
        </div>
      )}

      {/* 필터 & 검색 */}
      <div className="space-y-4">
        {/* 카테고리 탭 */}
        <Tabs
          value={filters.category || 'all'}
          onValueChange={(value) =>
            setFilters(prev => ({ ...prev, category: value as MenuCategory | 'all' }))
          }
        >
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="noodle">{CATEGORY_LABELS.noodle}</TabsTrigger>
            <TabsTrigger value="set">{CATEGORY_LABELS.set}</TabsTrigger>
            <TabsTrigger value="side">{CATEGORY_LABELS.side}</TabsTrigger>
            <TabsTrigger value="drink">{CATEGORY_LABELS.drink}</TabsTrigger>
            <TabsTrigger value="alcohol">{CATEGORY_LABELS.alcohol}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 검색 & 정렬 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="메뉴명, 설명, 태그 검색..."
              value={filters.search}
              onChange={(e) =>
                setFilters(prev => ({ ...prev, search: e.target.value }))
              }
              className="pl-10"
            />
          </div>

          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              setFilters(prev => ({
                ...prev,
                sortBy: value as MenuFilters['sortBy'],
              }))
            }
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">기본 순서</SelectItem>
              <SelectItem value="name">이름순</SelectItem>
              <SelectItem value="price-asc">가격 낮은순</SelectItem>
              <SelectItem value="price-desc">가격 높은순</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* 메뉴 테이블 */}
      <MenuTable
        menus={menus}
        onToggleAvailability={handleToggleAvailability}
        onEdit={handleEditMenu}
        onSetTimeLimit={handleSetTimeLimit}
        loading={loading}
      />

      {/* 생성 다이얼로그 */}
      <MenuCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSave={handleCreateMenu}
      />

      {/* CSV 일괄 등록 다이얼로그 */}
      <MenuCSVImport
        open={csvImportOpen}
        onOpenChange={setCsvImportOpen}
        onImport={handleCSVImport}
      />

      {/* 편집 다이얼로그 */}
      <MenuEditDialog
        menu={editingMenu}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveEdit}
        loading={actionLoading}
      />

      {/* 시간제 설정 다이얼로그 */}
      <TimeSettingDialog
        menu={timeSettingMenu}
        open={timeDialogOpen}
        onOpenChange={setTimeDialogOpen}
        onSave={handleSaveTimeLimit}
        loading={actionLoading}
      />
    </div>
  );
}
