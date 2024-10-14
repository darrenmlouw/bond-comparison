import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import SalaryContext from '@/contexts/SalaryContext';
import { calculateTax } from '@/utils/incomeTaxCalculations'; 
import ThemeContext from '@/contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const TaxComparisonChart: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { year, grossMonthlyIncome, age, deductions } = useContext(SalaryContext);

  const grossAnnualIncome = grossMonthlyIncome * 12;
  const annualDeductions = deductions * 12;
  const netIncome = grossAnnualIncome - annualDeductions
  const labels = Array.from({ length: 21 }, (_, i) => i * 100000);

  const data = {
    labels,
    datasets: [
      {
        label: '2024',
        data: labels.map((income) => calculateTax(income, age, year)),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
      },
      {
        label: '2023',
        data: labels.map((income) => calculateTax(income, age, 2023)),
        borderColor: 'rgba(255, 159, 64, 0.4)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
      },
      {
        label: '2022',
        data: labels.map((income) => calculateTax(income, age, 2022)),
        borderColor: 'rgba(255, 159, 64, 0.3)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
      },
      {
        label: '2021',
        data: labels.map((income) => calculateTax(income, age, 2021)),
        borderColor: 'rgba(255, 159, 64, 0.2)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
      },
      {
        label: '2020',
        data: labels.map((income) => calculateTax(income, age, 2020)),
        borderColor: 'rgba(255, 159, 64, 0.1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
      }
    ],
  };

  const abbreviateNumber = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(0) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
    return value;
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Adjust font size for mobile screens
          },
        },
      },
      annotation: {
        annotations: [
          netIncome !== null && {
            type: 'line',
            scaleID: 'x',
            value: netIncome,
            borderColor: 'grey',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              display: true,
              content: `Net Income: R${abbreviateNumber(netIncome)}`,
              position: 'start',
              backgroundColor: `${theme === 'dark' ? '#ffffff90' : '#00000090'}`,
              color: `${theme === 'dark' ? '#000000d0' : '#ffffffd0'}`,
            },
            // drawTime: 'beforeDatasetsDraw',
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].filter(Boolean) as any,
      },
    },
    scales: {
  x: {
    type: 'linear',  // Set the x-axis to a linear scale
    title: {
      display: true,
      text: 'Income (R)',
      font: {
        size: window.innerWidth < 768 ? 10 : 14,
      },
    },
    min: 0,  // Ensure x-axis starts from 0 to prevent negative values
    ticks: {
      callback: (value) => abbreviateNumber(value as number),  // Abbreviate x-axis labels
      autoSkip: true,  // Automatically skip some labels if space is tight
      maxTicksLimit: window.innerWidth < 768 ? 5 : 10,  // Adjust tick number based on screen size
      font: {
        size: window.innerWidth < 768 ? 10 : 12,
      },
    },
  },
  y: {
    title: {
      display: true,
      text: 'Tax Paid (R)',
      font: {
        size: window.innerWidth < 768 ? 10 : 14,
      },
    },
    beginAtZero: true,  // Start y-axis at 0
    ticks: {
      callback: (value) => abbreviateNumber(value as number),  // Abbreviate y-axis labels
      font: {
        size: window.innerWidth < 768 ? 10 : 12,
      },
    },
    grid: {
      display: window.innerWidth >= 768,
    },
  },
},
  };

  return <Line data={data} options={options} />;
};

export default TaxComparisonChart;
