
import React from "react";
import { Check } from "lucide-react";

// Extend FeatureItemProps to accept a parsing function for the feature display
interface FeatureItemProps {
  feature: string;
  parseFn?: (text: string) => React.ReactNode;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ feature, parseFn }) => {
  // Replace the specific text if it matches
  const displayFeature =
    feature ===
    "Signup Funnel Optimization – Track visitor-to-user conversions and remove onboarding friction"
      ? "Product Activation Journeys - Track visitor-to-user conversions and remove onboarding friction"
      : feature;

  return (
    <div className="flex items-start space-x-2">
      <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
      <span className="text-sm text-gray-600">
        {parseFn ? parseFn(displayFeature) : displayFeature}
      </span>
    </div>
  );
};
