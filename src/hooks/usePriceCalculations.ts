
import { ProductConfig } from '../types/ProductConfig';
import { calculateMTUPrice, calculateSeatPrice, calculateARRPrice, Currency } from '../utils/pricingEngine';

interface UsePriceCalculationsProps {
  selectedProducts: Set<string>;
  marketingMtuValue: number;
  productMtuValue: number;
  seatValue: number;
  arrValue: number;
  abuseDetectionEnabled: boolean;
  abuseDetectionValue: number;
  currency: Currency;
  isAnnual: boolean;
}

export const usePriceCalculations = ({
  selectedProducts,
  marketingMtuValue,
  productMtuValue,
  seatValue,
  arrValue,
  abuseDetectionEnabled,
  abuseDetectionValue,
  currency,
  isAnnual
}: UsePriceCalculationsProps) => {
  const calculateProductPrice = (product: ProductConfig): number => {
    if (!selectedProducts.has(product.id)) return 0;
    
    let basePrice = 0;
    switch (product.pricingType) {
      case 'mtu':
        if (product.id === 'marketing') {
          basePrice = calculateMTUPrice(marketingMtuValue, currency);
          // Add abuse detection price if enabled:
          if (abuseDetectionEnabled) {
            const included = 500;
            let abusePrice = 25;
            if (abuseDetectionValue > included) abusePrice += (abuseDetectionValue - included) * 0.02;
            basePrice += abusePrice;
          }
        } else if (product.id === 'product') {
          basePrice = calculateMTUPrice(productMtuValue, currency);
        }
        break;
      case 'seat':
        basePrice = calculateSeatPrice(seatValue, currency);
        break;
      case 'arr':
        basePrice = calculateARRPrice(arrValue, currency);
        break;
      case 'abuse':
        return 0;
      case 'free':
        return 0;
      default:
        return 0;
    }
    
    return isAnnual ? basePrice * 0.8 : basePrice;
  };

  const isEnterprise = marketingMtuValue > 1000000 || productMtuValue > 1000000 || arrValue > 100000000;

  return {
    calculateProductPrice,
    isEnterprise
  };
};
