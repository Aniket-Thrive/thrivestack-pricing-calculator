
import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { PricingSummary } from './PricingSummary';
import { calculateMTUPrice, calculateSeatPrice, calculateARRPrice } from '../utils/pricingEngine';

export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricingType: 'mtu' | 'seat' | 'arr' | 'free';
  dependencies?: string[];
  autoAdd?: boolean;
}

const products: ProductConfig[] = [
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Optimizing Acquisition & Awareness',
    pricingType: 'mtu',
    features: [
      'Dashboard Overview – Get a high-level snapshot of acquisition trends and campaign effectiveness',
      'Visitor Analytics – Track new vs. returning visitors, session durations, and high-intent behaviors',
      'Traffic Attribution – Identify conversion-driving sources through UTM tracking and direct visits',
      'Bounce Rate & Engagement – Measure site interaction levels and optimize for better retention',
      'Campaign Performance – Analyze campaign efficiency, customer touchpoints, and time to conversion',
      'Content Effectiveness – Evaluate visitor engagement with landing pages, white papers, and lead magnets',
      'Audience Segmentation – Cluster visitors into behavioral cohorts for targeted marketing strategies'
    ]
  },
  {
    id: 'product',
    name: 'Product Management',
    description: 'Driving Activation & Adoption',
    pricingType: 'mtu',
    features: [
      'Product Analytics Overview – A comprehensive view of user journeys, feature adoption, and engagement',
      'Signup Funnel Optimization – Track visitor-to-user conversions and remove onboarding friction',
      'Activation Metrics – Measure post-signup engagement milestones and time-to-value optimization',
      'Feature Usage & Adoption – Identify most-used features, engagement intensity, and underutilized areas',
      'Drop-Off & Retention Analysis – Detect bottlenecks in product adoption and improve user retention',
      'Trial vs. Paid Behavior – Compare engagement between free users and converted paying customers',
      'Cohort-Based Engagement – Segment users based on behavior patterns to drive product growth'
    ]
  },
  {
    id: 'sales',
    name: 'Accounts & Sales',
    description: 'Converting Leads & Accelerating Deals',
    pricingType: 'seat',
    dependencies: ['marketing', 'product'],
    features: [
      'Sales Pipeline Overview – Visualize lead flow, trial status, and account conversion potential',
      'Account-Based Lead Scoring – Prioritize leads using engagement, intent signals, and marketing interactions',
      'Sales-Assist Insights – Identify visitors likely to convert based on depth of product usage',
      'Trial & POC Performance – Measure transition rates from free trials to paid conversions',
      'Sales Attribution Analysis – Understand the impact of marketing-driven vs. direct sales efforts',
      'Expansion & Upsell Signals – Surface upsell and cross-sell opportunities using product usage data'
    ]
  },
  {
    id: 'success',
    name: 'Customer Success',
    description: 'Retention & Expansion',
    pricingType: 'free',
    autoAdd: true,
    dependencies: ['sales'],
    features: [
      'Retention Health Dashboard – Monitor engagement trends and flag accounts at risk of churn',
      'Account Health Scoring – Predict renewal likelihood based on user activity and adoption rates',
      'Renewal & Expansion Tracking – Assess contract renewal trends and proactive upsell opportunities',
      'User Engagement Metrics – Track product usage across key retention periods to optimize stickiness',
      'Proactive Customer Interactions – Automate success recommendations and personalized outreach strategies'
    ]
  },
  {
    id: 'revenue',
    name: 'Revenue',
    description: 'Monetization & Growth Intelligence',
    pricingType: 'arr',
    features: [
      'Revenue Performance Overview – Track MRR, trial-to-paid transitions, and churn trends across cohorts',
      'Subscription Analytics – Measure pricing efficiency, customer lifetime value, and renewal rates',
      'Revenue Attribution Mapping – Link acquisition sources and product engagement to monetization impact',
      'Expansion Revenue Analysis – Identify high-growth accounts for targeted upsell opportunities'
    ]
  }
];

export const PricingCalculator: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [mtuValue, setMtuValue] = useState(1000);
  const [seatValue, setSeatValue] = useState(5);
  const [arrValue, setArrValue] = useState(100000);

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
    
    switch (product.pricingType) {
      case 'mtu':
        return calculateMTUPrice(mtuValue);
      case 'seat':
        return calculateSeatPrice(seatValue);
      case 'arr':
        return calculateARRPrice(arrValue);
      case 'free':
        return 0;
      default:
        return 0;
    }
  };

  const totalPrice = products.reduce((sum, product) => sum + calculateProductPrice(product), 0);
  
  // Check if enterprise pricing applies
  const isEnterprise = mtuValue > 1000000 || arrValue > 20000000;

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProducts.has(product.id)}
              onToggle={() => handleProductToggle(product.id)}
              price={calculateProductPrice(product)}
              mtuValue={mtuValue}
              seatValue={seatValue}
              arrValue={arrValue}
              onMtuChange={setMtuValue}
              onSeatChange={setSeatValue}
              onArrChange={setArrValue}
              disabled={product.dependencies ? !product.dependencies.every(dep => selectedProducts.has(dep)) : false}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <PricingSummary
            selectedProducts={Array.from(selectedProducts)}
            products={products}
            calculatePrice={calculateProductPrice}
            totalPrice={totalPrice}
            isEnterprise={isEnterprise}
            mtuValue={mtuValue}
            seatValue={seatValue}
            arrValue={arrValue}
          />
        </div>
      </div>
    </div>
  );
};
