'use client';

import React from 'react';
import { motion } from 'framer-motion';
import svgPaths from "../../imports/svg-317vru4792";

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#1e1e1e] relative w-full h-[180px] md:h-[222px] overflow-clip"
    >
      {/* Background Text - Full Width */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute flex flex-col font-['DM_Sans:Black',_sans-serif] justify-center left-[61.697%] right-[-19.023%] text-[200px] md:text-[296px] text-neutral-800 top-[50%] md:top-44 tracking-[1.14375px] translate-y-[-50%]">
          <p className="adjustLetterSpacing block leading-[80px] md:leading-[122px]">nRev</p>
        </div>
        <div className="absolute flex flex-col font-['DM_Sans:Black',_sans-serif] justify-center left-[300px] md:left-[372px] text-[280px] md:text-[419.375px] text-neutral-800 text-nowrap top-[300px] md:top-[469px] tracking-[1.14375px] translate-y-[-50%]">
          <p className="adjustLetterSpacing block leading-[80px] md:leading-[122px] whitespace-pre">nRev</p>
        </div>
      </div>
      
      {/* Footer Content - Max Width Container */}
      <div className="relative h-full flex justify-center">
        <div className="w-full max-w-[1412px] px-6 md:px-12 lg:px-24 pt-8 md:pt-12">
          <div className="flex flex-col gap-4 md:gap-8">
            {/* Logo and Navigation */}
            <div className="flex items-center justify-between w-full">
              {/* Footer Logo */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-[6.288px]"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="size-12 md:size-16">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
                    <g id="nrev_logo 1">
                      <path d={svgPaths.p463b400} fill="var(--fill-0, white)" id="Vector" />
                      <path d={svgPaths.p1b53ec00} fill="var(--fill-0, #666CFF)" id="Vector_2" />
                    </g>
                  </svg>
                </div>
              </motion.button>
              
              {/* Footer Navigation */}
              <div className="hidden md:flex gap-8 lg:gap-14 h-5 items-start font-['Mulish:Regular',_sans-serif] font-normal text-[#ffffff] text-[14px] md:text-[16px] tracking-[0.15px]">
                {["Template", "Demo", "FAQ"].map((item) => {
                  const sectionId = item === "Template" ? "templates" : item === "Demo" ? "demo" : "faqs";
                  return (
                    <motion.button 
                      key={item}
                      whileHover={{ scale: 1.05, color: "#666CFF" }}
                      className="hover:opacity-80 transition-all duration-300"
                      onClick={() => scrollToSection(sectionId)}
                    >
                      <p className="adjustLetterSpacing block leading-normal text-nowrap whitespace-pre">{item}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            
            {/* Divider Line */}
            <div className="h-px w-full bg-[#616161]" />
            
            {/* Copyright and Social Links */}
            <div className="flex items-center justify-between w-full font-['Mulish:Regular',_sans-serif] font-normal text-[#ffffff] text-[12px] md:text-[16px] tracking-[0.15px]">
              <div>
                <p className="adjustLetterSpacing block leading-normal text-nowrap whitespace-pre">© 2024 nRev.ai All rights reserved.</p>
              </div>
              <motion.a 
                href="https://linkedin.com/company/nrev" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, color: "#666CFF" }}
                className="hover:opacity-80 transition-all duration-300"
              >
                <p className="adjustLetterSpacing block leading-normal text-nowrap whitespace-pre">LinkedIn</p>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 