import { NextResponse } from 'next/server';
import { getStripe, getSubscriptionStateByEmail } from '@/lib/stripe';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export const dynamic = 'force-dynamic';

export async function POST() {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const state = await getSubscriptionStateByEmail(user.email);
  if (!state.customerId) {
    return NextResponse.json({ error: 'No Stripe customer found' }, { status: 404 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const session = await getStripe().billingPortal.sessions.create({
    customer: state.customerId,
    return_url: `${siteUrl}/`,
  });

  return NextResponse.json({ url: session.url });
}
