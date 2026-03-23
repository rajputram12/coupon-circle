import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/search", icon: Search, label: "Search" },
  { path: "/post-coupon", icon: PlusCircle, label: "Post" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
              </motion.div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <motion.div
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary"
                  layoutId="bottomNavIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
