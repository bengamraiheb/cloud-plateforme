
/**
 * Mock data and handlers for dashboard endpoints
 */

// Service status data
export const mockServiceStatus = [
  { name: "Compute Engine", status: "operational" as const, region: "us-east1", updated: "2m ago" },
  { name: "Object Storage", status: "degraded" as const, region: "eu-west1", updated: "10m ago" },
  { name: "Kubernetes Service", status: "operational" as const, region: "us-west1", updated: "5m ago" },
  { name: "Database Service", status: "maintenance" as const, region: "ap-south1", updated: "1h ago" },
  { name: "Load Balancer", status: "operational" as const, region: "global", updated: "15m ago" },
];

// VM resources data
export const mockVmResources = [
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

// Storage resources data
export const mockStorageResources = [
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

// CPU usage data
export const mockCpuUsageData = [
  { name: "00:00", value: 30 },
  { name: "04:00", value: 25 },
  { name: "08:00", value: 45 },
  { name: "12:00", value: 75 },
  { name: "16:00", value: 90 },
  { name: "20:00", value: 60 },
  { name: "24:00", value: 40 },
];

// Network usage data
export const mockNetworkUsageData = [
  { name: "00:00", value: 5 },
  { name: "04:00", value: 3 },
  { name: "08:00", value: 12 },
  { name: "12:00", value: 25 },
  { name: "16:00", value: 30 },
  { name: "20:00", value: 18 },
  { name: "24:00", value: 8 },
];

// Stats data
export const mockStatsData = {
  totalVms: 42,
  storageUsed: "1.2 TB",
  networkBandwidth: "45 GB/hr",
  activeServices: 15,
  trends: {
    totalVms: { value: 12, isPositive: true },
    storageUsed: { value: 8, isPositive: true },
    networkBandwidth: { value: 5, isPositive: false },
    activeServices: { value: 3, isPositive: true },
  }
};

// Resource usage data
export const mockResourceUsage = {
  compute: { used: 65, total: 100, unit: "vCPUs" },
  storage: { used: 1.8, total: 2, unit: "TB" },
  network: { used: 45, total: 100, unit: "GB/hr" },
};

export async function handleDashboardMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // GET /dashboard/service-status - Get service status
  if (endpoint === "/dashboard/service-status" && method === "GET") {
    return mockServiceStatus as unknown as T;
  }
  
  // GET /dashboard/vm-resources - Get VM resources
  if (endpoint === "/dashboard/vm-resources" && method === "GET") {
    return mockVmResources as unknown as T;
  }
  
  // GET /dashboard/storage-resources - Get storage resources
  if (endpoint === "/dashboard/storage-resources" && method === "GET") {
    return mockStorageResources as unknown as T;
  }
  
  // GET /dashboard/cpu-usage - Get CPU usage data
  if (endpoint === "/dashboard/cpu-usage" && method === "GET") {
    return mockCpuUsageData as unknown as T;
  }
  
  // GET /dashboard/network-usage - Get network usage data
  if (endpoint === "/dashboard/network-usage" && method === "GET") {
    return mockNetworkUsageData as unknown as T;
  }
  
  // GET /dashboard/stats - Get statistics data
  if (endpoint === "/dashboard/stats" && method === "GET") {
    return mockStatsData as unknown as T;
  }
  
  // GET /dashboard/resource-usage - Get resource usage data
  if (endpoint === "/dashboard/resource-usage" && method === "GET") {
    return mockResourceUsage as unknown as T;
  }
  
  // GET /dashboard/summary - Get all dashboard data in a single request
  if (endpoint === "/dashboard/summary" && method === "GET") {
    return {
      serviceStatus: mockServiceStatus,
      vmResources: mockVmResources,
      storageResources: mockStorageResources,
      cpuUsage: mockCpuUsageData,
      networkUsage: mockNetworkUsageData,
      stats: mockStatsData,
      resourceUsage: mockResourceUsage,
    } as unknown as T;
  }
  
  throw new Error(`Unhandled dashboard mock endpoint: ${endpoint} with method ${method}`);
}
