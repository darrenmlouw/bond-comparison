// src/components/Layout.tsx
import { FloatingDock } from '@/components/ui/floating-dock';
import TopBar from '@/components/TopBar';
import { Outlet } from 'react-router-dom';
import { HomeIcon, Layers, CircleDollarSign } from 'lucide-react';

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
      <div className="z-20 fixed bottom-12 sm:bottom-2 left-1/2 -translate-x-1/2  bg-neutral-900/60 backdrop-blur-md border-[1px]  border-neutral-600 rounded-2xl">
        <FloatingDock
          items={dockItems}
          desktopClassName="bg-transparent   shadow-xl"
        />
      </div>
    </>
  );
};

export default Layout;
