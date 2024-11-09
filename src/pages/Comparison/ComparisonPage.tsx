import { useMemo } from 'react';
import HousingComparisonChart from '@/components/HousingComparisonChart';
import {
  calculateRentCost,
  calculateHouseValueAfterAppreciation,
  calculateMoneyMadeFromSellingHouse,
  calculateBondCost,
  calculateRemainingPrincipal,
  calculateCapitalGainsTax,
} from '@/utils/calculations';
import { Input } from '@/components/ui/input';
import 'tailwindcss/tailwind.css';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import 'katex/dist/katex.min.css';
import { Checkbox } from '@/components/ui/checkbox';
import { ExclusionCombobox } from '@/components/ExclusionCombobox';
import { InclusionCombobox } from '@/components/InclusionCombobox';
import { SectionHeader } from '@/components/SectionHeader';
import { useComparison } from '@/hooks/useComparison';
import CapitalGainsExplanationPopover from '@/pages/Comparison/components/CapitalGainsExplanationPopover';
import MonthlyBondExplanationPopover from '@/pages/Comparison/components/MonthlyBondExplanationPopover';
import TotalBondRepaymentExplanationPopover from '@/pages/Comparison/components/TotalBondRepaymentExplanationPopover';
import { formatNumber } from '@/utils/formatNumber';
import RentVsHouseProfitPopover from '@/pages/Comparison/components/RentVsHouseProfitPopover';

// creat a function for this return isNaN(value) ? 0 : value;
const checkIfNumber = (value: number, defaultValue: number | undefined = 0) => {
  return isNaN(value) ? defaultValue : value;
};

const ComparisonPage: React.FC = () => {
  const {
    propertyPrice,
    setPropertyPrice,
    depositAmount,
    setDepositAmount,
    loanTermYears,
    setLoanTermYearsYears,
    annualInterestRate,
    setAnnualInterestRate,
    annualAppreciationRate,
    setAnnualAppreciationRate,
    buyingCosts,
    setBuyingCosts,
    otherBuyingCosts,
    setOtherBuyingCosts,
    addBuyingCostsToBond,
    setAddBuyingCostsToBond,
    monthlyLevies,
    setMonthlyLevies,
    monthlyRates,
    setMonthlyRates,
    monthlyInsurance,
    setMonthlyInsurance,
    additionalMonthlyFees,
    setAdditionalMonthlyFees,
    yearOfSale,
    setYearOfSale,
    sellingCosts,
    setSellingCosts,
    otherSellingCosts,
    setOtherSellingCosts,
    monthlyRent,
    setMonthlyRent,
    annualRentIncrease,
    setAnnualRentIncrease,
    exclusionType,
    setExclusionType,
    inclusionType,
    setInclusionType,
    smallBusinessMarketValue,
    setSmallBusinessMarketValue,
    numberOfPeopleInJointBond,
    setNumberOfPeopleInJointBond,
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

  const rentData = useMemo(() => {
    return calculateRentCost(
      checkIfNumber(loanTermYears),
      checkIfNumber(monthlyRent),
      checkIfNumber(annualRentIncrease)
    );
  }, [loanTermYears, monthlyRent, annualRentIncrease]);

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
    <div className="flex flex-col h-full w-full items-center ">
      <div className="px-4 space-y-2 container">
        <p className="pt-10 font-bold px-4 pointer-events-none text-5xl text-center md:text-6xl lg:text-7xl">
          Rent vs Buy Comparison
        </p>
        <p className="text-center text-md ">
          Analyze and compare the costs of renting versus buying a home over
          time.
        </p>
        <h2 className="text-xl font-bold text-primary ">
          House Value and Remaining Principal
        </h2>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col space-y-2 w-full md:w-1/3">
              <SectionHeader label="Bond" />

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="propertyPrice">House Price (R)</Label>
                  <Input
                    id="propertyPrice"
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => {
                      setPropertyPrice(parseFloat(e.target.value));
                    }}
                  />
                </div>

                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="depositAmount">Deposit</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) =>
                      setDepositAmount(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="years">Years</Label>
                  <Input
                    id="years"
                    type="number"
                    value={loanTermYears}
                    onChange={(e) =>
                      setLoanTermYearsYears(parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="annualInterestRate">Interest Rate (%)</Label>
                  <Input
                    id="annualInterestRate"
                    type="number"
                    step="0.01"
                    value={annualInterestRate}
                    onChange={(e) =>
                      setAnnualInterestRate(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="annualAppreciationRate">
                    Appreciation Rate (%)
                  </Label>
                  <Input
                    id="annualAppreciationRate"
                    type="number"
                    step="0.01"
                    value={annualAppreciationRate}
                    onChange={(e) =>
                      setAnnualAppreciationRate(parseFloat(e.target.value))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
              </div>

              <SectionHeader label="Capital Gains Tax Variables" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2  flex-wrap w-full gap-2  items-end">
                <ExclusionCombobox
                  exclusionType={exclusionType}
                  onExclusionTypeChange={setExclusionType}
                  numberOfPeopleInJointBond={numberOfPeopleInJointBond}
                  onNumberOfPeopleInJointBondChange={
                    setNumberOfPeopleInJointBond
                  }
                  smallBusinessMarketValue={smallBusinessMarketValue}
                  onSmallBusinessMarketValueChange={setSmallBusinessMarketValue}
                />

                <InclusionCombobox
                  inclusionType={inclusionType}
                  oninclusionTypeChange={setInclusionType}
                />
              </div>

              <SectionHeader label="Monthly Fees" />

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyRates">Rates</Label>
                  <Input
                    id="monthlyRates"
                    type="number"
                    value={monthlyRates}
                    onChange={(e) =>
                      setMonthlyRates(parseFloat(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyLevies">Levies</Label>
                  <Input
                    id="monthlyLevies"
                    type="number"
                    value={monthlyLevies}
                    onChange={(e) =>
                      setMonthlyLevies(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyInsurance">Insurance</Label>
                  <Input
                    id="monthlyInsurance"
                    type="number"
                    value={monthlyInsurance}
                    onChange={(e) =>
                      setMonthlyInsurance(parseFloat(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="other">Other</Label>
                  <Input
                    id="other"
                    type="number"
                    value={additionalMonthlyFees}
                    onChange={(e) =>
                      setAdditionalMonthlyFees(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <SectionHeader label="Buying Costs" />

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-full gap-1.5">
                  <div className="flex flex-row justify-between">
                    <Label htmlFor="buyingCosts">Buying Costs</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="addBuyingCostsToBond"
                        checked={addBuyingCostsToBond}
                        onCheckedChange={() => {
                          setAddBuyingCostsToBond(!addBuyingCostsToBond);
                        }}
                      />
                      <label
                        htmlFor="addBuyingCostsToBond"
                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Add to Bond
                      </label>
                    </div>
                  </div>
                  <Input
                    id="buyingCosts"
                    type="number"
                    value={buyingCosts}
                    onChange={(e) => setBuyingCosts(parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <div className="flex flex-row justify-between">
                    <Label htmlFor="otherBuyingCosts">Other</Label>
                    <p className="text-xs">(Not added to bond)</p>
                  </div>
                  <Input
                    id="otherBuyingCosts"
                    type="number"
                    value={otherBuyingCosts}
                    onChange={(e) =>
                      setOtherBuyingCosts(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <SectionHeader label="Selling Costs" />

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="sellingCosts">Selling Costs</Label>
                  <Input
                    id="sellingCosts"
                    type="number"
                    value={sellingCosts}
                    onChange={(e) =>
                      setSellingCosts(parseFloat(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="otherSellingCosts">Other</Label>
                  <Input
                    id="otherSellingCosts"
                    type="number"
                    value={otherSellingCosts}
                    onChange={(e) =>
                      setOtherSellingCosts(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <SectionHeader label="Rent" />

              <div className="flex flex-row w-full gap-2 items-end">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyRent">Monthly Rent</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyRent">Annual Rent Increase (%)</Label>
                  <Input
                    id="annualRentIncrease"
                    type="number"
                    value={annualRentIncrease}
                    onChange={(e) =>
                      setAnnualRentIncrease(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-4 rounded-xl max-h-full content-between w-full md:w-2/3 justify-between">
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
                  <p className="text-sm sm:text-base md:text-lg">
                    Capital Gains Tax
                  </p>
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
                <p className="text-lg">
                  Remaining Principal after {yearOfSale} years
                </p>
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
                    R{' '}
                    {formatNumber(houseValueAfterAppreciationData[yearOfSale])}
                  </p>

                  <p className="text-sm bg-green-400 w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center">
                    {(
                      ((houseValueAfterAppreciationData[yearOfSale] -
                        propertyPrice) /
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
          </div>
        </div>

        <h2 className="text-xl font-bold text-primary ">Rent vs House Costs</h2>
        <div className="flex flex-col bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-4 rounded-xl w-full justify-around items-center">
          <h3 className="text-2xl sm:text3xl md:text-3xl font-light my-4">
            {moneyMadeFromSellingHouse[yearOfSale] > rentData[yearOfSale]
              ? `Buying is Beneficial after ${yearOfSale} years`
              : `Renting is Beneficial after ${yearOfSale} years`}
          </h3>

          <div className="w-full h-[1px] bg-foreground/10 my-4" />

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 w-full justify-around items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="text-foreground/50">
                Rent Loss after {yearOfSale} years
              </p>
              <p className="text-3xl font-light tracking-wide">
                R {formatNumber(Number(rentData[yearOfSale]))}
              </p>
            </div>
            <p>vs</p>
            <div className="flex flex-col justify-center items-center">
              <p className="text-foreground/50">
                {moneyMadeFromSellingHouse[yearOfSale] >= 0
                  ? `House Profit after ${yearOfSale} years`
                  : `House Loss after ${yearOfSale} years`}
                {/* Net Money from Selling House after {yearOfSale} years */}
              </p>
              <p className="text-3xl font-light tracking-wide">
                R {formatNumber(Number(moneyMadeFromSellingHouse[yearOfSale]))}
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-foreground/10 my-4" />

          <div className="flex flex-col justify-center items-center my-4">
            {/* Show whether renting or buying saved more money */}
            {/* <p className="text-foreground/50">
              {moneyMadeFromSellingHouse[yearOfSale] > rentData[yearOfSale]
                ? `Buying becomes more beneficial after ${yearOfSale} years`
                : `Renting is still more cost-effective after ${yearOfSale} years`}
            </p> */}

            <p className="text-foreground/50">
              After {yearOfSale} years, you would have saved
            </p>

            <div className="flex flex-row justify-center items-center">
              <p className="text-3xl font-light tracking-wide">
                R{' '}
                {formatNumber(
                  Math.abs(
                    Number(
                      moneyMadeFromSellingHouse[yearOfSale] -
                        rentData[yearOfSale]
                    )
                  )
                )}
              </p>
              <RentVsHouseProfitPopover
                moneyMadeFromSellingHouse={moneyMadeFromSellingHouse}
                rentData={rentData}
                yearOfSale={yearOfSale}
              />
            </div>
            <p className="text-foreground/50">
              by{' '}
              {moneyMadeFromSellingHouse[yearOfSale] > rentData[yearOfSale]
                ? 'BUYING a Property'
                : 'RENTING a Property'}
            </p>
          </div>
          <div className="w-full h-[1px] bg-foreground/10 my-4" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row w-full gap-1.5 justify-between">
              <Label className='text-lg sm:text-xl font-light ' htmlFor="yearOfSale">Selling Year:</Label>
              <Label className='text-lg sm:text-xl font-light ' htmlFor="yearOfSale">Year {yearOfSale}</Label>
              
          </div>

          <Slider
                defaultValue={[yearOfSale]}
                min={0}
                max={loanTermYears}
                step={1}
                onValueChange={(value) => setYearOfSale(value[0])}
                className="flex mt-1"
              />
            </div>
        </div>
        <h2 className="text-xl font-bold text-primary ">
          Comparison of Rent and House Costs
        </h2>
        <div className="h-96 w-full bg-card rounded-xl p-4 shadow-xl">
          <HousingComparisonChart
            rentData={rentData}
            houseValueAfterAppreciationData={houseValueAfterAppreciationData}
            moneyMadeFromSellingHouse={moneyMadeFromSellingHouse}
            bondData={bondCosts}
            sellingYear={yearOfSale}
          />
        </div>
        <div className="flex flex-row min-h-32" />
      </div>
    </div>
  );
};

export default ComparisonPage;
