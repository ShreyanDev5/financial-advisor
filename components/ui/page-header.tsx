import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ 
  title, 
  description, 
  color = 'emerald-600 to-green-600' 
}: { 
  title: string; 
  description: ReactNode; 
  color?: string 
}) {
  // Safe JIT class mappings for Tailwind gradients
  const gradientMap: Record<string, string> = {
    'emerald-600 to-green-600': 'from-emerald-700 via-emerald-600 to-teal-800',
    'blue-600 to-purple-600': 'from-blue-600 via-indigo-600 to-purple-700',
  };

  const gradientClass = gradientMap[color] || 'from-emerald-700 to-teal-800';

  const scrollToServices = () => {
    const el = document.getElementById('core-services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatedSection
      animation="fade-up"
      delay={0}
      duration={500}
      className="relative text-center py-16 sm:py-24 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-lg sm:shadow-strong mx-4 sm:mx-12 lg:mx-20 overflow-hidden"
    >
      {/* Premium Apple-like subtle dotted background overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        aria-hidden="true"
      />
      
      {/* Decorative ambient glowing gradient behind text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">
        {/* Floating Premium Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-100/60 border border-emerald-200/40 backdrop-blur-md mb-6 hover:bg-emerald-100/80 transition-all duration-200 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Certified Financial Advisory & Wealth Management
        </div>

        {/* Dynamic Gradient Title - Scaled down on desktop */}
        <h1 className={`text-3xl sm:text-5xl lg:text-5xl font-bold font-serif bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-5 tracking-tight leading-tight sm:leading-none`}>
          {title}
        </h1>

        {/* Description Text - Scaled down for elegance */}
        <p className="text-sm sm:text-base md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-8 text-pretty">
          {description}
        </p>

        {/* Double Action Button Grid */}
        <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center w-full sm:w-auto">
          <a
            href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'd%20like%20to%20schedule%20a%20free%20consultation%20to%20discuss%20my%20financial%20goals."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-block"
            aria-label="Contact us on WhatsApp"
          >
            <Button 
              variant="dark"
              size="lg" 
              className="w-full sm:w-auto h-11 px-7 rounded-xl font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              Free Consultation
            </Button>
          </a>

          <Button 
            onClick={scrollToServices}
            size="lg" 
            className="w-full sm:w-auto h-11 px-7 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group border border-slate-200"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
