import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ageCategory from '@/enums/ageCategory';
import TAX_THRESHOLDS from '@/constants/TAX_THRESHOLDS';
import TAX_REBATES from '@/constants/TAX_REBATES';

interface AgeComboboxProps {
  age: ageCategory;
  taxYear: number;
  onAgeChange: (value: ageCategory) => void;
}

// Map ageCategory values to TAX_THRESHOLDS and TAX_REBATES keys
const taxThresholdKeyMap: Record<ageCategory, keyof typeof TAX_THRESHOLDS[2025]> = {
  [ageCategory.None]: 'under65', // Default, won't display a threshold or rebate
  [ageCategory.Under65]: 'under65',
  [ageCategory.From65To74]: 'from65to75',
  [ageCategory.Over75]: 'over75',
};

export function AgeCombobox({ age, taxYear, onAgeChange }: AgeComboboxProps) {
  const [open, setOpen] = useState(false);

  const ageCategories = [
    { label: 'None', value: ageCategory.None },
    { label: 'Under 65', value: ageCategory.Under65 },
    { label: '65 to 74', value: ageCategory.From65To74 },
    { label: '75 and older', value: ageCategory.Over75 },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {age !== ageCategory.None
            ? ageCategories.find((cat) => cat.value === age)?.label
            : 'Select Age Category'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-primary/30 rounded-xl bg-card/30 backdrop-blur-md shadow-lg">
        <Command className='rounded-xl bg-transparent '>
          <CommandList>
            <CommandEmpty>No age category found.</CommandEmpty>
            <CommandGroup>
              {ageCategories.map((cat) => {
                const thresholdKey = taxThresholdKeyMap[cat.value];
                const thresholdValue = TAX_THRESHOLDS[taxYear]?.[thresholdKey];
                const rebateValue = TAX_REBATES[taxYear]?.[thresholdKey];

                return (
                  <CommandItem
                    key={cat.value}
                    onSelect={() => {
                      onAgeChange(cat.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "p-2 rounded-lg", 
                      age === cat.value ? "bg-primary/10" : "hover:bg-primary/30"
                      
                    )}
                  >
                    <Check
                      color='green'
                      className={cn(
                        'mr-2 h-4 w-4',
                        age === cat.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="mb-1">{cat.label}</span>
                      {cat.value !== ageCategory.None && (
                        <>
                          <span className="text-xs text-foreground/60">
                            {thresholdValue !== undefined
                              ? `Tax Threshold: R${thresholdValue}`
                              : 'Tax Threshold: Not available'}
                          </span>
                          <span className="text-xs text-foreground/60">
                            {rebateValue !== undefined
                              ? `Tax Rebate: R${rebateValue}`
                              : 'Tax Rebate: Not available'}
                          </span>
                        </>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
