"use client";

import { useState } from "react";

import type { TradingMode } from "@/lib/types";

interface TradeFormProps {
  mode: TradingMode;
  onSubmit: (payload: { symbol: string; quantity: number; price: number; side: "BUY" | "SELL" }) => Promise<void>;
  loading: boolean;
}

export default function TradeForm({ mode, onSubmit, loading }: TradeFormProps) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [quantity, setQuantity] = useState("0.01");
  const [price, setPrice] = useState("30000");

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Place {mode} Trade</h2>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Symbol</label>
        <input className="input" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Quantity</label>
        <input className="input" type="number" step="0.0001" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Price</label>
        <input className="input" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div className="flex gap-3">
        <button
          disabled={loading}
          onClick={() => onSubmit({ symbol, quantity: Number(quantity), price: Number(price), side: "BUY" })}
          className="btn-primary flex-1"
        >
          {loading ? "Processing..." : "Buy"}
        </button>
        <button
          disabled={loading}
          onClick={() => onSubmit({ symbol, quantity: Number(quantity), price: Number(price), side: "SELL" })}
          className="btn-secondary flex-1"
        >
          {loading ? "Processing..." : "Sell"}
        </button>
      </div>
    </div>
  );
}
