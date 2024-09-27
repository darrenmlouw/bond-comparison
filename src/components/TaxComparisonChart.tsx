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
import { calculateTax } from '@/utils/incomeTaxCalculations'; // Assuming this is the correct path to your functions

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

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
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
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tax Paid (R)',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TaxComparisonChart;
