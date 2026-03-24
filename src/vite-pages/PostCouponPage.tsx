import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";

const PostCouponPage = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pb-20">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Coupon Submitted!</h2>
          <p className="text-muted-foreground text-sm mb-6">Your coupon is pending verification.</p>
          <Button variant="hero" className="rounded-xl" asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
            <ArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-primary-foreground text-2xl font-bold">Post a Coupon</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Share deals and earn rewards</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6">
        <div className="bg-card rounded-2xl p-5 card-shadow animate-slide-up space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Coupon Title</label>
            <Input placeholder="e.g., 50% off on electronics" className="h-11 rounded-xl" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Brand Name</label>
            <Input placeholder="e.g., Amazon, Flipkart" className="h-11 rounded-xl" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Coupon Code</label>
            <Input placeholder="e.g., SAVE50" className="h-11 rounded-xl font-mono" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Discount Type</label>
            <Select>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage Off</SelectItem>
                <SelectItem value="flat">Flat Discount</SelectItem>
                <SelectItem value="cashback">Cashback</SelectItem>
                <SelectItem value="bogo">Buy One Get One</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Expiry Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input type="date" className="pl-10 h-11 rounded-xl" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <Textarea placeholder="Describe the deal..." className="rounded-xl min-h-[80px]" />
          </div>

          <Button variant="hero" className="w-full h-11 rounded-xl font-semibold" onClick={() => setSubmitted(true)}>
            Submit Coupon
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PostCouponPage;
