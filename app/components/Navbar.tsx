'use client';

import React, { useState } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import svgPaths from "../../imports/svg-317vru4792";
import EarlyAccessButton from './EarlyAccessButton';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  showBackButton?: boolean;
  onBack?: () => void;
  scrollToSection: (sectionId: string) => void;
  hideNavItems?: boolean; // Add prop to hide nav items
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
  hideNavItems?: boolean; // Add prop to hide nav items
}

function MobileNav({ isOpen, onClose, scrollToSection, hideNavItems }: MobileNavProps) {
  const navItems = ["Templates", "Demo", "FAQs"];
  
  const handleNavClick = (item: string) => {
    const sectionId = item === "Templates" ? "templates" : item === "Demo" ? "demo" : "faqs";
    scrollToSection(sectionId);
    onClose();
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="bg-white border-l border-gray-200 w-[300px] p-0">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Access main navigation and get early access to nRev
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {!hideNavItems && (
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <button
                    key={item}
                    className="font-['Mulish:Medium',_sans-serif] font-medium text-[#15121c] text-[18px] text-left hover:text-[#666CFF] transition-colors py-2 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            )}
          </div>
          
          {/* Fixed Bottom Section */}
          <div className="flex-shrink-0 border-t border-gray-100 bg-white px-6 py-6">
            <EarlyAccessButton className="w-full" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const Navbar = ({ showBackButton = false, onBack, scrollToSection, hideNavItems = false }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogoClick = () => {
    if (showBackButton && onBack) {
      onBack();
    } else {
      router.push('/');
    }
  };

  return (
    <header className="bg-[#ffffff] fixed top-0 left-0 right-0 z-50 flex items-center justify-center border-b border-gray-100 shadow-sm">
      <div className="w-full max-w-[1412px] flex items-center justify-between px-6 md:px-12 lg:px-24 py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={onBack}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          
          <button 
            onClick={handleLogoClick}
            className="h-10 w-[109px] transition-transform hover:scale-105"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 40">
              <g id="nrev_logo 1">
                <path d={svgPaths.p174e6200} fill="#27272A" />
                <path d={svgPaths.p3e6e280} fill="#666CFF" />
                <path d={svgPaths.p2e878f00} fill="black" />
              </g>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 font-primary font-medium text-[#15121c] text-[14px] tracking-[-0.14px]">
          {!hideNavItems && ["Templates", "Demo", "FAQs"].map((item) => (
            <button 
              key={item}
              className="opacity-60 hover:opacity-100 hover:text-[#666CFF] transition-all duration-300"
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              <p className="adjustLetterSpacing leading-[24px] whitespace-pre">{item}</p>
            </button>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <EarlyAccessButton />
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center">
          {!hideNavItems ? (
            <div className="flex items-center gap-4">
              {/* Mobile CTA Button */}
              <EarlyAccessButton className="bg-[#1e1e1e] h-10 px-4 rounded-[10px]" />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2"
              >
                <Menu size={24} />
              </button>
            </div>
          ) : (
            /* When nav items are hidden, show only EarlyAccessButton in menu position */
            <EarlyAccessButton className="bg-[#1e1e1e] h-10 px-4 rounded-[10px]" />
          )}
        </div>

        {/* Only render MobileNav if we have nav items to show */}
        {!hideNavItems && (
          <MobileNav 
            isOpen={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)} 
            scrollToSection={scrollToSection}
            hideNavItems={hideNavItems}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar; 