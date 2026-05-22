import HeaderBox from '@/components/HeaderBox'
import TransactionSearch from '@/components/TransactionSearch';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';

const TransactionHistory = async ({ searchParams: { id } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-5">
        {/* Account banner */}
        <div
          style={{
            background: 'radial-gradient(60% 110% at 100% 0%, rgba(255,255,255,.18), transparent 55%), linear-gradient(120deg, #7C3AED 0%, #5B21B6 50%, #2E1065 100%)',
            borderRadius: 18,
            color: '#fff',
            padding: '24px 26px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Stripe overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.05) 0 1px, transparent 1px 14px)',
              mixBlendMode: 'overlay',
              opacity: .8,
              pointerEvents: 'none',
            }}
          />

          <div className="flex items-center justify-between relative">
            <div>
              <h2 className="text-[18px] font-semibold">{account?.data.name}</h2>
              <p
                className="mt-1.5 text-[12.5px] opacity-80"
                style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
              >
                APEX •••• •••• •••• {account?.data.mask}
              </p>
            </div>
            <div className="text-right">
              <div
                className="text-[11px] uppercase tracking-[.1em] opacity-70"
              >
                Current balance
              </div>
              <div
                className="text-[28px] font-medium mt-1"
                style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
              >
                {formatAmount(account?.data.currentBalance)}
              </div>
            </div>
          </div>
        </div>

        <section className="flex w-full flex-col gap-5">
          <TransactionSearch transactions={account?.transactions ?? []} />
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
