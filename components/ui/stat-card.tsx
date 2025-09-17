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
        "bg-white/80 p-4 sm:p-6 rounded-2xl shadow-strong border border-gray-100 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-medium touch-manipulation backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center text-center flex-grow">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${iconBgColor} flex items-center justify-center mb-3 flex-shrink-0 shadow-medium ring-1 ring-inset ring-white/50`}
        >
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconTextColor}`} />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 leading-tight tracking-tight">{value}</div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 leading-tight">{title}</h3>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 text-pretty leading-relaxed text-center mt-2 pt-3 border-t border-gray-100/30">{description}</p>
    </div>
  );
};
