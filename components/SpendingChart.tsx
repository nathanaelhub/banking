'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingChart = ({ transactions }: { transactions: Transaction[] }) => {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      label: d.toLocaleString('default', { month: 'short', year: '2-digit' }),
      year: d.getFullYear(),
      month: d.getMonth(),
    };
  });

  const income = months.map(({ year, month }) =>
    transactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getFullYear() === year && d.getMonth() === month && t.amount > 0;
      })
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const expenses = months.map(({ year, month }) =>
    transactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getFullYear() === year && d.getMonth() === month && t.amount < 0;
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  );

  const data = {
    labels: months.map((m) => m.label),
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: '#7C3AED',
        borderRadius: 6,
        borderSkipped: false as const,
      },
      {
        label: 'Expenses',
        data: expenses,
        backgroundColor: '#E5DDF5',
        borderRadius: 6,
        borderSkipped: false as const,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 12 },
          color: '#6B6577',
          boxWidth: 10,
          boxHeight: 10,
          borderRadius: 3,
        },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: '#14111C',
        titleColor: '#fff',
        bodyColor: 'rgba(255,255,255,.75)',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number } }) =>
            `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B6577', font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#F4F3EE' },
        ticks: {
          color: '#6B6577',
          font: { size: 11 },
          callback: (value: string | number) =>
            `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <section className="bg-white border border-[#ECEAE3] rounded-[16px] shadow-[0_1px_2px_rgba(20,17,28,.04)]">
      <div className="flex items-center justify-between px-[18px] pt-4 pb-1.5">
        <div>
          <h3 className="text-[14.5px] font-semibold tracking-[-0.005em] text-[#14111C]">
            Spending Overview
          </h3>
          <p className="text-[12px] text-[#6B6577] mt-0.5">Income vs Expenses · last 6 months</p>
        </div>
      </div>
      <div className="px-[18px] pb-[18px]">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default SpendingChart;
