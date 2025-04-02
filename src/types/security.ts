
/**
 * Types for security resources
 */

export type SecurityAlert = {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  resource: string;
  timestamp: string;
  status: "open" | "investigating" | "resolved" | "dismissed";
};

export type SecurityPolicy = {
  id: string;
  name: string;
  description: string;
  status: "enabled" | "disabled";
  appliedTo: string;
  created: string;
  lastUpdated: string;
  settings: Record<string, any>;
};

export type AccessKey = {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string | null;
  createdBy: string;
  status: "active" | "inactive" | "revoked";
};
