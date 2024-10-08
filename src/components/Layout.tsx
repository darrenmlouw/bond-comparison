// src/components/Layout.tsx
import { FloatingDock } from '@/components/ui/floating-dock';
import TopBar from '@/components/TopBar';
import { Outlet } from 'react-router-dom';
import { HomeIcon, Layers, CircleDollarSign } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const Layout = () => {
  const dockItems = [
    { title: 'Home', icon: <HomeIcon />, href: '/' },
    { title: 'Salary', icon: <CircleDollarSign />, href: '/Salary' },
    { title: 'Comparison', icon: <Layers />, href: '/Comparison' },

    // Add more items as needed
  ];

  return (
    <>
      <TopBar />
      <Outlet />
      <Analytics />
      <div className="z-20 fixed bottom-12 sm:bottom-2 left-1/2 -translate-x-1/2  bg-primary/20 backdrop-blur-[6px] outline outline-1 outline-foreground/30 rounded-2xl">
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
