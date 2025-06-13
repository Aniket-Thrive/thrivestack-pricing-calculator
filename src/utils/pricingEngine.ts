
// Progressive taxation pricing engine for ThriveStack

export const calculateMTUPrice = (mtus: number): number => {
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

  return Math.round(totalCost * 100) / 100;
};

export const calculateSeatPrice = (seats: number): number => {
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

  return totalCost;
};

export const calculateARRPrice = (arr: number): number => {
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

  return Math.round(totalCost * 100) / 100;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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
