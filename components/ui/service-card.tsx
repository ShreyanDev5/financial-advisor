'use client';

import { useState } from "react";
import { ChevronDown, CheckCircle, FileText, UserRoundCheck } from "lucide-react";
import { AnimatedSection } from "./animated-section";

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
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatedSection animation="fade-up" delay={delay} duration={500}>
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 bg-${colorScheme}-50/20 rounded-xl flex items-center justify-center`}>
              <Icon className={`w-7 h-7 text-${colorScheme}-500`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-brand-navy mb-1">{title}</h3>
            </div>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => window.open("https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services", "_blank")}
              className="flex-1 bg-brand-teal text-brand-navy px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              {ctaText}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              Details
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
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
