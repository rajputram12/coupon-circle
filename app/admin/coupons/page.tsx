'use client';
import { useEffect, useState } from 'react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const load = () => fetch('/api/coupons').then((r) => r.json()).then((d) => setCoupons(d.coupons || []));
  useEffect(() => { load(); }, []);

  async function review(couponId: string, decision: 'approve' | 'reject') {
    await fetch('/api/coupons/approve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ couponId, decision }) });
    load();
  }

  return (
    <div className="card overflow-x-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Manage coupons</h1>
      <table className="w-full text-sm"><thead><tr><th className="text-left">Title</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{coupons.map((c) => <tr key={c._id} className="border-t"><td>{c.title}</td><td>{c.status}</td><td className="space-x-2"><button onClick={() => review(c._id, 'approve')} className="rounded-lg bg-green-600 px-2 py-1 text-white">Approve</button><button onClick={() => review(c._id, 'reject')} className="rounded-lg border px-2 py-1">Reject</button></td></tr>)}</tbody></table>
    </div>
  );
}
