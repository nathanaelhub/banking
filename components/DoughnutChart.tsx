"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance);

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: ['#7C3AED', '#A78BFA', '#5B21B6', '#6D28D9', '#8B5CF6'],
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 6,
      }
    ],
    labels: accountNames
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: '72%',
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#14111C',
            titleColor: '#FFFFFF',
            bodyColor: '#A39FAE',
            padding: 10,
            displayColors: false,
            cornerRadius: 8,
          },
        },
      }}
    />
  );
};

export default DoughnutChart
