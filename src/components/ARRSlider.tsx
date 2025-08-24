
import React from 'react';
import { CustomSlider } from './CustomSlider';
import { formatPrice, Currency } from '../utils/pricingEngine';

interface ARRSliderProps {
  value: number;
  onChange: (value: number) => void;
  currency: Currency;
}

export const ARRSlider: React.FC<ARRSliderProps> = ({ value, onChange, currency }) => {
  return (
    <CustomSlider
      label="Annual Recurring Revenue"
      value={value}
      onChange={onChange}
      min={0}
      max={100000000}
      step={10000}
      formatValue={(v) => formatPrice(v, currency)}
    />
  );
};
