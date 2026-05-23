import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

export function SimplePageHeader({ title, description, color = 'blue-600 to-purple-600', className }: { title: string; description: string; color?: string, className?: string }) {
  return (
    <AnimatedSection
      animation="elegant-fade"
      delay={0}
      duration={400}
      className={cn("text-center pt-1.5 pb-1 sm:pt-3 sm:pb-2", className)}
    >
      <h1 className={`text-3xl sm:text-4xl lg:text-[44px] lg:leading-[1.15] font-bold font-serif bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3 tracking-tight`}>
        {title}
      </h1>
      <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed text-balance">{description}</p>
    </AnimatedSection>
  );
}