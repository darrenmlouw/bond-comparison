// src/pages/Home/HomePage.tsx

import Hero from '@/pages/home/sections/Hero';
import Features from '@/pages/home/sections/Features';
import HowTo from '@/pages/home/sections/HowTo';
import Socials from '@/pages/home/sections/Socials';
import PageTracker from '@/pages/home/components/PageTracker';
import FEATURES from '@/constants/FEATURES';

const HomePage = () => {
  return (
    <div className="flex flex-col z-10">
      <PageTracker />
      <Hero />
      <Features constantData={FEATURES}/>
      <HowTo />
      <Socials />
    </div>
  );
};

export default HomePage;
