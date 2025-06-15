
import React from 'react';

interface BillingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ isAnnual, onToggle }) => {
  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Billing Cycle</span>
        <div className="flex items-center space-x-3">
          <span className={`text-sm ${!isAnnual ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => onToggle(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
            Annual
            {isAnnual && <span className="text-green-600 ml-1">(-20%)</span>}
          </span>
        </div>
      </div>
    </div>
  );
};
