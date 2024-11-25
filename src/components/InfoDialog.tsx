import React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InfoDialogProps {
  title: string;
  children: React.ReactNode;
}

const InfoDialog = ({ title, children }: InfoDialogProps) => {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 rounded-full ml-1 text-accent hover:text-background"
        >
          <InfoCircledIcon className="h-4 w-4 text-inherit" />
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="rounded-lg bg-primary/10 backdrop-blur-md border-primary/30 shadow-xl ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 text-xs w-full">{children}</div>
        <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
