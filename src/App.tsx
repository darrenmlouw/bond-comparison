// src/App.tsx
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/Home/HomePage';
import SalaryPage from '@/pages/Salary/SalaryPage';
import ComparisonPage from '@/pages/Comparison/ComparisonPage';
import { SalaryProvider } from '@/contexts/SalaryContext';

function App() {
  const location = useLocation();

  return (
    <SalaryProvider>
      <div className="absolute flex flex-col w-full h-full">
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/Salary" element={<SalaryPage />} />
            <Route path="/Comparison" element={<ComparisonPage />} />
          </Route>
        </Routes>
      </div>
    </SalaryProvider>
  );
}

export default App;
