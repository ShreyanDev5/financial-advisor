'use client';

import { useCallback, useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in" | "elegant-fade";
  delay?: number;
  duration?: number;
  id?: string;
}

export function AnimatedSection({ children, className = "", animation = "fade-up", delay = 0, duration = 600, id }: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const getAnimationClasses = useCallback(() => {
    if (prefersReducedMotion) {
      return "opacity-100 transform-none";
    }

    const baseDuration = duration < 300 ? 300 : duration;
    const baseClasses = `transition-all ease-out will-change-transform`;
    const durationClass = `duration-${baseDuration}`;

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} ${durationClass} opacity-0 translate-y-6`;
        case "fade-in":
          return `${baseClasses} ${durationClass} opacity-0`;
        case "slide-left":
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-6`;
        case "slide-right":
          return `${baseClasses} ${durationClass} opacity-0 translate-x-6`;
        case "scale-in":
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        case "elegant-fade":
          return `${baseClasses} ${durationClass} opacity-0 translate-y-3 blur-sm`;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-6`;
      }
    }

    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100 blur-none`;
  }, [isVisible, animation, duration, prefersReducedMotion]);

  const style = prefersReducedMotion ? {} : { transitionDelay: `${delay}ms` };

  return (
    <div ref={ref} id={id} className={`${getAnimationClasses()} ${className}`} style={style}>
      {children}
    </div>
  );
}
