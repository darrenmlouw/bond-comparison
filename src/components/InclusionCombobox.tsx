"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import inclusionOption from "@/enums/inclusionOption"; // Import the inclusionOptions enum

// Type definition for the props
interface InclusionComboboxProps {
  inclusionType: inclusionOption;
  oninclusionTypeChange: (value: inclusionOption) => void;
}

// List of inclusion options
const inclusionOptions = [
  { value: inclusionOption.Individual, label: "Individual" },
  { value: inclusionOption.Company, label: "Company" },
  { value: inclusionOption.Trust, label: "Trust" },
];

export const InclusionCombobox: React.FC<InclusionComboboxProps> = ({
  inclusionType,
  oninclusionTypeChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <Label>Inclusion Type</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {inclusionType
              ? inclusionOptions.find((option) => option.value === inclusionType)?.label
              : "Select Inclusion"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search inclusion type..." />
            <CommandList>
              <CommandEmpty>No inclusion type found.</CommandEmpty>
              <CommandGroup>
                {inclusionOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      oninclusionTypeChange(currentValue as inclusionOption);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        inclusionType === option.value ? "opacity-100" : "opacity-0"
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
    </div>
  );
};
