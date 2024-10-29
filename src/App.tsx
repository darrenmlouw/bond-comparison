// src/App.tsx
import { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const SalaryPage = lazy(() => import('@/pages/Salary/SalaryPage'));
const ComparisonPage = lazy(() => import('@/pages/Comparison/ComparisonPage'));
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />
      <Routes location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/Salary" element={<SalaryPage />} />
          <Route path="/Comparison" element={<ComparisonPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
