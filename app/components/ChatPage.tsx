'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import chatSvgPaths from "../../imports/svg-u2jcrofi0p";
import modalSvgPaths from "../../imports/svg-by0sc1nl7p";
import newSvgPaths from "../../imports/svg-po0scaeswx";
import Image from 'next/image';
import Navbar from './Navbar';
import VideoModal from './VideoModal';
import EarlyAccessButton from './EarlyAccessButton';

// Replace Figma assets with placeholder images for now
const PLACEHOLDER_NOISE = '/images/noise.png';
const PLACEHOLDER_DEMO = '/images/videobutton.png';

// Add the YouTube video URL constant
const DEMO_VIDEO_URL = "https://www.youtube.com/embed/g8T-QHtGlkA?si=Ezm3y3eYBdVgvbRq";

// Add after placeholder constants, define a helper to generate unique IDs
// Helper to generate a robust unique id for messages and api calls
const generateUniqueId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

interface ChatPageProps {
  /** Optional first message to populate conversation */
  initialMessage?: string;
  /** Callback to return to landing */
  onBack: () => void;
}

function MobileNav({ isOpen, onClose, scrollToSection, setEarlyAccessOpen }: { isOpen: boolean; onClose: () => void; scrollToSection: (sectionId: string) => void; setEarlyAccessOpen: (open: boolean) => void }) {
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
        
        <div className="flex flex-col h-full px-6 py-8">
          <div className="flex flex-col gap-8 flex-1">
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
            
            <div className="mt-auto pt-8">
              <button
                className="bg-[#1e1e1e] flex items-center justify-center h-10 px-4 rounded-[10px] hover:bg-opacity-90 transition-all w-full"
                onClick={() => {
                  onClose();
                  setEarlyAccessOpen(true);
                }}
              >
                <div className="font-primary font-bold text-[#ffffff] text-[16px] tracking-[-0.32px]">
                  <p className="adjustLetterSpacing leading-[22px] whitespace-pre">Get Early Access</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="bg-[#ffffff] relative rounded-xl w-full border border-[rgba(76,78,100,0.22)]">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <div className="font-['Mulish:Bold',_sans-serif] font-bold text-[#000000] text-[14px]">
            <p className="block leading-normal">{template.title}</p>
          </div>
          <div className="font-['Open_Sans:Regular',_sans-serif] font-normal text-[#000000] text-[12px] leading-[18px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="block">{template.description}</p>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          {template.tags.map((tag: string, index: number) => (
            <div key={index} className={`${tag === 'Sales' ? 'bg-[#ecf3fc]' : 'bg-[#f2e5ff]'} flex flex-row gap-1 h-7 items-center justify-center px-2 py-1 rounded-lg`}>
              {tag === 'Playbook' && (
                <div className="relative shrink-0 size-4">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path d={newSvgPaths.p279ab100} stroke="#7828C8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33398 7.33203H10.6673" stroke="#7828C8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33398 4.66797H9.33398" stroke="#7828C8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#000000] text-[11px] tracking-[0.35px]">
                <p className="block leading-[12.25px]">{tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateSkeleton() {
  return (
    <div className="bg-[#ffffff] relative rounded-xl w-full border border-[rgba(76,78,100,0.22)]">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-slate-200 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-row gap-1">
          <div className="h-7 w-16 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="h-7 w-20 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function DemoVideo() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-center bg-cover bg-no-repeat h-[200px] shrink-0 w-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
        style={{ backgroundImage: `url('${PLACEHOLDER_DEMO}')` }}
        onClick={() => setIsVideoModalOpen(true)}
      />
      
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={DEMO_VIDEO_URL}
      />
    </>
  );
}

export default function ChatPage({ initialMessage = "", onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [templateData, setTemplateData] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  // After the first AI response, users should no longer be able to send messages
  const [interactionComplete, setInteractionComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Keep track of messages being processed to prevent duplicates
  const processingMessages = useRef<Set<string>>(new Set());
  // Keep track of the latest API call to handle race conditions
  const latestApiCallId = useRef<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToSection = (sectionId: string) => {
    // Go back to landing page and scroll to the section
    onBack();
    // Add a small delay to ensure the landing page is rendered before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const fetchTemplateRecommendations = async (prompt: string, apiCallId: string) => {
    try {
      // Only proceed if this is still the latest API call
      if (apiCallId !== latestApiCallId.current) return;

      setIsLoadingTemplates(true);
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error('Failed to get templates');
      const data = await response.json();

      // Check again if this is still the latest API call
      if (apiCallId === latestApiCallId.current && Array.isArray(data.recommendedTemplates)) {
        setTemplateData(data.recommendedTemplates.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      if (apiCallId === latestApiCallId.current) {
        setIsLoadingTemplates(false);
      }
    }
  };

  const sendMessageToAPI = async (messageContent: string, isInitial: boolean = false) => {
    // Generate a unique ID for this API call
    const apiCallId = generateUniqueId();
    latestApiCallId.current = apiCallId;

    // Check if this message is already being processed
    const messageHash = `${messageContent}-${isInitial}`;
    if (processingMessages.current.has(messageHash)) {
      console.log('Duplicate message prevented:', messageHash);
      return;
    }

    try {
      processingMessages.current.add(messageHash);
      setIsTyping(true);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: messageContent })
      });

      // Check if this is still the latest API call
      if (apiCallId !== latestApiCallId.current) {
        console.log('Outdated API call response ignored:', apiCallId);
        return;
      }

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();

      if (!data.message) {
        throw new Error('Invalid response format');
      }

      const botMessage: Message = {
        id: apiCallId,
        content: data.message,
        sender: 'bot',
        timestamp: new Date()
      };

      // Only update messages if this is still the latest API call
      if (apiCallId === latestApiCallId.current) {
        setMessages(prev => [...prev, botMessage]);
        // Fetch template recommendations in parallel
        fetchTemplateRecommendations(messageContent, apiCallId);
        // Mark the conversation as complete so no further messages can be sent
        setInteractionComplete(true);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      if (apiCallId === latestApiCallId.current) {
        const errorMessage: Message = {
          id: apiCallId,
          content: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      if (apiCallId === latestApiCallId.current) {
        setIsTyping(false);
      }
      processingMessages.current.delete(messageHash);
    }
  };

  // Handle initial message only once
  useEffect(() => {
    if (initialMessage.trim()) {
      const messageHash = `${initialMessage}-true`;
      // Only process if not already processing
      if (!processingMessages.current.has(messageHash)) {
        const userMessage: Message = {
          id: generateUniqueId(),
          content: initialMessage,
          sender: 'user',
          timestamp: new Date()
        };
        
        setMessages([userMessage]);
        sendMessageToAPI(initialMessage, true);
      }
    } else {
      // If no initial message, still fetch some default templates
      const apiCallId = generateUniqueId();
      latestApiCallId.current = apiCallId;
      fetchTemplateRecommendations("Show me some popular templates", apiCallId);
    }
  }, [initialMessage]); // Only run when initialMessage changes

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (interactionComplete) return; // Prevent any further sends

    const trimmedMessage = currentMessage.trim();
    if (!trimmedMessage) return;

    // Check if this is the same as the initial message
    if (trimmedMessage === initialMessage) {
      console.log('Duplicate message prevented: matches initialMessage');
      return;
    }

    const userMessage: Message = {
      id: generateUniqueId(),
      content: trimmedMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    await sendMessageToAPI(trimmedMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  return (
    <div className="bg-[#ffffff] relative min-h-screen flex flex-col">
      <Navbar 
        showBackButton={false}
        onBack={onBack}
        scrollToSection={scrollToSection}
        hideNavItems={true}
      />

      {/* Add a spacer div to prevent content from hiding under fixed header */}
      <div className="h-[72px]"></div>

      {/* Main Content Container */}
      <div className="flex-1 flex justify-center w-full">
        <div className="w-full max-w-[1412px] flex">
          {/* Chat Area - 60% on desktop */}
          <div className="flex-1 lg:w-[60%] flex flex-col relative border-r border-[rgba(17,17,17,0.02)]">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto">
              <div className="h-full pl-6 pr-2 md:pl-12 md:pr-4 lg:pl-24 lg:pr-8 py-8">
                <div className="space-y-6 max-w-3xl mx-auto">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender === 'bot' && (
                          <div className="bg-indigo-50 rounded-full size-12 flex items-center justify-center flex-shrink-0">
                            <div className="h-[14.554px] w-[30.5px] relative">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 15">
                                <g id="Group 52">
                                  <path d={chatSvgPaths.p16a0dc00} fill="#27272A" />
                                  <path d={chatSvgPaths.p5a8f200} fill="#666CFF" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        <div className={`max-w-[70%] ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-[#666CFF] text-white'
                                : 'bg-slate-50 text-gray-800'
                            }`}
                          >
                            {message.sender === 'user' ? (
                              <p className="font-['Inter:Regular',_sans-serif] leading-relaxed text-[16px] tracking-[0.15px]">
                                {message.content}
                              </p>
                            ) : (
                              <div className="flex flex-col gap-4">
                                {/* AI response content */}
                                <div className="prose prose-slate prose-sm max-w-none font-['Inter:Regular',_sans-serif] leading-relaxed text-[16px] tracking-[0.15px]">
                                  <ReactMarkdown 
                                    children={message.content}
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                                      ul: ({children}) => <ul className="mb-2 list-disc pl-4">{children}</ul>,
                                      ol: ({children}) => <ol className="mb-2 list-decimal pl-4">{children}</ol>,
                                      li: ({children}) => <li className="mb-1">{children}</li>,
                                      h1: ({children}) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                                      h2: ({children}) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                                      h3: ({children}) => <h3 className="text-base font-bold mb-2">{children}</h3>,
                                      code: ({children}) => <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>,
                                      pre: ({children}) => <pre className="bg-gray-100 rounded p-2 overflow-x-auto mb-2">{children}</pre>,
                                      blockquote: ({children}) => <blockquote className="border-l-4 border-gray-200 pl-4 italic mb-2">{children}</blockquote>,
                                    }}
                                  />
                                </div>

                                {/* Early Access Button */}
                                <EarlyAccessButton className="bg-[#1e1e1e] flex items-center justify-center h-10 px-4 rounded-[10px] hover:bg-opacity-90 transition-all w-max" />
                              </div>
                            )}
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 px-2 ${message.sender === 'user' ? 'text-right' : ''}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        {/* No avatar for user messages */}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-3 justify-start"
                      >
                        <div className="bg-indigo-50 rounded-full size-12 flex items-center justify-center">
                          <div className="h-[14.554px] w-[30.5px] relative">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 15">
                              <g id="Group 52">
                                <path d={chatSvgPaths.p16a0dc00} fill="#27272A" />
                                <path d={chatSvgPaths.p5a8f200} fill="#666CFF" />
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className="bg-slate-50 px-4 py-3 rounded-2xl">
                          <p className="font-['Inter:Regular',_sans-serif] text-[16px] tracking-[0.15px]">
                            🧠 My servers are thinking, please wait...
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="border-t border-gray-100 bg-white">
              <div className="px-6 md:px-12 lg:px-24 py-6">
                <div className="max-w-3xl mx-auto">
                  {interactionComplete ? (
                    <p className="text-center font-primary text-[14px] text-slate-500 tracking-[0.15px]">
                      You can’t send more messages to nRev AI. Signup for our early access for full access
                    </p>
                  ) : (
                    <form onSubmit={handleSendMessage} className="relative">
                      <div className="bg-[#ffffff] rounded-full border border-slate-300 shadow-[0px_4px_8px_-2px_rgba(23,23,23,0.1),0px_2px_4px_-2px_rgba(23,23,23,0.06)] p-3">
                        <div className="flex items-center gap-3">
                          <input
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Message nRev AI"
                            className="flex-1 font-primary font-medium text-[16px] text-slate-600 tracking-[-0.112px] bg-transparent border-none outline-none pl-3"
                          />
                          <button
                            type="submit"
                            disabled={!currentMessage.trim() || isTyping}
                            className={`p-2 rounded-full transition-colors ${
                              currentMessage.trim()
                                ? 'bg-[#666cff] text-white hover:bg-[#5a5ce8]'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                  
                  <div className="text-center mt-4">
                    <p className="font-primary text-[14px] text-slate-400 tracking-[0.15px]">
                      AI can make mistakes. Check our Terms & Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - 40% on desktop, Hidden on Mobile */}
          <div className="hidden lg:block w-[40%] bg-[#ffffff] overflow-y-auto">
            <div className="sticky top-[0px] pl-6 pr-6 md:pl-12 md:pr-12 lg:pl-5 lg:pr-24 py-8">
              {/* Recommended Templates */}
              <div className="space-y-4">
                <div className="font-primary font-medium text-[#666666] text-[14px] tracking-[0.1px]">
                  <p className="block leading-[21px]">Recommended Templates</p>
                </div>
                <div className="space-y-4">
                  {isLoadingTemplates ? (
                    <>
                      <TemplateSkeleton />
                      <TemplateSkeleton />
                      <TemplateSkeleton />
                    </>
                  ) : templateData.length > 0 && (
                    templateData.map((template: Template) => (
                      <TemplateCard key={template.id} template={template} />
                    ))
                  )}
                </div>
              </div>

              {/* See how nRev works */}
              <div className="mt-8 space-y-4">
                <div className="font-primary font-medium text-[#666666] text-[14px] tracking-[0.1px]">
                  <p className="block leading-[21px]">See how nRev works</p>
                </div>
                <DemoVideo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}