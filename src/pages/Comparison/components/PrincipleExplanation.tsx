import { InlineMath, BlockMath } from 'react-katex';
import InfoDialog from '@/components/InfoDialog';
import { useComparison } from '@/hooks/useComparison';

const PrincipleExplanation = () => {
  const {
    principleAmount,
    propertyPrice,
    depositAmount,
    buyingCosts,
    addBuyingCostsToBond,
  } = useComparison();

  return (
    <InfoDialog title='Principle'>
      <div className="flex flex-col space-y-2 text-xs">
        <p className="flex text-xs">
          The principal amount is the initial amount of the loan after subtracting any deposit and optionally adding buying costs, if applicable.
        </p>

        <BlockMath math="\text{Principle} \ (P) = PP - D + BC \ \ \text{(if added to bond)}" />

        <div className="flex flex-col">
          <p className="text-xs">where:</p>

          <div className="flex flex-row justify-between">
            <InlineMath math={`PP = ${propertyPrice}`} />
            <p>Price of the property</p>
          </div>

          <div className="flex flex-row justify-between">
            <InlineMath math={`D = ${depositAmount}`} />
            <p>Deposit paid upfront</p>
          </div>

          <div className="flex flex-row justify-between">
            <InlineMath
              math={`BC = ${addBuyingCostsToBond ? buyingCosts : 0}`}
            />
            <p>Buying costs {addBuyingCostsToBond ? "(Added)" : "(Not Added)"}</p>
          </div>
        </div>

        <BlockMath>
          {String.raw`P = \text{${propertyPrice}} - \text{${depositAmount}} + \text{${addBuyingCostsToBond ? buyingCosts : 0}}`}
        </BlockMath>

        <p className="text-xs">
          Therefore, the calculated principal amount is:
        </p>

        <BlockMath>{String.raw`P = \text{${principleAmount}}`}</BlockMath>
      </div>
    </InfoDialog>
  );
};

export default PrincipleExplanation;
