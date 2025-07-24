import React, { useState } from 'react';
import { motion } from 'framer-motion';
import svgPaths from "../../imports/svg-317vru4792";

export interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageurl: string; // path to the template preview image
}

interface TemplateCardProps {
  template: Template;
  index: number;
  onTemplateClick: (template: Template) => void;
}

export default function TemplateCard({ template, index, onTemplateClick }: TemplateCardProps) {
  // Fallback to a default image if none is provided
  const imageSrc = template.imageurl || "/images/1.png";
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onClick={() => onTemplateClick(template)}
      className="bg-[#ffffff] relative rounded-xl shrink-0 w-full md:max-w-[400px] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      data-name="Product page"
    >
      <div className="flex flex-col gap-6 items-center overflow-clip pb-8 pt-0 px-0 relative w-full">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="[background-size:114.43%_100%] aspect-[350/308] bg-[49.5%_0%] bg-no-repeat shrink-0 w-full overflow-hidden rounded-t-xl"
          data-name="image 388"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
        <div className="relative shrink-0 w-full">
          <div className="relative size-full">
            <div className="flex flex-col gap-8 items-start px-6 py-0 relative w-full">
              <div className="flex flex-col gap-4 items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-2 items-start relative shrink-0 text-[#000000] text-left w-full">
                  <div className="font-['Mulish:Bold',_sans-serif] font-bold relative shrink-0 text-lg md:text-xl w-full">
                    <p className="block leading-normal">{template.title}</p>
                  </div>
                  <div
                    className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-sm md:text-base w-full opacity-70"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <p className="block leading-normal">{template.description}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-1 items-start relative shrink-0">
                  {template.tags.map((tag, tagIndex) => (
                    <motion.div 
                      key={tagIndex}
                      whileHover={{ scale: 1.05 }}
                      className={`${tag === 'Sales' ? 'bg-[#ecf3fc]' : 'bg-[#f2e5ff]'} flex flex-row gap-1 h-7 items-center justify-center overflow-clip p-[7px] relative rounded-lg shrink-0`}
                    >
                      {tag === 'Playbook' && (
                        <div className="relative shrink-0 size-4" data-name="Frame">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <g id="Frame">
                              <path d={svgPaths.p279ab100} id="Vector" stroke="var(--stroke-0, #7828C8)" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5.33398 7.33203H10.6673" id="Vector_2" stroke="var(--stroke-0, #7828C8)" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5.33398 4.66797H9.33398" id="Vector_3" stroke="var(--stroke-0, #7828C8)" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                          </svg>
                        </div>
                      )}
                      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#000000] text-[11px] text-left text-nowrap tracking-[0.35px]">
                        <p className="adjustLetterSpacing block leading-[12.25px] whitespace-pre">{tag}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(76,78,100,0.22)] border-solid inset-0 pointer-events-none rounded-xl group-hover:border-blue-300 transition-colors duration-300" />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * TemplateCardGrid – renders a responsive grid of TemplateCard items with "Show more" logic.
 * -------------------------------------------------------------------------------------------------*/

interface TemplateCardGridProps {
  /** Array of template card data */
  templates: Template[];
  /** Callback when any individual template card is clicked */
  onTemplateClick: (template: Template) => void;
  /** Optional additional class names for outer wrapper */
  className?: string;
}

/**
 * Displays up to 6 TemplateCards by default (2 rows assuming 3-col layout).
 * An overlay fades out the hidden cards and a "Show more" button reveals the rest.
 */
export function TemplateCardGrid({
  templates,
  onTemplateClick,
  className,
}: TemplateCardGridProps) {
  const [expanded, setExpanded] = useState(false);

  // Only show first 6 items until expanded.
  const visible = expanded ? templates : templates.slice(0, 6);

  const showToggle = templates.length > 6 && !expanded;

  return (
    <div className={`w-full flex flex-col items-center ${className ?? ''}`.trim()}>
      {/* Grid wrapper (relative so overlay can be absolutely positioned) */}
      <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visible.map((t, i) => (
          <TemplateCard key={t.id} template={t} index={i} onTemplateClick={onTemplateClick} />
        ))}
      </div>

      {/* Show more button */}
      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-6 inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-zinc-900 font-primary font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Show more
        </button>
      )}
    </div>
  );
} 