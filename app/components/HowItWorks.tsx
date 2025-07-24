
"use client";

import React from "react";
import Image from "next/image";

/**
 * Defines the data structure for a single step in the "How it Works" section.
 */
export interface HowItWorksStep {
  /** The main title for the step */
  title: string;
  /** An array of strings for the description bullet points */
  description: string[];
  /** Optional code block to display */
  code?: string;
}

/**
 * Defines the overall data structure for the HowItWorks component.
 */
export interface HowItWorksData {
  heading: string;
  steps: HowItWorksStep[];
}

interface HowItWorksProps {
  data: HowItWorksData;
  /** Optional additional class names for the outer wrapper */
  className?: string;
}

export default function HowItWorks({ data, className }: HowItWorksProps) {
  const { heading, steps } = data;

  return (
    <section className={`w-full ${className ?? ""}`.trim()}>
      {/* Shared container to align with other sections */}
      <div className="w-full max-w-[1412px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Section heading */}
        <h2 className="font-primary font-bold tracking-tight text-zinc-900 leading-tight text-3xl md:text-5xl lg:text-6xl">
          {heading}
        </h2>

        {/* Main content box with gradient and border */}
        <div className="mt-10 rounded-2xl border border-[#EDE9FF] bg-gradient-to-b from-[#DBD4FF]/30 to-[#FDFEFF] p-7 md:p-9">
          <div className="flex flex-col gap-6">
            {steps.map((step, idx) => (
              <div key={idx}>
                {/* Step title */}
                <h3 className="font-secondary text-xl font-semibold leading-loose text-zinc-900">
                  {idx + 1}. {step.title}
                </h3>

                {/* Optional code block */}
                {step.code && (
                  <p className="font-mono text-sm md:text-base text-zinc-600 ml-4 md:ml-6">
                    → {step.code}
                  </p>
                )}

                {/* Description bullet points */}
                <ul className="list-disc pl-10 md:pl-12 space-y-2 mt-2">
                  {step.description.map((item, descIdx) => (
                    <li key={descIdx} className="font-secondary text-base md:text-lg text-zinc-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 