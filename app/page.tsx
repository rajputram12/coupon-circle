import Link from 'next/link';

const faq = [
  { q: 'How are coupons verified?', a: 'Every provider submission is reviewed by admins before going live.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Billing can be canceled anytime from your billing page.' },
  { q: 'How do providers earn?', a: 'Providers earn rewards based on approved unlocks and successful feedback.' },
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="card grid gap-8 p-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-brand-600">Premium Savings Marketplace</p>
          <h1 className="mt-2 text-4xl font-bold">Unlock verified coupons you can trust.</h1>
          <p className="mt-4 text-slate-600">CouponClub is the premium way to discover verified savings, curated daily by experts and providers.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/signup" className="rounded-xl bg-brand-600 px-4 py-2 text-white">Start free</Link>
            <Link href="/pricing" className="rounded-xl border px-4 py-2">View plans</Link>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-brand-50 to-white p-6">
          <h3 className="font-semibold">How it works</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Providers submit coupons.</li>
            <li>Admins verify and moderate quality.</li>
            <li>Subscribers unlock high-performing deals.</li>
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Subscription plans</h2>
        <p className="text-slate-600">Basic, Pro, and Elite plans with premium unlock access.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            ['Basic', '$9', 'Essential verified coupons'],
            ['Pro', '$19', 'Premium unlocks + trend insights'],
            ['Elite', '$39', 'All access + early featured deals'],
          ].map((plan) => (
            <article key={plan[0]} className="card p-5">
              <h3 className="font-semibold">{plan[0]}</h3>
              <p className="mt-2 text-3xl font-bold">{plan[1]}<span className="text-sm text-slate-500">/mo</span></p>
              <p className="mt-2 text-sm text-slate-600">{plan[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-4 space-y-3">
          {faq.map((item) => (
            <article key={item.q} className="card p-4">
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="border-t py-6 text-sm text-slate-500">© {new Date().getFullYear()} CouponClub. Trustworthy savings, every day.</footer>
    </div>
  );
}
