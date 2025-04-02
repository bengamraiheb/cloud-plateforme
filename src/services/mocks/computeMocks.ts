
/**
 * Mock data and handlers for compute endpoints
 */
import { ComputeInstance } from "@/types/compute";

// Mock compute instances
const mockInstances: ComputeInstance[] = [
  {
    id: "vm-01",
    name: "Web Server",
    type: "Standard-2",
    status: "running",
    region: "us-west-1",
    created: "2023-10-15",
    specs: {
      cpu: 2,
      memory: 4,
      storage: 80,
    },
  },
  {
    id: "vm-02",
    name: "Database Server",
    type: "Performance-4",
    status: "running",
    region: "us-west-1",
    created: "2023-10-10",
    specs: {
      cpu: 4,
      memory: 16,
      storage: 500,
    },
  },
  {
    id: "vm-03",
    name: "Dev Environment",
    type: "Standard-1",
    status: "stopped",
    region: "eu-central-1",
    created: "2023-09-20",
    specs: {
      cpu: 1,
      memory: 2,
      storage: 40,
    },
  },
  {
    id: "vm-04",
    name: "Test Server",
    type: "Standard-2",
    status: "error",
    region: "ap-southeast-1",
    created: "2023-10-18",
    specs: {
      cpu: 2,
      memory: 4,
      storage: 80,
    },
  },
  {
    id: "vm-05",
    name: "Analytics Worker",
    type: "Performance-8",
    status: "provisioning",
    region: "us-east-1",
    created: "2023-11-01",
    specs: {
      cpu: 8,
      memory: 32,
      storage: 1000,
    },
  },
];

// Instance types available for creation
export const instanceTypes = [
  { id: "standard-1", name: "Standard-1", cpu: 1, memory: 2, storage: 40, price: 0.05 },
  { id: "standard-2", name: "Standard-2", cpu: 2, memory: 4, storage: 80, price: 0.10 },
  { id: "performance-4", name: "Performance-4", cpu: 4, memory: 16, storage: 500, price: 0.25 },
  { id: "performance-8", name: "Performance-8", cpu: 8, memory: 32, storage: 1000, price: 0.50 },
  { id: "memory-4", name: "Memory-4", cpu: 2, memory: 16, storage: 80, price: 0.20 },
  { id: "memory-8", name: "Memory-8", cpu: 4, memory: 32, storage: 160, price: 0.40 },
  { id: "compute-4", name: "Compute-4", cpu: 4, memory: 8, storage: 80, price: 0.22 },
  { id: "compute-8", name: "Compute-8", cpu: 8, memory: 16, storage: 160, price: 0.45 },
];

export const regions = [
  { id: "us-east-1", name: "US East (N. Virginia)" },
  { id: "us-west-1", name: "US West (N. California)" },
  { id: "eu-central-1", name: "EU (Frankfurt)" },
  { id: "ap-southeast-1", name: "Asia Pacific (Singapore)" },
];

export async function handleComputeMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // GET /compute/instances - List all instances
  if (endpoint === "/compute/instances" && method === "GET") {
    return mockInstances as unknown as T;
  }
  
  // GET /compute/instances/:id - Get instance details
  if (endpoint.match(/\/compute\/instances\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const instance = mockInstances.find(i => i.id === id);
    
    if (!instance) {
      throw new Error("Instance not found");
    }
    
    return instance as unknown as T;
  }
  
  // POST /compute/instances - Create a new instance
  if (endpoint === "/compute/instances" && method === "POST") {
    // In a real backend, we would validate the body and create a new instance
    const newInstance: ComputeInstance = {
      id: `vm-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      type: body.type,
      status: "provisioning",
      region: body.region,
      created: new Date().toISOString().split("T")[0],
      specs: {
        cpu: body.specs.cpu,
        memory: body.specs.memory,
        storage: body.specs.storage,
      },
    };
    
    // In a mock, we just return the new instance without actually persisting it
    return newInstance as unknown as T;
  }
  
  // PUT /compute/instances/:id - Update an instance
  if (endpoint.match(/\/compute\/instances\/[\w-]+$/) && method === "PUT") {
    const id = endpoint.split("/").pop();
    const instanceIndex = mockInstances.findIndex(i => i.id === id);
    
    if (instanceIndex === -1) {
      throw new Error("Instance not found");
    }
    
    // In a real backend, we would update the actual data
    const updatedInstance = {
      ...mockInstances[instanceIndex],
      ...body,
    };
    
    return updatedInstance as unknown as T;
  }
  
  // DELETE /compute/instances/:id - Delete an instance
  if (endpoint.match(/\/compute\/instances\/[\w-]+$/) && method === "DELETE") {
    const id = endpoint.split("/").pop();
    const instanceIndex = mockInstances.findIndex(i => i.id === id);
    
    if (instanceIndex === -1) {
      throw new Error("Instance not found");
    }
    
    // In a real backend, we would delete the instance
    return { success: true } as unknown as T;
  }
  
  // GET /compute/instance-types - List available instance types
  if (endpoint === "/compute/instance-types" && method === "GET") {
    return instanceTypes as unknown as T;
  }
  
  // GET /compute/regions - List available regions
  if (endpoint === "/compute/regions" && method === "GET") {
    return regions as unknown as T;
  }
  
  // POST /compute/instances/:id/start - Start an instance
  if (endpoint.match(/\/compute\/instances\/[\w-]+\/start$/) && method === "POST") {
    const id = endpoint.split("/")[3];
    const instance = mockInstances.find(i => i.id === id);
    
    if (!instance) {
      throw new Error("Instance not found");
    }
    
    if (instance.status === "running") {
      return { message: "Instance already running" } as unknown as T;
    }
    
    // In a real backend, we would start the instance
    return { message: "Instance started successfully", status: "running" } as unknown as T;
  }
  
  // POST /compute/instances/:id/stop - Stop an instance
  if (endpoint.match(/\/compute\/instances\/[\w-]+\/stop$/) && method === "POST") {
    const id = endpoint.split("/")[3];
    const instance = mockInstances.find(i => i.id === id);
    
    if (!instance) {
      throw new Error("Instance not found");
    }
    
    if (instance.status === "stopped") {
      return { message: "Instance already stopped" } as unknown as T;
    }
    
    // In a real backend, we would stop the instance
    return { message: "Instance stopped successfully", status: "stopped" } as unknown as T;
  }
  
  // POST /compute/instances/:id/restart - Restart an instance
  if (endpoint.match(/\/compute\/instances\/[\w-]+\/restart$/) && method === "POST") {
    const id = endpoint.split("/")[3];
    const instance = mockInstances.find(i => i.id === id);
    
    if (!instance) {
      throw new Error("Instance not found");
    }
    
    // In a real backend, we would restart the instance
    return { message: "Instance restarted successfully", status: "running" } as unknown as T;
  }
  
  throw new Error(`Unhandled compute mock endpoint: ${endpoint} with method ${method}`);
}
