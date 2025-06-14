
import React from 'react';
import { Check } from 'lucide-react';

interface ProductFeaturesProps {
  features: string[];
}

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  return (
    <div className="space-y-2">
      {features.map((feature, index) => {
        // Replace the specific text if it matches
        const displayFeature = feature === "Signup Funnel Optimization – Track visitor-to-user conversions and remove onboarding friction"
          ? "Product Activation Journeys - Track visitor-to-user conversions and remove onboarding friction"
          : feature;
        
        return (
          <div key={index} className="flex items-start space-x-2">
            <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">{displayFeature}</span>
          </div>
        );
      })}
    </div>
  );
};
