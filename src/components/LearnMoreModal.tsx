
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
      className="!max-w-screen-xl w-full md:w-[1000px] lg:w-[1200px] p-0 flex flex-col" // Huge width for better fit
      style={{ maxWidth: '1200px', width: '100%' }}
    >
      <DialogHeader className="px-8 pt-8 mx-0">
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className="flex flex-col md:flex-row gap-0 md:gap-12 px-6 pb-6 pt-2 min-h-[480px] w-full">
          {/* Child nodes are always two columns */}
          {description}
        </div>
      </DialogDescription>
      <div className="flex justify-end mt-4 px-8 pb-4">
        <DialogClose className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">Close</DialogClose>
      </div>
    </DialogContent>
  </Dialog>
);

