import 'server-only';
import Stripe from 'stripe';
import { cache } from 'react';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  _stripe = new Stripe(key);
  return _stripe;
}

export type SubscriptionState = {
  status: Stripe.Subscription.Status | 'none';
  customerId: string | null;
  subscriptionId: string | null;
  trialEnd: number | null;
  currentPeriodEnd: number | null;
  cancelAtPeriodEnd: boolean;
};

const EMPTY: SubscriptionState = {
  status: 'none',
  customerId: null,
  subscriptionId: null,
  trialEnd: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
};

async function findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const stripe = getStripe();
  const customers = await stripe.customers.list({ email, limit: 1 });
  return customers.data[0] ?? null;
}

async function getActiveSubscriptionForCustomer(
  customerId: string
): Promise<Stripe.Subscription | null> {
  const stripe = getStripe();
  const subs = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 5,
  });
  const priority: Stripe.Subscription.Status[] = [
    'trialing',
    'active',
    'past_due',
    'unpaid',
    'incomplete',
    'incomplete_expired',
    'canceled',
    'paused',
  ];
  for (const status of priority) {
    const match = subs.data.find((s) => s.status === status);
    if (match) return match;
  }
  return subs.data[0] ?? null;
}

export const getSubscriptionStateByEmail = cache(
  async (email: string | undefined | null): Promise<SubscriptionState> => {
    if (!email) return EMPTY;
    try {
      const customer = await findCustomerByEmail(email);
      if (!customer) return EMPTY;

      const sub = await getActiveSubscriptionForCustomer(customer.id);
      if (!sub) {
        return { ...EMPTY, customerId: customer.id };
      }

      const firstItem = sub.items.data[0];
      return {
        status: sub.status,
        customerId: customer.id,
        subscriptionId: sub.id,
        trialEnd: sub.trial_end,
        currentPeriodEnd: firstItem?.current_period_end ?? null,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      };
    } catch (err) {
      console.error('[stripe] getSubscriptionStateByEmail failed', err);
      return EMPTY;
    }
  }
);

export function hasAccess(state: SubscriptionState): boolean {
  return state.status === 'trialing' || state.status === 'active';
}
