import React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import 'tailwindcss/tailwind.css';

interface InfoPopOverProps {
  children: React.ReactNode;
}

const InfoPopOver: React.FC<InfoPopOverProps> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full ml-1 text-accent hover:text-background">
          <InfoCircledIcon className="h-4 w-4 text-inherit" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" bg-primary/10 backdrop-blur-md border-primary/30 shadow-xl w-80 sm:w-96">
        <div className="flex flex-col space-y-2 text-xs w-full">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopOver;
