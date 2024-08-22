// src/components/Layout.tsx
import { FloatingDock } from '@/components/ui/floating-dock';
import TopBar from '@/components/TopBar';
import { Outlet } from 'react-router-dom';
import { HomeIcon, Layers, CircleDollarSign } from 'lucide-react';

const Layout = () => {
  const dockItems = [
    { title: 'Home', icon: <HomeIcon />, href: '/Home' },
    { title: 'Salary', icon: <CircleDollarSign />, href: '/Salary' },
    { title: 'Comparison', icon: <Layers />, href: '/Comparison' },

    // Add more items as needed
  ];

  return (
    <>
      <div className="flex relative flex-col h-full w-full overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full h-full">
          <Outlet />
        </div>
      </div>

      {/* Floating Dock at the bottom center */}
      <div className="fixed bottom-0 left-1/2 backdrop-blur-md transform -translate-x-1/2 -translate-y-5 b shadow-2xl items-center justify-center z-20">
        <FloatingDock items={dockItems} />
      </div>
    </>
  );
};

export default Layout;
