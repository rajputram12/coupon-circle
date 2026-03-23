async function getPlans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/subscriptions/plans`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.plans || [];
}

export default async function PricingPage() {
  const plans = await getPlans();
  return (
    <div>
      <h1 className="text-3xl font-bold">Choose your plan</h1>
      <p className="mt-2 text-slate-600">Transparent monthly pricing with instant unlock access.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {plans.map((plan: any) => (
          <article key={plan._id} className="card p-5">
            <h2 className="font-semibold">{plan.name}</h2>
            <p className="mt-2 text-3xl font-bold">${plan.priceMonthly}<span className="text-sm text-slate-500">/mo</span></p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">{plan.features?.map((f: string) => <li key={f}>• {f}</li>)}</ul>
          </article>
        ))}
      </div>
    </div>
  );
}
