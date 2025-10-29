interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function NoodleIcon({ 
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
      {/* 그릇 하단 받침대 */}
      <path 
        d="M 16 38 L 14 44 L 34 44 L 32 38 Z" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 그릇 본체 (사다리꼴) */}
      <path 
        d="M 10 12 L 8 38 L 40 38 L 38 12 Z" 
        fill="none"
        stroke="#2E1C10" 
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* 그릇 상단 테두리 */}
      <line 
        x1="8" 
        y1="12" 
        x2="40" 
        y2="12" 
        stroke="#2E1C10" 
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* 면발 1 (왼쪽 작은 아치) */}
      <g>
        <path d="M 14 22 Q 14 18 18 18 Q 22 18 22 22" stroke="#2E1C10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 14.5 21 Q 14.5 19 18 19 Q 21.5 19 21.5 21" stroke="#2E1C10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 15 20 Q 15 19.5 18 19.5 Q 21 19.5 21 20" stroke="#2E1C10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 15.5 19.5 Q 15.5 19.2 18 19.2 Q 20.5 19.2 20.5 19.5" stroke="#2E1C10" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
      
      {/* 면발 2 (중간 아치) */}
      <g>
        <path d="M 20 28 Q 20 22 24 22 Q 28 22 28 28" stroke="#2E1C10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 20.5 27 Q 20.5 23 24 23 Q 27.5 23 27.5 27" stroke="#2E1C10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 21 26 Q 21 24 24 24 Q 27 24 27 26" stroke="#2E1C10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 21.5 25 Q 21.5 24.5 24 24.5 Q 26.5 24.5 26.5 25" stroke="#2E1C10" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M 22 24.5 Q 22 24.2 24 24.2 Q 26 24.2 26 24.5" stroke="#2E1C10" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      </g>
      
      {/* 면발 3 (오른쪽 큰 아치) */}
      <g>
        <path d="M 26 32 Q 26 24 30 24 Q 34 24 34 32" stroke="#2E1C10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 26.5 31 Q 26.5 25 30 25 Q 33.5 25 33.5 31" stroke="#2E1C10" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 27 30 Q 27 26 30 26 Q 33 26 33 30" stroke="#2E1C10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 27.5 29 Q 27.5 27 30 27 Q 32.5 27 32.5 29" stroke="#2E1C10" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M 28 28 Q 28 27.5 30 27.5 Q 32 27.5 32 28" stroke="#2E1C10" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      </g>
      
      {/* 오른쪽 그림자 (활성 상태) */}
      {isActive && (
        <g opacity="0.3">
          <path 
            d="M 38 14 L 36 38 L 42 38 L 44 14 Z" 
            fill="#6B7280"
          />
          <line 
            x1="38" 
            y1="14" 
            x2="44" 
            y2="14" 
            stroke="#6B7280" 
            strokeWidth="2"
          />
          <path 
            d="M 36 38 L 34 44 L 38 44 L 40 38 Z" 
            fill="#6B7280"
          />
        </g>
      )}
    </svg>
  );
}
