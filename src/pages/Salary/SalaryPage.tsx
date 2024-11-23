import TaxComparisonChart from '@/components/TaxComparisonChart';
import { SectionHeader } from '@/components/SectionHeader';
import InputComponents from '@/pages/Salary/components/InputComponents';
import EvaluationCards from '@/pages/Salary/components/EvaluationCards';

const SalaryPage = () => {
  return (
    <div className=" container px-4 space-y-2 sm:space-y-4">
      <p className="pt-5 font-bold px-4 pointer-events-none text-4xl text-center md:text-5xl lg:text-6xl ">
        Salary and Tax
      </p>

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
