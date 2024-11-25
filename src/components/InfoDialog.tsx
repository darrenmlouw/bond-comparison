import React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InfoDialogProps {
  title: string;
  children: React.ReactNode;
}

const InfoDialog = ({ title, children }: InfoDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 rounded-full ml-1 hover:text-background text-accent"
        >
          <InfoCircledIcon className="h-4 w-4 text-inherit" />
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">{children}</div>
        <DialogFooter>
          <DialogClose>
            <Button className='w-full'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
