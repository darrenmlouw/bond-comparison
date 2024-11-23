import HousingComparisonChart from '@/components/HousingComparisonChart';
import InputComponents from '@/pages/Comparison/components/InputComponents';
import EvaluationCards from '@/pages/Comparison/components/EvaluationCards';
import RentVsHouseCard from '@/pages/Comparison/components/RentVsHouseCard';
import { SectionHeader } from '@/components/SectionHeader';

const ComparisonPage = () => {
  return (
    <div className=" container px-4 space-y-2 sm:space-y-4">
      <p className="pt-5 font-bold px-4 pointer-events-none text-4xl text-center md:text-5xl lg:text-6xl">
        Rent vs Buy
      </p>

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
