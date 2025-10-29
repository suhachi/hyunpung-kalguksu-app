import { LucideIcon } from 'lucide-react';
import { Card } from '../../ui/card';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number; // 퍼센트
    isPositive: boolean;
  };
  subtitle?: string;
  loading?: boolean;
  variant?: 'default' | 'success' | 'info' | 'warning';
}

export function StatCard({ title, value, icon: Icon, trend, subtitle, loading, variant = 'default' }: StatCardProps) {
  const variantColors = {
    default: 'bg-[#D61C1C]/10 text-[#D61C1C]',
    success: 'bg-green-500/10 text-green-600',
    info: 'bg-blue-500/10 text-blue-600',
    warning: 'bg-amber-500/10 text-amber-600',
  };

  if (loading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-24 h-4 bg-[#E5DDD5] rounded" />
          <div className="w-10 h-10 bg-[#E5DDD5] rounded-lg" />
        </div>
        <div className="w-32 h-8 bg-[#E5DDD5] rounded mb-2" />
        {subtitle && <div className="w-20 h-3 bg-[#E5DDD5] rounded" />}
      </Card>
    );
  }

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-[#8B7355] mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-[#333]">{value}</span>
            {trend && (
              <span
                className={`text-sm ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-[#8B7355] mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${variantColors[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
