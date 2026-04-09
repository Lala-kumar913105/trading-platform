"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TradeHistoryTable from "@/components/TradeHistoryTable";
import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import type { Trade } from "@/lib/types";

export default function HistoryPage() {
  const router = useRouter();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    async function load() {
      try {
        const [paper, real] = await Promise.all([api.getPaperHistory(), api.getRealHistory()]);
        setTrades([...paper, ...real].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load history");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (loading) return <p className="text-slate-300">Loading history...</p>;
  if (error) return <p className="text-rose-400">{error}</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Trade History</h1>
      <TradeHistoryTable trades={trades} />
    </section>
  );
}
