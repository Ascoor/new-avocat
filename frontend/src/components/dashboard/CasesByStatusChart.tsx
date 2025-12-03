import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CasesByStatusChart = ({ data, title }: { data: any[]; title: string }) => {
  const colors = ["#f4b400", "#4285f4", "#db4437", "#0f9d58"];

  return (
    <Card className="h-[350px]">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} innerRadius={60}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CasesByStatusChart;
