
import React from 'react';
import { CustomSlider } from './CustomSlider';

interface AbuseDetectionAddonProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  value: number;
  onChange: (value: number) => void;
}

export const AbuseDetectionAddon: React.FC<AbuseDetectionAddonProps> = ({
  enabled,
  onEnabledChange,
  value,
  onChange
}) => {
  return (
    <div className="border rounded-lg p-4 mt-4 bg-white/90 shadow">
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={e => onEnabledChange(e.target.checked)}
          className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          id="abuse-detection-checkbox"
        />
        <label htmlFor="abuse-detection-checkbox" className="font-semibold text-sm text-blue-900">
          Add Abuse Detection
        </label>
      </div>
      <p className="text-xs text-gray-700 mb-3">
        Detects suspicious signups using rules like disposable email domains, personal email providers, unusual behavior patterns, and bot-like activity to prevent fake accounts and maintain growth quality.
        <br />
        <span className="text-blue-700 font-medium">First 500 detections/mo included for $25, then $0.02 per detection</span>
      </p>
      {enabled && (
        <CustomSlider
          label="Detections Per Month"
          value={value}
          onChange={onChange}
          min={100}
          max={20000}
          step={10}
          formatValue={v => v.toLocaleString()}
        />
      )}
    </div>
  );
};
