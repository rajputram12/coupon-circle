# CouponClub

CouponClub is a subscription-based coupon marketplace built with **Next.js + TypeScript + Tailwind + MongoDB/Mongoose**.

## Features
- Multi-role auth (user, provider, admin) with JWT cookie sessions
- Verified coupon lifecycle (pending → verified/rejected/expired)
- Subscription plans (Basic/Pro/Elite) and billing history/cancel flow
- Provider dashboard (post coupons, status, earnings, withdrawals)
- Admin dashboard (stats, coupon moderation, rewards approvals)
- Notification center, feedback/reporting APIs, reward transaction support
- Responsive SaaS UI, reusable cards/sidebar/bottom nav, loading/empty states

## Project Structure
- `app/` – App Router pages + API routes
- `models/` – Mongoose models
- `lib/` – DB, auth, validators, payments abstraction, services
- `components/` – reusable UI/layout/coupon/state components
- `scripts/seed.ts` – database seed script

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env.local
   ```
3. Seed demo data:
   ```bash
   npm run seed
   ```
4. Run app:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Troubleshooting
- If you see `404 This page could not be found` on `/` after pulling new changes:
  1. Ensure you are on the latest branch commit.
  2. Clear stale Next build output and reinstall dependencies:
     ```bash
     rm -rf .next node_modules
     npm install
     npm run dev
     ```
  3. Confirm `app/page.tsx` exists and `next.config.ts` does not override `pageExtensions`.

## Demo Credentials
- Admin: `admin@couponclub.app` / `Admin@1234`
- Subscriber: `user@couponclub.app` / `User@1234`
- Provider: `provider@couponclub.app` / `Provider@1234`

## Subscription Provider Abstraction
`lib/payments/provider.ts` includes a payment abstraction and currently uses a mock Stripe-style provider. Replace with real Stripe/Razorpay SDK integration for production checkout webhooks.

## Notes for Production Hardening
- Add secure password-reset email token storage + expiry
- Add CSRF protections and refresh token flow
- Add Stripe/Razorpay webhook verification
- Add stronger analytics aggregation and anti-fraud checks
- Add object storage integration for logo uploads
