import { InlineMath, BlockMath } from 'react-katex';
import InfoDialog from '@/components/InfoDialog';
import { formatNumber } from '@/utils/formatNumber';
import { useComparison } from '@/hooks/useComparison';

const RentLossExplanation = () => {
  const {
    monthlyRent: MR, // Monthly Rent
    annualRentIncrease: RIR, // Annual Rent Increase Rate
    yearOfSale, // Year of Sale
    rentData, // Rent Data
  } = useComparison();

  const RL = Math.abs(rentData[yearOfSale]); // Total Rent Paid (absolute value for clarity)

  return (
    <InfoDialog title="Rent Paid Explanation">
      <p className="mb-4">
        The total rent paid over the selected period is calculated as the sum of the annual rent for each year leading up to the year of sale:
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
          <InlineMath math={`n = ${yearOfSale}`} />
          <p>Number of Years</p>
        </div>
      </div>

      {/* Annual Rent Explanation */}
      <p className="mt-4">
        The rent paid for each year accounts for the annual rent increase and is calculated as:
      </p>
      <BlockMath>
        {String.raw`
        \text{Annual Rent}_i = MR \cdot 12 \cdot (1 + \frac{RIR}{100})^{i-1}
        `}
      </BlockMath>

      {/* Total Rent Paid */}
      <p className="mt-4">
        Summing the annual rent for all years gives the total rent paid (RL):
      </p>
      <BlockMath>{String.raw`RL = ${formatNumber(RL)}`}</BlockMath>
    </InfoDialog>
  );
};

export default RentLossExplanation;
