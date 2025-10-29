interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function BowlIcon({ 
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
      {/* 그릇 받침대 */}
      <path 
        d="M16 38L14 42L34 42L32 38Z" 
        fill={isActive ? '#C7A45A' : '#2E1C10'}
        fillOpacity={isActive ? '0.3' : '1'}
      />
      <path 
        d="M16 38L14 42L34 42L32 38" 
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* 그릇 받침대 상단 라인 */}
      <line 
        x1="13" 
        y1="38" 
        x2="35" 
        y2="38" 
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* 그릇 본체 (사다리꼴) */}
      <path 
        d="M10 14L8 38L40 38L38 14Z" 
        fill={isActive ? '#C7A45A' : '#2E1C10'}
        fillOpacity={isActive ? '0.15' : '1'}
      />
      <path 
        d="M10 14L8 38L40 38L38 14Z" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* 그릇 상단 테두리 */}
      <path 
        d="M8 14L40 14" 
        stroke="#2E1C10" 
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* 황동 광택 효과 (왼쪽) */}
      {isActive && (
        <>
          <path 
            d="M12 18C12 18 13 24 14 30" 
            stroke="#C7A45A" 
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path 
            d="M14 16C14 16 15 22 16 28C17 34 18 36 18 36" 
            stroke="#C7A45A" 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          
          {/* 황동 광택 효과 (오른쪽) */}
          <path 
            d="M36 18C36 18 35 24 34 30" 
            stroke="#C7A45A" 
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          {/* 내부 하이라이트 */}
          <ellipse 
            cx="24" 
            cy="16" 
            rx="10" 
            ry="2" 
            stroke="#C7A45A" 
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* 황동 질감 */}
          <line 
            x1="20" 
            y1="14" 
            x2="20" 
            y2="10" 
            stroke="#C7A45A" 
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
          <line 
            x1="24" 
            y1="14" 
            x2="24" 
            y2="9" 
            stroke="#C7A45A" 
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
          <line 
            x1="28" 
            y1="14" 
            x2="28" 
            y2="10" 
            stroke="#C7A45A" 
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
        </>
      )}
    </svg>
  );
}
