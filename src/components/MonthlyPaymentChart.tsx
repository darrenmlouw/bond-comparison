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
import { useTheme } from '@/hooks/useTheme';
import { formatNumber } from '@/utils/formatNumber';

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
  const { theme } = useTheme();
  const { principleAmount, annualInterestRate, loanTermYears, monthlyPayment } =
    useComparison();

  const loanTerms = Array.from({ length: loanTermYears > 30 ? loanTermYears + 10 : 30 }, (_, i) => i);
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
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
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
      borderColor: `rgba(150,150,220, 1)`,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      tension: 0.4,
      pointRadius: 1,
      borderWidth: 2,
      pointHoverRadius: 6,
      pointHitRadius: 6,
    };
  });

  const chartData = {
    labels: loanTerms, // X-axis: Loan terms in years
    datasets: datasets, // Y-axis: Monthly payment values
  };

  const abbreviateNumber = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
    // also abbreviate negative numbers
    if (value <= -1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value <= -1000) return (value / 1000).toFixed(0) + 'K';
    return value;
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
          color: theme === 'light' ? 'black' : 'white',
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Adjust font size for mobile screens
          },
        },
      },
      annotation: {
        annotations: [
          loanTermYears !== null && {
            type: 'line',
            scaleID: 'x',
            value: loanTermYears,
            borderColor: 'grey',
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: `${formatNumber(loanTermYears)} Yrs`,
              position: 'start',
              backgroundColor: `${
                theme === 'dark' ? '#ffffff90' : '#00000090'
              }`,
              color: `${theme === 'dark' ? '#000000d0' : '#ffffffd0'}`,
            },
            // xMin: loanTermYears,
            // xMax: loanTermYears,
            // yMin: 0,
            // yMax: tax,
          },
          monthlyPayment !== null && {
            type: 'line',
            // scaleID: 'y',
            value: monthlyPayment,
            borderColor: 'grey',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              display: true,
              content: `R${formatNumber(monthlyPayment)}/m`,
              position: 'start',
              backgroundColor: `${
                theme === 'dark' ? '#ffffff80' : '#00000090'
              }`,
              color: `${theme === 'dark' ? '#000000d0' : '#ffffffd0'}`,
            },
            yMin: monthlyPayment,
            yMax: monthlyPayment,
            xMin: 0,
            xMax: loanTermYears,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].filter(Boolean) as any,
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
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Monthly Payment ($)',
        },
        ticks: {
          callback: (value) => abbreviateNumber(value as number),
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex w-full h-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyPaymentChart;
