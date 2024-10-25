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
import { useTheme } from '@/hooks/useTheme';

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

interface HousingComparisonChartProps {
	rentData: number[];
	houseValueAfterAppreciationData: number[];
	moneyMadeFromSellingHouse: number[];
	bondData: number[];
	sellingYear: number;
}

const HousingComparisonChart: React.FC<HousingComparisonChartProps> = ({
	rentData,
	houseValueAfterAppreciationData,
	moneyMadeFromSellingHouse,
	bondData,
	sellingYear,
}) => {
	const { theme } = useTheme();
	const labels = rentData.map((_, index) => `Year ${index}`);

  // Find break even year looking for first index where value is more than 0
  const breakEvenYear = moneyMadeFromSellingHouse.findIndex((value) => value > 0);

	const data = {
		labels,
		datasets: [
			{
				label: 'Rent Cost',
				data: rentData,
				borderColor:
					theme === 'light'
						? 'rgba(75, 192, 192, 1)'
						: 'rgba(75, 192, 192, 0.6)',
				backgroundColor:
					theme === 'light'
						? 'rgba(75, 192, 192, 0.2)'
						: 'rgba(75, 192, 192, 0.1)',
			},
			{
				label: 'House Value After Appreciation',
				data: houseValueAfterAppreciationData,
				borderColor:
					theme === 'light'
						? 'rgba(255, 159, 64, 1)'
						: 'rgba(255, 159, 64, 0.6)',
				backgroundColor:
					theme === 'light'
						? 'rgba(255, 159, 64, 0.2)'
						: 'rgba(255, 159, 64, 0.1)',
				fill: false,
			},
			{
				label: 'Money Made From Selling House',
				data: moneyMadeFromSellingHouse,
				borderColor:
					theme === 'light'
						? 'rgba(255, 99, 132, 1)'
						: 'rgba(255, 99, 132, 0.6)',
				backgroundColor:
					theme === 'light'
						? 'rgba(255, 99, 132, 0.2)'
						: 'rgba(255, 99, 132, 0.1)',
				fill: false,
			},
			{
				label: 'Bond Cost',
				data: bondData,
				borderColor:
					theme === 'light'
						? 'rgba(255, 99, 132, 1)'
						: 'rgba(255, 99, 132, 0.6)',
				backgroundColor:
					theme === 'light'
						? 'rgba(255, 99, 132, 0.2)'
						: 'rgba(255, 99, 132, 0.1)',
				fill: false,
			},
		],
	};

	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
				labels: {
					color: theme === 'light' ? 'black' : 'white',
				},
			},
			title: {
				display: false,
				text: 'Housing Cost Comparison',
				color: theme === 'light' ? 'black' : 'white',
			},
			annotation: {
				annotations: [
					sellingYear !== null && {
						type: 'line',
						scaleID: 'x',
						value: sellingYear,
						borderColor:
							moneyMadeFromSellingHouse[sellingYear] > 0
								? 'rgba(75, 255, 140, 0.6)'
								: 'rgba(255, 50, 50, 0.6)',
						borderWidth: 2,
						label: {
							display: true,
							content:
								moneyMadeFromSellingHouse[sellingYear] > 0 ? 'Gain' : 'Loss',
							position: 'start',
							backgroundColor:
								moneyMadeFromSellingHouse[sellingYear] > 0
									? 'rgba(75, 255, 140, 0.6)'
									: 'rgba(255, 50, 50, 0.6)',
						},
					},
          //Show the breakeven year as a vertical line annotation
          breakEvenYear !== null && {
						type: 'line',
						scaleID: 'x',
						value: breakEvenYear,
						borderColor: 'rgba(150, 150, 150, 0.6)',
						borderWidth: 2,
						label: {
							display: true,
							content:'Br Even',
							position: 'start',
							backgroundColor: 'rgba(150, 150, 150, 0.6)',
						},
					},

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				].filter(Boolean) as any,
			},
		},
		scales: {
			x: {
				ticks: {
					color: theme === 'light' ? 'black' : 'white',
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
				ticks: {
					color: theme === 'light' ? 'black' : 'white',
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
