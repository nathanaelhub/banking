import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import type Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET not configured' },
      { status: 500 }
    );
  }

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Invalid signature: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'invoice.payment_failed':
      // payment failures deserve a warning, not an info line
      console.warn(`[stripe webhook] ${event.type}`, event.id);
      break;
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'customer.subscription.trial_will_end':
    case 'invoice.payment_succeeded':
      console.log(`[stripe webhook] ${event.type}`, event.id);
      break;
    default:
      console.log(`[stripe webhook] unhandled ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
