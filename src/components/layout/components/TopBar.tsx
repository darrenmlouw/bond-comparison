import { motion } from 'framer-motion';
import { SunIcon } from '@radix-ui/react-icons';
import { MoonIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

// src/components/layout/components/TopBar.tsx
const TopBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-1.5 right-1.5 md:top-1 md:right-1 lg:top-1 lg:right-1 flex justify-between items-center z-30">
      <motion.button
        layout
        whileHover={{
          scale: 1.1,
          rotate: [0, 10, -10, 0],
        }}
        whileTap={{
          scale: 0.9,
        }}
        onClick={toggleTheme}
        className="group rounded-full backdrop-blur-sm outline outline-1 outline-foreground/20 bg-transparent active:outline-1 active:bg-transparent hover:outline-1 hover:bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <motion.div
            layout
            key="sun-icon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.5 }}
          >
            <SunIcon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-yellow-300" />
          </motion.div>
        ) : (
          <motion.div
            layout
            key="moon-icon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.5 }}
          >
            <MoonIcon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 text-foreground/70 group-hover:text-foreground" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default TopBar;
