"use client";

import { getAuthToken } from "@/lib/auth";
import type { AuthResponse, ExchangeStatus, Trade, Wallet } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.detail || "API request failed");
  }

  return data as T;
}

export const api = {
  signup: (payload: { name: string; email: string; password: string }) =>
    request<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: () => request<{ id: number; name: string; email: string; created_at: string }>("/api/auth/me"),

  getPaperWallet: () => request<Wallet>("/api/wallet/paper"),

  placePaperBuy: (payload: { symbol: string; quantity: number; price: number }) =>
    request<{ message: string; updated_balance: string }>("/api/paper-trade/buy", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  placePaperSell: (payload: { symbol: string; quantity: number; price: number }) =>
    request<{ message: string; updated_balance: string }>("/api/paper-trade/sell", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getPaperHistory: () => request<Trade[]>("/api/paper-trade/history"),

  placeRealBuy: (payload: { symbol: string; quantity: number; price: number }) =>
    request<{ message: string; integration_ready: boolean }>("/api/real-trade/buy", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  placeRealSell: (payload: { symbol: string; quantity: number; price: number }) =>
    request<{ message: string; integration_ready: boolean }>("/api/real-trade/sell", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getRealHistory: () => request<Trade[]>("/api/real-trade/history"),

  connectExchange: (payload: { exchange_name: string; api_key: string; api_secret: string }) =>
    request<ExchangeStatus>("/api/exchange/connect", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getExchangeStatus: () => request<ExchangeStatus>("/api/exchange/status"),
};
