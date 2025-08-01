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
      color: "from-emerald-50/90 to-teal-50/90",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-100/50",
      hoverColor: "hover:from-emerald-100/50 hover:to-teal-100/50",
    },
    {
      title: "Tax Filing",
      icon: Calculator,
      color: "from-blue-50/90 to-indigo-50/90",
      iconColor: "text-blue-500",
      borderColor: "border-blue-100/50",
      hoverColor: "hover:from-blue-100/50 hover:to-indigo-100/50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Redesigned Hero Section */}
      <AnimatedSection animation="fade-up" delay={0} duration={600}>
        <div className="relative text-center py-20 px-6 bg-white rounded-3xl shadow-strong border border-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-transparent"></div>
          <div className="relative z-10">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-navy mb-4 tracking-tight">
              Take Control of Your Wealth
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-8 leading-relaxed">
              Partner with{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Monotosh Sardar
              </span>{" "}
              for personalized financial guidance and lasting peace of mind.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section with Tilted Hover Effects */}
      <AnimatedSection animation="fade-up" delay={0} duration={600}>
        <div className="relative py-16">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-white/30">
              <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-2">
                Our Impact in Numbers
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto mb-10"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    number: "500+",
                    label: "Clients Served",
                    color: "from-emerald-500 to-teal-500",
                    icon: UserRoundCheck,
                    bgGradient: "from-emerald-50/80 to-teal-50/80",
                  },
                  {
                    number: "15+",
                    label: "Years Experience",
                    color: "from-blue-500 to-indigo-500",
                    icon: Clock,
                    bgGradient: "from-blue-50/80 to-indigo-50/80",
                  },
                  {
                    number: "₹50Cr+",
                    label: "Assets Managed",
                    color: "from-emerald-600 to-teal-600",
                    icon: TrendingUp,
                    bgGradient: "from-emerald-50/80 to-teal-50/80",
                  },
                  {
                    number: "98%",
                    label: "Client Satisfaction",
                    color: "from-blue-600 to-indigo-600",
                    icon: HeartHandshake,
                    bgGradient: "from-blue-50/80 to-indigo-50/80",
                  },
                ].map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced Quick Services */}
      <AnimatedSection animation="fade-up" delay={100} duration={600}>
        <div className="relative py-16">
          <div className="relative max-w-7xl mx-auto bg-gradient-to-br from-gray-50/80 via-white to-blue-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/40 transition-all duration-300">
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-2xl"></div>

            <div className="relative">
              <div className="text-center mb-8">
                <h3 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                  Quick Services
                </h3>
                <div className="w-20 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {quickServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={index}
                      className={`
                        relative overflow-hidden group
                        flex flex-col items-center gap-4 p-6 rounded-2xl 
                        bg-gradient-to-br ${service.color} 
                        border ${service.borderColor}
                        ${service.hoverColor}
                        backdrop-blur-sm transition-all duration-300 
                        transform hover:scale-105 hover:-translate-y-1
                        shadow-sm hover:shadow-lg
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                      <div
                        className={`
                        w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm
                        flex items-center justify-center 
                        group-hover:scale-110 group-hover:rotate-6 
                        transition-all duration-300 shadow-lg
                        border border-white/50
                      `}
                      >
                        <Icon className={`w-8 h-8 ${service.iconColor}`} />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 text-center leading-tight">
                        {service.title}
                      </span>

                      {/* Bottom accent line */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${service.iconColor.replace(
                          "text-",
                          "bg-"
                        )} opacity-60`}
                      ></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced About Section */}
      <AnimatedSection animation="fade-up" delay={200} duration={600}>
        <div className="relative py-16">
          <div className="relative max-w-7xl mx-auto bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/40 transition-all duration-300">
            {/* Decorative corner elements */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-teal-100/30 to-transparent rounded-tl-3xl"></div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-serif text-3xl font-bold text-gray-900">About Me</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-400"></div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8 text-lg font-medium">
                With over 15 years of experience in financial planning, I specialize in helping individuals and families
                achieve their financial goals through strategic investment planning and comprehensive insurance
                solutions.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  {
                    text: "AMFI Certified",
                    color: "from-emerald-100/80 to-teal-100/80 text-emerald-700 border-emerald-200/50",
                  },
                  { text: "LIC Advisor", color: "from-blue-100/80 to-indigo-100/80 text-blue-700 border-blue-200/50" },
                  {
                    text: "Insurance Expert",
                    color: "from-emerald-100/80 to-teal-100/80 text-emerald-700 border-emerald-200/50",
                  },
                  {
                    text: "15+ Years Experience",
                    color: "from-blue-100/80 to-indigo-100/80 text-blue-700 border-blue-200/50",
                  },
                ].map((badge, index) => (
                  <span
                    key={index}
                    className={`
                      bg-gradient-to-r ${badge.color} 
                      px-4 py-2 rounded-xl text-sm font-semibold 
                      backdrop-blur-sm border
                      hover:scale-105 transition-transform duration-200
                      shadow-sm hover:shadow-md
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Client Testimonials Section */}
      <AnimatedSection animation="fade-up" delay={300} duration={600}>
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-brand-navy">What Our Clients Say</h2>
            <p className="text-lg text-gray-500 mt-3">We are proud to have earned the trust of our clients.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              testimonial="Monotosh has been instrumental in helping me secure my family's future. His advice is always clear, concise, and effective."
              clientName="- A. Sharma"
            />
            <TestimonialCard
              testimonial="I finally feel in control of my finances. Thank you for your expert guidance and personalized approach."
              clientName="- R. Patel"
            />
            <TestimonialCard
              testimonial="The best financial advisor I have ever worked with. Highly recommended!"
              clientName="- S. Khan"
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
