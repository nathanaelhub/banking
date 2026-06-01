'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { SubscriptionState } from '@/lib/stripe';

type Props = {
  state: SubscriptionState | null;
  signedIn: boolean;
};

const StartTrialButton = ({ state, signedIn }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!signedIn) {
    return (
      <button
        type="button"
        className="form-btn w-full"
        onClick={() => router.push('/sign-up')}
      >
        Create an account to start
      </button>
    );
  }

  const isActive = state?.status === 'trialing' || state?.status === 'active';

  if (isActive) {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="form-btn w-full"
          onClick={() => router.push('/')}
        >
          Open dashboard
        </button>
        <button
          type="button"
          disabled={loading}
          className="text-[12.5px] text-novaInk3 hover:text-novaInk transition-colors py-1 disabled:opacity-50"
          onClick={async () => {
            setLoading(true);
            try {
              const res = await fetch('/api/stripe/portal', { method: 'POST' });
              const data = await res.json();
              if (data.url) {
                window.location.href = data.url;
              } else {
                toast.error(data.error || 'Could not open billing portal');
              }
            } catch {
              toast.error('Something went wrong');
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? 'Opening…' : 'Manage billing'}
        </button>
      </div>
    );
  }

  const label = state?.status === 'past_due' || state?.status === 'unpaid'
    ? 'Update payment method'
    : state?.status === 'canceled'
    ? 'Restart subscription'
    : 'Start 14-day free trial';

  return (
    <button
      type="button"
      disabled={loading}
      className="form-btn w-full disabled:opacity-60"
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/stripe/checkout', { method: 'POST' });
          const data = await res.json();
          if (data.url) {
            window.location.href = data.url;
          } else {
            toast.error(data.error || 'Could not start checkout');
          }
        } catch {
          toast.error('Something went wrong');
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  );
};

export default StartTrialButton;
