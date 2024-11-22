import { useComparison } from '@/hooks/useComparison';
import CardFooter from '@/pages/Comparison/components/CardFooter';
import CardHeading from '@/pages/Comparison/components/CardHeading';
import CardValue from '@/pages/Comparison/components/CardValue';
import MonthlyBondExplanationPopover from '@/pages/Comparison/components/MonthlyBondExplanationPopover';
import TotalBondRepaymentExplanationPopover from '@/pages/Comparison/components/TotalBondRepaymentExplanationPopover';
import { formatNumber } from '@/utils/formatNumber';

function EvaluationCard() {
  const {
    loanTermYears,
    bondCosts,
    monthlyPayment,
    annualInterestRate,
    principleAmount,
  } = useComparison();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ">
      <div className="flex flex-col space-y-1 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg">
        <CardHeading label="Principle Amount" />

        <CardValue value={principleAmount} prefix="R" />

        <CardFooter label="Initial Loan" />
      </div>

      <div className="flex flex-col space-y-1 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg">
        <CardHeading label="Loan Term" />

        <CardValue value={loanTermYears} suffix={`Years`} />

        <CardFooter label={`At ${annualInterestRate}% Interest`} />
      </div>

      <div className="flex flex-col space-y-1 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg">
        <CardHeading
          label="Bond Repayments"
          explanationPopover={<MonthlyBondExplanationPopover />}
        />

        <CardValue value={monthlyPayment} prefix="R" />

        <CardFooter label="Per Month" />
      </div>

      <div className="flex flex-col space-y-1 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg">
        <CardHeading
          label="Total Bond Repayment"
          explanationPopover={<TotalBondRepaymentExplanationPopover />}
        />

        <CardValue value={bondCosts[loanTermYears]} prefix="R" />

        <CardFooter label={`Over ${formatNumber(loanTermYears)} Years`} />
      </div>
    </div>
  );
}

export default EvaluationCard;
