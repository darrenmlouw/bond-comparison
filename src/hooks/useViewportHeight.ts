import { useContext } from 'react';
import ViewportHeightContext from '@/contexts/ViewportHeightContext';

export const useViewportHeight = () => {
  return useContext(ViewportHeightContext);
};