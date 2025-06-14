
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const Embed = () => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- ThriveStack Pricing Calculator Embed -->
<div id="thrivestack-pricing-calculator"></div>
<script src="${window.location.origin}/widget.js"></script>
<script>
  ThriveStackCalculator.init({
    container: '#thrivestack-pricing-calculator'
  });
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Embed ThriveStack Pricing Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Add our pricing calculator to your website with a simple HTML embed
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Embed</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Copy the embed code</h3>
                <p className="text-sm text-gray-600">Use the simplified HTML code below to add the pricing calculator to your website.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Paste into your HTML</h3>
                <p className="text-sm text-gray-600">Add the code to any HTML page where you want the calculator to appear.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Test your embed</h3>
                <p className="text-sm text-gray-600">Use our test page to see how the embed works before adding it to your site.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Simplified Embed Code</h2>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
              <code>{embedCode}</code>
            </pre>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Features included:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Interactive pricing calculator with all modules</li>
              <li>• Real-time price calculations</li>
              <li>• Currency selection (USD, EUR, INR)</li>
              <li>• Monthly/Annual billing options</li>
              <li>• Responsive design that works on all devices</li>
              <li>• Lead generation with trial signup buttons</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">Script Location:</h3>
            <p className="text-sm text-yellow-800 mb-2">
              The widget script is hosted at: <code className="bg-yellow-100 px-1 rounded">{window.location.origin}/widget.js</code>
            </p>
            <p className="text-sm text-yellow-800">
              This script contains all the necessary dependencies and will automatically load the pricing calculator.
            </p>
          </div>
        </div>

        <div className="text-center space-x-4">
          <a
            href="/embed-test"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Test Embed Code →
          </a>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Calculator
          </a>
        </div>
      </div>
    </div>
  );
};

export default Embed;
