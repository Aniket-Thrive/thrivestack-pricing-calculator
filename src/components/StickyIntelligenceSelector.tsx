import React, { useState, useEffect } from 'react';
import { Users, UserCheck, DollarSign, Building2, ChevronDown } from 'lucide-react';

interface StickyIntelligenceSelectorProps {
  selectedModules: Set<string>;
  onModuleToggle: (moduleId: string) => void;
}

export const StickyIntelligenceSelector: React.FC<StickyIntelligenceSelectorProps> = ({
  selectedModules,
  onModuleToggle
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const modules = [
    { 
      id: 'marketing', 
      name: 'Marketing Intelligence', 
      shortName: 'Marketing',
      icon: Users, 
      color: 'blue' 
    },
    { 
      id: 'product', 
      name: 'Product Intelligence', 
      shortName: 'Product',
      icon: UserCheck, 
      color: 'green' 
    },
    { 
      id: 'revenue', 
      name: 'Revenue Intelligence', 
      shortName: 'Revenue',
      icon: DollarSign, 
      color: 'purple' 
    },
    { 
      id: 'sales', 
      name: 'Account Intelligence', 
      shortName: 'Account',
      icon: Building2, 
      color: 'orange' 
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedCount = selectedModules.size;
  const isExpanded = !isScrolled || isHovered;

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      blue: {
        bg: isSelected ? 'bg-blue-50' : 'bg-white',
        border: isSelected ? 'border-blue-500' : 'border-gray-200',
        text: isSelected ? 'text-blue-600' : 'text-gray-600',
        hover: isSelected ? 'hover:bg-blue-100' : 'hover:border-blue-300 hover:bg-blue-25 hover:shadow-md hover:shadow-blue-100',
        iconBg: isSelected ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'
      },
      green: {
        bg: isSelected ? 'bg-green-50' : 'bg-white',
        border: isSelected ? 'border-green-500' : 'border-gray-200',
        text: isSelected ? 'text-green-600' : 'text-gray-600',
        hover: isSelected ? 'hover:bg-green-100' : 'hover:border-green-300 hover:bg-green-25 hover:shadow-md hover:shadow-green-100',
        iconBg: isSelected ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-green-50'
      },
      purple: {
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        border: isSelected ? 'border-purple-500' : 'border-gray-200',
        text: isSelected ? 'text-purple-600' : 'text-gray-600',
        hover: isSelected ? 'hover:bg-purple-100' : 'hover:border-purple-300 hover:bg-purple-25 hover:shadow-md hover:shadow-purple-100',
        iconBg: isSelected ? 'bg-purple-100' : 'bg-gray-100 group-hover:bg-purple-50'
      },
      orange: {
        bg: isSelected ? 'bg-orange-50' : 'bg-white',
        border: isSelected ? 'border-orange-500' : 'border-gray-200',
        text: isSelected ? 'text-orange-600' : 'text-gray-600',
        hover: isSelected ? 'hover:bg-orange-100' : 'hover:border-orange-300 hover:bg-orange-25 hover:shadow-md hover:shadow-orange-100',
        iconBg: isSelected ? 'bg-orange-100' : 'bg-gray-100 group-hover:bg-orange-50'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div 
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'py-5' : 'py-3'
        }`}>
          
          {/* Collapsed State */}
          {isScrolled && !isHovered && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Select Products
                </h3>
                <div className="flex items-center space-x-2">
                  {modules.map((module) => {
                    const Icon = module.icon;
                    const isSelected = selectedModules.has(module.id);
                    const colors = getColorClasses(module.color, isSelected);
                    
                    return (
                      <div
                        key={module.id}
                        className={`relative flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                          colors.bg
                        } ${colors.border} ${colors.hover}`}
                        onClick={() => onModuleToggle(module.id)}
                      >
                        <div className="flex items-center justify-between w-full">
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                          <Icon size={14} className={colors.text} />
                          <span className={`text-xs font-medium ${colors.text}`}>
                            {module.shortName}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          )}

          {/* Expanded State - Compact Layout */}
          {isExpanded && (
            <div className="flex items-center justify-between">
              {/* Left side - Text content */}
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-8">
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                      Select Intelligence Modules
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5 leading-tight">
                      Choose your products to configure pricing
                    </p>
                  </div>
                  
                  {/* Module selection icons */}
                  <div className="flex items-center space-x-3">
                    {modules.map((module) => {
                      const Icon = module.icon;
                      const isSelected = selectedModules.has(module.id);
                      const colors = getColorClasses(module.color, isSelected);
                      
                      return (
                        <div className="flex items-center space-x-3 ml-8">
                          <div
                            key={module.id}
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={() => onModuleToggle(module.id)}
                          >
                            <div className="relative mb-1.5">
                              {/* Selection indicator */}
                              {isSelected && (
                                <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center z-10">
                                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                              
                              {/* Icon circle */}
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-2 cursor-pointer ${
                                colors.bg
                              } ${colors.border} ${colors.hover} ${
                                isSelected 
                                  ? 'scale-105 shadow-md' 
                                  : 'group-hover:scale-105 group-hover:shadow-md transform-gpu animate-pulse-subtle'
                              }`}>
                                <Icon 
                                  size={16} 
                                  className={`transition-colors duration-200 ${colors.text}`} 
                                />
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className={`text-xs font-medium transition-colors duration-200 leading-tight ${
                                isSelected ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'
                              }`}>
                                {module.shortName}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
