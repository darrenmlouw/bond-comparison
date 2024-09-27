// src/components/PageTracker.tsx
import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'howto', label: 'How To' },
  { id: 'socials', label: 'Socials' },
];

const PageTracker = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 space-y-4 z-20 ">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={`block w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${
            activeSection === section.id ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          <span className="sr-only">{section.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PageTracker;
