import { useStorage } from '@/hooks/useStorage';
import { createContext, ReactNode } from 'react';

interface ComparisonContextType {
  housePrice: number;
  setHousePrice: (income: number) => void;
  deposit: number;
  setDeposit: (deductions: number) => void;
  years: number;
  setYears: (age: number) => void;
  interestRate: number;
  setInterestRate: (year: number) => void;
  storageAvailable: boolean;
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [housePrice, setHousePrice, , storageAvailable] = useStorage('housePrice', '0', 'localStorage');
  const [deposit, setDeposit] = useStorage('deposit', '0', 'localStorage');
  const [years, setYears] = useStorage('years', '20', 'localStorage');
  const [interestRate, setInterestRate] = useStorage('interestRate', '17.5', 'localStorage');

  const handleSetHousePrice = (income: number) => {
    setHousePrice(isNaN(income) ? '0' : income.toString());
  };

  const handleSetDeposit = (deductions: number) => {
    setDeposit(isNaN(deductions) ? '0' : deductions.toString());
  };

  const handleSetYears = (years: number) => {
    setYears(isNaN(years) ? '0' : years.toString());
  };

  const handleSetInterestRate = (interestRate: number) => {
    setInterestRate(isNaN(interestRate) ? '0' : interestRate.toString());
  }

  return (
    <ComparisonContext.Provider
      value={{
        housePrice: Number(housePrice),
        setHousePrice: handleSetHousePrice,
        deposit: Number(deposit),
        setDeposit: handleSetDeposit,
        years: Number(years),
        setYears: handleSetYears,
        interestRate: Number(interestRate),
        setInterestRate: handleSetInterestRate,
        storageAvailable,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
