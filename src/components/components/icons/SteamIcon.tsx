interface IconProps {
  className?: string;
  variant?: 'outline' | 'duotone';
  state?: 'default' | 'active' | 'disabled' | 'critical';
  size?: number;
}

export function SteamIcon({ 
  className = '', 
  variant = 'outline',
  state = 'default',
  size = 24 
}: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.6"
    >
      {/* 수증기 물결 1 (왼쪽) */}
      <path 
        d="M14 34C14 34 16 30 18 30C20 30 22 34 22 34C22 34 24 38 26 38" 
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 수증기 물결 2 (중앙) */}
      <path 
        d="M18 24C18 24 20 20 22 20C24 20 26 24 26 24C26 24 28 28 30 28C32 28 34 24 34 24" 
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 수증기 물결 3 (오른쪽) */}
      <path 
        d="M22 14C22 14 24 10 26 10C28 10 30 14 30 14C30 14 32 18 34 18" 
        stroke="#2E1C10" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 작은 증기 방울들 */}
      <circle cx="16" cy="38" r="1.5" fill="#2E1C10" opacity="0.4" />
      <circle cx="32" cy="38" r="1.5" fill="#2E1C10" opacity="0.4" />
      <circle cx="24" cy="8" r="1.5" fill="#2E1C10" opacity="0.4" />
    </svg>
  );
}
