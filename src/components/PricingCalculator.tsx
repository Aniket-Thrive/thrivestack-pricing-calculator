
import React from 'react';
import { ProductCard } from './ProductCard';
import { PricingSummary } from './PricingSummary';
import { CurrencySelector } from './CurrencySelector';
import { GrowthIntelligenceAnimation } from './GrowthIntelligenceAnimation';
import { products } from '../config/products';
import { useProductSelection } from '../hooks/useProductSelection';
import { usePricingState } from '../hooks/usePricingState';
import { usePriceCalculations } from '../hooks/usePriceCalculations';

// Re-export ProductConfig for backward compatibility
export type { ProductConfig } from '../types/ProductConfig';

export const PricingCalculator: React.FC = () => {
  const { selectedProducts, handleProductToggle } = useProductSelection();
  const {
    marketingMtuValue,
    setMarketingMtuValue,
    productMtuValue,
    setProductMtuValue,
    seatValue,
    setSeatValue,
    arrValue,
    setArrValue,
    abuseDetectionEnabled,
    setAbuseDetectionEnabled,
    abuseDetectionValue,
    setAbuseDetectionValue,
    currency,
    setCurrency,
    isAnnual,
    setIsAnnual
  } = usePricingState();

  const { calculateProductPrice, isEnterprise } = usePriceCalculations({
    selectedProducts,
    marketingMtuValue,
    productMtuValue,
    seatValue,
    arrValue,
    abuseDetectionEnabled,
    abuseDetectionValue,
    currency,
    isAnnual
  });

  const totalPrice = products.reduce((sum, product) => sum + calculateProductPrice(product), 0);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Growth Intelligence That Scales With You
        </h1>
        <p className="text-lg text-gray-600">
          Measure growth, identify your biggest drivers, and fix revenue leaks—with flexible plans designed to evolve with your business.
        </p>
      </div>

      <GrowthIntelligenceAnimation />

      <div className="flex justify-center mb-6">
        <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProducts.has(product.id)}
              onToggle={() => handleProductToggle(product.id)}
              price={calculateProductPrice(product)}
              marketingMtuValue={marketingMtuValue}
              productMtuValue={productMtuValue}
              seatValue={seatValue}
              arrValue={arrValue}
              abuseDetectionEnabled={product.id === "marketing" ? abuseDetectionEnabled : false}
              onAbuseDetectionEnabledChange={product.id === "marketing" ? setAbuseDetectionEnabled : undefined}
              abuseDetectionValue={product.id === "marketing" ? abuseDetectionValue : undefined}
              onAbuseDetectionChange={product.id === "marketing" ? setAbuseDetectionValue : undefined}
              onMarketingMtuChange={setMarketingMtuValue}
              onProductMtuChange={setProductMtuValue}
              onSeatChange={setSeatValue}
              onArrChange={setArrValue}
              currency={currency}
              isAnnual={isAnnual}
              disabled={product.dependencies ? !product.dependencies.every(dep => selectedProducts.has(dep)) : false}
            />
          ))}
          
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Prices shown are estimates. Final pricing may vary based on actual consumption.</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <PricingSummary
            selectedProducts={Array.from(selectedProducts)}
            products={products}
            calculatePrice={calculateProductPrice}
            totalPrice={totalPrice}
            isEnterprise={isEnterprise}
            marketingMtuValue={marketingMtuValue}
            productMtuValue={productMtuValue}
            seatValue={seatValue}
            arrValue={arrValue}
            abuseDetectionEnabled={abuseDetectionEnabled}
            abuseDetectionValue={abuseDetectionValue}
            currency={currency}
            isAnnual={isAnnual}
            onAnnualToggle={setIsAnnual}
          />
        </div>
      </div>
    </div>
  );
};
