
/**
 * Mock data and handlers for settings endpoints
 */
import { UserProfile, BillingInfo, NotificationSettings } from "@/types/settings";

// Mock user profile
const mockUserProfile: UserProfile = {
  id: "profile-01",
  name: "John Doe",
  email: "john.doe@example.com",
  company: "Acme, Inc.",
  phoneNumber: "+1 (555) 123-4567",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "USA",
  },
  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  created: "2023-05-10",
};

// Mock billing info
const mockBillingInfo: BillingInfo = {
  id: "billing-01",
  plan: "Business",
  paymentMethod: "Credit Card",
  cardInfo: {
    lastFour: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    brand: "Visa",
  },
  billingAddress: {
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "USA",
  },
  billingEmail: "billing@acme.com",
  autoRenew: true,
  currentPeriod: {
    start: "2023-10-01",
    end: "2023-10-31",
  },
};

// Mock notification settings
const mockNotificationSettings: NotificationSettings = {
  id: "notif-01",
  email: {
    securityAlerts: true,
    usageReports: true,
    productUpdates: false,
    maintenanceAlerts: true,
    billingAlerts: true,
  },
  push: {
    securityAlerts: true,
    usageReports: false,
    productUpdates: false,
    maintenanceAlerts: true,
    billingAlerts: true,
  },
  sms: {
    securityAlerts: true,
    usageReports: false,
    productUpdates: false,
    maintenanceAlerts: false,
    billingAlerts: true,
  },
};

// Mock API usage
const mockApiUsage = {
  totalRequests: 12587,
  period: "This Month",
  limits: {
    daily: { limit: 5000, used: 876 },
    monthly: { limit: 150000, used: 12587 },
  },
  services: [
    { name: "Compute API", requests: 4210 },
    { name: "Storage API", requests: 5812 },
    { name: "Networking API", requests: 1842 },
    { name: "Security API", requests: 723 },
  ],
  trend: [
    { date: "2023-10-01", requests: 342 },
    { date: "2023-10-02", requests: 389 },
    { date: "2023-10-03", requests: 401 },
    { date: "2023-10-04", requests: 395 },
    { date: "2023-10-05", requests: 410 },
    { date: "2023-10-06", requests: 487 },
    { date: "2023-10-07", requests: 392 },
    { date: "2023-10-08", requests: 325 },
    { date: "2023-10-09", requests: 401 },
    { date: "2023-10-10", requests: 452 },
    { date: "2023-10-11", requests: 489 },
    { date: "2023-10-12", requests: 523 },
    { date: "2023-10-13", requests: 456 },
    { date: "2023-10-14", requests: 345 },
    { date: "2023-10-15", requests: 398 },
    { date: "2023-10-16", requests: 427 },
    { date: "2023-10-17", requests: 452 },
    { date: "2023-10-18", requests: 476 },
    { date: "2023-10-19", requests: 489 },
    { date: "2023-10-20", requests: 538 },
  ],
};

export async function handleSettingsMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // Profile
  
  // GET /settings/profile - Get user profile
  if (endpoint === "/settings/profile" && method === "GET") {
    return mockUserProfile as unknown as T;
  }
  
  // PUT /settings/profile - Update user profile
  if (endpoint === "/settings/profile" && method === "PUT") {
    const updatedProfile = {
      ...mockUserProfile,
      ...body,
    };
    
    return updatedProfile as unknown as T;
  }
  
  // Billing
  
  // GET /settings/billing - Get billing info
  if (endpoint === "/settings/billing" && method === "GET") {
    return mockBillingInfo as unknown as T;
  }
  
  // PUT /settings/billing - Update billing info
  if (endpoint === "/settings/billing" && method === "PUT") {
    const updatedBilling = {
      ...mockBillingInfo,
      ...body,
    };
    
    return updatedBilling as unknown as T;
  }
  
  // POST /settings/billing/payment-methods - Add a new payment method
  if (endpoint === "/settings/billing/payment-methods" && method === "POST") {
    // In a real implementation, this would process a new payment method
    return {
      id: `payment-${Math.floor(Math.random() * 1000)}`,
      lastFour: body.lastFour || "1234",
      expiryMonth: body.expiryMonth || 12,
      expiryYear: body.expiryYear || 2025,
      brand: body.brand || "Visa",
    } as unknown as T;
  }
  
  // Notifications
  
  // GET /settings/notifications - Get notification settings
  if (endpoint === "/settings/notifications" && method === "GET") {
    return mockNotificationSettings as unknown as T;
  }
  
  // PUT /settings/notifications - Update notification settings
  if (endpoint === "/settings/notifications" && method === "PUT") {
    const updatedNotifications = {
      ...mockNotificationSettings,
      ...body,
    };
    
    return updatedNotifications as unknown as T;
  }
  
  // API Usage
  
  // GET /settings/api-usage - Get API usage statistics
  if (endpoint === "/settings/api-usage" && method === "GET") {
    return mockApiUsage as unknown as T;
  }
  
  throw new Error(`Unhandled settings mock endpoint: ${endpoint} with method ${method}`);
}
