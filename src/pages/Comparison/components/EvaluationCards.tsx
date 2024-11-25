import { useComparison } from '@/hooks/useComparison';
import Card from '@/components/card/Card';
import MonthlyBondExplanation from '@/pages/Comparison/components/MonthlyBondExplanation';
import TotalBondRepaymentExplanation from '@/pages/Comparison/components/TotalBondRepaymentExplanation';
import { formatNumber } from '@/utils/formatNumber';
import PrincipleExplanation from '@/pages/Comparison/components/PrincipleExplanation';
import LoanTermExplanation from '@/pages/Comparison/components/LoanTermExplanation';

function EvaluationCards() {
  const {
    loanTermYears,
    bondCosts,
    monthlyPayment,
    annualInterestRate,
    principleAmount,
  } = useComparison();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ">
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
    </div>
  );
}

export default EvaluationCards;
