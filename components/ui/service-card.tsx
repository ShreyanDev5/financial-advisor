'use client';

import { useMemo } from "react";
import { Banknote, CheckCircle, FileText, UserRoundCheck } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string[];
  documents: string[];
  process: string[];
  costs?: string[];
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
  costs,
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
      red: "from-red-400/70 via-rose-400/70 to-red-600/70",
    };
    return map[colorScheme] || map.teal;
  }, [colorScheme]);

  const colorClasses = useMemo(() => {
    const map: Record<string, { text: string; bgSoft: string; button: string; icon: string; borderSoft: string; tabActive: string }> = {
      teal: {
        text: "text-teal-500",
        bgSoft: "bg-teal-50/30",
        button: "bg-teal-500 hover:bg-teal-600",
        icon: "text-teal-500",
        borderSoft: "border-teal-200",
        tabActive: "data-[state=active]:bg-teal-100/80 data-[state=active]:text-teal-700 data-[state=active]:shadow-sm",
      },
      emerald: {
        text: "text-emerald-500",
        bgSoft: "bg-emerald-50/30",
        button: "bg-emerald-500 hover:bg-emerald-600",
        icon: "text-emerald-500",
        borderSoft: "border-emerald-200",
        tabActive: "data-[state=active]:bg-emerald-100/80 data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm",
      },
      blue: {
        text: "text-blue-500",
        bgSoft: "bg-blue-50/30",
        button: "bg-blue-500 hover:bg-blue-600",
        icon: "text-blue-500",
        borderSoft: "border-blue-200",
        tabActive: "data-[state=active]:bg-blue-100/80 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm",
      },
      purple: {
        text: "text-purple-500",
        bgSoft: "bg-purple-50/30",
        button: "bg-purple-500 hover:bg-purple-600",
        icon: "text-purple-500",
        borderSoft: "border-purple-200",
        tabActive: "data-[state=active]:bg-purple-100/80 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm",
      },
      orange: {
        text: "text-orange-500",
        bgSoft: "bg-orange-50/30",
        button: "bg-orange-500 hover:bg-orange-600",
        icon: "text-orange-500",
        borderSoft: "border-orange-200",
        tabActive: "data-[state=active]:bg-orange-100/80 data-[state=active]:text-orange-700 data-[state=active]:shadow-sm",
      },
      red: {
        text: "text-red-500",
        bgSoft: "bg-red-50/30",
        button: "bg-red-500 hover:bg-red-600",
        icon: "text-red-500",
        borderSoft: "border-red-200",
        tabActive: "data-[state=active]:bg-red-100/80 data-[state=active]:text-red-700 data-[state=active]:shadow-sm",
      },
    };
    return map[colorScheme] || map.teal;
  }, [colorScheme]);

  const waHref = useMemo(() => {
    const defaultMessage = whatsAppMessage || `Hi Monotosh, I'm interested in ${title}. Please help me get started.`;
    const encoded = encodeURIComponent(defaultMessage);
    return `https://wa.me/${whatsAppNumber}?text=${encoded}`;
  }, [whatsAppMessage, whatsAppNumber, title]);

  const hasTabs = (documents && documents.length > 0) || (process && process.length > 0) || (costs && costs.length > 0);

  const getDefaultTab = () => {
    if (documents && documents.length > 0) return "documents";
    if (process && process.length > 0) return "process";
    if (costs && costs.length > 0) return "costs";
    return "";
  };

  return (
    <AnimatedSection animation={animation} delay={delay} duration={500}>
      <div className="relative">
        <div className={`relative bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden ${className}`}>
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accentGradient} rounded-t-2xl`} />
          <div className="p-6 text-center">
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 ${colorClasses.text}`}>
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClasses.bgSoft} border ${colorClasses.borderSoft} flex-shrink-0`}
              >
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 text-center sm:text-left break-words">{title}</h3>
            </div>

            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-2xl mx-auto">{description}</p>

            {benefits && benefits.length > 0 && (
              <div className="mb-6 text-left bg-gray-50/70 p-4 rounded-lg border border-gray-200/70">
                <h4 className={`text-lg font-semibold mb-3 ${colorClasses.text} text-center`}>Key Benefits</h4>
                <ul className={`grid gap-2 ${benefits.length > 1 ? 'sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5' : ''}`}>
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-gray-700">
                      <CheckCircle className={`w-4 h-4 ${colorClasses.icon} mt-1 flex-shrink-0`} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 ${colorClasses.button} text-white rounded-lg font-semibold transition-all duration-300 text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
              aria-label={`${ctaText} via WhatsApp`}
            >
              {ctaText}
            </a>
          </div>

          {hasTabs && (
            <div className="px-6 pb-6 border-t border-gray-200/80 bg-gray-50/50">
              <Tabs defaultValue={getDefaultTab()} className="w-full max-w-3xl mx-auto pt-5">
                <TabsList className="grid w-full grid-cols-3 bg-gray-200/70 p-1 h-auto rounded-lg sm:flex sm:flex-wrap">
                  {documents && documents.length > 0 && <TabsTrigger value="documents" className={`rounded-md text-gray-600 ${colorClasses.tabActive}`}>Documents</TabsTrigger>}
                  {process && process.length > 0 && <TabsTrigger value="process" className={`rounded-md text-gray-600 ${colorClasses.tabActive}`}>Process</TabsTrigger>}
                  {costs && costs.length > 0 && <TabsTrigger value="costs" className={`rounded-md text-gray-600 ${colorClasses.tabActive}`}>Costs</TabsTrigger>}
                </TabsList>

                {documents && documents.length > 0 && (
                  <TabsContent value="documents" className="pt-4 text-left">
                    <ul className={`grid gap-2 ${documents.length > 1 ? 'sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5' : ''}`}>
                      {documents.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-gray-700">
                          <FileText className={`w-4 h-4 ${colorClasses.icon} mt-1 flex-shrink-0`} />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {process && process.length > 0 && (
                  <TabsContent value="process" className="pt-4 text-left">
                    <ul className={`grid gap-2 ${process.length > 1 ? 'sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5' : ''}`}>
                      {process.map((step, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-gray-700">
                          <UserRoundCheck className={`w-4 h-4 ${colorClasses.icon} mt-1 flex-shrink-0`} />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {costs && costs.length > 0 && (
                  <TabsContent value="costs" className="pt-4 text-left">
                    <ul className={`grid gap-2 ${costs.length > 1 ? 'sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5' : ''}`}>
                      {costs.map((cost, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-gray-700">
                          <Banknote className={`w-4 h-4 ${colorClasses.icon} mt-1 flex-shrink-0`} />
                          <span>{cost}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
