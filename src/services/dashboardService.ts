
/**
 * Service for dashboard-related functionality
 */
import { fetchApi } from "./api";
import { Service } from "@/components/dashboard/ServiceStatus";
import { Resource } from "@/components/dashboard/ResourceList";

export interface DashboardSummary {
  serviceStatus: Service[];
  vmResources: Resource[];
  storageResources: Resource[];
  cpuUsage: { name: string; value: number }[];
  networkUsage: { name: string; value: number }[];
  stats: {
    totalVms: number;
    storageUsed: string;
    networkBandwidth: string;
    activeServices: number;
    trends: {
      totalVms: { value: number; isPositive: boolean };
      storageUsed: { value: number; isPositive: boolean };
      networkBandwidth: { value: number; isPositive: boolean };
      activeServices: { value: number; isPositive: boolean };
    }
  };
  resourceUsage: {
    compute: { used: number; total: number; unit: string };
    storage: { used: number; total: number; unit: string };
    network: { used: number; total: number; unit: string };
  };
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return fetchApi<DashboardSummary>("/dashboard/summary");
}

export async function getServiceStatus(): Promise<Service[]> {
  return fetchApi<Service[]>("/dashboard/service-status");
}

export async function getVmResources(): Promise<Resource[]> {
  return fetchApi<Resource[]>("/dashboard/vm-resources");
}

export async function getStorageResources(): Promise<Resource[]> {
  return fetchApi<Resource[]>("/dashboard/storage-resources");
}

export async function getCpuUsageData(): Promise<{ name: string; value: number }[]> {
  return fetchApi<{ name: string; value: number }[]>("/dashboard/cpu-usage");
}

export async function getNetworkUsageData(): Promise<{ name: string; value: number }[]> {
  return fetchApi<{ name: string; value: number }[]>("/dashboard/network-usage");
}

export async function getResourceUsage(): Promise<{
  compute: { used: number; total: number; unit: string };
  storage: { used: number; total: number; unit: string };
  network: { used: number; total: number; unit: string };
}> {
  return fetchApi<{
    compute: { used: number; total: number; unit: string };
    storage: { used: number; total: number; unit: string };
    network: { used: number; total: number; unit: string };
  }>("/dashboard/resource-usage");
}
