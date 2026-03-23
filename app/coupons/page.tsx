'use client';
import { useEffect, useState } from 'react';
import { CouponCard } from '@/components/coupons/coupon-card';
import { EmptyState } from '@/components/states/empty-state';

export default function CouponsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState('');

  async function search() {
    const res = await fetch(`/api/coupons/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setItems(data.coupons || []);
  }

  useEffect(() => { search(); }, []);

  return (
    <div className="space-y-4 pb-20">
      <h1 className="text-2xl font-bold">Browse verified coupons</h1>
      <div className="card flex flex-wrap gap-2 p-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by brand, category, keyword" className="min-w-[240px] flex-1 rounded-xl border p-2" />
        <button onClick={search} className="rounded-xl bg-brand-600 px-4 text-white">Search</button>
      </div>
      {items.length === 0 ? <EmptyState title="No coupons found" body="Try another search or filter." /> : <div className="grid gap-4 md:grid-cols-3">{items.map((c) => <CouponCard key={c._id} coupon={c} />)}</div>}
    </div>
  );
}
