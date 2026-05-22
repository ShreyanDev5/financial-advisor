import Image from "next/image";
import { Star } from "lucide-react";

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
    <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/50 flex flex-col items-center text-center h-full transition-all duration-300 shadow-medium hover:shadow-strong hover:-translate-y-0.5 card-shine relative transform-gpu">
      
      {/* Profile Picture Frame with custom borders - refined sizing */}
      <div className="mb-4 flex items-center justify-center relative">
        {avatarSrc ? (
          <div className="relative rounded-full border-4 border-white shadow-md w-16 h-16 sm:w-18 sm:h-18 overflow-hidden ring-2 ring-emerald-500/10">
            <Image
              src={avatarSrc}
              alt={name}
              fill
              className="object-cover"
              sizes="72px"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-white rounded-full w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shadow-md ring-2 ring-emerald-500/10">
            <div className="bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
              <span className="text-emerald-700 font-bold text-xl">
                {name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 5-Star Rating Row for Authority */}
      <div className="flex items-center gap-1 mb-3.5" aria-label="5 out of 5 stars rating">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
        ))}
      </div>
      
      {/* Styled Testimonial text with serif design and subtle height */}
      <p className="text-xs sm:text-sm text-slate-700 mb-5 font-serif italic leading-relaxed text-pretty flex-grow">
        &ldquo;{testimonial}&rdquo;
      </p>
      
      {/* Card Footer: Client Info */}
      <div className="mt-auto pt-3.5 border-t border-slate-100/50 w-full">
        <p className="font-extrabold text-xs sm:text-sm text-slate-900 leading-none">{name}</p>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1 font-medium">{role}</p>
      </div>
    </div>
  );
}
