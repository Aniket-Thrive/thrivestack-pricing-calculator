
import React from 'react';
import { FeatureItem } from './FeatureItem';

interface ProductFeaturesProps {
  features: string[];
}

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  return (
    <div className="space-y-2">
      {features.map((feature, index) => (
        <FeatureItem key={index} feature={feature} />
      ))}
    </div>
  );
};
