
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProductConfig } from './PricingCalculator';
import { formatPrice, formatNumber } from '../utils/pricingEngine';
import { CustomSlider } from './CustomSlider';

interface ProductCardProps {
  product: ProductConfig;
  isSelected: boolean;
  onToggle: () => void;
  price: number;
  mtuValue: number;
  seatValue: number;
  arrValue: number;
  onMtuChange: (value: number) => void;
  onSeatChange: (value: number) => void;
  onArrChange: (value: number) => void;
  disabled?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggle,
  price,
  mtuValue,
  seatValue,
  arrValue,
  onMtuChange,
  onSeatChange,
  onArrChange,
  disabled = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPricingInfo = () => {
    switch (product.pricingType) {
      case 'mtu':
        return `${formatNumber(mtuValue)} MTUs`;
      case 'seat':
        return `${seatValue} seats`;
      case 'arr':
        return `${formatPrice(arrValue)} ARR`;
      case 'free':
        return 'Free';
      default:
        return '';
    }
  };

  const renderSlider = () => {
    if (!isSelected || product.pricingType === 'free') return null;

    switch (product.pricingType) {
      case 'mtu':
        return (
          <CustomSlider
            label="Monthly Tracked Users"
            value={mtuValue}
            onChange={onMtuChange}
            min={1000}
            max={1000000}
            step={1000}
            formatValue={(v) => formatNumber(v)}
          />
        );
      case 'seat':
        return (
          <CustomSlider
            label="Number of Seats"
            value={seatValue}
            onChange={onSeatChange}
            min={1}
            max={100}
            step={1}
            formatValue={(v) => v.toString()}
          />
        );
      case 'arr':
        return (
          <CustomSlider
            label="Annual Recurring Revenue"
            value={arrValue}
            onChange={onArrChange}
            min={0}
            max={20000000}
            step={10000}
            formatValue={(v) => formatPrice(v)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`border rounded-lg p-6 transition-all duration-200 ${
      isSelected 
        ? 'border-blue-500 bg-blue-50' 
        : disabled 
          ? 'border-gray-200 bg-gray-50 opacity-60' 
          : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            disabled={disabled}
            className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            {disabled && product.dependencies && (
              <p className="text-xs text-orange-600 mt-1">
                Requires: {product.dependencies.map(dep => 
                  dep === 'marketing' ? 'Marketing' : 
                  dep === 'product' ? 'Product Management' : dep
                ).join(' + ')}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            {price > 0 ? formatPrice(price) : product.pricingType === 'free' ? 'FREE' : '$0'}
          </div>
          <div className="text-sm text-gray-500">{getPricingInfo()}</div>
        </div>
      </div>

      {isSelected && renderSlider()}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mt-4 text-sm text-blue-600 hover:text-blue-800"
      >
        <span>View Features</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-2">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">{feature}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
