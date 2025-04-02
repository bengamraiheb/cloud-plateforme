
/**
 * Service for security-related functionality
 */
import { fetchApi } from "./api";
import { SecurityAlert, SecurityPolicy, AccessKey } from "@/types/security";

// Alerts
export async function getSecurityAlerts(): Promise<SecurityAlert[]> {
  return fetchApi<SecurityAlert[]>("/security/alerts");
}

export async function getSecurityAlert(id: string): Promise<SecurityAlert> {
  return fetchApi<SecurityAlert>(`/security/alerts/${id}`);
}

export async function updateSecurityAlert(id: string, alert: Partial<SecurityAlert>): Promise<SecurityAlert> {
  return fetchApi<SecurityAlert>(`/security/alerts/${id}`, {
    method: "PUT",
    body: JSON.stringify(alert),
  });
}

// Policies
export async function getSecurityPolicies(): Promise<SecurityPolicy[]> {
  return fetchApi<SecurityPolicy[]>("/security/policies");
}

export async function getSecurityPolicy(id: string): Promise<SecurityPolicy> {
  return fetchApi<SecurityPolicy>(`/security/policies/${id}`);
}

export async function createSecurityPolicy(policy: Omit<SecurityPolicy, "id" | "created" | "lastUpdated">): Promise<SecurityPolicy> {
  return fetchApi<SecurityPolicy>("/security/policies", {
    method: "POST",
    body: JSON.stringify(policy),
  });
}

export async function updateSecurityPolicy(id: string, policy: Partial<SecurityPolicy>): Promise<SecurityPolicy> {
  return fetchApi<SecurityPolicy>(`/security/policies/${id}`, {
    method: "PUT",
    body: JSON.stringify(policy),
  });
}

export async function deleteSecurityPolicy(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/security/policies/${id}`, {
    method: "DELETE",
  });
}

// Access Keys
export async function getAccessKeys(): Promise<AccessKey[]> {
  return fetchApi<AccessKey[]>("/security/access-keys");
}

export async function getAccessKey(id: string): Promise<AccessKey> {
  return fetchApi<AccessKey>(`/security/access-keys/${id}`);
}

export async function createAccessKey(key: { name: string; createdBy: string }): Promise<{ key: AccessKey; secretValue: string }> {
  return fetchApi<{ key: AccessKey; secretValue: string }>("/security/access-keys", {
    method: "POST",
    body: JSON.stringify(key),
  });
}

export async function updateAccessKey(id: string, key: Partial<AccessKey>): Promise<AccessKey> {
  return fetchApi<AccessKey>(`/security/access-keys/${id}`, {
    method: "PUT",
    body: JSON.stringify(key),
  });
}

export async function deleteAccessKey(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/security/access-keys/${id}`, {
    method: "DELETE",
  });
}
