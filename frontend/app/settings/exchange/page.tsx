"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";

export default function ExchangeSettingsPage() {
  const router = useRouter();
  const [exchangeName, setExchangeName] = useState("binance");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    async function loadStatus() {
      try {
        const res = await api.getExchangeStatus();
        setStatus(res.message);
        if (res.exchange_name) setExchangeName(res.exchange_name);
      } catch {
        setStatus("No exchange connected yet.");
      }
    }

    loadStatus();
  }, [router]);

  async function handleConnect(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.connectExchange({
        exchange_name: exchangeName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
      setStatus(res.message);
      setApiKey("");
      setApiSecret("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect exchange");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Exchange Connection</h1>
      <form onSubmit={handleConnect} className="card space-y-4">
        <div>
          <label className="mb-1 block text-sm">Exchange Name</label>
          <input className="input" value={exchangeName} onChange={(e) => setExchangeName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm">API Key</label>
          <input className="input" value={apiKey} onChange={(e) => setApiKey(e.target.value)} required />
        </div>
        <div>
          <label className="mb-1 block text-sm">API Secret</label>
          <input className="input" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} required />
        </div>

        <button className="btn-primary" disabled={loading}>
          {loading ? "Connecting..." : "Connect"}
        </button>

        {status ? <p className="text-emerald-300">Status: {status}</p> : null}
        {error ? <p className="text-rose-400">{error}</p> : null}
      </form>
    </section>
  );
}
