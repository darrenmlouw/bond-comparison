import { useContext } from 'react';
import { ComparisonContext } from '@/contexts/ComparisonContext'; // Adjust the path

// Custom hook for accessing the ComparisonContext
export const useComparison = () => {
  const context = useContext(ComparisonContext);

  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
