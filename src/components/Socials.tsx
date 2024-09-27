// src/components/Socials.tsx

import { Linkedin, Github } from 'lucide-react';

const Socials = () => {
  return (
    <section
      id="socials"
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-9 md:p-12"
    >
      <div className="justify-center items-center flex flex-col">
        <h2 className="text-4xl md:text-6xl font-bold mb-12">Connect with Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/darrenlouw/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-4 px-6 py-2 bg-white rounded-xl shadow-2xl hover:shadow-violet-500/50 transition-shadow duration-300"
          >
            <Linkedin className="h-8 w-12 text-violet-500" />
            <span className="text-xl font-medium">LinkedIn</span>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/darrenmlouw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-4 px-6 py-2 bg-white rounded-xl shadow-2xl hover:shadow-gray-700/50 transition-shadow duration-300"
          >
            <Github className="h-8 w-12 text-gray-800" />
            <span className="text-xl font-medium">GitHub</span>
          </a>
          
        </div>

        {/* Buy Me a Coffee Button */}
        <div className="mt-8  w-full justify-center items-center flex">
          <a href="https://www.buymeacoffee.com/darrenmlouw" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              // style={{ height: 'auto' }}
              className='w-48 sm:w-48 md:w-[360px] h-auto'
            />
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Socials;
