// src/components/Socials.tsx
import React from 'react';
import { Linkedin } from 'lucide-react';

const Socials = () => {
  return (
    <section
      id="socials"
      className="h-screen flex items-center justify-center "
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Connect with Me</h2>
        <a
          href="https://www.linkedin.com/in/darrenlouw/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 hover:underline bg-accent p-1 rounded-md"
        >
          <Linkedin className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
};

export default Socials;
