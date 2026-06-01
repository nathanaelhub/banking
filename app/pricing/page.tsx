import Link from 'next/link';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getSubscriptionStateByEmail } from '@/lib/stripe';
import StartTrialButton from '@/components/StartTrialButton';

export const dynamic = 'force-dynamic';

const FEATURES = [
  'Unlimited linked bank accounts via Plaid',
  'Real-time spending & income breakdowns',
  'Searchable transaction history',
  'Instant transfers between linked accounts',
  '14-day free trial — cancel anytime',
];

const Pricing = async ({ searchParams }: { searchParams: { checkout?: string } }) => {
  const user = await getLoggedInUser();
  const state = user ? await getSubscriptionStateByEmail(user.email) : null;
  const showCancelled = searchParams.checkout === 'cancelled';

  return (
    <main className="min-h-screen w-full flex flex-col bg-novaBg">
      {/* Top nav */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-novaLine">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2.4 13.6 10.4 21.6 12 13.6 13.6 12 21.6 10.4 13.6 2.4 12 10.4 10.4Z"
                fill="#fff"
              />
              <circle cx="18.5" cy="5.5" r="1.6" fill="#fff" opacity=".85" />
            </svg>
          </span>
          <span className="text-[18px] font-semibold tracking-[-0.01em] text-novaInk">
            Nova<span className="text-[#7C3AED]">.</span>
          </span>
        </Link>
        {user ? (
          <span className="text-[12.5px] text-novaInk3">
            Signed in as <span className="text-novaInk font-medium">{user.email}</span>
          </span>
        ) : (
          <Link href="/sign-in" className="text-[13px] font-medium text-[#7C3AED] hover:underline">
            Sign in
          </Link>
        )}
      </header>

      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <span className="nova-badge nova-badge-violet self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B21B6]" />
              14 days free, then $9/month
            </span>
            <h1 className="text-[32px] font-semibold tracking-[-0.025em] text-novaInk leading-[1.15] mt-1">
              One plan.
              <br />
              Everything in Nova.
            </h1>
            <p className="text-[13.5px] text-novaInk3 max-w-[360px] self-center leading-[1.55]">
              Connect every bank, see every transaction, and move money between accounts — for less than a coffee a month.
            </p>
          </div>

          {showCancelled && (
            <div className="nova-badge nova-badge-amber self-center">
              Checkout cancelled — you can start again any time.
            </div>
          )}

          {/* Plan card */}
          <div className="nova-card p-6 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[14.5px] font-semibold tracking-[-0.005em]">
                  Nova Premium
                </div>
                <div className="text-[12px] text-novaInk3 mt-0.5">
                  Full access to every feature
                </div>
              </div>
              <div className="text-right">
                <div className="font-geist-mono text-[28px] font-medium tracking-[-0.02em] leading-none">
                  $9
                </div>
                <div className="text-[11px] text-novaInk3 mt-0.5">per month</div>
              </div>
            </div>

            <div className="h-px bg-novaLine" />

            <ul className="flex flex-col gap-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-novaInk2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <path d="m4 12 5 5L20 6" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <StartTrialButton state={state} signedIn={!!user} />
          </div>

          <p className="text-[11.5px] text-novaInk3 text-center">
            Card collected up front. You won&apos;t be charged until day 15 — cancel any time from the billing portal.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
