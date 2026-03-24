'use client';

import { useEffect, useState } from 'react';
import { CouponCard } from '@/components/coupons/coupon-card';
import { EmptyState } from '@/components/states/empty-state';

export default function CouponsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function search() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/coupons/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok) {
        setItems([]);
        setError(data?.message || 'Unable to load coupons right now.');
        return;
      }

      setItems(Array.isArray(data?.coupons) ? data.coupons : []);
    } catch {
      setItems([]);
      setError('Unable to reach the coupons service. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="space-y-4 pb-20">
      <h1 className="text-2xl font-bold">Browse verified coupons</h1>
      <div className="card flex flex-wrap gap-2 p-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by brand, category, keyword"
          className="min-w-[240px] flex-1 rounded-xl border p-2"
        />
        <button onClick={search} className="rounded-xl bg-brand-600 px-4 text-white" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error ? (
        <EmptyState title="Could not load coupons" body={error} />
      ) : loading ? (
        <EmptyState title="Loading coupons..." body="Fetching latest verified coupons." />
      ) : items.length === 0 ? (
        <EmptyState
          title={q ? 'No coupons found' : 'No verified coupons available yet'}
          body={q ? 'Try another search or filter.' : 'Please check back later for newly verified coupons.'}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">{items.map((c) => <CouponCard key={c._id} coupon={c} />)}</div>
      )}
    </div>
  );
}
