// src/App.tsx
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/Home/HomePage';
import SalaryPage from '@/pages/Salary/SalaryPage';
import ComparisonPage from '@/pages/Comparison/ComparisonPage';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { SalaryProvider } from '@/contexts/SalaryContext';
import ThemeContext from '@/contexts/ThemeContext';


function App() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const [gradientBackgroundStart, setGradientBackgroundStart] =
    useState<string>(
      theme === 'dark' ? 'rgb(70, 0, 20)' : 'rgb(248, 251, 252)'
    );
  const [gradientBackgroundEnd, setGradientBackgroundEnd] = useState<string>(
    theme === 'dark' ? 'rgb(0, 17, 82)' : 'rgb(248, 251, 252)'
  );

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
    <SalaryProvider>
      <div className="relative w-screen h-screen overflow-hidden">
        <BackgroundGradientAnimation
          interactive={false}
          gradientBackgroundStart={gradientBackgroundStart}
          gradientBackgroundEnd={gradientBackgroundEnd}
        />
        <div className="absolute inset-0 z-10 flex flex-col w-full h-full overflow-hidden">
          <Routes location={location}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/Salary" element={<SalaryPage />} />
              <Route path="/Comparison" element={<ComparisonPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </SalaryProvider>
  );
}

export default App;
