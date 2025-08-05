
import { AnimatedSection } from "@/components/ui/animated-section";

export function SimplePageHeader({ title, description, color = 'blue-600 to-purple-600' }: { title: string; description: string; color?: string }) {
  return (
    <AnimatedSection
      animation="fade-up"
      delay={0}
      duration={400}
      className="text-center pt-8 pb-4 sm:pt-12 sm:pb-8"
    >
      <h1 className={`text-4xl sm:text-6xl font-bold bg-gradient-to-r from-${color} bg-clip-text text-transparent mb-2`}>
        {title}
      </h1>
      <p className="text-base sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">{description}</p>
    </AnimatedSection>
  );
}
