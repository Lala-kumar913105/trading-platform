"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import ModeToggle from "@/components/ModeToggle";
import WalletCard from "@/components/WalletCard";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import type { Trade, TradingMode, Wallet } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [mode, setMode] = useState<TradingMode>("PAPER");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    setMode((localStorage.getItem("tp_mode") as TradingMode) || "PAPER");

    async function load() {
      try {
        const [walletRes, paperHistory, realHistory] = await Promise.all([
          api.getPaperWallet(),
          api.getPaperHistory(),
          api.getRealHistory(),
        ]);
        setWallet(walletRes);
        setTrades([...paperHistory, ...realHistory]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  const pnl = useMemo(() => {
    return trades.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0).toFixed(2);
  }, [trades]);

  function handleModeChange(newMode: TradingMode) {
    setMode(newMode);
    localStorage.setItem("tp_mode", newMode);
  }

  if (loading) return <p className="text-slate-300">Loading dashboard...</p>;
  if (error) return <p className="text-rose-400">{error}</p>;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <WalletCard title="Current Mode" value={mode} />
        <WalletCard title="Paper Wallet Balance" value={`${wallet?.balance ?? "0.00"} ${wallet?.currency ?? "USDT"}`} />
        <WalletCard title="Total Trades" value={String(trades.length)} />
        <WalletCard title="PnL Summary" value={`${pnl} USDT`} />
      </div>
    </section>
  );
}
