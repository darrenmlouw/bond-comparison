import { InlineMath, BlockMath } from 'react-katex';
import InfoPopOver from '@/components/InfoPopOver';
import { useComparison } from '@/hooks/useComparison';


const TotalBondRepaymentExplanation = () => {
  const {monthlyPayment, propertyPrice, depositAmount, annualInterestRate, loanTermYears} = useComparison();

  return (
    <InfoPopOver>
      <div className="flex flex-col space-y-2 text-xs">
        <p className="flex text-xs">
          The total repayment amount is calculated using the formula:
        </p>

        {/* display the formula to calculate the total repayment of the bond*/}
        <BlockMath math="T = R \cdot n" />

        <div>
          <p className="text-xs">where:</p>

          <div className="flex flex-row justify-between">
            <InlineMath math={`R = ${monthlyPayment.toFixed(2)}`} />
            <p>Monthly Repayment</p>
          </div>

          <div className="flex flex-row justify-between">
            <InlineMath math={`n = ${loanTermYears * 12}`} />
            <p>Number of Months</p>
          </div>
        </div>

        <BlockMath math="T = (\frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}) \cdot n" />

        <div className="flex flex-col">
          <p className="text-xs">where:</p>

          <div className="flex flex-row justify-between">
            <InlineMath math={`P = ${propertyPrice - depositAmount}`} />
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

        <BlockMath>{String.raw`T = (\frac{\text{${
          propertyPrice - depositAmount
        }} \cdot \text{${(annualInterestRate / 12 / 100).toFixed(
          5
        )}} \cdot (1 + \text{${(annualInterestRate / 12 / 100).toFixed(
          5
        )}})^\text{${loanTermYears * 12}}}{(1 + \text{${(
          annualInterestRate /
          12 /
          100
        ).toFixed(5)}})^\text{${loanTermYears * 12}} - 1}) \cdot \text{${
          loanTermYears * 12
        }}`}</BlockMath>

        {/* calculate the monthly repayment */}
        <BlockMath>{String.raw`R = \text{${(
          monthlyPayment *
          loanTermYears *
          12
        ).toFixed(2)}}`}</BlockMath>
      </div>
    </InfoPopOver>
  );
};

export default TotalBondRepaymentExplanation;
