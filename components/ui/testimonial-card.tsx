import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  avatarSrc?: string;
}

export function TestimonialCard({
  name,
  role,
  testimonial,
  avatarSrc,
}: TestimonialCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-medium border border-gray-100/50 flex flex-col items-center text-center h-full transition-all duration-300 hover:shadow-strong hover:-translate-y-1">
      {/* Image placeholder - visually appealing and compact */}
      <div className="mb-4 flex items-center justify-center">
        {avatarSrc ? (
          <div className="relative rounded-full border-2 border-white shadow-md w-24 h-24 overflow-hidden">
            <Image
              src={avatarSrc}
              alt={name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-white rounded-full w-24 h-24 flex items-center justify-center shadow-md">
            <div className="bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full w-20 h-20 flex items-center justify-center">
              <span className="text-emerald-700 font-bold text-2xl">
                {name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-sm sm:text-base text-gray-700 mb-4 font-serif italic leading-relaxed">
        &quot;{testimonial}&quot;
      </p>
      
      <div className="mt-auto">
        <p className="font-bold text-sm sm:text-base text-gray-900">{name}</p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{role}</p>
      </div>
    </div>
  );
}
