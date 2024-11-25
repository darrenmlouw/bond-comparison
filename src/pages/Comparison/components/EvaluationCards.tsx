import { useComparison } from '@/hooks/useComparison';
import Card from '@/components/card/Card';
import MonthlyBondExplanation from '@/pages/Comparison/components/MonthlyBondExplanation';
import TotalBondRepaymentExplanation from '@/pages/Comparison/components/TotalBondRepaymentExplanation';
import { formatNumber } from '@/utils/formatNumber';
import PrincipleExplanation from '@/pages/Comparison/components/PrincipleExplanation';
import LoanTermExplanation from '@/pages/Comparison/components/LoanTermExplanation';
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
  const {
    loanTermYears,
    bondCosts,
    monthlyPayment,
    annualInterestRate,
    principleAmount,
  } = useComparison();

  return (
    <motion.div
      initial={{ opacity: 0, x: animationXDistance, y: animationYDistance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: animationEase,
      }}
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 "
    >
      <Card
        label="Prinipal Amount"
        value={principleAmount}
        prefix="R"
        footer="Initial Loan"
        icon={<PrincipleExplanation />}
      />

      <Card
        label="Loan Term"
        value={loanTermYears}
        suffix="Years"
        footer={`At ${annualInterestRate}% Interest`}
        icon={<LoanTermExplanation />}
      />

      <Card
        label="Bond Repayments"
        value={monthlyPayment}
        prefix="R"
        footer="Per Month"
        icon={<MonthlyBondExplanation />}
      />

      <Card
        label="Total Bond Repayment"
        value={bondCosts[loanTermYears]}
        prefix="R"
        footer={`Over ${formatNumber(loanTermYears)} Years`}
        icon={<TotalBondRepaymentExplanation />}
      />
    </motion.div>
  );
}

export default EvaluationCards;
