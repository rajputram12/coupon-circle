import './globals.css';
import Link from 'next/link';
import { Bell, TicketPercent } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand-600">
              <TicketPercent size={20} /> CouponClub
            </Link>
            <nav className="hidden gap-6 text-sm md:flex">
              <Link href="/pricing">Pricing</Link>
              <Link href="/coupons">Coupons</Link>
              <Link href="/dashboard">Dashboard</Link>
            </nav>
            <Link href="/notifications" className="rounded-full p-2 hover:bg-slate-100">
              <Bell size={18} />
            </Link>
          </div>
        </header>
        <main className="mx-auto min-h-[calc(100vh-65px)] max-w-7xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
