import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  calculateTax,
} from '@/utils/incomeTaxCalculations';
import { formatNumber } from '@/utils/formatNumber'; // Import the utility function
import TaxComparisonChart from '@/components/TaxComparisonChart';
import { SectionHeader } from '@/components/SectionHeader';
import { useSalary } from '@/hooks/useSalary';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { YearCombobox } from '@/components/YearCombobox';
import { AgeCombobox } from '@/components/AgeCombobox';
import ageCategory from '@/enums/ageCategory';
import InfoPopOver from '@/components/InfoPopOver';

const SalaryPage = () => {
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const graphDialogRef = useRef<HTMLDivElement>(null);
  useClickOutside(graphDialogRef, () => setIsGraphOpen(false));
  const {
    grossMonthlyIncome,
    setGrossMonthlyIncome,
    grossAnnualIncome,
    deductions,
    setDeductions,
    annualDeductions,
    age,
    setAge,
    year,
    setYear,
  } = useSalary();

  console.log('!@#!@#!@#@!#!#!@');
  console.log(grossMonthlyIncome, deductions, age, year);

  const tax = calculateTax(grossAnnualIncome, annualDeductions, age, year);
  // const taxBracket = getTaxBracket(netAnnualIncome, year);
  // const taxRebate = getTaxRebate(age, year);

  return (
    <div className="flex flex-col h-full w-full items-center ">
      <p className="font-bold text-5xl md:text-6xl lg:text-7xl text-primary-foreground mt-6 mb-4 sm:mt-8 sm:mb-6 md:mt-10 md:mb-8">
        Salary and Tax
      </p>

      <p className="text-lg sm:text-xl text-primary-foreground/70 mb-3 sm:mb-4 md:mb-6">
        Calculate Tax Bracket and Capital Gains
      </p>

      <div className="px-4 sm:px-6 gap-4 sm:gap-6 md:gap-8 flex flex-col w-full justify-center items-center ">
        <div className="flex flex-col w-full max-w-2xl gap-y-2">
          <SectionHeader label="Income Details" />

          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col w-1/2 gap-1.5">
              <div className="flex flex-row, justify-start items-center">
                <Label htmlFor="income" className="text-sm ">
                  Gross Monthly Income
                </Label>

                <InfoPopOver
                  children={
                    <p className="text-pretty">
                      This is the total amount of money you earn each month
                      before any deductions.
                    </p>
                  }
                />
              </div>
              <Input
                min={0}
                max={1000000}
                type="number"
                id="income"
                step={1000}
                name="income"
                placeholder="Enter your monthly income"
                value={grossMonthlyIncome}
                onChange={(e) =>
                  setGrossMonthlyIncome(parseFloat(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col w-1/2 gap-1.5">
              <div className="flex flex-row, justify-bet items-center">
                <Label htmlFor="tax" className="text-sm ">
                  Monthly Tax Deductables
                </Label>

                <InfoPopOver
                  children={
                    <p className="text-pretty">
                      This is the total amount of money you can deduct from your
                      income before tax is calculated. This includes medical
                      aid, pension fund, and other
                    </p>
                  }
                />
              </div>
              <Input
                type="number"
                id="tax"
                name="tax"
                defaultValue={0}
                placeholder="Enter your tax deductables"
                value={deductions}
                step={0.01}
                onChange={(e) => setDeductions(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col w-1/2 gap-1.5">
              <Label htmlFor="age" className="text-sm ">
                Age
              </Label>
              <AgeCombobox
                age={age || ageCategory.None}
                taxYear={year} // Pass the tax year here
                onAgeChange={(category) => {
                  setAge(category);
                }}
              />
            </div>

            <div className="flex flex-col w-1/2 gap-1.5">
              <Label htmlFor="year" className="text-sm">
                Tax Year
              </Label>
              <YearCombobox year={year.toString()} onYearChange={setYear} />
            </div>
          </div>
        </div>

        <div className="flex bg-card justify-center gap-6 w-full max-w-4xl h-auto p-3 sm:p-4 md:p-6 opacity-75 outline outline-1 outline-card-foreground/20 shadow-xl rounded-xl">
          {/* Column 1 */}
          <div className="grid grid-cols-2 w-full gap-y-4 sm:gap-y-6 md:gap-y-8">
            <div className="flex justify-start">
              <div className="flex flex-col">
                <p className="text-sm sm:text-base md:text-lg">
                  Gross Annual Income
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-green-700 dark:text-green-300 ">
                  R {formatNumber(grossAnnualIncome)}
                </p>
              </div>
            </div>

            <div className="flex items-end">
              <div className="flex flex-col text-left">
                <p className="text-sm sm:text-base md:text-lg">
                  Net Annual Income
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-green-600 dark:text-green-400">
                  R {formatNumber(grossAnnualIncome - tax- annualDeductions)}
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="flex flex-col">
                <p className="text-sm sm:text-base md:text-lg">
                  Annual Tax Deductions
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-orange-700 dark:text-orange-400">
                  {!isNaN(deductions)
                    ? `R ${formatNumber(deductions * 12)}`
                    : 0}
                </p>
              </div>
            </div>

            <div className="flex items-end">
              <div className="flex flex-col text-left">
                <p className="text-sm sm:text-base md:text-lg">Annual Tax</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-red-500">
                  {!isNaN(tax) ? `R ${formatNumber(tax)}` : 0}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          {/* <div className="grid grid-cols-1 grid-rows-3 gap-6">
            <div className="flex flex-col">
              <p className="text-sm sm:text-lg">Tax Bracket</p>
              <p className="text-md sm:text-xl font-light tracking-wide">
                R{formatNumber(taxBracket.lower)} - R
                {taxBracket.upper === Infinity
                  ? 'Inf'
                  : formatNumber(taxBracket.upper)}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-md sm:text-lg">Tax Rate</p>
              <p className="text-xl font-light tracking-wide">
                R{formatNumber(taxBracket.base)} + {taxBracket.rate * 100}%
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-md sm:text-lg">Tax Rebate</p>
              <p className="text-xl font-light tracking-wide">
                R{formatNumber(taxRebate)}
              </p>
            </div>
          </div> */}
        </div>

        <motion.div
          key={'TaxGraph'}
          layoutId="TaxGraph"
          onClick={() => setIsGraphOpen(true)}
          className="flex flex-row bg-card w-full max-w-4xl h-96 opacity-75 outline outline-1 outline-card-foreground/20 shadow-2xl p-3 sm:p-4 md:p-6 rounded-xl hover:bg-card/70 hover:cursor-pointer"
        >
          <TaxComparisonChart />
        </motion.div>

        <AnimatePresence>
          {isGraphOpen !== false && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40"
              onClick={() => setIsGraphOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isGraphOpen !== false && (
            <motion.div className="fixed inset-0 flex justify-center items-center z-50 my-6 sm:my-8 md:my-12">
              <motion.div
                layoutId="TaxGraph"
                ref={graphDialogRef}
                className="relative bg-card p-2 sm:p-4 md:p-6 lg:p-8 rounded-2xl h-1/2 sm:h-3/5 md:h-2/3 lg:h-full w-full mx-6 sm:mx-8 md:mx-12 outline outline-1 outline-card-foreground/20"
              >
                <TaxComparisonChart />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-row min-h-32"></div>
      </div>
    </div>
  );
};

export default SalaryPage;
