import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText'; // Import the AnimatedText component

const Hero = () => {
  const handleGetStartedClick = () => {
    const element = document.getElementById('howto');
    if (element) {
      const contentWrapper = document.getElementById('content-wrapper');
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      if (element && contentWrapper) {
        contentWrapper.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center p-6 sm:p-9 md:p-12"
    >
      <motion.div
        initial={{
          scale: 0.95,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="flex flex-col text-center h-full w-full outline outline-4 -outline-offset-4 dark:outline-white/70 outline-black/70 rounded-3xl sm:rounded-3xl md:rounded-3xl justify-center items-center"
      >
        <div className="flex flex-row space-x-3 sm:space-x-6 md:space-x-8 justify-center mb-6 flex-wrap">
          <AnimatedText
            text="Rent"
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-violet-400 dark:text-violet-600 
              filter 
              drop-shadow-[0_0_15px_rgba(139,92,246,0.75)]"
          />

          <AnimatedText
            text="vs"
            className="text-3xl sm:text-4xl md:text-5xl font-bold items-end justify-center self-end mb-2 sm:mb-3 md:mb-4 
              dark:text-white/40 text-black/30 filter drop-shadow-[0_5px_3px_rgba(0,0,0,0.8)]"
          />

          <AnimatedText
            text="Buy"
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-pink-400 dark:text-pink-700 
              filter
              drop-shadow-[0_0_15px_rgba(236,72,153,0.75)]"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-24 text-foreground/60 mx-6"
        >
          Make the Right Choice
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-foreground/60 text-md sm:text-lg md:text-xl mb-16 mx-6"
        >
          Compare renting and buying to make informed homeowner decisions.
        </motion.p>

        <motion.span
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => {
              setTimeout(handleGetStartedClick, 200);
            }}
            className="
              border-2 border-primary 
              bg-primary/30 hover:bg-primary 
              hover:border-primary 
              rounded-full text-base 
              font-medium transition-colors 
              text-primary-foreground 
              h-10 px-4 py-2-8 
              ring-2 
              ring-primary
              ring-offset-2 
              ring-offset-background 
              focus:ring-primary 
              focus:outline-none 
              active:ring-primary
              focus-visible:ring-2 
              focus-visible:ring-primary
              focus-visible:ring-offset-2 
              focus-visible:ring-offset-foreground
            "
          >
            Get Started
          </motion.button>
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Hero;
