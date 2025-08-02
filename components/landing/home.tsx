'use client';

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
      color: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-500/20",
      hoverColor: "hover:bg-emerald-500/20",
    },
    {
      title: "Mutual Funds",
      icon: TrendingUp,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      hoverColor: "hover:bg-blue-500/20",
    },
    {
      title: "PAN Card",
      icon: CreditCard,
      color: "bg-orange-500/10",
      iconColor: "text-orange-500",
      borderColor: "border-orange-500/20",
      hoverColor: "hover:bg-orange-500/20",
    },
    {
      title: "Tax Filing",
      icon: Calculator,
      color: "bg-purple-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      hoverColor: "hover:bg-purple-500/20",
    },
  ];

  return (
    <div className="space-y-32 pb-32">
      <PageHeader
        title="Your Financial Journey, Simplified"
        description="Expert advice and comprehensive services to help you achieve your financial goals. Whether you're planning for retirement, investing in the market, or securing your family's future, we're here to guide you every step of the way."
      />
      <AnimatedSection className="mx-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            title="Happy Clients"
            value="1,250+"
            icon={Users}
            description="Satisfied clients across the country."
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-600"
          />
          <StatCard
            title="Services Offered"
            value="25+"
            icon={Award}
            description="Wide range of financial services."
            iconBgColor="bg-emerald-100"
            iconTextColor="text-emerald-600"
          />
          <StatCard
            title="Growth Rate"
            value="15%"
            icon={TrendingUp}
            description="Annual growth in client investments."
            iconBgColor="bg-purple-100"
            iconTextColor="text-purple-600"
          />
          <StatCard
            title="Client Rating"
            value="4.9/5"
            icon={Star}
            description="Average rating from our clients."
            iconBgColor="bg-orange-100"
            iconTextColor="text-orange-600"
          />
        </div>
      </AnimatedSection>
      <AnimatedSection className="text-center">
        <h2 className="text-5xl font-bold mb-6">Our Core Services</h2>
        <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto">
          Explore the essential financial services designed to secure and grow your wealth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-16">
          {quickServices.map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 ${service.color} ${service.hoverColor} border ${service.borderColor} flex flex-col items-center text-center shadow-sm`}
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
          ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="text-center">
        <h2 className="text-5xl font-bold mb-6">What Our Clients Say</h2>
        <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto">
          We pride ourselves on providing exceptional service. Here's what our
          clients have to say about their experience with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
      <AnimatedSection className="bg-white/50 backdrop-blur-2xl p-16 rounded-2xl text-center border border-gray-200/60 shadow-lg mx-16">
        <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto">
          Take the first step towards a secure financial future. Contact us today
          for a free consultation.
        </p>
        <Button size="lg">Contact Us</Button>
      </AnimatedSection>
    </div>
  );
}
