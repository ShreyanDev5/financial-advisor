'use client';

import Link from "next/link";
import {
  Users,
  Award,
  TrendingUp,
  Heart,
  ClipboardList,
  FileText,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Button } from "@/components/ui/button";
import Advisor from "@/components/landing/advisor";
import Partners from "@/components/landing/partners";

export default function HomeContent() {
  const scrollToServices = () => {
    const el = document.getElementById('core-services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickServices = [
    {
      title: "Health Insurance",
      icon: Heart,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
      barColor: "bg-emerald-500",
      hoverBorderColor: "hover:border-emerald-500/25",
      href: "/insurance#health-insurance",
    },
    {
      title: "Mutual Funds",
      icon: TrendingUp,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
      barColor: "bg-orange-500",
      hoverBorderColor: "hover:border-orange-500/25",
      href: "/invest#mutual-funds",
    },
    {
      title: "PAN Card",
      icon: FileText,
      color: "bg-blue-50",
      iconColor: "text-blue-500",
      barColor: "bg-blue-500",
      hoverBorderColor: "hover:border-blue-500/25",
      href: "/documents#pan-card-services",
    },
    {
      title: "Tax Filing",
      icon: ClipboardList,
      color: "bg-purple-50",
      iconColor: "text-purple-500",
      barColor: "bg-purple-500",
      hoverBorderColor: "hover:border-purple-500/25",
      href: "/documents#income-tax-filing-services",
    },
    {
      title: "Life Insurance",
      icon: ShieldCheck,
      color: "bg-red-50",
      iconColor: "text-red-500",
      barColor: "bg-red-500",
      hoverBorderColor: "hover:border-red-500/25",
      href: "/insurance#life-insurance",
    },
  ];

  return (
    <div className="pb-0 relative overflow-hidden">
      {/* Subtle Static Ambient Background Orbs for a smooth, premium, non-distracting feel */}
      <div className="absolute top-[12%] left-[-15%] w-[450px] h-[450px] rounded-full bg-emerald-500/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-15%] w-[550px] h-[550px] rounded-full bg-teal-500/3 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-400/3 blur-[130px] pointer-events-none -z-10" />
      
      {/* Beautiful Combined Side-by-Side Hero & Stats Grid Card */}
      <AnimatedSection
        animation="fade-up"
        delay={0}
        duration={500}
        className="relative py-8 sm:py-16 lg:py-20 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-lg sm:shadow-strong mx-2.5 sm:mx-12 lg:mx-20 overflow-hidden"
      >
        {/* Premium Apple-like subtle dotted background overlay */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
          aria-hidden="true"
        />
        
        {/* Decorative ambient glowing gradient behind text */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" 
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Dynamic Gradient Title - Left aligned on desktop */}
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] lg:leading-[1.15] font-bold font-serif bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 bg-clip-text text-transparent mb-5 tracking-tight">
              Personalized Financial Planning
            </h1>

            {/* Description Text - Left aligned on desktop */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed mb-8 text-pretty">
              Clear, honest guidance from <span className="underline decoration-emerald-500/30 decoration-2 underline-offset-4 font-semibold whitespace-nowrap text-slate-900 transition-colors hover:decoration-emerald-500/60">Monotosh Sardar</span> to help you secure <span className="inline-block whitespace-nowrap">your family&apos;s future.</span>
            </p>

            {/* Double Action Button Grid */}
            <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center lg:justify-start w-full sm:w-auto">
              <a
                href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'd%20like%20to%20schedule%20a%20free%20consultation%20to%20discuss%20my%20financial%20goals."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block"
                aria-label="Contact us on WhatsApp"
              >
                <Button 
                  variant="dark"
                  size="lg" 
                  className="w-full sm:w-auto h-11 px-7 rounded-xl font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  Free Consultation
                </Button>
              </a>

              <Button 
                onClick={scrollToServices}
                size="lg" 
                className="w-full sm:w-auto h-11 px-7 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group border border-slate-200"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Stats Card Grid - mt-11 for extra breathing room on mobile stacking */}
          <div className="lg:col-span-5 w-full mt-11 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <StatCard
                title="Clients Served"
                value="750+"
                icon={Users}
                description="Families & individuals guided."
                iconBgColor="bg-blue-50"
                iconTextColor="text-blue-600"
                className="bg-white/80 border-blue-100/70 hover:border-blue-300"
              />
              <StatCard
                title="Services Offered"
                value="20+"
                icon={ClipboardList}
                description="Insurance, tax, and documents."
                iconBgColor="bg-emerald-50"
                iconTextColor="text-emerald-600"
                className="bg-white/80 border-emerald-100/70 hover:border-emerald-300"
              />
              <StatCard
                title="Years of Experience"
                value="19+"
                icon={Award}
                description="Years of trusted expertise."
                iconBgColor="bg-purple-50"
                iconTextColor="text-purple-600"
                className="bg-white/80 border-purple-100/70 hover:border-purple-300"
              />
              <StatCard
                title="Mutual Fund AUM"
                value="₹30 Lakhs"
                icon={TrendingUp}
                description="Total assets managed."
                iconBgColor="bg-orange-50"
                iconTextColor="text-orange-600"
                className="bg-white/80 border-orange-100/70 hover:border-orange-300"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Advisor Section */}
      <div className="animate-fade-in pt-16 sm:pt-28 pb-8 sm:pb-14">
        <Advisor />
      </div>
      
      {/* Redesigned Core Services Section with scrolling and premium cards */}
      <AnimatedSection id="core-services-section" className="text-center scroll-mt-24 py-8 sm:py-14">
        <div className="mb-8 sm:mb-10 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Our Offerings
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-slate-900 tracking-tight mt-1.5 mb-1">
            Advisory & Essential Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto px-4 sm:px-0 leading-relaxed text-pretty">
            Expert help with your investments, insurance, and essential documentation.
          </p>
        </div>
        
        {/* Beautiful Glassmorphism Core Service Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 max-w-6xl mx-auto px-3 sm:px-6">
          {quickServices.map((service, index) => (
            <Link href={service.href!} key={index} className="h-full">
              <div
                className={`group relative p-3.5 sm:p-6 md:p-8 rounded-2xl transition-all duration-300 border border-slate-200/50 bg-white/80 ${service.hoverBorderColor} hover:bg-white/95 shadow-sm hover:shadow-md flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 backdrop-blur-md h-full transform-gpu`}
              >
                {/* Premium, ultra-thin centered, rounded colored hover pill (w-12 h-[3.5px] instead of full width) */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[3.5px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.barColor}`} />

                {/* Floating Soft Colored Circle containing the Icon */}
                <div
                  className={`p-3.5 sm:p-4 md:p-4.5 rounded-2xl ${service.color} ${service.iconColor} mb-4 shadow-sm transition-all duration-300 group-hover:scale-[1.03] ring-4 ring-white`}
                >
                  <service.icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                
                {/* Fixed Title text: no color change on hover */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      {/* Redesigned Testimonials Section */}
      <AnimatedSection className="text-center py-8 sm:py-14">
        <div className="mb-10 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Client Feedback
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-slate-900 tracking-tight mt-1.5 mb-1">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto px-4 sm:px-0">
            Honest reviews from the families we protect.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
          <TestimonialCard
            name="Apurbo Saha"
            role="CEO, GS Diesel Company"
            testimonial="Monotosh made setting up our insurance and mutual funds incredibly simple. His honest guidance gives us complete peace of mind."
            avatarSrc="/Apurbo Saha.png"
          />
          <TestimonialCard
            name="Sanchita Mondal"
            role="Cashier, SBI"
            testimonial="I trust Monotosh completely with my investments and insurance. He explains everything clearly and is always there when I need help."
            avatarSrc="/Sanchita Mondal.png"
          />
          <TestimonialCard
            name="Dr. Debashis Sarkar"
            role="Physician"
            testimonial="Monotosh helped me choose the right life insurance for my family. He is professional, reliable, and made the process completely stress-free."
            avatarSrc="/Dr. Debashis Sarkar.png"
          />
        </div>
      </AnimatedSection>

      {/* Trusted Partners section */}
      <Partners />

      {/* Redesigned High-Impact Dark-Emerald CTA Section */}
      <AnimatedSection className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-emerald-900 p-6 sm:p-12 lg:p-16 rounded-3xl text-center border border-emerald-800/80 shadow-lg sm:shadow-strong mx-2.5 sm:mx-12 lg:mx-20 overflow-hidden transform-gpu">
        {/* Subtle grid lines in the background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none" />
        {/* Glowing atmospheric bubbles inside card */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full mb-1.5 backdrop-blur-md">
            Get in Touch
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif leading-tight text-white mb-1.5 tracking-tight">
            Let&apos;s Discuss Your Financial Goals
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/70 max-w-md mx-auto mb-8 leading-relaxed text-pretty">
            Send a message for a quick, free chat about your financial or document needs.
          </p>

          <a
            href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'd%20like%20to%20learn%20more%20about%20your%20financial%20advisory%20services.%20Could%20we%20connect%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto"
            aria-label="Contact us on WhatsApp"
          >
            <Button 
              variant="emerald-dark"
              size="lg" 
              className="w-full sm:w-auto h-11 px-8 rounded-xl font-bold hover:-translate-y-0.5" 
            >
              Chat on WhatsApp
            </Button>
          </a>

          {/* Friction-reducing Trust badges / micro-copy */}
          <p className="text-[11px] text-emerald-200/40 mt-4 font-medium tracking-wide">
            Instant response on WhatsApp • Free introductory call • No obligation
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
