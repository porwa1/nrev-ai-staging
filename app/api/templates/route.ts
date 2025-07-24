import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// **************************************************
//          THIS IS CHAT TEMPLATE API
// **************************************************



// Template data structure (keep for fallback)
const allTemplates = [
    {
      "id": 1,
      "title": "Prospect360 Insights",
      "description": "Profiles prospects from multi\u2011source data for personalised outreach.",
      "category": "Prospecting",
      "tags": ["Prospecting"]
    },
    {
      "id": 2,
      "title": "Stakeholder Mapper",
      "description": "Maps decision makers and enriches CRM automatically.",
      "category": "Stakeholder Intelligence",
      "tags": [
        "Stakeholder Intelligence"
      ]
    },
    {
      "id": 3,
      "title": "Intent Signal Scout",
      "description": "Flags accounts with funding, hiring or news intent spikes.",
      "category": "Intent Signals",
      "tags": [
        "Intent Signals"
      ]
    },
    {
      "id": 4,
      "title": "LinkedIn Warmer",
      "description": "Auto\u2011engages prospects on LinkedIn to build rapport pre\u2011pitch.",
      "category": "Social Selling",
      "tags": [
        "Social Selling",
        "Outreach Automation"
      ]
    },
    {
      "id": 5,
      "title": "Signal\u2011Based Prioritizer",
      "description": "Ranks prospects by hires, tech stack, and news signals.",
      "category": "Intent Signals",
      "tags": [
        "Intent Signals",
        "Prospecting"
      ]
    },
    {
      "id": 6,
      "title": "Social Listener",
      "description": "Captures LinkedIn topic conversations relevant to ICP.",
      "category": "Intent Signals",
      "tags": [
        "Intent Signals",
        "Social Selling"
      ]
    },
    {
      "id": 7,
      "title": "Competitor Pulse Monitor",
      "description": "Alerts on competitor launches, campaigns and social engagement.",
      "category": "Competitive Intelligence",
      "tags": [
        "Competitive Intelligence"
      ]
    },
    {
      "id": 8,
      "title": "Deal Intel AMA",
      "description": "Aggregates 1P + 3P data to answer deal questions instantly.",
      "category": "Deal Intelligence",
      "tags": [
        "Deal Intelligence"
      ]
    },
    {
      "id": 9,
      "title": "Calendar Contact Sync",
      "description": "Creates CRM contacts from every meeting attendee automatically.",
      "category": "Data Hygiene",
      "tags": [
        "Data Hygiene"
      ]
    },
    {
      "id": 10,
      "title": "Email Contact Sync",
      "description": "Converts email correspondents to CRM contacts on send/receive.",
      "category": "Data Hygiene",
      "tags": [
        "Data Hygiene"
      ]
    },
    {
      "id": 11,
      "title": "Opportunity Research Enricher",
      "description": "Adds external research summaries to open opportunities.",
      "category": "Deal Intelligence",
      "tags": [
        "Deal Intelligence"
      ]
    },
    {
      "id": 12,
      "title": "Opportunity Pulse Watcher",
      "description": "Monitors stakeholders and news for high\u2011value opportunities.",
      "category": "Stakeholder Intelligence",
      "tags": [
        "Stakeholder Intelligence",
        "Deal Intelligence"
      ]
    },
    {
      "id": 13,
      "title": "Inbound Auto\u2011Qualifier",
      "description": "Scores and qualifies inbound leads using rule\u2011based criteria.",
      "category": "Prospecting",
      "tags": [
        "Prospecting"
      ]
    },
    {
      "id": 14,
      "title": "ICP Lead Router",
      "description": "Automatically assigns ICP\u2011matched leads to correct owner.",
      "category": "Lead Routing",
      "tags": [
        "Lead Routing"
      ]
    },
    {
      "id": 15,
      "title": "Personalized Outreach Engine",
      "description": "Crafts and sends context\u2011rich emails at scale.",
      "category": "Outreach Automation",
      "tags": [
        "Outreach Automation"
      ]
    },
    {
      "id": 16,
      "title": "Win/Loss Pattern Finder",
      "description": "Detects patterns in won vs. lost deals.",
      "category": "Deal Intelligence",
      "tags": [
        "Deal Intelligence"
      ]
    },
    {
      "id": 17,
      "title": "Look\u2011alike Account Finder",
      "description": "Surfaced accounts mirroring best\u2011customer attributes.",
      "category": "Prospecting",
      "tags": [
        "Prospecting"
      ]
    },
    {
      "id": 18,
      "title": "Champion Tracker",
      "description": "Alerts when key contacts change jobs or roles.",
      "category": "Stakeholder Intelligence",
      "tags": [
        "Stakeholder Intelligence"
      ]
    },
    {
      "id": 19,
      "title": "Email Pattern Analyzer",
      "description": "Analyzes open/reply patterns to optimize messaging.",
      "category": "Outreach Automation",
      "tags": [
        "Outreach Automation"
      ]
    },
    {
      "id": 20,
      "title": "Competitor Deal Radar",
      "description": "Spots accounts where competitor reps are active.",
      "category": "Competitive Intelligence",
      "tags": [
        "Competitive Intelligence",
        "Deal Intelligence"
      ]
    },
    {
      "id": 21,
      "title": "Smart Lead Router",
      "description": "Applies rule\u2011based assignment for unowned leads.",
      "category": "Lead Routing",
      "tags": [
        "Lead Routing"
      ]
    },
    {
      "id": 22,
      "title": "Product\u2011Touchpoint Mailer",
      "description": "Triggers emails on specific in\u2011app user actions.",
      "category": "PLG & Activation",
      "tags": [
        "PLG & Activation",
        "Outreach Automation"
      ]
    },
    {
      "id": 23,
      "title": "LinkedIn Follow\u2011up Reminder",
      "description": "Nudges reps to reconnect post\u2011outreach on LinkedIn.",
      "category": "Social Selling",
      "tags": [
        "Social Selling",
        "Outreach Automation"
      ]
    },
    {
      "id": 24,
      "title": "Warm Intro Finder",
      "description": "Finds mutual connections for warm introductions.",
      "category": "Prospecting",
      "tags": [
        "Prospecting",
        "Social Selling"
      ]
    },
    {
      "id": 25,
      "title": "PLG Activation Prioritizer",
      "description": "Scores users and nudges them toward activation milestones.",
      "category": "PLG & Activation",
      "tags": [
        "PLG & Activation"
      ]
    }
];

// Add interfaces for better type safety
interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

interface SearchableTemplate extends Template {
  searchText: string;
}

interface ScoredTemplate extends SearchableTemplate {
  score: number;
}

// Update the pre-compute section with proper types
const templateSearchData: SearchableTemplate[] = allTemplates.map(template => ({
  ...template,
  searchText: [
    template.title,
    template.description,
    template.category,
    ...template.tags
  ].join(' ').toLowerCase()
}));

// Keyword importance weights
const keywordWeights = {
  title: 3,
  description: 2,
  category: 2,
  tags: 2
};

// Update the getTemplateScore function with proper types
function getTemplateScore(template: SearchableTemplate, keywords: string[]): number {
  let score = 0;
  const searchText = template.searchText;

  for (const keyword of keywords) {
    if (!keyword) continue;
    
    // Title match (highest weight)
    if (template.title.toLowerCase().includes(keyword)) {
      score += keywordWeights.title;
    }
    
    // Description match
    if (template.description.toLowerCase().includes(keyword)) {
      score += keywordWeights.description;
    }
    
    // Category match
    if (template.category.toLowerCase().includes(keyword)) {
      score += keywordWeights.category;
    }
    
    // Tags match
    if (template.tags.some((tag: string) => tag.toLowerCase().includes(keyword))) {
      score += keywordWeights.tags;
    }
    
    // General content match
    if (searchText.includes(keyword)) {
      score += 1;
    }
  }

  return score;
}

// Helper to fetch templates from Strapi CMS
async function fetchTemplatesFromCMS(): Promise<Template[] | null> {
  try {
    const endpoint =
      process.env.NEXT_PUBLIC_HOMEPAGE_CARDS_ENDPOINT ||
      "/api/home-page-cards?populate=*";
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();

    // Adapt this mapping to your Strapi response structure
    if (!data || !Array.isArray(data.data)) return null;
    return data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes?.title || "",
      description: item.attributes?.description || "",
      category: item.attributes?.category || "",
      tags: Array.isArray(item.attributes?.tags)
        ? item.attributes.tags
        : [],
    }));
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Try to fetch templates from CMS, fallback to hardcoded
    let templates: Template[] | null = await fetchTemplatesFromCMS();
    if (!templates || templates.length === 0) {
      templates = allTemplates;
    }

    // Prepare search data
    const templateSearchData: SearchableTemplate[] = templates.map(template => ({
      ...template,
      searchText: [
        template.title,
        template.description,
        template.category,
        ...template.tags
      ].join(' ').toLowerCase()
    }));

    // Extract meaningful keywords from the prompt
    const keywords = prompt.toLowerCase()
      .split(/[\s,.-]+/)
      .filter((word: string) => word.length > 2)
      .slice(0, 5);

    // Score and rank templates
    const scoredTemplates: ScoredTemplate[] = templateSearchData
      .map(template => ({
        ...template,
        score: getTemplateScore(template, keywords)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // If we don't have enough relevant templates, add more from the start
    while (scoredTemplates.length < 3 && scoredTemplates.length < templates.length) {
      const nextTemplate = templates[scoredTemplates.length];
      if (!scoredTemplates.find(t => t.id === nextTemplate.id)) {
        const searchableTemplate: SearchableTemplate = {
          ...nextTemplate,
          searchText: [
            nextTemplate.title,
            nextTemplate.description,
            nextTemplate.category,
            ...nextTemplate.tags
          ].join(' ').toLowerCase()
        };
        scoredTemplates.push({
          ...searchableTemplate,
          score: 0
        });
      }
    }

    // Remove the score and searchText properties before sending
    const recommendedTemplates: Template[] = scoredTemplates.map(({ score, searchText, ...template }) => template);

    return NextResponse.json({ recommendedTemplates });

  } catch (error) {
    console.error('Template API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get template recommendations' },
      { status: 500 }
    );
  }
} 