import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Clock, BadgeCheck, Flame, Tag, ShoppingBag, Plane, Utensils, Shirt, Monitor, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import heroBanner from "@/assets/hero-banner.png";
import logoCB from "@/assets/logo-couponbecho.png";
import brandAmazon from "@/assets/brand-amazon.png";
import brandSwiggy from "@/assets/brand-swiggy.png";
import brandFlipkart from "@/assets/brand-flipkart.png";
import brandMakeMyTrip from "@/assets/brand-makemytrip.png";
import brandMyntra from "@/assets/brand-myntra.png";
import brandZomato from "@/assets/brand-zomato.png";

const brandLogos: Record<string, string> = {
  Amazon: brandAmazon,
  Swiggy: brandSwiggy,
  Flipkart: brandFlipkart,
  MakeMyTrip: brandMakeMyTrip,
  Myntra: brandMyntra,
  Zomato: brandZomato,
};

const categories = [
  { name: "Amazon", icon: ShoppingBag, color: "bg-warning/10 text-warning" },
  { name: "Food", icon: Utensils, color: "bg-hot/10 text-hot" },
  { name: "Travel", icon: Plane, color: "bg-primary/10 text-primary" },
  { name: "Fashion", icon: Shirt, color: "bg-accent/10 text-accent" },
  { name: "Electronics", icon: Monitor, color: "bg-muted-foreground/10 text-muted-foreground" },
  { name: "Tickets", icon: Ticket, color: "bg-primary/10 text-primary" },
];

const coupons = [
  { id: 1, brand: "Amazon", discount: "50% OFF", desc: "Electronics & Gadgets Sale", expiry: "Mar 30, 2026", verified: true, hot: true },
  { id: 2, brand: "Swiggy", discount: "₹150 OFF", desc: "On orders above ₹500", expiry: "Apr 5, 2026", verified: true, hot: false },
  { id: 3, brand: "Flipkart", discount: "30% OFF", desc: "Fashion & Lifestyle", expiry: "Mar 28, 2026", verified: true, hot: true },
  { id: 4, brand: "MakeMyTrip", discount: "₹2000 OFF", desc: "Domestic flight bookings", expiry: "Apr 10, 2026", verified: false, hot: false },
  { id: 5, brand: "Myntra", discount: "40% OFF", desc: "End of season sale", expiry: "Mar 25, 2026", verified: true, hot: false },
  { id: 6, brand: "Zomato", discount: "60% OFF", desc: "First 3 orders", expiry: "Apr 1, 2026", verified: true, hot: true },
];

const CouponCard = ({ coupon, featured = false }: { coupon: typeof coupons[0]; featured?: boolean }) => (
  <Link
    to={`/coupon/${coupon.id}`}
    className={`bg-card rounded-2xl p-4 card-shadow hover:elevated-shadow transition-all duration-200 block ${featured ? "min-w-[260px] snap-start" : ""}`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <span className="text-primary font-bold text-sm">{coupon.brand[0]}</span>
      </div>
      <div className="flex gap-1.5">
        {coupon.verified && (
          <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-0 gap-1">
            <BadgeCheck size={12} /> Verified
          </Badge>
        )}
        {coupon.hot && (
          <Badge variant="secondary" className="text-xs bg-hot/10 text-hot border-0 gap-1">
            <Flame size={12} /> Hot
          </Badge>
        )}
      </div>
    </div>
    <p className="text-xs text-muted-foreground mb-1">{coupon.brand}</p>
    <p className="text-lg font-bold text-accent mb-1">{coupon.discount}</p>
    <p className="text-sm text-foreground mb-3">{coupon.desc}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <Clock size={12} /> {coupon.expiry}
      </span>
      <Button size="sm" className="h-8 rounded-lg text-xs">Unlock</Button>
    </div>
  </Link>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative bg-primary px-4 pt-12 pb-8 rounded-b-3xl overflow-hidden">
        <img src={heroBanner} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <img src={logoCB} alt="Coupon Becho" className="w-10 h-10 rounded-xl" />
              <div>
                <p className="text-primary-foreground/70 text-sm">Good morning 👋</p>
                <h1 className="text-primary-foreground text-xl font-bold">Coupon Becho</h1>
              </div>
            </div>
            <Link to="/profile" className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">JD</span>
            </Link>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
            <Input placeholder="Search coupons, brands..." className="pl-10 h-11 rounded-xl bg-primary-foreground border-0 text-foreground placeholder:text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4">
        {/* Categories */}
        <div className="mt-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Categories</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-0.5">
              See All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button key={cat.name} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card card-shadow hover:elevated-shadow transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                  <cat.icon size={20} />
                </div>
                <span className="text-xs font-medium text-foreground">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground flex items-center gap-1.5">
              <Flame size={18} className="text-hot" /> Trending Coupons
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {coupons.filter(c => c.hot).map((c) => (
              <CouponCard key={c.id} coupon={c} featured />
            ))}
          </div>
        </div>

        {/* Latest */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground flex items-center gap-1.5">
              <Tag size={18} className="text-primary" /> Latest Coupons
            </h2>
            <button className="text-xs text-primary font-medium flex items-center gap-0.5">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid gap-3">
            {coupons.map((c) => (
              <CouponCard key={c.id} coupon={c} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
