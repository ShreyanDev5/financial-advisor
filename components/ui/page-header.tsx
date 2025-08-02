import { AnimatedSection } from "@/components/ui/animated-section";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <AnimatedSection
      animation="fade-up"
      delay={0}
      duration={400}
      className="text-center py-20 bg-gray-50/80 rounded-xl"
    >
      <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
    </AnimatedSection>
  );
}
