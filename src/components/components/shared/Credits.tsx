interface CreditsProps {
  variant?: 'footer' | 'card';
}

export function Credits({ variant = 'footer' }: CreditsProps) {
  if (variant === 'footer') {
    return (
      <footer className="bg-white border-t border-[#2E1C10]/10 px-4 py-4 mb-16">
        <p className="text-xs text-center text-[#2E1C10]/60 leading-relaxed">
          개발·운영: KS컴퍼니 | 사업자 553-17-00098 | 010-2068-4732
        </p>
      </footer>
    );
  }
  
  // Card variant (마이페이지 > 앱 정보)
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D61C1C]/12">
          <span className="text-[#D61C1C]">ℹ️</span>
        </div>
        <h3 className="text-[#2E1C10]">개발·운영 정보</h3>
      </div>
      
      <div className="space-y-3">
        <InfoRow label="제작·개발" value="KS컴퍼니" />
        <InfoRow label="대표" value="석경선 (운영·관리)" />
        <InfoRow label="공동대표" value="배종수 (개발·기술·관리)" />
        <InfoRow label="사업자등록번호" value="553-17-00098" />
        <InfoRow 
          label="주소" 
          value="경남 양산시 물금읍 범어리 2699-9 202호"
          copyable
        />
        <InfoRow 
          label="연락처" 
          value="010-2068-4732"
          linkable="tel:010-2068-4732"
        />
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  copyable?: boolean;
  linkable?: string;
}

function InfoRow({ label, value, copyable, linkable }: InfoRowProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // 토스트 알림 (나중에 구현)
  };
  
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-[#2E1C10]/60 whitespace-nowrap">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {linkable ? (
          <a 
            href={linkable} 
            className="text-sm text-[#D61C1C] hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-[#2E1C10] text-right">
            {value}
          </span>
        )}
        {copyable && (
          <button
            onClick={handleCopy}
            className="text-xs text-[#D61C1C] hover:underline"
            aria-label="복사"
          >
            복사
          </button>
        )}
      </div>
    </div>
  );
}
