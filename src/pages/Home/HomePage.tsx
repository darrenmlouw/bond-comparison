// src/pages/Home/HomePage.tsx

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowTo from '@/components/HowTo';
import Socials from '@/components/Socials';
import PageTracker from '@/components/PageTracker';

const HomePage = () => {
  return (
    <div className="flex flex-col z-10">
      <PageTracker />
      <Hero />
      <Features />
      <HowTo />
      <Socials />
    </div>
  );
};

export default HomePage;
