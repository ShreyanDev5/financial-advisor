import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  stat: {
    number: string;
    label: string;
    color: string;
    icon: LucideIcon;
    bgGradient: string;
  };
  index: number;
}

export const StatCard = ({ stat, index }: StatCardProps) => {
  const { icon: Icon } = stat;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-medium border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="text-3xl font-bold text-brand-navy">{stat.number}</div>
        <div className="w-12 h-12 rounded-lg bg-brand-teal/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-teal" />
        </div>
      </div>
      <div className="text-base font-semibold text-gray-600">{stat.label}</div>
    </div>
  );
};
