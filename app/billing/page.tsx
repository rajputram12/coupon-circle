'use client';
import { useEffect, useState } from 'react';

export default function BillingPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/subscriptions/plans').then((r) => r.json()).then((d) => setPlans(d.plans || []));
    fetch('/api/subscriptions/history').then((r) => r.json()).then((d) => setHistory(d.items || []));
  }, []);

  async function subscribe(planId: string) {
    const res = await fetch('/api/subscriptions/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId }) });
    const data = await res.json();
    if (data.checkoutUrl) location.href = data.checkoutUrl;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>
      <section className="grid gap-4 md:grid-cols-3">{plans.map((p) => <article key={p._id} className="card p-4"><h2 className="font-semibold">{p.name}</h2><p className="text-2xl font-bold">${p.priceMonthly}</p><button onClick={() => subscribe(p._id)} className="mt-2 rounded-xl bg-brand-600 px-3 py-2 text-white">Choose plan</button></article>)}</section>
      <section className="card p-4"><h2 className="font-semibold">Billing history</h2><ul className="mt-2 text-sm">{history.map((h) => <li key={h._id}>{new Date(h.createdAt).toLocaleDateString()} · {h.status} · ${h.amountPaid}</li>)}</ul></section>
      <button onClick={() => fetch('/api/subscriptions/cancel', { method: 'POST' })} className="rounded-xl border px-4 py-2">Cancel subscription</button>
    </div>
  );
}
