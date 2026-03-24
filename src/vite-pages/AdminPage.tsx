import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Filter, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const adminCoupons = [
  { id: 1, title: "50% OFF Electronics", brand: "Amazon", user: "john@example.com", status: "pending" },
  { id: 2, title: "₹150 OFF Food", brand: "Swiggy", user: "jane@example.com", status: "pending" },
  { id: 3, title: "30% OFF Fashion", brand: "Myntra", user: "bob@example.com", status: "approved" },
  { id: 4, title: "₹2000 OFF Flights", brand: "MakeMyTrip", user: "alice@example.com", status: "rejected" },
  { id: 5, title: "40% OFF Shoes", brand: "Nike", user: "sam@example.com", status: "pending" },
];

const statusColor: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-accent/10 text-accent",
  rejected: "bg-hot/10 text-hot",
};

const AdminPage = () => {
  const [filter, setFilter] = useState("all");
  const [coupons, setCoupons] = useState(adminCoupons);

  const filtered = filter === "all" ? coupons : coupons.filter((c) => c.status === filter);

  const updateStatus = (id: number, status: string) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
            <ArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-primary-foreground text-2xl font-bold">Admin Panel</h1>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
              <Tag size={18} className="text-primary-foreground mx-auto mb-1" />
              <p className="text-primary-foreground text-lg font-bold">{coupons.length}</p>
              <p className="text-primary-foreground/70 text-xs">Total Coupons</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
              <Users size={18} className="text-primary-foreground mx-auto mb-1" />
              <p className="text-primary-foreground text-lg font-bold">48</p>
              <p className="text-primary-foreground/70 text-xs">Total Users</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          <Filter size={16} className="text-muted-foreground shrink-0" />
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Coupon list */}
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="bg-card rounded-2xl p-4 card-shadow animate-fade-in">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.brand} · {c.user}</p>
                </div>
                <Badge className={`${statusColor[c.status]} border-0 capitalize text-xs`}>
                  {c.status}
                </Badge>
              </div>
              {c.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="success"
                    className="flex-1 h-9 rounded-lg text-xs gap-1"
                    onClick={() => updateStatus(c.id, "approved")}
                  >
                    <Check size={14} /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-9 rounded-lg text-xs gap-1 text-hot hover:bg-hot/5"
                    onClick={() => updateStatus(c.id, "rejected")}
                  >
                    <X size={14} /> Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
