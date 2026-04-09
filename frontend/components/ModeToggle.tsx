"use client";

import type { TradingMode } from "@/lib/types";

interface ModeToggleProps {
  mode: TradingMode;
  onChange: (mode: TradingMode) => void;
}

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-slate-700 p-1">
      <button
        type="button"
        onClick={() => onChange("PAPER")}
        className={`rounded-md px-4 py-2 text-sm font-medium ${
          mode === "PAPER" ? "bg-brand-600 text-white" : "text-slate-300"
        }`}
      >
        Paper
      </button>
      <button
        type="button"
        onClick={() => onChange("REAL")}
        className={`rounded-md px-4 py-2 text-sm font-medium ${
          mode === "REAL" ? "bg-brand-600 text-white" : "text-slate-300"
        }`}
      >
        Real
      </button>
    </div>
  );
}
