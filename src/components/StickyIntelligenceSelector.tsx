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
        bg: isSelected ? 'bg-blue-50' : 'bg-gray-50',
        border: isSelected ? 'border-blue-500' : 'border-gray-300',
        text: isSelected ? 'text-blue-600' : 'text-gray-500',
        hover: 'hover:border-blue-400 hover:bg-blue-25'
      },
      green: {
        bg: isSelected ? 'bg-green-50' : 'bg-gray-50',
        border: isSelected ? 'border-green-500' : 'border-gray-300',
        text: isSelected ? 'text-green-600' : 'text-gray-500',
        hover: 'hover:border-green-400 hover:bg-green-25'
      },
      purple: {
        bg: isSelected ? 'bg-purple-50' : 'bg-gray-50',
        border: isSelected ? 'border-purple-500' : 'border-gray-300',
        text: isSelected ? 'text-purple-600' : 'text-gray-500',
        hover: 'hover:border-purple-400 hover:bg-purple-25'
      },
      orange: {
        bg: isSelected ? 'bg-orange-50' : 'bg-gray-50',
        border: isSelected ? 'border-orange-500' : 'border-gray-300',
        text: isSelected ? 'text-orange-600' : 'text-gray-500',
        hover: 'hover:border-orange-400 hover:bg-orange-25'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div 
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'py-4' : 'py-2'
        }`}>
          
          {/* Collapsed State */}
          {isScrolled && !isHovered && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Select Products ({selectedCount} of {modules.length})
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
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        <Icon size={14} className={colors.text} />
                        <span className={`text-xs font-medium ${colors.text}`}>
                          {module.shortName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          )}

          {/* Expanded State */}
          {isExpanded && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Intelligence Modules
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Choose your products to configure pricing
                </p>
              </div>
              
              <div className="flex justify-center space-x-6">
                {modules.map((module) => {
                  const Icon = module.icon;
                  const isSelected = selectedModules.has(module.id);
                  const colors = getColorClasses(module.color, isSelected);
                  
                  return (
                    <div 
                      key={module.id}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => onModuleToggle(module.id)}
                    >
                      <div className="relative mb-2">
                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center z-10">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Icon circle */}
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                          colors.bg
                        } ${colors.border} ${colors.hover} ${
                          isSelected ? 'scale-105' : 'group-hover:scale-105'
                        }`}>
                          <Icon 
                            size={20} 
                            className={`transition-colors duration-200 ${colors.text}`} 
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
          )}
        </div>
      </div>
    </div>
  );
};
