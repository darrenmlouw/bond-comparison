import { useComparison } from '@/hooks/useComparison';
import CapitalGainsExplanationPopover from '@/pages/Comparison/components/CapitalGainsExplanationPopover';
import CardHeading from '@/pages/Comparison/components/CardHeading';
import CardValue from '@/pages/Comparison/components/CardValue';
import MonthlyBondExplanationPopover from '@/pages/Comparison/components/MonthlyBondExplanationPopover';
import TotalBondRepaymentExplanationPopover from '@/pages/Comparison/components/TotalBondRepaymentExplanationPopover';
import { formatNumber } from '@/utils/formatNumber';

function EvaluationCard() {
  const {
    loanTermYears = 0,
    yearOfSale = 0,
    capitalGainsTax,
    bondCosts,
    monthlyPayment,
    principleAmount
  } = useComparison();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 ">
      <div className="flex flex-col bg-card outline outline-1 outline-card-foreground/20 shadow-lg p-2.5 sm:p-4 rounded-lg">
        <CardHeading
          label="Principle"
          
        />

        <CardValue value={principleAmount} prefix="R" suffix="" />
      </div>
      
      <div className="flex flex-col bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg">
        <CardHeading
          label="Bond Repayments"
          explanationPopover={<MonthlyBondExplanationPopover />}
        />

        <CardValue value={monthlyPayment} prefix="R" suffix="/Month" />
      </div>

      <div className="flex flex-col bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg">
        <CardHeading
          label="Total Bond Repayment"
          explanationPopover={<TotalBondRepaymentExplanationPopover />}
        />

        <CardValue
          value={bondCosts[loanTermYears]}
          prefix="R"
          suffix={`${formatNumber(loanTermYears)} Years`}
        />
      </div>

      <div className="flex flex-col bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg">
        <CardHeading
          label="Capital Gains Tax"
          explanationPopover={<CapitalGainsExplanationPopover />}
        />

        <CardValue value={capitalGainsTax[yearOfSale]} prefix="R" suffix={``} />
      </div>
    </div>
  );
}

export default EvaluationCard;
