'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function onSubmit(formData: FormData) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.get('email'), password: formData.get('password') }),
    });
    if (!res.ok) return setError('Invalid credentials.');
    router.push('/dashboard');
  }

  return (
    <form action={onSubmit} className="card mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-xl font-semibold">Welcome back</h1>
      <input name="email" required type="email" placeholder="Email" className="w-full rounded-xl border p-2" />
      <input name="password" required type="password" placeholder="Password" className="w-full rounded-xl border p-2" />
      <button className="w-full rounded-xl bg-brand-600 py-2 text-white">Login</button>
      <a href="/signup" className="text-sm text-brand-600">Create account</a>
      <a href="#" className="block text-sm text-slate-500">Forgot password? call /api/auth/forgot-password</a>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
