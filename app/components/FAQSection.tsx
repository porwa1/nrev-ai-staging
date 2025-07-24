'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import svgPaths from '../../imports/svg-317vru4792';

type FaqItemData = {
  id: number;
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqData: FaqItemData[];
  className?: string;
};

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

function FAQItem({
  faq,
  isExpanded,
  onToggle,
  index,
}: {
  faq: FaqItemData;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-8 items-start relative shrink-0 w-full"
    >
      <div className="flex flex-col gap-4 items-start relative shrink-0 w-full">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex flex-row items-start justify-between relative shrink-0 w-full text-left transition-opacity hover:opacity-80 gap-4"
        >
          <div className="font-['Mulish:Bold',_sans-serif] font-bold relative text-[#000000] text-xl md:text-2xl lg:text-[28px] text-left tracking-[0.15px] break-words">
            <p className="adjustLetterSpacing leading-normal">{faq.question}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-clip relative shrink-0 size-10 flex-shrink-0 mt-1"
            data-name={isExpanded ? 'Remove' : 'Add'}
          >
            <div
              className={`absolute ${
                isExpanded
                  ? 'bottom-[45.833%] left-[20.833%] right-[20.833%] top-[45.833%]'
                  : 'inset-[20.833%]'
              }`}
              data-name="Vector"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox={isExpanded ? '0 0 24 4' : '0 0 24 24'}
              >
                <path
                  d={isExpanded ? svgPaths.pf21b480 : svgPaths.p32ff900}
                  fill="var(--fill-0, black)"
                  id="Vector"
                />
              </svg>
            </div>
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#000000] text-base md:text-lg lg:text-[20px] text-left tracking-[0.15px] w-full overflow-hidden"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="block leading-relaxed">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-0 relative shrink-0 w-full max-w-[1037px]">
        <div className="absolute bottom-[-1px] left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1037 2"
          >
            <path
              d="M0 1H1037"
              id="Arrow 27"
              stroke="var(--stroke-0, #E7E7E7)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQSection({ faqData, className }: FAQSectionProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(1);

  return (
    <motion.div
      id="faqs"
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={`w-full ${className ?? ''}`.trim()}
    >
      <div className="flex flex-col items-center w-full max-w-[1412px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-8 md:gap-12 items-center w-full">
          <div className="font-['Mulish:ExtraBold',_sans-serif] font-extrabold text-[#000000] text-[24px] md:text-[28px] lg:text-[36px] text-center tracking-[0.15px] w-full">
            <p className="block leading-normal">Frequently Asked Questions</p>
          </div>
          <div className="flex flex-col gap-8 md:gap-12 items-start w-full">
            {faqData.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isExpanded={expandedFAQ === faq.id}
                onToggle={() =>
                  setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                }
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 