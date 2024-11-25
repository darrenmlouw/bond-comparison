import { InlineMath, BlockMath } from 'react-katex';
import InfoDialog from '@/components/InfoDialog';
import { formatNumber } from '@/utils/formatNumber';
import { useComparison } from '@/hooks/useComparison';

const MoneyMadeFromSellingHouseExplanation = () => {
  const {
    houseValueAfterAppreciationData,
    remainingPrincipal,
    capitalGainsTax,
    totalBuyingCosts,
    totalSellingCosts,
    yearOfSale,
    monthlyFees,
    bondCosts,
  } = useComparison();

  // Variables
  const SP = houseValueAfterAppreciationData[yearOfSale]; // Selling Price
  const D = remainingPrincipal[yearOfSale]; // Debt
  const T = capitalGainsTax[yearOfSale] || 0; // Taxes

  const SC = totalSellingCosts; // Selling Costs

  const BC = totalBuyingCosts; // Buying
  const CB = bondCosts[yearOfSale]; // Cumulative Bond Repayments
  const CF = monthlyFees * yearOfSale * 12; // Cumulative Fees
  const OC = BC + CB + CF; // Ownership Costs

  const NSP = SP - D - T - SC; // Net Selling Proceeds
  const NM = NSP - OC; // Net Money Made

  return (
    <InfoDialog title="Money Made from Selling the House">
      <p className="mb-4">
        The net money made from selling the house is calculated as:
      </p>

      {/* Main Formula */}
      <BlockMath>
        {String.raw`
        \text{Net Money Made (NM)} = (\text{SP} - \text{D} - \text{T} - \text{SC}) - \text{OC}
        `}
      </BlockMath>

      {/* Explanation of Variables */}
      <p className="mt-4">Where:</p>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <InlineMath math={`SP = ${formatNumber(SP)}`} />
          <p>Selling Price (House value after appreciation)</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`D = ${formatNumber(D)}`} />
          <p>Debt (Remaining loan principal)</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`T = ${formatNumber(T)}`} />
          <p>Taxes (Capital gains tax)</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`SC = ${formatNumber(SC)}`} />
          <p>Selling Costs</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`BC = ${formatNumber(BC)}`} />
          <p>Buying Costs</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`CB = ${formatNumber(CB)}`} />
          <p>Cumulative Bond Repayments</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`CF = ${formatNumber(CF)}`} />
          <p>Cumulative Monthly Fees</p>
        </div>
        <div className="flex justify-between">
          <InlineMath math={`OC = BC + CB + CF = ${formatNumber(OC)}`} />
          <p>Total Ownership Costs</p>
        </div>
      </div>

      {/* Net Selling Proceeds */}
      <p className="mt-4">The net selling proceeds (NSP) are:</p>
      <BlockMath>
        {String.raw`
        \text{NSP} = \text{SP} - \text{D} - \text{T} - \text{SC}
        `}
      </BlockMath>
      <BlockMath>{String.raw`\text{NSP} = ${formatNumber(NSP)}`}</BlockMath>

      {/* Net Money Made */}
      <p className="mt-4">Finally, the total net money made (NM) is:</p>
      <BlockMath>
        {String.raw`
        \text{NM} = \text{NSP} - \text{OC}
        `}
      </BlockMath>
      <BlockMath>{String.raw`\text{NM} = ${formatNumber(NM)}`}</BlockMath>
    </InfoDialog>
  );
};

export default MoneyMadeFromSellingHouseExplanation;
