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
