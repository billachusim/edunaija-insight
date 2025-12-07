import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface NeedsDonutProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

export function NeedsDonut({ data, className }: NeedsDonutProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="hsl(var(--background))"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              fontFamily: 'Rajdhani',
            }}
            formatter={(value: number) => [
              new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                minimumFractionDigits: 0,
              }).format(value),
              'Cost'
            ]}
          />
          <Legend 
            verticalAlign="bottom"
            wrapperStyle={{ 
              fontFamily: 'Rajdhani',
              fontSize: '14px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
