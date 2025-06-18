
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
      className="max-w-[95vw] w-full max-h-[90vh] p-0 flex flex-col overflow-hidden"
    >
      <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
        <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {description}
          </div>
        </div>
      </DialogDescription>
      <div className="flex justify-end px-6 pb-4 border-t bg-gray-50 flex-shrink-0">
        <DialogClose className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
          Close
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
);
