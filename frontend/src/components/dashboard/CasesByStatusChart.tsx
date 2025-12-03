import { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type CasesByStatusDatum = {
  name: string;
  value: number;
};

type CasesByStatusChartProps = {
  data?: CasesByStatusDatum[];
  title?: string;
};

const DEFAULT_CASE_STATUS_DATA: CasesByStatusDatum[] = [
  { name: 'Open', value: 45 },
  { name: 'In Progress', value: 30 },
  { name: 'Closed', value: 18 },
  { name: 'On Hold', value: 12 },
];

const COLORS = ['#f4b400', '#4285f4', '#db4437', '#0f9d58'];

const CasesByStatusChart = ({
  data = DEFAULT_CASE_STATUS_DATA,
  title = 'Cases by Status',
}: CasesByStatusChartProps) => {
  const sanitizedData = useMemo(
    () =>
      (data || [])
        .filter((item) => Number.isFinite(item?.value) && item.name)
        .map((item) => ({ ...item, value: Math.max(0, item.value) })),
    [data],
  );

  const hasData = sanitizedData.length > 0;

  return (
    <Card className="h-full min-h-[320px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[260px] flex-col gap-4 sm:h-[320px]">
        {hasData ? (
          <div className="flex h-full flex-col">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sanitizedData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="70%"
                  innerRadius="45%"
                  paddingAngle={4}
                >
                  {sanitizedData.map((item, i) => (
                    <Cell key={item.name ?? i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px' }}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <span>No status data available yet.</span>
            <span className="text-xs">Add cases to see how they trend over time.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CasesByStatusChart;
