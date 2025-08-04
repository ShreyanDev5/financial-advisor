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
import { Separator } from "@/components/ui/separator";

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
        description={<span>Partner with <span className="underline-wavy">Monotosh Sardar</span> for personalized financial guidance and lasting peace of mind.</span>}
      />
      <AnimatedSection className="mx-4 sm:mx-16 mt-16 sm:mt-24">
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
      <Separator className="w-1/2 mx-auto" />
      <AnimatedSection className="text-center">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold">Our Most In-Demand Services</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
            Explore the trusted financial solutions our clients count on.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 sm:mx-16">
          {quickServices.map((service, index) => (
            <Link href={service.href!} key={index}>
              <div
                className={`p-6 rounded-xl transition-all duration-300 ${service.color} ${service.hoverColor} border ${service.borderColor} flex flex-col items-center text-center shadow-sm h-full`}
              >
                <div
                  className={`p-4 rounded-full ${service.iconColor} bg-white mb-4 shadow-md`}
                >
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>
      <Separator className="w-1/2 mx-auto" />
      <AnimatedSection className="text-center">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold">What Our Clients Say About Us</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Discover how we’ve helped others achieve lasting financial confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mx-4 sm:mx-0">
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
      <Separator className="w-1/2 mx-auto" />
      <AnimatedSection className="bg-white/50 backdrop-blur-2xl p-8 sm:p-16 rounded-2xl text-center border-4 border-emerald-600 shadow-strong mx-4 sm:mx-16">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold">Begin Your Journey to Financial Freedom</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
            Let’s turn your goals into a clear, confident plan.
          </p>
        </div>
                <a
          href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button size="lg" variant="gradient-emerald">Contact Us</Button>
        </a>
      </AnimatedSection>
    </div>
  );
}
