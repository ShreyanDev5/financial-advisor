'use client';

import { Heart, Bike, Car, ShieldCheck } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function InsuranceContent() {
  const insuranceServices = [
    {
      title: "Health Insurance",
      description: "Partner Insurers: Star Health & Care Health Insurance",
      benefits: [
        "Cashless hospitalisation.",
        "Covers in-patient, pre/post-hospitalisation.",
        "Includes daycare and AYUSH treatments.",
      ],
      documents: [
        "ID/Address Proof (Aadhaar, PAN).",
        "Age Proof (Birth/School Certificate).",
        "Medical history.",
        "Previous policy for renewals.",
        "Bank details for reimbursement.",
      ],
      process: [
        "Compare plans and select add-ons.",
        "Fill application with medical history.",
        "Pay premium online or via agent.",
        "Receive policy and ID card.",
        "Notify insurer and submit documents for claims.",
      ],
      costs: ["Premiums vary by age, sum insured, and family size. Individual plans: ₹5k-₹20k/year. Family plans: ₹10k-₹50k/year. (Indicative ranges, use calculator for exact quote)."],
      icon: Heart,
      colorScheme: "emerald",
    },
    {
      title: "Two-Wheeler Insurance",
      description: "Comprehensive insurance coverage for your motorcycle or scooter.",
      benefits: [
        "Mandatory third-party liability cover.",
        "Comprehensive cover for own-damage, theft, and disasters.",
      ],
      documents: [
        "Vehicle RC and owner's DL.",
        "ID/Address Proof (Aadhaar, PAN).",
        "Previous policy for renewals.",
        "Claim docs: FIR, bills, photos.",
      ],
      process: [
        "Choose Third-Party or Comprehensive cover.",
        "Get a quote with RC, DL, and ID.",
        "Pay premium for instant policy.",
        "For claims, contact insurer for inspection and cashless repair.",
      ],
      costs: ["Third-Party: ₹1.3k-₹3k/year (IRDAI regulated). Comprehensive: ₹1.5k-₹6k/year (based on IDV, model, age). (Indicative ranges, use calculator for exact quote)."],
      icon: Bike,
      colorScheme: "blue",
    },
    {
      title: "Four-Wheeler (Car) Insurance",
      description: "Complete car insurance protection with comprehensive coverage options.",
      benefits: [
        "Mandatory third-party liability cover.",
        "Comprehensive cover for own-damage, theft, and accidents.",
        "Optional add-ons: Zero Depreciation, Engine Cover.",
      ],
      documents: [
        "Vehicle RC and driver's DL.",
        "ID/Address Proof (Aadhaar, PAN).",
        "Previous policy/NCB for renewals.",
        "Claim docs: FIR, police reports.",
      ],
      process: [
        "Select policy type, IDV, and add-ons.",
        "Get quote with vehicle and owner details.",
        "Pay premium for e-policy.",
        "For claims, contact insurer for assessment and cashless service.",
      ],
      costs: ["Third-Party: From ₹2k-₹3k/year (by engine size). Comprehensive: Hatchback (₹7k-₹15k), Sedan (₹10k-₹20k), SUV (₹15k-₹30k). (Based on IDV, model, NCB; indicative ranges)."],
      icon: Car,
      colorScheme: "purple",
    },
    {
      title: "Life Insurance",
      description: "Secure your family's future with a range of life insurance products from LIC.",
      benefits: [
        "Financial security for your family.",
        "Term, Endowment, Pension, and ULIP plans available.",
      ],
      documents: [
        "ID/Address Proof (Aadhaar, PAN).",
        "Age Proof (Birth/School Certificate).",
        "Bank and nominee details.",
        "Medical reports if required.",
      ],
      process: [
        "Choose plan, sum assured, and term.",
        "Complete application with health details.",
        "Undergo medical tests if required.",
        "Pay premium to issue policy.",
        "Nominee files claim with death certificate.",
      ],
      costs: ["Premiums depend on age, health, sum assured, and plan type. Term plans are most affordable; Endowment/ULIPs include savings, costing more."],
      icon: ShieldCheck,
      colorScheme: "red",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <SimplePageHeader title="Insurance Services" description="Comprehensive protection for your peace of mind" className="mb-12 [&>h1]:text-4xl sm:[&>h1]:text-6xl" color="from-blue-600 to-purple-600" />

      {insuranceServices.map((service, index) => (
        <div key={index} id={service.title.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-28 sm:scroll-mt-32">
          <ServiceCard
            className="sm:max-w-5xl sm:mx-auto"
            title={service.title}
            description={service.description}
            benefits={service.benefits}
            documents={service.documents}
            process={service.process}
            costs={service.costs}
            icon={service.icon}
            ctaText="Get Started"
            colorScheme={service.colorScheme}
            delay={50 + index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me get started.`}
          />
        </div>
      ))}
    </div>
  );
}
