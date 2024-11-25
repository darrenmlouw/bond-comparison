import { InlineMath, BlockMath } from 'react-katex';
import InfoDialog from '@/components/InfoDialog';
import { useComparison } from '@/hooks/useComparison';

const CapitalGainsExplanationPopover = () => {
  const {
    houseValueAfterAppreciationData,
    principleAmount = 0, // Fallback to 0
    totalBuyingCosts = 0, // Fallback to 0
    yearOfSale = 0, // Default year
    exclusion = 0, // Fallback to 0
    inclusionRate = 0, // Fallback to 0
    marginalTaxRate = 0, // Fallback to 0
  } = useComparison();

  const sellingPrice =
    houseValueAfterAppreciationData?.[yearOfSale] ?? 0; // Fallback to 0
  const baseCost = principleAmount + totalBuyingCosts;

  const capitalGain = sellingPrice - baseCost;
  const netCapitalGain = Math.max(0, capitalGain - exclusion);
  const taxableGain = netCapitalGain * inclusionRate;
  const capitalGainsTax = taxableGain * marginalTaxRate;

  return (
    <InfoDialog title='Capital Gains'>
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
    </InfoDialog>
  );
};

export default CapitalGainsExplanationPopover;
