import { useContext } from 'react';
import { SalaryContext } from '@/contexts/SalaryContext'; // Adjust the path

// Custom hook for accessing the SalaryContext
export const useSalary = () => {
  const context = useContext(SalaryContext);

  if (context === undefined) {
    throw new Error('useSalary must be used within a SalaryProvider');
  }
  return context;
};
