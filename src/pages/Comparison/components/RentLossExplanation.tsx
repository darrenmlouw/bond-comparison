import { InlineMath, BlockMath } from 'react-katex';
import InfoDialog from '@/components/InfoDialog';
import { formatNumber } from '@/utils/formatNumber';
import { useComparison } from '@/hooks/useComparison';

const RentLossExplanation = () => {
  const {
    monthlyRent,
    annualRentIncrease,
    yearOfSale,
    rentData,
  } = useComparison();

  // Variables
  const MR = monthlyRent; // Monthly Rent
  const RIR = annualRentIncrease; // Rent Increase Rate
  const RL = Math.abs(rentData[yearOfSale]); // Rent Paid (absolute value for clarity)

  return (
    <InfoDialog title="Rent Paid Explanation">
      <p className="mb-4">
        The total rent loss over the selected period is calculated as:
      </p>

      {/* Main Formula */}
      <BlockMath>
        {String.raw`
        \text{Rent Loss (RL)} = \sum_{i=1}^{n} \text{Annual Rent}_i
        `}
      </BlockMath>

      <p className="mt-4">Where:</p>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <InlineMath math={`MR = ${formatNumber(MR)}`} />
          <p>Initial Monthly Rent</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`RIR = ${RIR}\\%`} />
          <p>Annual Rent Increase Rate</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`RL = ${formatNumber(RL)}`} />
          <p>Total Rent Loss after {yearOfSale} years</p>
        </div>
      </div>

      {/* Rent Paid Explanation */}
      <p className="mt-4">The rent paid each year accounts for annual increases:</p>
      <BlockMath>
        {String.raw`
        \text{Annual Rent}_i = MR \cdot 12 \cdot (1 + RIR/100)^{i-1}
        `}
      </BlockMath>

      <p className="mt-4">Summing up for each year gives the total rent paid:</p>
      <BlockMath>{String.raw`RL = ${formatNumber(RL)}`}</BlockMath>
    </InfoDialog>
  );
};

export default RentLossExplanation;
