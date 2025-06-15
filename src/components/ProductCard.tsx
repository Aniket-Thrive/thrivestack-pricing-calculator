
import React from 'react';
import { ProductConfig } from '../types/ProductConfig';
import { formatPrice, formatNumber, Currency } from '../utils/pricingEngine';
import { ProductSliders } from './ProductSliders';
import { ProductFeatures } from './ProductFeatures';

interface ProductCardProps {
  product: ProductConfig;
  isSelected: boolean;
  onToggle: () => void;
  price: number;
  marketingMtuValue: number;
  productMtuValue: number;
  seatValue: number;
  arrValue: number;
  abuseDetectionEnabled?: boolean;
  onAbuseDetectionEnabledChange?: (enabled: boolean) => void;
  abuseDetectionValue?: number;
  onAbuseDetectionChange?: (value: number) => void;
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
  abuseDetectionEnabled = false,
  onAbuseDetectionEnabledChange,
  abuseDetectionValue = 500,
  onAbuseDetectionChange,
  onMarketingMtuChange,
  onProductMtuChange,
  onSeatChange,
  onArrChange,
  currency,
  isAnnual,
  disabled = false
}) => {
  // Check if product is coming soon
  const isComingSoon = product.tag === 'Coming Soon';
  const isDisabled = disabled || isComingSoon;

  const getPricingInfo = () => {
    switch (product.pricingType) {
      case 'mtu':
        const mtuValue = product.id === 'marketing' ? marketingMtuValue : productMtuValue;
        const label = product.id === 'marketing' ? 'MTVs' : 'MTUs';
        return `${formatNumber(mtuValue)} ${label}`;
      case 'seat':
        return `${seatValue} seats`;
      case 'arr':
        return `${formatPrice(arrValue, currency)} ARR`;
      case 'free':
        return 'Free';
      case 'abuse':
        return `${abuseDetectionValue} detections`;
      default:
        return '';
    }
  };

  // Always show monthly price for display, even when annual is selected
  const displayPrice = isAnnual && price > 0 ? price : price;

  return (
    <div className={`border rounded-lg p-6 transition-all duration-200 ${
      isSelected 
        ? 'border-blue-500 bg-blue-50' 
        : isDisabled 
          ? 'border-gray-200 bg-gray-50 opacity-60' 
          : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            disabled={isDisabled}
            className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
              {product.tag && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isComingSoon 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
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
            {isComingSoon && (
              <p className="text-xs text-orange-600 mt-1">
                This module will be available soon. Stay tuned for updates!
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            {isComingSoon ? 'Coming Soon' : displayPrice > 0 ? formatPrice(displayPrice, currency) : product.pricingType === 'free' ? 'FREE' : formatPrice(0, currency)}
          </div>
          {!isComingSoon && (
            <div className="text-sm text-gray-500">
              {getPricingInfo()}
              {displayPrice > 0 && (
                <div className="text-xs text-gray-500">
                  per month
                </div>
              )}
              {isAnnual && displayPrice > 0 && (
                <div className="text-xs text-green-600">20% annual discount applied</div>
              )}
            </div>
          )}
        </div>
      </div>

      {!isComingSoon && (
        <ProductSliders
          product={product}
          isSelected={isSelected}
          marketingMtuValue={marketingMtuValue}
          productMtuValue={productMtuValue}
          seatValue={seatValue}
          arrValue={arrValue}
          abuseDetectionEnabled={abuseDetectionEnabled}
          onAbuseDetectionEnabledChange={onAbuseDetectionEnabledChange}
          abuseDetectionValue={abuseDetectionValue}
          onAbuseDetectionChange={onAbuseDetectionChange}
          onMarketingMtuChange={onMarketingMtuChange}
          onProductMtuChange={onProductMtuChange}
          onSeatChange={onSeatChange}
          onArrChange={onArrChange}
          currency={currency}
        />
      )}

      <ProductFeatures features={product.features} />
    </div>
  );
};
