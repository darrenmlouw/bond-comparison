// src/components/Layout.tsx

import { FloatingDock } from '@/components/layout/components/FloatingDock';
import TopBar from '@/components/layout/components/TopBar';
import { Outlet, useLocation } from 'react-router-dom';
import { HomeIcon, Layers, CircleDollarSign } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const Layout = () => {
  const location = useLocation();
  const dockItems = [
    { title: 'Home', icon: <HomeIcon />, href: '/',selected:location.pathname === '/' },
    { title: 'Salary', icon: <CircleDollarSign />, href: '/Salary',selected:location.pathname === '/Salary' },
    { title: 'Comparison', icon: <Layers />, href: '/Comparison', selected:location.pathname === '/Comparison' },
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
      <div className="z-20 fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-primary/20 backdrop-blur-[6px] outline outline-1 outline-foreground/30 rounded-2xl">
        <FloatingDock
          items={dockItems}
        />
      </div>
      
    </>
  );
};

export default Layout;
