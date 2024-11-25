import HousingComparisonChart from '@/components/HousingComparisonChart';
import InputComponents from '@/pages/Comparison/components/InputComponents';
import EvaluationCards from '@/pages/Comparison/components/EvaluationCards';
import RentVsHouseCard from '@/pages/Comparison/components/RentVsHouseCard';
import { SectionHeader } from '@/components/SectionHeader';
import { motion } from 'framer-motion';

const ComparisonPage = () => {
  return (
    <div className=" container px-4 space-y-2 sm:space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start fully transparent and 50px higher
        animate={{ opacity: 1, y: 0 }} // Fade in and move to original position
        transition={{ duration: 0.5 }} // Duration of the animation
        className="flex flex-row w-full items-end justify-center"
        aria-label='Comparison Page'
      >
        <p className="pt-5 font-bold pointer-events-none text-4xl text-center md:text-5xl lg:text-6xl">
          Rent
        </p>
        <p className="pt-5 font-bold pointer-events-none text-2xl text-center md:text-3xl lg:text-4xl px-2 sm:px-3 md:px-4 text-foreground/50">
          vs
        </p>
        <p className="pt-5 font-bold pointer-events-none text-4xl text-center md:text-5xl lg:text-6xl">
          Buy
        </p>
      </motion.div>

      <SectionHeader label="Property Information" />
      <InputComponents />

      <SectionHeader label="House Evaluation" />
      <EvaluationCards />

      <SectionHeader label="Rent vs House Costs" />
      <RentVsHouseCard />

      <SectionHeader label="Comparison" />
      <div className="w-full h-96  bg-card rounded-xl p-4 shadow-2xl border border-card-foreground/20">
        <HousingComparisonChart />
      </div>

      <div className="flex flex-row min-h-32" />
    </div>
  );
};

export default ComparisonPage;
