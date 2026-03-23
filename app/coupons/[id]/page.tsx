'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CouponDetailsPage() {
  const params = useParams<{ id: string }>();
  const [coupon, setCoupon] = useState<any | null>(null);

  useEffect(() => {
    fetch(`/api/coupons/${params.id}`).then((r) => r.json()).then((d) => setCoupon(d.coupon));
  }, [params.id]);

  if (!coupon) return <div className="card p-6">Loading coupon details...</div>;

  return (
    <div className="card space-y-4 p-6">
      <div className="flex items-start justify-between"><h1 className="text-2xl font-bold">{coupon.title}</h1><span className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">{coupon.isVerified ? 'Verified' : 'Pending'}</span></div>
      <p className="text-slate-600">{coupon.description}</p>
      <div className="grid gap-2 text-sm md:grid-cols-2">
        <p><b>Brand:</b> {coupon.brand}</p><p><b>Category:</b> {coupon.category}</p>
        <p><b>Expiry:</b> {new Date(coupon.expiryDate).toLocaleDateString()}</p><p><b>Code:</b> {coupon.code}</p>
      </div>
      <div><h2 className="font-semibold">Terms & conditions</h2><p className="text-sm text-slate-600">{coupon.terms}</p></div>
      <div className="flex gap-2">
        <button onClick={() => fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ couponId: coupon._id, verdict: 'worked' }) })} className="rounded-xl bg-green-600 px-4 py-2 text-white">Worked</button>
        <button onClick={() => fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ couponId: coupon._id, verdict: 'not_worked' }) })} className="rounded-xl border px-4 py-2">Not worked</button>
      </div>
    </div>
  );
}
