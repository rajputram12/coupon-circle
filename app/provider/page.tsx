'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';

export default function ProviderPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  useEffect(() => { fetch('/api/coupons').then((r) => r.json()).then((d) => setCoupons(d.coupons || [])); }, []);

  return (
    <div className="flex gap-6">
      <Sidebar items={[{ href: '/provider', label: 'My coupons' }, { href: '/provider/post-coupon', label: 'Post coupon' }, { href: '/provider/earnings', label: 'Earnings' }]} />
      <div className="flex-1 space-y-4">
        <div className="card p-5">
          <h1 className="text-2xl font-bold">Provider control center</h1>
          <p className="text-sm text-slate-600">Track pending, verified, rejected, and expired coupons.</p>
          <Link href="/provider/post-coupon" className="mt-3 inline-block rounded-xl bg-brand-600 px-4 py-2 text-white">Post new coupon</Link>
        </div>
        <div className="card overflow-x-auto p-4">
          <table className="w-full text-sm"><thead><tr className="text-left"><th>Title</th><th>Status</th><th>Views</th><th>Unlocks</th><th>Reward</th></tr></thead>
            <tbody>{coupons.map((c) => <tr key={c._id} className="border-t"><td>{c.title}</td><td>{c.status}</td><td>{c.viewsCount}</td><td>{c.unlockCount}</td><td>${(c.unlockCount * 0.25 + c.successCount * 0.75).toFixed(2)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
