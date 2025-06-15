
import React, { useState } from "react";
import { FeatureItem } from "./FeatureItem";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

// Helper function to parse **bold** markdown in a string and return JSX
function parseBold(text: string): React.ReactNode {
  const fragments: React.ReactNode[] = [];
  let lastIndex = 0;
  const boldRegex = /\*\*([^\*]+)\*\*/g;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      fragments.push(text.substring(lastIndex, match.index));
    }
    fragments.push(
      <strong key={"b" + idx} className="font-semibold text-gray-800">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
    idx++;
  }
  if (lastIndex < text.length) {
    fragments.push(text.substring(lastIndex));
  }
  return fragments;
}

interface ProductFeaturesProps {
  features: string[];
}

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  const [open, setOpen] = useState(false);

  const showCount = 4;
  const hasExtra = features.length > showCount;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="space-y-2 mt-4">
        {(open ? features : features.slice(0, showCount)).map((feature, idx) => (
          <FeatureItem key={idx} feature={feature} parseFn={parseBold} />
        ))}
      </div>
      {hasExtra && (
        <CollapsibleTrigger
          className="mt-2 flex items-center text-sm text-blue-600 hover:underline gap-1 cursor-pointer"
          asChild
        >
          <button type="button">
            {open ? "Show less" : `Show all features`}
            <ChevronDown
              className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              size={16}
            />
          </button>
        </CollapsibleTrigger>
      )}
      {/* Optionally, add spacing below the collapsible */}
    </Collapsible>
  );
};
