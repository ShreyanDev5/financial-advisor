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

export function AnimatedSection({ children, className = "", animation = "fade-up", delay = 0, duration = 400, id }: AnimatedSectionProps) {
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

    const baseClasses = `transition-all will-change-transform`;

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} opacity-0 translate-y-4`;
        case "fade-in":
          return `${baseClasses} opacity-0`;
        case "slide-left":
          return `${baseClasses} opacity-0 -translate-x-4`;
        case "slide-right":
          return `${baseClasses} opacity-0 translate-x-4`;
        case "scale-in":
          return `${baseClasses} opacity-0 scale-98`;
        case "elegant-fade":
          return `${baseClasses} opacity-0 translate-y-2 blur-[2px]`;
        default:
          return `${baseClasses} opacity-0 translate-y-4`;
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 blur-none`;
  }, [isVisible, animation, prefersReducedMotion]);

  const style = prefersReducedMotion
    ? {}
    : {
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      };

  return (
    <div ref={ref} id={id} className={`${getAnimationClasses()} ${className}`} style={style}>
      {children}
    </div>
  );
}
