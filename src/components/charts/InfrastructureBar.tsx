import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface InfrastructureBarProps {
  data: {
    name: string;
    value: number;
    status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  }[];
  className?: string;
}

const statusColors = {
  excellent: 'hsl(142, 76%, 45%)',
  good: 'hsl(166, 76%, 45%)',
  fair: 'hsl(45, 93%, 47%)',
  poor: 'hsl(25, 95%, 53%)',
  critical: 'hsl(0, 84%, 60%)',
};

export function InfrastructureBar({ data, className }: InfrastructureBarProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))"
            strokeOpacity={0.3}
            horizontal={true}
            vertical={false}
          />
          <XAxis 
            type="number" 
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            type="category" 
            dataKey="name"
            tick={{ 
              fill: 'hsl(var(--muted-foreground))', 
              fontSize: 12,
              fontFamily: 'Rajdhani',
            }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            width={75}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              fontFamily: 'Rajdhani',
            }}
            formatter={(value: number) => [`${value}%`, 'Score']}
          />
          <Bar 
            dataKey="value" 
            radius={[0, 4, 4, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={statusColors[entry.status]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
