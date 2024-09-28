'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import ExclusionOptions from '@/enums/ExclusionOptions'; // Import the ExclusionOptions enum
import { Input } from '@/components/ui/input';

// Type definition for the props
interface ExclusionComboboxProps {
  exclusionType: ExclusionOptions;
  onExclusionTypeChange: (value: ExclusionOptions) => void;
  numberOfPeopleInJointBond: number;
  onNumberOfPeopleInJointBondChange: (value: number) => void;
  smallBusinessMarketValue: number;
  onSmallBusinessMarketValueChange: (value: number) => void;
}

// List of exclusion options
const exclusionOptions = [
  { value: ExclusionOptions.PrimaryResidence, label: 'Primary Residence' },
  { value: ExclusionOptions.SecondProperty, label: 'Second Property' },
  { value: ExclusionOptions.JointBond, label: 'Joint Bond' },
  { value: ExclusionOptions.Deceased, label: 'Deceased' },
  { value: ExclusionOptions.SmallBusinessOwner, label: 'Small Business Owner' },
  { value: ExclusionOptions.None, label: 'None' },
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
            {exclusionType !== ExclusionOptions.None
              ? exclusionOptions.find(
                  (option) => option.value === exclusionType
                )?.label
              : 'Select exclusion type...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search exclusion type..." />
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
                          ? ExclusionOptions.None
                          : (currentValue as ExclusionOptions)
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        exclusionType === option.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {exclusionType === ExclusionOptions.SmallBusinessOwner && (
        <div className="flex flex-col space-y-2 w-full">
          <Label>Small Business Market Value</Label>
          <Input
            type="number"
            placeholder="Enter the market value of the small business"
            value={smallBusinessMarketValue}
            onChange={(e) =>
              setSmallBusinessMarketValue(parseFloat(e.target.value))
            }
          />
        </div>
      )}

      {exclusionType === ExclusionOptions.JointBond && (
        <div className="flex flex-col space-y-2 w-full">
          <Label>Number of People in Joint Bond</Label>
          <Input
            type="number"
            placeholder="Enter the number of people in the joint bond"
            value={numberOfPeopleInJointBond}
            onChange={(e) =>
              setNumberOfPeopleInJointBond(parseInt(e.target.value))
            }
          />
        </div>
      )}
    </div>
  );
};
