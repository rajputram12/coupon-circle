'use client';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { fetch('/api/admin/stats').then((r) => r.json()).then(setStats); }, []);
  return <div className="card p-6"><h1 className="text-2xl font-bold">Manage users</h1><p className="mt-2 text-sm text-slate-600">Total users: {stats?.totalUsers ?? '...'}. Freeze fraudulent providers through User model field `isFrozen`.</p></div>;
}
