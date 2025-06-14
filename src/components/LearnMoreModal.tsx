
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';

type LearnMoreModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
};

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ open, onOpenChange, title, description }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="!max-w-screen-2xl w-full md:w-[1400px] lg:w-[1800px] p-0 flex flex-col"
      style={{ maxWidth: '1800px', width: '100%' }}
    >
      <DialogHeader className="px-12 pt-10 mx-0">
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className="flex flex-col md:flex-row gap-0 md:gap-20 px-10 pb-10 pt-2 min-h-[540px] w-full">
          {/* Pass in two columns as children */}
          {description}
        </div>
      </DialogDescription>
      <div className="flex justify-end mt-4 px-12 pb-6">
        <DialogClose className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">Close</DialogClose>
      </div>
    </DialogContent>
  </Dialog>
);

