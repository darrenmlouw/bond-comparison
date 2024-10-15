// src/hooks/useHover.ts
import { useState, useRef, useEffect } from 'react';

const useHover = () => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const onMouseOver = () => setHovered(true);
  const onMouseOut = () => setHovered(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseover', onMouseOver);
      element.addEventListener('mouseout', onMouseOut);

      return () => {
        element.removeEventListener('mouseover', onMouseOver);
        element.removeEventListener('mouseout', onMouseOut);
      };
    }
  }, []);

  return [ref, hovered] as const;
};

export default useHover;
