import { useMemo } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import HousingComparisonChart from '@/components/HousingComparisonChart';
import {
  calculateRentCost,
  calculateHouseValueAfterAppreciation,
  calculateMoneyMadeFromSellingHouse,
  calculateBondCost,
  calculateRemainingPrincipal,
} from '@/utils/calculations';
import { Input } from '@/components/ui/input';
import 'tailwindcss/tailwind.css';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Checkbox } from '@/components/ui/checkbox';
import { CapitalGainsTaxCalculator } from '@/utils/capitalGainsCalculations';
import { ExclusionCombobox } from '@/components/ExclusionCombobox';
import { InclusionCombobox } from '@/components/InclusionCombobox';
import { SectionHeader } from '@/components/SectionHeader';
import { useComparison } from '@/hooks/useComparison';

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
      ? buyingCosts + propertyPrice - depositAmount
      : propertyPrice - depositAmount;
  }, [addBuyingCostsToBond, buyingCosts, propertyPrice, depositAmount]);

  console.log("=========================================")
  console.log("Principle:\t\t\t\tR", principleAmount)

  const totalBuyingCosts = useMemo(() => {
    return addBuyingCostsToBond
      ? otherBuyingCosts
      : buyingCosts + otherBuyingCosts;
  }, [addBuyingCostsToBond, buyingCosts, otherBuyingCosts]);

  console.log("Total Buying Costs: \tR", totalBuyingCosts)

  const monthlyFees = useMemo(() => {
    return monthlyLevies + monthlyRates + monthlyInsurance + additionalMonthlyFees;
  }, [monthlyLevies, monthlyRates, monthlyInsurance, additionalMonthlyFees]);

  console.log("Monthly Fees: \t\t\tR", monthlyFees)

  const rentData = useMemo(() => {
    return calculateRentCost(loanTermYears, monthlyRent, annualRentIncrease);
  }, [loanTermYears, monthlyRent, annualRentIncrease]);

  const houseValueAfterAppreciationData = useMemo(() => {
    return calculateHouseValueAfterAppreciation(
      loanTermYears,
      principleAmount,
      annualAppreciationRate
    );
  }, [loanTermYears, principleAmount, annualAppreciationRate]);

  const {
    capitalGainsTax,
  } = useMemo(() => {
    const baseCost = principleAmount + totalBuyingCosts;

    const calculator = new CapitalGainsTaxCalculator(
      houseValueAfterAppreciationData[yearOfSale],
      baseCost,
      smallBusinessMarketValue,
      exclusionType,
      inclusionType,
      numberOfPeopleInJointBond
    );
    return calculator.calculate();
  }, [
    principleAmount,
    totalBuyingCosts,
    houseValueAfterAppreciationData,
    yearOfSale,
    smallBusinessMarketValue,
    exclusionType,
    inclusionType,
    numberOfPeopleInJointBond,
  ]);

  const totalSellingCosts = useMemo(() => {
    return sellingCosts + otherSellingCosts + capitalGainsTax;
  }, [sellingCosts, otherSellingCosts, capitalGainsTax]);

  const moneyMadeFromSellingHouse = useMemo(() => {
    return calculateMoneyMadeFromSellingHouse(
      loanTermYears,
      propertyPrice,
      depositAmount,
      annualAppreciationRate,
      totalBuyingCosts,
      totalSellingCosts,
      monthlyFees,
      annualInterestRate
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
  ]);

  const { bondCosts, monthlyPayment } = useMemo(() => {
    return calculateBondCost(loanTermYears, principleAmount, depositAmount, annualInterestRate);
  }, [loanTermYears, principleAmount, depositAmount, annualInterestRate]);

  const remainingPrincipal = useMemo(() => {
    return calculateRemainingPrincipal(
      loanTermYears,
      principleAmount,
      depositAmount,
      annualInterestRate
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

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="propertyPrice">House Price (R)</Label>
                  <Input
                    id="propertyPrice"
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => {setPropertyPrice(parseFloat(e.target.value))}}
                  />
                </div>

                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="depositAmount">Deposit</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="years">Years</Label>
                  <Input
                    id="years"
                    type="number"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYearsYears(parseInt(e.target.value))}
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

              <SectionHeader label="Capital Gains Tax Variables" />

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2  flex-wrap w-full gap-2'>
                <ExclusionCombobox
                  exclusionType={exclusionType}
                  onExclusionTypeChange={setExclusionType}
                  numberOfPeopleInJointBond={numberOfPeopleInJointBond}
                  onNumberOfPeopleInJointBondChange={setNumberOfPeopleInJointBond}
                  smallBusinessMarketValue={smallBusinessMarketValue}
                  onSmallBusinessMarketValueChange={setSmallBusinessMarketValue}
                />

                <InclusionCombobox
                  inclusionType={inclusionType}
                  oninclusionTypeChange={setInclusionType}
                />
              </div>

              <SectionHeader label="Monthly Fees" />

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyRates">Rates</Label>
                  <Input
                    id="monthlyRates"
                    type="number"
                    value={monthlyRates}
                    onChange={(e) => setMonthlyRates(parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyLevies">Levies</Label>
                  <Input
                    id="monthlyLevies"
                    type="number"
                    value={monthlyLevies}
                    onChange={(e) => setMonthlyLevies(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="monthlyInsurance">Insurance</Label>
                  <Input
                    id="monthlyInsurance"
                    type="number"
                    value={monthlyInsurance}
                    onChange={(e) => setMonthlyInsurance(parseFloat(e.target.value))}
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

              <div className="flex flex-row w-full gap-2">
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

              <div className="flex flex-row w-full gap-2">
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

              <div className="flex flex-row w-full gap-2">
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
                    onChange={(e) => setAnnualRentIncrease(parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-4 rounded-xl max-h-full content-between w-full md:w-2/3 justify-between">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex flex-col justify-between items-start">
                  <div className="flex flex-row items-center">
                    <p className="text-sm sm:text-base md:text-lg">Monthly Bond Repayments</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 rounded-full ml-1"
                        >
                          <InfoCircledIcon className="h-4 w-4 text-orange-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="flex flex-col space-y-2 text-xs">
                          <p className="flex text-xs">
                            The monthly repayment amount is calculated using the
                            formula:
                          </p>

                          <BlockMath math="R = \frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}" />

                          <div className="flex flex-col">
                            <p className="text-xs">where:</p>

                            <div className="flex flex-row justify-between">
                              <InlineMath math={`P = ${principleAmount}`} />
                              <p>Principal Amount</p>
                            </div>

                            <div className="flex flex-row justify-between">
                              <InlineMath
                                math={`r = ${(annualInterestRate / 12 / 100).toFixed(
                                  6
                                )}`}
                              />
                              <p>Monthly Interest Rate</p>
                            </div>

                            <div className="flex flex-row justify-between">
                              <InlineMath math={`n = ${loanTermYears * 12}`} />
                              <p>Number of Months</p>
                            </div>
                          </div>

                          <BlockMath>{String.raw`R = \frac{\text{${
                            principleAmount
                          }} \cdot \text{${(annualInterestRate / 12 / 100).toFixed(
                            5
                          )}} \cdot (1 + \text{${(
                            annualInterestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${loanTermYears * 12}}}{(1 + \text{${(
                            annualInterestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${
                            loanTermYears * 12
                          }} - 1}`}</BlockMath>

                          {/* calculate the monthly repayment */}
                          <BlockMath>{String.raw`R = \text{${monthlyPayment.toFixed(
                            2
                          )}}`}</BlockMath>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <p className="text-3xl font-light tracking-wide">
                    R{' '}
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(monthlyPayment)}
                  </p>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <div className="flex flex-row items-center">
                    <p className="text-sm sm:text-base md:text-lg">Total Bond Repayment</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 rounded-full ml-1"
                        >
                          <InfoCircledIcon className="h-4 w-4 text-orange-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="flex flex-col space-y-2 text-xs">
                          <p className="flex text-xs">
                            The total repayment amount is calculated using the
                            formula:
                          </p>

                          {/* display the formula to calculate the total repayment of the bond*/}
                          <BlockMath math="T = R \cdot n" />

                          <div>
                            <p className="text-xs">where:</p>

                            <div className="flex flex-row justify-between">
                              <InlineMath
                                math={`R = ${monthlyPayment.toFixed(2)}`}
                              />
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
                              <InlineMath
                                math={`P = ${propertyPrice - depositAmount}`}
                              />
                              <p>Principal Amount</p>
                            </div>

                            <div className="flex flex-row justify-between">
                              <InlineMath
                                math={`r = ${(annualInterestRate / 12 / 100).toFixed(
                                  6
                                )}`}
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
                          )}} \cdot (1 + \text{${(
                            annualInterestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${loanTermYears * 12}}}{(1 + \text{${(
                            annualInterestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${
                            loanTermYears * 12
                          }} - 1}) \cdot \text{${loanTermYears * 12}}`}</BlockMath>

                          {/* calculate the monthly repayment */}
                          <BlockMath>{String.raw`R = \text{${monthlyPayment.toFixed(
                            2
                          )}}`}</BlockMath>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <p className="text-3xl font-light tracking-wide">
                    R{' '}
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(bondCosts[loanTermYears])}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-lg">Capital Gains Tax</p>

                <div className="flex flex-row justify-between items-center">
                  <p className="text-3xl font-light tracking-wide">
                    R{' '}
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(capitalGainsTax)}
                  </p>

                  {/* <div>
                    <p className="text-sm">
                      Capital Gain: R{' '}
                      {new Intl.NumberFormat('en-ZA', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(capitalGain)}
                    </p>
                    <p className="text-sm">
                      Exclusion: R{' '}
                      {new Intl.NumberFormat('en-ZA', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(exclusion)}
                    </p>
                    <p className="text-sm">
                      Net Capital Gain: R{' '}
                      {new Intl.NumberFormat('en-ZA', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(netCapitalGain)}
                    </p>
                    <p className="text-sm">
                      Taxable Gain: R{' '}
                      {new Intl.NumberFormat('en-ZA', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(taxableGain)}{' '}
                      ({inclusionRate * 100}% of NCG)
                    </p>
                    <p className="text-sm">
                      Capital Gains Tax: R{' '}
                      {new Intl.NumberFormat('en-ZA', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(capitalGainsTax)}{' '}
                      ({marginalTaxRate * 100}% of TG)
                    </p>
                  </div> */}

                  {/* <p className="text-sm bg-green-400 w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center">
										{(
											((remainingPrincipal[yearOfSale] +
												(propertyPrice - depositAmount)) /
												(propertyPrice - depositAmount)) *
											100
										).toFixed(1)}
										%
									</p> */}
                </div>
              </div>

              <div>
                <p className="text-lg">
                  Remaining Principal after {yearOfSale} years
                </p>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-3xl font-light tracking-wide">
                    R{' '}
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(-remainingPrincipal[yearOfSale])}
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
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(houseValueAfterAppreciationData[yearOfSale])}
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
                    R{' '}
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(moneyMadeFromSellingHouse[yearOfSale])}
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

              <div className="flex flex-row gap-2">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="yearOfSale">Selling Year</Label>
                  <Input
                    id="yearOfSale"
                    type="number"
                    value={yearOfSale}
                    onChange={(e) => setYearOfSale(parseInt(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <Slider
                    defaultValue={[yearOfSale]}
                    max={loanTermYears}
                    step={1}
                    onValueChange={(value) => setYearOfSale(value[0])}
                    className="flex mt-1"
                  />
                </div>

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
                  <Slider
                    defaultValue={[annualAppreciationRate]}
                    max={loanTermYears}
                    step={0.01}
                    onValueChange={(value) => setAnnualAppreciationRate(value[0])}
                    className="flex mt-1"
                  />
                </div>
              </div>
            </div>
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
        <div className="flex flex-row min-h-32"/>
      </div>
    </div>
  );
};

export default ComparisonPage;
