import React, { createContext, useEffect, useState, PropsWithChildren } from 'react';

const ViewportHeightContext = createContext<number>(window.innerHeight);

export const ViewportHeightProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [trueHeight, setTrueHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => setTrueHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <ViewportHeightContext.Provider value={trueHeight}>
      {children}
    </ViewportHeightContext.Provider>
  );
};

export default ViewportHeightContext;
