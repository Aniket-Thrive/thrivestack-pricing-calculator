
import { PricingCalculator } from "@/components/PricingCalculator";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">ThriveStack</h1>
            <Link
              to="/embed"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Embed Calculator
            </Link>
          </div>
        </div>
      </div>
      <PricingCalculator />
    </div>
  );
};

export default Index;
