import { Button } from '@/components/ui/button';

const Hero = () => {
  const handleGetStartedClick = () => {
    // const howToSection = document.getElementById('howto');
    // if (howToSection) {
    //   howToSection.scrollIntoView({ behavior: 'smooth' });
    // }

    const element = document.getElementById('howto');
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="h-screen flex items-center justify-center p-6 sm:p-9 md:p-12">
      <div className="flex flex-col text-center px-6 h-full w-full  outline outline-4 -outline-offset-4 dark:outline-white/70 outline-white/90 rounded-3xl sm:rounded-3xl md:rounded-3xl justify-center items-center">
        <div className='flex flex-row space-x-3 sm:space-x-6 md:space-x-8 justify-center mb-6 flex-wrap'>
          {/* Rent text with permanent glow */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-violet-400 dark:text-violet-600 
            filter drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all duration-300 hover:drop-shadow-[0_0_35px_rgba(139,92,246,1)] hover:scale-105">
            Rent
          </h1>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold items-end justify-center self-end mb-2 sm:mb-3 md:mb-4 
            dark:text-white/40 text-black/30">
            vs
          </h1>

          {/* Buy text with permanent glow */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-pink-400 dark:text-pink-700 
            filter drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300 hover:drop-shadow-[0_0_35px_rgba(236,72,153,1)] hover:scale-105">
          Buy
          </h1>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-24 text-foreground/60">
          Make the Right Choice
        </h1>
        <p className="text-md sm:text-lg md:text-xl mb-16">
          Compare renting and buying to make informed homeowner decisions.
        </p>

        <Button variant="default" size="lg" onClick={handleGetStartedClick}>
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default Hero;
