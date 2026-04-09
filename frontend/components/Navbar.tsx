"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { clearAuthToken, isAuthenticated } from "@/lib/auth";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/trade", label: "Trade" },
  { href: "/history", label: "History" },
  { href: "/settings/exchange", label: "Exchange" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = isAuthenticated();

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          Trading Platform
        </Link>

        <div className="flex items-center gap-3">
          {loggedIn &&
            navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  pathname === link.href ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

          {!loggedIn ? (
            <>
              <Link href="/login" className="btn-secondary text-sm">
                Login
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                clearAuthToken();
                router.push("/login");
              }}
              className="btn-secondary text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
