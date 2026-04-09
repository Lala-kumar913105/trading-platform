import type { Trade } from "@/lib/types";

interface TradeHistoryTableProps {
  trades: Trade[];
}

export default function TradeHistoryTable({ trades }: TradeHistoryTableProps) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400">
            <th className="py-2">Time</th>
            <th className="py-2">Mode</th>
            <th className="py-2">Symbol</th>
            <th className="py-2">Side</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Price</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="border-b border-slate-900">
              <td className="py-2 text-slate-300">{new Date(trade.created_at).toLocaleString()}</td>
              <td className="py-2">
                <span className="rounded-full bg-slate-800 px-2 py-1 text-xs">{trade.mode}</span>
              </td>
              <td className="py-2">{trade.symbol}</td>
              <td className={`py-2 ${trade.side === "BUY" ? "text-emerald-400" : "text-rose-400"}`}>{trade.side}</td>
              <td className="py-2">{trade.quantity}</td>
              <td className="py-2">{trade.price}</td>
              <td className="py-2">{trade.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {trades.length === 0 ? <p className="py-4 text-center text-slate-500">No trades yet.</p> : null}
    </div>
  );
}
