interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function CouponIcon({ 
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
      {/* 티켓 외곽 */}
      <path 
        d="M6 14L42 14L42 20C40 20 38 22 38 24C38 26 40 28 42 28L42 36L6 36L6 28C8 28 10 26 10 24C10 22 8 20 6 20L6 14Z" 
        fill={isActive ? '#F37021' : 'none'}
        fillOpacity={isActive ? '0.12' : '0'}
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* 재단선 상단 */}
      <line 
        x1="6" 
        y1="14" 
        x2="42" 
        y2="14" 
        stroke="#2E1C10" 
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      
      {/* 재단선 하단 */}
      <line 
        x1="6" 
        y1="36" 
        x2="42" 
        y2="36" 
        stroke="#2E1C10" 
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      
      {/* 퍼포레이션 점 세로줄 */}
      <circle cx="24" cy="18" r="1" fill="#2E1C10" />
      <circle cx="24" cy="22" r="1" fill="#2E1C10" />
      <circle cx="24" cy="26" r="1" fill="#2E1C10" />
      <circle cx="24" cy="30" r="1" fill="#2E1C10" />
      <circle cx="24" cy="34" r="1" fill="#2E1C10" />
      
      {/* 할인 표시 */}
      <text 
        x="18" 
        y="27" 
        fill="#D61C1C" 
        fontSize="12" 
        fontWeight="bold"
      >
        %
      </text>
    </svg>
  );
}
