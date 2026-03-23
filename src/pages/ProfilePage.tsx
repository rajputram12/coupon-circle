import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, Tag, LogOut, ChevronRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";

const myCoupons = [
  { title: "50% OFF Electronics", brand: "Amazon", status: "verified" },
  { title: "₹150 OFF Food", brand: "Swiggy", status: "pending" },
  { title: "30% OFF Fashion", brand: "Myntra", status: "rejected" },
];

const statusColor: Record<string, string> = {
  verified: "bg-accent/10 text-accent",
  pending: "bg-warning/10 text-warning",
  rejected: "bg-hot/10 text-hot",
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
            <ArrowLeft size={18} /> Back
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">JD</span>
            </div>
            <div>
              <h1 className="text-primary-foreground text-xl font-bold">John Doe</h1>
              <p className="text-primary-foreground/70 text-sm">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 space-y-4">
        {/* Subscription */}
        <div className="bg-card rounded-2xl p-5 card-shadow animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Crown size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Pro Plan</p>
                <p className="text-xs text-muted-foreground">Active until Apr 23, 2026</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg text-xs" asChild>
              <Link to="/subscription">Manage</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4 card-shadow text-center">
            <Wallet size={20} className="text-accent mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">₹1,250</p>
            <p className="text-xs text-muted-foreground">Earnings</p>
          </div>
          <div className="bg-card rounded-2xl p-4 card-shadow text-center">
            <Tag size={20} className="text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Coupons Posted</p>
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-card rounded-2xl card-shadow overflow-hidden">
          {[
            { icon: CreditCard, label: "Payment Methods", path: "#" },
            { icon: Tag, label: "Notifications", path: "/notifications" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* My Coupons */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">My Coupons</h3>
          <div className="space-y-3">
            {myCoupons.map((c, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 card-shadow flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.brand}</p>
                </div>
                <Badge className={`${statusColor[c.status]} border-0 capitalize text-xs`}>
                  {c.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full h-11 rounded-xl text-hot hover:bg-hot/5 gap-2" asChild>
          <Link to="/login">
            <LogOut size={16} /> Logout
          </Link>
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
