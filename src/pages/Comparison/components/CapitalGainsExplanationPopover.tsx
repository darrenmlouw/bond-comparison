import { InlineMath, BlockMath } from 'react-katex';
import InfoPopOver from '@/components/InfoPopOver';
import { useComparison } from '@/hooks/useComparison';

const CapitalGainsExplanationPopover = () => {
  const {
    houseValueAfterAppreciationData,
    principleAmount,
    totalBuyingCosts,
    yearOfSale,
    exclusion,
    inclusionRate,
    marginalTaxRate,
  } = useComparison();

  const sellingPrice = houseValueAfterAppreciationData[yearOfSale];
  const baseCost = principleAmount + totalBuyingCosts;

  const capitalGain = parseFloat((sellingPrice - baseCost).toFixed(2));
  const netCapitalGain = parseFloat(
    Math.max(0, capitalGain - exclusion).toFixed(2)
  );
  const taxableGain = parseFloat((netCapitalGain * inclusionRate).toFixed(2));
  const capitalGainsTax = parseFloat(
    (taxableGain * marginalTaxRate).toFixed(2)
  );

  return (
    <InfoPopOver>
      <div className="text-lg font-bold">Capital Gains Tax Calculation</div>

      <p>The capital gains tax (CGT) is calculated as:</p>

      <BlockMath math="CGT = (NCG) \times (IR) \times (MTR)" />

      <div className="space-y-2 ">
        <div className="font-semibold text-sm mt-2">Where:</div>

        <div className="flex justify-between">
          <InlineMath math={`SP = ${sellingPrice.toFixed(2)}`} />
          <p>Selling Price</p>
        </div>

        <div className="flex justify-between">
          <InlineMath math={`BC = ${baseCost.toFixed(2)}`} />
          <p>Base Cost</p>
        </div>

        <div className="flex justify-between ">
          <BlockMath>
            {String.raw`
              \begin{align*}
                \text{CG} &= \text{SP} - \text{BC} \\
                &= ${sellingPrice.toFixed(2)} - ${baseCost.toFixed(2)} \\
                &= ${capitalGain.toFixed(2)}
              \end{align*}
            `}
          </BlockMath>
        </div>

        <div className="flex justify-between">
          <InlineMath math={`EX = ${exclusion.toFixed(2)}`} />
          <p>Exclusion</p>
        </div>

        <div className="flex justify-start">
          <BlockMath>
            {String.raw`
              \begin{align*}
                \text{NCG} &= \text{CG} - \text{EX} \\
                &= ${capitalGain.toFixed(2)} - ${exclusion.toFixed(2)} \\
                &= ${netCapitalGain.toFixed(2)}
              \end{align*}
            `}
          </BlockMath>
        </div>

        <div className="text-xs text-card-foreground/50 font-medium">
          Additional Terms:
        </div>

        <div className="flex justify-between">
          <InlineMath math={`IR = ${inclusionRate.toFixed(2)}`} />
          <p>Inclusion Rate</p>
        </div>

        <div className="flex justify-between">
          <InlineMath math={`MTR = ${marginalTaxRate.toFixed(2)}`} />
          <p>Marginal Tax Rate</p>
        </div>
      </div>

      <div className="mt-3">
        <BlockMath>{String.raw`CGT = ${netCapitalGain.toFixed(
          2
        )} \times ${inclusionRate.toFixed(2)} \times ${marginalTaxRate.toFixed(
          2
        )} = ${capitalGainsTax.toFixed(2)}`}</BlockMath>
      </div>

      <div className="mt-2 font-semibold text-base text-primary">
        Capital Gains Tax:{' '}
        <span className="">R {capitalGainsTax.toFixed(2)}</span>
      </div>
    </InfoPopOver>
  );
};

export default CapitalGainsExplanationPopover;
