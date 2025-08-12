'use client';

import Link from "next/link";
import {
  Users,
  Award,
  TrendingUp,
  Star,
  Heart,
  CreditCard,
  Calculator,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

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
      href: "/invest#licensed-mutual-fund-advisor",
    },
    {
      title: "PAN Card",
      icon: CreditCard,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      hoverColor: "hover:bg-blue-500/20",
      href: "/documents#pan-card-services",
    },
    {
      title: "Tax Filing",
      icon: Calculator,
      color: "bg-indigo-500/10",
      iconColor: "text-indigo-500",
      borderColor: "border-indigo-500/20",
      hoverColor: "hover:bg-indigo-500/20",
      href: "/documents#income-tax-filing",
    },
  ];

  return (
    <div className="pb-0 space-y-12 sm:space-y-16">
      <PageHeader
        title="Take Control of Your Wealth"
                  description={
          <>
            Partner with <span className="underline-wavy font-medium">Monotosh Sardar</span> for personalized financial guidance and lasting peace of mind.
          </>
        }
        color="emerald-600 to-green-600"
      />
      <AnimatedSection className="mx-4 sm:mx-16 mt-12 sm:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <StatCard
            title="Happy Clients"
            value="1,250+"
            icon={Users}
            description="Satisfied clients across the country."
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-600"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg"
          />
          <StatCard
            title="Services Offered"
            value="25+"
            icon={Award}
            description="Wide range of financial services."
            iconBgColor="bg-emerald-100"
            iconTextColor="text-emerald-600"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg"
          />
          <StatCard
            title="Growth Rate"
            value="15%"
            icon={TrendingUp}
            description="Annual growth in client investments."
            iconBgColor="bg-purple-100"
            iconTextColor="text-purple-600"
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg"
          />
          <StatCard
            title="Client Rating"
            value="4.9/5"
            icon={Star}
            description="Average rating from our clients."
            iconBgColor="bg-orange-100"
            iconTextColor="text-orange-600"
            className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg"
          />
        </div>
      </AnimatedSection>
      <div className="w-4/5 sm:w-2/3 md:w-1/2 mx-auto">
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <AnimatedSection className="text-center">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">Our Most In-Demand Services</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
            Explore the trusted financial solutions our clients count on.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mx-4 sm:mx-16">
          {quickServices.map((service, index) => (
            <Link href={service.href!} key={index}>
              <div
                className={`group relative p-5 sm:p-6 rounded-2xl transition-all duration-300 ${service.color} ${service.hoverColor} border ${service.borderColor} flex flex-col items-center text-center shadow-soft h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
              >
                <div
                  className={`p-3 sm:p-4 rounded-xl ${service.iconColor} bg-white/90 mb-3 sm:mb-4 shadow-md ring-1 ring-white/60`}
                >
                  <service.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>
      <div className="w-4/5 sm:w-2/3 md:w-1/2 mx-auto">
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <AnimatedSection className="text-center mb-12 sm:mb-16">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">What Our Clients Say About Us</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Discover how we’ve helped others achieve lasting financial confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mx-4 sm:mx-0">
          <TestimonialCard
            name="Alice Johnson"
            role="Marketing Manager"
            testimonial="The best financial advice I've ever received. The team is knowledgeable, professional, and truly cares about their clients."
            avatarSrc="/placeholder-user.jpg"
          />
          <TestimonialCard
            name="David Smith"
            role="Software Engineer"
            testimonial="My investments have seen consistent growth since I started working with them. Highly recommended!"
            avatarSrc="/placeholder-user.jpg"
          />
          <TestimonialCard
            name="Sophia Williams"
            role="Doctor"
            testimonial="They made the complex world of insurance easy to understand. I feel much more secure about my family's future."
            avatarSrc="/placeholder-user.jpg"
          />
        </div>
      </AnimatedSection>
      <AnimatedSection className="bg-white/50 backdrop-blur-2xl p-6 sm:p-16 rounded-2xl text-center border-4 border-emerald-600 shadow-strong mx-4 sm:mx-16 mt-28 sm:mt-36 mb-24 sm:mb-32">
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">Begin Your Journey to Financial Freedom</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto mb-8 text-pretty">
              Let’s turn your goals into a clear, confident plan.
            </p>
          </div>
                  <a
            href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            aria-label="Contact us on WhatsApp"
          >
            <Button size="lg" className="xl:h-12 xl:px-10" variant="gradient-emerald">Contact Us</Button>
          </a>
        </AnimatedSection>
    </div>
  );
}
