
import React from 'react';

interface PricingActionsProps {
  isEnterprise: boolean;
}

export const PricingActions: React.FC<PricingActionsProps> = ({ isEnterprise }) => {
  const handleStartTrial = () => {
    window.open('https://app.thrivestack.ai/', '_blank');
  };

  const handleTalkToSales = () => {
    window.open('https://app.thrivestack.ai/', '_blank');
  };

  const handleExportEstimate = () => {
    const estimate = {
      timestamp: new Date().toISOString(),
      exported: true
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(estimate, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "thrivestack-estimate.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-3">
      {isEnterprise ? (
        <button
          onClick={handleTalkToSales}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Talk to Sales
        </button>
      ) : (
        <button
          onClick={handleStartTrial}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start 14-Day Trial
        </button>
      )}
      
      <button
        onClick={handleTalkToSales}
        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
      >
        Talk to Sales
      </button>
      
      <button
        onClick={handleExportEstimate}
        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        Export Estimate
      </button>
    </div>
  );
};
