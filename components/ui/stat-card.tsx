import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-3">{value}</div>
      </div>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
};
