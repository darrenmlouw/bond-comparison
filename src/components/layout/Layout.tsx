// src/components/Layout.tsx

import { FloatingDock } from '@/components/layout/components/FloatingDock';
import TopBar from '@/components/layout/components/TopBar';
import { Outlet } from 'react-router-dom';
import { HomeIcon, Layers, CircleDollarSign } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const Layout = () => {
  const dockItems = [
    { title: 'Home', icon: <HomeIcon />, href: '/' },
    { title: 'Salary', icon: <CircleDollarSign />, href: '/Salary' },
    { title: 'Comparison', icon: <Layers />, href: '/Comparison' },
  ];

  return (
    <>
      <TopBar />
      <div
        id="content-wrapper"
        className="h-screen w-screen overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        <Outlet />
      </div>
      <Analytics />
      <SpeedInsights />
      <div className="z-20 fixed bottom-12 sm:bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-primary/20 backdrop-blur-[6px] outline outline-1 outline-foreground/30 rounded-2xl">
        <FloatingDock
          items={dockItems}
          desktopClassName="shadow-xl"
          mobileClassName="shadow-xl"
        />
      </div>
      
    </>
  );
};

export default Layout;
