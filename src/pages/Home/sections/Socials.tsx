// src/components/Socials.tsx

import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BuyMeCoffeeLogo from '@/assets/BuyMeCoffee/BuyMeCoffeeLogo32.webp';

const Socials = () => {
  return (
    <section
      id="socials"
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-9"
    >
      <div className="flex flex-col items-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Connect with Me
        </h2>

        {/* Introduction */}
        <p className="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-gray-700 dark:text-gray-300 px-2">
          Hi, I'm Darren Louw, a dynamic Computer Engineer specializing in
          full-stack and embedded development. I love creating robust software
          solutions using React, TypeScript, .NET, and C++. Feel free to reach
          out to me on LinkedIn or check out my projects on GitHub!
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-3 sm:space-y-4 md:space-y-0 md:space-x-6">
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/darrenlouw/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="group relative inline-flex items-center w-full max-w-xs p-0.5 overflow-hidden text-sm font-medium rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-violet-200 dark:focus:ring-violet-800 shadow-md"
          >
            <span className="relative flex items-center w-full px-3 py-2 sm:px-4 sm:py-3 transition-all duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <FaLinkedin className="text-xl sm:text-2xl text-violet-500 group-hover:text-white mr-2 sm:mr-3" />
              <span className="text-lg sm:text-xl font-medium text-center flex-grow">
                LinkedIn
              </span>
            </span>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/darrenmlouw"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="group relative inline-flex items-center w-full max-w-xs p-0.5 overflow-hidden text-sm font-medium rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-md"
          >
            <span className="relative flex items-center w-full px-3 py-2 sm:px-4 sm:py-3 transition-all duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <FaGithub className="text-xl sm:text-2xl text-gray-800 dark:text-gray-200 group-hover:text-white mr-2 sm:mr-3" />
              <span className="text-lg sm:text-xl font-medium text-center flex-grow">
                GitHub
              </span>
            </span>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:darrenmlouw@gmail.com"
            whileHover={{ scale: 1.05 }}
            className="group relative inline-flex items-center w-full max-w-xs p-0.5 overflow-hidden text-sm font-medium rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 shadow-md"
          >
            <span className="relative flex items-center w-full px-3 py-2 sm:px-4 sm:py-3 transition-all duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <FaEnvelope className="text-xl sm:text-2xl text-green-500 group-hover:text-white mr-2 sm:mr-3" />
              <span className="text-lg sm:text-xl font-medium text-center flex-grow">
                Email
              </span>
            </span>
          </motion.a>
        </div>

        {/* Buy Me a Coffee Section */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Support My Work
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-8 text-gray-700 dark:text-gray-300 max-w-xl px-2">
            If you enjoy my content or find my projects useful, consider buying
            me a coffee. Your support helps me to keep creating and sharing more
            with the community.
          </p>
          <motion.a
            href="https://www.buymeacoffee.com/darrenmlouw"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex items-center w-full max-w-xs p-0.5 overflow-hidden text-foreground hover:text-background text-sm font-medium rounded-full border-2 border-[#FFDD00] hover:bg-[#FFDD00] focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:focus:ring-yellow-800 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative flex items-center w-full px-3 py-2 sm:px-4 sm:py-3 rounded-full">
              <img
                src={BuyMeCoffeeLogo}
                alt="Coffee logo"
                className="w-[32px] h-[32px] rounded-full shadow-xl"
              />

              <span className="text-lg sm:text-xl font-medium text-center flex-grow">
                Buy Me a Coffee
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Socials;
