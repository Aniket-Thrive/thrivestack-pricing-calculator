
import React from 'react';
import { ProductConfig } from './PricingCalculator';
import { formatPrice } from '../utils/pricingEngine';

interface PricingSummaryProps {
  selectedProducts: string[];
  products: ProductConfig[];
  calculatePrice: (product: ProductConfig) => number;
  totalPrice: number;
  isEnterprise: boolean;
  mtuValue: number;
  seatValue: number;
  arrValue: number;
}

export const PricingSummary: React.FC<PricingSummaryProps> = ({
  selectedProducts,
  products,
  calculatePrice,
  totalPrice,
  isEnterprise,
  mtuValue,
  seatValue,
  arrValue
}) => {
  const selectedProductDetails = products.filter(p => selectedProducts.includes(p.id));

  const handleStartTrial = () => {
    window.open('https://app.thrivestack.ai/', '_blank');
  };

  const handleTalkToSales = () => {
    window.open('https://app.thrivestack.ai/', '_blank');
  };

  const handleExportEstimate = () => {
    const estimate = {
      products: selectedProductDetails.map(p => ({
        name: p.name,
        price: calculatePrice(p)
      })),
      configuration: {
        mtus: mtuValue,
        seats: seatValue,
        arr: arrValue
      },
      total: totalPrice,
      isEnterprise
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(estimate, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "thrivestack-estimate.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
      
      {selectedProducts.length === 0 ? (
        <p className="text-gray-500 text-sm">Select products to see pricing</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {selectedProductDetails.map(product => {
              const price = calculatePrice(product);
              return (
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {product.pricingType === 'mtu' && `${(mtuValue / 1000).toFixed(0)}K MTUs`}
                      {product.pricingType === 'seat' && `${seatValue} seats`}
                      {product.pricingType === 'arr' && `${formatPrice(arrValue)} ARR`}
                      {product.pricingType === 'free' && 'Included'}
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    {price > 0 ? formatPrice(price) : 'FREE'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Monthly</span>
              <span className="text-xl font-bold text-blue-600">
                {isEnterprise ? 'Contact Sales' : formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {isEnterprise ? (
              <button
                onClick={handleTalkToSales}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Talk to Sales
              </button>
            ) : (
              <button
                onClick={handleStartTrial}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start 14-Day Trial
              </button>
            )}
            
            <button
              onClick={handleExportEstimate}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Export Estimate
            </button>
          </div>

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
