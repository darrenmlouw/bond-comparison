import { useComparison } from '@/hooks/useComparison';
import CapitalGainsExplanationPopover from '@/pages/Comparison/components/CapitalGainsExplanationPopover';
import MonthlyBondExplanationPopover from '@/pages/Comparison/components/MonthlyBondExplanationPopover';
import TotalBondRepaymentExplanationPopover from '@/pages/Comparison/components/TotalBondRepaymentExplanationPopover';
import {
  calculateBondCost,
  calculateCapitalGainsTax,
  calculateHouseValueAfterAppreciation,
  calculateMoneyMadeFromSellingHouse,
  calculateRemainingPrincipal,
} from '@/utils/calculations';
import { formatNumber } from '@/utils/formatNumber';
import { useMemo } from 'react';

const checkIfNumber = (value: number, defaultValue: number | undefined = 0) => {
  return isNaN(value) ? defaultValue : value;
};

function EvaluationCard() {
  const {
    propertyPrice,
    depositAmount,
    loanTermYears,
    annualInterestRate,
    annualAppreciationRate,
    buyingCosts,
    otherBuyingCosts,
    addBuyingCostsToBond,
    monthlyLevies,
    monthlyRates,
    monthlyInsurance,
    additionalMonthlyFees,
    yearOfSale,
    sellingCosts,
    otherSellingCosts,
    exclusionType,
    inclusionType,
    smallBusinessMarketValue,
    numberOfPeopleInJointBond,
  } = useComparison();

  const principleAmount = useMemo(() => {
    return addBuyingCostsToBond
      ? checkIfNumber(buyingCosts) +
          checkIfNumber(propertyPrice) -
          checkIfNumber(depositAmount)
      : checkIfNumber(propertyPrice) - checkIfNumber(depositAmount);
  }, [addBuyingCostsToBond, buyingCosts, propertyPrice, depositAmount]);

  const totalBuyingCosts = useMemo(() => {
    return addBuyingCostsToBond
      ? checkIfNumber(otherBuyingCosts)
      : checkIfNumber(buyingCosts) + checkIfNumber(otherBuyingCosts);
  }, [addBuyingCostsToBond, buyingCosts, otherBuyingCosts]);

  const monthlyFees = useMemo(() => {
    return (
      checkIfNumber(monthlyLevies) +
      checkIfNumber(monthlyRates) +
      checkIfNumber(monthlyInsurance) +
      checkIfNumber(additionalMonthlyFees)
    );
  }, [monthlyLevies, monthlyRates, monthlyInsurance, additionalMonthlyFees]);

  const houseValueAfterAppreciationData = useMemo(() => {
    return calculateHouseValueAfterAppreciation(
      checkIfNumber(loanTermYears),
      checkIfNumber(propertyPrice),
      checkIfNumber(annualAppreciationRate)
    );
  }, [loanTermYears, propertyPrice, annualAppreciationRate]);

  const totalSellingCosts = useMemo(() => {
    return checkIfNumber(sellingCosts) + checkIfNumber(otherSellingCosts);
  }, [sellingCosts, otherSellingCosts]);

  const { capitalGainsTax, marginalTaxRate, inclusionRate, exclusion } =
    calculateCapitalGainsTax(
      loanTermYears,
      houseValueAfterAppreciationData,
      propertyPrice,
      inclusionType,
      exclusionType,
      numberOfPeopleInJointBond,
      smallBusinessMarketValue
    );

  const moneyMadeFromSellingHouse = useMemo(() => {
    return calculateMoneyMadeFromSellingHouse(
      checkIfNumber(loanTermYears, 1),
      checkIfNumber(propertyPrice),
      checkIfNumber(depositAmount),
      checkIfNumber(annualAppreciationRate),
      checkIfNumber(totalBuyingCosts),
      checkIfNumber(totalSellingCosts),
      checkIfNumber(monthlyFees),
      checkIfNumber(annualInterestRate),
      capitalGainsTax
    );
  }, [
    loanTermYears,
    propertyPrice,
    depositAmount,
    annualAppreciationRate,
    totalBuyingCosts,
    totalSellingCosts,
    monthlyFees,
    annualInterestRate,
    capitalGainsTax,
  ]);

  const { bondCosts, monthlyPayment } = useMemo(() => {
    return calculateBondCost(
      checkIfNumber(loanTermYears),
      checkIfNumber(principleAmount),
      checkIfNumber(depositAmount),
      checkIfNumber(annualInterestRate)
    );
  }, [loanTermYears, principleAmount, depositAmount, annualInterestRate]);

  const remainingPrincipal = useMemo(() => {
    return calculateRemainingPrincipal(
      checkIfNumber(loanTermYears),
      checkIfNumber(principleAmount),
      checkIfNumber(depositAmount),
      checkIfNumber(annualInterestRate)
    );
  }, [loanTermYears, principleAmount, depositAmount, annualInterestRate]);

  return (
    <div className="flex flex-col space-y-8 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-4 rounded-xl max-h-full content-between w-full justify-between">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-row items-center">
            <p className="text-sm sm:text-base md:text-lg">
              Monthly Bond Repayments
            </p>
            <MonthlyBondExplanationPopover
              principleAmount={principleAmount}
              annualInterestRate={annualInterestRate}
              loanTermYears={loanTermYears}
              monthlyPayment={monthlyPayment}
            />
          </div>

          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(monthlyPayment)}
          </p>
        </div>

        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-row items-center">
            <p className="text-sm sm:text-base md:text-lg">
              Total Bond Repayment
            </p>
            <TotalBondRepaymentExplanationPopover
              monthlyPayment={monthlyPayment}
              propertyPrice={propertyPrice}
              depositAmount={depositAmount}
              annualInterestRate={annualInterestRate}
              loanTermYears={loanTermYears}
            />
          </div>

          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(bondCosts[loanTermYears])}
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-row items-center">
          <p className="text-sm sm:text-base md:text-lg">Capital Gains Tax</p>
          <CapitalGainsExplanationPopover
            sellingPrice={houseValueAfterAppreciationData[yearOfSale]}
            baseCost={principleAmount + totalBuyingCosts}
            exclusion={exclusion}
            inclusionRate={inclusionRate}
            marginalTaxRate={marginalTaxRate}
          />
        </div>

        <div className="flex flex-row justify-between items-center">
          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(capitalGainsTax[yearOfSale])}
          </p>
        </div>
      </div>

      <div>
        <p className="text-lg">Remaining Principal after {yearOfSale} years</p>
        <div className="flex flex-row justify-between items-center">
          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(-remainingPrincipal[yearOfSale])}
          </p>

          <p className="text-sm bg-green-400 w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center">
            {(
              ((remainingPrincipal[yearOfSale] +
                (propertyPrice - depositAmount)) /
                (propertyPrice - depositAmount)) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>

      <div>
        <p className="text-lg">House Value after {yearOfSale} years</p>

        <div className="flex flex-row justify-between items-center">
          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(houseValueAfterAppreciationData[yearOfSale])}
          </p>

          <p className="text-sm bg-green-400 w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center">
            {(
              ((houseValueAfterAppreciationData[yearOfSale] - propertyPrice) /
                propertyPrice) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>

      <div>
        <p className="text-lg">Money Earned</p>

        <div className="flex flex-row justify-between items-center">
          <p className="text-3xl font-light tracking-wide">
            R {formatNumber(moneyMadeFromSellingHouse[yearOfSale])}
          </p>

          <p
            className={`text-sm ${
              moneyMadeFromSellingHouse[yearOfSale] > 0
                ? 'bg-green-400'
                : 'bg-red-400'
            } w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center`}
          >
            {(
              (moneyMadeFromSellingHouse[yearOfSale] / propertyPrice) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>
    </div>
  );
}

export default EvaluationCard;
