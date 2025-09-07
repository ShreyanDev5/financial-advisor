'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
    // Remove spaces and add country code prefix
    const cleanPhone = phone.replace(/\s/g, '');
    // If it doesn't already start with country code, add it
    return cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  };

  const whatsAppNumber = formatWhatsAppNumber(advisor.phone);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">Meet Your Advisor</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Subtle glowing effect behind the card */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl blur-xl opacity-70 -z-10"></div>
        
        <Card className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start">
              {/* Image container with better positioning and spacing */}
              <div className="relative flex-shrink-0 md:mt-2">
                <div className="relative w-44 h-52 sm:w-52 sm:h-60 rounded-2xl overflow-hidden shadow-lg border-4 border-white/80">
                  <Image
                    src="/advisor_profile-pic.jpg"
                    alt="Financial Advisor"
                    fill
                    className="object-cover object-[center_10%]"
                    priority
                  />
                </div>
              </div>

              {/* Content with improved spacing and balance */}
              <div className="flex-1 text-center md:text-left w-full pr-0 md:pr-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-gray-800">{advisor.name}</h3>
                    <p className="text-base sm:text-lg text-emerald-600 mt-1">{advisor.profession}</p>
                  </div>

                  <div className="space-y-4 max-w-md md:mx-0">
                    {/* Phone Information */}
                    <div className="flex items-start gap-4 group">
                      <div className="bg-emerald-100 p-3 rounded-xl flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-emerald-200 group-hover:scale-105">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">Phone</p>
                        <p className="font-medium text-sm sm:text-base mt-1">
                          <a 
                            href={`https://wa.me/${whatsAppNumber}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                          >
                            {advisor.phone}
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Email Information */}
                    <div className="flex items-start gap-4 group">
                      <div className="bg-emerald-100 p-3 rounded-xl flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-emerald-200 group-hover:scale-105">
                        <Mail className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">Email</p>
                        <p className="font-medium text-sm sm:text-base mt-1">
                          <a 
                            href={`mailto:${advisor.email}`} 
                            className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                          >
                            {advisor.email}
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="flex items-start gap-4 group">
                      <div className="bg-emerald-100 p-3 rounded-xl flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-emerald-200 group-hover:scale-105">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">Address</p>
                        <p className="font-medium text-sm sm:text-base mt-1">
                          {advisor.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Default export for the component
export default function Advisor() {
  // This is a placeholder - in a real implementation, this data would come from props or context
  const advisorData: AdvisorInfo = {
    name: "Monotosh Sardar",
    profession: "Certified Financial Planner",
    phone: "98364 72260",
    email: "moni22rick@gmail.com",
    address: "Budge Budge, Kolkata, West Bengal, India"
  };

  return <AdvisorSection advisor={advisorData} />;
}