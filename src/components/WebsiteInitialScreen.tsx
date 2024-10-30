import React from 'react';
import HouseLogo from '/HouseIcon128.webp';

export const WebsiteInitialScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
      <div className="flex items-center justify-center w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-full animate-ping">
        <img src={HouseLogo} alt="Logo" />
      </div>
    </div>
  );
};
