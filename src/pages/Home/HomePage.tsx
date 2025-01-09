// src/pages/Home/HomePage.tsx

import Hero from '@/pages/Home/sections/Hero';
import Features from '@/pages/Home/sections/Features';
import Socials from '@/pages/Home/sections/Socials';
import PageTracker from '@/pages/Home/components/PageTracker';
import FEATURES from '@/constants/FEATURES';

const HomePage = () => {
  return (
    <>
      <PageTracker />
      <Hero />
      <Features constantData={FEATURES} />
      <Socials />
      <div className="flex flex-row min-h-32"></div>
    </>
  );
};

export default HomePage;
