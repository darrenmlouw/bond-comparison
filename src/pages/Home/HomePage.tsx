// src/pages/Home/HomePage.tsx

import Hero from '@/pages/Home/sections/Hero';
import Features from '@/pages/Home/sections/Features';
import Socials from '@/pages/Home/sections/Socials';
import PageTracker from '@/pages/Home/components/PageTracker';
import FEATURES from '@/constants/FEATURES';
import AdSenseAd from '@/components/AdSenseAd';

const HomePage = () => {
  return (
    <>
      <PageTracker />
      <Hero />
      <AdSenseAd adClient="ca-pub-1928647206714490" adSlot="1234567890" />
      <Features constantData={FEATURES} />
      <Socials />
      <div className="flex flex-row min-h-32"></div>
    </>
  );
};

export default HomePage;
