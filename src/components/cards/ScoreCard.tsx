import { cn } from '@/lib/utils';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  description?: string;
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-score-excellent';
  if (score >= 60) return 'text-score-good';
  if (score >= 40) return 'text-score-fair';
  if (score >= 20) return 'text-score-poor';
  return 'text-score-critical';
}

function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-score-excellent';
  if (score >= 60) return 'bg-score-good';
  if (score >= 40) return 'bg-score-fair';
  if (score >= 20) return 'bg-score-poor';
  return 'bg-score-critical';
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Poor';
  return 'Critical';
}

export function ScoreCard({
  title,
  score,
  maxScore = 100,
  description,
  className,
}: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className={cn('glass-card p-5', className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <span className={cn(
          'px-2 py-0.5 rounded-full text-xs font-semibold',
          getScoreBg(score),
          'text-primary-foreground'
        )}>
          {getScoreLabel(score)}
        </span>
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className={cn('text-4xl font-display font-bold', getScoreColor(score))}>
          {score}
        </span>
        <span className="text-muted-foreground text-sm">/ {maxScore}</span>
      </div>
      
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('absolute inset-y-0 left-0 rounded-full transition-all duration-500', getScoreBg(score))}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {description && (
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
