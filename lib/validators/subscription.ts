import { z } from 'zod';

export const checkoutSchema = z.object({
  planId: z.string().min(1),
});

export const withdrawalSchema = z.object({
  amount: z.coerce.number().positive(),
});
