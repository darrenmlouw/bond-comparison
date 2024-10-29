import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { motion } from 'framer-motion';
import SouthAfricanFlag from '@/assets/SouthAfricanFlag.png';
import { WebsiteLoadingScreen } from '@/components/WebsiteLoadingScreen';

const LocationChecker = ({ children }: { children: React.ReactNode }) => {
  const { coordinates, error } = useGeolocation();
  const [countdown, setCountdown] = useState(10);
  const [showWarning, setShowWarning] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const userAgent = navigator.userAgent.toLowerCase();
  const isBot = /googlebot|bingbot|yandex|duckduckbot/i.test(userAgent);

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

  useEffect(() => {
    if (isBot) {
      setShowContent(true); // Allow bots to see the main content
      return;
    }

    if (error || (coordinates && !isInSouthAfrica(coordinates.latitude, coordinates.longitude))) {
      setShowWarning(true);

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setShowWarning(false);
            setShowContent(true);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (coordinates) {
      setShowContent(true);
    }
  }, [coordinates, error, isBot]);

  const handleSkip = () => {
    setShowWarning(false);
    setShowContent(true);
  };

  if (!coordinates && !error) {
    return <WebsiteLoadingScreen />;
  }

  if (showWarning) {
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-background p-10">
        <div className="bg-card border border-foreground/30 p-5 rounded-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${SouthAfricanFlag})` }}></div>
          <h1 className="text-2xl sm:text-3xl md:text4xl mb-5 text-warning">Warning</h1>
          <h2 className='text-foreground/70'>This site is intended for South African property owners</h2>
          <p className='text-foreground/70'>Calculations may not apply to users outside of South Africa.</p>
          <p className='text-foreground/70 mt-3'>If you continue seeing this on page reload, please allow location access.</p>
          <p className="mt-5 text-foreground/70">Redirecting in {countdown} seconds.</p>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='self-end'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTimeout(handleSkip, 200)}
              className="mt-5 border-2 border-primary bg-primary/30 hover:bg-primary hover:border-primary rounded-md text-base font-medium transition-colors text-primary-foreground h-10 px-4 py-2-8 focus:ring-primary focus:outline-none active:ring-primary focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-0"
            >
              Acknowledge
            </motion.button>
          </motion.span>
        </div>
      </div>
    );
  }

  if (showContent) {
    return <>{children}</>;
  }

  return null;
};

export default LocationChecker;
