
/**
 * Types for authentication
 */

export type AuthProvider = "email" | "google" | "microsoft";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  provider: AuthProvider;
  emailVerified: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  name: string;
};

export type ResetPasswordData = {
  email: string;
};

export type NewPasswordData = {
  password: string;
  token: string;
};

export type PaymentMethod = "paypal" | "credit_card";

export type PaymentInfo = {
  id: string;
  method: PaymentMethod;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
};
