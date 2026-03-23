'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function onSubmit(formData: FormData) {
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    };
    const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) return setError('Could not create account.');
    router.push('/login');
  }

  return (
    <form action={onSubmit} className="card mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-xl font-semibold">Join CouponClub</h1>
      <input name="name" required placeholder="Full name" className="w-full rounded-xl border p-2" />
      <input name="email" required type="email" placeholder="Email" className="w-full rounded-xl border p-2" />
      <input name="password" required type="password" placeholder="Password" className="w-full rounded-xl border p-2" />
      <select name="role" className="w-full rounded-xl border p-2"><option value="user">Subscriber</option><option value="provider">Provider</option></select>
      <button className="w-full rounded-xl bg-brand-600 py-2 text-white">Create account</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
