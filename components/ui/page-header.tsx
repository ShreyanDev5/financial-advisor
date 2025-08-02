import { AnimatedSection } from "@/components/ui/animated-section";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <AnimatedSection
      animation="fade-up"
      delay={0}
      duration={400}
      className="text-center py-28 bg-gray-100/80 rounded-3xl"
    >
      <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
        {title}
      </h1>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto">{description}</p>
    </AnimatedSection>
  );
}
