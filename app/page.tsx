'use client';

import React, { useState ,useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ChatPage from './components/ChatPage';
import TemplateInfoPage from './components/TemplateInfoPage';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import svgPaths from "../imports/svg-317vru4792";
import modalSvgPaths from "../imports/svg-by0sc1nl7p";
import EarlyAccessModal from './components/EarlyAccessModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import TemplateCard, { Template, TemplateCardGrid } from './components/TemplateCard';
import FAQSection from './components/FAQSection';
import { useRouter } from 'next/navigation';

// Placeholder static images (add real ones in /public/images later)
const imgImage390 = "/images/demo.png";
const imgFrame1000003920 = "/images/heroimage.png";
const imgImage388 = "/images/1.png";
const imgImage389 = "/images/video.png";

// Add your YouTube video URL here - make sure it's the embed URL
const VIDEO_URL = "https://www.youtube.com/embed/g8T-QHtGlkA?si=Ezm3y3eYBdVgvbRq";

// const templateData: Template[] = [
//   {
//     id: 1,
//     title: "Build Your Own Gong",
//     description: "Complete guide to building a conversation intelligence platform",
//     category: "Lead Prospecting",
//     tags: ["Sales", "Playbook"],
//     imageurl: "/images/1.png"
//   },
//   {
//     id: 2,
//     title: "Smart Lead Scoring",
//     description: "Automate lead qualification with AI-powered scoring algorithms",
//     category: "Lead Prospecting",
//     tags: ["Sales", "AI"],
//     imageurl: "/images/1.png"
//   },
//   {
//     id: 3,
//     title: "Deal Pipeline Automation",
//     description: "Streamline your sales process from lead to close",
//     category: "Deal Execution",
//     tags: ["Sales", "Pipeline"],
//     imageurl: "/images/1.png"
//   },
//   {
//     id: 4,
//     title: "Customer Health Monitoring",
//     description: "Proactive customer success management and retention strategies",
//     category: "Customer Retention",
//     tags: ["Support", "Analytics"],
//     imageurl: "/images/1.png"
//   },
//   {
//     id: 5,
//     title: "Automated Follow-ups",
//     description: "Never miss a follow-up with intelligent scheduling",
//     category: "Deal Execution",
//     tags: ["Sales", "Automation"],
//     imageurl: "/images/1.png"
//   }
// ];

const categories = ["All templates", "Prospecting", "Stakeholder Intelligence", "Intent Signals", "Social Selling", "Outreach Automation", "Competitive Intelligence", "Deal Intelligence", "Data Hygiene", "Lead Routing", "PLG and Activation"];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Insert environment variable constants just after imports so they are available throughout the file
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "";
const HOMEPAGE_CARDS_ENDPOINT = process.env.NEXT_PUBLIC_HOMEPAGE_CARDS_ENDPOINT ?? "/api/home-page-cards?populate=*";
const HOMEPAGE_FAQ_ENDPOINT = process.env.NEXT_PUBLIC_HOMEPAGE_FAQ_ENDPOINT ?? "/api/home-page-faqs?populate=*";

export default function App() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All templates");
  const [automationInput, setAutomationInput] = useState("");
  const [currentPage, setCurrentPage] = useState<'landing' | 'chat' | 'template-info'>('landing');
  const [chatInitialMessage, setChatInitialMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templateData[0] | null>(null);
  const [showInputError, setShowInputError] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [templateData, setTemplateData] = useState<Template[]>([]);
  const [faqData, setFaqData] = useState<Array<{id: number; question: string; answer: string}>>([]);
  // Note: removed hardcoded URL constant; API endpoints now pulled from env vars.

  // useEffect to fetch template data
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${HOMEPAGE_CARDS_ENDPOINT}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
        const data = await response.json();
        console.log("Fetched data:", data);
  
        if (!Array.isArray(data.data)) {
          console.error("Unexpected response format", data);
          return;
        }
  
        const formattedTemplateData: Template[] = data.data.map((item: any) => ({
          id: item.id,
          title: item.title || 'Untitled',
          description: item.description?.[0]?.children?.[0]?.text || '',
          category: item.category || 'Uncategorized',
          tags: item.tags || [],
          imageurl: item.imageurl
            ? `${API_BASE_URL}${item.imageurl}`
            : '/images/1.png',
        }));
  
        setTemplateData(formattedTemplateData);
        console.log("Formatted Template Data:", formattedTemplateData);
      } catch (error) {
        console.error("Error fetching homepage cards:", error);
      }
    };
  
    fetchTemplateData();
  }, []);

  // useEffect to fetch FAQ data
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        // Fetch FAQs with populated fields so that `question` and `answer` are included inside `attributes`
        const response = await fetch(`${API_BASE_URL}${HOMEPAGE_FAQ_ENDPOINT}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log("Fetched FAQ data:", data);

        if (!Array.isArray(data.data)) {
          console.error("Unexpected FAQ response format", data);
          return;
        }

        // Strapi v4 nests actual field values under `attributes`. Fall back to top-level keys just in case
        const formattedFaqData = data.data.map((item: any) => {
          const attrs = item.attributes ?? {};
          return {
            id: item.id,
            question: attrs.question ?? attrs.Question ?? item.question ?? 'Untitled Question',
            answer: attrs.answer ?? attrs.Answer ?? item.answer ?? 'No answer provided',
          };
        });

        setFaqData(formattedFaqData);
        console.log("Formatted FAQ Data:", formattedFaqData);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFaqData();
  }, []);
  
  

  const filteredTemplates = selectedCategory === "All templates" 
    ? templateData 
    : templateData.filter(template => template.category === selectedCategory);

  const handleSendAutomation = () => {
    if (automationInput.trim()) {
      router.push(`/chat?initial=${encodeURIComponent(automationInput)}`);
      setAutomationInput("");
      setShowInputError(false);
    } else {
      setShowInputError(true);
      // Clear error after 3 seconds
      setTimeout(() => setShowInputError(false), 3000);
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setChatInitialMessage("");
    setSelectedTemplate(null);
  };

  const handleTemplateClick = (template: typeof templateData[0]) => {
    router.push(`/plays?id=${encodeURIComponent(template.id)}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show chat page if user navigated to it
  if (currentPage === 'chat') {
    return <ChatPage initialMessage={chatInitialMessage} onBack={handleBackToLanding} />;
  }

  // Show template info page if user navigated to it
  if (currentPage === 'template-info' && selectedTemplate) {
    return <TemplateInfoPage />;
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col" data-name="Product page">
      {/* Replace old header with new Navbar */}
      <Navbar 
        showBackButton={false}
        scrollToSection={scrollToSection}
      />

      {/* Add a spacer div to prevent content from hiding under fixed header */}
      <div className="h-[72px]"></div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-[1412px]">
      {/* ============ HERO SECTION ============ */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-[3%] md:mx-[6.566%] mt-4 md:mt-8 mb-16 md:mb-32"
      >
        <div className="bg-center bg-cover bg-no-repeat h-[500px] md:h-[685px] rounded-[20px] md:rounded-[40px] relative" style={{ backgroundImage: `url('${imgFrame1000003920}')` }}>
          <div className="absolute left-[8%] md:left-[16.929%] right-[8%] md:right-[16.929%] top-[80px] md:top-[136px] flex flex-col gap-6 md:gap-10 items-center">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-[22px] items-center w-full"
            >
              <div className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[#000000] text-[28px] md:text-[36px] lg:text-[48px] text-center w-full px-4">
                <p className="block leading-normal">What would you like to automate in your GTM funnel?</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-2 items-center w-full"
            >
              <div 
                className="bg-[#ffffff] h-[150px] md:h-[186px] max-w-[90%] md:max-w-[624px] min-w-[300px] md:min-w-[344px] relative rounded-[20px] md:rounded-[32px] w-full" 
                data-name="Frame"
              >
                <div className="max-w-inherit min-w-inherit overflow-clip relative size-full">
                  <div className="flex flex-col h-[150px] md:h-[186px] justify-between max-w-inherit min-w-inherit pb-3 md:pb-4 pl-4 md:pl-7 pr-3 md:pr-5 pt-3 relative w-full">
                    <textarea
                      value={automationInput}
                      onChange={(e) => {
                        setAutomationInput(e.target.value);
                        if (showInputError) setShowInputError(false);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendAutomation();
                        }
                      }}
                      placeholder="Describe your process briefly"
                      className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] md:leading-[24px] text-[14px] md:text-[16px] text-zinc-400 tracking-[0.15px] w-full h-full resize-none border-none outline-none bg-transparent focus:outline-none"
                      style={{ color: automationInput ? '#000000' : '#9CA3AF' }}
                    />
                    <div className="flex flex-col gap-2 items-end w-full">
                      <motion.button
                        onClick={handleSendAutomation}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#1e1e1e] flex flex-row gap-1.5 items-center justify-center overflow-clip px-3 md:px-4 py-2 rounded-xl hover:bg-opacity-90 transition-all cursor-pointer"
                        data-name="Button"
                      >
                        <div className="overflow-clip relative size-4 md:size-5" data-name="startContent">
                          <div className="absolute bottom-[9.683%] left-[10.463%] right-[9.655%] top-[10.435%]" data-name="Vector">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path d={svgPaths.p3675f800} fill="white" id="Vector" />
                            </svg>
                          </div>
                        </div>
                        <div className="font-['Mulish:Bold',_sans-serif] font-bold text-[#ffffff] text-[12px] md:text-[14px] tracking-[-0.28px]">
                          <p className="adjustLetterSpacing block leading-[22px] whitespace-pre">Send</p>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className={`absolute border border-solid inset-0 pointer-events-none rounded-[20px] md:rounded-[32px] shadow-[0px_4px_8px_-2px_rgba(23,23,23,0.1),0px_2px_4px_-2px_rgba(23,23,23,0.06)] transition-colors duration-300 ${
                  showInputError ? 'border-red-400' : 'border-slate-300'
                }`} />
                {showInputError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -bottom-8 left-4 text-red-500 text-sm font-['Inter:Regular',_sans-serif]"
                  >
                    Please describe what you'd like to automate
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ============ FEATURED TEMPLATES SECTION ============ */}
      <motion.section 
        id="templates"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-[6%] md:mx-[6.667%] mb-16 md:mb-32"
      >
        <div className="flex flex-col gap-16 md:gap-[113px] items-center w-full">
          <div className="flex flex-col gap-6 md:gap-8 items-center w-full">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-['Mulish:ExtraBold',_sans-serif] font-extrabold text-[#000000] text-[24px] md:text-[28px] lg:text-[36px] text-center tracking-[0.15px] w-full"
            >
              <p className="block leading-normal">Featured Templates</p>
            </motion.div>
            
            <div className="flex flex-col gap-6 md:gap-8 items-start w-full">
              {/* Filter Buttons */}
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 md:gap-4 items-start w-full"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    variants={slideInLeft}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${selectedCategory === category ? 'bg-[#efedff]' : 'bg-[#ffffff]'} relative rounded-[74px] hover:bg-[#efedff] transition-colors duration-300`}
                    data-name="Button"
                  >
                    <div className="flex items-center justify-center overflow-clip px-3 md:px-4 py-2 relative">
                      <div className="font-['Mulish:SemiBold',_sans-serif] font-semibold text-[#000000] text-[14px] md:text-[16px] tracking-[-0.32px]">
                        <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">{category}</p>
                      </div>
                    </div>
                    <div className="absolute border border-[#9589e1] border-solid inset-0 pointer-events-none rounded-[74px]" />
                  </motion.button>
                ))}
              </motion.div>

              {/* Template Grid */}
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="w-full"
              >
                <TemplateCardGrid 
                  templates={filteredTemplates}
                  onTemplateClick={handleTemplateClick}
                />
              </motion.div>
            </div>
          </div>

          {/* ============ DEMO VIDEO SECTION ============ */}
          <motion.div 
            id="demo"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="flex flex-col gap-6 md:gap-8 items-start px-4 md:px-[106px] w-full">
              <div className="font-['Mulish:ExtraBold',_sans-serif] font-extrabold text-[#000000] text-[24px] md:text-[28px] lg:text-[36px] text-center tracking-[0.15px] w-full">
                <p className="block leading-normal">See us in action</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="aspect-[2072/1064] bg-center bg-cover bg-no-repeat w-full relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group" 
                data-name="image 389" 
                style={{ backgroundImage: `url('${imgImage389}')` }}
                onClick={() => setIsVideoModalOpen(true)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="bg-white bg-opacity-90 rounded-full p-3 md:p-4 hover:bg-opacity-100 transition-all group-hover:shadow-lg"
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ============ FAQ SECTION ============ */}
          <FAQSection faqData={faqData} />
        </div>
      </motion.section>
        </div>
      </div>

      {/* Replace old footer with new Footer component */}
      <Footer scrollToSection={scrollToSection} />

      {/* Early Access Modal */}
      <EarlyAccessModal open={earlyAccessOpen} onClose={() => setEarlyAccessOpen(false)}>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block font-['Open_Sans:Regular',_sans-serif] text-[14px] text-zinc-800">
              Please enter your work email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-['Inter:Regular',_sans-serif] text-[16px] outline-none focus:border-[#666CFF] transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1e1e1e] text-white px-6 py-3 rounded-xl font-['Mulish:Bold',_sans-serif] font-bold text-[18px] hover:bg-opacity-90 transition-all"
          >
            Get Early Access
          </button>
        </form>
      </EarlyAccessModal>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={VIDEO_URL}
      />
    </div>
  );
}