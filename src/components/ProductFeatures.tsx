
import React from "react";
import { FeatureItem } from "./FeatureItem";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

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
  return (
    <div className="mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="capabilities">
          <AccordionTrigger className="text-sm text-blue-600 hover:underline">
            Show capabilities
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {features.map((feature, idx) => (
                <FeatureItem key={idx} feature={feature} parseFn={parseBold} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
