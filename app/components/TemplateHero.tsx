"use client";

import React from "react";
import EarlyAccessButton from "./EarlyAccessButton";

/**
 * Data structure used to populate the hero section. This makes the component
 * fully re-usable – simply feed different JSON and it will render accordingly.
 */
export interface TemplateHeroData {
  /** Main headline (use \n for line-breaks) */
  title: string;
  /** Supporting sub-heading text */
  subtitle: string;
  /** Optional background image path (from /public). If omitted, plain background is used. */
  backgroundImage?: string;
}

interface TemplateHeroProps {
  data: TemplateHeroData;
  /** Optional additional class names for the wrapper */
  className?: string;
}

export default function TemplateHero({ data, className }: TemplateHeroProps) {
  const { title, subtitle, backgroundImage } = data;

  // Split headline on line-breaks so we can render each line with its own <span>
  const titleLines = title.split(/\n+/);

  return (
    <section
      className={`relative isolate w-full overflow-hidden bg-[#dbe3ff] ${
        className ?? ""
      }`}
    >
      {/* Decorative noise / pattern image – only if provided */}
      {backgroundImage && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-no-repeat bg-cover opacity-30"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}

      {/* Content container */}
      <div className="w-full max-w-[1412px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex max-w-[750px] flex-col items-start pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32 text-left">
          {/* Headline */}
          <h1 className="font-primary font-bold tracking-tight text-zinc-900 leading-tight text-[32px] md:text-[56px] lg:text-[64px]">
            {titleLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Sub-title */}
          <p className="mt-6 max-w-[600px] font-secondary text-base font-normal text-zinc-900 md:text-xl">
            {subtitle}
          </p>

          {/* CTA */}
          <div className="mt-8 md:mt-10">
            <EarlyAccessButton className="bg-[#1e1e1e] px-6 py-2 md:px-7 md:py-3 rounded-lg text-white font-primary font-bold text-[15px] md:text-[16px] hover:bg-opacity-90 transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
} 