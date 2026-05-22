import { formatAmount } from '@/lib/utils'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance
}: TotalBalanceBoxProps) => {
  const dotColors = ['#7C3AED', '#A78BFA', '#5B21B6', '#6D28D9', '#8B5CF6']

  return (
    <section className="bg-white border border-[#ECEAE3] rounded-[16px] shadow-[0_1px_2px_rgba(20,17,28,.04)] p-[22px]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-medium text-[#6B6577] uppercase tracking-[.08em] mb-1.5">
            Total balance · {totalBanks} {totalBanks === 1 ? 'account' : 'accounts'}
          </div>
          <div
            className="text-[34px] font-medium tracking-[-0.02em] text-[#14111C]"
            style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
          >
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
        <div className="flex-shrink-0">
          <DoughnutChart accounts={accounts} />
        </div>
      </div>

      {accounts.length > 0 && (
        <>
          <div className="h-px bg-[#ECEAE3] my-[14px]" />
          <div className="grid grid-cols-3 gap-2.5">
            {accounts.map((a, i) => (
              <div key={a.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: dotColors[i % dotColors.length] }}
                  />
                  <span className="text-[12px] font-medium text-[#14111C] truncate">{a.name}</span>
                </div>
                <div
                  className="text-[15px] font-medium tracking-[-0.01em] text-[#14111C]"
                  style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
                >
                  {formatAmount(a.currentBalance)}
                </div>
                <div className="text-[11px] text-[#6B6577]">
                  {a.subtype} · •• {a.mask}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default TotalBalanceBox
