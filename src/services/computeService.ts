
/**
 * Service for compute-related functionality
 */
import { fetchApi } from "./api";
import { ComputeInstance, InstanceType, Region } from "@/types/compute";

export async function getComputeInstances(): Promise<ComputeInstance[]> {
  return fetchApi<ComputeInstance[]>("/compute/instances");
}

export async function getComputeInstance(id: string): Promise<ComputeInstance> {
  return fetchApi<ComputeInstance>(`/compute/instances/${id}`);
}

export async function createComputeInstance(instance: Omit<ComputeInstance, "id" | "status" | "created">): Promise<ComputeInstance> {
  return fetchApi<ComputeInstance>("/compute/instances", {
    method: "POST",
    body: JSON.stringify(instance),
  });
}

export async function updateComputeInstance(id: string, instance: Partial<ComputeInstance>): Promise<ComputeInstance> {
  return fetchApi<ComputeInstance>(`/compute/instances/${id}`, {
    method: "PUT",
    body: JSON.stringify(instance),
  });
}

export async function deleteComputeInstance(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/compute/instances/${id}`, {
    method: "DELETE",
  });
}

export async function startComputeInstance(id: string): Promise<{ message: string; status: string }> {
  return fetchApi<{ message: string; status: string }>(`/compute/instances/${id}/start`, {
    method: "POST",
  });
}

export async function stopComputeInstance(id: string): Promise<{ message: string; status: string }> {
  return fetchApi<{ message: string; status: string }>(`/compute/instances/${id}/stop`, {
    method: "POST",
  });
}

export async function restartComputeInstance(id: string): Promise<{ message: string; status: string }> {
  return fetchApi<{ message: string; status: string }>(`/compute/instances/${id}/restart`, {
    method: "POST",
  });
}

export async function getInstanceTypes(): Promise<InstanceType[]> {
  return fetchApi<InstanceType[]>("/compute/instance-types");
}

export async function getRegions(): Promise<Region[]> {
  return fetchApi<Region[]>("/compute/regions");
}
