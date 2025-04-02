
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ResourceUsageProps = {
  title: string;
  used: number;
  total: number;
  unit: string;
  icon: React.ReactNode;
};

export function ResourceUsage({ title, used, total, unit, icon }: ResourceUsageProps) {
  const percentage = Math.round((used / total) * 100);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {used} <span className="text-muted-foreground text-sm font-normal">/ {total} {unit}</span>
        </div>
        <div className="flex items-center justify-between mt-3 mb-1">
          <span className="text-sm text-muted-foreground">{percentage}% used</span>
          <span className="text-xs text-muted-foreground">{total - used} {unit} available</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </CardContent>
    </Card>
  );
}
