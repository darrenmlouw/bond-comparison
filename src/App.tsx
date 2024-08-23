// src/App.tsx
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { SidePanelProvider } from '@/contexts/SidePanelContext';
import Comparison from '@/pages/Comparison/Comparison';
import { SalaryProvider } from '@/contexts/SalaryContext';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import Salary from '@/pages/Salary/Salary';
import Home from '@/pages/Home/Home';
import ThemeContext from '@/contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  // set gradient background start color based on theme
  const [gradientBackgroundStart, setGradientBackgroundStart] = useState<string>(theme === 'dark' ? 'rgb(70, 0, 20)' : 'rgb(248, 251, 252)');
  const [gradientBackgroundEnd, setGradientBackgroundEnd] = useState<string>(theme === 'dark' ? 'rgb(0, 17, 82)' : 'rgb(248, 251, 252)');

  useEffect(() => {
    if (theme === 'dark') {
      setGradientBackgroundStart(() => 'rgb(70, 0, 20)');
      setGradientBackgroundEnd(() => 'rgb(0, 17, 82)');
      console.log('dark');
    } else {
      setGradientBackgroundStart(() => 'rgb(248, 251, 252)');
      setGradientBackgroundEnd(() => 'rgb(248, 251, 252)');
      console.log('light');
    }
  }, [theme]);


  return (
    
      <SidePanelProvider>
        <SalaryProvider>
          <div className="relative w-screen h-screen overflow-hidden">
            <BackgroundGradientAnimation interactive={false} gradientBackgroundStart={gradientBackgroundStart} gradientBackgroundEnd={gradientBackgroundEnd}/>
            <div className="absolute inset-0 z-10 flex flex-col w-full h-full overflow-hidden">
              <Routes location={location}>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/Salary" element={<Salary />} />
                  <Route path="/Comparison" element={<Comparison />} />
                  
                </Route>
              </Routes>
            </div>
          </div>
        </SalaryProvider>
      </SidePanelProvider>
    
  );
}

export default App;
