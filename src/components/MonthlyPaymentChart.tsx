import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useComparison } from '@/hooks/useComparison';

// Register required components for Line chart
ChartJS.register(
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale
);

const MonthlyPaymentChart: React.FC = () => {
  const loanTerms = Array.from({ length: 31 }, (_, i) => i); // 0 to 30 years
  const { principleAmount, annualInterestRate } = useComparison();
  const interestRates = [annualInterestRate]; // Predefined interest rates to plot lines

  const calculateMonthlyPayment = (
    loanTerm: number,
    interestRate: number
  ): number => {
    const principal = principleAmount; // Example loan amount
    const monthlyRate = interestRate / 12 / 100;
    const numPayments = loanTerm * 12;

    if (interestRate === 0) return principal / numPayments;

    return (
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numPayments))
    );
  };

  // Generate data for each line (interest rate)
  const datasets = interestRates.map((rate) => {
    const data = loanTerms.map((term) =>
      term === 0 ? 0 : calculateMonthlyPayment(term, rate)
    );

    return {
      label: `${rate}% Interest Rate`,
      data: data,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      tension: 0.4, // Smooth curve
      pointRadius: 3,
    };
  });

  const chartData = {
    labels: loanTerms, // X-axis: Loan terms in years
    datasets: datasets, // Y-axis: Monthly payment values
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: 'Monthly Payment vs Loan Term',
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Adjust font size for mobile screens
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Loan Term (Years)',
        },
        ticks: {
          stepSize: 5,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Monthly Payment ($)',
        },
      },
    },
  };

  return (
    <div className='flex w-full h-full'>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyPaymentChart;
