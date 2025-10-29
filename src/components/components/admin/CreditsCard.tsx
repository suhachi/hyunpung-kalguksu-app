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
