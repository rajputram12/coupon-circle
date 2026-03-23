import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { toDateLabel } from '@/lib/utils';

export function CouponCard({ coupon }: { coupon: any }) {
  return (
    <article className="card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">{coupon.title}</h3>
        <Badge className="bg-green-100 text-green-700">{coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : '$'} OFF</Badge>
      </div>
      <p className="text-sm text-slate-600">{coupon.description}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{coupon.brand} · {coupon.category}</span>
        <span>Expires {toDateLabel(coupon.expiryDate)}</span>
      </div>
      <div className="mt-3 flex gap-2">
        {coupon.isVerified && <Badge className="bg-brand-50 text-brand-700">Verified</Badge>}
        {coupon.isPremium && <Badge>Premium</Badge>}
      </div>
      <Link href={`/coupons/${coupon._id}`} className="mt-4 inline-block text-sm font-medium text-brand-600">View details →</Link>
    </article>
  );
}
