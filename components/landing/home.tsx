'use client';

import {
  Users,
  Award,
  TrendingUp,
  Star,
  Heart,
  CreditCard,
  Calculator,
  UserRoundCheck,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { PageHeader } from "@/components/ui/page-header";

export default function HomeContent() {
  const quickServices = [
    {
      title: "Health Insurance",
      icon: Heart,
      color: "from-emerald-50/90 to-teal-50/90",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-100/50",
      hoverColor: "hover:from-emerald-100/50 hover:to-teal-100/50",
    },
    {
      title: "Mutual Funds",
      icon: TrendingUp,
      color: "from-blue-50/90 to-indigo-50/90",
      iconColor: "text-blue-500",
      borderColor: "border-blue-100/50",
      hoverColor: "hover:from-blue-100/50 hover:to-indigo-100/50",
    },
    {
      title: "PAN Card",
      icon: CreditCard,
      color: "from-orange-50/90 to-red-50/90",
      iconColor: "text-orange-500",
      borderColor: "border-orange-100/50",
      hoverColor: "hover:from-orange-100/50 hover:to-red-100/50",
    },
    {
      title: "Tax Filing",
      icon: Calculator,
      color: "from-purple-50/90 to-violet-50/90",
      iconColor: "text-purple-500",
      borderColor: "border-purple-100/50",
      hoverColor: "hover:from-purple-100/50 hover:to-violet-100/50",
    },
  ];

  return (
    <div className="space-y-12">
      <PageHeader
        title="Your Financial Journey, Simplified"
        description="Expert advice and comprehensive services to help you achieve your financial goals. Whether you're planning for retirement, investing in the market, or securing your family's future, we're here to guide you every step of the way."
      />
      <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickServices.map((service, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-sm transition-all duration-300 ${service.color} ${service.hoverColor} border ${service.borderColor}`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${service.iconColor} bg-white`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </AnimatedSection>
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <AnimatedSection>
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
