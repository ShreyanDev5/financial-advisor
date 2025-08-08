import { AnimatedSection } from "@/components/ui/animated-section";
import type { ReactNode } from "react";

export function PageHeader({ title, description, color = 'blue-600 to-purple-600' }: { title: string; description: ReactNode; color?: string }) {
  return (
    <AnimatedSection
      animation="fade-up"
      delay={0}
      duration={400}
                              className="relative text-center py-16 sm:py-28 bg-gradient-to-br from-emerald-50 to-green-50 backdrop-blur-2xl rounded-3xl border border-emerald-200/60 shadow-lg mx-4 sm:mx-16"
    >
      <h1 className={`text-4xl sm:text-6xl font-bold font-serif bg-gradient-to-r from-${color} bg-clip-text text-transparent mb-2`}>
        {title}
      </h1>
      <p className="text-base sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">{description}</p>
    </AnimatedSection>
  );
}
