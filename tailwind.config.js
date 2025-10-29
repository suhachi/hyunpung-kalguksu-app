/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 현풍닭칼국수 브랜드 컬러
        'hyunpung-red': 'var(--color-hyunpung-red)',
        'shinkal-orange': 'var(--color-shinkal-orange)',
        'dark-brown': 'var(--color-dark-brown)',
        'cream-bg': 'var(--color-cream-bg)',
        'brass-gold': 'var(--color-brass-gold)',
        
        // 시맨틱 브랜드 컬러
        'brand-primary': 'var(--color-brand-primary)',
        'brand-primary-hover': 'var(--color-brand-primary-hover)',
        'brand-primary-light': 'var(--color-brand-primary-light)',
        'brand-secondary': 'var(--color-brand-secondary)',
        'brand-secondary-hover': 'var(--color-brand-secondary-hover)',
        'brand-secondary-light': 'var(--color-brand-secondary-light)',
        'brand-accent': 'var(--color-brand-accent)',
        'brand-accent-hover': 'var(--color-brand-accent-hover)',
        'brand-accent-light': 'var(--color-brand-accent-light)',
        
        // 시스템 컬러 (기존 유지)
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        popover: 'var(--color-popover)',
        'popover-foreground': 'var(--color-popover-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        'accent-bg': 'var(--color-accent-bg)',
        'accent-foreground': 'var(--color-accent-foreground)',
        destructive: 'var(--color-destructive)',
        'destructive-foreground': 'var(--color-destructive-foreground)',
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'soft-1': 'var(--shadow-soft-1)',
        'soft-2': 'var(--shadow-soft-2)',
        'soft-3': 'var(--shadow-soft-3)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
