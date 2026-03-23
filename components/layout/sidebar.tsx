import Link from 'next/link';

export function Sidebar({ items }: { items: { href: string; label: string }[] }) {
  return (
    <aside className="card hidden w-64 p-4 md:block">
      <div className="space-y-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
