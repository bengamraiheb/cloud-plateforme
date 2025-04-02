
/**
 * Types for user settings
 */

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  company: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar: string;
  created: string;
};

export type BillingInfo = {
  id: string;
  plan: string;
  paymentMethod: string;
  cardInfo: {
    lastFour: string;
    expiryMonth: number;
    expiryYear: number;
    brand: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingEmail: string;
  autoRenew: boolean;
  currentPeriod: {
    start: string;
    end: string;
  };
};

export type NotificationSettings = {
  id: string;
  email: {
    securityAlerts: boolean;
    usageReports: boolean;
    productUpdates: boolean;
    maintenanceAlerts: boolean;
    billingAlerts: boolean;
  };
  push: {
    securityAlerts: boolean;
    usageReports: boolean;
    productUpdates: boolean;
    maintenanceAlerts: boolean;
    billingAlerts: boolean;
  };
  sms: {
    securityAlerts: boolean;
    usageReports: boolean;
    productUpdates: boolean;
    maintenanceAlerts: boolean;
    billingAlerts: boolean;
  };
};
