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
