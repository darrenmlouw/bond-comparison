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
import ageCategory from '@/enums/ageCategory'; // Import AgeCategory enum

interface AgeComboboxProps {
  age: ageCategory;
  onAgeChange: (value: ageCategory) => void;
}

export function AgeCombobox({ age, onAgeChange }: AgeComboboxProps) {
  const [open, setOpen] = useState(false);

  // Age categories, including "None"
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
      <PopoverContent className="w-full p-0">
        <Command>
          {/* <CommandInput placeholder="Search age category..." /> */}
          <CommandList>
            <CommandEmpty>No age category found.</CommandEmpty>
            <CommandGroup>
              {ageCategories.map((cat) => (
                <CommandItem
                  key={cat.value}
                  value={cat.value}
                  onSelect={() => {
                    onAgeChange(cat.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      age === cat.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {cat.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
