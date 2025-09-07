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
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">About Your Financial Advisor</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full"></div>
      </div>

      <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative flex-shrink-0">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white/50">
                <Image
                  src="/advisor_profile-pic.jpg"
                  alt="Financial Advisor"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-gray-800">{advisor.name}</h3>
                  <p className="text-lg sm:text-xl text-emerald-600 mt-1">{advisor.profession}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{advisor.phone}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{advisor.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium max-w-xs">{advisor.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Default export for the component
export default function Advisor() {
  // This is a placeholder - in a real implementation, this data would come from props or context
  const advisorData: AdvisorInfo = {
    name: "Monotosh Sardar",
    profession: "Certified Financial Planner",
    phone: "+91 98364 72260",
    email: "monotosh@example.com",
    address: "Kolkata, West Bengal, India"
  };

  return <AdvisorSection advisor={advisorData} />;
}