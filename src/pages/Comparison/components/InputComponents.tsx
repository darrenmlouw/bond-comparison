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
import { EasingDefinition, motion } from 'framer-motion';
import { formatNumber } from '@/utils/formatNumber';
interface Props {
  animationDelay: number;
  animationDuration: number;
  animationEase: EasingDefinition;
  animationXDistance?: number;
  animationYDistance?: number;
}

const InputComponents = ({
  animationDelay,
  animationDuration,
  animationEase = 'easeOut',
  animationXDistance = 0,
  animationYDistance = 0,
}: Props) => {
  const {
    propertyPrice = 0,
    setPropertyPrice,
    depositAmount = 0,
    setDepositAmount,
    loanTermYears = 0,
    setLoanTermYears,
    annualInterestRate = 0,
    setAnnualInterestRate,
    annualAppreciationRate = 0,
    setAnnualAppreciationRate,
    buyingCosts = 0,
    setBuyingCosts,
    otherBuyingCosts = 0,
    setOtherBuyingCosts,
    addBuyingCostsToBond = false,
    setAddBuyingCostsToBond,
    monthlyLevies = 0,
    setMonthlyLevies,
    monthlyRates = 0,
    setMonthlyRates,
    monthlyInsurance = 0,
    setMonthlyInsurance,
    additionalMonthlyFees = 0,
    setAdditionalMonthlyFees,
    sellingCosts = 0,
    setSellingCosts,
    otherSellingCosts = 0,
    setOtherSellingCosts,
    monthlyRent = 0,
    setMonthlyRent,
    annualRentIncrease = 0,
    setAnnualRentIncrease,
    exclusionType,
    setExclusionType,
    inclusionType,
    setInclusionType,
    smallBusinessMarketValue = 0,
    setSmallBusinessMarketValue,
    numberOfPeopleInJointBond = 2,
    setNumberOfPeopleInJointBond,
    principleAmount,
  } = useComparison();

  return (
    <motion.div
      initial={{ opacity: 0, x: animationXDistance, y: animationYDistance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: animationEase,
      }}
      className=""
    >
      <Accordion type="single" collapsible className="space-y-3 sm:space-y-4 ">
        {/* Bond Section */}
        <AccordionItem
          value="bond"
          className="bg-card border border-card-foreground/20 shadow-lg rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="flex text-start hover:no-underline bg-card hover:bg-primary/20 p-2.5 sm:p-4  overflow-hidden">
            <div className="flex flex-row text-xl sm:text-2xl tracking-wide font-light justify-center items-center">
              <Home className="w-6 h-6 mr-2 text-secondary " />
              Bond Details
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="ml-0 mt-0">
              <AccordionItem
                value="property-data"
                className="border-t border-card-foreground/20"
              >
                <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 pr-4 pl-12 h-10 text-card-foreground/70 tracking-wider font-light text-base">
                  <div className='flex flex-row justify-between items-center w-full mr-2'>
                    <p>Property Data</p>
                    <p className='text-xs'>{`Principle: R${formatNumber( principleAmount)}`}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pr-4 pl-4 mt-2">
                  <div className="grid grid-cols-2 gap-2 items-end">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="propertyPrice">Property Price (R)</Label>
                      <Input
                        id="propertyPrice"
                        type="number"
                        value={isNaN(propertyPrice) ? '' : propertyPrice}
                        onChange={(e) =>
                          setPropertyPrice(parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="depositAmount">Initial Deposit</Label>
                      <Input
                        id="depositAmount"
                        type="number"
                        value={isNaN(depositAmount) ? '' : depositAmount}
                        onChange={(e) =>
                          setDepositAmount(parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="years">Loan Period (Years)</Label>
                      <Input
                        id="years"
                        type="number"
                        value={isNaN(loanTermYears) ? '' : loanTermYears}
                        onChange={(e) =>
                          setLoanTermYears(parseInt(e.target.value))
                        }
                        className="w-full"
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
                        value={
                          isNaN(annualInterestRate) ? '' : annualInterestRate
                        }
                        onChange={(e) =>
                          setAnnualInterestRate(parseFloat(e.target.value))
                        }
                        className="w-full"
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
                        value={
                          isNaN(annualAppreciationRate)
                            ? ''
                            : annualAppreciationRate
                        }
                        onChange={(e) =>
                          setAnnualAppreciationRate(parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Capital Gains Section */}
              <AccordionItem
                value="capital-gains"
                className="border-card-foreground/20"
              >
                <AccordionTrigger className="flex text-start hover:no-underline hover:bg-secondary/50 pr-4 pl-12 h-10 text-card-foreground/70 tracking-wider font-light text-base">
                  Capital Gains
                </AccordionTrigger>
                <AccordionContent className="pr-4 pl-4 mt-2">
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
              <AccordionItem
                value="monthly-fees"
                className="border-card-foreground/20"
              >
                <AccordionTrigger className="flex text-start hover:no-underline hover:bg-secondary/50 pr-4 pl-12 h-10 text-card-foreground/70 tracking-wider font-light text-base">
                  Monthly Fees
                </AccordionTrigger>
                <AccordionContent className="pr-4 pl-4 mt-2">
                  <div className="grid grid-cols-2 gap-2 items-end">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="monthlyRates">Rates</Label>
                      <Input
                        id="monthlyRates"
                        type="number"
                        value={isNaN(monthlyRates) ? '' : monthlyRates}
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
                        value={isNaN(monthlyLevies) ? '' : monthlyLevies}
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
                        value={isNaN(monthlyInsurance) ? '' : monthlyInsurance}
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
                        value={
                          isNaN(additionalMonthlyFees)
                            ? ''
                            : additionalMonthlyFees
                        }
                        onChange={(e) =>
                          setAdditionalMonthlyFees(parseFloat(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Buying Costs Section */}
              <AccordionItem
                value="buying-costs"
                className="border-card-foreground/20"
              >
                <AccordionTrigger className="flex text-start hover:no-underline hover:bg-secondary/50 pr-4 pl-12 h-10 text-card-foreground/70 tracking-wider font-light text-base">
                  Buying Costs
                </AccordionTrigger>
                <AccordionContent className="pr-4 pl-4 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-row justify-between">
                        <Label htmlFor="buyingCosts">Buying Costs</Label>
                        <div className="flex flex-row space-x-2">
                          <Checkbox
                            id="addBuyingCostsToBond"
                            checked={addBuyingCostsToBond}
                            onCheckedChange={() =>
                              setAddBuyingCostsToBond(!addBuyingCostsToBond)
                            }
                          />
                          <Label htmlFor="buyingCosts">Add to Bond</Label>
                        </div>
                      </div>

                      <Input
                        id="buyingCosts"
                        type="number"
                        value={isNaN(buyingCosts) ? '' : buyingCosts}
                        onChange={(e) =>
                          setBuyingCosts(parseFloat(e.target.value))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="otherBuyingCosts">
                        Other Buying Costs
                      </Label>
                      <Input
                        id="otherBuyingCosts"
                        type="number"
                        value={isNaN(otherBuyingCosts) ? '' : otherBuyingCosts}
                        onChange={(e) =>
                          setOtherBuyingCosts(parseFloat(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Selling Costs Section */}
              <AccordionItem
                value="selling-costs"
                className="border-card-foreground/20"
              >
                <AccordionTrigger className="flex text-start hover:no-underline hover:bg-secondary/50 pr-4 pl-12 h-10 text-card-foreground/70 tracking-wider font-light text-base">
                  Selling Costs
                </AccordionTrigger>
                <AccordionContent className="pr-4 pl-4 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="sellingCosts">Selling Costs</Label>
                      <Input
                        id="sellingCosts"
                        type="number"
                        value={isNaN(sellingCosts) ? '' : sellingCosts}
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
                        value={
                          isNaN(otherSellingCosts) ? '' : otherSellingCosts
                        }
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
        <AccordionItem
          value="rent"
          className="bg-card border border-card-foreground/20 shadow-lg rounded-lg overflow-hidden"
        >
          <AccordionTrigger className="flex text-start hover:no-underline bg-card hover:bg-primary/20 p-2.5 sm:p-4">
            <div className="flex flex-row text-xl sm:text-2xl tracking-wide font-light justify-center items-center">
              <Building className="w-6 h-6 mr-2 text-secondary" />
              Rent Details
            </div>
          </AccordionTrigger>
          <AccordionContent className="pr-4 pl-4 pt-2 border-t border-card-foreground/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="monthlyRent">Monthly Rent</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  value={isNaN(monthlyRent) ? '' : monthlyRent}
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
                  value={isNaN(annualRentIncrease) ? '' : annualRentIncrease}
                  onChange={(e) =>
                    setAnnualRentIncrease(parseFloat(e.target.value))
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default InputComponents;
