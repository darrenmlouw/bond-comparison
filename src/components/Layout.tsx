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
      <div className="flex relative flex-col h-full w-full overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full h-full scroll">
          <Outlet />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-5 bg-neutral-900/60 backdrop-blur-md border-[1px]  border-neutral-600 rounded-2xl">
        <FloatingDock
          items={dockItems}
          desktopClassName="bg-transparent   shadow-xl"
        />
      </div>
    </>
  );
};

export default Layout;
