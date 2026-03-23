'use client';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { fetch('/api/admin/stats').then((r) => r.json()).then(setStats); }, []);

  const cards = stats
    ? [
        ['Total users', stats.totalUsers],
        ['Subscribers', stats.totalSubscribers],
        ['Providers', stats.totalProviders],
        ['Coupons', stats.totalCoupons],
        ['Pending verifications', stats.pendingVerifications],
        ['Monthly revenue', `$${stats.monthlyRevenue}`],
      ]
    : [];

  return (
    <div className="flex gap-6 pb-16">
      <Sidebar items={[{ href: '/admin', label: 'Dashboard' }, { href: '/admin/coupons', label: 'Coupons' }, { href: '/admin/users', label: 'Users' }, { href: '/admin/rewards', label: 'Rewards' }, { href: '/admin/subscriptions', label: 'Subscriptions' }]} />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Admin dashboard</h1>
        <div className="mt-4 grid gap-4 md:grid-cols-3">{cards.map((c) => <div key={c[0]} className="card p-4"><p className="text-sm text-slate-500">{c[0]}</p><p className="text-2xl font-bold">{c[1]}</p></div>)}</div>
      </div>
      <BottomNav />
    </div>
  );
}
