
import React from "react";
import {
  Monitor,
  Chrome,
  User,
  Target,
  Clock,
  Users,
} from "lucide-react";

interface VisitorToUserAnimationProps {
  variant?: "mtu" | "mtv";
}

function SimpleCircle({ color }: { color: string }) {
  const bg = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
  }[color];
  return (
    <span className={`w-4 h-4 rounded-full ${bg} border-2 border-white shadow-md`}></span>
  );
}

export const VisitorToUserAnimation: React.FC<VisitorToUserAnimationProps> = ({
  variant = "mtv",
}) => {
  const timelineItems =
    variant === "mtv"
      ? [
          {
            day: "Day 1",
            tag: "Touchpoint #1",
            title: "Visitor arrives (Chrome).",
            id: "visitor_id_123",
            icon: Chrome,
            color: "blue",
          },
          {
            day: "Day 3",
            tag: "Touchpoint #2",
            title: "Returns via Chrome Incognito.",
            id: "visitor_id_123",
            icon: Chrome,
            color: "blue",
          },
          {
            day: "Day 5",
            tag: "Touchpoint #3",
            title: "Returns (Safari).",
            id: "visitor_id_345",
            icon: Monitor,
            color: "green",
          },
          {
            day: "Day 24",
            tag: "Touchpoint #4",
            title: "Returns (Chrome) again.",
            id: "visitor_id_123",
            icon: Chrome,
            color: "blue",
          },
          {
            day: "Day 51",
            tag: "Converted",
            title: "visitor_id_123 signs up, gets user_id_123",
            id: "visitor_id_123",
            icon: User,
            color: "purple",
            extra: (
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Target size={14} className="text-orange-600 mr-1" />
                  <span className="text-xs text-gray-700">
                    <strong>Result</strong>: Conversion metrics tracked automatically for visitor_id_123
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={13} className="text-orange-600 mr-1" />
                  <span className="text-xs text-green-700 font-semibold">
                    ✓ 3 touchpoints, 51 days to conversion
                  </span>
                </div>
              </div>
            ),
          },
          {
            day: "Day 62",
            tag: "Multiple Visitor IDs mapped to same User_ID",
            title: "visitor_id_345 signs in with user_id_123",
            id: "visitor_id_345",
            icon: Users,
            color: "orange",
            extra: (
              <div className="space-y-1">
                <span className="block text-xs text-gray-700">
                  visitor_id_123 and visitor_id_345 mapped to user_id_123
                </span>
                <span className="block text-xs text-green-700 font-semibold">
                  ✓ 4 touchpoints, 51 days to conversion
                </span>
              </div>
            ),
          },
        ]
      : [
          {
            day: "MTU event",
            tag: "",
            title: "User mapping occurs—see docs for details.",
            icon: User,
            color: "gray",
          },
        ];

  // Center-aligned timeline with alternating left/right positioning
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full relative">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        <ol className="relative">
          {timelineItems.map((item, idx) => {
            // Determine side based on visitor_id
            const isLeftSide = item.id === "visitor_id_123" || !item.id;
            const isRightSide = item.id === "visitor_id_345";
            
            return (
              <li
                className="mb-8 last:mb-0 relative flex items-start"
                key={item.day + item.tag}
              >
                {/* Left side content */}
                {isLeftSide && (
                  <div className="w-1/2 pr-8 text-right">
                    <div className="flex items-center justify-end w-full gap-2">
                      <span className="text-xs font-semibold text-gray-900">{item.day}</span>
                      {item.id && (
                        <span className="text-xs text-gray-400">{item.id}</span>
                      )}
                      {item.tag && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-blue-700 border border-blue-100 font-semibold whitespace-nowrap">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-700">
                      {item.title}
                    </div>
                    {item.extra}
                  </div>
                )}
                
                {/* Empty left space for right-side items */}
                {isRightSide && <div className="w-1/2"></div>}
                
                {/* Center circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <SimpleCircle color={item.color} />
                </div>
                
                {/* Right side content */}
                {isRightSide && (
                  <div className="w-1/2 pl-8 text-left">
                    <div className="flex items-center justify-start w-full gap-2">
                      <span className="text-xs font-semibold text-gray-900">{item.day}</span>
                      {item.id && (
                        <span className="text-xs text-gray-400">{item.id}</span>
                      )}
                      {item.tag && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-blue-700 border border-blue-100 font-semibold whitespace-nowrap">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-700">
                      {item.title}
                    </div>
                    {item.extra}
                  </div>
                )}
                
                {/* Empty right space for left-side items */}
                {isLeftSide && <div className="w-1/2"></div>}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
