
/**
 * Mock data and handlers for security endpoints
 */
import { SecurityAlert, SecurityPolicy, AccessKey } from "@/types/security";

// Mock security alerts
const mockAlerts: SecurityAlert[] = [
  {
    id: "alert-01",
    title: "Excessive Login Attempts",
    description: "Multiple failed login attempts detected from IP 203.0.113.42",
    severity: "high",
    resource: "Authentication Service",
    timestamp: "2023-10-19T15:23:42Z",
    status: "open",
  },
  {
    id: "alert-02",
    title: "Unusual API Usage",
    description: "Abnormal number of API calls from user-02",
    severity: "medium",
    resource: "API Gateway",
    timestamp: "2023-10-18T09:45:17Z",
    status: "investigating",
  },
  {
    id: "alert-03",
    title: "Exposed Access Key",
    description: "Access key found in public GitHub repository",
    severity: "critical",
    resource: "Access Keys",
    timestamp: "2023-10-17T22:12:05Z",
    status: "resolved",
  },
  {
    id: "alert-04",
    title: "Suspicious Network Traffic",
    description: "Unusual outbound traffic detected from VM web-server-01",
    severity: "medium",
    resource: "vm-01",
    timestamp: "2023-10-16T14:33:28Z",
    status: "open",
  },
];

// Mock security policies
const mockPolicies: SecurityPolicy[] = [
  {
    id: "policy-01",
    name: "Password Policy",
    description: "Enforces strong password requirements",
    status: "enabled",
    appliedTo: "All Users",
    created: "2023-05-10",
    lastUpdated: "2023-08-22",
    settings: {
      minimumLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiration: 90,
      preventReuse: 10,
    },
  },
  {
    id: "policy-02",
    name: "MFA Policy",
    description: "Requires multi-factor authentication for all users",
    status: "enabled",
    appliedTo: "All Users",
    created: "2023-05-12",
    lastUpdated: "2023-08-22",
    settings: {
      required: true,
      allowedMethods: ["app", "sms", "email"],
      graceLoginCount: 0,
    },
  },
  {
    id: "policy-03",
    name: "IP Restriction Policy",
    description: "Restricts access to specific IP ranges",
    status: "enabled",
    appliedTo: "Admin Users",
    created: "2023-06-15",
    lastUpdated: "2023-09-05",
    settings: {
      allowedIpRanges: ["203.0.113.0/24", "198.51.100.0/24"],
      denyUnlistedIps: true,
    },
  },
  {
    id: "policy-04",
    name: "API Rate Limiting",
    description: "Limits the rate of API calls to prevent abuse",
    status: "enabled",
    appliedTo: "All Services",
    created: "2023-07-08",
    lastUpdated: "2023-09-30",
    settings: {
      requestsPerMinute: 100,
      burstAllowance: 20,
      throttleExceeded: true,
    },
  },
];

// Mock access keys
const mockAccessKeys: AccessKey[] = [
  {
    id: "key-01",
    name: "Admin Console Key",
    prefix: "CLDHVN1A",
    created: "2023-09-15",
    lastUsed: "2023-10-20",
    createdBy: "john.doe@example.com",
    status: "active",
  },
  {
    id: "key-02",
    name: "CI/CD Pipeline",
    prefix: "CLDHVN2B",
    created: "2023-08-22",
    lastUsed: "2023-10-20",
    createdBy: "jane.smith@example.com",
    status: "active",
  },
  {
    id: "key-03",
    name: "Test Environment",
    prefix: "CLDHVN3C",
    created: "2023-07-10",
    lastUsed: "2023-09-30",
    createdBy: "bob.johnson@example.com",
    status: "inactive",
  },
];

export async function handleSecurityMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // Alerts
  
  // GET /security/alerts - List all security alerts
  if (endpoint === "/security/alerts" && method === "GET") {
    return mockAlerts as unknown as T;
  }
  
  // GET /security/alerts/:id - Get alert details
  if (endpoint.match(/\/security\/alerts\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const alert = mockAlerts.find(a => a.id === id);
    
    if (!alert) {
      throw new Error("Alert not found");
    }
    
    return alert as unknown as T;
  }
  
  // PUT /security/alerts/:id - Update an alert (e.g., change status)
  if (endpoint.match(/\/security\/alerts\/[\w-]+$/) && method === "PUT") {
    const id = endpoint.split("/").pop();
    const alertIndex = mockAlerts.findIndex(a => a.id === id);
    
    if (alertIndex === -1) {
      throw new Error("Alert not found");
    }
    
    const updatedAlert = {
      ...mockAlerts[alertIndex],
      ...body,
    };
    
    return updatedAlert as unknown as T;
  }
  
  // Policies
  
  // GET /security/policies - List all security policies
  if (endpoint === "/security/policies" && method === "GET") {
    return mockPolicies as unknown as T;
  }
  
  // GET /security/policies/:id - Get policy details
  if (endpoint.match(/\/security\/policies\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const policy = mockPolicies.find(p => p.id === id);
    
    if (!policy) {
      throw new Error("Policy not found");
    }
    
    return policy as unknown as T;
  }
  
  // POST /security/policies - Create a new policy
  if (endpoint === "/security/policies" && method === "POST") {
    const newPolicy: SecurityPolicy = {
      id: `policy-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      description: body.description,
      status: body.status || "disabled",
      appliedTo: body.appliedTo,
      created: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      settings: body.settings || {},
    };
    
    return newPolicy as unknown as T;
  }
  
  // PUT /security/policies/:id - Update a policy
  if (endpoint.match(/\/security\/policies\/[\w-]+$/) && method === "PUT") {
    const id = endpoint.split("/").pop();
    const policyIndex = mockPolicies.findIndex(p => p.id === id);
    
    if (policyIndex === -1) {
      throw new Error("Policy not found");
    }
    
    const updatedPolicy = {
      ...mockPolicies[policyIndex],
      ...body,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    
    return updatedPolicy as unknown as T;
  }
  
  // DELETE /security/policies/:id - Delete a policy
  if (endpoint.match(/\/security\/policies\/[\w-]+$/) && method === "DELETE") {
    const id = endpoint.split("/").pop();
    const policyIndex = mockPolicies.findIndex(p => p.id === id);
    
    if (policyIndex === -1) {
      throw new Error("Policy not found");
    }
    
    return { success: true } as unknown as T;
  }
  
  // Access Keys
  
  // GET /security/access-keys - List all access keys
  if (endpoint === "/security/access-keys" && method === "GET") {
    return mockAccessKeys as unknown as T;
  }
  
  // GET /security/access-keys/:id - Get access key details
  if (endpoint.match(/\/security\/access-keys\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const key = mockAccessKeys.find(k => k.id === id);
    
    if (!key) {
      throw new Error("Access key not found");
    }
    
    return key as unknown as T;
  }
  
  // POST /security/access-keys - Create a new access key
  if (endpoint === "/security/access-keys" && method === "POST") {
    const newKey: AccessKey = {
      id: `key-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      prefix: `CLDHVN${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: null,
      createdBy: body.createdBy,
      status: "active",
    };
    
    // In a real implementation, we would generate the actual key value here
    // and return it one time only to the client
    
    return {
      key: newKey,
      secretValue: "xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // This would be a real key in a real implementation
    } as unknown as T;
  }
  
  // PUT /security/access-keys/:id - Update an access key (e.g., change status)
  if (endpoint.match(/\/security\/access-keys\/[\w-]+$/) && method === "PUT") {
    const id = endpoint.split("/").pop();
    const keyIndex = mockAccessKeys.findIndex(k => k.id === id);
    
    if (keyIndex === -1) {
      throw new Error("Access key not found");
    }
    
    const updatedKey = {
      ...mockAccessKeys[keyIndex],
      ...body,
    };
    
    return updatedKey as unknown as T;
  }
  
  // DELETE /security/access-keys/:id - Delete an access key
  if (endpoint.match(/\/security\/access-keys\/[\w-]+$/) && method === "DELETE") {
    const id = endpoint.split("/").pop();
    const keyIndex = mockAccessKeys.findIndex(k => k.id === id);
    
    if (keyIndex === -1) {
      throw new Error("Access key not found");
    }
    
    return { success: true } as unknown as T;
  }
  
  throw new Error(`Unhandled security mock endpoint: ${endpoint} with method ${method}`);
}
