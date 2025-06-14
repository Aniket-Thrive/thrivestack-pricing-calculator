
import React, { useEffect } from 'react';

const EmbedTest = () => {
  useEffect(() => {
    // Simulate the embed code working by loading the calculator
    const script = document.createElement('script');
    script.src = `${window.location.origin}/widget.js`;
    script.onload = () => {
      // Simulate the ThriveStackCalculator.init call
      if ((window as any).ThriveStackCalculator) {
        (window as any).ThriveStackCalculator.init({
          container: '#thrivestack-pricing-calculator'
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const embedCodeExample = `<!-- ThriveStack Pricing Calculator Embed -->
<div id="thrivestack-pricing-calculator"></div>
<script src="${window.location.origin}/widget.js"></script>
<script>
  ThriveStackCalculator.init({
    container: '#thrivestack-pricing-calculator'
  });
</script>`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Embed Code Test Page
          </h1>
          <p className="text-lg text-gray-600">
            This page demonstrates how the embed code works on a real website
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Embed Demo */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Live Embed Demo</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-4">
                This is how the calculator appears when embedded:
              </p>
              <div id="thrivestack-pricing-calculator" className="min-h-[600px] bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading calculator...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Note: This is a simulation of the embed functionality
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Embed Code Used</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This is the exact code that was used to embed the calculator on this page:
              </p>
              
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{embedCodeExample}</code>
              </pre>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">✅ What works:</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Simple 3-line HTML embed</li>
                  <li>• Automatic script loading</li>
                  <li>• Responsive container</li>
                  <li>• No external dependencies needed</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">📋 Integration steps:</h3>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Add the div container with ID</li>
                  <li>2. Load the widget script</li>
                  <li>3. Initialize with container selector</li>
                  <li>4. Calculator renders automatically</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 space-x-4">
          <a
            href="/embed"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Embed Instructions
          </a>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Full Calculator
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmbedTest;
