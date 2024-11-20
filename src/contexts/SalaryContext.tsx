import ageCategory from '@/enums/ageCategory';
import { useStorage } from '@/hooks/useStorage';
import { createContext, ReactNode } from 'react'
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
export const SalaryContext = createContext<SalaryContextType | undefined>(
  undefined
);

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
  const [grossMonthlyIncome, setGrossMonthlyIncome, , storageAvailable] =
    useStorage('grossMonthlyIncome', '0', 'localStorage');
  const [deductions, setDeductions] = useStorage(
    'deductions',
    '0',
    'localStorage'
  );
  const [age, setAge] = useStorage(
    'age',
    ageCategory.None.toString(),
    'localStorage'
  );
  const [year, setYear] = useStorage(
    'year',
    findCurrentTaxPeriodYear()?.toString() ?? new Date().getFullYear().toString(),
    'localStorage'
  );
  const grossAnnualIncome = isNaN(Number(grossMonthlyIncome)) ? 0 : Number(grossMonthlyIncome) * 12;
  const annualDeductions = isNaN(Number(deductions)) ? 0 : Number(deductions) * 12;

  return (
    <SalaryContext.Provider
      value={{
        grossMonthlyIncome: Number(grossMonthlyIncome),
        setGrossMonthlyIncome: (value: number) =>
          setGrossMonthlyIncome(value.toString()),
        grossAnnualIncome,
        deductions: Number(deductions),
        setDeductions: (value: number) => setDeductions(value.toString()),
        annualDeductions,
        age: age as ageCategory,
        setAge: (value: ageCategory) => setAge(value.toString()),
        year: Number(year),
        setYear: (value: number) => setYear(value.toString()),
        storageAvailable,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};
