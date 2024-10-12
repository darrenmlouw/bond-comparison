// src/components/Layout.tsx

import { FloatingDock } from '@/components/FloatingDock';
import TopBar from '@/components/TopBar';
import { Outlet } from 'react-router-dom';
import { HomeIcon, Layers, CircleDollarSign, TestTube } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
// import BuyMeCoffeeLogo from '../assets/BuyMeCoffeeLogo.png'; // Adjust the path if needed

const Layout = () => {
  const dockItems = [
    // {
    //   title: 'Support',
    //   imageSrc: BuyMeCoffeeLogo,
    //   href: 'https://www.buymeacoffee.com/darrenmlouw',
    //   external: true,
    //   isImageIcon: true,
    // },
    { title: 'Home', icon: <HomeIcon />, href: '/' },
    { title: 'Salary', icon: <CircleDollarSign />, href: '/Salary' },
    { title: 'Comparison', icon: <Layers />, href: '/Comparison' },
    { title: 'Test', icon: <TestTube />, href: '/Test' },
  ];

  return (
    <>
      <TopBar />
      <Outlet />
      <Analytics />
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
