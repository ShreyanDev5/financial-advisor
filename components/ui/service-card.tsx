'use client';

import { useState } from "react";
import { ChevronDown, CheckCircle, FileText, UserRoundCheck } from "lucide-react";
import { AnimatedSection } from "./animated-section";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  documents: string[];
  process: string[];
  pricing: string;
  icon: any; // You might want to refine this type further
  ctaText?: string;
  delay?: number;
  colorScheme?: string;
}

export function ServiceCard({
  id,
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

  return (
    <AnimatedSection animation="fade-up" delay={delay} duration={500}>
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className={`flex items-center gap-4 mb-4 text-${colorScheme}-500`}>
            <div className={`w-14 h-14 bg-${colorScheme}-50/20 rounded-xl flex items-center justify-center`}>
              <Icon className={`w-7 h-7`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-brand-navy mb-1">{title}</h3>
            </div>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex-1 px-4 py-3 bg-${colorScheme}-100 text-${colorScheme}-800 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2`}
            >
              Details
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
            <button
              className={`flex-1 px-4 py-3 bg-${colorScheme}-500 text-white rounded-lg font-semibold transition-all duration-200`}
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
