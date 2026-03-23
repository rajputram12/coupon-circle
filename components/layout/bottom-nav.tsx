import Link from 'next/link';

export function BottomNav() {
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/coupons', label: 'Coupons' },
    { href: '/provider', label: 'Provider' },
    { href: '/admin', label: 'Admin' },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-4 border-t bg-white p-2 text-xs md:hidden">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="text-center text-slate-600">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
