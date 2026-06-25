import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  iconBgColor: string;
  iconTextColor: string;
  className?: string;
}


export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  iconBgColor,
  iconTextColor,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "bg-white/90 p-3.5 sm:p-4 rounded-2xl border border-slate-100 flex flex-col justify-between h-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 touch-manipulation backdrop-blur-md",
        className
      )}
    >
      <div className="flex flex-col items-center text-center flex-grow">
        {/* Glowing border around icon container - scaled down */}
        <div
          className={`w-8 h-8 rounded-lg ${iconBgColor} flex items-center justify-center mb-1.5 flex-shrink-0 shadow-sm ring-2 ring-white/80 transition-all duration-300 group-hover:scale-105`}
        >
          <Icon className={`w-4 h-4 ${iconTextColor}`} />
        </div>
        
        {/* Numerical stat - scaled down */}
        <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 mb-0.5 leading-tight tracking-tight">
          {value}
        </div>
        
        {/* Stat title - scaled down */}
        <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">{title}</h3>
      </div>
      
      {/* Supporting description - hidden on mobile for better breathing room */}
      <p className="hidden sm:block text-[10px] sm:text-[11px] text-gray-500 leading-normal text-center mt-2 pt-2 border-t border-slate-100/50">
        {description}
      </p>
    </div>
  );
};
