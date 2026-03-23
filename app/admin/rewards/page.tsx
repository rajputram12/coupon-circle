'use client';
import { useEffect, useState } from 'react';

export default function AdminRewardsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const load = () => fetch('/api/rewards/withdrawals').then((r) => r.json()).then((d) => setRequests(d.requests || []));
  useEffect(() => { load(); }, []);

  async function update(requestId: string, status: string) {
    await fetch('/api/rewards/withdrawals', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId, status }) });
    load();
  }

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-bold">Provider rewards</h1>
      <ul className="mt-4 space-y-2 text-sm">{requests.map((r) => <li key={r._id} className="rounded-xl border p-3">${r.amount} · {r.status} <button onClick={() => update(r._id, 'approved')} className="ml-2 rounded-lg bg-brand-600 px-2 py-1 text-white">Approve</button></li>)}</ul>
    </div>
  );
}
