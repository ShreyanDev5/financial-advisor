import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

export function SimplePageHeader({ title, description, color = 'blue-600 to-purple-600', className }: { title: string; description: string; color?: string, className?: string }) {
  return (
    <AnimatedSection
      animation="elegant-fade"
      delay={0}
      duration={400}
      className={cn("text-center pt-4 pb-2 sm:pt-6 sm:pb-4", className)}
    >
      <h1 className={`text-5xl sm:text-6xl font-bold font-serif bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
        {title}
      </h1>
      <p className="text-base sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">{description}</p>
    </AnimatedSection>
  );
}