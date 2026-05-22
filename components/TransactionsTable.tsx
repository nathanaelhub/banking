import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"

// Status → badge tone map
const statusToneMap: Record<string, string> = {
  Success: 'apex-badge-green',
  Processing: 'apex-badge-amber',
  Failed: 'apex-badge-red',
}

// Category → badge tone map
const categoryToneMap: Record<string, string> = {
  'Food and Drink': 'apex-badge-blue',
  Travel: 'apex-badge-violet',
  Payment: 'apex-badge-green',
  'Bank Fees': 'apex-badge-amber',
  Transfer: 'apex-badge-violet',
  default: 'apex-badge-gray',
}

const StatusBadge = ({ status }: { status: string }) => {
  const tone = statusToneMap[status] ?? 'apex-badge-gray'
  return (
    <span className={cn('apex-badge', tone)}>
      {status}
    </span>
  )
}

const CategoryBadge = ({ category }: { category: string }) => {
  const tone = categoryToneMap[category] ?? categoryToneMap.default
  return (
    <span className={cn('apex-badge', tone)}>
      {category}
    </span>
  )
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#FAFAF7] border-b border-[#ECEAE3] hover:bg-[#FAFAF7]">
          <TableHead className="px-[18px] py-3 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6577]">
            Transaction
          </TableHead>
          <TableHead className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6577]">
            Amount
          </TableHead>
          <TableHead className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6577]">
            Status
          </TableHead>
          <TableHead className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6577]">
            Date
          </TableHead>
          <TableHead className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6577] max-md:hidden">
            Channel
          </TableHead>
          <TableHead className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[.07em] text-[#6B6577] max-md:hidden">
            Category
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date))
          const amount = formatAmount(t.amount)
          const isDebit = t.type === 'debit'
          const isCredit = t.type === 'credit'
          const isNegative = isDebit || amount[0] === '-'

          return (
            <TableRow
              key={t.id}
              className="border-b border-[#ECEAE3] hover:bg-[#FAFAF7] transition-colors"
            >
              <TableCell className="px-[18px] py-3 max-w-[220px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-semibold text-[#14111C] truncate">
                    {removeSpecialCharacters(t.name)}
                  </span>
                  <span className="text-[11.5px] text-[#A39FAE] capitalize truncate">
                    {t.category}
                  </span>
                </div>
              </TableCell>

              <TableCell className="px-3 py-3">
                <span
                  className={cn(
                    'text-[13px] font-semibold',
                    isNegative ? 'text-[#C5304A]' : 'text-[#1F8A5B]'
                  )}
                  style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
                >
                  {isDebit ? `-${amount}` : isCredit ? amount : amount}
                </span>
              </TableCell>

              <TableCell className="px-3 py-3">
                <StatusBadge status={status} />
              </TableCell>

              <TableCell className="px-3 py-3 min-w-[120px]">
                <span className="text-[12.5px] text-[#6B6577]">
                  {formatDateTime(new Date(t.date)).dateTime}
                </span>
              </TableCell>

              <TableCell className="px-3 py-3 capitalize min-w-[90px] max-md:hidden">
                <span className="text-[12.5px] text-[#6B6577]">{t.paymentChannel}</span>
              </TableCell>

              <TableCell className="px-3 py-3 max-md:hidden">
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionsTable
