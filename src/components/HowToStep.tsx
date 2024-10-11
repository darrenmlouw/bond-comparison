// src/components/HowToStep.tsx

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HowToStepProps {
  icon: ReactNode;
  stepNumber: number;
  title: string;
  description: string;
}

const HowToStep = ({
  icon,
  stepNumber,
  title,
  description,
}: HowToStepProps) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center bg-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl"
      whileHover={{ scale: 1.03 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    >
      {/* Icon */}
      <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
        {icon}
      </div>

      {/* Text */}
      <div className="md:w-3/4 text-center md:text-left">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          {stepNumber}. {title}
        </h3>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default HowToStep;
