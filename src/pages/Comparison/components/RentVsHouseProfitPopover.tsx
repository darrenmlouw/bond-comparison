import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import InfoPopOver from '@/components/InfoPopOver';
import { formatNumber } from '@/utils/formatNumber';

interface RentVsHouseComparisonPopoverProps {
  yearOfSale: number;
  moneyMadeFromSellingHouse: number[];
  rentData: number[];
}

const RentVsHouseComparisonPopover: React.FC<RentVsHouseComparisonPopoverProps> = ({
  yearOfSale,
  moneyMadeFromSellingHouse,
  rentData,
}) => {
  const houseValue = Number(moneyMadeFromSellingHouse[yearOfSale]);
  const rentCost = Number(rentData[yearOfSale]);
  const moneyDifference = houseValue - rentCost;

  return (
    <InfoPopOver>
      <div className="text-lg font-bold">Net Difference Calculation</div>

      <p>The net difference in money after buying and selling the house versus renting is calculated as:</p>

      <BlockMath>
        {String.raw`\text{Net Difference} = HV - RC`}
      </BlockMath>

      <p>Where:</p>

      <div className="flex justify-between">
        <InlineMath math={`HV= ${formatNumber(moneyMadeFromSellingHouse[yearOfSale])}`} />
        <p>House Value</p>
      </div>

      <div className="flex justify-between pb-4">
        <InlineMath math={`RC= ${formatNumber(rentData[yearOfSale])}`} />
        <p>Rent Cost</p>
      </div>

      <InlineMath>
        {String.raw`\text{Net Difference} = (${formatNumber(houseValue)}) - (${formatNumber(rentCost)})`}
      </InlineMath>

      <InlineMath>
        {String.raw`\text{Net Difference} = ${formatNumber(moneyDifference)}`}
      </InlineMath>
    </InfoPopOver>
  );
};

export default RentVsHouseComparisonPopover;
