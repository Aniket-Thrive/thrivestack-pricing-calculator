
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ProductConfig } from './PricingCalculator';
import { formatPrice, formatNumber, Currency } from '../utils/pricingEngine';
import { CustomSlider } from './CustomSlider';
import { AbuseDetectionAddon } from './AbuseDetectionAddon';
import { LearnMoreModal } from './LearnMoreModal';
import { VisitorToUserAnimation } from './VisitorToUserAnimation';

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
      title: "How Are Monthly Tracked Visitors (MTVs) Calculated?",
      description: (
        <>
          {/* LEFT: All written explanation & headers - 30% darker theme */}
          <div className="w-full md:w-[30%] space-y-5 bg-gray-800 text-white p-8 rounded-l-lg">
            <p>
              <strong>Monthly Tracked Visitors (MTVs)</strong> represents the number of unique individuals who visit your website or digital property during a given month.
            </p>
            <ul className="mt-2 list-disc ml-7 text-gray-200 text-sm space-y-2">
              <li>
                Each visitor is counted once using device fingerprinting technology that combines device and browser IDs to create a unique <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">visitor_id</code>, which differs across browsers but remains consistent within the same browser across sessions and incognito mode.
              </li>
              <li>
                MTVs include anonymous visitors, prospects, and users before they have signed up.
              </li>
              <li>
                We use touchpoints and time taken to associate <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">visitor_ids</code> with <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">user_ids</code> as core criteria for conversion, automatically calculating <strong>Time to Conversion</strong> and <strong>Touchpoints to Conversion</strong> metrics.
              </li>
            </ul>
            <p className="mt-2 text-sm">
              This metric is ideal for tracking acquisition and the reach of your marketing campaigns.
            </p>
          </div>
          {/* RIGHT: Heading, description, then timeline animation/graphic - 70% lighter theme */}
          <div className="w-full md:w-[70%] bg-gray-50 p-8 rounded-r-lg flex flex-col justify-center">
            <div className="mb-4">
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Conversion Tracking Timeline:
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                We use <b>touchpoints</b> and the <b>time taken</b> to associate a <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">visitor_id</code> and <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">user_id</code> as core criteria for conversion, automatically calculating <b>Time to Conversion</b> and <b>Touchpoints to Conversion</b> metrics.
              </p>
            </div>
            <div className="w-full overflow-x-auto">
              <VisitorToUserAnimation variant="mtv" />
            </div>
          </div>
        </>
      ),
    },
    mtu: {
      title: "How Are Monthly Tracked Users (MTUs) Calculated?",
      description: (
        <>
          {/* LEFT: All written explanation & headers - 30% darker theme */}
          <div className="w-full md:w-[30%] space-y-5 bg-gray-800 text-white p-8 rounded-l-lg">
            <div>
              <h4 className="font-semibold text-base mb-1">
                User Mapping Timeline:
              </h4>
              <p className="text-sm text-gray-200 mb-3">
                Each logged-in user is tracked across browsers and devices, mapping multiple <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">visitor_ids</code> to a single <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">user_id</code>.
              </p>
            </div>
            <p>
              <strong>Monthly Tracked Users (MTUs)</strong> measures unique active product users identified by a unique <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">user_id</code> that gets assigned after they have signed up and are actively using your product in a given month.
            </p>
            <ul className="mt-2 list-disc ml-7 text-gray-200 text-sm space-y-2">
              <li>
                Each logged-in user with a unique <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">user_id</code> is counted only once per month, even if they log in from multiple devices or sessions.
              </li>
              <li>
                MTUs capture actual product engagement and adoption, helping you understand your active user base.
              </li>
              <li>
                Inactive, dormant, or churned users are excluded from the MTU count.
              </li>
              <li>
                Eventually, all <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">visitor_ids</code> get mapped to <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">user_ids</code> as users continue to use the same browsers to access your product. Multiple <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">visitor_ids</code> from different browsers get mapped to a single <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">user_id</code>.
              </li>
            </ul>
            <p className="mt-2 text-sm">
              Use this metric to manage feature adoption, retention, and true customer growth.
            </p>
          </div>
          {/* RIGHT: Timeline view - 70% lighter theme */}
          <div className="w-full md:w-[70%] bg-gray-50 p-8 rounded-r-lg flex flex-col justify-center items-center">
            <div className="w-full overflow-x-auto">
              <VisitorToUserAnimation variant="mtu" />
            </div>
          </div>
        </>
      ),
    },
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
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2 text-xs text-blue-600">
              <ExternalLink size={12} />
              <button
                type="button"
                className="hover:underline focus:outline-none"
                onClick={() => handleLearnMoreClick(learnMoreKind)}
              >
                Learn more about how {product.id === 'marketing' ? 'MTVs' : 'MTUs'} are calculated
              </button>
            </div>
          </div>
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
