import Card from '@/components/card/Card';
import { useSalary } from '@/hooks/useSalary';
import { calculateTax } from '@/utils/incomeTaxCalculations';

function EvaluationCards() {
  const { grossAnnualIncome, annualDeductions, age, year } = useSalary();

  const tax = calculateTax(grossAnnualIncome, annualDeductions, age, year);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ">
      <Card
        label="Gross Annual Income"
        value={grossAnnualIncome}
        prefix="R"
        footer="Before Tax"
        color="text-green-600"
      />

      <Card
        label="Net Annual Income"
        value={grossAnnualIncome - tax - annualDeductions}
        prefix="R"
        footer={`After Tax and Deductions`}
        color="text-yellow-600"
      />

      <Card
        label="Annual Pre-Tax Deductions"
        value={annualDeductions}
        prefix="R"
        footer="Total Deductions"
        color="text-orange-600"
      />

      <Card
        label="Annual Tax"
        value={tax}
        prefix="R"
        footer="Total Tax"
        color="text-red-500"
      />
    </div>
  );
}

export default EvaluationCards;
