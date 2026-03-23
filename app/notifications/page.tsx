'use client';
import { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { fetch('/api/notifications').then((r) => r.json()).then((d) => setItems(d.notifications || [])); }, []);
  return <div className="card p-6"><h1 className="text-2xl font-bold">Notifications</h1><ul className="mt-3 space-y-2 text-sm">{items.map((n) => <li key={n._id}>{n.title} — {n.message}</li>)}</ul></div>;
}
