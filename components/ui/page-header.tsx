import { AnimatedSection } from "@/components/ui/animated-section";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <AnimatedSection animation="fade-up" delay={0} duration={400}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-2.5 mb-1">
          {title}
        </h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </AnimatedSection>
  );
}
