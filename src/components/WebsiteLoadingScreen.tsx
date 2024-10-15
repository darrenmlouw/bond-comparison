import React from 'react';
import { motion } from 'framer-motion';

export const WebsiteLoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-background">
      {/* Rotating outer ring */}
      <motion.div
        className="w-40 h-40 md:w-52 md:h-52 border-4 border-primary rounded-full absolute"
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Inner rotating square */}
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 bg-secondary absolute"
        initial={{ rotate: 45, scale: 1 }}
        animate={{
          rotate: [45, 0, -45, 45],
          scale: [1, 0.8, 1.2, 1],
          borderRadius: ["20%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Pulsing inner circle */}
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full absolute"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Expanding star-like shape */}
      <motion.div
        className="w-8 h-8 bg-accent absolute"
        initial={{ scale: 1, rotate: 45 }}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [45, 90, 135, 45],
          borderRadius: ["10%", "30%", "50%", "10%"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Pulsing hexagon or complex shape */}
      <motion.div
        className="w-20 h-20 md:w-28 md:h-28 bg-transparent border-4 border-secondary rounded-lg absolute"
        initial={{ scale: 0.8, rotate: 0, opacity: 1 }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 120, 240, 360],
          opacity: [1, 0.8, 1],
          borderRadius: ["50%", "30%", "50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
    </div>
  );
};
