"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { setAuthToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.login({ email, password });
      setAuthToken(res.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md">
      <form onSubmit={handleLogin} className="card space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="mb-1 block text-sm">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
