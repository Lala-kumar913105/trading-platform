export type TradingMode = "PAPER" | "REAL";

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Wallet {
  balance: string;
  currency: string;
}

export interface Trade {
  id: number;
  mode: TradingMode;
  symbol: string;
  side: "BUY" | "SELL";
  quantity: string;
  price: string;
  status: string;
  pnl: string;
  created_at: string;
}

export interface ExchangeStatus {
  exchange_name: string | null;
  is_active: boolean;
  message: string;
}
