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
  const { year, grossMonthlyIncome, age } = useContext(SalaryContext);

  const income = grossMonthlyIncome * 12;
  const taxThreshold = calculateTax(income, age, year); // Tax threshold is calculated for 0 income
  const labels = Array.from({ length: 21 }, (_, i) => i * 100000);

  const data = {
    labels,
    datasets: [
      {
        label: 'Tax Paid',
        data: labels.map((income) => calculateTax(income, age, year)),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
      },
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
            size: window.innerWidth < 768 ? 10 : 14, // Adjusts font size for mobile screens
          },
        },
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: taxThreshold,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: `Tax Threshold (R${taxThreshold.toLocaleString()})`,
              position: 'start',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              color: 'black',
            },
          },
        ],
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Income (R)',
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Adjust font size for smaller screens
          },
        },
        ticks: {
          autoSkip: true, // Automatically skip labels for smaller screens
          maxTicksLimit: window.innerWidth < 768 ? 5 : 10, // Limit the number of ticks on mobile
          maxRotation: window.innerWidth < 768 ? 45 : 0, // Rotate labels on mobile for readability
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Font size adjustment for mobile
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tax Paid (R)',
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Adjust font size for smaller screens
          },
        },
        beginAtZero: true,
        ticks: {
          callback: (value) => abbreviateNumber(value as number), // Abbreviates the labels on the y-axis
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Font size adjustment for mobile
          },
        },
        grid: {
          display: window.innerWidth >= 768, // Optionally hide gridlines on mobile for less clutter
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TaxComparisonChart;
