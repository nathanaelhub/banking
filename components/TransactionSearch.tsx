'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import TransactionsTable from './TransactionsTable';
import { exportTransactionsToCSV } from '@/lib/utils';

const ROWS_PER_PAGE = 10;

const TransactionSearch = ({ transactions }: { transactions: Transaction[] }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return Array.from(cats).sort();
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        !search || t.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || t.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const currentTransactions = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const resetPage = () => setPage(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap gap-3">
          <div className="relative min-w-[200px] max-w-[300px] flex-1">
            <Image
              src="/icons/search.svg"
              alt="search"
              width={16}
              height={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              className="input-class h-10 w-full pl-9 pr-3 text-14"
            />
          </div>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              resetPage();
            }}
            className="input-class h-10 min-w-[160px] cursor-pointer bg-white px-3 text-14"
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => exportTransactionsToCSV(filtered)}
          className="flex items-center gap-2 rounded-[8px] border border-[#E3E1DA] px-3.5 py-2 text-[12.5px] font-medium text-[#3A3547] transition-colors hover:bg-[#F4F3EE] bg-white"
        >
          <Image src="/icons/arrow-down.svg" alt="export" width={16} height={16} />
          Export CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16">
          <p className="text-[16px] font-semibold text-[#14111C]">No transactions found</p>
          <p className="text-[13.5px] text-[#6B6577]">Try adjusting your search or filter</p>
        </div>
      ) : (
        <>
          <p className="text-[12.5px] text-[#6B6577]">
            {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="bg-white border border-[#ECEAE3] rounded-[16px] shadow-[0_1px_2px_rgba(20,17,28,.04)] overflow-hidden">
            <TransactionsTable transactions={currentTransactions} />
          </div>
          {totalPages > 1 && (
            <div className="my-2 flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="flex items-center gap-2 text-[13px] font-medium text-[#3A3547] disabled:opacity-40 border border-[#E3E1DA] rounded-[8px] px-3 py-1.5 bg-white hover:bg-[#F4F3EE] transition-colors"
              >
                <Image src="/icons/arrow-left.svg" alt="prev" width={16} height={16} />
                Prev
              </button>
              <p className="text-[12.5px] text-[#6B6577]">
                {currentPage} / {totalPages}
              </p>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-2 text-[13px] font-medium text-[#3A3547] disabled:opacity-40 border border-[#E3E1DA] rounded-[8px] px-3 py-1.5 bg-white hover:bg-[#F4F3EE] transition-colors"
              >
                Next
                <Image
                  src="/icons/arrow-left.svg"
                  alt="next"
                  width={16}
                  height={16}
                  className="-scale-x-100"
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionSearch;
