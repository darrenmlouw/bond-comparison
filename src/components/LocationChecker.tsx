import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { motion } from 'framer-motion';

import SouthAfricanFlag from '@/assets/SouthAfricanFlag.png';
import { WebsiteLoadingScreen } from '@/components/WebsiteLoadingScreen';

const LocationChecker = ({ children }: { children: React.ReactNode }) => {
  const { coordinates, error } = useGeolocation();
  const [countdown, setCountdown] = useState(10); // Timer set to 10 seconds
  const [showWarning, setShowWarning] = useState(false); // Control modal visibility
  const [showContent, setShowContent] = useState(false); // Control when to show the main content

  // Define South Africa's boundaries
  const isInSouthAfrica = (lat: number, lng: number) => {
    const SOUTH_AFRICA_BOUNDS = {
      minLat: -35.0,
      maxLat: -22.0,
      minLng: 16.0,
      maxLng: 33.0,
    };
    return (
      lat >= SOUTH_AFRICA_BOUNDS.minLat &&
      lat <= SOUTH_AFRICA_BOUNDS.maxLat &&
      lng >= SOUTH_AFRICA_BOUNDS.minLng &&
      lng <= SOUTH_AFRICA_BOUNDS.maxLng
    );
  };

  // Handle countdown timer and warning display
  useEffect(() => {
    // If there is an error (location services disabled or denied) or the user is outside South Africa
    if (
      error ||
      (coordinates &&
        !isInSouthAfrica(coordinates.latitude, coordinates.longitude))
    ) {
      setShowWarning(true); // Show the warning modal

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setShowWarning(false); // Hide the warning modal
            setShowContent(true); // Show the main content
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000); // Countdown every second

      return () => clearInterval(timer); // Clean up interval on component unmount
    } else if (coordinates) {
      setShowContent(true); // Directly show content if the user is in South Africa
    }
  }, [coordinates, error]);

  // Handle skip button
  const handleSkip = () => {
    setShowWarning(false);
    setShowContent(true); // Immediately show the main content
  };

  // Wait for coordinates to be available or handle error
  if (!coordinates && !error) {
    return <WebsiteLoadingScreen/>;
  }

  // Render the warning modal if the user is outside South Africa or if there's an error
  if (showWarning) {
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-background p-10">
        <div className="bg-card border border-foreground/30 p-5 rounded-xl text-center relative overflow-hidden">
          {/* Light burn effect of South Africa flag */}
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{
              backgroundImage: `url(${SouthAfricanFlag})`,
            }}
          ></div>
          
          {/* Warning Content */}
          <h1 className="text-2xl sm:text-3xl md:text4xl mb-5 text-warning">Warning</h1>
          <h2 className='text-foreground/70'>This site is intended for South African property owners</h2>
          <p className='text-foreground/70'>Calculations may not apply to users outside of South Africa.</p>
          <p className='text-foreground/70 mt-3'>If you continue seeing this on page reload,</p>
          <p className='text-foreground/70'>please allow this website access to your location</p>
          <p className="mt-5 text-foreground/70">You will be redirected in {countdown} seconds.</p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='self-end'
          >
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => {
                setTimeout(handleSkip, 200);
              }}
              className="mt-5 border-2 border-primary bg-primary/30 hover:bg-primary hover:border-primary rounded-md text-base font-medium transition-colors text-primary-foreground h-10 px-4 py-2-8 focus:ring-primary focus:outline-none active:ring-primary focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-0"
            >
              Acknowledge
            </motion.button>
          </motion.span>
        </div>
      </div>
    );
  }

  // Render the main content after the timer or skip
  if (showContent) {
    return <>{children}</>;
  }

  return null; // Return nothing while waiting for location
};

export default LocationChecker;
