import { useState, useEffect, useRef } from "react";

export function useIntersectionObserver(options = {}): [React.MutableRefObject<HTMLDivElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use a single observer instance with optimized settings
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
          setHasAnimated(true);
          // Disconnect observer after animation to improve performance
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.05, // Reduced threshold for faster triggering
        rootMargin: "100px 0px", // Increased root margin for earlier triggering
        ...options,
      }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasAnimated, options]);

  return [ref, isIntersecting];
}
