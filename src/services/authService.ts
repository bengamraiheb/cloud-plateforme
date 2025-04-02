
/**
 * Service for authentication-related functionality
 */
import { fetchApi } from "./api";
import { AuthUser, LoginCredentials, RegisterCredentials, ResetPasswordData, NewPasswordData } from "@/types/auth";

// Authentication
export async function login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
  return fetchApi<{ user: AuthUser; token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function register(credentials: RegisterCredentials): Promise<{ user: AuthUser; token: string }> {
  return fetchApi<{ user: AuthUser; token: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function logout(): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>("/auth/logout", {
    method: "POST",
  });
}

export async function getCurrentUser(): Promise<AuthUser> {
  return fetchApi<AuthUser>("/auth/me");
}

export async function googleLogin(): Promise<{ redirectUrl: string }> {
  return fetchApi<{ redirectUrl: string }>("/auth/google", {
    method: "GET",
  });
}

export async function microsoftLogin(): Promise<{ redirectUrl: string }> {
  return fetchApi<{ redirectUrl: string }>("/auth/microsoft", {
    method: "GET",
  });
}

export async function resetPassword(data: ResetPasswordData): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function setNewPassword(data: NewPasswordData): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>("/auth/new-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyEmail(token: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/auth/verify-email/${token}`, {
    method: "GET",
  });
}
