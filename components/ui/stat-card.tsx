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
    <div className="bg-white p-6 rounded-2xl shadow-medium border border-gray-100 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};
