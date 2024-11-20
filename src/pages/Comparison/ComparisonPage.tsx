import HousingComparisonChart from '@/components/HousingComparisonChart';

import InputComponents from '@/pages/Comparison/components/InputComponents';
import EvaluationCard from '@/pages/Comparison/components/EvaluationCard';
import SectionSubHeading from '@/pages/Comparison/components/SectionSubHeading';
import RentVsHouseCard from '@/pages/Comparison/components/RentVsHouseCard';

const ComparisonPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full items-center ">
      <div className="px-4 space-y-2 container">
        <p className="pt-10 font-bold px-4 pointer-events-none text-5xl text-center md:text-6xl lg:text-7xl mb-10">
          Rent vs Buy Comparison
        </p>

        <p className="text-center text-lg sm:text-xl text-primary-foreground/70 mb-3 sm:mb-4 md:mb-6">
          Analyze and compare the costs of renting versus buying a home over
          time.
        </p>

        <SectionSubHeading label="Property Information" />
        <InputComponents />

        <SectionSubHeading label="House Evaluation" />
        <EvaluationCard />

        <SectionSubHeading label="Rent vs House Costs" />
        <RentVsHouseCard />

        <SectionSubHeading label="Comparison of Rent and House Costs" />
        <div className="h-96 w-full bg-card rounded-xl p-4 shadow-2xl border border-card-foreground/20">
          <HousingComparisonChart />
        </div>

        <div className="flex flex-row min-h-32" />
      </div>
    </div>
  );
};

export default ComparisonPage;
