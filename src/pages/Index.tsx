
import { DashboardLayout } from "@/components/layout/Dashboard";
import { ResourceUsage } from "@/components/dashboard/ResourceUsage";
import { ServiceStatus } from "@/components/dashboard/ServiceStatus";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Cloud, Database, Plus, Server, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/services/dashboardService";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const [hasToasted, setHasToasted] = useState(false);

  // Fetch dashboard data
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: getDashboardSummary,
  });

  useEffect(() => {
    if (!hasToasted) {
      toast({
        title: "Welcome to CloudHaven",
        description: "Your cloud resources are being monitored.",
      });
      setHasToasted(true);
    }

    if (error) {
      toast({
        title: "Error loading dashboard",
        description: "Failed to load dashboard data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [toast, error, hasToasted]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <div className="mb-4 text-2xl font-bold">Loading dashboard...</div>
            <div className="text-muted-foreground">Please wait while we fetch your cloud resources</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to CloudHaven - Your cloud management platform</p>
        </div>
        <Button className="gap-2" asChild>
          <Link to="/compute">
            <Plus className="h-4 w-4" />
            Create Resource
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total VMs" 
          value={data?.stats.totalVms || 0}
          description="Active virtual machines"
          icon={<Server />}
          trend={data?.stats.trends.totalVms}
        />
        <StatsCard 
          title="Storage Used" 
          value={data?.stats.storageUsed || "0 TB"}
          description="Across all storage services"
          icon={<Database />}
          trend={data?.stats.trends.storageUsed}
        />
        <StatsCard 
          title="Network Bandwidth" 
          value={data?.stats.networkBandwidth || "0 GB/hr"}
          description="Current throughput"
          icon={<Wifi />}
          trend={data?.stats.trends.networkBandwidth}
        />
        <StatsCard 
          title="Active Services" 
          value={data?.stats.activeServices || 0}
          description="Running cloud services"
          icon={<Cloud />}
          trend={data?.stats.trends.activeServices}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <ResourceUsage 
          title="Compute Usage" 
          used={data?.resourceUsage.compute.used || 0} 
          total={data?.resourceUsage.compute.total || 1} 
          unit={data?.resourceUsage.compute.unit || "vCPUs"} 
          icon={<Server className="h-4 w-4 text-muted-foreground" />} 
        />
        <ResourceUsage 
          title="Storage Usage" 
          used={data?.resourceUsage.storage.used || 0} 
          total={data?.resourceUsage.storage.total || 1} 
          unit={data?.resourceUsage.storage.unit || "TB"} 
          icon={<Database className="h-4 w-4 text-muted-foreground" />} 
        />
        <ResourceUsage 
          title="Network Bandwidth" 
          used={data?.resourceUsage.network.used || 0} 
          total={data?.resourceUsage.network.total || 1} 
          unit={data?.resourceUsage.network.unit || "GB/hr"} 
          icon={<Wifi className="h-4 w-4 text-muted-foreground" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UsageChart 
          title="CPU Utilization (24h)" 
          data={data?.cpuUsage || []} 
          dataKey="value" 
          yAxisLabel="CPU %" 
          color="#0078D4" 
        />
        <UsageChart 
          title="Network Throughput (24h)" 
          data={data?.networkUsage || []} 
          dataKey="value" 
          yAxisLabel="GB/hr" 
          color="#00B7C3" 
          domain={[0, 40]}
          unit=" GB/hr"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ServiceStatus services={data?.serviceStatus || []} />
        <ResourceList title="Virtual Machines" resources={data?.vmResources || []} />
      </div>
      
      <div className="mb-6">
        <ResourceList title="Storage Resources" resources={data?.storageResources || []} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
