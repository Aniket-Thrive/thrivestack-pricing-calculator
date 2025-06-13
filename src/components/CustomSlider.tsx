
import React from 'react';

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-blue-600">{formatValue(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};
