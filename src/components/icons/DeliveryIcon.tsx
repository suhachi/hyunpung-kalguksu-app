interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function DeliveryIcon({ 
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
      {/* 핸들바 */}
      <line 
        x1="10" 
        y1="12" 
        x2="20" 
        y2="12" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* 왼쪽 핸들 그립 */}
      <circle 
        cx="10" 
        cy="12" 
        r="2.5" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
      />
      
      {/* 오른쪽 핸들 그립 */}
      <circle 
        cx="20" 
        cy="12" 
        r="2.5" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
      />
      
      {/* 헤드라이트 영역 */}
      <rect 
        x="9" 
        y="14" 
        width="12" 
        height="8" 
        rx="1" 
        fill={isActive ? '#D61C1C' : '#2E1C10'}
        fillOpacity={isActive ? '0.25' : '1'}
      />
      
      {/* 헤드라이트 (왼쪽) */}
      <circle 
        cx="12" 
        cy="18" 
        r="1.5" 
        fill={isActive ? '#FFFFFF' : '#FFFFFF'}
        opacity={isActive ? '0.9' : '0.5'}
      />
      
      {/* 헤드라이트 (오른쪽) */}
      <circle 
        cx="18" 
        cy="18" 
        r="1.5" 
        fill={isActive ? '#FFFFFF' : '#FFFFFF'}
        opacity={isActive ? '0.9' : '0.5'}
      />
      
      {/* 스쿠터 바디 (메인) */}
      <path 
        d="M9 22L9 32C9 32 10 36 15 36C20 36 21 32 21 32L21 22Z" 
        fill={isActive ? '#D61C1C' : '#2E1C10'}
        fillOpacity={isActive ? '0.2' : '1'}
      />
      
      {/* 스쿠터 바디 윤곽선 */}
      <path 
        d="M9 22L9 32C9 32 10 36 15 36C20 36 21 32 21 32L21 22" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* 바퀴 (앞바퀴) */}
      <rect 
        x="11" 
        y="36" 
        width="8" 
        height="8" 
        rx="4" 
        fill={isActive ? '#D61C1C' : '#2E1C10'}
        fillOpacity={isActive ? '0.3' : '1'}
      />
      
      {/* 바퀴 윤곽선 */}
      <rect 
        x="11" 
        y="36" 
        width="8" 
        height="8" 
        rx="4" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        fill="none"
      />
      
      {/* 바퀴 내부 원 */}
      <circle 
        cx="15" 
        cy="40" 
        r="2" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="2"
      />
      
      {/* 속도선 (빨강 강조) */}
      {isActive && (
        <g opacity="0.7">
          <line 
            x1="4" 
            y1="24" 
            x2="7" 
            y2="24" 
            stroke="#D61C1C" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line 
            x1="2" 
            y1="28" 
            x2="6" 
            y2="28" 
            stroke="#D61C1C" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line 
            x1="3" 
            y1="32" 
            x2="8" 
            y2="32" 
            stroke="#D61C1C" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
