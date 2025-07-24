'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Image from 'next/image';

interface EarlyAccessModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ open, onClose, children }) => {
  // Ensure this component only renders on the client and after the DOM is mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
      {/* Modal Container - 70% of screen width */}
      <div className="relative w-[95vw] md:w-[85vw] lg:w-[70vw] max-w-[1316px] bg-white rounded-[20px] flex overflow-hidden shadow-2xl">
        {/* Left Image Section - 35% width, hidden on mobile/tablet */}
        <div className="hidden lg:block w-[35%] min-h-[400px] relative">
          <Image
            src="/images/elements.png"
            alt="Early Access Modal Art"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right Content Section - 65% width (or full on mobile) */}
        <div className="flex-1 p-6 md:p-10 lg:p-16 relative flex flex-col justify-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>

          {/* Content Container - centered with max width */}
          <div className="w-full max-w-[497px] mx-auto space-y-8">
            {/* Title */}
            <h2 className="font-primary font-bold text-[32px] md:text-[40px] leading-[1.2] text-[#1E1E1E]">
              Reserve Your Seat at Launch
            </h2>

            {/* Description */}
            <p className="font-secondary text-[16px] md:text-[18px] leading-[1.6] text-[#666666]">
              Join our waitlist to get early access to nRev and be among the first to experience our innovative solution.
            </p>

            {/* Form Content */}
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EarlyAccessModal; 