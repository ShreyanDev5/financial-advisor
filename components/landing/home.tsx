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
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Advisor from "@/components/landing/advisor";

export default function HomeContent() {
  const quickServices = [
    {
      title: "Health Insurance",
      icon: Heart,
      color: "bg-red-500/10",
      iconColor: "text-red-500",
      borderColor: "border-red-500/20",
      hoverColor: "hover:bg-red-500/20",
      href: "/insurance#star-health-and-care-insurance",
    },
    {
      title: "Mutual Funds",
      icon: TrendingUp,
      color: "bg-green-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20",
      hoverColor: "hover:bg-green-500/20",
      href: "/invest#mutual-funds",
    },
    {
      title: "PAN Card",
      icon: FileText,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      hoverColor: "hover:bg-blue-500/20",
      href: "/documents#pan-card-services",
    },
    {
      title: "Tax Filing",
      icon: ClipboardList,
      color: "bg-indigo-500/10",
      iconColor: "text-indigo-500",
      borderColor: "border-indigo-500/20",
      hoverColor: "hover:bg-indigo-500/20",
      href: "/documents#income-tax-filing-services",
    },
    {
      title: "Life Insurance",
      icon: ShieldCheck,
      color: "bg-purple-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      hoverColor: "hover:bg-purple-500/20",
      href: "/insurance#life-insurance",
    },
  ];

  return (
    <div className="pb-0 space-y-12 sm:space-y-16">
      <PageHeader
        title="Build Your Wealth"
        description={
          <>
            Personalized guidance from <span className="underline-wavy font-medium">Monotosh Sardar</span> for lasting peace of mind.
          </>
        }
        color="emerald-600 to-green-600"
      />
      <AnimatedSection className="mx-4 sm:mx-8 md:mx-16 mt-8 sm:mt-12 md:mt-24">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <StatCard
            title="Happy Clients"
            value="750+"
            icon={Users}
            description="Satisfied clients across the country."
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-600"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg"
          />
          <StatCard
            title="Services Offered"
            value="20+"
            icon={ClipboardList}
            description="Wide range of financial services."
            iconBgColor="bg-emerald-100"
            iconTextColor="text-emerald-600"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg"
          />
          <StatCard
            title="Years of Experience"
            value="19+"
            icon={Award}
            description="In the financial advisory field."
            iconBgColor="bg-purple-100"
            iconTextColor="text-purple-600"
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg"
          />
          <StatCard
            title="Assets Under Management"
            value="30 Lakhs"
            icon={TrendingUp}
            description="As of February 2026."
            iconBgColor="bg-orange-100"
            iconTextColor="text-orange-600"
            className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg"
          />
        </div>
      </AnimatedSection>
      <div className="w-1/2 sm:w-1/3 md:w-1/4 mx-auto my-6 sm:my-8">
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="py-3 sm:py-4">
        <Advisor />
      </div>
      <div className="w-1/2 sm:w-1/3 md:w-1/4 mx-auto my-6 sm:my-8">
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <AnimatedSection className="text-center py-2 sm:py-4">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">Core Services</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
            Our Most In-Demand Services
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto px-4">
          {quickServices.map((service, index) => (
            <Link href={service.href!} key={index}>
              <div
                className={`group relative p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl transition-all duration-300 ${service.color} ${service.hoverColor} border ${service.borderColor} flex flex-col items-center text-center shadow-sm h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 hover:shadow-md backdrop-blur-sm bg-gradient-to-br from-white/40 to-white/20 transform hover:-translate-y-0.5`}
              >
                <div
                  className={`p-3 md:p-4 rounded-lg ${service.iconColor} bg-white/90 mb-3 md:mb-4 shadow ring-1 ring-white/60 transition-all duration-300 group-hover:scale-105`}
                >
                  <service.icon className="w-6 h-6 md:w-7 lg:w-8 md:h-7 lg:h-8" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 leading-tight transition-all duration-300 group-hover:text-gray-900">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>
      <div className="w-1/2 sm:w-1/3 md:w-1/4 mx-auto my-8 sm:my-10">
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <AnimatedSection className="text-center mb-16 sm:mb-24">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">Client Stories</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Real outcomes from real plans.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-6">
          <TestimonialCard
            name="Apurbo Saha"
            role="CEO, GS Diesel Company"
            testimonial="Monotosh makes financial decisions simple. His guidance has given me peace of mind and the confidence to plan ahead for my business and family."
            avatarSrc="/Apurbo Saha.png"
          />
          <TestimonialCard
            name="Sanchita Mondal"
            role="Cashier, SBI"
            testimonial="I always felt lost about where to start with savings, but Monotosh explained everything with such patience. I finally feel in control of my money."
            avatarSrc="/Sanchita Mondal.png"
          />
          <TestimonialCard
            name="Dr. Debashis Sarkar"
            role="Physician"
            testimonial="What I value most is his sincerity. Monotosh truly listens and gives advice that feels right for me and my family's future."
            avatarSrc="/Dr. Debashis Sarkar.png"
          />
        </div>
      </AnimatedSection>
      <AnimatedSection className="bg-white/50 backdrop-blur-2xl p-6 sm:p-16 rounded-2xl text-center border-4 border-emerald-600 shadow-strong mx-4 sm:mx-16">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">Start Your Financial Plan</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto mb-8 text-pretty">
            Set goals. Get a clear path. Stay on track.
          </p>
        </div>
        <a
          href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
          aria-label="Contact us on WhatsApp"
        >
          <Button size="lg" className="xl:h-12 xl:px-10 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5" variant="gradient-emerald">Contact Us</Button>
        </a>
      </AnimatedSection>
    </div>
  );
}
