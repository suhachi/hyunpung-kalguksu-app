import { LogoSystem } from './brand/LogoSystem';
import { ColorSystem } from './brand/ColorSystem';
import { BrandPhilosophy } from './brand/BrandPhilosophy';
import { UsageGuidelines } from './brand/UsageGuidelines';
import { BrandHeader } from './brand/BrandHeader';
import { DownloadSection } from './brand/DownloadSection';
import { DesignTokenDemo } from './brand/DesignTokenDemo';
import { IconSystem } from './brand/IconSystem';

export function BrandIdentity() {
  return (
    <div className="min-h-screen">
      <BrandHeader />
      <main>
        <BrandPhilosophy />
        <DesignTokenDemo />
        <LogoSystem />
        <ColorSystem />
        <IconSystem />
        <UsageGuidelines />
        <DownloadSection />
      </main>
    </div>
  );
}
