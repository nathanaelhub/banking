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
        backgroundColor: '#10B981',
        borderRadius: 6,
        borderSkipped: false as const,
      },
      {
        label: 'Expenses',
        data: expenses,
        backgroundColor: '#7C3AED',
        borderRadius: 6,
        borderSkipped: false as const,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number } }) =>
            `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) =>
            `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:p-6">
      <h2 className="header-2">Spending Overview</h2>
      <Bar data={data} options={options} />
    </section>
  );
};

export default SpendingChart;
