
/**
 * Types for networking resources
 */

export type VirtualNetwork = {
  id: string;
  name: string;
  region: string;
  cidr: string;
  status: "active" | "provisioning" | "inactive" | "error";
  created: string;
  subnets: Subnet[];
};

export type Subnet = {
  id: string;
  name: string;
  cidr: string;
};

export type LoadBalancer = {
  id: string;
  name: string;
  type: "Application" | "Network";
  status: "active" | "provisioning" | "inactive" | "error";
  region: string;
  vnetId: string;
  publicIp: string;
  created: string;
  backends: {
    id: string;
    name: string;
    instances: number;
    healthStatus: "healthy" | "degraded" | "unhealthy";
  }[];
};

export type Firewall = {
  id: string;
  name: string;
  status: "active" | "provisioning" | "inactive" | "error";
  region: string;
  vnetId: string;
  created: string;
  rules: {
    id: string;
    name: string;
    protocol: string;
    port: string;
    source: string;
    action: "allow" | "deny";
  }[];
};
