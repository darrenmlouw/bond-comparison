import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import TAX_BRACKETS from '@/constants/TAX_BRACKETS';
import TAX_PERIODS from '@/constants/TAX_PERIODS'; // Import TAX_PERIODS

// Define types for year and onYearChange
interface YearComboboxProps {
  year: string;
  onYearChange: (value: number) => void;
}

export function YearCombobox({ year, onYearChange }: YearComboboxProps) {
  const [open, setOpen] = useState(false);

  // Extract available years from TAX_BRACKETS and sort them in descending order
  const availableYears = Object.keys(TAX_BRACKETS)
    .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years in descending order
    .map((year) => {
      const period = TAX_PERIODS[parseInt(year)]; // Get tax period for the year
      const formattedPeriod = `${period.start.day} ${new Date(
        0,
        period.start.month - 1
      ).toLocaleString('default', { month: 'long' })} ${period.start.year} - ${
        period.end.day
      } ${new Date(0, period.end.month - 1).toLocaleString('default', {
        month: 'long',
      })} ${period.end.year}`;

      return {
        value: year,
        label: year,
        period: formattedPeriod,
      };
    });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {year
            ? availableYears.find((y) => y.value === year)?.label
            : 'Select year...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[full] p-0">
        <Command>
          {/* <CommandInput placeholder="Search year..." /> */}
          <CommandList>
            <CommandEmpty>No year found.</CommandEmpty>
            <CommandGroup>
              {availableYears.map((y) => (
                <CommandItem
                  key={y.value}
                  value={y.value}
                  onSelect={(currentValue) => {
                    // Convert the selected year to number before calling onYearChange
                    onYearChange(parseInt(currentValue));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      year === y.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{y.label}</span>
                    <span className="text-xs text-foreground/60">
                      {y.period}
                    </span>{' '}
                    {/* Display tax period below the year */}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
