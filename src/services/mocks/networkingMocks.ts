
/**
 * Mock data and handlers for networking endpoints
 */
import { VirtualNetwork, LoadBalancer, Firewall } from "@/types/networking";

// Mock virtual networks
const mockNetworks: VirtualNetwork[] = [
  {
    id: "vnet-01",
    name: "Production VNet",
    region: "us-west-1",
    cidr: "10.0.0.0/16",
    status: "active",
    created: "2023-08-15",
    subnets: [
      { id: "subnet-01", name: "Web Tier", cidr: "10.0.1.0/24" },
      { id: "subnet-02", name: "App Tier", cidr: "10.0.2.0/24" },
      { id: "subnet-03", name: "Database Tier", cidr: "10.0.3.0/24" },
    ],
  },
  {
    id: "vnet-02",
    name: "Development VNet",
    region: "us-east-1",
    cidr: "192.168.0.0/16",
    status: "active",
    created: "2023-09-01",
    subnets: [
      { id: "subnet-04", name: "Dev Subnet", cidr: "192.168.1.0/24" },
      { id: "subnet-05", name: "Test Subnet", cidr: "192.168.2.0/24" },
    ],
  },
  {
    id: "vnet-03",
    name: "Staging VNet",
    region: "eu-central-1",
    cidr: "172.16.0.0/16",
    status: "active",
    created: "2023-09-10",
    subnets: [
      { id: "subnet-06", name: "Staging Subnet", cidr: "172.16.1.0/24" },
    ],
  },
];

// Mock load balancers
const mockLoadBalancers: LoadBalancer[] = [
  {
    id: "lb-01",
    name: "Production LB",
    type: "Application",
    status: "active",
    region: "us-west-1",
    vnetId: "vnet-01",
    publicIp: "52.32.178.91",
    created: "2023-08-20",
    backends: [
      { id: "backend-01", name: "Web Servers", instances: 3, healthStatus: "healthy" },
    ],
  },
  {
    id: "lb-02",
    name: "API Gateway LB",
    type: "Network",
    status: "active",
    region: "us-west-1",
    vnetId: "vnet-01",
    publicIp: "52.32.179.22",
    created: "2023-08-25",
    backends: [
      { id: "backend-02", name: "API Servers", instances: 2, healthStatus: "healthy" },
    ],
  },
];

// Mock firewalls
const mockFirewalls: Firewall[] = [
  {
    id: "fw-01",
    name: "Production Firewall",
    status: "active",
    region: "us-west-1",
    vnetId: "vnet-01",
    created: "2023-08-16",
    rules: [
      { id: "rule-01", name: "Allow HTTP", protocol: "TCP", port: "80", source: "0.0.0.0/0", action: "allow" },
      { id: "rule-02", name: "Allow HTTPS", protocol: "TCP", port: "443", source: "0.0.0.0/0", action: "allow" },
      { id: "rule-03", name: "Block SSH from Public", protocol: "TCP", port: "22", source: "0.0.0.0/0", action: "deny" },
    ],
  },
  {
    id: "fw-02",
    name: "Development Firewall",
    status: "active",
    region: "us-east-1",
    vnetId: "vnet-02",
    created: "2023-09-02",
    rules: [
      { id: "rule-04", name: "Allow All Internal", protocol: "All", port: "All", source: "192.168.0.0/16", action: "allow" },
      { id: "rule-05", name: "Allow Office IPs", protocol: "All", port: "All", source: "203.0.113.0/24", action: "allow" },
    ],
  },
];

export async function handleNetworkingMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // Virtual Networks
  
  // GET /networking/vnets - List all virtual networks
  if (endpoint === "/networking/vnets" && method === "GET") {
    return mockNetworks as unknown as T;
  }
  
  // GET /networking/vnets/:id - Get virtual network details
  if (endpoint.match(/\/networking\/vnets\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const vnet = mockNetworks.find(n => n.id === id);
    
    if (!vnet) {
      throw new Error("Virtual network not found");
    }
    
    return vnet as unknown as T;
  }
  
  // POST /networking/vnets - Create a new virtual network
  if (endpoint === "/networking/vnets" && method === "POST") {
    const newVNet: VirtualNetwork = {
      id: `vnet-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      region: body.region,
      cidr: body.cidr,
      status: "provisioning",
      created: new Date().toISOString().split("T")[0],
      subnets: body.subnets || [],
    };
    
    return newVNet as unknown as T;
  }
  
  // POST /networking/vnets/:id/subnets - Add a subnet to a virtual network
  if (endpoint.match(/\/networking\/vnets\/[\w-]+\/subnets$/) && method === "POST") {
    const id = endpoint.split("/")[3];
    const vnet = mockNetworks.find(n => n.id === id);
    
    if (!vnet) {
      throw new Error("Virtual network not found");
    }
    
    const newSubnet = {
      id: `subnet-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      cidr: body.cidr,
    };
    
    return newSubnet as unknown as T;
  }
  
  // DELETE /networking/vnets/:id - Delete a virtual network
  if (endpoint.match(/\/networking\/vnets\/[\w-]+$/) && method === "DELETE") {
    const id = endpoint.split("/").pop();
    const vnetIndex = mockNetworks.findIndex(n => n.id === id);
    
    if (vnetIndex === -1) {
      throw new Error("Virtual network not found");
    }
    
    return { success: true } as unknown as T;
  }
  
  // Load Balancers
  
  // GET /networking/load-balancers - List all load balancers
  if (endpoint === "/networking/load-balancers" && method === "GET") {
    return mockLoadBalancers as unknown as T;
  }
  
  // GET /networking/load-balancers/:id - Get load balancer details
  if (endpoint.match(/\/networking\/load-balancers\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const loadBalancer = mockLoadBalancers.find(lb => lb.id === id);
    
    if (!loadBalancer) {
      throw new Error("Load balancer not found");
    }
    
    return loadBalancer as unknown as T;
  }
  
  // POST /networking/load-balancers - Create a new load balancer
  if (endpoint === "/networking/load-balancers" && method === "POST") {
    const newLoadBalancer: LoadBalancer = {
      id: `lb-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      type: body.type,
      status: "provisioning",
      region: body.region,
      vnetId: body.vnetId,
      publicIp: `52.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      created: new Date().toISOString().split("T")[0],
      backends: [],
    };
    
    return newLoadBalancer as unknown as T;
  }
  
  // Firewalls
  
  // GET /networking/firewalls - List all firewalls
  if (endpoint === "/networking/firewalls" && method === "GET") {
    return mockFirewalls as unknown as T;
  }
  
  // GET /networking/firewalls/:id - Get firewall details
  if (endpoint.match(/\/networking\/firewalls\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const firewall = mockFirewalls.find(fw => fw.id === id);
    
    if (!firewall) {
      throw new Error("Firewall not found");
    }
    
    return firewall as unknown as T;
  }
  
  // POST /networking/firewalls - Create a new firewall
  if (endpoint === "/networking/firewalls" && method === "POST") {
    const newFirewall: Firewall = {
      id: `fw-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      status: "provisioning",
      region: body.region,
      vnetId: body.vnetId,
      created: new Date().toISOString().split("T")[0],
      rules: [],
    };
    
    return newFirewall as unknown as T;
  }
  
  // POST /networking/firewalls/:id/rules - Add a rule to a firewall
  if (endpoint.match(/\/networking\/firewalls\/[\w-]+\/rules$/) && method === "POST") {
    const id = endpoint.split("/")[3];
    const firewall = mockFirewalls.find(fw => fw.id === id);
    
    if (!firewall) {
      throw new Error("Firewall not found");
    }
    
    const newRule = {
      id: `rule-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      protocol: body.protocol,
      port: body.port,
      source: body.source,
      action: body.action,
    };
    
    return newRule as unknown as T;
  }
  
  throw new Error(`Unhandled networking mock endpoint: ${endpoint} with method ${method}`);
}
