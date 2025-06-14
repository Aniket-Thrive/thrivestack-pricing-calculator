
import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, User } from 'lucide-react';

export const VisitorToUserAnimation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStepDescription = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return "Day 1: User visits from Chrome browser";
      case 1:
        return "Day 3: Same user visits from Safari browser";
      case 2:
        return "Day 5: User signs up and gets a user_id";
      case 3:
        return "Result: Multiple visitor_ids mapped to one user_id";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="text-xs text-gray-600 mb-3 font-medium">
        {getStepDescription(step)}
      </div>
      
      <div className="flex items-center justify-between">
        {/* Visitor IDs */}
        <div className="flex flex-col space-y-2">
          <div className={`flex items-center space-x-2 p-2 rounded transition-all duration-500 ${
            step >= 0 ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 border border-gray-200'
          }`}>
            <Monitor size={16} className={step >= 0 ? 'text-blue-600' : 'text-gray-400'} />
            <code className={`text-xs ${step >= 0 ? 'text-blue-800' : 'text-gray-500'}`}>
              visitor_id_chrome
            </code>
          </div>
          
          <div className={`flex items-center space-x-2 p-2 rounded transition-all duration-500 ${
            step >= 1 ? 'bg-green-100 border border-green-300' : 'bg-gray-100 border border-gray-200'
          }`}>
            <Smartphone size={16} className={step >= 1 ? 'text-green-600' : 'text-gray-400'} />
            <code className={`text-xs ${step >= 1 ? 'text-green-800' : 'text-gray-500'}`}>
              visitor_id_safari
            </code>
          </div>
        </div>

        {/* Arrow */}
        <div className={`transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="flex items-center space-x-1">
            <div className="w-6 h-0.5 bg-gray-400"></div>
            <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
          </div>
        </div>

        {/* User ID */}
        <div className={`flex items-center space-x-2 p-3 rounded transition-all duration-500 ${
          step >= 2 ? 'bg-purple-100 border border-purple-300' : 'bg-gray-100 border border-gray-200'
        }`}>
          <User size={16} className={step >= 2 ? 'text-purple-600' : 'text-gray-400'} />
          <code className={`text-xs ${step >= 2 ? 'text-purple-800' : 'text-gray-500'}`}>
            user_id_12345
          </code>
        </div>
      </div>

      {/* Mapping indicator */}
      {step === 3 && (
        <div className="mt-3 text-center">
          <div className="text-xs text-gray-600 bg-yellow-50 border border-yellow-200 rounded px-2 py-1 inline-block animate-fade-in">
            ✓ Both visitor_ids now mapped to single user_id
          </div>
        </div>
      )}
    </div>
  );
};
