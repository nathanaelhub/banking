import HeaderBox from '@/components/HeaderBox'
import PlaidLink from '@/components/PlaidLink';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import SpendingChart from '@/components/SpendingChart';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id
  })

  const accountsData = accounts?.data ?? [];

  if (accountsData.length === 0) {
    return (
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome to Apex"
              user={loggedIn?.firstName || 'Guest'}
              subtext="Link your first bank account to get started."
            />
          </header>
          <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-[#ECEAE3] bg-white p-6">
            <p className="text-[14px] text-[#6B6577]">
              No accounts connected yet. Connect one to see balances, transactions, and spending insights.
            </p>
            <PlaidLink user={loggedIn} variant="primary" />
          </div>
        </div>
      </section>
    );
  }

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome back"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Here's how your accounts are doing — everything in one view."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <SpendingChart transactions={account?.transactions ?? []} />

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home