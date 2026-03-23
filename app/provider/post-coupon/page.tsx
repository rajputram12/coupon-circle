'use client';
import { useState } from 'react';

export default function PostCouponPage() {
  const [message, setMessage] = useState('');

  async function onSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, discountValue: Number(payload.discountValue), isPremium: payload.isPremium === 'on' }),
    });
    setMessage(res.ok ? 'Coupon submitted for review.' : 'Submission failed.');
  }

  return (
    <form action={onSubmit} className="card mx-auto max-w-2xl space-y-3 p-6">
      <h1 className="text-2xl font-bold">Post coupon</h1>
      <div className="grid gap-3 md:grid-cols-2">
        <input name="title" required placeholder="Title" className="rounded-xl border p-2" />
        <input name="brand" required placeholder="Brand/store" className="rounded-xl border p-2" />
        <input name="category" required placeholder="Category" className="rounded-xl border p-2" />
        <input name="code" required placeholder="Coupon code" className="rounded-xl border p-2" />
        <select name="discountType" className="rounded-xl border p-2"><option value="percentage">percentage</option><option value="flat">flat</option></select>
        <input name="discountValue" required type="number" placeholder="Discount value" className="rounded-xl border p-2" />
        <input name="expiryDate" required type="date" className="rounded-xl border p-2" />
        <input name="logoUrl" placeholder="Logo URL (optional)" className="rounded-xl border p-2" />
      </div>
      <textarea name="description" required placeholder="Description" className="w-full rounded-xl border p-2" />
      <textarea name="terms" required placeholder="Terms and conditions" className="w-full rounded-xl border p-2" />
      <label className="flex items-center gap-2 text-sm"><input name="isPremium" type="checkbox" /> Premium coupon</label>
      <button className="rounded-xl bg-brand-600 px-4 py-2 text-white">Submit</button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
