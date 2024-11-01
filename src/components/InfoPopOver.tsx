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
        <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full ml-1">
          <InfoCircledIcon className="h-4 w-4 text-orange-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" bg-card/75 backdrop-blur-sm border-primary/30">
        <div className="flex flex-col space-y-2 text-sm ">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopOver;
