// src/App.tsx
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/Home/HomePage';
import SalaryPage from '@/pages/Salary/SalaryPage';
import ComparisonPage from '@/pages/Comparison/ComparisonPage';
import { useEffect, useState } from 'react';
import { WebsiteLoadingScreen } from '@/components/WebsiteLoadingScreen';
import ScrollToTop from '@/components/ScrollToTop'; // Import the ScrollToTop component

function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  return (
    <>
      {loading ? (
        <WebsiteLoadingScreen />
      ) : (
        <>
          <ScrollToTop /> {/* Add this line */}
          <Routes location={location}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/Salary" element={<SalaryPage />} />
              <Route path="/Comparison" element={<ComparisonPage />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
