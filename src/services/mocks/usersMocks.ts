
/**
 * Mock data and handlers for users endpoints
 */
import { User, Role, Permission } from "@/types/users";

// Mock users
const mockUsers: User[] = [
  {
    id: "user-01",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    created: "2023-05-10",
    lastLogin: "2023-10-20",
  },
  {
    id: "user-02",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "developer",
    status: "active",
    created: "2023-06-15",
    lastLogin: "2023-10-19",
  },
  {
    id: "user-03",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "viewer",
    status: "inactive",
    created: "2023-07-22",
    lastLogin: "2023-09-30",
  },
  {
    id: "user-04",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "developer",
    status: "active",
    created: "2023-08-05",
    lastLogin: "2023-10-18",
  },
];

// Mock roles
const mockRoles: Role[] = [
  {
    id: "role-01",
    name: "admin",
    description: "Full access to all resources",
    permissions: ["create", "read", "update", "delete", "manage_users", "manage_billing"],
    userCount: 1,
    created: "2023-01-01",
  },
  {
    id: "role-02",
    name: "developer",
    description: "Manage compute and storage resources",
    permissions: ["create", "read", "update", "delete"],
    userCount: 2,
    created: "2023-01-01",
  },
  {
    id: "role-03",
    name: "viewer",
    description: "Read-only access to resources",
    permissions: ["read"],
    userCount: 1,
    created: "2023-01-01",
  },
];

// Mock permissions
const mockPermissions: Permission[] = [
  { id: "perm-01", name: "create", description: "Create resources" },
  { id: "perm-02", name: "read", description: "Read resources" },
  { id: "perm-03", name: "update", description: "Update resources" },
  { id: "perm-04", name: "delete", description: "Delete resources" },
  { id: "perm-05", name: "manage_users", description: "Manage users and roles" },
  { id: "perm-06", name: "manage_billing", description: "Manage billing and payments" },
];

export async function handleUsersMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // Users
  
  // GET /users - List all users
  if (endpoint === "/users" && method === "GET") {
    return mockUsers as unknown as T;
  }
  
  // GET /users/:id - Get user details
  if (endpoint.match(/\/users\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user as unknown as T;
  }
  
  // POST /users - Create a new user
  if (endpoint === "/users" && method === "POST") {
    const newUser: User = {
      id: `user-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      email: body.email,
      role: body.role,
      status: "inactive", // New users are inactive until they set a password
      created: new Date().toISOString().split("T")[0],
      lastLogin: null,
    };
    
    return newUser as unknown as T;
  }
  
  // PUT /users/:id - Update a user
  if (endpoint.match(/\/users\/[\w-]+$/) && method === "PUT") {
    const id = endpoint.split("/").pop();
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
    };
    
    return updatedUser as unknown as T;
  }
  
  // DELETE /users/:id - Delete a user
  if (endpoint.match(/\/users\/[\w-]+$/) && method === "DELETE") {
    const id = endpoint.split("/").pop();
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    return { success: true } as unknown as T;
  }
  
  // Roles
  
  // GET /users/roles - List all roles
  if (endpoint === "/users/roles" && method === "GET") {
    return mockRoles as unknown as T;
  }
  
  // GET /users/roles/:id - Get role details
  if (endpoint.match(/\/users\/roles\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const role = mockRoles.find(r => r.id === id);
    
    if (!role) {
      throw new Error("Role not found");
    }
    
    return role as unknown as T;
  }
  
  // POST /users/roles - Create a new role
  if (endpoint === "/users/roles" && method === "POST") {
    const newRole: Role = {
      id: `role-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      description: body.description,
      permissions: body.permissions || [],
      userCount: 0,
      created: new Date().toISOString().split("T")[0],
    };
    
    return newRole as unknown as T;
  }
  
  // PUT /users/roles/:id - Update a role
  if (endpoint.match(/\/users\/roles\/[\w-]+$/) && method === "PUT") {
    const id = endpoint.split("/").pop();
    const roleIndex = mockRoles.findIndex(r => r.id === id);
    
    if (roleIndex === -1) {
      throw new Error("Role not found");
    }
    
    const updatedRole = {
      ...mockRoles[roleIndex],
      ...body,
    };
    
    return updatedRole as unknown as T;
  }
  
  // DELETE /users/roles/:id - Delete a role
  if (endpoint.match(/\/users\/roles\/[\w-]+$/) && method === "DELETE") {
    const id = endpoint.split("/").pop();
    const roleIndex = mockRoles.findIndex(r => r.id === id);
    
    if (roleIndex === -1) {
      throw new Error("Role not found");
    }
    
    // Check if the role has any users
    const usersWithRole = mockUsers.filter(u => u.role === mockRoles[roleIndex].name);
    if (usersWithRole.length > 0) {
      throw new Error("Cannot delete role: it has active users");
    }
    
    return { success: true } as unknown as T;
  }
  
  // Permissions
  
  // GET /users/permissions - List all permissions
  if (endpoint === "/users/permissions" && method === "GET") {
    return mockPermissions as unknown as T;
  }
  
  throw new Error(`Unhandled users mock endpoint: ${endpoint} with method ${method}`);
}
