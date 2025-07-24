'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TemplateHero from './TemplateHero';
import TemplateSubHero from './TemplateSubHero';
import HowItWorks from './HowItWorks';
import TemplateWorking from './TemplateWorking'; // Import the new component
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import type { TemplateSubHeroData } from './TemplateSubHero';
import type { HowItWorksData } from './HowItWorks';
import type { TemplateWorkingData } from './TemplateWorking'; // Import the new data type
import type { TemplateHeroData } from './TemplateHero';

// ---------------------------------------------
// Sub-Hero (feature cards) – data fetched from Strapi
// ---------------------------------------------

// Default placeholder used as a fallback if the API doesn’t return data
const DEFAULT_SUB_HERO_DATA: TemplateSubHeroData = {
  heading: 'Why teams use our AI sales prospecting tools',
  subheading: 'Find, understand, and engage the right buyers in a few clicks.',
  features: [
    {
      icon: '/images/star.png',
      title: 'Instant Prospect Intelligence',
      description: 'Get a deep profile from just a LinkedIn URL',
      bgClass: 'bg-[#dff5ff]'
    },
    {
      icon: '/images/star.png',
      title: 'Automated Research',
      description: 'Save hours on manual prospecting and enrichment',
      bgClass: 'bg-[#e5deff]'
    },
    {
      icon: '/images/star.png',
      title: 'Smarter Outreach',
      description: 'Personalization snippets tailored to each buyer',
      bgClass: 'bg-[#fff4ed]'
    }
  ]
};

// Define default "How it Works" section content (used as a fallback)
const DEFAULT_HOW_IT_WORKS_DATA: HowItWorksData = {
  heading: 'How it Works',
  steps: [
    {
      title: 'Drop a LinkedIn link in Slack',
      code: '/prospect https://linkedin.com/in/johnsmith',
      description: []
    },
    {
      title: 'Let the agent do the digging',
      description: [
        'Job title, company, ICP fit',
        'LinkedIn activity, tech stack, recent news',
        'Buying signals & suggested next steps'
      ]
    },
    {
      title: 'Get your Deep Dive in Slack',
      description: [
        'Personalised intel and copy',
        'Save to CRM or kick off multi-channel outreach'
      ]
    }
  ]
};

// Default "TemplateWorking" section content (used as a fallback)
const DEFAULT_TEMPLATE_WORKING_DATA: TemplateWorkingData = {
  heading: 'Working',
  items: [
    {
      title: '1. Trigger',
      description: 'Paste a LinkedIn URL or CRM lead in Slack (e.g., /prospect https://linkedin.com/in/johnsmith). This kickstarts the AI workflow automatically.'
    },
    {
      title: '2. Extract & Enrich',
      description: 'The agent pulls key info like name, title, company, tech stack. Then enriches it using LinkedIn activity, news mentions, funding data, and more.'
    },
    {
      title: '3. Detect Buying Signals',
      description: 'It analyzes recent triggers like onboarding hires, product launches, or social engagement spikes—identifying prospects ready to engage.'
    },
    {
      title: '4. Deliver Output in Slack',
      description: 'Get a full prospect briefing right in Slack: TL;DR summary, intent insights, messaging snippets, and ready-to-act CTAs—all available per command.'
    }
  ]
};

// Default FAQ data used as a fallback if the CMS returns no items or the request fails
const DEFAULT_FAQ_DATA = [
  {
    id: 1,
    question: 'What is nRev?',
    answer:
      'nRev is an AI-powered platform that helps sales teams with prospecting by providing deep insights into potential customers.'
  },
  {
    id: 2,
    question: 'How does the AI work?',
    answer:
      'Our AI analyzes LinkedIn profiles and other public data to generate comprehensive prospect profiles, identify buyer intent, and suggest personalized outreach messages.'
  },
  {
    id: 3,
    question: 'Is it integrated with Slack?',
    answer:
      'Yes, nRev is designed to work seamlessly inside Slack. You can initiate prospecting and receive reports without leaving your workspace.'
  },
  {
    id: 4,
    question: 'Can I customize the research?',
    answer:
      'While the initial research is automated, we are working on features to allow for more customized research queries based on your specific needs.'
  }
];

export default function TemplateInfoPage() {
  // Base URL for Strapi API
  const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "";

  // State to hold hero section content fetched from Strapi
  const [heroData, setHeroData] = useState<TemplateHeroData | null>(null);

  // State to hold sub-hero section content fetched from Strapi
  const [subHeroData, setSubHeroData] = useState<TemplateSubHeroData | null>(null);

  // State to hold "How it Works" section content fetched from Strapi
  const [howItWorksData, setHowItWorksData] = useState<HowItWorksData | null>(null);

  // State to hold "Working" section content fetched from Strapi
  const [templateWorkingData, setTemplateWorkingData] = useState<TemplateWorkingData | null>(null);

  // State to hold FAQ content fetched from Strapi
  const [faqData, setFaqData] = useState<Array<{ id: number; question: string; answer: string }>>([]);

  // Fetch hero section data on component mount
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${process.env.NEXT_PUBLIC_PLAYS_PAGE_HERO_ENDPOINT}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const item = data.data?.[0];
        if (!item) return;

        // Strapi v4 usually nests fields under `attributes`, but sometimes they are at top-level
        const attrs: Record<string, any> = item.attributes ?? item;

        setHeroData({
          title: attrs.title ?? 'Untitled',
          subtitle: attrs.subtitle ?? '',
        });
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  // Fetch Sub-Hero data on component mount
  useEffect(() => {
    const fetchSubHeroData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${process.env.NEXT_PUBLIC_PLAYS_PAGE_SUB_HERO_ENDPOINT}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const item = data.data?.[0];
        if (!item) return; // keep placeholder if no data

        // Strapi v4 usually nests fields under `attributes`
        const attrs: Record<string, any> = item.attributes ?? item;

        // Hard-coded background colours – we *ignore* any bgClass from CMS
        const BG_CLASSES = ['bg-[#dff5ff]', 'bg-[#e5deff]', 'bg-[#fff4ed]'];

        const parsedFeatures = Array.isArray(attrs.features)
          ? attrs.features.map((feat: Record<string, any>, idx: number) => ({
              icon: feat.icon ?? '/images/star.png',
              title: feat.title ?? 'Untitled',
              description: feat.description ?? '',
              bgClass: BG_CLASSES[idx % BG_CLASSES.length]
            }))
          : DEFAULT_SUB_HERO_DATA.features;

        setSubHeroData({
          heading: attrs.heading ?? DEFAULT_SUB_HERO_DATA.heading,
          subheading: attrs.subheading ?? DEFAULT_SUB_HERO_DATA.subheading,
          features: parsedFeatures
        });
      } catch (error) {
        console.error('Error fetching sub-hero data:', error);
      }
    };

    fetchSubHeroData();
  }, []);

  // Fetch "How it Works" data on component mount
  useEffect(() => {
    const fetchHowItWorksData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${process.env.NEXT_PUBLIC_PLAYS_PAGE_HOW_IT_WORKS_ENDPOINT}`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const item = data.data?.[0];

        // If no CMS data, fall back to the default
        if (!item) {
          setHowItWorksData(DEFAULT_HOW_IT_WORKS_DATA);
          return;
        }

        // Strapi v4 usually nests fields under `attributes`
        const attrs: Record<string, any> = item.attributes ?? item;

        // Parse steps coming from CMS
        const parsedSteps = Array.isArray(attrs.steps)
          ? attrs.steps.map((step: Record<string, any>) => ({
              title: step.title ?? 'Untitled',
              // Ensure description is always an array of strings
              description: Array.isArray(step.description)
                ? step.description
                : typeof step.description === 'string'
                ? [step.description]
                : [],
              code: step.code ?? undefined
            }))
          : DEFAULT_HOW_IT_WORKS_DATA.steps;

        setHowItWorksData({
          heading: attrs.heading ?? DEFAULT_HOW_IT_WORKS_DATA.heading,
          steps: parsedSteps
        });
      } catch (error) {
        console.error('Error fetching "How it Works" data:', error);
        setHowItWorksData(DEFAULT_HOW_IT_WORKS_DATA);
      }
    };

    fetchHowItWorksData();
  }, []);

  // Fetch "Working" section data on component mount
  useEffect(() => {
    const fetchWorkingData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${process.env.NEXT_PUBLIC_PLAYS_PAGE_WORKING_ENDPOINT}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const item = data.data?.[0];

        // If no CMS data, fall back to the default
        if (!item) {
          setTemplateWorkingData(DEFAULT_TEMPLATE_WORKING_DATA);
          return;
        }

        // Strapi v4 usually nests fields under `attributes`
        const attrs: Record<string, any> = item.attributes ?? item;

        // Parse items coming from CMS
        const parsedItems = Array.isArray(attrs.items)
          ? attrs.items.map((itm: Record<string, any>) => ({
              title: itm.title ?? 'Untitled',
              description: itm.description ?? ''
            }))
          : DEFAULT_TEMPLATE_WORKING_DATA.items;

        setTemplateWorkingData({
          heading: attrs.heading ?? DEFAULT_TEMPLATE_WORKING_DATA.heading,
          items: parsedItems
        });
      } catch (error) {
        console.error('Error fetching "Working" data:', error);
        setTemplateWorkingData(DEFAULT_TEMPLATE_WORKING_DATA);
      }
    };

    fetchWorkingData();
  }, []);

  // Fetch FAQ data on component mount
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${process.env.NEXT_PUBLIC_PLAYS_PAGE_FAQ_ENDPOINT}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const items = data.data;

        if (!Array.isArray(items) || items.length === 0) {
          // If CMS has no items, use default data
          setFaqData(DEFAULT_FAQ_DATA);
          return;
        }

        const parsedFaqs = items.map((item: Record<string, any>) => {
          const attrs: Record<string, any> = item.attributes ?? item;
          return {
            id: item.id ?? attrs.id ?? Math.random(),
            question: attrs.question ?? 'Untitled',
            answer: attrs.answer ?? ''
          };
        });

        setFaqData(parsedFaqs);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
        // Fall back to default FAQ data if request fails
        setFaqData(DEFAULT_FAQ_DATA);
      }
    };

    fetchFaqData();
  }, []);

  // Simple scroll helper shared by header and footer navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar scrollToSection={scrollToSection} hideNavItems={true} />

      {/* Hero Section */}
      {heroData && (
        <div id="hero-section">
          <TemplateHero data={heroData} className="mt-[72px]" />
        </div>
      )}

      {/* Sub-Hero Section */}
      {subHeroData ? (
        <div id="sub-hero-section">
          <TemplateSubHero data={subHeroData} className="mt-20" />
        </div>
      ) : null}

      {/* How it Works Section */}
      <div id="how-it-works-section">
        {howItWorksData && (
          <HowItWorks data={howItWorksData} className="mt-20" />
        )}
      </div>

      {/* TemplateWorking Section */}
      {templateWorkingData && (
        <div id="working-section">
          <TemplateWorking data={templateWorkingData} className="mt-20" />
        </div>
      )}

      {/* FAQ Section */}
      <FAQSection faqData={faqData} className="mt-20" />

      {/* Placeholder for additional page content */}
      <div className="flex-grow" />

      {/* CTA Section */}
      <CTASection className="mt-20" />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* Style override for FAQ heading */}
      <style jsx global>{`
        /* Ensure the "Frequently Asked Questions" title is left-aligned with the required styles */
        #faqs > div > div > div:first-child,
        #faqs > div > div > div:first-child p {
          text-align: left !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 28px !important; /* mobile */
          font-weight: 800 !important;
          letter-spacing: 0.15px !important;
        }

        /* Ensure the "Working" title is left-aligned with the required styles */
        #working-section h2 {
          text-align: left !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 28px !important; /* mobile */
          font-weight: 800 !important;
          letter-spacing: 0.15px !important;
        }

        /* Ensure the "How it Works" title is left-aligned with the required styles */
        #how-it-works-section h2 {
          text-align: left !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 28px !important; /* mobile */
          font-weight: 800 !important;
          letter-spacing: 0.15px !important;
        }

        /* Style overrides for Sub-Hero section */
        #sub-hero-section h2 {
          text-align: left !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 28px !important; /* mobile */
          font-weight: 800 !important;
          letter-spacing: 0.15px !important;
        }

        #sub-hero-section header > p {
          text-align: left !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 18px !important; /* mobile */
          font-weight: 400 !important;
          letter-spacing: 0.15px !important;
        }

        /* Style overrides for Hero section */
        #hero-section h1 {
          text-align: left !important;
          font-family: 'Mulish', sans-serif !important;
          font-size: 32px !important; /* mobile */
          font-style: normal !important;
          font-weight: 700 !important;
          letter-spacing: 0.15px !important;
        }

        #hero-section p {
          text-align: left !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 16px !important; /* mobile */
          font-style: normal !important;
          font-weight: 400 !important;
          line-height: normal !important;
          letter-spacing: 0.15px !important;
        }

        /* Tablet (≥640px) overrides */
        @media (min-width: 640px) {
          #hero-section h1 {
            font-size: 48px !important;
          }
          #hero-section p {
            font-size: 20px !important;
          }
          #sub-hero-section h2,
          #how-it-works-section h2,
          #working-section h2,
          #faqs > div > div > div:first-child,
          #faqs > div > div > div:first-child p {
            font-size: 32px !important;
          }
          #sub-hero-section header > p {
            font-size: 20px !important;
          }
        }

        /* Desktop (≥1024px) overrides */
        @media (min-width: 1024px) {
          #hero-section h1 {
            font-size: 56px !important;
          }
          #hero-section p {
            font-size: 24px !important;
          }
          #sub-hero-section h2,
          #how-it-works-section h2,
          #working-section h2,
          #faqs > div > div > div:first-child,
          #faqs > div > div > div:first-child p {
            font-size: 36px !important;
          }
          #sub-hero-section header > p {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}