import TaxComparisonChart from '@/components/TaxComparisonChart';
import { SectionHeader } from '@/components/SectionHeader';
import InputComponents from '@/pages/Salary/components/InputComponents';
import EvaluationCards from '@/pages/Salary/components/EvaluationCards';
import { EasingDefinition, motion } from 'framer-motion';

const SalaryPage = () => {
  const animationDelay: number = 0.1;
  const animationDelayStep = 0.05;
  const duration: number = 0.4;
  const ease: EasingDefinition = 'easeOut';
  const animationYDistance: number = 80;

  return (
    <div className=" container px-4 space-y-2 sm:space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -1*animationYDistance }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay:animationDelay + 0 * animationDelayStep, ease: ease }}
        className="flex flex-row w-full items-end justify-center"
        aria-label="Salary Page"
      >
        <p className="pt-5 font-bold pointer-events-none text-4xl text-center md:text-5xl lg:text-6xl">
          Salary
        </p>
        <p className="pt-5 font-bold pointer-events-none text-2xl text-center md:text-3xl lg:text-4xl px-2 sm:px-3 md:px-4 text-foreground/50">
          &
        </p>
        <p className="pt-5 font-bold pointer-events-none text-4xl text-center md:text-5xl lg:text-6xl">
          Tax
        </p>
      </motion.div>

      <SectionHeader
        label="Income Details"
        animationDelay={animationDelay + 0 * animationDelayStep}
        animationDuration={duration}
        animationEase={ease}
        animationYDistance={animationYDistance}
        
      />
      <InputComponents
        animationDelay={animationDelay + 1 * animationDelayStep}
        animationDuration={duration}
        animationEase={ease}
        animationYDistance={animationYDistance}
      />

      <SectionHeader
        label="Evaluation"
        animationDelay={animationDelay + 2 * animationDelayStep}
        animationDuration={duration}
        animationEase={ease}
        animationYDistance={animationYDistance}
      />
      <EvaluationCards
        animationDelay={animationDelay + 3 * animationDelayStep}
        animationDuration={duration}
        animationEase={ease}
        animationYDistance={animationYDistance}
      />

      <SectionHeader
        label="Income vs Tax"
        animationDelay={animationDelay + 4 * animationDelayStep}
        animationDuration={duration}
        animationEase={ease}
        animationYDistance={animationYDistance}
      />
      <motion.div
        initial={{ opacity: 0, y: animationYDistance }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: duration,
          delay: animationDelay + 5 * animationDelayStep,
          ease: ease,
        }}
        className="w-full h-96  bg-card rounded-xl p-4 shadow-2xl border border-card-foreground/20"
      >
        <TaxComparisonChart />
      </motion.div>

      <div className="flex flex-row min-h-32"></div>
    </div>
  );
};

export default SalaryPage;
