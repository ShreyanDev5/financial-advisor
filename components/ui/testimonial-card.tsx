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
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full">
      <Image
        src={avatarSrc}
        alt={name}
        width={80}
        height={80}
        className="rounded-full mb-4 border-4 border-white shadow-md"
      />
      <p className="text-lg text-gray-700 mb-4 font-serif italic">
        "{testimonial}"
      </p>
      <div className="mt-auto">
        <p className="font-bold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
