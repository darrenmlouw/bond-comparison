import { useComparison } from '@/hooks/useComparison';
import Card from '@/components/card/Card';
import MonthlyBondExplanationPopover from '@/pages/Comparison/components/MonthlyBondExplanationPopover';
import TotalBondRepaymentExplanationPopover from '@/pages/Comparison/components/TotalBondRepaymentExplanationPopover';
import { formatNumber } from '@/utils/formatNumber';

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
      />

      <Card
        label="Loan Term"
        value={loanTermYears}
        suffix="Years"
        footer={`At ${annualInterestRate}% Interest`}
      />

      <Card
        label="Bond Repayments"
        value={monthlyPayment}
        prefix="R"
        footer="Per Month"
        icon={<MonthlyBondExplanationPopover />}
      />

      <Card
        label='Total Bond Repayment'
        value={bondCosts[loanTermYears]}
        prefix='R'
        footer={`Over ${formatNumber(loanTermYears)} Years`}
        icon={<TotalBondRepaymentExplanationPopover />}
      />
    </div>
  );
}

export default EvaluationCards;
