
/**
 * Types for compute resources
 */

export type ComputeInstance = {
  id: string;
  name: string;
  type: string;
  status: "running" | "stopped" | "provisioning" | "error";
  region: string;
  created: string;
  specs: {
    cpu: number;
    memory: number;
    storage: number;
  };
};

export type InstanceType = {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  storage: number;
  price: number;
};

export type Region = {
  id: string;
  name: string;
};
