
import React from 'react';
import { Monitor, Smartphone, User, Clock, Target, Calendar } from 'lucide-react';

interface VisitorToUserAnimationProps {
  variant?: 'mtu' | 'mtv';
}

export const VisitorToUserAnimation: React.FC<VisitorToUserAnimationProps> = ({ variant = 'mtu' }) => {
  const timelineSteps = variant === 'mtv' ? [
    {
      day: 'Day 1',
      icon: Monitor,
      action: 'Visitor arrives from Chrome browser',
      detail: 'Touchpoint #1',
      color: 'blue'
    },
    {
      day: 'Day 3',
      icon: Smartphone,
      action: 'Same visitor returns via Safari browser',
      detail: 'Touchpoint #2',
      color: 'green'
    },
    {
      day: 'Day 5',
      icon: User,
      action: 'Visitor signs up and gets a user_id',
      detail: 'Time to Conversion: 5 days',
      color: 'purple'
    },
    {
      day: 'Result',
      icon: Target,
      action: 'Conversion metrics tracked automatically',
      detail: '2 touchpoints, 5 days to conversion',
      color: 'orange'
    }
  ] : [
    {
      day: 'Day 1',
      icon: Monitor,
      action: 'User visits from Chrome browser',
      detail: 'visitor_id_chrome created',
      color: 'blue'
    },
    {
      day: 'Day 3',
      icon: Smartphone,
      action: 'Same user visits from Safari browser',
      detail: 'visitor_id_safari created',
      color: 'green'
    },
    {
      day: 'Day 5',
      icon: User,
      action: 'User signs up and gets a user_id',
      detail: 'user_id_12345 assigned',
      color: 'purple'
    },
    {
      day: 'Result',
      icon: Target,
      action: 'Multiple visitor_ids mapped to one user_id',
      detail: 'Complete user journey tracked',
      color: 'orange'
    }
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="text-xs text-gray-600 mb-4 font-medium flex items-center">
        <Calendar size={14} className="mr-2" />
        {variant === 'mtv' ? 'Conversion Tracking Timeline' : 'User Mapping Timeline'}
      </div>
      
      <div className="space-y-3">
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full bg-${step.color}-100 border border-${step.color}-300`}>
                  <Icon size={16} className={`text-${step.color}-600`} />
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className="w-0.5 h-6 bg-gray-300 mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-semibold text-gray-900">{step.day}</span>
                  {variant === 'mtv' && (step.day === 'Day 1' || step.day === 'Day 3') && (
                    <div className="flex items-center space-x-1">
                      <Target size={10} className={`text-${step.color}-600`} />
                      <span className="text-xs text-gray-600">{step.detail}</span>
                    </div>
                  )}
                  {variant === 'mtv' && step.day === 'Day 5' && (
                    <div className="flex items-center space-x-1">
                      <Clock size={10} className={`text-${step.color}-600`} />
                      <span className="text-xs text-gray-600">{step.detail}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-700">{step.action}</p>
                {variant === 'mtu' && (
                  <code className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded mt-1 inline-block">
                    {step.detail}
                  </code>
                )}
                {variant === 'mtv' && step.day === 'Result' && (
                  <div className="text-xs text-gray-600 mt-1 font-medium">
                    ✓ {step.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
