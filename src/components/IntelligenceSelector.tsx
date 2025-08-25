import React from 'react';
import { Users, UserCheck, DollarSign, Building2 } from 'lucide-react';

interface IntelligenceSelectorProps {
  selectedModules: Set<string>;
  onModuleToggle: (moduleId: string) => void;
}

export const IntelligenceSelector: React.FC<IntelligenceSelectorProps> = ({
  selectedModules,
  onModuleToggle
}) => {
  const modules = [
    { 
      id: 'marketing', 
      name: 'Marketing Intelligence', 
      icon: Users, 
      number: 1,
      color: 'blue' 
    },
    { 
      id: 'product', 
      name: 'Product Intelligence', 
      icon: UserCheck, 
      number: 2,
      color: 'green' 
    },
    { 
      id: 'revenue', 
      name: 'Revenue Intelligence', 
      icon: DollarSign, 
      number: 3,
      color: 'purple' 
    },
    { 
      id: 'sales', 
      name: 'Account Intelligence', 
      icon: Building2, 
      number: 4,
      color: 'orange' 
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
        Select Intelligence Modules
      </h3>
      <div className="flex justify-center space-x-8">
        {modules.map((module) => {
          const Icon = module.icon;
          const isSelected = selectedModules.has(module.id);
          
          return (
            <div 
              key={module.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onModuleToggle(module.id)}
            >
              <div className="relative mb-2">
                {/* Number circle */}
                <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 ${
                  isSelected ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  {module.number}
                </div>
                
                {/* Icon circle */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                  isSelected
                    ? `bg-${module.color}-50 border-${module.color}-500 scale-110`
                    : 'bg-gray-50 border-gray-300 group-hover:border-gray-400 group-hover:scale-105'
                }`}>
                  <Icon 
                    size={24} 
                    className={`transition-colors duration-200 ${
                      isSelected ? `text-${module.color}-600` : 'text-gray-500 group-hover:text-gray-600'
                    }`} 
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-sm font-medium transition-colors duration-200 ${
                  isSelected ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  {module.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};