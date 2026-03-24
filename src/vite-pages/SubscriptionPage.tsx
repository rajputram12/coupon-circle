import { Link } from "react-router-dom";
import { ArrowLeft, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "₹99",
    period: "/month",
    features: ["Access 50 coupons/month", "Basic categories", "Email support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    features: ["Unlimited coupons", "All categories", "Priority support", "Early access deals", "Coupon alerts"],
    popular: true,
  },
  {
    name: "Elite",
    price: "₹599",
    period: "/month",
    features: ["Everything in Pro", "Exclusive deals", "Cashback rewards", "Personal deal finder", "API access"],
    popular: false,
  },
];

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
            <ArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-primary-foreground text-2xl font-bold">Choose Your Plan</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Unlock premium coupons and save more</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card rounded-2xl p-5 card-shadow animate-slide-up relative ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} /> Recommended
                  </span>
                </div>
              )}
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-2.5 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-accent" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full h-11 rounded-xl font-semibold"
              >
                Subscribe Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
