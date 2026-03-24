import bcrypt from 'bcryptjs';
import { connectDb } from '@/lib/db/connect';
import { User } from '@/models/User';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { Coupon } from '@/models/Coupon';
import { Wallet } from '@/models/Wallet';
import { Subscription } from '@/models/Subscription';
import { Notification } from '@/models/Notification';
import { RewardTransaction } from '@/models/RewardTransaction';
import { WithdrawalRequest } from '@/models/WithdrawalRequest';
import { CouponFeedback } from '@/models/CouponFeedback';
import { CouponView } from '@/models/CouponView';
import { AdminActionLog } from '@/models/AdminActionLog';

const dayFromNow = (days: number) => new Date(Date.now() + days * 86400000);
const dayAgo = (days: number) => new Date(Date.now() - days * 86400000);

async function seed() {
  await connectDb();
  await Promise.all([
    User.deleteMany({}),
    SubscriptionPlan.deleteMany({}),
    Coupon.deleteMany({}),
    Wallet.deleteMany({}),
    Subscription.deleteMany({}),
    Notification.deleteMany({}),
    RewardTransaction.deleteMany({}),
    WithdrawalRequest.deleteMany({}),
    CouponFeedback.deleteMany({}),
    CouponView.deleteMany({}),
    AdminActionLog.deleteMany({}),
  ]);

  const [adminPass, userPass, providerPass] = await Promise.all([
    bcrypt.hash('Admin@1234', 10),
    bcrypt.hash('User@1234', 10),
    bcrypt.hash('Provider@1234', 10),
  ]);

  const [admin, user, provider, userTwo, providerTwo] = await User.create([
    { name: 'Admin User', email: 'admin@couponclub.app', passwordHash: adminPass, role: 'admin', subscriptionStatus: 'active' },
    { name: 'Demo Subscriber', email: 'user@couponclub.app', passwordHash: userPass, role: 'user', subscriptionStatus: 'active' },
    { name: 'Demo Provider', email: 'provider@couponclub.app', passwordHash: providerPass, role: 'provider', subscriptionStatus: 'inactive' },
    { name: 'Priya Sharma', email: 'priya@couponclub.app', passwordHash: userPass, role: 'user', subscriptionStatus: 'active' },
    { name: 'DealMaster Pro', email: 'dealmaster@couponclub.app', passwordHash: providerPass, role: 'provider', subscriptionStatus: 'inactive' },
  ]);

  const plans = await SubscriptionPlan.create([
    { name: 'Basic', slug: 'basic', priceMonthly: 9, couponUnlockLimit: 50, includesPremium: false, features: ['Verified deals', 'Basic support'] },
    { name: 'Pro', slug: 'pro', priceMonthly: 19, couponUnlockLimit: 200, includesPremium: true, features: ['Premium deals', 'Trending insights'] },
    { name: 'Elite', slug: 'elite', priceMonthly: 39, couponUnlockLimit: -1, includesPremium: true, features: ['Unlimited unlocks', 'Priority access'] },
  ]);

  user.activePlan = plans[1]._id;
  userTwo.activePlan = plans[0]._id;
  provider.walletBalance = 125;
  providerTwo.walletBalance = 82;
  await Promise.all([user.save(), userTwo.save(), provider.save(), providerTwo.save()]);

  await Wallet.create([
    { userId: provider._id, balance: 125, totalCredited: 145, totalWithdrawn: 20 },
    { userId: providerTwo._id, balance: 82, totalCredited: 110, totalWithdrawn: 28 },
  ]);

  const coupons = await Coupon.create([
    {
      title: '30% off orders over $100',
      brand: 'StyleHub',
      category: 'Fashion',
      description: 'Premium fashion discount for new and returning users.',
      code: 'STYLE30',
      discountType: 'percentage',
      discountValue: 30,
      expiryDate: dayFromNow(20),
      terms: 'Valid once per user. Excludes limited edition.',
      status: 'verified',
      isVerified: true,
      isFeatured: true,
      isPremium: true,
      providerId: provider._id,
      viewsCount: 150,
      unlockCount: 48,
      successCount: 35,
      failureCount: 4,
    },
    {
      title: '$20 off first grocery order',
      brand: 'GrocerNow',
      category: 'Groceries',
      description: 'Save instantly on your first basket.',
      code: 'FRESH20',
      discountType: 'flat',
      discountValue: 20,
      expiryDate: dayFromNow(12),
      terms: 'Minimum spend $60.',
      status: 'pending',
      isVerified: false,
      providerId: provider._id,
      viewsCount: 40,
      unlockCount: 10,
      successCount: 7,
      failureCount: 2,
    },
    {
      title: 'Flat $15 off on electronics',
      brand: 'TechNova',
      category: 'Electronics',
      description: 'Works on accessories and smart home products.',
      code: 'TNOVA15',
      discountType: 'flat',
      discountValue: 15,
      expiryDate: dayFromNow(45),
      terms: 'Minimum cart value $120. One use per account.',
      status: 'verified',
      isVerified: true,
      isFeatured: true,
      isPremium: false,
      providerId: providerTwo._id,
      viewsCount: 210,
      unlockCount: 77,
      successCount: 58,
      failureCount: 9,
    },
    {
      title: '50% off annual gym subscription',
      brand: 'FitNation',
      category: 'Health',
      description: 'New members only. Includes starter kit.',
      code: 'FIT50YEAR',
      discountType: 'percentage',
      discountValue: 50,
      expiryDate: dayFromNow(8),
      terms: 'Valid only on annual plan checkout.',
      status: 'rejected',
      moderationNotes: 'Coupon details did not match landing page terms.',
      isVerified: false,
      providerId: provider._id,
      viewsCount: 23,
      unlockCount: 5,
      successCount: 1,
      failureCount: 3,
    },
    {
      title: 'Buy 1 Get 1 pizzas',
      brand: 'PizzaPort',
      category: 'Food',
      description: 'Applicable for medium and large pizzas.',
      code: 'PZABOGO',
      discountType: 'percentage',
      discountValue: 50,
      expiryDate: dayAgo(2),
      terms: 'Delivery fee excluded.',
      status: 'expired',
      isVerified: true,
      providerId: providerTwo._id,
      viewsCount: 340,
      unlockCount: 141,
      successCount: 90,
      failureCount: 19,
    },
  ]);

  await Subscription.create([
    {
      userId: user._id,
      planId: plans[1]._id,
      status: 'active',
      providerRef: 'stripe_sub_demo_001',
      startedAt: dayAgo(10),
      endsAt: dayFromNow(20),
      amountPaid: 19,
    },
    {
      userId: userTwo._id,
      planId: plans[0]._id,
      status: 'active',
      providerRef: 'stripe_sub_demo_002',
      startedAt: dayAgo(4),
      endsAt: dayFromNow(26),
      amountPaid: 9,
    },
  ]);

  await Notification.create([
    {
      userId: provider._id,
      type: 'coupon_approved',
      title: 'Coupon approved',
      message: 'Your StyleHub coupon has been approved and published.',
      readAt: dayAgo(1),
    },
    {
      userId: user._id,
      type: 'subscription_expiring',
      title: 'Plan renewal reminder',
      message: 'Your Pro plan renews in 7 days. Update billing if needed.',
    },
    {
      userId: userTwo._id,
      type: 'trending_deals',
      title: 'Trending this week',
      message: 'Electronics and travel coupons are trending in your area.',
    },
  ]);

  await RewardTransaction.create([
    {
      providerId: provider._id,
      couponId: coupons[0]._id,
      type: 'unlock_reward',
      amount: 36,
      status: 'approved',
      notes: 'Unlock rewards for 48 unlocks on STYLE30.',
    },
    {
      providerId: providerTwo._id,
      couponId: coupons[2]._id,
      type: 'success_reward',
      amount: 58,
      status: 'approved',
      notes: 'Success rewards for TNOVA15.',
    },
    {
      providerId: provider._id,
      type: 'withdrawal',
      amount: 20,
      status: 'paid',
      notes: 'Bank transfer completed.',
    },
  ]);

  await WithdrawalRequest.create([
    {
      providerId: providerTwo._id,
      amount: 30,
      status: 'pending',
      payoutMethod: 'upi',
    },
  ]);

  await CouponFeedback.create([
    {
      couponId: coupons[0]._id,
      userId: user._id,
      verdict: 'worked',
      comment: 'Applied instantly at checkout.',
    },
    {
      couponId: coupons[2]._id,
      userId: userTwo._id,
      verdict: 'not_worked',
      comment: 'Did not apply on discounted products.',
    },
  ]);

  await CouponView.create([
    { couponId: coupons[0]._id, userId: user._id, unlocked: true, ipHash: 'iphash-user-1' },
    { couponId: coupons[0]._id, userId: userTwo._id, unlocked: true, ipHash: 'iphash-user-2' },
    { couponId: coupons[2]._id, userId: user._id, unlocked: true, ipHash: 'iphash-user-1' },
    { couponId: coupons[3]._id, userId: userTwo._id, unlocked: false, ipHash: 'iphash-user-2' },
  ]);

  await AdminActionLog.create([
    {
      adminId: admin._id,
      action: 'approve_coupon',
      targetType: 'coupon',
      targetId: coupons[0]._id.toString(),
      metadata: { providerId: provider._id.toString() },
    },
    {
      adminId: admin._id,
      action: 'reject_coupon',
      targetType: 'coupon',
      targetId: coupons[3]._id.toString(),
      metadata: { reason: 'Terms mismatch' },
    },
  ]);

  console.log('✅ Seed complete');
  console.log('Admin: admin@couponclub.app / Admin@1234');
  console.log('User: user@couponclub.app / User@1234');
  console.log('User 2: priya@couponclub.app / User@1234');
  console.log('Provider: provider@couponclub.app / Provider@1234');
  console.log('Provider 2: dealmaster@couponclub.app / Provider@1234');
}

seed().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
