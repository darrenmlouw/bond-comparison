import { useStorage } from '@/hooks/useStorage';
import { createContext, ReactNode } from 'react';

// Define the shape of the context
interface SalaryContextType {
  grossMonthlyIncome: number;
  setGrossMonthlyIncome: (income: number) => void;
  deductions: number;
  setDeductions: (deductions: number) => void;
  age: number;
  setAge: (age: number) => void;
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
  const [age, setAge] = useStorage('age', '0', 'localStorage');
  const [year, setYear] = useStorage('year', new Date().getFullYear().toString(), 'localStorage'
  );

  return (
    <SalaryContext.Provider
      value={{
        grossMonthlyIncome: Number(grossMonthlyIncome),
        setGrossMonthlyIncome: (income: number) =>
          setGrossMonthlyIncome(income.toString()),
        deductions: Number(deductions),
        setDeductions: (deductions: number) =>
          setDeductions(deductions.toString()),
        age: Number(age),
        setAge: (age: number) => setAge(age.toString()),
        year: Number(year),
        setYear: (year: number) => setYear(year.toString()),
        storageAvailable, // Pass the storage availability state
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};
