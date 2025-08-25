
import React from 'react';

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
  useLogarithmicScale?: boolean;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
  useLogarithmicScale = false
}) => {
  // Helper functions for logarithmic scaling
  const valueToPosition = (val: number): number => {
    if (!useLogarithmicScale) {
      return ((val - min) / (max - min)) * 100;
    }
    
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    const logVal = Math.log(val);
    return ((logVal - logMin) / (logMax - logMin)) * 100;
  };

  const positionToValue = (position: number): number => {
    if (!useLogarithmicScale) {
      return min + (position / 100) * (max - min);
    }
    
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    const logVal = logMin + (position / 100) * (logMax - logMin);
    return Math.exp(logVal);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = Number(e.target.value);
    const newValue = positionToValue(position);
    
    // Round to nearest step for logarithmic scale
    if (useLogarithmicScale) {
      const roundedValue = Math.round(newValue / step) * step;
      onChange(Math.max(min, Math.min(max, roundedValue)));
    } else {
      onChange(newValue);
    }
  };

  const percentage = valueToPosition(value);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          step={useLogarithmicScale ? 0.1 : (step / (max - min)) * 100}
          value={percentage}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
          }}
        />
        {/* Value display on top of the slider thumb */}
        <div 
          className="absolute -top-8 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg"
          style={{
            left: `${percentage}%`
          }}
        >
          {formatValue(value)}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};
