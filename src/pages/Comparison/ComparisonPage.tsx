import React, { useMemo, useState } from 'react';
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
import exclusionOption from '@/enums/exclusionOption';
import inclusionOption from '@/enums/inclusionOption';
import { CapitalGainsTaxCalculator } from '@/utils/capitalGainsCalculations';
import { ExclusionCombobox } from '@/components/ExclusionCombobox';
import { InclusionCombobox } from '@/components/InclusionCombobox';
import { SectionHeader } from '@/components/SectionHeader';
import { useComparison } from '@/hooks/useComparison';

const ComparisonPage: React.FC = () => {
  const {
    housePrice,
    setHousePrice,
    deposit,
    setDeposit,
    years,
    setYears,
    interestRate,
    setInterestRate
  } = useComparison();

  // Appreciation Variables
  const [appreciationRate, setAppreciationRate] = useState(4);

  // Buying Variables
  const [buyingCosts, setBuyingCosts] = useState(100000);
  const [otherBuyingCosts, setOtherBuyingCosts] = useState(0);
  const [addBuyingCostsToBond, setAddBuyingCostsToBond] = useState(false);

  // Owning Variables
  const [levies, setLevies] = useState(1000);
  const [rates, setRates] = useState(1000);
  const [insurance, setInsurance] = useState(1000);
  const [otherMonthlyFees, setOtherMonthlyFees] = useState(500);

  // Selling Variables
  const [sellingYear, setSellingYear] = useState(4);
  const [sellingCosts, setSellingCosts] = useState(50000);
  const [otherSellingCosts, setOtherSellingCosts] = useState(50000);

  // Rent Variables
  const [monthlyRent, setMonthlyRent] = useState(10000);
  const [annualRentIncrease, setAnnualRentIncrease] = useState(10);

  // Capital Gains Variables
  const [exclusionType, setExclusionType] = useState<exclusionOption>(
    exclusionOption.None
  );
  const [inclusionType, setInclusionType] = useState<inclusionOption>(
    inclusionOption.Individual
  );

  const [smallBusinessMarketValue, setSmallBusinessMarketValue] = useState(0);
  const [numberOfPeopleInJointBond, setNumberOfPeopleInJointBond] = useState(2);

  const initialBond = useMemo(() => {
    return addBuyingCostsToBond
      ? buyingCosts + housePrice - deposit
      : housePrice - deposit;
  }, [addBuyingCostsToBond, buyingCosts, housePrice, deposit]);

  const totalBuyingCosts = useMemo(() => {
    return addBuyingCostsToBond
      ? otherBuyingCosts
      : buyingCosts + otherBuyingCosts;
  }, [addBuyingCostsToBond, buyingCosts, otherBuyingCosts]);

  const totalMonthlyFees = useMemo(() => {
    return levies + rates + insurance + otherMonthlyFees;
  }, [levies, rates, insurance, otherMonthlyFees]);

  const rentData = useMemo(() => {
    return calculateRentCost(years, monthlyRent, annualRentIncrease);
  }, [years, monthlyRent, annualRentIncrease]);

  const houseValueAfterAppreciationData = useMemo(() => {
    return calculateHouseValueAfterAppreciation(
      years,
      initialBond,
      appreciationRate
    );
  }, [years, initialBond, appreciationRate]);

  const {
    capitalGainsTax,
    exclusion,
    capitalGain,
    netCapitalGain,
    inclusionRate,
    marginalTaxRate,
    taxableGain,
  } = useMemo(() => {
    const baseCost = initialBond + totalBuyingCosts;

    const calculator = new CapitalGainsTaxCalculator(
      houseValueAfterAppreciationData[sellingYear],
      baseCost,
      smallBusinessMarketValue,
      exclusionType,
      inclusionType,
      numberOfPeopleInJointBond
    );
    return calculator.calculate();
  }, [
    initialBond,
    totalBuyingCosts,
    houseValueAfterAppreciationData,
    sellingYear,
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
      years,
      housePrice,
      deposit,
      appreciationRate,
      totalBuyingCosts,
      totalSellingCosts,
      totalMonthlyFees,
      interestRate
    );
  }, [
    years,
    housePrice,
    deposit,
    appreciationRate,
    totalBuyingCosts,
    totalSellingCosts,
    totalMonthlyFees,
    interestRate,
  ]);

  const { bondCosts, monthlyPayment } = useMemo(() => {
    return calculateBondCost(years, initialBond, deposit, interestRate);
  }, [years, initialBond, deposit, interestRate]);

  const remainingPrincipal = useMemo(() => {
    return calculateRemainingPrincipal(
      years,
      initialBond,
      deposit,
      interestRate
    );
  }, [years, initialBond, deposit, interestRate]);

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
                  <Label htmlFor="housePrice">House Price (R)</Label>
                  <Input
                    id="housePrice"
                    type="number"
                    value={housePrice}
                    onChange={(e) => {setHousePrice(parseFloat(e.target.value))}}
                  />
                </div>

                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="deposit">Deposit</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="years">Years</Label>
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value))}
                  />
                </div>

                <div className="flex flex-col w-1/2 gap-1.5">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) =>
                      setInterestRate(parseFloat(e.target.value))
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
                  <Label htmlFor="rates">Rates</Label>
                  <Input
                    id="rates"
                    type="number"
                    value={rates}
                    onChange={(e) => setRates(parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="levies">Levies</Label>
                  <Input
                    id="levies"
                    type="number"
                    value={levies}
                    onChange={(e) => setLevies(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="insurance">Insurance</Label>
                  <Input
                    id="insurance"
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="other">Other</Label>
                  <Input
                    id="other"
                    type="number"
                    value={otherMonthlyFees}
                    onChange={(e) =>
                      setOtherMonthlyFees(parseFloat(e.target.value))
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
                              <InlineMath math={`P = ${initialBond}`} />
                              <p>Principal Amount</p>
                            </div>

                            <div className="flex flex-row justify-between">
                              <InlineMath
                                math={`r = ${(interestRate / 12 / 100).toFixed(
                                  6
                                )}`}
                              />
                              <p>Monthly Interest Rate</p>
                            </div>

                            <div className="flex flex-row justify-between">
                              <InlineMath math={`n = ${years * 12}`} />
                              <p>Number of Months</p>
                            </div>
                          </div>

                          <BlockMath>{String.raw`R = \frac{\text{${
                            initialBond
                          }} \cdot \text{${(interestRate / 12 / 100).toFixed(
                            5
                          )}} \cdot (1 + \text{${(
                            interestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${years * 12}}}{(1 + \text{${(
                            interestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${
                            years * 12
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
                              <InlineMath math={`n = ${years * 12}`} />
                              <p>Number of Months</p>
                            </div>
                          </div>

                          <BlockMath math="T = (\frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}) \cdot n" />

                          <div className="flex flex-col">
                            <p className="text-xs">where:</p>

                            <div className="flex flex-row justify-between">
                              <InlineMath
                                math={`P = ${housePrice - deposit}`}
                              />
                              <p>Principal Amount</p>
                            </div>

                            <div className="flex flex-row justify-between">
                              <InlineMath
                                math={`r = ${(interestRate / 12 / 100).toFixed(
                                  6
                                )}`}
                              />
                              <p>Monthly Interest Rate</p>
                            </div>

                            <div className="flex flex-row justify-between">
                              <InlineMath math={`n = ${years * 12}`} />
                              <p>Number of Months</p>
                            </div>
                          </div>

                          <BlockMath>{String.raw`T = (\frac{\text{${
                            housePrice - deposit
                          }} \cdot \text{${(interestRate / 12 / 100).toFixed(
                            5
                          )}} \cdot (1 + \text{${(
                            interestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${years * 12}}}{(1 + \text{${(
                            interestRate /
                            12 /
                            100
                          ).toFixed(5)}})^\text{${
                            years * 12
                          }} - 1}) \cdot \text{${years * 12}}`}</BlockMath>

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
                    }).format(bondCosts[years])}
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
											((remainingPrincipal[sellingYear] +
												(housePrice - deposit)) /
												(housePrice - deposit)) *
											100
										).toFixed(1)}
										%
									</p> */}
                </div>
              </div>

              <div>
                <p className="text-lg">
                  Remaining Principal after {sellingYear} years
                </p>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-3xl font-light tracking-wide">
                    R{' '}
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(-remainingPrincipal[sellingYear])}
                  </p>

                  <p className="text-sm bg-green-400 w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center">
                    {(
                      ((remainingPrincipal[sellingYear] +
                        (housePrice - deposit)) /
                        (housePrice - deposit)) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>

              <div>
                <p className="text-lg">House Value after {sellingYear} years</p>

                <div className="flex flex-row justify-between items-center">
                  <p className="text-3xl font-light tracking-wide">
                    R{' '}
                    {new Intl.NumberFormat('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(houseValueAfterAppreciationData[sellingYear])}
                  </p>

                  <p className="text-sm bg-green-400 w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center">
                    {(
                      ((houseValueAfterAppreciationData[sellingYear] -
                        housePrice) /
                        housePrice) *
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
                    }).format(moneyMadeFromSellingHouse[sellingYear])}
                  </p>

                  <p
                    className={`text-sm ${
                      moneyMadeFromSellingHouse[sellingYear] > 0
                        ? 'bg-green-400'
                        : 'bg-red-400'
                    } w-16 border-0 bg-opacity-50 rounded-full p-1 p-x-2 text-center`}
                  >
                    {(
                      (moneyMadeFromSellingHouse[sellingYear] / housePrice) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="sellingYear">Selling Year</Label>
                  <Input
                    id="sellingYear"
                    type="number"
                    value={sellingYear}
                    onChange={(e) => setSellingYear(parseInt(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <Slider
                    defaultValue={[sellingYear]}
                    max={years}
                    step={1}
                    onValueChange={(value) => setSellingYear(value[0])}
                    className="flex mt-1"
                  />
                </div>

                <div className="flex flex-col w-full gap-1.5">
                  <Label htmlFor="appreciationRate">
                    Appreciation Rate (%)
                  </Label>
                  <Input
                    id="appreciationRate"
                    type="number"
                    step="0.01"
                    value={appreciationRate}
                    onChange={(e) =>
                      setAppreciationRate(parseFloat(e.target.value))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <Slider
                    defaultValue={[appreciationRate]}
                    max={years}
                    step={0.01}
                    onValueChange={(value) => setAppreciationRate(value[0])}
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
            sellingYear={sellingYear}
          />
        </div>
        <div className="flex flex-row min-h-32"></div>
      </div>
    </div>
  );
};

export default ComparisonPage;
