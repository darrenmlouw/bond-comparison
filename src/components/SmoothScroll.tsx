// src/components/SmoothScroll.tsx

import React, { useRef, useEffect, useCallback } from 'react';
import useWindowSize from '../hooks/useWindowSize';

interface SmoothScrollProps {
  children: React.ReactNode;
}

interface DataProps {
  ease: number;
  current: number;
  previous: number;
  rounded: number;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const windowSize = useWindowSize();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const data = useRef<DataProps>({
    ease: 0.02, // Adjust this value for smoother or faster scrolling
    current: 0,
    previous: 0,
    rounded: 0,
  });

  // Set the body's height to enable scrolling
  const setBodyHeight = useCallback(() => {
    if (scrollContainerRef.current) {
      const height = scrollContainerRef.current.getBoundingClientRect().height;
      document.body.style.height = `${height}px`;
    }
  }, []);

  // Smooth scrolling function
  const smoothScrolling = useCallback(() => {
    data.current.current = window.scrollY;
    data.current.previous += (data.current.current - data.current.previous) * data.current.ease;
    data.current.rounded = Math.round(data.current.previous * 100) / 100;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = `translateY(-${data.current.rounded}px)`;
    }

    requestAnimationFrame(smoothScrolling);
  }, []);

  useEffect(() => {
    setBodyHeight();
  }, [windowSize.height, setBodyHeight]);

  useEffect(() => {
    requestAnimationFrame(smoothScrolling);
  }, [smoothScrolling]);

  return (
    <div
      ref={scrollContainerRef}
      className="fixed top-0 left-0 w-full will-change-transform"
      style={{ overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
