import React from 'react';
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
import { useSalary } from '@/hooks/useSalary';
import { calculateTax } from '@/utils/incomeTaxCalculations';
import { useTheme } from '@/hooks/useTheme';
import TAX_BRACKETS from '@/constants/TAX_BRACKETS'; // Assuming TAX_BRACKETS contains all the available years

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
  const { theme } = useTheme();
  const { year, age, grossAnnualIncome, annualDeductions } = useSalary();

  const LABEL_COUNT = 50; // Change this value to adjust the length of labels array

  const netIncome = grossAnnualIncome - annualDeductions;
  const tax = calculateTax(grossAnnualIncome, annualDeductions, age, year);

  const bracket = TAX_BRACKETS[year];
  const maxLowerBound = bracket[bracket.length - 1].lower * 1.1;

  const lowerBound = 0;
  const movingUpperBound =
    Math.ceil(Number((netIncome / 100000).toFixed(0))) * 1.1;
  const upperBound = Math.max(
    Math.ceil(Number((maxLowerBound / 100000).toFixed(0))),
    movingUpperBound
  );

  // Calculate the step to ensure LABEL_COUNT labels
  const step = ((upperBound - lowerBound) * 100000) / (LABEL_COUNT - 1);

  // Create the labels array with LABEL_COUNT points
  const labels = Array.from(
    { length: LABEL_COUNT },
    (_, i) => lowerBound * 100000 + i * step
  );

  const datasets = Object.keys(TAX_BRACKETS).map((taxYear) => {
    const isCurrentYear = parseInt(taxYear) === year;

    return {
      label: taxYear,
      data: labels.map((income) =>
        calculateTax(income, 0, age, parseInt(taxYear))
      ),
      borderColor: isCurrentYear
        ? 'rgba(255, 159, 64, 1.0)'
        : 'rgba(255, 159, 64, 0.2)', // Solid for selected year
      backgroundColor: isCurrentYear
        ? 'rgba(255, 159, 64, 1.0)'
        : 'rgba(255, 159, 64, 0.2)', // Opacity for other years
      borderWidth: isCurrentYear ? 2 : 1,
      pointRadius: isCurrentYear ? 0.5 : 0,
      pointHoverRadius: isCurrentYear ? 3 : 0,
      pointHitRadius: 5,
    };
  });

  const abbreviateNumber = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
    // also abbreviate negative numbers
    if (value <= -1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value <= -1000) return (value / 1000).toFixed(0) + 'K';
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
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: `R${abbreviateNumber(netIncome)}`,
              position: 'start',
              backgroundColor: `${
                theme === 'dark' ? '#ffffff90' : '#00000090'
              }`,
              color: `${theme === 'dark' ? '#000000d0' : '#ffffffd0'}`,
            },
            // xMin: netIncome,
            // xMax: netIncome,
            // yMin: 0,
            // yMax: tax,
          },
          tax !== null && {
            type: 'line',
            // scaleID: 'y',
            value: tax,
            borderColor: 'grey',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              display: true,
              content: `R${abbreviateNumber(tax)}`,
              position: 'start',
              backgroundColor: `${
                theme === 'dark' ? '#ffffff80' : '#00000090'
              }`,
              color: `${theme === 'dark' ? '#000000d0' : '#ffffffd0'}`,
            },
            yMin: tax,
            yMax: tax,
            xMin: 0,
            xMax: netIncome,
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].filter(Boolean) as any,
      },
    },
    scales: {
      x: {
        type: 'linear', // Set the x-axis to a linear scale
        title: {
          display: true,
          text: 'Income (R)',
        },
        min: lowerBound * 100000,
        max: upperBound * 100000,
        ticks: {
          callback: (value) => abbreviateNumber(value as number), // Abbreviate x-axis labels
          autoSkip: true, // Automatically skip some labels if space is tight
          maxTicksLimit: window.innerWidth < 768 ? 5 : 10, // Adjust tick number based on screen size
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Tax Paid (R)',
        },
        beginAtZero: true, // Start y-axis at 0
        // min:Math.min(...datasets.map((dataset) => Math.min(...dataset.data))),
        // max:Math.max(...datasets.map((dataset) => Math.max(...dataset.data))),
        ticks: {
          callback: (value) => abbreviateNumber(value as number), // Abbreviate y-axis labels
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        grid: {
          display: false
        }
      },
    },
  };

  return <Line data={{ labels, datasets }} options={options} />;
};

export default TaxComparisonChart;
