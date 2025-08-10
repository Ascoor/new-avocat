import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'; 
import { useTranslation } from 'react-i18next';

export interface CasePieChartProps {
  openCases?: number;
  closedCases?: number;
}

const COLORS = ['#0088FE', '#FFBB28'];

export default function CasePieChart({ openCases = 60, closedCases = 40 }: CasePieChartProps) {
  const { t } = useTranslation();

  const data = [
    { name: t('dashboard.open_cases'), value: openCases },
    { name: t('dashboard.closed_cases'), value: closedCases },
  ];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
