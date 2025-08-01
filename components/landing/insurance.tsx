'use client';

import { Heart, Bike, Car } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageHeader } from "@/components/ui/page-header";

export default function InsuranceContent() {
  const healthInsuranceServices = {
    title: "Star Health and Care Insurance",
    description:
      "Comprehensive health insurance solutions from Star Health, one of India's leading health insurance providers.",
    benefits: [
      "Cashless treatment at 14,000+ network hospitals",
      "Coverage for pre and post hospitalization expenses",
      "No claim bonus up to 100% of sum insured",
      "Coverage for day care procedures",
      "Free health check-ups",
      "24/7 customer support",
    ],
    documents: [
      "Filled application form",
      "Age proof (Birth certificate, Passport, etc.)",
      "Identity proof (Aadhaar, PAN, Passport)",
      "Address proof (Utility bills, Aadhaar)",
      "Medical reports (if required)",
      "Passport size photographs",
    ],
    process: [
      "Fill the application form with accurate details",
      "Submit required documents",
      "Medical examination (if required)",
      "Premium payment",
      "Policy issuance within 15 days",
    ],
    pricing: "Premium starts from ₹3,500/year",
  };

  const vehicleInsuranceServices = [
    {
      title: "Two-Wheeler Insurance",
      description:
        "Comprehensive insurance coverage for your motorcycle or scooter with third-party and own damage protection.",
      benefits: [
        "Third-party liability coverage (mandatory)",
        "Own damage coverage for accidents, theft, fire",
        "Personal accident cover for owner-driver",
        "Zero depreciation add-on available",
        "Roadside assistance",
        "Quick claim settlement",
      ],
      documents: [
        "Vehicle Registration Certificate (RC)",
        "Driving License",
        "Previous insurance policy (for renewal)",
        "PAN Card",
        "Aadhaar Card",
        "Vehicle inspection report (if required)",
      ],
      process: [
        "Vehicle inspection and documentation",
        "Premium calculation based on IDV",
        "Policy selection and customization",
        "Premium payment",
        "Policy certificate issuance",
      ],
      pricing: "Premium starts from ₹1,500/year",
      icon: Bike,
      colorScheme: "blue",
    },
    {
      title: "Four-Wheeler Insurance",
      description: "Complete car insurance protection with comprehensive coverage options and add-on benefits.",
      benefits: [
        "Comprehensive coverage for car damage",
        "Third-party liability protection",
        "Personal accident cover",
        "Zero depreciation cover available",
        "Engine protection add-on",
        "24/7 roadside assistance",
      ],
      documents: [
        "Vehicle Registration Certificate (RC)",
        "Driving License",
        "Previous insurance policy",
        "PAN Card",
        "Aadhaar Card",
        "Vehicle fitness certificate (for commercial)",
      ],
      process: [
        "Vehicle details verification",
        "IDV calculation and premium quote",
        "Policy terms selection",
        "Add-on covers selection",
        "Premium payment and policy issuance",
      ],
      pricing: "Premium starts from ₹5,000/year",
      icon: Car,
      colorScheme: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Insurance Services" description="Comprehensive protection for your peace of mind" />

      {/* Health Insurance */}
      <ServiceCard
        title={healthInsuranceServices.title}
        description={healthInsuranceServices.description}
        benefits={healthInsuranceServices.benefits}
        documents={healthInsuranceServices.documents}
        process={healthInsuranceServices.process}
        pricing={healthInsuranceServices.pricing}
        icon={Heart}
        ctaText="Get Health Quote"
        colorScheme="emerald"
        delay={100}
      />

      {/* Vehicle Insurance */}
      {vehicleInsuranceServices.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          benefits={service.benefits}
          documents={service.documents}
          process={service.process}
          pricing={service.pricing}
          icon={service.icon}
          ctaText="Get Vehicle Quote"
          colorScheme={service.colorScheme}
          delay={200 + index * 100}
        />
      ))}
    </div>
  );
}
