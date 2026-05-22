import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar">
      {/* Profile banner */}
      <div className="relative rounded-[16px] overflow-hidden bg-white border border-[#ECEAE3]">
        {/* Banner gradient */}
        <div
          className="h-[74px] relative"
          style={{
            background: 'radial-gradient(70% 130% at 100% 0%, rgba(255,255,255,.25), transparent 60%), linear-gradient(120deg, #7C3AED 0%, #5B21B6 100%)',
          }}
        >
          {/* Stripe overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.06) 0 1px, transparent 1px 14px)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* Avatar overlapping the banner */}
        <div
          className="absolute left-[18px] top-[48px] w-[54px] h-[54px] rounded-full border-[3px] border-white flex items-center justify-center text-white font-semibold text-[18px]"
          style={{ background: 'linear-gradient(135deg, #A78BFA, #5B21B6)' }}
        >
          {user.firstName[0]}
        </div>

        <div className="pt-[34px] px-[18px] pb-[18px]">
          <b className="text-[14.5px] font-semibold text-[#14111C]">
            {user.firstName} {user.lastName}
          </b>
          <span className="block text-[12px] text-[#6B6577] mt-0.5">{user.email}</span>
        </div>
      </div>

      {/* Bank cards stack */}
      {banks?.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="text-[13.5px] font-semibold text-[#14111C]">My Cards</h3>
            <Link href="/my-banks" className="text-[12px] text-[#7C3AED] font-medium hover:underline">
              Manage →
            </Link>
          </div>
          <div className="relative" style={{ height: banks.length > 1 ? 210 + (banks.length - 1) * 18 : 185 }}>
            {(banks as Account[]).map((bank, i) => (
              <div
                key={bank.appwriteItemId}
                className="absolute left-0 right-0 transition-transform duration-300"
                style={{
                  top: i * 18,
                  zIndex: banks.length - i,
                  transform: i > 0 ? `scale(${1 - i * 0.04})` : undefined,
                  opacity: i === 0 ? 1 : 1 - i * 0.05,
                  transformOrigin: 'top center',
                }}
              >
                <BankCard
                  account={bank}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top categories */}
      {categories.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3.5">
            <h3 className="text-[13.5px] font-semibold text-[#14111C]">Top Categories</h3>
            <span className="text-[12px] text-[#6B6577]">This month</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {categories.map(cat => (
              <Category key={cat.name} category={cat} />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

export default RightSidebar
