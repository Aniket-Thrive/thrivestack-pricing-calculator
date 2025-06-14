
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ProductConfig } from './PricingCalculator';
import { formatPrice, formatNumber, Currency } from '../utils/pricingEngine';
import { CustomSlider } from './CustomSlider';
import { AbuseDetectionAddon } from './AbuseDetectionAddon';
import { LearnMoreModal } from './LearnMoreModal';

interface ProductSlidersProps {
  product: ProductConfig;
  isSelected: boolean;
  marketingMtuValue: number;
  productMtuValue: number;
  seatValue: number;
  arrValue: number;
  abuseDetectionEnabled?: boolean;
  onAbuseDetectionEnabledChange?: (enabled: boolean) => void;
  abuseDetectionValue?: number;
  onAbuseDetectionChange?: (value: number) => void;
  onMarketingMtuChange: (value: number) => void;
  onProductMtuChange: (value: number) => void;
  onSeatChange: (value: number) => void;
  onArrChange: (value: number) => void;
  currency: Currency;
}

export const ProductSliders: React.FC<ProductSlidersProps> = ({
  product,
  isSelected,
  marketingMtuValue,
  productMtuValue,
  seatValue,
  arrValue,
  abuseDetectionEnabled = false,
  onAbuseDetectionEnabledChange,
  abuseDetectionValue = 500,
  onAbuseDetectionChange,
  onMarketingMtuChange,
  onProductMtuChange,
  onSeatChange,
  onArrChange,
  currency
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'mtu' | 'mtv' | null>(null);

  const handleLearnMoreClick = (type: 'mtu' | 'mtv') => {
    setModalType(type);
    setModalOpen(true);
  };

  // Define modal content for both types
  const learnMoreContent = {
    mtv: {
      title: 'How Are Monthly Tracked Visitors (MTVs) Calculated?',
      description: (
        <>
          <p>
            <strong>Monthly Tracked Visitors (MTVs)</strong> represents the number of unique individuals who visit your website or digital property during a given month.
          </p>
          <ul className="mt-2 list-disc ml-6 text-gray-700">
            <li>
              Each visitor is counted once using device fingerprinting technology that creates a unique identifier, which remains consistent even in incognito mode or across different browsers on the same device.
            </li>
            <li>
              MTVs include anonymous visitors, prospects, and users before they have signed up.
            </li>
            <li>
              Bot or non-human traffic is automatically filtered out to ensure accurate reporting.
            </li>
          </ul>
          <p className="mt-2">
            This metric is ideal for tracking acquisition and the reach of your marketing campaigns.
          </p>
        </>
      ),
    },
    mtu: {
      title: 'How Are Monthly Tracked Users (MTUs) Calculated?',
      description: (
        <>
          <p>
            <strong>Monthly Tracked Users (MTUs)</strong> measures unique active product users identified by a unique user_id that gets assigned after they have signed up and are actively using your product in a given month.
          </p>
          <ul className="mt-2 list-disc ml-6 text-gray-700">
            <li>
              Each logged-in user with a unique user_id is counted only once per month, even if they log in from multiple devices or sessions.
            </li>
            <li>
              MTUs capture actual product engagement and adoption, helping you understand your active user base.
            </li>
            <li>
              Inactive, dormant, or churned users are excluded from the MTU count.
            </li>
          </ul>
          <p className="mt-2">
            Use this metric to manage feature adoption, retention, and true customer growth.
          </p>
        </>
      ),
    }
  };

  if (!isSelected || product.pricingType === 'free') return null;

  switch (product.pricingType) {
    case 'mtu':
      const currentMtuValue = product.id === 'marketing' ? marketingMtuValue : productMtuValue;
      const handleMtuChange = product.id === 'marketing' ? onMarketingMtuChange : onProductMtuChange;
      const label = product.id === 'marketing' ? 'Monthly Tracked Visitors' : 'Monthly Tracked Users';
      const learnMoreKind = product.id === 'marketing' ? 'mtv' : 'mtu';
      return (
        <div className="space-y-2">
          <CustomSlider
            label={label}
            value={currentMtuValue}
            onChange={handleMtuChange}
            min={1000}
            max={1000000}
            step={1000}
            formatValue={(v) => formatNumber(v)}
          />
          {/* Abuse Detection as an embedded add-on for marketing */}
          {product.id === "marketing" && (
            <AbuseDetectionAddon
              enabled={abuseDetectionEnabled}
              onEnabledChange={onAbuseDetectionEnabledChange || (() => {})}
              value={abuseDetectionValue}
              onChange={onAbuseDetectionChange || (() => {})}
            />
          )}
          <div className="flex items-center space-x-2 text-xs text-blue-600 mt-1">
            <ExternalLink size={12} />
            <button
              type="button"
              className="hover:underline focus:outline-none"
              onClick={() => handleLearnMoreClick(learnMoreKind)}
            >
              Learn more about how {product.id === 'marketing' ? 'MTVs' : 'MTUs'} are calculated
            </button>
          </div>
          <LearnMoreModal
            open={modalOpen && (!!modalType)}
            onOpenChange={setModalOpen}
            title={modalType ? learnMoreContent[modalType].title : ''}
            description={modalType ? learnMoreContent[modalType].description : ''}
          />
        </div>
      );
    case 'seat':
      return (
        <CustomSlider
          label="Number of Seats"
          value={seatValue}
          onChange={onSeatChange}
          min={1}
          max={100}
          step={1}
          formatValue={(v) => v.toString()}
        />
      );
    case 'arr':
      return (
        <CustomSlider
          label="Annual Recurring Revenue"
          value={arrValue}
          onChange={onArrChange}
          min={0}
          max={20000000}
          step={10000}
          formatValue={(v) => formatPrice(v, currency)}
        />
      );
    default:
      return null;
  }
};
