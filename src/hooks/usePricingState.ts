
import { useState } from 'react';
import { Currency } from '../utils/pricingEngine';

export const usePricingState = () => {
  const [marketingMtuValue, setMarketingMtuValue] = useState(2000);
  const [productMtuValue, setProductMtuValue] = useState(2000);
  const [seatValue, setSeatValue] = useState(5);
  const [arrValue, setArrValue] = useState(100000);
  const [abuseDetectionEnabled, setAbuseDetectionEnabled] = useState(false);
  const [abuseDetectionValue, setAbuseDetectionValue] = useState(500);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isAnnual, setIsAnnual] = useState(false);

  return {
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
  };
};
