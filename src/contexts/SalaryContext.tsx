import ageCategory from '@/enums/ageCategory';
import { useStorage } from '@/hooks/useStorage';
import { createContext, ReactNode } from 'react';

// Define the shape of the context
interface SalaryContextType {
  grossMonthlyIncome: number;
  setGrossMonthlyIncome: (income: number) => void;
  deductions: number;
  setDeductions: (deductions: number) => void;
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

export const SalaryProvider = ({ children }: { children: ReactNode }) => {
  const [grossMonthlyIncome, setGrossMonthlyIncome, , storageAvailable] = useStorage('grossMonthlyIncome', '0', 'localStorage');
  const [deductions, setDeductions] = useStorage('deductions', '0', 'localStorage');
  const [age, setAge] = useStorage('age', ageCategory.None.toString(), 'localStorage');
  const [year, setYear] = useStorage('year', new Date().getFullYear().toString(), 'localStorage');

  // Ensure grossMonthlyIncome is not NaN and set it to 0 if it is
  const handleSetGrossMonthlyIncome = (income: number) => {
    setGrossMonthlyIncome(isNaN(income) ? '0' : income.toString());
  };

  // Ensure deductions is not NaN and set it to 0 if it is
  const handleSetDeductions = (deductions: number) => {
    setDeductions(isNaN(deductions) ? '0' : deductions.toString());
  };

  return (
    <SalaryContext.Provider
      value={{
        grossMonthlyIncome: Number(grossMonthlyIncome),
        setGrossMonthlyIncome: handleSetGrossMonthlyIncome,
        deductions: Number(deductions),
        setDeductions: handleSetDeductions,
        age: age as ageCategory,
        setAge: (age: ageCategory) => setAge(age.toString()),
        year: Number(year),
        setYear: (year: number) => setYear(year.toString()),
        storageAvailable, // Pass the storage availability state
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};
