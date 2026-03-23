import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Clock, ThumbsUp, ThumbsDown, Lock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import brandAmazon from "@/assets/brand-amazon.png";

const brandLogos: Record<string, string> = {
  Amazon: brandAmazon,
};

const CouponDetailPage = () => {
  const { id } = useParams();
  const isSubscribed = true; // mock

  const coupon = {
    id,
    brand: "Amazon",
    discount: "50% OFF",
    code: "SAVE50NOW",
    desc: "Get 50% off on all electronics and gadgets. Valid on purchases above ₹2000.",
    expiry: "Mar 30, 2026",
    verified: true,
    hot: true,
    terms: [
      "Valid on select products only",
      "Cannot be combined with other offers",
      "Maximum discount ₹5000",
      "Valid for all users",
    ],
    workedCount: 234,
    notWorkedCount: 12,
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-16 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
            <ArrowLeft size={18} /> Back
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center overflow-hidden">
              {brandLogos[coupon.brand] ? (
                <img src={brandLogos[coupon.brand]} alt={coupon.brand} className="w-12 h-12 object-contain" />
              ) : (
                <span className="text-primary-foreground font-bold text-2xl">{coupon.brand[0]}</span>
              )}
            </div>
            <div>
              <p className="text-primary-foreground/70 text-sm">{coupon.brand}</p>
              <h1 className="text-primary-foreground text-2xl font-bold">{coupon.discount}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8">
        {/* Main card */}
        <div className="bg-card rounded-2xl p-5 card-shadow animate-slide-up">
          <div className="flex gap-2 mb-4">
            {coupon.verified && (
              <Badge variant="secondary" className="bg-accent/10 text-accent border-0 gap-1">
                <BadgeCheck size={14} /> Verified
              </Badge>
            )}
            {coupon.hot && (
              <Badge variant="secondary" className="bg-hot/10 text-hot border-0 gap-1">
                <Flame size={14} /> Hot Deal
              </Badge>
            )}
            <Badge variant="secondary" className="bg-warning/10 text-warning border-0 gap-1">
              <Clock size={14} /> Expiring Soon
            </Badge>
          </div>

          <p className="text-foreground mb-4">{coupon.desc}</p>

          {/* Coupon Code */}
          <div className="relative mb-4">
            <div className={`bg-secondary rounded-xl p-4 text-center border-2 border-dashed border-primary/30 ${!isSubscribed ? "blur-coupon" : ""}`}>
              <p className="text-xs text-muted-foreground mb-1">Coupon Code</p>
              <p className="text-2xl font-bold tracking-widest text-primary">{coupon.code}</p>
            </div>
            {!isSubscribed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="hero" className="gap-2 rounded-xl" asChild>
                  <Link to="/subscription">
                    <Lock size={16} /> Subscribe to Unlock
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {isSubscribed && (
            <Button variant="success" className="w-full h-11 rounded-xl font-semibold mb-4">
              Copy Code
            </Button>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Clock size={14} /> Expires: {coupon.expiry}
          </div>

          {/* Rating */}
          <div className="bg-secondary rounded-xl p-4">
            <p className="text-sm font-medium text-foreground mb-3 text-center">Did this coupon work?</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-10 rounded-xl gap-2 text-accent hover:bg-accent/10">
                <ThumbsUp size={16} /> Worked ({coupon.workedCount})
              </Button>
              <Button variant="outline" className="flex-1 h-10 rounded-xl gap-2 text-hot hover:bg-hot/10">
                <ThumbsDown size={16} /> Not Worked ({coupon.notWorkedCount})
              </Button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-card rounded-2xl p-5 card-shadow mt-4 animate-slide-up">
          <h3 className="font-semibold text-foreground mb-3">Terms & Conditions</h3>
          <ul className="space-y-2">
            {coupon.terms.map((t, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailPage;
