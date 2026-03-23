export type CheckoutSessionInput = {
  planId: string;
  userId: string;
  amount: number;
  currency: string;
};

export interface PaymentProvider {
  createCheckoutSession(input: CheckoutSessionInput): Promise<{ checkoutUrl: string; referenceId: string }>;
  cancelSubscription(subscriptionId: string): Promise<{ success: boolean }>;
}

class MockStripeProvider implements PaymentProvider {
  async createCheckoutSession(input: CheckoutSessionInput) {
    return {
      checkoutUrl: `/billing?session=${input.planId}-${Date.now()}`,
      referenceId: `mock_${input.userId}_${Date.now()}`,
    };
  }
  async cancelSubscription() {
    return { success: true };
  }
}

export const paymentProvider: PaymentProvider = new MockStripeProvider();
