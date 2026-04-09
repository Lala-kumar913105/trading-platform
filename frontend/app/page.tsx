import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-white">Trading Platform Starter</h1>
      <p className="mx-auto max-w-2xl text-slate-300">
        A beginner-friendly full-stack starter with Paper Trading and Real Trading architecture.
      </p>
      <div className="flex justify-center gap-3">
        <Link href="/signup" className="btn-primary">
          Create Account
        </Link>
        <Link href="/login" className="btn-secondary">
          Login
        </Link>
      </div>
    </section>
  );
}
