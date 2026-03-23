import bcrypt from 'bcryptjs';
import { connectDb } from '@/lib/db/connect';
import { User } from '@/models/User';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { Coupon } from '@/models/Coupon';
import { Wallet } from '@/models/Wallet';

async function seed() {
  await connectDb();
  await Promise.all([User.deleteMany({}), SubscriptionPlan.deleteMany({}), Coupon.deleteMany({}), Wallet.deleteMany({})]);

  const [adminPass, userPass, providerPass] = await Promise.all([
    bcrypt.hash('Admin@1234', 10),
    bcrypt.hash('User@1234', 10),
    bcrypt.hash('Provider@1234', 10),
  ]);

  const [admin, user, provider] = await User.create([
    { name: 'Admin User', email: 'admin@couponclub.app', passwordHash: adminPass, role: 'admin', subscriptionStatus: 'active' },
    { name: 'Demo Subscriber', email: 'user@couponclub.app', passwordHash: userPass, role: 'user', subscriptionStatus: 'active' },
    { name: 'Demo Provider', email: 'provider@couponclub.app', passwordHash: providerPass, role: 'provider', subscriptionStatus: 'inactive' },
  ]);

  const plans = await SubscriptionPlan.create([
    { name: 'Basic', slug: 'basic', priceMonthly: 9, couponUnlockLimit: 50, includesPremium: false, features: ['Verified deals', 'Basic support'] },
    { name: 'Pro', slug: 'pro', priceMonthly: 19, couponUnlockLimit: 200, includesPremium: true, features: ['Premium deals', 'Trending insights'] },
    { name: 'Elite', slug: 'elite', priceMonthly: 39, couponUnlockLimit: -1, includesPremium: true, features: ['Unlimited unlocks', 'Priority access'] },
  ]);

  user.activePlan = plans[1]._id;
  await user.save();

  await Wallet.create({ userId: provider._id, balance: 125, totalCredited: 145, totalWithdrawn: 20 });

  await Coupon.create([
    {
      title: '30% off orders over $100',
      brand: 'StyleHub',
      category: 'Fashion',
      description: 'Premium fashion discount for new and returning users.',
      code: 'STYLE30',
      discountType: 'percentage',
      discountValue: 30,
      expiryDate: new Date(Date.now() + 20 * 86400000),
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
      expiryDate: new Date(Date.now() + 12 * 86400000),
      terms: 'Minimum spend $60.',
      status: 'pending',
      isVerified: false,
      providerId: provider._id,
      viewsCount: 40,
      unlockCount: 10,
      successCount: 7,
      failureCount: 2,
    },
  ]);

  console.log('✅ Seed complete');
  console.log('Admin: admin@couponclub.app / Admin@1234');
  console.log('User: user@couponclub.app / User@1234');
  console.log('Provider: provider@couponclub.app / Provider@1234');
}

seed().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
