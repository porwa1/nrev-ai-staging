"use client";

import React from "react";
import Image from "next/image";

/**
 * Feature card JSON schema powering the TemplateSubHero component
 */
export interface SubHeroFeature {
  /** Local path to the icon under /public – keep it small SVG/PNG */
  icon?: string;
  /** Main heading for the feature card */
  title: string;
  /** Supporting body copy */
  description: string;
  /** Tailwind-compatible background utility (e.g. 'bg-[#dff5ff]') */
  bgClass: string;
}

/**
 * Overall data contract for the sub-hero section. Keeps component fully re-usable.
 */
export interface TemplateSubHeroData {
  heading: string;
  subheading: string;
  features: SubHeroFeature[];
}

interface TemplateSubHeroProps {
  data: TemplateSubHeroData;
  /** Optional additional class names for outer wrapper */
  className?: string;
}

export default function TemplateSubHero({ data, className }: TemplateSubHeroProps) {
  const { heading, subheading, features } = data;

  return (
    <section className={`w-full ${className ?? ""}`.trim()}>
      {/* Shared container with identical paddings/margins as TemplateHero so left edge aligns */}
      <div className="w-full max-w-[1412px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Copy block */}
        <header className="max-w-4xl">
          <h2 className="font-primary font-bold tracking-tight text-zinc-900 leading-tight text-3xl md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="mt-4 text-base md:text-xl font-normal text-zinc-700">
            {subheading}
          </p>
        </header>

        {/* Feature grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <article
              key={idx}
              className={`relative overflow-hidden rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col ${feature.bgClass}`}
            >
              {/* Star / icon */}
              {feature.icon && (
                <div className="mb-6">
                  <Image
                    src={feature.icon}
                    alt="Feature icon"
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                  />
                </div>
              )}

              {/* Title & description */}
              <h3 className="font-primary font-bold text-zinc-900 text-2xl md:text-3xl leading-snug">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm md:text-base font-secondary text-zinc-900">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 