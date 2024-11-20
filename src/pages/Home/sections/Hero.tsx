import { LazyMotion, domAnimation, m } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import BuyMeCoffeeLogo from '@/assets/BuyMeCoffee/BuyMeCoffeeLogo32.webp';

const Hero = () => {
  const handleGetStartedClick = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleBuyMeCoffee = () => {
    // Navigate to Buy Me Coffee page
  }
  

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="hero"
        className="h-screen flex items-center justify-center p-6 sm:p-9 md:p-12"
      >
        <m.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col text-center h-full w-full outline outline-4 -outline-offset-4 dark:outline-white/70 outline-black/70 rounded-3xl sm:rounded-3xl md:rounded-3xl justify-center items-center"
        >
          <div className="flex flex-row space-x-3 sm:space-x-6 md:space-x-8 justify-center mb-6 flex-wrap">
            <AnimatedText
              text="Rent"
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-violet-400 dark:text-violet-600 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.75)]"
            />

            <AnimatedText
              text="vs"
              className="text-3xl sm:text-4xl md:text-5xl font-bold items-end justify-center self-end mb-2 sm:mb-3 md:mb-4 dark:text-white/40 text-black/30 filter drop-shadow-[0_5px_3px_rgba(0,0,0,0.8)]"
            />

            <AnimatedText
              text="Buy"
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-pink-400 dark:text-pink-700 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.75)]"
            />
          </div>

          <m.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-24 text-foreground/60 mx-6"
          >
            Make the Right Choice
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-foreground/60 text-md sm:text-lg md:text-xl mb-16 mx-6 text-pretty"
          >
            Compare renting and buying to make informed homeowner decisions.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
          >
            <m.a
              href="https://www.buymeacoffee.com/darrenmlouw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setTimeout(handleBuyMeCoffee, 200);
              }}
              className="w-40 h-12 flex items-center text-foreground hover:text-background  rounded-full border-2 border-[#FFDD00] hover:bg-[#FFDD00] bg-[#FFDD00]/10 ring-0 focus:ring-0"
            >
                <img
                  src={BuyMeCoffeeLogo}
                  alt="Coffee logo"
                  className="w-[36px] h-[36px] rounded-full ml-1"
                />

                <span className="text-base font-semibold tracking-wider text-center flex-grow">
                  Coffee
                </span>
            </m.a>

            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setTimeout(handleGetStartedClick, 200);
              }}
              className="w-40 h-12 flex items-center justify-center text-primary-foreground hover:text-background border-2 border-primary bg-primary/10 hover:bg-primary hover:border-primary rounded-full text-base font-semibold tracking-wider transition-colors   px-4 py-2-8 ring-0 focus:ring-0"
            >
              Get Started
            </m.button>
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
};

export default Hero;
