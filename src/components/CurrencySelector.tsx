
import React from 'react';
import { Currency, CURRENCY_SYMBOLS } from '../utils/pricingEngine';

interface CurrencySelectorProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  onCurrencyChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Currency:</span>
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="USD">USD ({CURRENCY_SYMBOLS.USD})</option>
        <option value="EUR">EUR ({CURRENCY_SYMBOLS.EUR})</option>
        <option value="INR">INR ({CURRENCY_SYMBOLS.INR})</option>
      </select>
    </div>
  );
};
