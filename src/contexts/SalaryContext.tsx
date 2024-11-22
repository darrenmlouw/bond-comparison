import ageCategory from '@/enums/ageCategory';
import { useStorage } from '@/hooks/useStorage';
import { createContext, ReactNode } from 'react';
import TAX_PERIODS from '@/constants/TAX_PERIODS';

// Define the shape of the context
interface SalaryContextType {
  grossMonthlyIncome: number;
  setGrossMonthlyIncome: (income: number) => void;
  grossAnnualIncome: number;
  deductions: number;
  setDeductions: (deductions: number) => void;
  annualDeductions: number;
  age: ageCategory;
  setAge: (age: ageCategory) => void;
  year: number;
  setYear: (year: number) => void;
  storageAvailable: boolean; // Track storage availability
}

// Create the context with an initial default value
export const SalaryContext = createContext<SalaryContextType | undefined>(undefined);

function findCurrentTaxPeriodYear(): number | null {
  const currentDate = new Date();

  for (const [year, period] of Object.entries(TAX_PERIODS)) {
    const startDate = new Date(period.start.year, period.start.month - 1, period.start.day);
    const endDate = new Date(period.end.year, period.end.month - 1, period.end.day);

    if (currentDate >= startDate && currentDate <= endDate) {
      return parseInt(year, 10);
    }
  }

  return null; // Return null if no matching period is found
}

export const SalaryProvider = ({ children }: { children: ReactNode }) => {
  const [grossMonthlyIncome, setGrossMonthlyIncome, , storageAvailable] = useStorage<number>(
    'grossMonthlyIncome',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );

  const [deductions, setDeductions] = useStorage<number>(
    'deductions',
    0,
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );

  const [age, setAge] = useStorage<ageCategory>(
    'age',
    ageCategory.None,
    'localStorage',
    undefined,
    { parse: (value) => value as ageCategory, serialize: String }
  );

  const [year, setYear] = useStorage<number>(
    'year',
    findCurrentTaxPeriodYear() ?? new Date().getFullYear(),
    'localStorage',
    undefined,
    { parse: parseFloat, serialize: String }
  );

  const grossAnnualIncome = grossMonthlyIncome * 12;
  const annualDeductions = deductions * 12;

  return (
    <SalaryContext.Provider
      value={{
        grossMonthlyIncome,
        setGrossMonthlyIncome,
        grossAnnualIncome,
        deductions,
        setDeductions,
        annualDeductions,
        age,
        setAge,
        year,
        setYear,
        storageAvailable,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};
