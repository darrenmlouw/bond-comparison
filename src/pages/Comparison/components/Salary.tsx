import React, { useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SalaryContext from '@/contexts/SalaryContext';
import {
	calculateTax,
	getTaxBracket,
	getTaxRebate,
} from '@/utils/incomeTaxCalculations';

const Salary: React.FC = () => {
	const {
		grossMonthlyIncome,
		setGrossMonthlyIncome,
		deductions,
		setDeductions,
		age,
		setAge,
		year,
		setYear,
	} = useContext(SalaryContext);

	const netAnnualIncome = grossMonthlyIncome * 12 - deductions * 12;

	const tax = calculateTax(netAnnualIncome, age, year);
	const taxBracket = getTaxBracket(netAnnualIncome, year);
	const taxRebate = getTaxRebate(age, year);

	return (
		<div>
			<h2 className="text-xl font-bold text-primary">Annual Income and Tax</h2>

			<form className="flex flex-col space-y-4">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex flex-col space-y-2 w-full md:w-1/3">
						<div className="relative flex items-center">
							<div className="flex-shrink mr-2 border-[1px] bg-accent bg-opacity-100 rounded-full p-0.5 px-2 text-xs text-accent-foreground">
								Bond
							</div>
							<div className="flex-grow border-t text-accent"></div>
						</div>

						<div className="flex flex-row w-full gap-2">
							<div className="flex flex-col w-1/2 gap-1.5">
								<Label htmlFor="income" className="text-sm ">
									Gross Monthly Income
								</Label>
								<Input
									type="number"
									id="income"
									name="income"
									placeholder="Enter your annual income"
									value={grossMonthlyIncome}
									onChange={(e) =>
										setGrossMonthlyIncome(parseFloat(e.target.value))
									}
								/>
							</div>

							<div className="flex flex-col w-1/2 gap-1.5">
								<Label htmlFor="tax" className="text-sm ">
									Deductions Before Tax
								</Label>
								<Input
									type="number"
									id="tax"
									name="tax"
									placeholder="Enter your tax rate"
									value={deductions}
									step={0.01}
									onChange={(e) => setDeductions(parseFloat(e.target.value))}
								/>
							</div>
						</div>

						<div className="flex flex-row w-full gap-2">
							<div className="flex flex-col w-1/2 gap-1.5">
								<Label htmlFor="age" className="text-sm ">
									Age
								</Label>
								<Input
									type="number"
									id="age"
									name="age"
									placeholder="Age"
									value={age}
									onChange={(e) => setAge(parseFloat(e.target.value))}
								/>
							</div>

							<div className="flex flex-col w-1/2 gap-1.5">
								<Label htmlFor="year" className="text-sm">
									Year
								</Label>
								<Input
									type="number"
									id="year"
									name="year"
									placeholder="Year"
									value={year}
									onChange={(e) => setYear(parseFloat(e.target.value))}
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-col space-y-6 bg-card shadow-2xl p-4 rounded-xl max-h-full content-between w-full md:w-2/3 justify-between">
						<div className="flex flex-row justify-between">
							<div className="flex flex-col justify-between items-start">
								<div className="flex flex-row items-center">
									<p className="text-md sm:text-md sm:text-lg">
										Gross Annual Income
									</p>
								</div>

								<p className="text-2xl sm:text-3xl font-light tracking-wide text-yellow-500">
									R{' '}
									{new Intl.NumberFormat('en-ZA', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(grossMonthlyIncome * 12)}
								</p>
							</div>
						</div>

						<div className="flex flex-row justify-between">
							<div className="flex flex-col justify-between items-start">
								<div className="flex flex-row items-center">
									<p className="text-md sm:text-lg">Annual Tax Deductables</p>
								</div>

								<p className="text-2xl sm:text-3xl font-light tracking-wide text-red-500">
									R{' '}
									{new Intl.NumberFormat('en-ZA', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(deductions * 12)}
								</p>
							</div>
						</div>

						<div className="flex flex-row justify-between">
							<div className="flex flex-col justify-between items-start">
								<div className="flex flex-row items-center">
									<p className="text-md sm:text-lg">Net Annual Income</p>
								</div>

								<p className="text-2xl sm:text-3xl font-light tracking-wide text-green-500">
									R{' '}
									{new Intl.NumberFormat('en-ZA', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(grossMonthlyIncome * 12 - deductions * 12)}
								</p>
							</div>
						</div>

						<div className="flex flex-row justify-between">
							<div className="flex flex-col justify-between items-start">
								<div className="flex flex-row items-center">
									<p className="text-md sm:text-lg">Tax Bracket</p>
								</div>

								<p className="text-xl font-light tracking-wide">
									R{' '}
									{new Intl.NumberFormat('en-ZA', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(taxBracket.lower)}{' '}
									- R{' '}
									{taxBracket.upper === Infinity
										? 'Inf'
										: new Intl.NumberFormat('en-ZA', {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
										  }).format(taxBracket.upper)}{' '}
									+ {taxBracket.rate * 100}%
								</p>
							</div>

							<div className="flex flex-col justify-between items-start">
								<div className="flex flex-row items-center">
									<p className="text-md sm:text-lg">Tax Rate</p>
								</div>

								<p className="text-xl font-light tracking-wide">
									R{' '}
									{new Intl.NumberFormat('en-ZA', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(taxBracket.base)}{' '}
									+ {taxBracket.rate * 100}%
								</p>
							</div>
						</div>

						<div className="flex flex-row justify-between">
							<div className="flex flex-col justify-between items-start">
								<div className="flex flex-row items-center">
									<p className="text-md sm:text-lg">Tax Rebate</p>
								</div>

								<p className="text-xl font-light tracking-wide">
									R{' '}
									{new Intl.NumberFormat('en-ZA', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(taxRebate)}
								</p>
							</div>

							<div className="flex flex-col justify-between items-start">
								<div className="flex flex-row items-center">
									<p className="text-md sm:text-lg">Annual Tax</p>
								</div>

								<p className="text-xl font-light tracking-wide text-red-500">
									R{' '}
									{new Intl.NumberFormat('en-ZA', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(tax)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Salary;
