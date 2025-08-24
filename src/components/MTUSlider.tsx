import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { formatNumber } from '../utils/pricingEngine';
import { CustomSlider } from './CustomSlider';
import { AbuseDetectionAddon } from './AbuseDetectionAddon';
import { LearnMoreModal } from './LearnMoreModal';
import { VisitorToUserAnimation } from './VisitorToUserAnimation';

interface MTUSlidersProps {
  productId: string;
  value: number;
  onChange: (value: number) => void;
  abuseDetectionEnabled?: boolean;
  onAbuseDetectionEnabledChange?: (enabled: boolean) => void;
  abuseDetectionValue?: number;
  onAbuseDetectionChange?: (value: number) => void;
}

export const MTUSlider: React.FC<MTUSlidersProps> = ({
  productId,
  value,
  onChange,
  abuseDetectionEnabled = false,
  onAbuseDetectionEnabledChange,
  abuseDetectionValue = 500,
  onAbuseDetectionChange
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'mtu' | 'mtv' | null>(null);

  const handleLearnMoreClick = (type: 'mtu' | 'mtv') => {
    setModalType(type);
    setModalOpen(true);
  };

  const label = productId === 'marketing' ? 'Monthly Tracked Visitors' : 'Monthly Tracked Users';
  const learnMoreKind = productId === 'marketing' ? 'mtv' : 'mtu';

  // Define modal content for both types
  const learnMoreContent = {
    mtv: {
      title: "How Are Monthly Tracked Visitors (MTVs) Calculated?",
      description: (
        <>
          <div className="w-full lg:w-2/5 space-y-4 bg-gray-800 text-white p-6 rounded-lg">
            <p className="text-sm">
              <strong>Monthly Tracked Visitors (MTVs)</strong> represents the number of unique individuals who visit your website or digital property during a given month.
            </p>
            <ul className="text-xs text-gray-200 space-y-2 list-disc ml-4">
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
            <div className="bg-gray-700 p-3 rounded text-xs">
              <h5 className="font-semibold mb-2">MTV Calculation Example:</h5>
              <ul className="text-gray-200 space-y-1">
                <li>• Day 51: 2 separate Visitors</li>
                <li>• Day 62: 1 single Visitor, 1 User</li>
              </ul>
            </div>
            <p className="text-xs">
              This metric is ideal for tracking acquisition and the reach of your marketing campaigns.
            </p>
          </div>
          <div className="w-full lg:w-3/5 bg-gray-50 p-6 rounded-lg flex flex-col justify-center">
            <div className="mb-4">
              <h4 className="font-semibold text-base mb-2 text-gray-900">
                Conversion Tracking Timeline:
              </h4>
              <p className="text-xs text-gray-600 mb-4">
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
          <div className="w-full lg:w-2/5 space-y-4 bg-gray-800 text-white p-6 rounded-lg">
            <div>
              <h4 className="font-semibold text-sm mb-1">
                User Mapping Timeline:
              </h4>
              <p className="text-xs text-gray-200 mb-3">
                Each logged-in user is tracked across browsers and devices, mapping multiple <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">visitor_ids</code> to a single <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">user_id</code>.
              </p>
            </div>
            <p className="text-sm">
              <strong>Monthly Tracked Users (MTUs)</strong> measures unique active product users identified by a unique <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">user_id</code> that gets assigned after they have signed up and are actively using your product in a given month.
            </p>
            <ul className="text-xs text-gray-200 space-y-2 list-disc ml-4">
              <li>
                Each logged-in user with a unique <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">user_id</code> is counted only once per month, even if they log in from multiple devices or sessions.
              </li>
              <li>
                MTUs capture actual product engagement and adoption, helping you understand your active user base.
              </li>
              <li>
                Inactive, dormant, or churned users are excluded from the MTU count.
              </li>
              <li>
                Eventually, all <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">visitor_ids</code> get mapped to <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">user_ids</code> as users continue to use the same browsers to access your product. Multiple <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">visitor_ids</code> from different browsers get mapped to a single <code className="bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">user_id</code>.
              </li>
            </ul>
            <p className="text-xs">
              Use this metric to manage feature adoption, retention, and true customer growth.
            </p>
          </div>
          <div className="w-full lg:w-3/5 bg-gray-50 p-6 rounded-lg flex flex-col justify-center items-center">
            <div className="w-full overflow-x-auto">
              <VisitorToUserAnimation variant="mtu" />
            </div>
          </div>
        </>
      ),
    },
  };

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
            Learn more about how {productId === 'marketing' ? 'MTVs' : 'MTUs'} are calculated
          </button>
        </div>
      </div>
      <CustomSlider
        label={label}
        value={value}
        onChange={onChange}
        min={2000}
        max={1000000}
        step={1000}
        formatValue={(v) => formatNumber(v)}
        useLogarithmicScale={true}
      />
      {/* Abuse Detection as an embedded add-on for marketing */}
      {productId === "marketing" && (
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
};
