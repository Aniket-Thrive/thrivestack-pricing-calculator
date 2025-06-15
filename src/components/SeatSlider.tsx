
import React from 'react';
import { CustomSlider } from './CustomSlider';

interface SeatSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const SeatSlider: React.FC<SeatSliderProps> = ({ value, onChange }) => {
  return (
    <CustomSlider
      label="Number of Seats"
      value={value}
      onChange={onChange}
      min={1}
      max={100}
      step={1}
      formatValue={(v) => v.toString()}
    />
  );
};
