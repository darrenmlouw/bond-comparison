// src/pages/Home/HomePage.tsx

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowTo from '@/components/HowTo';
import Socials from '@/components/Socials';
import PageTracker from '@/components/PageTracker';
import SmoothScroll from '@/components/SmoothScroll';

const HomePage = () => {
  return (
    <>
      <PageTracker />
      <SmoothScroll>
        <div className="flex flex-col z-10">
          {/* <div className='flex flex-col z-10 m-10 sm:bg-background md:bg-card rounded-3xl shadow-2xl'> */}
            <Hero />
            <Features />
            <HowTo />
            <Socials />
          {/* </div> */}
        </div>
      </SmoothScroll>
    </>
  );
};

export default HomePage;
