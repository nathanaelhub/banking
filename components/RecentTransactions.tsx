import Link from 'next/link'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )

  return (
    <section className="flex flex-col gap-[18px]">
      <div className="bg-white border border-[#ECEAE3] rounded-[16px] shadow-[0_1px_2px_rgba(20,17,28,.04)]">
        <div className="flex items-center justify-between px-[18px] pt-4 pb-1.5">
          <div>
            <h3 className="text-[14.5px] font-semibold text-[#14111C]">Recent Transactions</h3>
            <p className="text-[12px] text-[#6B6577] mt-0.5">Across all accounts</p>
          </div>
          <Link
            href={`/transaction-history/?id=${appwriteItemId}`}
            className="text-[12.5px] font-medium text-[#6B6577] hover:text-[#14111C] border border-[#E3E1DA] rounded-[8px] px-3 py-1.5 bg-white hover:bg-[#F4F3EE] transition-colors"
          >
            View all →
          </Link>
        </div>

        <TransactionsTable transactions={currentTransactions} />

        {totalPages > 1 && (
          <div className="px-[18px] py-4 border-t border-[#ECEAE3]">
            <Pagination totalPages={totalPages} page={page} />
          </div>
        )}
      </div>
    </section>
  )
}

export default RecentTransactions
