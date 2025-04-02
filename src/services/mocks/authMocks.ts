
/**
 * Mock data and handlers for authentication endpoints
 */
import { AuthUser, LoginCredentials, RegisterCredentials } from "@/types/auth";

// Mock user
const mockUser: AuthUser = {
  id: "user-01",
  email: "john.doe@example.com",
  name: "John Doe",
  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  provider: "email",
  emailVerified: true,
};

// Mock authentication handlers
export async function handleAuthMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // Login
  if (endpoint === "/auth/login" && method === "POST") {
    const credentials = body as LoginCredentials;
    
    // Simulate successful login with valid credentials
    if (credentials.email === "john.doe@example.com" && credentials.password === "password") {
      return {
        user: mockUser,
        token: "mock-jwt-token-xyz",
      } as unknown as T;
    }
    
    throw new Error("Invalid credentials");
  }
  
  // Register
  if (endpoint === "/auth/register" && method === "POST") {
    const credentials = body as RegisterCredentials;
    
    // Simulate successful registration
    return {
      user: {
        ...mockUser,
        id: `user-${Math.floor(Math.random() * 1000)}`,
        email: credentials.email,
        name: credentials.name,
        emailVerified: false,
      },
      token: "mock-jwt-token-xyz",
    } as unknown as T;
  }
  
  // Logout
  if (endpoint === "/auth/logout" && method === "POST") {
    return { success: true } as unknown as T;
  }
  
  // Get current user
  if (endpoint === "/auth/me" && method === "GET") {
    return mockUser as unknown as T;
  }
  
  // Social logins
  if (endpoint === "/auth/google" && method === "GET") {
    return { redirectUrl: "https://accounts.google.com/o/oauth2/v2/auth?mock=true" } as unknown as T;
  }
  
  if (endpoint === "/auth/microsoft" && method === "GET") {
    return { redirectUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?mock=true" } as unknown as T;
  }
  
  // Password reset
  if (endpoint === "/auth/reset-password" && method === "POST") {
    return { success: true } as unknown as T;
  }
  
  if (endpoint === "/auth/new-password" && method === "POST") {
    return { success: true } as unknown as T;
  }
  
  // Email verification
  if (endpoint.startsWith("/auth/verify-email/") && method === "GET") {
    return { success: true } as unknown as T;
  }
  
  throw new Error(`Unhandled auth mock endpoint: ${endpoint} with method ${method}`);
}
