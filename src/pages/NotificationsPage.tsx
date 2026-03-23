import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Tag, CreditCard, Flame } from "lucide-react";

const notifications = [
  { icon: Flame, color: "bg-hot/10 text-hot", title: "Hot Deal Alert!", desc: "Amazon 60% OFF sale starts now", time: "2 min ago" },
  { icon: Tag, color: "bg-accent/10 text-accent", title: "Coupon Verified", desc: "Your Flipkart coupon has been approved", time: "1 hour ago" },
  { icon: CreditCard, color: "bg-primary/10 text-primary", title: "Subscription Renewed", desc: "Pro plan renewed successfully", time: "1 day ago" },
  { icon: Bell, color: "bg-warning/10 text-warning", title: "Expiring Soon", desc: "3 coupons expiring in 24 hours", time: "2 days ago" },
  { icon: Tag, color: "bg-accent/10 text-accent", title: "New Coupons Added", desc: "15 new coupons in Travel category", time: "3 days ago" },
];

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
            <ArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-primary-foreground text-2xl font-bold">Notifications</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6 space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 card-shadow flex items-start gap-3 animate-fade-in">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
              <n.icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
