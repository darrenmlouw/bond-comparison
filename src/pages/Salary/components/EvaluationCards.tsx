import Card from '@/components/card/Card';
import FillShape from '@/components/FillShape';
import { useSalary } from '@/hooks/useSalary';
import { calculateTax } from '@/utils/incomeTaxCalculations';

function EvaluationCards() {
  const { grossAnnualIncome, annualDeductions, age, year } = useSalary();

  const tax = calculateTax(grossAnnualIncome, annualDeductions, age, year);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-red-600">
      <Card
        label="Gross Annual Income"
        value={grossAnnualIncome}
        prefix="R"
        footer="Before Tax and Deductions"
        color="text-green-600"
        icon={
          <FillShape color="#16A34A" percentage={100} size={15} shape='circle' />
        }
      />

      <Card
        label="Net Annual Income"
        value={grossAnnualIncome - tax - annualDeductions}
        prefix="R"
        footer={`After Tax and Deductions`}
        color="text-yellow-600"
        icon={
          <FillShape color="#CA8A04" percentage={
            (grossAnnualIncome - tax - annualDeductions)/grossAnnualIncome * 100
          } size={15} shape='circle' />
        }
      />

      <Card
        label="Annual Pre-Tax Deductions"
        value={annualDeductions}
        prefix="R"
        footer="Total Deductions"
        color="text-orange-600"
        icon={
          <FillShape color="#EA580C" percentage={annualDeductions/grossAnnualIncome * 100} size={15} shape='circle' />
        }
      />

      <Card
        label="Annual Tax"
        value={tax}
        prefix="R"
        footer="Total Tax"
        color="text-red-500"
        icon={
          <FillShape color="#DC2626" percentage={tax/grossAnnualIncome * 100} size={15} shape='circle' />
        }
      />
    </div>
  );
}

export default EvaluationCards;
