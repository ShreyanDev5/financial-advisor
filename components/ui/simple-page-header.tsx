import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

export function SimplePageHeader({ 
  title, 
  description, 
  badge,
  badgeColorScheme = 'blue',
  color = 'blue-600 to-purple-600', 
  className 
}: { 
  title: string; 
  description: string; 
  badge?: string;
  badgeColorScheme?: 'orange' | 'blue' | 'purple';
  color?: string;
  className?: string;
}) {
  const badgeClasses = {
    orange: "text-orange-600 bg-orange-50 border-orange-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
  }[badgeColorScheme] || "text-blue-600 bg-blue-50 border-blue-100";

  return (
    <AnimatedSection
      animation="elegant-fade"
      delay={0}
      duration={400}
      className={cn("text-center flex flex-col items-center", className)}
    >
      {badge && (
        <span className={cn("inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-1.5", badgeClasses)}>
          {badge}
        </span>
      )}
      <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-serif bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1.5 tracking-tight`}>
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto px-4 sm:px-0 leading-relaxed text-balance">{description}</p>
    </AnimatedSection>
  );
}