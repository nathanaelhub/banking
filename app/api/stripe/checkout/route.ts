import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  const trialDays = Number(process.env.STRIPE_TRIAL_DAYS ?? 14);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  if (!priceId) {
    return NextResponse.json({ error: 'STRIPE_PRICE_ID not configured' }, { status: 500 });
  }

  const stripe = getStripe();

  let customerId: string | undefined;
  const existing = await stripe.customers.list({ email: user.email, limit: 1 });
  if (existing.data[0]) {
    customerId = existing.data[0].id;
  } else {
    const created = await stripe.customers.create({
      email: user.email,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || undefined,
      metadata: { appwriteUserId: user.$id },
    });
    customerId = created.id;
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: trialDays,
      metadata: { appwriteUserId: user.$id },
    },
    success_url: `${siteUrl}/?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
