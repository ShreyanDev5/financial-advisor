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
const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
const rawPhone = process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260";
const cleanPhone = rawPhone.replace(/\s/g, '');
const resolvedWhatsAppNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

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
        text: "text-teal-600 dark:text-teal-400",
        bgSoft: "bg-teal-500/[0.06] dark:bg-teal-400/[0.08]",
        button: "from-teal-600 to-teal-800 dark:from-teal-500 dark:to-teal-700",
        icon: "text-teal-500",
        borderSoft: "border-teal-200/30 dark:border-teal-800/20",
        tabActive: "data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400",
      },
      emerald: {
        text: "text-emerald-600 dark:text-emerald-400",
        bgSoft: "bg-emerald-500/[0.06] dark:bg-emerald-400/[0.08]",
        button: "from-emerald-600 to-emerald-800 dark:from-emerald-500 dark:to-emerald-700",
        icon: "text-emerald-500",
        borderSoft: "border-emerald-200/30 dark:border-emerald-800/20",
        tabActive: "data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400",
      },
      blue: {
        text: "text-blue-600 dark:text-blue-400",
        bgSoft: "bg-blue-500/[0.06] dark:bg-blue-400/[0.08]",
        button: "from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700",
        icon: "text-blue-500",
        borderSoft: "border-blue-200/30 dark:border-blue-800/20",
        tabActive: "data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400",
      },
      purple: {
        text: "text-purple-600 dark:text-purple-400",
        bgSoft: "bg-purple-500/[0.06] dark:bg-purple-400/[0.08]",
        button: "from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700",
        icon: "text-purple-500",
        borderSoft: "border-purple-200/30 dark:border-purple-800/20",
        tabActive: "data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400",
      },
      orange: {
        text: "text-orange-600 dark:text-orange-400",
        bgSoft: "bg-orange-500/[0.06] dark:bg-orange-400/[0.08]",
        button: "from-orange-600 to-orange-800 dark:from-orange-500 dark:to-orange-700",
        icon: "text-orange-500",
        borderSoft: "border-orange-200/30 dark:border-orange-800/20",
        tabActive: "data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400",
      },
      red: {
        text: "text-red-600 dark:text-red-400",
        bgSoft: "bg-red-500/[0.06] dark:bg-red-400/[0.08]",
        button: "from-red-600 to-red-800 dark:from-red-500 dark:to-red-700",
        icon: "text-red-500",
        borderSoft: "border-red-200/30 dark:border-red-800/20",
        tabActive: "data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400",
      },
    };
    return map[colorScheme] || map.teal;
  }, [colorScheme]);

  const waHref = useMemo(() => {
    const defaultMessage = whatsAppMessage || `Hi ${clientFirstName}, I'm interested in your ${title} service. Could we schedule a quick chat to discuss how this works?`;
    const encoded = encodeURIComponent(defaultMessage);
    const targetNumber = whatsAppNumber === "919836472260" ? resolvedWhatsAppNumber : whatsAppNumber;
    return `https://wa.me/${targetNumber}?text=${encoded}`;
  }, [whatsAppMessage, whatsAppNumber, title]);

  const hasTabs = (documents && documents.length > 0) || (process && process.length > 0) || (costs && costs.length > 0);

  const getDefaultTab = () => {
    if (documents && documents.length > 0) return "documents";
    if (process && process.length > 0) return "process";
    if (costs && costs.length > 0) return "costs";
    return "";
  };

  return (
    <AnimatedSection animation={animation} delay={delay} duration={400}>
      <div className="relative group">
        <div className={`relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-[24px] shadow-sm border border-slate-200/40 dark:border-slate-800/40 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.04),0_8px_16px_-6px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 ${className}`}>
          {/* Extremely thin elegant top accent border */}
          <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accentGradient}`} />
          
          <div className={`p-4 ${hasTabs ? 'pb-1.5 sm:pb-2.5' : 'pb-4 sm:pb-6'} sm:p-6 text-left`}>
            {/* Header section with Icon on left, Title on right */}
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${colorClasses.bgSoft} border ${colorClasses.borderSoft} flex-shrink-0 text-current`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-[22px] font-bold font-serif text-slate-950 dark:text-white leading-tight">{title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-[13.5px] sm:text-[15px] text-slate-600/95 dark:text-slate-400/95 mb-4 leading-relaxed">{description}</p>

            {/* Key Benefits */}
            {benefits && benefits.length > 0 && (
              <div className="mb-4 bg-slate-50/60 dark:bg-slate-950/20 p-3 sm:p-3.5 rounded-xl border border-slate-100/80 dark:border-slate-800/30">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">Key Benefits</h4>
                <ul className={`grid gap-2 ${benefits.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5 sm:gap-y-2' : ''}`}>
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-[12.5px] sm:text-[13.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      <div className={`w-[18px] h-[18px] rounded-full ${colorClasses.bgSoft} flex items-center justify-center flex-shrink-0 mt-0.5 text-current`}>
                        <CheckCircle className="w-2.5 h-2.5" />
                      </div>
                      <span className="pt-0.5">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Button (Only if hasTabs is false) */}
            {!hasTabs && (
              <div className="flex justify-center mt-5">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-52 inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r ${colorClasses.button} text-white rounded-xl font-semibold tracking-wide transition-all duration-200 text-[13.5px] sm:text-sm shadow-sm hover:shadow-md hover:shadow-current/10 hover:-translate-y-0.5 active:scale-95 border border-white/10`}
                  aria-label={`${ctaText} via WhatsApp`}
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>

          {/* Bottom Tabs tray */}
          {hasTabs && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 bg-slate-50/30 dark:bg-slate-950/10">
              <Tabs defaultValue={getDefaultTab()} className="w-full max-w-3xl mx-auto pt-3">
                {/* Segmented control navigation */}
                <TabsList className="flex w-full bg-slate-100/80 dark:bg-slate-900/60 backdrop-blur-md p-0.5 rounded-lg border border-slate-200/20 mb-3 sm:mb-4">
                  {documents && documents.length > 0 && (
                    <TabsTrigger 
                      value="documents" 
                      className={`flex-1 rounded-[8px] text-[11.5px] py-1 text-slate-500 dark:text-slate-400 font-semibold transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm ${colorClasses.tabActive}`}
                    >
                      Documents
                    </TabsTrigger>
                  )}
                  {process && process.length > 0 && (
                    <TabsTrigger 
                      value="process" 
                      className={`flex-1 rounded-[8px] text-[11.5px] py-1 text-slate-500 dark:text-slate-400 font-semibold transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm ${colorClasses.tabActive}`}
                    >
                      Process
                    </TabsTrigger>
                  )}
                  {costs && costs.length > 0 && (
                    <TabsTrigger 
                      value="costs" 
                      className={`flex-1 rounded-[8px] text-[11.5px] py-1 text-slate-500 dark:text-slate-400 font-semibold transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm ${colorClasses.tabActive}`}
                    >
                      Costs
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Tab content screens */}
                {documents && documents.length > 0 && (
                  <TabsContent value="documents" className="pt-2 text-left focus-visible:outline-none">
                    <ul className={`grid gap-2 ${documents.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5 sm:gap-y-2' : ''}`}>
                      {documents.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2 text-[12.5px] sm:text-[13.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          <div className={`w-[18px] h-[18px] rounded-full ${colorClasses.bgSoft} flex items-center justify-center flex-shrink-0 mt-0.5 text-current`}>
                            <FileText className="w-2.5 h-2.5" />
                          </div>
                          <span className="pt-0.5">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {process && process.length > 0 && (
                  <TabsContent value="process" className="pt-2 text-left focus-visible:outline-none">
                    <ul className={`grid gap-2 ${process.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5 sm:gap-y-2' : ''}`}>
                      {process.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-[12.5px] sm:text-[13.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          <div className={`w-[18px] h-[18px] rounded-full ${colorClasses.bgSoft} flex items-center justify-center flex-shrink-0 mt-0.5 text-current`}>
                            <UserRoundCheck className="w-2.5 h-2.5" />
                          </div>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {costs && costs.length > 0 && (
                  <TabsContent value="costs" className="pt-2 text-left focus-visible:outline-none">
                    <ul className={`grid gap-2 ${costs.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5 sm:gap-y-2' : ''}`}>
                      {costs.map((cost, index) => (
                        <li key={index} className="flex items-start gap-2 text-[12.5px] sm:text-[13.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          <div className={`w-[18px] h-[18px] rounded-full ${colorClasses.bgSoft} flex items-center justify-center flex-shrink-0 mt-0.5 text-current`}>
                            <Banknote className="w-2.5 h-2.5" />
                          </div>
                          <span className="pt-0.5">{cost}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                )}
              </Tabs>

              {/* CTA Button (Only if hasTabs is true) */}
              <div className="flex justify-center mt-6">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-52 inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r ${colorClasses.button} text-white rounded-xl font-semibold tracking-wide transition-all duration-200 text-[13.5px] sm:text-sm shadow-sm hover:shadow-md hover:shadow-current/10 hover:-translate-y-0.5 active:scale-95 border border-white/10`}
                  aria-label={`${ctaText} via WhatsApp`}
                >
                  {ctaText}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
