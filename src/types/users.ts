
/**
 * Types for users and access control
 */

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  created: string;
  lastLogin: string | null;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  created: string;
};

export type Permission = {
  id: string;
  name: string;
  description: string;
};
