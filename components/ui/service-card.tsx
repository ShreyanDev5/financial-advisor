'use client';

import { useState } from "react";
import { ChevronDown, CheckCircle, FileText, UserRoundCheck } from "lucide-react";
import { AnimatedSection } from "./animated-section";

interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string[];
  documents: string[];
  process: string[];
  pricing: string;
  icon: React.ElementType;
  ctaText?: string;
  delay?: number;
  colorScheme?: string;
}

export function ServiceCard({
  title,
  description,
  benefits,
  documents,
  process,
  pricing,
  icon: Icon,
  ctaText = "Get Started",
  delay = 0,
  colorScheme = "teal",
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hoverBgColor: { [key: string]: string } = {
    teal: "rgba(20, 184, 166, 0.1)",
    emerald: "rgba(16, 185, 129, 0.1)",
    blue: "rgba(59, 130, 246, 0.1)",
    purple: "rgba(139, 92, 246, 0.1)",
  };

  return (
    <AnimatedSection animation="fade-up" delay={delay} duration={500}>
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className={`flex items-center gap-4 mb-4 text-${colorScheme}-500`}>
            <div className={`w-14 h-14 bg-${colorScheme}-50/20 rounded-xl flex items-center justify-center`}>
              <Icon className={`w-7 h-7`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-brand-navy mb-0">{title}</h3>
            </div>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed mt-[-0.5rem] ml-16">{description}</p>

          <div className="flex flex-col sm:flex-row sm:justify-center sm:ml-72 gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-full sm:w-80 px-6 py-3 border text-${colorScheme}-500 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isHovered ? 'shadow-sm' : ''}`}
              style={{ backgroundColor: isHovered ? hoverBgColor[colorScheme || 'teal'] : 'transparent', borderColor: `hsl(var(--border-${colorScheme}-500))` }}
            >
              Details
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
            <button
              className={`w-full sm:w-80 px-6 py-3 bg-${colorScheme}-500 text-white rounded-lg font-semibold transition-all duration-200`}
            >
            {ctaText}
            </button>
          </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-[1500px]" : "max-h-0"}`}>
          <div className="px-6 pb-6 border-t border-gray-100 divide-y divide-gray-100">
            {benefits && benefits.length > 0 && (
              <div className="py-4">
                <h4 className="font-semibold text-brand-navy mb-3">Key Benefits</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className={`w-4 h-4 text-${colorScheme}-500 mt-1 flex-shrink-0`} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {documents && documents.length > 0 && (
              <div className="py-4">
                <h4 className="font-semibold text-brand-navy mb-3">Documents Required</h4>
                <ul className="space-y-2">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <FileText className="w-4 h-4 text-brand-teal mt-1 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {process && process.length > 0 && (
              <div className="py-4">
                <h4 className="font-semibold text-brand-navy mb-3">Process</h4>
                <ul className="space-y-2">
                  {process.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <UserRoundCheck className="w-4 h-4 text-brand-teal mt-1 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {pricing && (
              <div className="py-4">
                <h4 className="font-semibold text-brand-navy mb-3">Pricing</h4>
                <p className="text-gray-600">{pricing}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
