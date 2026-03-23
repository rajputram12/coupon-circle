import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Clock, ThumbsUp, ThumbsDown, Lock, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
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
    <PageTransition>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <motion.div
          className="bg-primary px-4 pt-12 pb-16 rounded-b-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-lg mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
              <ArrowLeft size={18} /> Back
            </Link>
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
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
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-lg mx-auto px-4 -mt-8">
          {/* Main card */}
          <motion.div
            className="bg-card rounded-2xl p-5 card-shadow"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
          >
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
            <motion.div
              className="relative mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
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
            </motion.div>

            {isSubscribed && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button variant="success" className="w-full h-11 rounded-xl font-semibold mb-4">
                  Copy Code
                </Button>
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock size={14} /> Expires: {coupon.expiry}
            </div>

            {/* Rating */}
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-sm font-medium text-foreground mb-3 text-center">Did this coupon work?</p>
              <div className="flex gap-3">
                <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                  <Button variant="outline" className="w-full h-10 rounded-xl gap-2 text-accent hover:bg-accent/10">
                    <ThumbsUp size={16} /> Worked ({coupon.workedCount})
                  </Button>
                </motion.div>
                <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                  <Button variant="outline" className="w-full h-10 rounded-xl gap-2 text-hot hover:bg-hot/10">
                    <ThumbsDown size={16} /> Not Worked ({coupon.notWorkedCount})
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Terms */}
          <motion.div
            className="bg-card rounded-2xl p-5 card-shadow mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h3 className="font-semibold text-foreground mb-3">Terms & Conditions</h3>
            <ul className="space-y-2">
              {coupon.terms.map((t, i) => (
                <motion.li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CouponDetailPage;
