import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Trading Platform",
  description: "Starter trading platform with paper and real trading modes",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
