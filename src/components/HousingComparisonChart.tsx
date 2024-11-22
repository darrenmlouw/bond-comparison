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
import { useTheme } from '@/hooks/useTheme';
import { useComparison } from '@/hooks/useComparison';

function interpolateData(data: number[], factor: number): number[] {
  const interpolatedData: number[] = [];
  for (let i = 0; i < data.length - 1; i++) {
    interpolatedData.push(data[i]);
    for (let j = 1; j < factor; j++) {
      const interpolatedValue =
        data[i] + ((data[i + 1] - data[i]) * j) / factor;
      interpolatedData.push(interpolatedValue);
    }
  }
  interpolatedData.push(data[data.length - 1]);
  return interpolatedData;
}

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

const HousingComparisonChart = () => {
  const { theme } = useTheme();
  const { rentData, moneyMadeFromSellingHouse, yearOfSale = 0 } = useComparison();
  
  const interpolationFactor = 10;
  const interpolatedRentData = interpolateData(rentData, interpolationFactor);
  const interpolatedHouseData = interpolateData(
    moneyMadeFromSellingHouse,
    interpolationFactor
  );

  const labels = interpolatedRentData.map(
    (_, index) => `Year ${(index / interpolationFactor).toFixed(1)}`
  );

  const breakEvenYear = interpolatedHouseData.findIndex((value) => value > 0);
  const yearWhenHouseValueExceedsRent = interpolatedHouseData.findIndex(
    (value, index) => value > interpolatedRentData[index]
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Rent Cost',
        data: interpolatedRentData,
        borderColor:
          theme === 'light'
            ? 'rgba(255, 99, 132, 1)'
            : 'rgba(255, 99, 132, 0.6)',
        backgroundColor:
          theme === 'light'
            ? 'rgba(255, 99, 132, 0.2)'
            : 'rgba(255, 99, 132, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointHitRadius: 5,
      },
      {
        label: 'Money Made From Selling House',
        data: interpolatedHouseData,
        borderColor:
          theme === 'light'
            ? 'rgba(132, 99, 210, 1)'
            : 'rgba(132, 99, 210, 0.6)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointHitRadius: 5,
      },
    ],
  };

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
        position: 'bottom' as const,
        labels: {
          color: theme === 'light' ? 'black' : 'white',
          font: {
            size: window.innerWidth < 768 ? 10 : 14, // Adjust font size for mobile screens
          },
        },
      },
      title: {
        display: false,
        text: 'Housing Cost Comparison',
        color: theme === 'light' ? 'black' : 'white',
      },
      annotation: {
        annotations: [
          yearOfSale !== null && {
            type: 'line',
            scaleID: 'x',
            value: yearOfSale * interpolationFactor,
            borderColor:
              moneyMadeFromSellingHouse[yearOfSale] > 0
                ? 'rgba(75, 255, 140, 0.6)'
                : 'rgba(255, 80, 80, 0.6)',
            borderDash: [5, 5],
            borderWidth: 1,
            label: {
              display: true,
              content:
                moneyMadeFromSellingHouse[yearOfSale] >= 0 ? 'Profit' : 'Loss',
              position: 'start',
              backgroundColor:
                moneyMadeFromSellingHouse[yearOfSale] > 0
                  ? 'rgba(75, 255, 140, 0.1)'
                  : 'rgba(255, 50, 50, 0.1)',
              borderWidth: 1,
              borderColor:
                moneyMadeFromSellingHouse[yearOfSale] > 0
                  ? 'rgba(75, 255, 140, 0.6)'
                  : 'rgba(255, 50, 50, 0.6)',
              // change font size based on screen size
              font: {
                size: window.innerWidth < 768 ? 8 : 12,
              },
              padding: {
                top: 3,
                bottom: 3,
                left: 5,
                right: 5,
              },
            },
          },
          //Show the breakeven year as a vertical line annotation
          breakEvenYear !== null && {
            type: 'line',
            scaleID: 'x',
            value: breakEvenYear,
            borderColor: 'rgba(150, 150, 150, 0.6)',
            borderDash: [5, 5],
            borderWidth: 1,
            label: {
              display: true,
              content: 'Br Even',
              position: 'end',
              backgroundColor: 'rgba(150, 150, 150, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(150, 150, 150, 0.6)',
              font: {
                size: window.innerWidth < 768 ? 9 : 12,
              },
              padding: {
                top: 3,
                bottom: 3,
                left: 5,
                right: 5,
              },
            },
          },
          yearWhenHouseValueExceedsRent !== null && {
            type: 'line',
            scaleID: 'x',
            value: yearWhenHouseValueExceedsRent,
            borderColor: 'rgba(255, 255, 0, 0.6)',
            borderDash: [5, 5],
            borderWidth: 1,
            label: {
              display: true,
              content: 'House > Rent',
              position: 'end',
              backgroundColor: 'rgba(255, 255, 0, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 0, 0.6)',
              font: {
                size: window.innerWidth < 768 ? 9 : 12,
              },
              padding: {
                top: 3,
                bottom: 3,
                left: 5,
                right: 5,
              },
            },
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].filter(Boolean) as any,
      },
    },
    scales: {
      x: {
        min: 0,
        max: labels.length - 1,
        ticks: {
          callback: (value) =>
            abbreviateNumber((value as number) / interpolationFactor), // Abbreviate x-axis labels
          autoSkip: true, // Automatically skip some labels if space is tight
          maxTicksLimit: window.innerWidth < 768 ? 6 : 21, // Adjust tick number based on screen size
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        grid: {
          color:
            theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        display: true,
        type: 'linear',
        title: {
          display: false,
          font: {
            size: window.innerWidth < 768 ? 10 : 14,
          },
        },
        ticks: {
          callback: (value) => abbreviateNumber(value as number), // Abbreviate y-axis labels
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        grid: {
          color:
            theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HousingComparisonChart;
