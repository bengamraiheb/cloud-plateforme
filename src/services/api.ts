
/**
 * API utilities and configuration
 */
import { toast } from "@/hooks/use-toast";

// Base configuration for API calls
const API_BASE_URL = "/api"; // This would be replaced with a real API URL in production

// Helper for handling API responses
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
    toast({
      title: "API Error",
      description: errorMessage,
      variant: "destructive",
    });
    throw new Error(errorMessage);
  }
  
  return response.json();
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Fetching from: ${url}`);
    
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // In a real app, we would add authentication headers here
      },
    };
    
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });
    
    return handleApiResponse<T>(response);
  } catch (error) {
    console.error("API fetch error:", error);
    
    // For now, we'll mock the API behavior
    if (import.meta.env.DEV) {
      console.log("Using mock data in development");
      return mockApiResponse<T>(endpoint, options);
    }
    
    toast({
      title: "Connection Error",
      description: "Failed to connect to the API. Please check your network connection and try again.",
      variant: "destructive",
    });
    
    throw error;
  }
}

// Mock API response for development
async function mockApiResponse<T>(endpoint: string, options: RequestInit): Promise<T> {
  // Extract the method and body from options
  const method = options.method || "GET";
  const body = options.body ? JSON.parse(options.body as string) : undefined;
  
  // Process based on endpoint and method
  if (endpoint.startsWith("/compute")) {
    return import("./mocks/computeMocks").then(m => m.handleComputeMock<T>(endpoint, method, body));
  } else if (endpoint.startsWith("/storage")) {
    return import("./mocks/storageMocks").then(m => m.handleStorageMock<T>(endpoint, method, body));
  } else if (endpoint.startsWith("/networking")) {
    return import("./mocks/networkingMocks").then(m => m.handleNetworkingMock<T>(endpoint, method, body));
  } else if (endpoint.startsWith("/users")) {
    return import("./mocks/usersMocks").then(m => m.handleUsersMock<T>(endpoint, method, body));
  } else if (endpoint.startsWith("/security")) {
    return import("./mocks/securityMocks").then(m => m.handleSecurityMock<T>(endpoint, method, body));
  } else if (endpoint.startsWith("/settings")) {
    return import("./mocks/settingsMocks").then(m => m.handleSettingsMock<T>(endpoint, method, body));
  } else if (endpoint.startsWith("/dashboard")) {
    return import("./mocks/dashboardMocks").then(m => m.handleDashboardMock<T>(endpoint, method, body));
  } else if (endpoint.startsWith("/auth")) {
    return import("./mocks/authMocks").then(m => m.handleAuthMock<T>(endpoint, method, body));
  }
  
  throw new Error(`Unhandled mock endpoint: ${endpoint}`);
}
