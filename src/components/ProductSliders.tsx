
import React from 'react';
import { ProductConfig } from '../types/ProductConfig';
import { Currency } from '../utils/pricingEngine';
import { MTUSlider } from './MTUSlider';
import { SeatSlider } from './SeatSlider';
import { ARRSlider } from './ARRSlider';

interface ProductSlidersProps {
  product: ProductConfig;
  isSelected: boolean;
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
}

export const ProductSliders: React.FC<ProductSlidersProps> = ({
  product,
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
  currency
}) => {
  if (product.pricingType === 'free') return null;

  switch (product.pricingType) {
    case 'mtu':
      const currentMtuValue = product.id === 'marketing' ? marketingMtuValue : productMtuValue;
      const handleMtuChange = product.id === 'marketing' ? onMarketingMtuChange : onProductMtuChange;
      return (
        <MTUSlider
          productId={product.id}
          value={currentMtuValue}
          onChange={handleMtuChange}
          abuseDetectionEnabled={abuseDetectionEnabled}
          onAbuseDetectionEnabledChange={onAbuseDetectionEnabledChange}
          abuseDetectionValue={abuseDetectionValue}
          onAbuseDetectionChange={onAbuseDetectionChange}
        />
      );
    case 'seat':
      return (
        <SeatSlider
          value={seatValue}
          onChange={onSeatChange}
        />
      );
    case 'arr':
      return (
        <ARRSlider
          value={arrValue}
          onChange={onArrChange}
          currency={currency}
        />
      );
    default:
      return null;
  }
};
