'use client';

import { useEffect, useState } from 'react';
import { CouponCard } from '@/components/coupons/coupon-card';
import { Sidebar } from '@/components/layout/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function DashboardPage() {
  const [coupons, setCoupons] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/coupons').then((r) => r.json()).then((d) => setCoupons(d.coupons || []));
  }, []);

  return (
    <div className="flex gap-6 pb-16">
      <Sidebar items={[{ href: '/dashboard', label: 'Overview' }, { href: '/coupons', label: 'Browse coupons' }, { href: '/billing', label: 'Billing' }, { href: '/profile', label: 'Profile' }]} />
      <div className="flex-1 space-y-6">
        <section className="card p-5"><h1 className="text-2xl font-bold">Welcome back 👋</h1><p className="text-sm text-slate-600">Trending, latest, recommended and expiring soon deals are updated daily.</p></section>
        <section>
          <h2 className="mb-3 text-lg font-semibold">Trending coupons</h2>
          <div className="grid gap-4 md:grid-cols-2">{coupons.slice(0, 6).map((c) => <CouponCard key={c._id} coupon={c} />)}</div>
        </section>
      </div>
      <BottomNav />
    </div>
  );
}
