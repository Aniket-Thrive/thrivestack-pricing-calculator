
// Progressive taxation pricing engine for ThriveStack

export interface PricingTier {
  min: number;
  max: number;
  rate: number;
  amount?: number;
}

export interface TierBreakdown {
  tier: string;
  quantity: number;
  rate: number;
  subtotal: number;
}

export const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.92,
  INR: 84.5
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  INR: '₹'
};

export type Currency = keyof typeof CURRENCY_RATES;

export const calculateMTUPrice = (mtus: number, currency: Currency = 'USD'): number => {
  if (mtus <= 0) return 0;
  
  const tiers = [
    { min: 1, max: 2000, rate: 49 },
    { min: 2001, max: 3000, rate: 44.10 },
    { min: 3001, max: 4000, rate: 41.65 },
    { min: 4001, max: 5000, rate: 39.20 },
    { min: 5001, max: 1000000, rate: 34.30 }
  ];

  let totalCost = 0;
  let remainingMTUs = mtus;

  for (const tier of tiers) {
    if (remainingMTUs <= 0) break;
    
    const tierSize = Math.min(remainingMTUs, tier.max - tier.min + 1);
    const tierMTUs = Math.min(tierSize, tier.max >= mtus ? mtus - tier.min + 1 : tier.max - tier.min + 1);
    
    if (tierMTUs > 0) {
      totalCost += (tierMTUs / 1000) * tier.rate;
      remainingMTUs -= tierMTUs;
    }
  }

  const convertedPrice = totalCost * CURRENCY_RATES[currency];
  return Math.round(convertedPrice * 100) / 100;
};

export const getMTUTierBreakdown = (mtus: number, currency: Currency = 'USD', isAnnual: boolean = false): TierBreakdown[] => {
  if (mtus <= 0) return [];
  
  const tiers = [
    { min: 1, max: 2000, rate: 49 },
    { min: 2001, max: 3000, rate: 44.10 },
    { min: 3001, max: 4000, rate: 41.65 },
    { min: 4001, max: 5000, rate: 39.20 },
    { min: 5001, max: 1000000, rate: 34.30 }
  ];

  const breakdown: TierBreakdown[] = [];
  let remainingMTUs = mtus;

  for (const tier of tiers) {
    if (remainingMTUs <= 0) break;
    
    const tierSize = Math.min(remainingMTUs, tier.max - tier.min + 1);
    const tierMTUs = Math.min(tierSize, tier.max >= mtus ? mtus - tier.min + 1 : tier.max - tier.min + 1);
    
    if (tierMTUs > 0) {
      let displayRate = tier.rate * CURRENCY_RATES[currency];
      let subtotal = (tierMTUs / 1000) * displayRate;
      
      if (isAnnual) {
        displayRate = displayRate * 0.8 * 12; // Apply annual discount and multiply by 12
        subtotal = subtotal * 0.8 * 12;
      }
      
      breakdown.push({
        tier: `${formatNumber(tier.min)}-${formatNumber(Math.min(tier.max, mtus))} MTUs (${formatPrice(displayRate, currency)}/1K)`,
        quantity: tierMTUs,
        rate: displayRate,
        subtotal: Math.round(subtotal * 100) / 100
      });
      remainingMTUs -= tierMTUs;
    }
  }

  return breakdown;
};

export const calculateSeatPrice = (seats: number, currency: Currency = 'USD'): number => {
  const roundedSeats = Math.ceil(seats * 10) / 10; // Round up to nearest decimal
  if (roundedSeats <= 2) return 0; // First 2 seats are free
  
  const paidSeats = roundedSeats - 2;
  const tiers = [
    { min: 1, max: 8, rate: 35 },    // Seats 3-10 (8 paid seats)
    { min: 9, max: 48, rate: 28 },   // Seats 11-50 (40 paid seats)
    { min: 49, max: 998, rate: 25 }  // Seats 51+ (unlimited paid seats)
  ];

  let totalCost = 0;
  let remainingSeats = paidSeats;

  for (const tier of tiers) {
    if (remainingSeats <= 0) break;
    
    const tierSeats = Math.min(remainingSeats, tier.max - tier.min + 1);
    totalCost += tierSeats * tier.rate;
    remainingSeats -= tierSeats;
  }

  const convertedPrice = totalCost * CURRENCY_RATES[currency];
  return Math.round(convertedPrice * 100) / 100;
};

export const getSeatTierBreakdown = (seats: number, currency: Currency = 'USD', isAnnual: boolean = false): TierBreakdown[] => {
  const roundedSeats = Math.ceil(seats * 10) / 10; // Round up to nearest decimal
  if (roundedSeats <= 2) return [];
  
  const paidSeats = roundedSeats - 2;
  const tiers = [
    { min: 1, max: 8, rate: 35, label: 'Seats 3-10' },
    { min: 9, max: 48, rate: 28, label: 'Seats 11-50' },
    { min: 49, max: 998, rate: 25, label: 'Seats 51+' }
  ];

  const breakdown: TierBreakdown[] = [];
  let remainingSeats = paidSeats;

  for (const tier of tiers) {
    if (remainingSeats <= 0) break;
    
    const tierSeats = Math.min(remainingSeats, tier.max - tier.min + 1);
    if (tierSeats > 0) {
      let displayRate = tier.rate * CURRENCY_RATES[currency];
      let subtotal = tierSeats * displayRate;
      
      if (isAnnual) {
        displayRate = displayRate * 0.8 * 12; // Apply annual discount and multiply by 12
        subtotal = subtotal * 0.8 * 12;
      }
      
      breakdown.push({
        tier: `${tier.label} (${formatPrice(displayRate, currency)}/seat)`,
        quantity: tierSeats,
        rate: displayRate,
        subtotal: Math.round(subtotal * 100) / 100
      });
      remainingSeats -= tierSeats;
    }
  }

  return breakdown;
};

export const calculateARRPrice = (arr: number, currency: Currency = 'USD'): number => {
  if (arr <= 1000000) return 0; // First $1M is free
  
  const tiers = [
    { min: 1000001, max: 5000000, rate: 0.0012 },   // $1-5M: 0.12%
    { min: 5000001, max: 10000000, rate: 0.001 },   // $5-10M: 0.10%
    { min: 10000001, max: 25000000, rate: 0.0008 }, // $10-25M: 0.08%
    { min: 25000001, max: 50000000, rate: 0.0006 }, // $25-50M: 0.06%
    { min: 50000001, max: 100000000, rate: 0.0005 } // $50-100M: 0.05%
  ];

  let totalCost = 0;
  let remainingARR = arr - 1000000; // Subtract the free tier

  for (const tier of tiers) {
    if (remainingARR <= 0) break;
    
    const tierMax = tier.max - tier.min + 1;
    const tierARR = Math.min(remainingARR, tierMax);
    
    if (tierARR > 0) {
      totalCost += tierARR * tier.rate;
      remainingARR -= tierARR;
    }
  }

  const convertedPrice = totalCost * CURRENCY_RATES[currency];
  return Math.round(convertedPrice * 100) / 100;
};

export const getARRTierBreakdown = (arr: number, currency: Currency = 'USD', isAnnual: boolean = false): TierBreakdown[] => {
  if (arr <= 1000000) return [];
  
  const tiers = [
    { min: 1000001, max: 5000000, rate: 0.0012, label: '$1M-$5M ARR' },
    { min: 5000001, max: 10000000, rate: 0.001, label: '$5M-$10M ARR' },
    { min: 10000001, max: 25000000, rate: 0.0008, label: '$10M-$25M ARR' },
    { min: 25000001, max: 50000000, rate: 0.0006, label: '$25M-$50M ARR' },
    { min: 50000001, max: 100000000, rate: 0.0005, label: '$50M-$100M ARR' }
  ];

  const breakdown: TierBreakdown[] = [];
  let remainingARR = arr - 1000000;

  for (const tier of tiers) {
    if (remainingARR <= 0) break;
    
    const tierMax = tier.max - tier.min + 1;
    const tierARR = Math.min(remainingARR, tierMax);
    
    if (tierARR > 0) {
      let displayRate = tier.rate * 100; // Convert to percentage
      let subtotal = tierARR * tier.rate * CURRENCY_RATES[currency];
      
      if (isAnnual) {
        subtotal = subtotal * 0.8 * 12; // Apply annual discount and multiply by 12
      }
      
      breakdown.push({
        tier: `${tier.label} (${displayRate}%)`,
        quantity: tierARR,
        rate: displayRate,
        subtotal: Math.round(subtotal * 100) / 100
      });
      remainingARR -= tierARR;
    }
  }

  return breakdown;
};

export const formatPrice = (price: number, currency: Currency = 'USD'): string => {
  const symbol = CURRENCY_SYMBOLS[currency];
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : currency === 'EUR' ? 'de-DE' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
};
