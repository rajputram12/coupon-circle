import { z } from 'zod';

export const couponInputSchema = z.object({
  title: z.string().min(4),
  brand: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(8),
  code: z.string().min(3),
  discountType: z.enum(['flat', 'percentage']),
  discountValue: z.coerce.number().positive(),
  expiryDate: z.string(),
  terms: z.string().min(5),
  logoUrl: z.string().url().optional().or(z.literal('')),
  isPremium: z.boolean().default(false),
});

export const feedbackSchema = z.object({
  verdict: z.enum(['worked', 'not_worked']),
  comment: z.string().optional(),
});

export const reportSchema = z.object({
  reason: z.string().min(6),
});
