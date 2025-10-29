interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function ChickenIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  const isActive = state === 'active' || variant === 'duotone';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 볏 (상단 3개 원) */}
      <circle 
        cx="16" 
        cy="9" 
        r="4" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.2' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
      />
      <circle 
        cx="24" 
        cy="7" 
        r="4.5" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.2' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
      />
      <circle 
        cx="32" 
        cy="9" 
        r="4" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.2' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
      />
      
      {/* 닭 머리/몸통 메인 실루엣 (큰 타원) */}
      <path 
        d="M 10 15 C 10 15 8 18 8 24 C 8 30 8 36 10 40 C 12 44 16 46 24 46 L 36 46 L 36 15 C 36 15 34 13 30 13 C 26 13 20 13 16 13 C 12 13 10 15 10 15 Z" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.15' : '0'}
        stroke="#D61C1C" 
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 눈 (검은 원) */}
      <circle 
        cx="22" 
        cy="24" 
        r="2.5" 
        fill="#D61C1C"
      />
      
      {/* 부리 (오른쪽 작은 삼각형) */}
      <path 
        d="M 36 22 L 42 24 L 36 26 Z" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.3' : '0'}
        stroke="#D61C1C" 
        strokeWidth="4"
        strokeLinejoin="round"
      />
      
      {/* 턱살/목 부분 (하단 곡선 디테일) */}
      <path 
        d="M 12 32 C 12 32 14 36 18 38" 
        stroke="#D61C1C" 
        strokeWidth="3"
        strokeLinecap="round"
        opacity={isActive ? '0.4' : '0.2'}
      />
    </svg>
  );
}
