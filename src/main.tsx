import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'katex/dist/katex.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';
import { SalaryProvider } from '@/contexts/SalaryContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext.tsx';
import { ViewportHeightProvider } from '@/contexts/ViewportHeightContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SalaryProvider>
          <ComparisonProvider>
            <ViewportHeightProvider>
              <App />
            </ViewportHeightProvider>
          </ComparisonProvider>
        </SalaryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
