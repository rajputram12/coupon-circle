import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CouponDetailPage from "./pages/CouponDetailPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PostCouponPage from "./pages/PostCouponPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import NotificationsPage from "./pages/NotificationsPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coupon/:id" element={<CouponDetailPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/post-coupon" element={<PostCouponPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
