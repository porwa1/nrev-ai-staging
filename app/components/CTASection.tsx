"use client";

import React from 'react';
import Image from 'next/image';
import EarlyAccessButton from './EarlyAccessButton';

export default function CTASection({ className }: { className?: string }) {
  return (
    <section className={`w-full bg-[#FFF0E8] py-16 md:py-20 ${className ?? ''}`.trim()}>
      <div className="w-full max-w-[1412px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <Image
                src="/images/cta-logo.png"
                alt="nRev Logo"
                width={90}
                height={90}
                className="rounded-[20px]"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E0E62] font-primary tracking-tight">
                Start Working Faster Right Now
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-[#212121] font-secondary mt-2">
                Lookback is free to try for 14 days
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <EarlyAccessButton />
          </div>
        </div>
      </div>
    </section>
  );
} 