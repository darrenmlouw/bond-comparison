// src/App.tsx
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { SidePanelProvider } from '@/contexts/SidePanelContext';
import Comparison from '@/pages/Comparison/Comparison';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SalaryProvider } from '@/contexts/SalaryContext';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import Salary from '@/pages/Salary/Salary';
import Home from '@/pages/Home/Home';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <SidePanelProvider>
        <SalaryProvider>
          <div className="relative w-screen h-screen overflow-hidden">
            <BackgroundGradientAnimation />
            <div className="absolute inset-0 z-10 flex flex-col w-full h-full overflow-hidden">
              <Routes location={location}>
                <Route path="/" element={<Layout />}>
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Salary" element={<Salary />} />
                  <Route path="/Comparison" element={<Comparison />} />
                  
                </Route>
              </Routes>
            </div>
          </div>
        </SalaryProvider>
      </SidePanelProvider>
    </ThemeProvider>
  );
}

export default App;
