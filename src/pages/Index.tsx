
import { DashboardLayout } from "@/components/layout/Dashboard";
import { ResourceUsage } from "@/components/dashboard/ResourceUsage";
import { ServiceStatus } from "@/components/dashboard/ServiceStatus";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Cloud, Database, Plus, Server, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();

  const serviceStatusData = [
    { name: "Compute Engine", status: "operational" as const, region: "us-east1", updated: "2m ago" },
    { name: "Object Storage", status: "degraded" as const, region: "eu-west1", updated: "10m ago" },
    { name: "Kubernetes Service", status: "operational" as const, region: "us-west1", updated: "5m ago" },
    { name: "Database Service", status: "maintenance" as const, region: "ap-south1", updated: "1h ago" },
    { name: "Load Balancer", status: "operational" as const, region: "global", updated: "15m ago" },
  ];

  const vmResources = [
    { 
      id: "vm-1", 
      name: "web-server-01", 
      type: "Standard VM", 
      status: "running" as const, 
      region: "us-east1", 
      created: "2023-05-10",
      usage: { cpu: 65, memory: 78, storage: 45 }
    },
    { 
      id: "vm-2", 
      name: "db-server-01", 
      type: "Memory Optimized", 
      status: "running" as const, 
      region: "us-east1", 
      created: "2023-06-15",
      usage: { cpu: 82, memory: 90, storage: 60 }
    },
    { 
      id: "vm-3", 
      name: "api-server-01", 
      type: "Standard VM", 
      status: "stopped" as const, 
      region: "eu-west1", 
      created: "2023-04-22",
      usage: { cpu: 0, memory: 0, storage: 35 }
    },
    { 
      id: "vm-4", 
      name: "analytics-01", 
      type: "Compute Optimized", 
      status: "provisioning" as const, 
      region: "us-west1", 
      created: "2023-09-01",
      usage: { cpu: 15, memory: 25, storage: 10 }
    },
  ];

  const storageResources = [
    { 
      id: "st-1", 
      name: "app-data", 
      type: "Object Storage", 
      status: "running" as const, 
      region: "us-east1", 
      created: "2023-03-15" 
    },
    { 
      id: "st-2", 
      name: "user-uploads", 
      type: "Object Storage", 
      status: "running" as const, 
      region: "global", 
      created: "2023-05-08" 
    },
    { 
      id: "st-3", 
      name: "database-backups", 
      type: "Block Storage", 
      status: "running" as const, 
      region: "eu-west1", 
      created: "2023-02-20" 
    },
  ];

  const cpuUsageData = [
    { name: "00:00", value: 30 },
    { name: "04:00", value: 25 },
    { name: "08:00", value: 45 },
    { name: "12:00", value: 75 },
    { name: "16:00", value: 90 },
    { name: "20:00", value: 60 },
    { name: "24:00", value: 40 },
  ];

  const networkUsageData = [
    { name: "00:00", value: 5 },
    { name: "04:00", value: 3 },
    { name: "08:00", value: 12 },
    { name: "12:00", value: 25 },
    { name: "16:00", value: 30 },
    { name: "20:00", value: 18 },
    { name: "24:00", value: 8 },
  ];

  useEffect(() => {
    toast({
      title: "Welcome to CloudHaven",
      description: "Your cloud resources are being monitored.",
    });
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to CloudHaven - Your cloud management platform</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Resource
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total VMs" 
          value={42}
          description="Active virtual machines"
          icon={<Server />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Storage Used" 
          value="1.2 TB"
          description="Across all storage services"
          icon={<Database />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard 
          title="Network Bandwidth" 
          value="45 GB/hr"
          description="Current throughput"
          icon={<Wifi />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard 
          title="Active Services" 
          value={15}
          description="Running cloud services"
          icon={<Cloud />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <ResourceUsage 
          title="Compute Usage" 
          used={65} 
          total={100} 
          unit="vCPUs" 
          icon={<Server className="h-4 w-4 text-muted-foreground" />} 
        />
        <ResourceUsage 
          title="Storage Usage" 
          used={1.8} 
          total={2} 
          unit="TB" 
          icon={<Database className="h-4 w-4 text-muted-foreground" />} 
        />
        <ResourceUsage 
          title="Network Bandwidth" 
          used={45} 
          total={100} 
          unit="GB/hr" 
          icon={<Wifi className="h-4 w-4 text-muted-foreground" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UsageChart 
          title="CPU Utilization (24h)" 
          data={cpuUsageData} 
          dataKey="value" 
          yAxisLabel="CPU %" 
          color="#0078D4" 
        />
        <UsageChart 
          title="Network Throughput (24h)" 
          data={networkUsageData} 
          dataKey="value" 
          yAxisLabel="GB/hr" 
          color="#00B7C3" 
          domain={[0, 40]}
          unit=" GB/hr"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ServiceStatus services={serviceStatusData} />
        <ResourceList title="Virtual Machines" resources={vmResources} />
      </div>
      
      <div className="mb-6">
        <ResourceList title="Storage Resources" resources={storageResources} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
