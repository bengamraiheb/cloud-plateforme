
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

type UsageData = {
  name: string;
  value: number;
};

type UsageChartProps = {
  title: string;
  data: UsageData[];
  dataKey: string;
  yAxisLabel?: string;
  color: string;
  gradient?: string;
  unit?: string;
  domain?: AxisDomain;
};

export function UsageChart({
  title,
  data,
  dataKey,
  yAxisLabel,
  color,
  gradient = "url(#colorGradient)",
  unit = "%",
  domain = [0, 100],
}: UsageChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: '#888' }}
                domain={domain}
                label={{ 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: 12, fill: '#888' }
                }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}${unit}`, ""]}
                contentStyle={{ 
                  borderRadius: '5px', 
                  border: '1px solid #eee',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                fill={gradient} 
                strokeWidth={2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
