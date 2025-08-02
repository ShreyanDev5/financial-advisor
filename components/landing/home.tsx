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
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-200/50",
      hoverColor: "hover:from-emerald-500/30 hover:to-teal-500/30",
    },
    {
      title: "Mutual Funds",
      icon: TrendingUp,
      color: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200/50",
      hoverColor: "hover:from-blue-500/30 hover:to-indigo-500/30",
    },
    {
      title: "PAN Card",
      icon: CreditCard,
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500",
      borderColor: "border-orange-200/50",
      hoverColor: "hover:from-orange-500/30 hover:to-red-500/30",
    },
    {
      title: "Tax Filing",
      icon: Calculator,
      color: "from-purple-500/20 to-violet-500/20",
      iconColor: "text-purple-500",
      borderColor: "border-purple-200/50",
      hoverColor: "hover:from-purple-500/30 hover:to-violet-500/30",
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        title="Your Financial Journey, Simplified"
        description="Expert advice and comprehensive services to help you achieve your financial goals. Whether you're planning for retirement, investing in the market, or securing your family's future, we're here to guide you every step of the way."
      />
      <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {quickServices.map((service, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br ${service.color} ${service.hoverColor} border ${service.borderColor} flex flex-col items-center text-center`}
          >
            <div
              className={`p-4 rounded-full ${service.iconColor} bg-white mb-4 shadow-md`}
            >
              <service.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
          </div>
        ))}
      </AnimatedSection>
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            title="Happy Clients"
            value="1,250+"
            icon={Users}
            description="Satisfied clients across the country."
          />
          <StatCard
            title="Services Offered"
            value="25+"
            icon={Award}
            description="Wide range of financial services."
          />
          <StatCard
            title="Growth Rate"
            value="15%"
            icon={TrendingUp}
            description="Annual growth in client investments."
          />
          <StatCard
            title="Client Rating"
            value="4.9/5"
            icon={Star}
            description="Average rating from our clients."
          />
        </div>
      </AnimatedSection>
      <AnimatedSection className="text-center">
        <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          We pride ourselves on providing exceptional service. Here's what our
          clients have to say about their experience with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <AnimatedSection className="bg-gray-50/80 p-12 rounded-xl text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Take the first step towards a secure financial future. Contact us today
          for a free consultation.
        </p>
        <Button size="lg">Contact Us</Button>
      </AnimatedSection>
    </div>
  );
}
