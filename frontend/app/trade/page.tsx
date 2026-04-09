"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ModeToggle from "@/components/ModeToggle";
import TradeForm from "@/components/TradeForm";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import type { TradingMode } from "@/lib/types";

export default function TradePage() {
  const router = useRouter();
  const [mode, setMode] = useState<TradingMode>("PAPER");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    setMode((localStorage.getItem("tp_mode") as TradingMode) || "PAPER");
  }, [router]);

  function handleModeChange(newMode: TradingMode) {
    setMode(newMode);
    localStorage.setItem("tp_mode", newMode);
  }

  async function handleTrade(payload: { symbol: string; quantity: number; price: number; side: "BUY" | "SELL" }) {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "PAPER") {
        const res = payload.side === "BUY" ? await api.placePaperBuy(payload) : await api.placePaperSell(payload);
        setMessage(`${res.message}. New balance: ${res.updated_balance} USDT`);
      } else {
        const res = payload.side === "BUY" ? await api.placeRealBuy(payload) : await api.placeRealSell(payload);
        setMessage(res.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Trade failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Trade</h1>
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TradeForm mode={mode} onSubmit={handleTrade} loading={loading} />

        <div className="card">
          <h2 className="mb-4 text-xl font-semibold">Chart</h2>
          <div className="h-[420px] overflow-hidden rounded-lg border border-slate-700">
            <iframe
              title="TradingView Widget"
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=BINANCE:BTCUSDT&interval=15&theme=dark&style=1&locale=en&toolbarbg=f1f3f6&hide_top_toolbar=false&hide_legend=false&save_image=false&studies=[]&show_popup_button=true"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      {message ? <p className="rounded-md bg-emerald-900/50 p-3 text-emerald-300">{message}</p> : null}
      {error ? <p className="rounded-md bg-rose-900/50 p-3 text-rose-300">{error}</p> : null}
    </section>
  );
}
