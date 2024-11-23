import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';
import InfoPopOver from '@/components/InfoPopOver';
import { useSalary } from '@/hooks/useSalary';
import { AgeCombobox } from '@/components/AgeCombobox';
import { YearCombobox } from '@/components/YearCombobox';
import ageCategory from '@/enums/ageCategory';

const InputComponents = () => {
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

  return (
    <Accordion type="single" collapsible className="space-y-3 sm:space-y-4 ">
      <AccordionItem
        value="rent"
        className="bg-card border border-card-foreground/20 shadow-2xl rounded-lg overflow-hidden"
      >
        <AccordionTrigger className="flex text-start hover:no-underline bg-card hover:bg-primary/20 p-2.5 sm:p-4">
          <div className="flex flex-row text-xl sm:text-2xl tracking-wide font-light justify-center items-center">
            <DollarSign className="w-6 h-6 mr-2 text-secondary" />
            Income Details
          </div>
        </AccordionTrigger>
        <AccordionContent className="pr-4 pl-4 pt-2 border-t border-card-foreground/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
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

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-row, justify-bet items-center">
                <Label htmlFor="tax" className="text-sm ">
                  Pre-Tax Deductions
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

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="age" className="text-sm ">
                Age
              </Label>
              <AgeCombobox
                age={age || ageCategory.None}
                taxYear={year}
                onAgeChange={(category) => {
                  setAge(category);
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="year" className="text-sm">
                Tax Year
              </Label>
              <YearCombobox year={year.toString()} onYearChange={setYear} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InputComponents;
