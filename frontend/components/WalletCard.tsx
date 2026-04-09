interface WalletCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export default function WalletCard({ title, value, subtitle }: WalletCardProps) {
  return (
    <div className="card">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
