import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  avatarSrc: string;
}

export function TestimonialCard({
  name,
  role,
  testimonial,
  avatarSrc,
}: TestimonialCardProps) {
  return (
    <div className="bg-gray-50 p-6 sm:p-10 rounded-2xl shadow-strong border border-gray-100 flex flex-col items-center text-center h-full">
      <Image
        src={avatarSrc}
        alt={name}
        width={90}
        height={90}
        className="rounded-full mb-4 sm:mb-6 border-4 border-white shadow-md w-20 h-20 sm:w-[90px] sm:h-[90px]"
      />
      <p className="text-base sm:text-xl text-gray-700 mb-4 sm:mb-6 font-serif italic">
        "{testimonial}"
      </p>
      <div className="mt-auto">
        <p className="font-bold text-base sm:text-lg text-gray-900">{name}</p>
        <p className="text-sm sm:text-base text-gray-500">{role}</p>
      </div>
    </div>
  );
}
