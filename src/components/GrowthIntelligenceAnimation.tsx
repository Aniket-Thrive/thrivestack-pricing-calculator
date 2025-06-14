
import React, { useState, useEffect } from 'react';
import { Users, UserCheck, DollarSign, Building2, ArrowRight, Zap } from 'lucide-react';

export const GrowthIntelligenceAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    { id: 'marketing', icon: Users, label: 'Marketing', description: 'Gets Visitors', color: 'blue' },
    { id: 'product', icon: UserCheck, label: 'Product', description: 'Gets Users & Accounts', color: 'green' },
    { id: 'revenue', icon: DollarSign, label: 'Revenue', description: 'Account & Revenue Association', color: 'purple' },
    { id: 'account', icon: Building2, label: 'Account Intelligence', description: 'Tracks All Analytics Together', color: 'orange' },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 mb-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Zap className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">How Growth Intelligence Works</h2>
        </div>
        <p className="text-gray-600 text-sm">
          Connecting Marketing, Product, Revenue and Accounts for unified growth insights
        </p>
      </div>

      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index || activeStep === 4;
          const isCompleted = activeStep > index || activeStep === 4;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center space-y-3">
                <div className={`relative p-4 rounded-full transition-all duration-500 ${
                  isActive 
                    ? `bg-${step.color}-100 border-2 border-${step.color}-500 scale-110` 
                    : isCompleted
                      ? `bg-${step.color}-50 border border-${step.color}-300`
                      : 'bg-gray-100 border border-gray-200'
                }`}>
                  <Icon 
                    size={24} 
                    className={`transition-colors duration-500 ${
                      isActive || isCompleted 
                        ? `text-${step.color}-600` 
                        : 'text-gray-400'
                    }`} 
                  />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <div className="text-center">
                  <div className={`font-semibold text-sm transition-colors duration-500 ${
                    isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  <div className={`text-xs transition-colors duration-500 ${
                    isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center">
                  <ArrowRight 
                    size={20} 
                    className={`transition-colors duration-500 ${
                      activeStep > index || activeStep === 4
                        ? 'text-blue-500' 
                        : 'text-gray-300'
                    }`} 
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {activeStep === 4 && (
        <div className="mt-6 text-center">
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 inline-block animate-fade-in">
            <span className="text-sm text-orange-800 font-medium">
              🎯 Account Intelligence unifies all growth data for complete visibility
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
