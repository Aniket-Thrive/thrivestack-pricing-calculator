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
    <DialogContent className="!max-w-3xl"> {/* wider modal for timeline */}
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div>{description}</div>
      </DialogDescription>
      <div className="flex justify-end mt-4">
        <DialogClose className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">Close</DialogClose>
      </div>
    </DialogContent>
  </Dialog>
);
