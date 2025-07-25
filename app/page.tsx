"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Home,
  Shield,
  TrendingUp,
  FileText,
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
  Baby,
  CheckCircle,
  Sparkles,
  Star,
  Award,
  Users,
} from "lucide-react"
import Image from "next/image"

// Optimized intersection observer hook with performance improvements
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const observerRef = useRef(null)

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

  return [ref, isIntersecting]
}

// Performance-optimized scroll hook
function useScrollOptimization() {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef()

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
function AnimatedSection({ children, className = "", animation = "fade-up", delay = 0, duration = 600 }) {
  const [ref, isVisible] = useIntersectionObserver()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => {
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
  delay = 0,
  colorScheme = "emerald",
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
      <div className="premium-card-hover bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden group transform-gpu">
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
function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home, colorScheme: "emerald" },
    { id: "insurance", label: "Insurance", icon: Shield, colorScheme: "blue" },
    { id: "invest", label: "Invest", icon: TrendingUp, colorScheme: "orange" },
    { id: "documents", label: "Documents", icon: FileText, colorScheme: "purple" },
  ]

  const getTabColors = useCallback((colorScheme, isActive) => {
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
    return colors[colorScheme] || colors.emerald
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

// Enhanced Home Tab Content with refined card designs
function HomeContent() {
  const [showContact, setShowContact] = useState(false)

  const stats = [
    {
      number: "500+",
      label: "Clients Served",
      color: "from-emerald-500 to-teal-500",
      icon: Users,
      bgGradient: "from-emerald-50/80 to-teal-50/80",
    },
    {
      number: "15+",
      label: "Years Experience",
      color: "from-blue-500 to-indigo-500",
      icon: Award,
      bgGradient: "from-blue-50/80 to-indigo-50/80",
    },
    {
      number: "₹50Cr+",
      label: "Assets Managed",
      color: "from-purple-500 to-pink-500",
      icon: TrendingUp,
      bgGradient: "from-purple-50/80 to-violet-50/80",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      color: "from-orange-500 to-red-500",
      icon: Star,
      bgGradient: "from-orange-50/80 to-red-50/80",
    },
  ]

  const quickServices = [
    {
      title: "Health Insurance",
      icon: Heart,
      color: "from-red-50/90 to-pink-50/90",
      iconColor: "text-red-500",
      borderColor: "border-red-100/50",
      hoverColor: "hover:from-red-100/50 hover:to-pink-100/50",
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
      color: "from-purple-50/90 to-violet-50/90",
      iconColor: "text-purple-500",
      borderColor: "border-purple-100/50",
      hoverColor: "hover:from-purple-100/50 hover:to-violet-100/50",
    },
    {
      title: "Tax Filing",
      icon: Calculator,
      color: "from-emerald-50/90 to-teal-50/90",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-100/50",
      hoverColor: "hover:from-emerald-100/50 hover:to-teal-100/50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Enhanced Advisor Profile Header */}
      <AnimatedSection animation="fade-up" delay={0} duration={600}>
        <div className="relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/50 to-teal-50/30 rounded-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-100/20 via-transparent to-transparent rounded-3xl"></div>

          <div className="premium-card-hover relative bg-white/85 backdrop-blur-2xl rounded-3xl p-8 shadow-xl border border-white/40 group">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-xl"></div>

            <div className="relative">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/60 relative">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Monotosh Sardar"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                    Monotosh Sardar
                  </h2>
                  <p className="text-emerald-600 font-semibold text-lg tracking-wide">Financial Planner & Advisor</p>
                  <p className="text-gray-600 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Mumbai, Maharashtra
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="premium-button-hover flex-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-2xl relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative">Contact Me</span>
                </button>
                <a
                  href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-hover px-6 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-2xl flex items-center gap-3 relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="hidden sm:inline relative z-10">WhatsApp</span>
                </a>
              </div>

              <div
                className={`
                  transition-all duration-400 ease-out overflow-hidden
                  ${showContact ? "opacity-100 max-h-40 translate-y-0" : "opacity-0 max-h-0 -translate-y-4"}
                `}
              >
                <div className="premium-card-hover bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl p-6 shadow-inner border border-white/50">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a
                      href="tel:+919836472260"
                      className="contact-item-hover flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-all duration-200 p-3 rounded-xl hover:bg-emerald-50/50 group/contact"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover/contact:scale-110 transition-transform duration-200">
                        <Phone className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-medium">Call Now</span>
                    </a>
                    <a
                      href="mailto:monotosh@example.com"
                      className="contact-item-hover flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-all duration-200 p-3 rounded-xl hover:bg-emerald-50/50 group/contact"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover/contact:scale-110 transition-transform duration-200">
                        <Mail className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-medium">Email</span>
                    </a>
                    <a
                      href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item-hover flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-all duration-200 p-3 rounded-xl hover:bg-emerald-50/50 group/contact"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover/contact:scale-110 transition-transform duration-200">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-medium">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced Stats Grid */}
      <AnimatedSection animation="fade-up" delay={100} duration={600}>
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="stat-card-hover relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl opacity-50`}></div>

                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group">
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-bl-3xl"></div>

                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.number}
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-gray-700 font-semibold text-sm leading-relaxed">{stat.label}</div>

                  {/* Subtle bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl opacity-60`}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </AnimatedSection>

      {/* Enhanced Quick Services */}
      <AnimatedSection animation="fade-up" delay={200} duration={600}>
        <div className="relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white/80 to-blue-50/30 rounded-3xl"></div>

          <div className="premium-card-hover relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-2xl"></div>

            <div className="relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Services</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {quickServices.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <button
                      key={index}
                      className={`
                        service-card-hover relative overflow-hidden group
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
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${service.iconColor.replace("text-", "bg-")} opacity-60`}
                      ></div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced About Section */}
      <AnimatedSection animation="fade-up" delay={300} duration={600}>
        <div className="relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/60 to-teal-50/40 rounded-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-100/20 via-transparent to-transparent rounded-3xl"></div>

          <div className="premium-card-hover relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-br-3xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-teal-100/30 to-transparent rounded-tl-3xl"></div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
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
                    color: "from-purple-100/80 to-violet-100/80 text-purple-700 border-purple-200/50",
                  },
                  {
                    text: "15+ Years Experience",
                    color: "from-orange-100/80 to-red-100/80 text-orange-700 border-orange-200/50",
                  },
                ].map((badge, index) => (
                  <span
                    key={index}
                    className={`
                      badge-hover bg-gradient-to-r ${badge.color} 
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
      colorScheme: "blue",
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
      colorScheme: "purple",
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
        <div className="premium-card-hover bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Options</h3>
          <div className="grid gap-4">
            {investmentOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <div
                  key={index}
                  className="investment-option-hover flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl hover:from-white/80 hover:to-gray-50/80 transition-all duration-200 border border-white/30 group transform-gpu"
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
      colorScheme: "purple",
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
      colorScheme: "blue",
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
      colorScheme: "orange",
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
      colorScheme: "teal",
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
      colorScheme: "blue",
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
      ],
      pricing: "₹100 application fee",
      icon: Baby,
      colorScheme: "teal",
    },
  ]

  return (
    <div className="space-y-6">
      <AnimatedSection animation="fade-up" delay={0} duration={400}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1 mt-2.5">
            Document Services
          </h2>
          <p className="text-gray-600">Efficient document management for your convenience</p>
        </div>
      </AnimatedSection>

      {/* Document Services */}
      {documentServices.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          documents={service.documents}
          process={service.process}
          pricing={service.pricing}
          icon={service.icon}
          ctaText="Get Started"
          colorScheme={service.colorScheme}
          delay={100 + index * 100}
        />
      ))}
    </div>
  )
}

// Main Page Component
function Page() {
  const [activeTab, setActiveTab] = useState("home")

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {activeTab === "home" && <HomeContent />}
        {activeTab === "insurance" && <InsuranceContent />}
        {activeTab === "invest" && <InvestContent />}
        {activeTab === "documents" && <DocumentsContent />}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

export default Page
