
/**
 * Service for settings-related functionality
 */
import { fetchApi } from "./api";
import { UserProfile, BillingInfo, NotificationSettings } from "@/types/settings";

// Profile
export async function getUserProfile(): Promise<UserProfile> {
  return fetchApi<UserProfile>("/settings/profile");
}

export async function updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
  return fetchApi<UserProfile>("/settings/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}

// Billing
export async function getBillingInfo(): Promise<BillingInfo> {
  return fetchApi<BillingInfo>("/settings/billing");
}

export async function updateBillingInfo(billing: Partial<BillingInfo>): Promise<BillingInfo> {
  return fetchApi<BillingInfo>("/settings/billing", {
    method: "PUT",
    body: JSON.stringify(billing),
  });
}

export async function addPaymentMethod(paymentMethod: {
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  brand: string;
}): Promise<any> {
  return fetchApi<any>("/settings/billing/payment-methods", {
    method: "POST",
    body: JSON.stringify(paymentMethod),
  });
}

// Notifications
export async function getNotificationSettings(): Promise<NotificationSettings> {
  return fetchApi<NotificationSettings>("/settings/notifications");
}

export async function updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
  return fetchApi<NotificationSettings>("/settings/notifications", {
    method: "PUT",
    body: JSON.stringify(settings),
  });
}

// API Usage
export async function getApiUsage(): Promise<any> {
  return fetchApi<any>("/settings/api-usage");
}
