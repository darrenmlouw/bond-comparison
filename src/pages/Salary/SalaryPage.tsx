import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  calculateTax,
  // getTaxBracket,
  // getTaxRebate,
} from '@/utils/incomeTaxCalculations';
import { formatNumber } from '@/utils/formatNumber'; // Import the utility function
import TaxComparisonChart from '@/components/TaxComparisonChart';
import { SectionHeader } from '@/components/SectionHeader';
import { useSalary } from '@/hooks/useSalary';

const SalaryPage = () => {
  const {
    grossMonthlyIncome,
    setGrossMonthlyIncome,
    deductions,
    setDeductions,
    age,
    setAge,
    year,
    setYear,
  } = useSalary();

  const netAnnualIncome = grossMonthlyIncome * 12 - deductions * 12;

  const tax = calculateTax(netAnnualIncome, age, year);
  // const taxBracket = getTaxBracket(netAnnualIncome, year);
  // const taxRebate = getTaxRebate(age, year);

  return (
    <div className="flex flex-col h-full w-full items-center ">
      <p className="font-bold text-5xl md:text-6xl lg:text-7xl text-primary-foreground mt-6 mb-4 sm:mt-8 sm:mb-6 md:mt-10 md:mb-8">
        Salary and Tax
      </p>

      <p className="text-primary-foreground/70 mb-3 sm:mb-4 md:mb-6">
        Calculate Tax Bracket and Capital Gains
      </p>

      <div className="px-4 sm:px-6 gap-4 sm:gap-6 md:gap-8 flex flex-col w-full justify-center items-center ">
        <div className="flex flex-col w-full max-w-2xl gap-y-2">
          <SectionHeader label="Income Details" />

          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col w-1/2 gap-1.5">
              <Label htmlFor="income" className="text-sm ">
                Gross Monthly Income
              </Label>
              <Input
                type="number"
                id="income"
                name="income"
                placeholder="Enter your annual income"
                value={grossMonthlyIncome}
                onChange={(e) =>
                  setGrossMonthlyIncome(parseFloat(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col w-1/2 gap-1.5">
              <Label htmlFor="tax" className="text-sm ">
                Tax Deductables
              </Label>
              <Input
                type="number"
                id="tax"
                name="tax"
                placeholder="Enter your tax rate"
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
              <Input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex flex-col w-1/2 gap-1.5">
              <Label htmlFor="year" className="text-sm">
                Year
              </Label>
              <Input
                type="number"
                id="year"
                name="year"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex bg-card justify-center gap-6 w-full max-w-2xl h-auto p-3 sm:p-4 md:p-6 opacity-75 outline outline-1 outline-card-foreground/20 shadow-xl rounded-xl">
          {/* Column 1 */}
          <div className="grid grid-cols-2 w-full gap-y-4 sm:gap-y-6 md:gap-y-8">
            <div className="flex justify-start">
              <div className="flex flex-col">
                <p className="text-sm sm:text-base md:text-lg">
                  Gross Annual Income
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-green-700 dark:text-green-300 ">
                  R {formatNumber(grossMonthlyIncome * 12)}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="flex flex-col">
                <p className="text-sm sm:text-base md:text-lg">
                  Net Annual Income
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-green-600 dark:text-green-400">
                  R {formatNumber(grossMonthlyIncome * 12 - deductions * 12)}
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="flex flex-col">
                <p className="text-sm sm:text-base md:text-lg">
                  Annual Tax Deductions
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-orange-700 dark:text-orange-400">
                  R {formatNumber(deductions * 12)}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="flex flex-col">
                <p className="text-sm sm:text-base md:text-lg">Annual Tax</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-red-500">
                  R {formatNumber(tax)}
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

        <div className="flex flex-row bg-card w-full max-w-2xl h-96 opacity-75 outline outline-1 outline-card-foreground/20 shadow-2xl p-3 sm:p-4 md:p-6 rounded-xl ">
          <TaxComparisonChart />
        </div>

        <div className="flex flex-row min-h-32"></div>
      </div>
    </div>
  );
};

export default SalaryPage;
