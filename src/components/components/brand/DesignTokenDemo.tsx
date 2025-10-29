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
