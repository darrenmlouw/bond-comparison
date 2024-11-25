import { InlineMath, BlockMath } from 'react-katex';
import InfoPopOver from '@/components/InfoPopOver';
import { useComparison } from '@/hooks/useComparison';

const MonthlyBondExplanation = () => {
  const { principleAmount, annualInterestRate, loanTermYears, monthlyPayment } =
    useComparison();

  return (
    <InfoPopOver>
      <div className="flex flex-col space-y-2 text-xs">
        <p className="flex text-xs">
          The monthly repayment amount is calculated using the formula:
        </p>

        <BlockMath math="R = \frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}" />

        <div className="flex flex-col">
          <p className="text-xs">where:</p>

          <div className="flex flex-row justify-between">
            <InlineMath math={`P = ${principleAmount}`} />
            <p>Principal Amount</p>
          </div>

          <div className="flex flex-row justify-between">
            <InlineMath
              math={`r = ${(annualInterestRate / 12 / 100).toFixed(6)}`}
            />
            <p>Monthly Interest Rate</p>
          </div>

          <div className="flex flex-row justify-between">
            <InlineMath math={`n = ${loanTermYears * 12}`} />
            <p>Number of Months</p>
          </div>
        </div>

        <BlockMath>{String.raw`R = \frac{\text{${principleAmount}} \cdot \text{${(
          annualInterestRate /
          12 /
          100
        ).toFixed(5)}} \cdot (1 + \text{${(
          annualInterestRate /
          12 /
          100
        ).toFixed(5)}})^\text{${loanTermYears * 12}}}{(1 + \text{${(
          annualInterestRate /
          12 /
          100
        ).toFixed(5)}})^\text{${loanTermYears * 12}} - 1}`}</BlockMath>

        <p>Based on the current inputs, the monthly payment is:</p>

        {/* calculate the monthly repayment */}
        <BlockMath>{String.raw`R = \text{${monthlyPayment.toFixed(
          2
        )}}`}</BlockMath>
      </div>
    </InfoPopOver>
  );
};

export default MonthlyBondExplanation;
