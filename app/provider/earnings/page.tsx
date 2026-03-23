'use client';
import { useEffect, useState } from 'react';

export default function ProviderEarningsPage() {
  const [data, setData] = useState<any>({});
  useEffect(() => { fetch('/api/rewards/wallet').then((r) => r.json()).then(setData); }, []);

  async function requestWithdrawal() {
    await fetch('/api/rewards/withdrawals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: 50 }) });
    alert('Withdrawal request submitted');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Wallet & earnings</h1>
      <div className="card p-4"><p className="text-sm text-slate-600">Available balance</p><p className="text-3xl font-bold">${data.wallet?.balance ?? 0}</p><button onClick={requestWithdrawal} className="mt-3 rounded-xl bg-brand-600 px-4 py-2 text-white">Request withdrawal</button></div>
      <div className="card p-4"><h2 className="font-semibold">Earnings history</h2><ul className="mt-2 space-y-2 text-sm">{(data.transactions || []).map((t: any) => <li key={t._id}>{t.type} · ${t.amount} · {t.status}</li>)}</ul></div>
    </div>
  );
}
