
import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { PricingSummary } from './PricingSummary';
import { CurrencySelector } from './CurrencySelector';
import { calculateMTUPrice, calculateSeatPrice, calculateARRPrice, Currency } from '../utils/pricingEngine';

export interface ProductConfig {
  id: string;
  name: string;
  tag?: string;
  description: string;
  features: string[];
  pricingType: 'mtu' | 'seat' | 'arr' | 'free';
  dependencies?: string[];
  autoAdd?: boolean;
}

const products: ProductConfig[] = [
  {
    id: 'marketing',
    name: 'Marketing Intelligence',
    tag: 'For Growth Marketers',
    description: 'Optimizing Acquisition & Awareness',
    pricingType: 'mtu',
    features: [
      '**Dashboard Overview** – Get a high-level snapshot of acquisition trends and campaign effectiveness',
      '**Visitor Analytics** – Track new vs. returning visitors, session durations, and high-intent behaviors',
      '**Traffic Attribution** – Identify conversion-driving sources through UTM tracking and direct visits',
      '**Bounce Rate & Engagement** – Measure site interaction levels and optimize for better retention',
      '**Campaign Performance** – Analyze campaign efficiency, customer touchpoints, and time to conversion',
      '**Content Effectiveness** – Evaluate visitor engagement with landing pages, white papers, and lead magnets',
      '**Audience Segmentation** – Cluster visitors into behavioral cohorts for targeted marketing strategies',
      '**Growth Leaks** – Identify and fix conversion bottlenecks in your marketing funnel'
    ]
  },
  {
    id: 'product',
    name: 'Product Intelligence',
    tag: 'For Product and Engineering Teams',
    description: 'Driving Activation & Adoption',
    pricingType: 'mtu',
    features: [
      '**Product Analytics Overview** – A comprehensive view of user journeys, feature adoption, and engagement',
      '**Signup Funnel Optimization** – Track visitor-to-user conversions and remove onboarding friction',
      '**Activation Metrics** – Measure post-signup engagement milestones and time-to-value optimization',
      '**Feature Usage & Adoption** – Identify most-used features, engagement intensity, and underutilized areas',
      '**Drop-Off & Retention Analysis** – Detect bottlenecks in product adoption and improve user retention',
      '**Trial vs. Paid Behavior** – Compare engagement between free users and converted paying customers',
      '**Cohort-Based Engagement** – Segment users based on behavior patterns to drive product growth',
      '**Growth Leaks** – Identify drop-off points and friction in your product experience'
    ]
  },
  {
    id: 'sales',
    name: 'Account & Sales Management',
    tag: 'For Sales',
    description: 'Converting Leads & Accelerating Deals',
    pricingType: 'seat',
    dependencies: ['marketing', 'product'],
    features: [
      '**Sales Pipeline Overview** – Visualize lead flow, trial status, and account conversion potential',
      '**Account-Based Lead Scoring** – Prioritize leads using engagement, intent signals, and marketing interactions',
      '**Sales-Assist Insights** – Identify visitors likely to convert based on depth of product usage',
      '**Trial & POC Performance** – Measure transition rates from free trials to paid conversions',
      '**Sales Attribution Analysis** – Understand the impact of marketing-driven vs. direct sales efforts',
      '**Expansion & Upsell Signals** – Surface upsell and cross-sell opportunities using product usage data',
      '**Growth Leaks** – Spot sales process inefficiencies and conversion roadblocks'
    ]
  },
  {
    id: 'success',
    name: 'Customer Success',
    tag: 'For CSMs',
    description: 'Retention & Expansion',
    pricingType: 'free',
    autoAdd: true,
    dependencies: ['sales'],
    features: [
      '**Retention Health Dashboard** – Monitor engagement trends and flag accounts at risk of churn',
      '**Account Health Scoring** – Predict renewal likelihood based on user activity and adoption rates',
      '**Renewal & Expansion Tracking** – Assess contract renewal trends and proactive upsell opportunities',
      '**User Engagement Metrics** – Track product usage across key retention periods to optimize stickiness',
      '**Proactive Customer Interactions** – Automate success recommendations and personalized outreach strategies',
      '**Growth Leaks** – Identify churn risks and retention gaps before they impact revenue'
    ]
  },
  {
    id: 'revenue',
    name: 'Revenue Intelligence',
    tag: 'For RevOps, Sales Leaders',
    description: 'Monetization & Growth Intelligence',
    pricingType: 'arr',
    features: [
      '**Revenue Performance Overview** – Track MRR, trial-to-paid transitions, and churn trends across cohorts',
      '**Subscription Analytics** – Measure pricing efficiency, customer lifetime value, and renewal rates',
      '**Revenue Attribution Mapping** – Link acquisition sources and product engagement to monetization impact',
      '**Expansion Revenue Analysis** – Identify high-growth accounts for targeted upsell opportunities',
      '**Growth Leaks** – Uncover revenue optimization opportunities across the entire customer lifecycle'
    ]
  }
];

export const PricingCalculator: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [marketingMtuValue, setMarketingMtuValue] = useState(1000);
  const [productMtuValue, setProductMtuValue] = useState(1000);
  const [seatValue, setSeatValue] = useState(5);
  const [arrValue, setArrValue] = useState(100000);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isAnnual, setIsAnnual] = useState(false);

  // Handle product selection and dependencies
  const handleProductToggle = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      // Remove dependent products
      products.forEach(product => {
        if (product.dependencies?.includes(productId)) {
          newSelected.delete(product.id);
        }
      });
    } else {
      newSelected.add(productId);
    }
    
    setSelectedProducts(newSelected);
  };

  // Auto-add dependent products
  useEffect(() => {
    const newSelected = new Set(selectedProducts);
    let changed = false;

    products.forEach(product => {
      if (product.autoAdd && product.dependencies) {
        const dependenciesMet = product.dependencies.every(dep => newSelected.has(dep));
        if (dependenciesMet && !newSelected.has(product.id)) {
          newSelected.add(product.id);
          changed = true;
        } else if (!dependenciesMet && newSelected.has(product.id)) {
          newSelected.delete(product.id);
          changed = true;
        }
      }
    });

    if (changed) {
      setSelectedProducts(newSelected);
    }
  }, [selectedProducts]);

  // Calculate prices
  const calculateProductPrice = (product: ProductConfig): number => {
    if (!selectedProducts.has(product.id)) return 0;
    
    let basePrice = 0;
    switch (product.pricingType) {
      case 'mtu':
        if (product.id === 'marketing') {
          basePrice = calculateMTUPrice(marketingMtuValue, currency);
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
      case 'free':
        return 0;
      default:
        return 0;
    }
    
    // Apply annual discount
    return isAnnual ? basePrice * 0.8 : basePrice;
  };

  const totalPrice = products.reduce((sum, product) => sum + calculateProductPrice(product), 0);
  
  // Check if enterprise pricing applies
  const isEnterprise = marketingMtuValue > 1000000 || productMtuValue > 1000000 || arrValue > 20000000;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ThriveStack Pricing Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Select your modules and estimate your monthly costs
        </p>
      </div>

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
            currency={currency}
            isAnnual={isAnnual}
            onAnnualToggle={setIsAnnual}
          />
        </div>
      </div>
    </div>
  );
};
