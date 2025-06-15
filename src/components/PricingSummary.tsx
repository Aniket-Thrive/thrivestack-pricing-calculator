
import React, { useState } from 'react';
import { ProductConfig } from './PricingCalculator';
import { formatPrice, Currency, getMTUTierBreakdown, getSeatTierBreakdown, getARRTierBreakdown } from '../utils/pricingEngine';
import { BillingToggle } from './BillingToggle';
import { PricingActions } from './PricingActions';

interface PricingSummaryProps {
  selectedProducts: string[];
  products: ProductConfig[];
  calculatePrice: (product: ProductConfig) => number;
  totalPrice: number;
  isEnterprise: boolean;
  marketingMtuValue: number;
  productMtuValue: number;
  seatValue: number;
  arrValue: number;
  abuseDetectionEnabled?: boolean;
  abuseDetectionValue?: number;
  currency: Currency;
  isAnnual: boolean;
  onAnnualToggle: (isAnnual: boolean) => void;
}

export const PricingSummary: React.FC<PricingSummaryProps> = ({
  selectedProducts,
  products,
  calculatePrice,
  totalPrice,
  isEnterprise,
  marketingMtuValue,
  productMtuValue,
  seatValue,
  arrValue,
  abuseDetectionEnabled = false,
  abuseDetectionValue = 500,
  currency,
  isAnnual,
  onAnnualToggle
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const selectedProductDetails = products.filter(p => selectedProducts.includes(p.id));

  const getTierBreakdown = (product: ProductConfig) => {
    switch (product.pricingType) {
      case 'mtu':
        const mtuValue = product.id === 'marketing' ? marketingMtuValue : productMtuValue;
        return getMTUTierBreakdown(mtuValue, currency, isAnnual);
      case 'seat':
        return getSeatTierBreakdown(seatValue, currency, isAnnual);
      case 'arr':
        return getARRTierBreakdown(arrValue, currency, isAnnual);
      default:
        return [];
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6 shadow-lg max-h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
      
      <BillingToggle isAnnual={isAnnual} onToggle={onAnnualToggle} />
      
      {selectedProducts.length === 0 ? (
        <p className="text-gray-500 text-sm">Select products to see pricing</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {products.filter(product=>selectedProducts.includes(product.id)).map(product => {
              const monthlyPrice = calculatePrice(product);
              const displayPrice = isAnnual ? monthlyPrice * 12 : monthlyPrice;
              return (
                <div key={product.id} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900 flex items-center">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.pricingType === 'mtu' && product.id === 'marketing' && `${(marketingMtuValue / 1000).toFixed(0)}K MTUs`}
                        {product.pricingType === 'mtu' && product.id === 'product' && `${(productMtuValue / 1000).toFixed(0)}K MTUs`}
                        {product.pricingType === 'seat' && `${seatValue} seats`}
                        {product.pricingType === 'arr' && `${formatPrice(arrValue, currency)} ARR`}
                        {product.pricingType === 'free' && 'Included'}
                      </div>
                      {/* Abuse Detection summary as a sub-item for Marketing Intelligence */}
                      {product.id === "marketing" && abuseDetectionEnabled && (
                        <div className="ml-3 mt-1 p-2 border-l-4 border-blue-400 bg-blue-50 rounded">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-900 font-semibold">Abuse Detection</span>
                            <span className="text-xs text-gray-700">{abuseDetectionValue.toLocaleString()} detections/{isAnnual ? 'year' : 'mo'}</span>
                          </div>
                          <div className="text-xs text-gray-700">
                            ${isAnnual 
                              ? ((abuseDetectionValue <= 500 ? 25 : (25 + ((abuseDetectionValue - 500) * 0.02))) * 12).toFixed(2)
                              : (abuseDetectionValue <= 500 ? 25 : (25 + ((abuseDetectionValue - 500) * 0.02)).toFixed(2))
                            }/{isAnnual ? 'year' : 'mo'} included in price
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="font-medium text-gray-900">
                      {displayPrice > 0 ? formatPrice(displayPrice, currency) : 'FREE'}
                    </div>
                  </div>
                  {/* Tier breakdown */}
                  {showDetails && displayPrice > 0 && (
                    <div className="mt-2 text-xs text-gray-600">
                      {getTierBreakdown(product).map((tier, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{tier.tier}</span>
                          <span>{formatPrice(tier.subtotal, currency)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedProductDetails.some(p => calculatePrice(p) > 0) && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full text-sm text-blue-600 hover:text-blue-800 mb-4"
            >
              {showDetails ? 'Hide Details' : 'Show Tier Breakdown'}
            </button>
          )}

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Total {isAnnual ? 'Annual' : 'Monthly'}
              </span>
              <span className="text-xl font-bold text-blue-600">
                {isEnterprise ? 'Contact Sales' : formatPrice(isAnnual ? totalPrice * 12 : totalPrice, currency)}
              </span>
            </div>
            {isAnnual && totalPrice > 0 && !isEnterprise && (
              <div className="text-xs text-green-600 text-right">
                Save {formatPrice(totalPrice * 12 * 0.2, currency)} annually
              </div>
            )}
          </div>

          <PricingActions isEnterprise={isEnterprise} />

          {isEnterprise && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                Your configuration exceeds our standard tiers. Contact our sales team for enterprise pricing.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
