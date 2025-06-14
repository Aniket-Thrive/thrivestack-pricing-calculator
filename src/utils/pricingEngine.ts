
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

export const getMTUTierBreakdown = (mtus: number, currency: Currency = 'USD'): TierBreakdown[] => {
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
      const subtotal = (tierMTUs / 1000) * tier.rate * CURRENCY_RATES[currency];
      breakdown.push({
        tier: `${formatNumber(tier.min)}-${formatNumber(Math.min(tier.max, mtus))} MTUs (${formatPrice(tier.rate * CURRENCY_RATES[currency], currency)}/1K)`,
        quantity: tierMTUs,
        rate: tier.rate * CURRENCY_RATES[currency],
        subtotal: Math.round(subtotal * 100) / 100
      });
      remainingMTUs -= tierMTUs;
    }
  }

  return breakdown;
};

export const calculateSeatPrice = (seats: number, currency: Currency = 'USD'): number => {
  if (seats <= 2) return 0; // First 2 seats are free
  
  const paidSeats = seats - 2;
  const tiers = [
    { min: 1, max: 8, rate: 8 },    // Seats 3-10 (8 paid seats)
    { min: 9, max: 23, rate: 7 },   // Seats 11-25 (15 paid seats)
    { min: 24, max: 98, rate: 6 }   // Seats 26-100 (75 paid seats)
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

export const getSeatTierBreakdown = (seats: number, currency: Currency = 'USD'): TierBreakdown[] => {
  if (seats <= 2) return [];
  
  const paidSeats = seats - 2;
  const tiers = [
    { min: 1, max: 8, rate: 8, label: 'Seats 3-10' },
    { min: 9, max: 23, rate: 7, label: 'Seats 11-25' },
    { min: 24, max: 98, rate: 6, label: 'Seats 26-100' }
  ];

  const breakdown: TierBreakdown[] = [];
  let remainingSeats = paidSeats;

  for (const tier of tiers) {
    if (remainingSeats <= 0) break;
    
    const tierSeats = Math.min(remainingSeats, tier.max - tier.min + 1);
    if (tierSeats > 0) {
      const subtotal = tierSeats * tier.rate * CURRENCY_RATES[currency];
      breakdown.push({
        tier: `${tier.label} (${formatPrice(tier.rate * CURRENCY_RATES[currency], currency)}/seat)`,
        quantity: tierSeats,
        rate: tier.rate * CURRENCY_RATES[currency],
        subtotal: Math.round(subtotal * 100) / 100
      });
      remainingSeats -= tierSeats;
    }
  }

  return breakdown;
};

export const calculateARRPrice = (arr: number, currency: Currency = 'USD'): number => {
  if (arr <= 100000) return 0; // First $100K is free
  
  const tiers = [
    { min: 100001, max: 1000000, rate: 0.003 },    // 0.3%
    { min: 1000001, max: 5000000, rate: 0.0025 },  // 0.25%
    { min: 5000001, max: 20000000, rate: 0.002 }   // 0.2%
  ];

  let totalCost = 0;
  let remainingARR = arr - 100000; // Subtract the free tier

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

export const getARRTierBreakdown = (arr: number, currency: Currency = 'USD'): TierBreakdown[] => {
  if (arr <= 100000) return [];
  
  const tiers = [
    { min: 100001, max: 1000000, rate: 0.003, label: '$100K-$1M ARR' },
    { min: 1000001, max: 5000000, rate: 0.0025, label: '$1M-$5M ARR' },
    { min: 5000001, max: 20000000, rate: 0.002, label: '$5M-$20M ARR' }
  ];

  const breakdown: TierBreakdown[] = [];
  let remainingARR = arr - 100000;

  for (const tier of tiers) {
    if (remainingARR <= 0) break;
    
    const tierMax = tier.max - tier.min + 1;
    const tierARR = Math.min(remainingARR, tierMax);
    
    if (tierARR > 0) {
      const subtotal = tierARR * tier.rate * CURRENCY_RATES[currency];
      breakdown.push({
        tier: `${tier.label} (${tier.rate * 100}%)`,
        quantity: tierARR,
        rate: tier.rate * 100, // Convert to percentage
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
