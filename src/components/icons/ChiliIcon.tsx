interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function ChiliIcon({ 
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
      {/* 고추 몸통 */}
      <path 
        d="M20 10C20 10 18 12 18 16C18 20 19 24 21 28C23 32 25 36 27 40C27.5 41.5 28.5 43 30 43C31.5 43 32.5 41.5 33 40C34 37 33 33 31 29C29 25 27 21 25 17C23 13 21 10 20 10Z" 
        fill={isActive ? '#D61C1C' : 'none'}
        fillOpacity={isActive ? '0.15' : '0'}
        stroke="#D61C1C" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 고추 하이라이트 */}
      <path 
        d="M23 16C23 16 24 20 25 24C26 28 27 32 28 36" 
        stroke="#D61C1C" 
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* 꼭지 (라운드) */}
      <path 
        d="M20 10C20 10 19 8 18 7C17 6 16 6 15 7C14.5 7.5 14.5 8.5 15 9" 
        stroke="#2E7D32" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M20.5 9C20.5 9 21 7 22 6C23 5 24 5 25 6C25.5 6.5 25.5 7.5 25 8.5" 
        stroke="#2E7D32" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M21 8.5C21 8.5 22 7.5 22.5 7C23 6.5 23.5 6.5 24 7" 
        stroke="#2E7D32" 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
