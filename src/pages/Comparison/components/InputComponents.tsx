import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ExclusionCombobox } from '@/components/ExclusionCombobox';
import { InclusionCombobox } from '@/components/InclusionCombobox';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useComparison } from '@/hooks/useComparison';
import { Home, Building } from 'lucide-react';

const InputComponents = () => {
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

  return (
    <Accordion type="single" collapsible className="" >
      {/* Bond Section */}
      <AccordionItem value="bond" className='border-b-0'>
        <AccordionTrigger>
          <div className="flex flex-row">
            <Home className="w-6 h-6 mr-2" />
            Bond
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className='ml-8 mr-8 mt-0'>
            <AccordionItem value="property-data">
              <AccordionTrigger>Property Data</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="propertyPrice">House Price (R)</Label>
                    <Input
                      id="propertyPrice"
                      type="number"
                      value={propertyPrice}
                      onChange={(e) =>
                        setPropertyPrice(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
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
                  <div className="flex flex-col gap-1.5">
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
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="annualInterestRate">
                      Interest Rate (%)
                    </Label>
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
                  <div className="flex flex-col gap-1.5 col-span-2">
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
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Nested Accordions */}

            {/* Capital Gains Section */}
            <AccordionItem value="capital-gains">
              <AccordionTrigger>Capital Gains Tax Variables</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <ExclusionCombobox
                    exclusionType={exclusionType}
                    onExclusionTypeChange={setExclusionType}
                    numberOfPeopleInJointBond={numberOfPeopleInJointBond}
                    onNumberOfPeopleInJointBondChange={
                      setNumberOfPeopleInJointBond
                    }
                    smallBusinessMarketValue={smallBusinessMarketValue}
                    onSmallBusinessMarketValueChange={
                      setSmallBusinessMarketValue
                    }
                  />
                  <InclusionCombobox
                    inclusionType={inclusionType}
                    oninclusionTypeChange={setInclusionType}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Monthly Fees Section */}
            <AccordionItem value="monthly-fees">
              <AccordionTrigger>Monthly Fees</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
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
                  <div className="flex flex-col gap-1.5">
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
                  <div className="flex flex-col gap-1.5">
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
                  <div className="flex flex-col gap-1.5">
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
              </AccordionContent>
            </AccordionItem>

            {/* Buying Costs Section */}
            <AccordionItem value="buying-costs">
              <AccordionTrigger>Buying Costs</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="buyingCosts">Buying Costs</Label>
                    <Checkbox
                      id="addBuyingCostsToBond"
                      checked={addBuyingCostsToBond}
                      onCheckedChange={() =>
                        setAddBuyingCostsToBond(!addBuyingCostsToBond)
                      }
                    />
                    <Input
                      id="buyingCosts"
                      type="number"
                      value={buyingCosts}
                      onChange={(e) =>
                        setBuyingCosts(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="otherBuyingCosts">Other Buying Costs</Label>
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
              </AccordionContent>
            </AccordionItem>

            {/* Selling Costs Section */}
            <AccordionItem value="selling-costs">
              <AccordionTrigger>Selling Costs</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
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
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="otherSellingCosts">
                      Other Selling Costs
                    </Label>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>

      {/* Rent Section */}
      <AccordionItem value="rent">
        <AccordionTrigger>
          <div className="flex flex-row">
            <Building className="w-6 h-6 mr-2" />
            Rent
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="monthlyRent">Monthly Rent</Label>
              <Input
                id="monthlyRent"
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="annualRentIncrease">
                Annual Rent Increase (%)
              </Label>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InputComponents;
