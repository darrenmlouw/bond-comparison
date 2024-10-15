// src/pages/Home/HomePage.tsx

import Hero from '@/pages/Home/sections/Hero';
import Features from '@/pages/Home/sections/Features';
import HowTo from '@/pages/Home/sections/HowTo';
import Socials from '@/pages/Home/sections/Socials';
import PageTracker from '@/pages/Home/components/PageTracker';
import FEATURES from '@/constants/FEATURES';

const HomePage = () => {
  return (
    <>
      <PageTracker />
      <Hero />
      <Features constantData={FEATURES} />
      <HowTo />
      <Socials />
    </>
  );
};

export default HomePage;
