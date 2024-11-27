import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
import { useState } from "react";

// Type definition for the props
interface InclusionComboboxProps {
  inclusionType: inclusionOption;
  onInclusionTypeChange: (value: inclusionOption) => void;
}

// List of inclusion options with additional details
const inclusionOptions = [
  {
    value: inclusionOption.Individual,
    label: "Individual",
    inclusionRate: "40%",
    marginalTaxRate: "Based on individual income tax bracket",
  },
  {
    value: inclusionOption.Company,
    label: "Company",
    inclusionRate: "80%",
    marginalTaxRate: "28% flat rate",
  },
  {
    value: inclusionOption.Trust,
    label: "Trust",
    inclusionRate: "80%",
    marginalTaxRate: "45% flat rate",
  },
  {
    value: inclusionOption.None,
    label: "None",
    inclusionRate: "No inclusion",
    marginalTaxRate: "No tax",
  }
];

export const InclusionCombobox: React.FC<InclusionComboboxProps> = ({
  inclusionType,
  onInclusionTypeChange,
}) => {
  const [open, setOpen] = useState(false);

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
            {inclusionType !== inclusionOption.None
              ? inclusionOptions.find(
                  (option) => option.value === inclusionType
                )?.label
              : "Select Inclusion"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-primary/30 rounded-xl bg-card/30 backdrop-blur-md shadow-lg">
          <Command className="rounded-xl bg-transparent">
            <CommandList>
              <CommandEmpty>No inclusion type found.</CommandEmpty>
              <CommandGroup>
                {inclusionOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onInclusionTypeChange(
                        currentValue === inclusionType
                          ? inclusionOption.None
                          : (currentValue as inclusionOption)
                      );
                      setOpen(false);
                    }}
                    className="p-2 rounded-lg hover:bg-primary/30"
                  >
                    <Check
                      color="green"
                      className={`mr-2 h-4 w-4 ${
                        inclusionType === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="mb-1">{option.label}</span>
                      <span className="text-xs text-foreground/60">
                        Inclusion Rate: {option.inclusionRate}
                      </span>
                      <span className="text-xs text-foreground/60">
                        Marginal Tax Rate: {option.marginalTaxRate}
                      </span>
                    </div>
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
