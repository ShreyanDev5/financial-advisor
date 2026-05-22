'use client';

import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

interface AdvisorInfo {
  name: string;
  profession: string;
  phone: string;
  email: string;
  address: string;
}

export function AdvisorSection({ advisor }: { advisor: AdvisorInfo }) {
  // Format phone number for WhatsApp link (international format)
  const formatWhatsAppNumber = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, '');
    return cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  };

  const whatsAppNumber = formatWhatsAppNumber(advisor.phone);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Meet Your Advisor Heading replaced with Decluttered Name Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Your Trusted Partner
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif mt-3 mb-2 text-slate-900 tracking-tight">
          {advisor.name}
        </h2>
        <p className="text-xs sm:text-sm uppercase font-bold tracking-widest text-emerald-600 mt-1">
          Certified Financial Planner (CFP®)
        </p>
      </div>

      {/* Asymmetrical Premium Split Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
        {/* Decorative Ambient Background Glows */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Left Side: Asymmetrical Image Container (5 Columns) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="relative group">
            {/* Double Glowing Border Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-[2rem] rounded-tr-none blur-md opacity-25 group-hover:opacity-30 transition-opacity duration-300" />
            
            {/* The Main Image Frame - Large visual sizes, left-aligned & right-side cropped via uniform CSS scale & left origin to prevent distortion */}
            <div className="relative w-[180px] h-[200px] sm:w-[240px] sm:h-[340px] rounded-[2rem] rounded-tr-none overflow-hidden border-[5px] sm:border-[6px] border-white shadow-xl transition-all duration-500 group-hover:shadow-2xl transform-gpu">
              <Image
                src="/advisor_profile-pic.jpg"
                alt={advisor.name}
                fill
                className="object-cover object-[0%_0%] sm:object-[0%_0%] scale-[1.25] sm:scale-[1.20] origin-top-left transition-transform duration-700 group-hover:scale-[1.28] sm:group-hover:scale-[1.23]"
                priority
                sizes="(max-w-640px) 180px, 240px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Side: Professional Biography & Contact Cards (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          {/* Premium Personal Quote / Philosophy - De-cluttered and fully mobile-friendly */}
          <div className="relative my-3 p-4 pl-[10px] sm:p-5 sm:pl-7 bg-emerald-50/30 rounded-2xl italic text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed backdrop-blur-sm max-w-xl mx-auto lg:mx-0">
            {/* Shorter premium vertical accent bar */}
            <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-emerald-500 rounded-full" />
            <p className="relative z-10">
              <span className="text-emerald-500 font-serif font-bold text-2xl sm:text-4xl select-none mr-1.5 inline-block leading-[0px] align-middle">&ldquo;</span>Wealth planning is not just about numbers; it&apos;s about creating stability and giving your family the freedom to focus on what truly matters.<span className="text-emerald-500 font-serif font-bold text-2xl sm:text-4xl select-none ml-0 inline-block leading-[0px] align-middle">&rdquo;</span>
            </p>
          </div>

          {/* Glassmorphic Contact Cluster - Minimal horizontal pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full max-w-xl mx-auto lg:mx-0 mt-6">
            {/* Phone WhatsApp Card */}
            <a 
              href={`https://wa.me/${whatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/70 backdrop-blur-md border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50/10 px-4 py-2.5 rounded-full shadow-sm transition-all duration-300 flex items-center gap-2 text-left cursor-pointer hover:shadow-md"
            >
              <div className="bg-emerald-50 p-1.5 rounded-full text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm flex-shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-slate-700 group-hover:text-emerald-700 font-bold text-xs sm:text-sm tracking-wide">
                Mobile & WhatsApp
              </span>
            </a>

            {/* Email Card */}
            <a 
              href={`mailto:${advisor.email}`}
              className="group bg-white/70 backdrop-blur-md border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50/10 px-4 py-2.5 rounded-full shadow-sm transition-all duration-300 flex items-center gap-2 text-left cursor-pointer hover:shadow-md"
            >
              <div className="bg-emerald-50 p-1.5 rounded-full text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm flex-shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-slate-700 group-hover:text-emerald-700 font-bold text-xs sm:text-sm tracking-wide">
                Email
              </span>
            </a>

            {/* Office Location Card */}
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(advisor.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/70 backdrop-blur-md border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50/10 px-4 py-2.5 rounded-full shadow-sm transition-all duration-300 flex items-center gap-2 text-left cursor-pointer hover:shadow-md"
            >
              <div className="bg-emerald-50 p-1.5 rounded-full text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm flex-shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-slate-700 group-hover:text-emerald-700 font-bold text-xs sm:text-sm tracking-wide">
                Location
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export for the component
export default function Advisor() {
  const advisorData: AdvisorInfo = {
    name: "Monotosh Sardar",
    profession: "Certified Financial Planner",
    phone: "98364 72260",
    email: "moni22rick@gmail.com",
    address: "Budge Budge, Kolkata, West Bengal, India"
  };

  return <AdvisorSection advisor={advisorData} />;
}