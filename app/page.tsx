"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Home,
  Shield,
  TrendingUp,
  FileText,
  DollarSign,
  Target,
  BarChart3,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Car,
  Bike,
  Heart,
  CreditCard,
  Building,
  UserCheck,
  FileCheck,
  Calculator,
  Briefcase,
  ScrollText,
  Baby,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import Image from "next/image"

// Optimized intersection observer hook with performance improvements
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Use a single observer instance with optimized settings
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true)
          setHasAnimated(true)
          // Disconnect observer after animation to improve performance
          observerRef.current?.disconnect()
        }
      },
      {
        threshold: 0.05, // Reduced threshold for faster triggering
        rootMargin: "100px 0px", // Increased root margin for earlier triggering
        ...options,
      },
    )

    observerRef.current.observe(element)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [hasAnimated, options])

  return [ref, isIntersecting] as const
}

// Performance-optimized scroll hook
function useScrollOptimization() {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolling(true)

          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }

          // Set scroll end detection
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false)
          }, 150)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return isScrolling
}

// Optimized animated section wrapper with reduced motion support
function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 600,
}: {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in"
  delay?: number
  duration?: number
}) {
  const [ref, isVisible] = useIntersectionObserver()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const getAnimationClasses = useCallback(() => {
    if (prefersReducedMotion) {
      return "opacity-100 transform-none"
    }

    const baseDuration = duration < 400 ? 400 : duration
    const baseClasses = `transition-all ease-out will-change-transform`
    const durationClass = `duration-${baseDuration}`

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} ${durationClass} opacity-0 translate-y-6`
        case "fade-in":
          return `${baseClasses} ${durationClass} opacity-0`
        case "slide-left":
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-6`
        case "slide-right":
          return `${baseClasses} ${durationClass} opacity-0 translate-x-6`
        case "scale-in":
          return `${baseClasses} ${durationClass} opacity-0 scale-98`
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-6`
      }
    }

    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }, [isVisible, animation, duration, prefersReducedMotion])

  const style = prefersReducedMotion ? {} : { transitionDelay: `${delay}ms` }

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`} style={style}>
      {children}
    </div>
  )
}

// Enhanced Service Card Component with optimized animations
function ServiceCard({
  title,
  description,
  benefits,
  documents,
  process,
  pricing,
  icon: Icon,
  ctaText = "Get Started",
  onCTAClick,
  delay = 0,
  colorScheme = "emerald",
}: {
  title: string
  description: string
  benefits: string[]
  documents?: string[]
  process?: string[]
  pricing?: string
  icon: any
  ctaText?: string
  onCTAClick?: () => void
  delay?: number
  colorScheme?: "emerald" | "blue" | "purple" | "orange" | "teal"
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCTAClick = useCallback(() => {
    window.open(
      "https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services",
      "_blank",
      "noopener,noreferrer",
    )
  }, [])

  const getColorClasses = useCallback(() => {
    switch (colorScheme) {
      case "blue":
        return {
          iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
          iconColor: "text-blue-600",
          button: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
          accent: "text-blue-500",
          checkColor: "text-blue-500",
          stepBg: "bg-blue-100",
          stepText: "text-blue-600",
        }
      case "purple":
        return {
          iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
          iconColor: "text-purple-600",
          button: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
          accent: "text-purple-500",
          checkColor: "text-purple-500",
          stepBg: "bg-purple-100",
          stepText: "text-purple-600",
        }
      case "orange":
        return {
          iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
          iconColor: "text-orange-600",
          button: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
          accent: "text-orange-500",
          checkColor: "text-orange-500",
          stepBg: "bg-orange-100",
          stepText: "text-orange-600",
        }
      case "teal":
        return {
          iconBg: "bg-gradient-to-br from-teal-100 to-teal-200",
          iconColor: "text-teal-600",
          button: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
          accent: "text-teal-500",
          checkColor: "text-teal-500",
          stepBg: "bg-teal-100",
          stepText: "text-teal-600",
        }
      default:
        return {
          iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
          iconColor: "text-emerald-600",
          button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
          accent: "text-emerald-500",
          checkColor: "text-emerald-500",
          stepBg: "bg-emerald-100",
          stepText: "text-emerald-600",
        }
    }
  }, [colorScheme])

  const colors = getColorClasses()

  return (
    <AnimatedSection animation="fade-up" delay={delay} duration={500}>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl hover:bg-white/90 transition-all duration-300 group transform-gpu">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200 transform-gpu`}
            >
              <Icon className={`w-7 h-7 ${colors.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              {pricing && <p className={`${colors.accent} font-semibold text-sm`}>{pricing}</p>}
            </div>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
            <ul className="space-y-2">
              {benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className={`w-4 h-4 ${colors.checkColor} mt-0.5 flex-shrink-0`} />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={handleCTAClick}
              className={`flex-1 ${colors.button} text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transform-gpu`}
            >
              {ctaText}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-3 bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm rounded-2xl font-semibold text-gray-700 transition-all duration-200 flex items-center gap-2 transform-gpu"
            >
              Details
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Optimized Expanded Details */}
        <div
          className={`
            transition-all duration-300 ease-out overflow-hidden transform-gpu
            ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-6 pb-6 border-t border-gray-100/50 space-y-4">
            {documents && (
              <div className="pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Required Documents</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                      <div className={`w-1.5 h-1.5 ${colors.accent.replace("text-", "bg-")} rounded-full`}></div>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {process && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Application Process</h4>
                <ol className="space-y-2">
                  {process.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                      <div
                        className={`w-6 h-6 ${colors.stepBg} rounded-full flex items-center justify-center ${colors.stepText} font-semibold text-xs mt-0.5`}
                      >
                        {index + 1}
                      </div>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// Optimized Bottom Navigation Component
function BottomNavigation({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home, colorScheme: "emerald" },
    { id: "insurance", label: "Insurance", icon: Shield, colorScheme: "blue" },
    { id: "invest", label: "Invest", icon: TrendingUp, colorScheme: "orange" },
    { id: "documents", label: "Documents", icon: FileText, colorScheme: "purple" },
  ]

  const getTabColors = useCallback((colorScheme: string, isActive: boolean) => {
    const colors = {
      emerald: {
        bg: isActive ? "bg-gradient-to-br from-emerald-50 to-teal-50" : "",
        button: isActive ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-emerald-600" : "text-gray-400",
      },
      blue: {
        bg: isActive ? "bg-gradient-to-br from-blue-50 to-indigo-50" : "",
        button: isActive ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-blue-600" : "text-gray-400",
      },
      orange: {
        bg: isActive ? "bg-gradient-to-br from-orange-50 to-red-50" : "",
        button: isActive ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-orange-600" : "text-gray-400",
      },
      purple: {
        bg: isActive ? "bg-gradient-to-br from-purple-50 to-violet-50" : "",
        button: isActive ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-purple-600" : "text-gray-400",
      },
    }
    return colors[colorScheme as keyof typeof colors] || colors.emerald
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-white/20 safe-area-pb z-50 shadow-2xl">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const tabColors = getTabColors(tab.colorScheme, isActive)

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center gap-1 py-2 px-3 rounded-2xl
                transition-all duration-200 ease-out
                transform hover:scale-105 active:scale-95
                touch-manipulation select-none transform-gpu
                ${tabColors.bg}
              `}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 transform-gpu ${tabColors.button}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium transition-colors duration-200 ${tabColors.text}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Optimized Home Tab Content
function HomeContent() {
  const [showContact, setShowContact] = useState(false)

  const stats = [
    { number: "500+", label: "Clients Served", color: "from-emerald-500 to-teal-500" },
    { number: "15+", label: "Years Experience", color: "from-blue-500 to-indigo-500" },
    { number: "₹50Cr+", label: "Assets Managed", color: "from-purple-500 to-pink-500" },
    { number: "98%", label: "Client Satisfaction", color: "from-orange-500 to-red-500" },
  ]

  const quickServices = [
    { title: "Health Insurance", icon: Heart, color: "from-red-100 to-pink-100", iconColor: "text-red-500" },
    { title: "Mutual Funds", icon: TrendingUp, color: "from-blue-100 to-indigo-100", iconColor: "text-blue-500" },
    { title: "PAN Card", icon: CreditCard, color: "from-purple-100 to-violet-100", iconColor: "text-purple-500" },
    { title: "Tax Filing", icon: Calculator, color: "from-emerald-100 to-teal-100", iconColor: "text-emerald-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Advisor Profile Header */}
      <AnimatedSection animation="fade-up" delay={0} duration={500}>
        <div className="bg-gradient-to-br from-white/90 to-emerald-50/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white/50">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Monotosh Sardar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                Monotosh Sardar
              </h2>
              <p className="text-emerald-600 font-semibold mb-2">Financial Planner & Advisor</p>
              <p className="text-gray-600 text-sm">Mumbai, Maharashtra</p>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setShowContact(!showContact)}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl transform-gpu"
            >
              Contact Me
            </button>
            <a
              href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2 transform-gpu"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          <div
            className={`
              transition-all duration-200 ease-out overflow-hidden transform-gpu
              ${showContact ? "opacity-100 max-h-32 translate-y-0" : "opacity-0 max-h-0 -translate-y-2"}
            `}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/30">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="tel:+919836472260"
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-500 transition-colors duration-200 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href="mailto:monotosh@example.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-500 transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
                <a
                  href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-500 transition-colors duration-200 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced Stats Grid */}
      <AnimatedSection animation="fade-up" delay={100} duration={500}>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/90 transition-all duration-200 transform hover:-translate-y-1 group transform-gpu"
            >
              <div
                className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-200 transform-gpu`}
              >
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Enhanced Quick Services */}
      <AnimatedSection animation="fade-up" delay={200} duration={500}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Services</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickServices.map((service, index) => {
              const Icon = service.icon
              return (
                <button
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/30 hover:bg-white/50 backdrop-blur-sm transition-all duration-200 transform hover:scale-105 group transform-gpu"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm transform-gpu`}
                  >
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{service.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced About Section */}
      <AnimatedSection animation="fade-up" delay={300} duration={500}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            With over 15 years of experience in financial planning, I specialize in helping individuals and families
            achieve their financial goals through strategic investment planning and comprehensive insurance solutions.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { text: "AMFI Certified", color: "from-emerald-100 to-teal-100 text-emerald-700" },
              { text: "LIC Advisor", color: "from-blue-100 to-indigo-100 text-blue-700" },
              { text: "Insurance Expert", color: "from-purple-100 to-violet-100 text-purple-700" },
              { text: "15+ Years Experience", color: "from-orange-100 to-red-100 text-orange-700" },
            ].map((badge, index) => (
              <span
                key={index}
                className={`bg-gradient-to-r ${badge.color} px-3 py-1 rounded-xl text-sm font-medium backdrop-blur-sm`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

// Insurance Tab Content with optimized animations
function InsuranceContent() {
  const healthInsuranceServices = {
    title: "Star Health and Care Insurance",
    description:
      "Comprehensive health insurance solutions from Star Health, one of India's leading health insurance providers.",
    benefits: [
      "Cashless treatment at 14,000+ network hospitals",
      "Coverage for pre and post hospitalization expenses",
      "No claim bonus up to 100% of sum insured",
      "Coverage for day care procedures",
      "Free health check-ups",
      "24/7 customer support",
    ],
    documents: [
      "Filled application form",
      "Age proof (Birth certificate, Passport, etc.)",
      "Identity proof (Aadhaar, PAN, Passport)",
      "Address proof (Utility bills, Aadhaar)",
      "Medical reports (if required)",
      "Passport size photographs",
    ],
    process: [
      "Fill the application form with accurate details",
      "Submit required documents",
      "Medical examination (if required)",
      "Premium payment",
      "Policy issuance within 15 days",
    ],
    pricing: "Premium starts from ₹3,500/year",
  }

  const vehicleInsuranceServices = [
    {
      title: "Two-Wheeler Insurance",
      description:
        "Comprehensive insurance coverage for your motorcycle or scooter with third-party and own damage protection.",
      benefits: [
        "Third-party liability coverage (mandatory)",
        "Own damage coverage for accidents, theft, fire",
        "Personal accident cover for owner-driver",
        "Zero depreciation add-on available",
        "Roadside assistance",
        "Quick claim settlement",
      ],
      documents: [
        "Vehicle Registration Certificate (RC)",
        "Driving License",
        "Previous insurance policy (for renewal)",
        "PAN Card",
        "Aadhaar Card",
        "Vehicle inspection report (if required)",
      ],
      process: [
        "Vehicle inspection and documentation",
        "Premium calculation based on IDV",
        "Policy selection and customization",
        "Premium payment",
        "Policy certificate issuance",
      ],
      pricing: "Premium starts from ₹1,500/year",
      icon: Bike,
      colorScheme: "blue" as const,
    },
    {
      title: "Four-Wheeler Insurance",
      description: "Complete car insurance protection with comprehensive coverage options and add-on benefits.",
      benefits: [
        "Comprehensive coverage for car damage",
        "Third-party liability protection",
        "Personal accident cover",
        "Zero depreciation cover available",
        "Engine protection add-on",
        "24/7 roadside assistance",
      ],
      documents: [
        "Vehicle Registration Certificate (RC)",
        "Driving License",
        "Previous insurance policy",
        "PAN Card",
        "Aadhaar Card",
        "Vehicle fitness certificate (for commercial)",
      ],
      process: [
        "Vehicle details verification",
        "IDV calculation and premium quote",
        "Policy terms selection",
        "Add-on covers selection",
        "Premium payment and policy issuance",
      ],
      pricing: "Premium starts from ₹5,000/year",
      icon: Car,
      colorScheme: "purple" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <AnimatedSection animation="fade-up" delay={0} duration={400}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1 mt-2.5">
            Insurance Services
          </h2>
          <p className="text-gray-600">Comprehensive protection for your peace of mind</p>
        </div>
      </AnimatedSection>

      {/* Health Insurance */}
      <ServiceCard
        title={healthInsuranceServices.title}
        description={healthInsuranceServices.description}
        benefits={healthInsuranceServices.benefits}
        documents={healthInsuranceServices.documents}
        process={healthInsuranceServices.process}
        pricing={healthInsuranceServices.pricing}
        icon={Heart}
        ctaText="Get Health Quote"
        colorScheme="emerald"
        delay={100}
      />

      {/* Vehicle Insurance */}
      {vehicleInsuranceServices.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          documents={service.documents}
          process={service.process}
          pricing={service.pricing}
          icon={service.icon}
          ctaText="Get Vehicle Quote"
          colorScheme={service.colorScheme}
          delay={200 + index * 100}
        />
      ))}
    </div>
  )
}

// Invest Tab Content with optimized animations
function InvestContent() {
  const mutualFundServices = {
    title: "Licensed Mutual Fund Advisor",
    description:
      "Professional mutual fund advisory services with AMFI certification to help you build wealth through systematic investments.",
    benefits: [
      "AMFI certified advisory services",
      "Personalized portfolio management",
      "SIP and lump sum investment options",
      "Regular portfolio review and rebalancing",
      "Tax-efficient investment strategies",
      "Goal-based financial planning",
      "Direct mutual fund investments",
      "No hidden charges or commissions",
    ],
    documents: [
      "PAN Card (mandatory)",
      "Aadhaar Card",
      "Bank account details",
      "Cancelled cheque",
      "Income proof",
      "KYC documents",
      "Passport size photographs",
    ],
    process: [
      "Financial goal assessment",
      "Risk profiling and investment capacity analysis",
      "Portfolio recommendation based on goals",
      "KYC completion and documentation",
      "Investment execution and monitoring",
      "Regular review and rebalancing",
    ],
    pricing: "SIP starts from ₹500/month",
  }

  const investmentOptions = [
    {
      title: "Equity Mutual Funds",
      returns: "12-15% p.a.",
      risk: "High",
      tenure: "5+ years",
      icon: TrendingUp,
      color: "from-emerald-100 to-teal-100",
      iconColor: "text-emerald-500",
    },
    {
      title: "Debt Mutual Funds",
      returns: "7-9% p.a.",
      risk: "Low to Medium",
      tenure: "1-3 years",
      icon: Shield,
      color: "from-blue-100 to-indigo-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Hybrid Funds",
      returns: "9-12% p.a.",
      risk: "Medium",
      tenure: "3-5 years",
      icon: BarChart3,
      color: "from-purple-100 to-violet-100",
      iconColor: "text-purple-500",
    },
    {
      title: "ELSS Tax Saver",
      returns: "10-14% p.a.",
      risk: "High",
      tenure: "3+ years",
      icon: Target,
      color: "from-orange-100 to-red-100",
      iconColor: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      <AnimatedSection animation="fade-up" delay={0} duration={400}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-7 mt-2.5 mb-1">
            Investment Solutions
          </h2>
          <p className="text-gray-600">Grow your wealth with smart investment strategies</p>
        </div>
      </AnimatedSection>

      {/* Mutual Fund Advisory */}
      <ServiceCard
        title={mutualFundServices.title}
        description={mutualFundServices.description}
        benefits={mutualFundServices.benefits}
        documents={mutualFundServices.documents}
        process={mutualFundServices.process}
        pricing={mutualFundServices.pricing}
        icon={TrendingUp}
        ctaText="Start Investing"
        colorScheme="blue"
        delay={100}
      />

      {/* Investment Options */}
      <AnimatedSection animation="fade-up" delay={200} duration={500}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Options</h3>
          <div className="grid gap-4">
            {investmentOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl hover:from-white/80 hover:to-gray-50/80 transition-all duration-200 border border-white/30 group transform-gpu"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm transform-gpu`}
                    >
                      <Icon className={`w-6 h-6 ${option.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{option.title}</h4>
                      <p className="text-sm text-gray-600">
                        {option.returns} • {option.risk} Risk • {option.tenure}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

// Documents Tab Content with optimized animations
function DocumentsContent() {
  const [isGovDocsExpanded, setIsGovDocsExpanded] = useState(true)
  const [isTaxServicesExpanded, setIsTaxServicesExpanded] = useState(true)

  const documentServices = [
    {
      title: "PAN Card Services",
      description: "New PAN card applications and corrections with fast processing and doorstep delivery.",
      benefits: [
        "New PAN card application",
        "PAN card corrections and updates",
        "Duplicate PAN card issuance",
        "Online application tracking",
        "Doorstep delivery available",
        "Expert assistance throughout",
      ],
      documents: [
        "Identity proof (Aadhaar, Passport, Voter ID)",
        "Address proof (Utility bills, Aadhaar)",
        "Date of birth proof",
        "Passport size photographs",
        "Form 49A (for new) or 49AA (for corrections)",
      ],
      process: [
        "Document verification and form filling",
        "Online application submission",
        "Payment of processing fees",
        "Acknowledgment receipt generation",
        "PAN card delivery within 15-20 days",
      ],
      pricing: "₹107 for new application",
      icon: CreditCard,
      colorScheme: "purple" as const,
    },
    {
      title: "Voter ID Services",
      description: "Voter ID card registration and corrections for Indian citizens above 18 years.",
      benefits: [
        "New voter registration",
        "Voter ID corrections",
        "Address change in voter list",
        "Duplicate voter ID issuance",
        "Online status tracking",
        "Complete documentation support",
      ],
      documents: [
        "Age proof (Birth certificate, Passport)",
        "Address proof (Utility bills, Aadhaar)",
        "Identity proof (Aadhaar, PAN)",
        "Passport size photographs",
        "Form 6 (new registration) or Form 8 (corrections)",
      ],
      process: [
        "Eligibility verification",
        "Form filling and documentation",
        "Online application submission",
        "Field verification by officials",
        "Voter ID card issuance",
      ],
      pricing: "Free of cost",
      icon: UserCheck,
      colorScheme: "blue" as const,
    },
    {
      title: "Aadhaar Card Services",
      description: "Aadhaar enrollment and update services with biometric verification.",
      benefits: [
        "New Aadhaar enrollment",
        "Aadhaar updates and corrections",
        "Mobile number and email updates",
        "Address change services",
        "Biometric updates",
        "Aadhaar PVC card ordering",
      ],
      documents: [
        "Proof of Identity (POI)",
        "Proof of Address (POA)",
        "Date of birth proof (POB)",
        "Relationship proof (for children)",
        "Existing Aadhaar (for updates)",
      ],
      process: [
        "Document verification",
        "Biometric data capture",
        "Demographic data entry",
        "Application submission",
        "Aadhaar generation within 90 days",
      ],
      pricing: "₹50 for new enrollment",
      icon: FileCheck,
      colorScheme: "orange" as const,
    },
    {
      title: "Ration Card Services",
      description: "Ration card application for accessing subsidized food grains under PDS.",
      benefits: [
        "New ration card application",
        "Ration card corrections",
        "Addition/deletion of family members",
        "Duplicate ration card issuance",
        "Category change applications",
        "Complete application support",
      ],
      documents: [
        "Family income certificate",
        "Address proof documents",
        "Identity proof of all members",
        "Aadhaar cards of family members",
        "Bank account details",
        "Passport size photographs",
      ],
      process: [
        "Eligibility assessment",
        "Application form completion",
        "Document submission",
        "Verification by officials",
        "Ration card issuance",
      ],
      pricing: "₹15 application fee",
      icon: Building,
      colorScheme: "teal" as const,
    },
    {
      title: "Driving License & Motor Vehicle Services",
      description: "Complete driving license and vehicle registration services with RTO assistance.",
      benefits: [
        "Learner's license application",
        "Permanent driving license",
        "License renewal services",
        "Vehicle registration",
        "RC transfer services",
        "NOC and other RTO services",
      ],
      documents: [
        "Age proof documents",
        "Address proof documents",
        "Medical certificate (if required)",
        "Passport size photographs",
        "Previous license (for renewal)",
        "Vehicle documents (for registration)",
      ],
      process: [
        "Document verification",
        "Online application submission",
        "Test scheduling (if required)",
        "Fee payment",
        "License/RC issuance",
      ],
      pricing: "₹200 for learner's license",
      icon: Car,
      colorScheme: "blue" as const,
    },
    {
      title: "Birth Certificate Services",
      description: "Birth certificate registration and corrections for legal documentation.",
      benefits: [
        "Birth registration services",
        "Birth certificate corrections",
        "Duplicate certificate issuance",
        "Late registration assistance",
        "Online application support",
        "Fast processing available",
      ],
      documents: [
        "Hospital discharge summary",
        "Parents' identity proof",
        "Parents' address proof",
        "Marriage certificate of parents",
        "Affidavit (for late registration)",
      ],
      process: [
        "Document collection and verification",
        "Application form completion",
        "Submission to registrar office",
        "Verification process",
        "Certificate issuance",
      ],
      pricing: "₹50 for registration",
      icon: Baby,
      colorScheme: "purple" as const,
    },
    {
      title: "Trade License Services",
      description: "Trade license registration for businesses and commercial establishments.",
      benefits: [
        "New trade license application",
        "License renewal services",
        "License modifications",
        "NOC assistance",
        "Compliance support",
        "Expert guidance throughout",
      ],
      documents: [
        "Business registration documents",
        "Property ownership/rental agreement",
        "Identity and address proof",
        "NOC from fire department",
        "Pollution clearance certificate",
        "Partnership deed (if applicable)",
      ],
      process: [
        "Business eligibility assessment",
        "Documentation preparation",
        "Application submission",
        "Inspection by authorities",
        "License issuance",
      ],
      pricing: "Varies by business type",
      icon: Briefcase,
      colorScheme: "orange" as const,
    },
  ]

  const taxServices = [
    {
      title: "Income Tax Filing",
      description: "Professional income tax return filing services for individuals and businesses.",
      benefits: [
        "ITR filing for all categories",
        "Tax planning and optimization",
        "Refund processing assistance",
        "Notice handling support",
        "TDS return filing",
        "Expert tax consultation",
      ],
      documents: [
        "Form 16/16A (salary/other income)",
        "Bank statements",
        "Investment proofs",
        "Property documents",
        "Business books (for business income)",
        "Previous year ITR",
      ],
      process: [
        "Income and investment analysis",
        "Tax calculation and planning",
        "ITR preparation and review",
        "Online filing and verification",
        "Acknowledgment and refund tracking",
      ],
      pricing: "₹500 onwards",
      icon: Calculator,
      colorScheme: "emerald" as const,
    },
    {
      title: "Professional Tax Services",
      description: "Professional tax registration and compliance for employees and professionals.",
      benefits: [
        "Professional tax registration",
        "Monthly return filing",
        "Compliance management",
        "Penalty avoidance",
        "Expert consultation",
        "Timely reminders",
      ],
      documents: ["Employment certificate", "Salary certificate", "PAN card", "Aadhaar card", "Bank account details"],
      process: [
        "Registration with authorities",
        "Monthly tax calculation",
        "Return preparation and filing",
        "Payment processing",
        "Compliance monitoring",
      ],
      pricing: "₹200 per month",
      icon: FileText,
      colorScheme: "blue" as const,
    },
    {
      title: "Agreement Services",
      description: "Legal agreement drafting and documentation services for various purposes.",
      benefits: [
        "Rental agreement drafting",
        "Partnership agreements",
        "Service agreements",
        "Employment contracts",
        "Legal consultation",
        "Stamp paper arrangements",
      ],
      documents: [
        "Party identification documents",
        "Property documents (if applicable)",
        "Terms and conditions",
        "Witness details",
        "Stamp paper",
      ],
      process: [
        "Requirement understanding",
        "Agreement drafting",
        "Review and modifications",
        "Stamp paper execution",
        "Registration (if required)",
      ],
      pricing: "₹1,000 onwards",
      icon: ScrollText,
      colorScheme: "purple" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <AnimatedSection animation="fade-up" delay={0} duration={400}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-2.5 mb-1">
            Document & Legal Services
          </h2>
          <p className="text-gray-600">Complete documentation support for all your needs</p>
        </div>
      </AnimatedSection>

      {/* Collapsible Government Documentation Services */}
      <AnimatedSection animation="fade-up" delay={100} duration={400}>
        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 overflow-hidden">
          <button
            onClick={() => setIsGovDocsExpanded(!isGovDocsExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-blue-50/50 transition-all duration-200 group"
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                Government Documentation
              </h3>
              <p className="text-gray-600 text-sm">Essential government document services with expert assistance</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-600 font-semibold text-sm bg-blue-100/80 px-3 py-1 rounded-full">
                {documentServices.length} Services
              </div>
              <ChevronDown
                className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                  isGovDocsExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          <div
            className={`
              transition-all duration-500 ease-out overflow-hidden
              ${isGovDocsExpanded ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="px-6 pb-6 space-y-6 border-t border-blue-100/50">
              {documentServices.map((service, index) => (
                <div key={index} className="pt-6 first:pt-6">
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    benefits={service.benefits}
                    documents={service.documents}
                    process={service.process}
                    pricing={service.pricing}
                    icon={service.icon}
                    ctaText="Apply Now"
                    colorScheme={service.colorScheme}
                    delay={0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Collapsible Tax & Financial Services */}
      <AnimatedSection animation="fade-up" delay={200} duration={400}>
        <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 overflow-hidden">
          <button
            onClick={() => setIsTaxServicesExpanded(!isTaxServicesExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-emerald-50/50 transition-all duration-200 group"
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                Tax & Financial Services
              </h3>
              <p className="text-gray-600 text-sm">Professional tax and financial documentation services</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-emerald-600 font-semibold text-sm bg-emerald-100/80 px-3 py-1 rounded-full">
                {taxServices.length} Services
              </div>
              <ChevronDown
                className={`w-6 h-6 text-emerald-600 transition-transform duration-300 ${
                  isTaxServicesExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          <div
            className={`
              transition-all duration-500 ease-out overflow-hidden
              ${isTaxServicesExpanded ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="px-6 pb-6 space-y-6 border-t border-emerald-100/50">
              {taxServices.map((service, index) => (
                <div key={index} className="pt-6 first:pt-6">
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    benefits={service.benefits}
                    documents={service.documents}
                    process={service.process}
                    pricing={service.pricing}
                    icon={service.icon}
                    ctaText="Get Started"
                    colorScheme={service.colorScheme}
                    delay={0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default function FinancialAdvisorWebsite() {
  const [activeTab, setActiveTab] = useState("home")
  const isScrolling = useScrollOptimization()

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "home":
        return <HomeContent />
      case "insurance":
        return <InsuranceContent />
      case "invest":
        return <InvestContent />
      case "documents":
        return <DocumentsContent />
      default:
        return <HomeContent />
    }
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/50 relative overflow-hidden">
      {/* Enhanced Background with subtle textures */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/40 via-emerald-50/20 to-blue-50/30 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/20 via-transparent to-blue-100/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/10 via-transparent to-pink-100/10 pointer-events-none" />

      {/* Optimized animated background elements */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse pointer-events-none transform-gpu" />
      <div
        className="fixed bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse pointer-events-none transform-gpu"
        style={{ animationDelay: "2s" }}
      />

      {/* Redesigned Header with subtle gradients and clean aesthetic */}
      <AnimatedSection animation="fade-in" delay={0} duration={400}>
        <div className="relative z-10">
          {/* Subtle gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-blue-50/20 to-purple-50/30 pointer-events-none" />

          {/* Main header container */}
          <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
              {/* Left side - Logo and brand */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400/80 to-teal-500/80 rounded-xl flex items-center justify-center shadow-sm backdrop-blur-sm">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">FinanceFlow</h1>
                  <p className="text-xs text-gray-500 font-medium">Your Financial Partner</p>
                </div>
              </div>

              {/* Right side - WhatsApp contact */}
              <a
                href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-emerald-400/80 to-teal-500/80 hover:from-emerald-500/90 hover:to-teal-600/90 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Add spacing between header and content */}
      <div className="h-4"></div>

      {/* Main Content with scroll optimization */}
      <div className={`relative z-10 px-6 pb-24 ${isScrolling ? "will-change-scroll" : ""}`}>{renderContent()}</div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
