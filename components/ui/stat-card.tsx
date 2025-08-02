import type { LucideIcon } from "lucide-react";

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
        "bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div
            className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${iconTextColor}`} />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};
