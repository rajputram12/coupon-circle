'use client';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => { fetch('/api/auth/me').then((r) => r.json()).then((d) => setUser(d.user)); }, []);

  if (!user) return <div className="card p-6">Loading profile...</div>;
  return (
    <div className="card max-w-xl p-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4 space-y-2 text-sm">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Subscription:</b> {user.subscriptionStatus}</p>
      </div>
    </div>
  );
}
