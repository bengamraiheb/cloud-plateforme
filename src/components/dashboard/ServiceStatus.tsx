
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Service = {
  name: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  region: string;
  updated: string;
};

type ServiceStatusProps = {
  services: Service[];
};

export function ServiceStatus({ services }: ServiceStatusProps) {
  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "outage":
        return "bg-red-500";
      case "maintenance":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded";
      case "outage":
        return "Outage";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Service Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={`${service.name}-${service.region}`} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("h-3 w-3 rounded-full", getStatusColor(service.status))} />
                <div className="font-medium text-sm">{service.name}</div>
                <Badge variant="outline" className="text-xs">{service.region}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs",
                    service.status === "operational" && "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
                    service.status === "degraded" && "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
                    service.status === "outage" && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
                    service.status === "maintenance" && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  )}
                >
                  {getStatusText(service.status)}
                </Badge>
                <span className="text-xs text-muted-foreground">{service.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
