'use client';

import React, { useState } from 'react';
import EarlyAccessModal from './EarlyAccessModal';

interface EarlyAccessButtonProps {
  className?: string;
}

export default function EarlyAccessButton({ className }: EarlyAccessButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setSuccessMessage("");

    // Local validation first
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid work email");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccessMessage("Thanks! We'll be in touch soon.");
        setEmail("");
      } else if (res.status === 400) {
        const data = await res.json().catch(() => null);
        setEmailError(data?.error || "Invalid email address.");
      } else {
        setEmailError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting waitlist form:", error);
      setEmailError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className={className || "bg-[#1e1e1e] flex items-center justify-center h-10 px-4 rounded-[10px] hover:bg-opacity-90 transition-all"}
        onClick={() => setIsOpen(true)}
      >
        <div className="font-primary font-bold text-[#ffffff] text-[16px] tracking-[-0.32px]">
          <p className="adjustLetterSpacing leading-[22px] whitespace-pre">Get Early Access</p>
        </div>
      </button>

      <EarlyAccessModal open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-secondary font-normal text-[14px] text-zinc-800 mb-2">
              Please enter your work email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              className="w-full px-3 py-2 border-2 border-zinc-200 rounded-lg font-primary font-normal text-[16px] outline-none focus:border-blue-500"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
            {successMessage && !emailError && (
              <p className="text-green-600 text-sm mt-1">{successMessage}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1e1e1e] text-white px-6 py-3 rounded-xl font-primary font-bold text-[18px] hover:bg-opacity-90 transition-all"
          >
            {isSubmitting ? "Submitting..." : "Get Early Access"}
          </button>
        </form>
      </EarlyAccessModal>
    </>
  );
} 