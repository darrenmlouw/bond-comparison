// src/components/PageTracker.tsx

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'howto', label: 'How To' },
  { id: 'socials', label: 'Socials' },
];

const PageTracker = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Intersection Observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 space-y-6 z-20"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={`block w-4 h-4 rounded-full  ${
            activeSection === section.id ? 'bg-primary shadow-md' : 'bg-secondary'
          }`}
          animate={{
            scale: activeSection === section.id ? 1.25 : 1,
          }}
          whileHover={{ scale: 1.5 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 15,
          }}
        >
          <span className="sr-only">{section.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default PageTracker;
