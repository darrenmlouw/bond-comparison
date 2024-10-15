// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const contentWrapper = document.getElementById('content-wrapper');
    if (contentWrapper) {
      contentWrapper.scrollTo(0, 0); // Scroll the content area only
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
