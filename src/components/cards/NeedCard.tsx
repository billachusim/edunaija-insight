import { cn } from '@/lib/utils';
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NeedCardProps {
  category: string;
  description: string;
  priority: number;
  estimatedCost?: number;
  status: 'pending' | 'in_progress' | 'fixed';
  className?: string;
}

function getPriorityColor(priority: number): string {
  if (priority >= 5) return 'bg-destructive text-destructive-foreground';
  if (priority >= 4) return 'bg-neon-orange text-primary-foreground';
  if (priority >= 3) return 'bg-neon-yellow text-primary-foreground';
  return 'bg-muted text-muted-foreground';
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'fixed':
      return <CheckCircle2 className="h-4 w-4 text-primary" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-neon-yellow" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function NeedCard({
  category,
  description,
  priority,
  estimatedCost,
  status,
  className,
}: NeedCardProps) {
  return (
    <div className={cn(
      'glass-card p-4 border-l-4 transition-all hover:scale-[1.02]',
      priority >= 5 ? 'border-l-destructive' : 
      priority >= 4 ? 'border-l-neon-orange' : 
      priority >= 3 ? 'border-l-neon-yellow' : 'border-l-muted',
      className
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {getStatusIcon(status)}
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            <Badge className={cn('text-xs', getPriorityColor(priority))}>
              Priority {priority}
            </Badge>
          </div>
          
          <p className="text-sm font-medium">{description}</p>
          
          {estimatedCost && (
            <p className="text-lg font-display font-bold text-primary">
              {formatCurrency(estimatedCost)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
