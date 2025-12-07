import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface ScoreRadarProps {
  data: {
    subject: string;
    score: number;
    fullMark: number;
  }[];
  className?: string;
}

export function ScoreRadar({ data, className }: ScoreRadarProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.5}
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: 'hsl(var(--muted-foreground))', 
              fontSize: 12,
              fontFamily: 'Rajdhani',
            }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ 
              fill: 'hsl(var(--muted-foreground))', 
              fontSize: 10 
            }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              fontFamily: 'Rajdhani',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
