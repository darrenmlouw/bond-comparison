import TaxComparisonChart from '@/components/TaxComparisonChart';
import { SectionHeader } from '@/components/SectionHeader';
import InputComponents from '@/pages/Salary/components/InputComponents';
import EvaluationCards from '@/pages/Salary/components/EvaluationCards';
import { motion } from 'framer-motion';

const SalaryPage = () => {
  return (
    <div className=" container px-4 space-y-2 sm:space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start fully transparent and 50px higher
        animate={{ opacity: 1, y: 0 }} // Fade in and move to original position
        transition={{ duration: 0.5 }} // Duration of the animation
        className="flex flex-row w-full items-end justify-center"
        aria-label='Salary Page'
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

      <SectionHeader label="Income Details" />
      <InputComponents />

      <SectionHeader label="Evaluation" />
      <EvaluationCards />

      <SectionHeader label="Income vs Tax" />
      <div className="w-full h-96  bg-card rounded-xl p-4 shadow-2xl border border-card-foreground/20">
        <TaxComparisonChart />
      </div>

      <div className="flex flex-row min-h-32"></div>
    </div>
  );
};

export default SalaryPage;
