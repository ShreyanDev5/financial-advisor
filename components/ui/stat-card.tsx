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
        "bg-white/80 p-3.5 sm:p-5 rounded-2xl shadow-strong border border-gray-100 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-medium touch-manipulation backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center text-center flex-grow">
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${iconBgColor} flex items-center justify-center mb-2 flex-shrink-0 shadow-medium ring-1 ring-inset ring-white/50`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconTextColor}`} />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight tracking-tight">{value}</div>
        <h3 className="text-sm font-semibold text-gray-800 mb-1.5 leading-tight">{title}</h3>
      </div>
      <p className="text-xs text-gray-500 text-pretty leading-relaxed text-center mt-1 pt-2 border-t border-gray-100/30">{description}</p>
    </div>
  );
};
