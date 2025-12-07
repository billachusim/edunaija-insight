import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'before:bg-gradient-to-r before:from-muted before:to-muted-foreground/20',
  primary: 'before:bg-gradient-to-r before:from-primary before:to-neon-green',
  accent: 'before:bg-gradient-to-r before:from-accent before:to-neon-blue',
  warning: 'before:bg-gradient-to-r before:from-neon-yellow before:to-neon-orange',
  danger: 'before:bg-gradient-to-r before:from-destructive before:to-neon-red',
};

const iconStyles = {
  default: 'text-muted-foreground bg-muted',
  primary: 'text-primary bg-primary/10',
  accent: 'text-accent bg-accent/10',
  warning: 'text-neon-yellow bg-neon-yellow/10',
  danger: 'text-destructive bg-destructive/10',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div className={cn('stat-card', variantStyles[variant], className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-display font-bold tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend.isPositive ? 'text-primary' : 'text-destructive'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          'p-3 rounded-xl',
          iconStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
