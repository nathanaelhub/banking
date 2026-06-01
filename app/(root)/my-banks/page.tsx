import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import PlaidLink from '@/components/PlaidLink';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect('/sign-in');

  const accounts = await getAccounts({ userId: loggedIn.$id });
  const accountsData = accounts?.data ?? [];
  const userName = `${loggedIn?.firstName ?? ''} ${loggedIn?.lastName ?? ''}`.trim();

  return (
    <section className="my-banks">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <HeaderBox
          title="My banks"
          subtext="Every account, every card — connected and in one place."
        />
        <PlaidLink user={loggedIn} />
      </div>

      {accountsData.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#ECEAE3] bg-white p-6">
          <p className="text-[14px] text-[#6B6577]">
            No banks connected yet. Link your first account to see cards here.
          </p>
          <PlaidLink user={loggedIn} variant="primary" />
        </div>
      ) : (
        <>
          {/* Summary strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-[#ECEAE3] rounded-[12px] p-4">
              <div className="text-[11px] uppercase tracking-[.08em] text-[#6B6577]">
                Connected accounts
              </div>
              <div className="font-geist-mono text-[20px] font-medium tracking-[-0.01em] mt-1">
                {accounts?.totalBanks ?? accountsData.length}
              </div>
            </div>
            <div className="bg-white border border-[#ECEAE3] rounded-[12px] p-4">
              <div className="text-[11px] uppercase tracking-[.08em] text-[#6B6577]">
                Total balance
              </div>
              <div className="font-geist-mono text-[20px] font-medium tracking-[-0.01em] mt-1">
                {formatAmount(accounts?.totalCurrentBalance ?? 0)}
              </div>
            </div>
            <div className="bg-white border border-[#ECEAE3] rounded-[12px] p-4">
              <div className="text-[11px] uppercase tracking-[.08em] text-[#6B6577]">
                Cardholder
              </div>
              <div className="text-[15px] font-medium tracking-[-0.005em] mt-1 truncate">
                {userName || 'Nova Member'}
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[14.5px] font-semibold tracking-[-0.005em] text-[#14111C]">
              Your cards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {accountsData.map((a: Account) => (
                <BankCard
                  key={a.appwriteItemId ?? a.id}
                  account={a}
                  userName={userName || loggedIn?.firstName}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MyBanks;
