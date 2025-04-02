
/**
 * Service for networking-related functionality
 */
import { fetchApi } from "./api";
import { VirtualNetwork, LoadBalancer, Firewall } from "@/types/networking";

// Virtual Networks
export async function getVirtualNetworks(): Promise<VirtualNetwork[]> {
  return fetchApi<VirtualNetwork[]>("/networking/vnets");
}

export async function getVirtualNetwork(id: string): Promise<VirtualNetwork> {
  return fetchApi<VirtualNetwork>(`/networking/vnets/${id}`);
}

export async function createVirtualNetwork(network: Omit<VirtualNetwork, "id" | "status" | "created">): Promise<VirtualNetwork> {
  return fetchApi<VirtualNetwork>("/networking/vnets", {
    method: "POST",
    body: JSON.stringify(network),
  });
}

export async function addSubnetToVirtualNetwork(vnetId: string, subnet: Omit<VirtualNetwork["subnets"][0], "id">): Promise<VirtualNetwork["subnets"][0]> {
  return fetchApi<VirtualNetwork["subnets"][0]>(`/networking/vnets/${vnetId}/subnets`, {
    method: "POST",
    body: JSON.stringify(subnet),
  });
}

export async function deleteVirtualNetwork(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/networking/vnets/${id}`, {
    method: "DELETE",
  });
}

// Load Balancers
export async function getLoadBalancers(): Promise<LoadBalancer[]> {
  return fetchApi<LoadBalancer[]>("/networking/load-balancers");
}

export async function getLoadBalancer(id: string): Promise<LoadBalancer> {
  return fetchApi<LoadBalancer>(`/networking/load-balancers/${id}`);
}

export async function createLoadBalancer(loadBalancer: Omit<LoadBalancer, "id" | "status" | "created" | "publicIp" | "backends">): Promise<LoadBalancer> {
  return fetchApi<LoadBalancer>("/networking/load-balancers", {
    method: "POST",
    body: JSON.stringify(loadBalancer),
  });
}

// Firewalls
export async function getFirewalls(): Promise<Firewall[]> {
  return fetchApi<Firewall[]>("/networking/firewalls");
}

export async function getFirewall(id: string): Promise<Firewall> {
  return fetchApi<Firewall>(`/networking/firewalls/${id}`);
}

export async function createFirewall(firewall: Omit<Firewall, "id" | "status" | "created" | "rules">): Promise<Firewall> {
  return fetchApi<Firewall>("/networking/firewalls", {
    method: "POST",
    body: JSON.stringify(firewall),
  });
}

export async function addFirewallRule(firewallId: string, rule: Omit<Firewall["rules"][0], "id">): Promise<Firewall["rules"][0]> {
  return fetchApi<Firewall["rules"][0]>(`/networking/firewalls/${firewallId}/rules`, {
    method: "POST",
    body: JSON.stringify(rule),
  });
}
