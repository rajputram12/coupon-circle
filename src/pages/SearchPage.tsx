import { useState } from "react";
import { Search as SearchIcon, BadgeCheck, Clock, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const allCoupons = [
  { id: 1, brand: "Amazon", discount: "50% OFF", desc: "Electronics & Gadgets Sale", expiry: "Mar 30, 2026", verified: true, hot: true, category: "Electronics" },
  { id: 2, brand: "Swiggy", discount: "₹150 OFF", desc: "On orders above ₹500", expiry: "Apr 5, 2026", verified: true, hot: false, category: "Food" },
  { id: 3, brand: "Flipkart", discount: "30% OFF", desc: "Fashion & Lifestyle", expiry: "Mar 28, 2026", verified: true, hot: true, category: "Fashion" },
  { id: 4, brand: "MakeMyTrip", discount: "₹2000 OFF", desc: "Domestic flight bookings", expiry: "Apr 10, 2026", verified: false, hot: false, category: "Travel" },
  { id: 5, brand: "Myntra", discount: "40% OFF", desc: "End of season sale", expiry: "Mar 25, 2026", verified: true, hot: false, category: "Fashion" },
  { id: 6, brand: "Zomato", discount: "60% OFF", desc: "First 3 orders", expiry: "Apr 1, 2026", verified: true, hot: true, category: "Food" },
];

const categories = ["All", "Electronics", "Food", "Fashion", "Travel"];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allCoupons.filter((c) => {
    const matchesQuery = !query || c.brand.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === "All" || c.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 bg-background z-40 px-4 pt-12 pb-4 border-b border-border">
        <div className="max-w-lg mx-auto">
          <div className="relative mb-3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search coupons, brands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            to={`/coupon/${c.id}`}
            className="bg-card rounded-2xl p-4 card-shadow hover:elevated-shadow transition-all block animate-fade-in"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{c.brand[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.brand}</p>
                  <p className="text-lg font-bold text-accent">{c.discount}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {c.verified && (
                  <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent border-0 gap-0.5">
                    <BadgeCheck size={10} /> Verified
                  </Badge>
                )}
                {c.hot && (
                  <Badge variant="secondary" className="text-[10px] bg-hot/10 text-hot border-0 gap-0.5">
                    <Flame size={10} /> Hot
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{c.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} /> {c.expiry}
              </span>
              <Button size="sm" className="h-8 rounded-lg text-xs">Unlock</Button>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No coupons found</div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
