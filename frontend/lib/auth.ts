"use client";

const TOKEN_KEY = "tp_token";

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  const local = localStorage.getItem(TOKEN_KEY);
  if (local) return local;

  const match = document.cookie.match(/(?:^|; )tp_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = "tp_token=; path=/; max-age=0; samesite=lax";
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
