import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProductConfig } from './PricingCalculator';
import { formatPrice, formatNumber, Currency } from '../utils/pricingEngine';
import { CustomSlider } from './CustomSlider';

interface ProductCardProps {
  product: ProductConfig;
  isSelected: boolean;
  onToggle: () => void;
  price: number;
  marketingMtuValue: number;
  productMtuValue: number;
  seatValue: number;
  arrValue: number;
  onMarketingMtuChange: (value: number) => void;
  onProductMtuChange: (value: number) => void;
  onSeatChange: (value: number) => void;
  onArrChange: (value: number) => void;
  currency: Currency;
  isAnnual: boolean;
  disabled?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggle,
  price,
  marketingMtuValue,
  productMtuValue,
  seatValue,
  arrValue,
  onMarketingMtuChange,
  onProductMtuChange,
  onSeatChange,
  onArrChange,
  currency,
  isAnnual,
  disabled = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPricingInfo = () => {
    switch (product.pricingType) {
      case 'mtu':
        const mtuValue = product.id === 'marketing' ? marketingMtuValue : productMtuValue;
        return `${formatNumber(mtuValue)} MTUs`;
      case 'seat':
        return `${seatValue} seats`;
      case 'arr':
        return `${formatPrice(arrValue, currency)} ARR`;
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
        const currentMtuValue = product.id === 'marketing' ? marketingMtuValue : productMtuValue;
        const handleMtuChange = product.id === 'marketing' ? onMarketingMtuChange : onProductMtuChange;
        return (
          <CustomSlider
            label="Monthly Tracked Users"
            value={currentMtuValue}
            onChange={handleMtuChange}
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
            formatValue={(v) => formatPrice(v, currency)}
          />
        );
      default:
        return null;
    }
  };

  const renderFeatureText = (feature: string) => {
    // Replace **text** with <strong>text</strong>
    const parts = feature.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
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
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              {product.tag && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {product.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{product.description}</p>
            {disabled && product.dependencies && (
              <p className="text-xs text-orange-600 mt-1">
                Requires: {product.dependencies.map(dep => 
                  dep === 'marketing' ? 'Marketing Intelligence' : 
                  dep === 'product' ? 'Product Intelligence' : dep
                ).join(' + ')}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            {price > 0 ? formatPrice(price, currency) : product.pricingType === 'free' ? 'FREE' : formatPrice(0, currency)}
          </div>
          <div className="text-sm text-gray-500">
            {getPricingInfo()}
            {price > 0 && (
              <div className="text-xs text-gray-500">
                per {isAnnual ? 'year' : 'month'}
              </div>
            )}
            {isAnnual && price > 0 && (
              <div className="text-xs text-green-600">20% annual discount applied</div>
            )}
          </div>
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
              <p className="text-sm text-gray-700">{renderFeatureText(feature)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
