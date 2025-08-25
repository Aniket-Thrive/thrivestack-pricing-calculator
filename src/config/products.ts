
import { ProductConfig } from '../types/ProductConfig';

export const products: ProductConfig[] = [
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
      '**Growth Leaks and Drivers** – Identify and fix conversion bottlenecks in your marketing funnel',
      '**Abuse Detection (Optional Add-On)** – Flags suspicious signups (e.g., disposable emails, unusual behavior) to prevent fake accounts and maintain growth quality.'
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
      '**Product Activation Journeys** – Track visitor-to-user conversions and remove onboarding friction',
      '**Activation Metrics** – Measure post-signup engagement milestones and time-to-value optimization',
      '**Feature Usage & Adoption** – Identify most-used features, engagement intensity, and underutilized areas',
      '**Drop-Off & Retention Analysis** – Detect bottlenecks in product adoption and improve user retention',
      '**Trial vs. Paid Behavior** – Compare engagement between free users and converted paying customers',
      '**Cohort-Based Engagement** – Segment users based on behavior patterns to drive product growth',
      '**Growth Leaks and Drivers** – Identify drop-off points and friction in your product experience'
    ]
  },
  {
    id: 'sales',
    name: 'Account Intelligence',
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
      '**Growth Leaks and Drivers** – Spot sales process inefficiencies and conversion roadblocks'
    ]
  },
  {
    id: 'success',
    name: 'Churn and Expansion Intelligence',
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
      '**Growth Leaks and Drivers** – Identify churn risks and retention gaps before they impact revenue'
    ]
  },
  {
    id: 'revenue',
    name: 'Revenue Intelligence',
    tag: 'For RevOps and P&L Leaders',
    description: 'Monetization & Growth Intelligence',
    pricingType: 'arr',
    features: [
      '**Revenue Performance Overview** – Track MRR, trial-to-paid transitions, and churn trends across cohorts',
      '**Subscription Analytics** – Measure pricing efficiency, customer lifetime value, and renewal rates',
      '**Revenue Attribution Mapping** – Link acquisition sources and product engagement to monetization impact',
      '**Expansion Revenue Analysis** – Identify high-growth accounts for targeted upsell opportunities',
      '**Growth Leaks and Drivers** – Uncover revenue optimization opportunities across the entire customer lifecycle'
    ]
  }
];
