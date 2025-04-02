
/**
 * Service for user-related functionality
 */
import { fetchApi } from "./api";
import { User, Role, Permission } from "@/types/users";

// Users
export async function getUsers(): Promise<User[]> {
  return fetchApi<User[]>("/users");
}

export async function getUser(id: string): Promise<User> {
  return fetchApi<User>(`/users/${id}`);
}

export async function createUser(user: Omit<User, "id" | "status" | "created" | "lastLogin">): Promise<User> {
  return fetchApi<User>("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function updateUser(id: string, user: Partial<User>): Promise<User> {
  return fetchApi<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export async function deleteUser(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/users/${id}`, {
    method: "DELETE",
  });
}

// Roles
export async function getRoles(): Promise<Role[]> {
  return fetchApi<Role[]>("/users/roles");
}

export async function getRole(id: string): Promise<Role> {
  return fetchApi<Role>(`/users/roles/${id}`);
}

export async function createRole(role: Omit<Role, "id" | "userCount" | "created">): Promise<Role> {
  return fetchApi<Role>("/users/roles", {
    method: "POST",
    body: JSON.stringify(role),
  });
}

export async function updateRole(id: string, role: Partial<Role>): Promise<Role> {
  return fetchApi<Role>(`/users/roles/${id}`, {
    method: "PUT",
    body: JSON.stringify(role),
  });
}

export async function deleteRole(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/users/roles/${id}`, {
    method: "DELETE",
  });
}

// Permissions
export async function getPermissions(): Promise<Permission[]> {
  return fetchApi<Permission[]>("/users/permissions");
}
