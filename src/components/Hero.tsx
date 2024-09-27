// src/components/Hero.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const handleGetStartedClick = () => {
    const howToSection = document.getElementById('howto');
    if (howToSection) {
      howToSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className='flex flex-row space-x-4 sm:space-x-6 space-x-8 justify-center mb-6'>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-violet-300 dark:text-violet-600">
            Rent
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold items-end justify-center self-end mb-2 sm:mb-3 md:mb-4 dark:text-white/40 text-black/30">
            vs
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-pink-300 dark:text-pink-700">
            Buy:
          </h1>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Make the Right Choice
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Compare renting and buying to make informed homeownership decisions.
        </p>
        <Button variant="default" size="lg" onClick={handleGetStartedClick}>
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default Hero;
