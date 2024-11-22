import { useComparison } from '@/hooks/useComparison';
import CapitalGainsExplanationPopover from '@/pages/Comparison/components/CapitalGainsExplanationPopover';
import CardHeading from '@/pages/Comparison/components/CardHeading';
import CardValue from '@/pages/Comparison/components/CardValue';
import MonthlyBondExplanationPopover from '@/pages/Comparison/components/MonthlyBondExplanationPopover';
import TotalBondRepaymentExplanationPopover from '@/pages/Comparison/components/TotalBondRepaymentExplanationPopover';
import { motion, AnimatePresence } from 'framer-motion';

function EvaluationCard() {
  const {
    loanTermYears,
    yearOfSale,
    capitalGainsTax,
    bondCosts,
    monthlyPayment,
  } = useComparison();

  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6.5 md:gap-8 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-xl">
      <div className="flex flex-col">
        <CardHeading
          label="Bond Repayments"
          explanationPopover={<MonthlyBondExplanationPopover />}
        />

        <CardValue value={monthlyPayment} prefix="R" suffix="/Month" />
      </div>

      <div className="flex flex-col">
        <CardHeading
          label="Total Bond Repayment"
          explanationPopover={<TotalBondRepaymentExplanationPopover />}
        />

        <CardValue
          value={bondCosts[loanTermYears]}
          prefix="R"
          suffix={`Over ${loanTermYears} Years`}
        />
      </div>

      <div className="flex flex-col justify-between items-start col-span-1 sm:col-span-2">
        <CardHeading
          label="Capital Gains Tax"
          explanationPopover={<CapitalGainsExplanationPopover />}
        />

        <CardValue value={capitalGainsTax[yearOfSale]} prefix="R" suffix={``} />
      </div>
    </motion.div>
  );
}

export default EvaluationCard;
