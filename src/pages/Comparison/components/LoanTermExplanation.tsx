import { InlineMath, BlockMath } from 'react-katex';
import InfoDialog from '@/components/InfoDialog';
import { useComparison } from '@/hooks/useComparison';

const LoanTermExplanation = () => {
  const { annualInterestRate, loanTermYears } =
    useComparison();

  return (
    <InfoDialog title='Loan Term'>
      <div className="flex flex-col space-y-4 text-xs">
        {/* Loan Term Explanation */}
        <div>
          <p>
            The loan term refers to the duration (in years) over which you agree
            to repay your loan. A longer loan term results in lower monthly
            payments but increases the total interest paid.
          </p>

          <BlockMath math="n = \text{Years} \cdot 12" />

          <div className="flex flex-row justify-between">
            <InlineMath math={`n = ${loanTermYears * 12}`} />
            <p>Total number of months</p>
          </div>
        </div>

        {/* Interest Explanation */}
        <div>
          <p>
            Interest is the cost of borrowing money, expressed as an annual
            percentage rate (APR). It is calculated monthly based on the
            remaining principal amount.
          </p>

          <BlockMath math="r = \frac{\text{APR}}{12}" />

          <div className="flex flex-row justify-between">
            <InlineMath
              math={`r = ${(annualInterestRate / 12 / 100).toFixed(6)}`}
            />
            <p>Monthly Interest Rate</p>
          </div>
        </div>
      </div>
    </InfoDialog>
  );
};

export default LoanTermExplanation;
