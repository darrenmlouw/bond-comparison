import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import exclusionOption from '@/enums/exclusionOption';
import { Input } from '@/components/ui/input';

// Type definition for the props
interface ExclusionComboboxProps {
  exclusionType: exclusionOption;
  onExclusionTypeChange: (value: exclusionOption) => void;
  numberOfPeopleInJointBond: number;
  onNumberOfPeopleInJointBondChange: (value: number) => void;
  smallBusinessMarketValue: number;
  onSmallBusinessMarketValueChange: (value: number) => void;
}

// List of exclusion options with exclusion amounts
const exclusionOptions = [
  {
    value: exclusionOption.PrimaryResidence,
    label: 'Primary Residence',
    amount: 'R2,000,000',
  },
  {
    value: exclusionOption.SecondProperty,
    label: 'Second Property',
    amount: 'None',
  },
  {
    value: exclusionOption.JointBond,
    label: 'Joint Bond',
    amount: 'Varies by bondholder share',
  },
  {
    value: exclusionOption.Deceased,
    label: 'Deceased',
    amount: 'R300,000 (final year only)',
  },
  {
    value: exclusionOption.SmallBusinessOwner,
    label: 'Small Business Owner',
    amount: 'R1,800,000',
  },
  {
    value: exclusionOption.Annual,
    label: 'Annual Exclusion',
    amount: 'R40,000',
  },
  {
    value: exclusionOption.None,
    label: 'None',
    amount: 'No exclusions',
  },
];

export const ExclusionCombobox = ({
  exclusionType,
  onExclusionTypeChange,
  numberOfPeopleInJointBond,
  onNumberOfPeopleInJointBondChange,
  smallBusinessMarketValue,
  onSmallBusinessMarketValueChange,
}: ExclusionComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <Label>Exclusion Type</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {exclusionType !== exclusionOption.None
              ? exclusionOptions.find(
                  (option) => option.value === exclusionType
                )?.label
              : 'Select Exclusion'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-primary/30 rounded-xl bg-card/30 backdrop-blur-md shadow-lg">
          <Command className="rounded-xl bg-transparent">
            {/* <CommandInput placeholder="Search exclusion type..." /> */}
            <CommandList>
              <CommandEmpty>No exclusion type found.</CommandEmpty>
              <CommandGroup>
                {exclusionOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onExclusionTypeChange(
                        currentValue === exclusionType
                          ? exclusionOption.None
                          : (currentValue as exclusionOption)
                      );
                      setOpen(false);
                    }}
                    className="p-2 rounded-lg hover:bg-primary/30"
                  >
                    <Check
                      color="green"
                      className={`mr-2 h-4 w-4 ${
                        exclusionType === option.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="mb-1">{option.label}</span>
                      <span className="text-xs text-foreground/60">
                        Exclusion Amount: {option.amount}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {exclusionType === exclusionOption.SmallBusinessOwner && (
        <div className="flex flex-col space-y-2 w-full">
          <Label>Small Business Market Value</Label>
          <Input
            type="number"
            placeholder="Enter the market value of the small business"
            value={smallBusinessMarketValue}
            onChange={(e) =>
              onSmallBusinessMarketValueChange(
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>
      )}

      {exclusionType === exclusionOption.JointBond && (
        <div className="flex flex-col space-y-2 w-full">
          <Label>Number of People in Joint Bond</Label>
          <Input
            type="number"
            placeholder="Enter the number of people in the joint bond"
            value={numberOfPeopleInJointBond}
            onChange={(e) =>
              onNumberOfPeopleInJointBondChange(
                parseInt(e.target.value) || 0
              )
            }
          />
        </div>
      )}
    </div>
  );
};
