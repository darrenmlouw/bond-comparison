// src/components/PageTracker.tsx
import React, { useEffect, useState } from 'react';

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
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="fixed left-3 top-1/2 transform -translate-y-1/2 space-y-4">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`block w-4 h-4 rounded-full ${
            activeSection === section.id
              ? 'bg-primary'
              : 'bg-secondary'
          }`}
        >
          <span className="sr-only">{section.label}</span>
        </a>
      ))}
    </div>
  );
};

export default PageTracker;
