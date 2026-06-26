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
    <div className="container mx-auto px-4 py-0">
      {/* Meet Your Advisor Heading replaced with Decluttered Name Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Meet Your Advisor
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif mt-1.5 mb-1 text-slate-900 tracking-tight">
          {advisor.name}
        </h2>
        <p className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-emerald-600 mt-0.5">
          Certified Financial Planner (CFP®)
        </p>
      </div>

      {/* Asymmetrical Premium Split Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
        {/* Decorative Ambient Background Glows */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Left Side: Image Container (5 Columns) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="relative">
            {/* The Main Image Frame - Aligned height to match the contact list height on the right */}
            <div className="relative w-[160px] h-[195px] sm:w-[190px] sm:h-[235px] rounded-[1.5rem] rounded-tr-none overflow-hidden border-[4px] sm:border-[5px] border-white shadow-md transform-gpu">
              <Image
                src="/advisor_profile-pic.jpg"
                alt={advisor.name}
                fill
                className="object-cover object-[0%_0%] sm:object-[0%_0%] scale-[1.25] sm:scale-[1.20] origin-top-left"
                priority
                sizes="(max-w-640px) 160px, 190px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Side: Contact Information Cards (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          {/* Glassmorphic Contact Cluster - Clean vertical layout card list */}
          <div className="flex flex-col gap-3.5 w-full max-w-md mx-auto lg:mx-0">
            {/* Phone WhatsApp Card */}
            <a 
              href={`https://wa.me/${whatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/70 backdrop-blur-md border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50/10 px-5 py-3 rounded-2xl shadow-sm transition-all duration-300 flex items-center gap-4 cursor-pointer hover:shadow-md"
            >
              <div className="bg-emerald-50 p-2 rounded-full text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                  Call & WhatsApp
                </span>
                <span className="text-slate-800 group-hover:text-emerald-700 font-bold text-sm sm:text-base tracking-wide mt-0.5">
                  {advisor.phone}
                </span>
              </div>
            </a>

            {/* Email Card */}
            <a 
              href={`mailto:${advisor.email}`}
              className="group bg-white/70 backdrop-blur-md border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50/10 px-5 py-3 rounded-2xl shadow-sm transition-all duration-300 flex items-center gap-4 cursor-pointer hover:shadow-md"
            >
              <div className="bg-emerald-50 p-2 rounded-full text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                  Email Address
                </span>
                <span className="text-slate-800 group-hover:text-emerald-700 font-bold text-sm sm:text-base tracking-wide mt-0.5 break-all">
                  {advisor.email}
                </span>
              </div>
            </a>

            {/* Office Location Card */}
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(advisor.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/70 backdrop-blur-md border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50/10 px-5 py-3 rounded-2xl shadow-sm transition-all duration-300 flex items-center gap-4 cursor-pointer hover:shadow-md"
            >
              <div className="bg-emerald-50 p-2 rounded-full text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                  Location
                </span>
                <span className="text-slate-800 group-hover:text-emerald-700 font-bold text-xs sm:text-sm leading-tight mt-0.5">
                  {advisor.address}
                </span>
              </div>
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
    name: process.env.NEXT_PUBLIC_CLIENT_NAME || "Monotosh Sardar",
    profession: "Certified Financial Planner",
    phone: process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260",
    email: process.env.NEXT_PUBLIC_CLIENT_EMAIL || "moni22rick@gmail.com",
    address: process.env.NEXT_PUBLIC_CLIENT_ADDRESS || "Budge Budge, Kolkata, West Bengal, India"
  };

  return <AdvisorSection advisor={advisorData} />;
}