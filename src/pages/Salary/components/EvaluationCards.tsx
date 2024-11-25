import Card from '@/components/card/Card';
import FillShape from '@/components/FillShape';
import { useSalary } from '@/hooks/useSalary';
import { calculateTax } from '@/utils/incomeTaxCalculations';
import { EasingDefinition, motion } from 'framer-motion';

interface Props {
  animationDelay: number;
  animationDuration: number;
  animationEase?: EasingDefinition;
  animationXDistance?: number;
  animationYDistance?: number;
}

function EvaluationCards({
  animationDelay,
  animationDuration,
  animationEase = 'easeOut',
  animationXDistance = 0,
  animationYDistance = 0,
}: Props) {
  const { grossAnnualIncome, annualDeductions, age, year } = useSalary();

  const tax = calculateTax(grossAnnualIncome, annualDeductions, age, year);

  return (
    <motion.div
      initial={{ opacity: 0, x: animationXDistance, y: animationYDistance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: animationEase,
      }}
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-red-600"
    >
      <Card
        label="Gross Annual Income"
        value={grossAnnualIncome}
        prefix="R"
        footer="Before Tax and Deductions"
        color="text-green-600"
        icon={
          <FillShape
            color="#16A34A"
            percentage={100}
            size={15}
            shape="circle"
          />
        }
      />

      <Card
        label="Net Annual Income"
        value={grossAnnualIncome - tax - annualDeductions}
        prefix="R"
        footer={`After Tax and Deductions`}
        color="text-yellow-600"
        icon={
          <FillShape
            color="#CA8A04"
            percentage={
              ((grossAnnualIncome - tax - annualDeductions) /
                grossAnnualIncome) *
              100
            }
            size={15}
            shape="circle"
          />
        }
      />

      <Card
        label="Annual Pre-Tax Deductions"
        value={annualDeductions}
        prefix="R"
        footer="Total Deductions"
        color="text-orange-600"
        icon={
          <FillShape
            color="#EA580C"
            percentage={(annualDeductions / grossAnnualIncome) * 100}
            size={15}
            shape="circle"
          />
        }
      />

      <Card
        label="Annual Tax"
        value={tax}
        prefix="R"
        footer="Total Tax"
        color="text-red-500"
        icon={
          <FillShape
            color="#DC2626"
            percentage={(tax / grossAnnualIncome) * 100}
            size={15}
            shape="circle"
          />
        }
      />
    </motion.div>
  );
}

export default EvaluationCards;
