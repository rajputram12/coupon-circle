'use client';
import { useEffect, useState } from 'react';

export default function AdminSubscriptionsPage() {
  const [plans, setPlans] = useState<any[]>([]);
  useEffect(() => { fetch('/api/subscriptions/plans').then((r) => r.json()).then((d) => setPlans(d.plans || [])); }, []);
  return <div className="card p-6"><h1 className="text-2xl font-bold">Manage subscriptions</h1><ul className="mt-3 text-sm">{plans.map((p) => <li key={p._id}>{p.name} · ${p.priceMonthly}</li>)}</ul></div>;
}
