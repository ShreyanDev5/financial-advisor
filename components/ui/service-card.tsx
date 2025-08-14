'use client';

import { useMemo } from "react";
import { CheckCircle, FileText, UserRoundCheck } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in" | "elegant-fade";
  colorScheme?: string;
  className?: string;
  whatsAppMessage?: string;
  whatsAppNumber?: string;
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
  animation = "fade-up",
  colorScheme = "teal",
  className = "",
  whatsAppMessage,
  whatsAppNumber = "919836472260",
}: ServiceCardProps) {
  const accentGradient = useMemo(() => {
    const map: Record<string, string> = {
      teal: "from-teal-400/70 via-emerald-400/70 to-teal-600/70",
      emerald: "from-emerald-400/70 via-teal-400/70 to-green-600/70",
      blue: "from-blue-400/70 via-indigo-400/70 to-blue-600/70",
      purple: "from-purple-400/70 via-violet-400/70 to-purple-600/70",
      orange: "from-orange-400/70 via-amber-400/70 to-orange-600/70",
    };
    return map[colorScheme] || map.teal;
  }, [colorScheme]);

  const colorClasses = useMemo(() => {
    const map: Record<string, { text: string; bgSoft: string; button: string; icon: string; borderSoft: string }> = {
      teal: {
        text: "text-teal-500",
        bgSoft: "bg-teal-50/30",
        button: "bg-teal-500",
        icon: "text-teal-500",
        borderSoft: "border-teal-200",
      },
      emerald: {
        text: "text-emerald-500",
        bgSoft: "bg-emerald-50/30",
        button: "bg-emerald-500",
        icon: "text-emerald-500",
        borderSoft: "border-emerald-200",
      },
      blue: {
        text: "text-blue-500",
        bgSoft: "bg-blue-50/30",
        button: "bg-blue-500",
        icon: "text-blue-500",
        borderSoft: "border-blue-200",
      },
      purple: {
        text: "text-purple-500",
        bgSoft: "bg-purple-50/30",
        button: "bg-purple-500",
        icon: "text-purple-500",
        borderSoft: "border-purple-200",
      },
      orange: {
        text: "text-orange-500",
        bgSoft: "bg-orange-50/30",
        button: "bg-orange-500",
        icon: "text-orange-500",
        borderSoft: "border-orange-200",
      },
    };
    return map[colorScheme] || map.teal;
  }, [colorScheme]);

  const waHref = useMemo(() => {
    const defaultMessage = whatsAppMessage || `Hi Monotosh, I'm interested in ${title}. Please help me get started.`;
    const encoded = encodeURIComponent(defaultMessage);
    return `https://wa.me/${whatsAppNumber}?text=${encoded}`;
  }, [whatsAppMessage, whatsAppNumber, title]);

  return (
    <AnimatedSection animation={animation} delay={delay} duration={500}>
      <div className="relative">
        <div className={`relative bg-white rounded-2xl shadow-medium border border-gray-100 overflow-hidden sm:text-center ${className}`}>
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentGradient} rounded-t-2xl`} />
        <div className="p-6">
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 ${colorClasses.text}`}>
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${colorClasses.bgSoft} border ${colorClasses.borderSoft}`}
              style={{ boxShadow: "inset 0 1px 6px rgba(0,0,0,0.04)" }}
            >
              <Icon className={`w-6 h-6 sm:w-8 sm:h-8`} />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-0 break-words">{title}</h3>
            </div>
          </div>
          {pricing && (
            <div className="mb-2 text-center">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-emerald-700 border-emerald-200 bg-emerald-50/70">
                {pricing}
              </span>
            </div>
          )}

          <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed mt-[-0.5rem] sm:max-w-2xl mx-auto text-center text-pretty">{description}</p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-80 px-6 py-3 min-h-11 ${colorClasses.button} text-white rounded-lg font-semibold transition-all duration-200 text-center`}
              aria-label={`${ctaText} via WhatsApp`}
            >
              {ctaText}
            </a>
          </div>
        </div>
        <div className="px-6 pb-6 border-t border-gray-100">
          <Accordion type="multiple" defaultValue={[benefits?.length ? "benefits" : ""]} className="w-full max-w-3xl mx-auto">
            {benefits && benefits.length > 0 && (
              <AccordionItem value="benefits" className="border-b-0">
                <AccordionTrigger className="text-slate-900">
                  Key Benefits ({benefits.length})
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 md:grid-cols-2 md:gap-3 text-left">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className={`w-4 h-4 ${colorClasses.icon} mt-1 flex-shrink-0`} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {documents && documents.length > 0 && (
              <AccordionItem value="documents" className="border-b-0">
                <AccordionTrigger className="text-slate-900">
                  Documents Required ({documents.length})
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 md:grid-cols-2 md:gap-3 text-left">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <FileText className={`w-4 h-4 ${colorClasses.icon} mt-1 flex-shrink-0`} />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {process && process.length > 0 && (
              <AccordionItem value="process" className="border-b-0">
                <AccordionTrigger className="text-slate-900">
                  Process ({process.length})
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 md:grid-cols-2 md:gap-3 text-left">
                    {process.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <UserRoundCheck className={`w-4 h-4 ${colorClasses.icon} mt-1 flex-shrink-0`} />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {pricing && (
              <AccordionItem value="pricing" className="border-b-0">
                <AccordionTrigger className="text-slate-900">Pricing</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{pricing}</p>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
      </div>
    </AnimatedSection>
  );
}
