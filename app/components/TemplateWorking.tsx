
"use client";

import React from "react";
import Image from "next/image";

/**
 * Defines the data structure for a single item in the "Working" section.
 */
export interface TemplateWorkingItem {
  title: string;
  description: string;
}

/**
 * Defines the overall data structure for the TemplateWorking component.
 */
export interface TemplateWorkingData {
  heading: string;
  items: TemplateWorkingItem[];
}

interface TemplateWorkingProps {
  data: TemplateWorkingData;
  /** Optional additional class names for the outer wrapper */
  className?: string;
}

export default function TemplateWorking({ data, className }: TemplateWorkingProps) {
  const { heading, items } = data;

  return (
    <section className={`w-full ${className ?? ""}`.trim()}>
      {/* Shared container to align with other sections */}
      <div className="w-full max-w-[1412px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Section heading */}
        <h2 className="font-primary font-bold tracking-tight text-zinc-900 leading-tight text-3xl md:text-5xl lg:text-6xl">
          {heading}
        </h2>

        {/* Main content area with dotted background */}
        <div className="mt-10 rounded-2xl border border-[#E4E4E4] bg-[#F6F8FE] p-4 md:p-8 bg-[url('/images/dotter.png')] bg-repeat">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            {items.map((item, idx) => (
              <div className="w-full flex flex-col items-center" key={idx}>
                {/* Item card */}
                <div className="w-full bg-white shadow-md rounded-xl p-5 border border-gray-200">
                  <div className="bg-[#EBF9FF] rounded-lg p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-sans font-semibold text-lg text-[#0A5D73]">{item.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    </div>
                    {/* Placeholder for the three-dots menu icon */}
                    <div className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Connector arrow, not shown for the last item */}
                {idx < items.length - 1 && (
                  <div className="h-24 w-6">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 24 96"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M12 92L17 87M12 92L7 87"
                        stroke="#C2C2C2"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <line
                        x1="12"
                        y1="4"
                        x2="12"
                        y2="89"
                        stroke="#C2C2C2"
                        strokeWidth="3"
                      />
                      <circle cx="12" cy="4" r="4" fill="#C2C2C2" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 