import React, { createContext, useState, ReactNode } from 'react';

interface SalaryContextType {
	grossMonthlyIncome: number;
	setGrossMonthlyIncome: (income: number) => void;
	deductions: number;
	setDeductions: (deductions: number) => void;
	age: number;
	setAge: (age: number) => void;
	year: number;
	setYear: (year: number) => void;
}

const SalaryContext = createContext<SalaryContextType>({
	grossMonthlyIncome: 0,
	setGrossMonthlyIncome: () => {},
	deductions: 0,
	setDeductions: () => {},
	age: 0,
	setAge: () => {},
	year: 0,
	setYear: () => {},
});

export const SalaryProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<number>(50000);
	const [deductions, setDeductions] = useState<number>(6013.25);
	const [age, setAge] = useState<number>(25);
	const [year, setYear] = useState<number>(2024);


	return (
		<SalaryContext.Provider
			value={{
				grossMonthlyIncome,
				setGrossMonthlyIncome,
				deductions,
				setDeductions,
				age,
				setAge,
				year,
				setYear,
			}}
		>
			{children}
		</SalaryContext.Provider>
	);
};

export default SalaryContext;