import React from "react";
import {
  Monitor,
  Chrome,
  ArrowRight,
  User,
  Target,
  Clock,
  Users,
} from "lucide-react";

interface VisitorToUserAnimationProps {
  variant?: "mtu" | "mtv"; // Only mtv will be rendered for timeline in this format
}

// Helper for colored icon backgrounds
function IconCircle({
  icon: Icon,
  color,
}: {
  icon: typeof Chrome;
  color: string;
}) {
  const bg = {
    blue: "bg-blue-100 border-blue-300 text-blue-600",
    green: "bg-green-100 border-green-300 text-green-600",
    orange: "bg-orange-100 border-orange-300 text-orange-600",
    purple: "bg-purple-100 border-purple-300 text-purple-600",
    gray: "bg-gray-100 border-gray-300 text-gray-500",
  }[color];
  return (
    <span className={`p-2 rounded-full border ${bg}`}>
      <Icon size={18} />
    </span>
  );
}

export const VisitorToUserAnimation: React.FC<VisitorToUserAnimationProps> = ({
  variant = "mtv",
}) => {
  // Only use the timeline for MTV variant
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
            icon: User,
            color: "purple",
            extra: (
              <div className="space-y-1 pl-2">
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
            icon: Users,
            color: "orange",
            extra: (
              <div className="space-y-1 pl-2">
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

  // No heading or description for MTV; text now handled in left column of modal!
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full">
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-4 shadow-sm animate-fade-in w-full">
          <ol className="relative border-l border-gray-300">
            {timelineItems.map((item, idx) => (
              <li className="mb-8 ml-6 last:mb-0" key={item.day + item.tag}>
                <span className="absolute -left-4 flex items-center">
                  <IconCircle icon={item.icon} color={item.color} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-900">{item.day}</span>
                    {item.tag && (
                      <span className="ml-2 text-[11px] px-2 py-0.5 rounded bg-gray-100 text-blue-700 border border-blue-100 font-semibold">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-700">
                    {item.title}
                  </div>
                  {item.id && (
                    <span className="text-xs text-gray-400"> {item.id}</span>
                  )}
                  {item.extra}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
