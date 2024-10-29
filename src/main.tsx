import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';
import { SalaryProvider } from '@/contexts/SalaryContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
          <SalaryProvider>
            <ComparisonProvider>
              <App />
            </ComparisonProvider>
          </SalaryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
