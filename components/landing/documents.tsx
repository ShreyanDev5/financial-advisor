'use client';

import { CreditCard, UserCheck, FileCheck, Building, Car, Baby, Briefcase, Calculator, FileText, ScrollText } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function DocumentsContent() {
  const documentServices = [
    {
      title: "PAN Card Services",
      description: "New PAN card applications and corrections with fast processing and doorstep delivery.",
      benefits: [
        "New PAN card application",
        "PAN card corrections and updates",
        "Duplicate PAN card issuance",
        "Online application tracking",
        "Doorstep delivery available",
        "Expert assistance throughout",
      ],
      documents: [
        "Identity proof (Aadhaar, Passport, Voter ID)",
        "Address proof (Utility bills, Aadhaar)",
        "Date of birth proof",
        "Passport size photographs",
        "Form 49A (for new) or 49AA (for corrections)",
      ],
      process: [
        "Document verification and form filling",
        "Online application submission",
        "Payment of processing fees",
        "Acknowledgment receipt generation",
        "PAN card delivery within 15-20 days",
      ],
      pricing: "₹107 for new application",
      icon: CreditCard,
      colorScheme: "purple",
    },
    {
      title: "Voter ID Services",
      description: "Voter ID card registration and corrections for Indian citizens above 18 years.",
      benefits: [
        "New voter registration",
        "Voter ID corrections",
        "Address change in voter list",
        "Duplicate voter ID issuance",
        "Online status tracking",
        "Complete documentation support",
      ],
      documents: [
        "Age proof (Birth certificate, Passport)",
        "Address proof (Utility bills, Aadhaar)",
        "Identity proof (Aadhaar, PAN)",
        "Passport size photographs",
        "Form 6 (new registration) or Form 8 (corrections)",
      ],
      process: [
        "Eligibility verification",
        "Form filling and documentation",
        "Online application submission",
        "Field verification by officials",
        "Voter ID card issuance",
      ],
      pricing: "Free of cost",
      icon: UserCheck,
      colorScheme: "blue",
    },
    {
      title: "Aadhaar Card Services",
      description: "Aadhaar enrollment and update services with biometric verification.",
      benefits: [
        "New Aadhaar enrollment",
        "Aadhaar updates and corrections",
        "Mobile number and email updates",
        "Address change services",
        "Biometric updates",
        "Aadhaar PVC card ordering",
      ],
      documents: [
        "Proof of Identity (POI)",
        "Proof of Address (POA)",
        "Date of birth proof (POB)",
        "Relationship proof (for children)",
        "Existing Aadhaar (for updates)",
      ],
      process: [
        "Document verification",
        "Biometric data capture",
        "Demographic data entry",
        "Application submission",
        "Aadhaar generation within 90 days",
      ],
      pricing: "₹50 for new enrollment",
      icon: FileCheck,
      colorScheme: "orange",
    },
    {
      title: "Ration Card Services",
      description: "Ration card application for accessing subsidized food grains under PDS.",
      benefits: [
        "New ration card application",
        "Ration card corrections",
        "Addition/deletion of family members",
        "Duplicate ration card issuance",
        "Category change applications",
        "Complete application support",
      ],
      documents: [
        "Family income certificate",
        "Address proof documents",
        "Identity proof of all members",
        "Aadhaar cards of family members",
        "Bank account details",
        "Passport size photographs",
      ],
      process: [
        "Eligibility assessment",
        "Application form completion",
        "Document submission",
        "Verification by officials",
        "Ration card issuance",
      ],
      pricing: "₹15 application fee",
      icon: Building,
      colorScheme: "emerald",
    },
    {
      title: "Driving License & Motor Vehicle Services",
      description: "Complete driving license and vehicle registration services with RTO assistance.",
      benefits: [
        "Learner's license application",
        "Permanent driving license",
        "License renewal services",
        "Vehicle registration",
        "RC transfer services",
        "NOC and other RTO services",
      ],
      documents: [
        "Age proof documents",
        "Address proof documents",
        "Medical certificate (if required)",
        "Passport size photographs",
        "Previous license (for renewal)",
        "Vehicle documents (for registration)",
      ],
      process: [
        "Document verification",
        "Online application submission",
        "Test scheduling (if required)",
        "Fee payment",
        "License/RC issuance",
      ],
      pricing: "₹200 for learner's license",
      icon: Car,
      colorScheme: "blue",
    },
    {
      title: "Birth Certificate Services",
      description: "Birth certificate registration and corrections for legal documentation.",
      benefits: [
        "Birth registration services",
        "Birth certificate corrections",
        "Duplicate certificate issuance",
        "Late registration assistance",
        "Online application support",
        "Fast processing available",
      ],
      documents: [
        "Hospital discharge summary",
        "Parents' identity proof",
        "Parents' address proof",
        "Marriage certificate of parents",
        "Affidavit (for late registration)",
      ],
      process: [
        "Document collection and verification",
        "Application form completion",
        "Submission to registrar office",
        "Verification process",
        "Certificate issuance",
      ],
      pricing: "₹50 for registration",
      icon: Baby,
      colorScheme: "purple",
    },
    {
      title: "Trade License Services",
      description: "Trade license registration for businesses and commercial establishments.",
      benefits: [
        "New trade license application",
        "License renewal services",
        "License modifications",
        "NOC assistance",
        "Compliance support",
        "Expert guidance throughout",
      ],
      documents: [
        "Business registration documents",
        "Property ownership/rental agreement",
        "Identity and address proof",
        "NOC from fire department",
        "Pollution clearance certificate",
        "Partnership deed (if applicable)",
      ],
      process: [
        "Business eligibility assessment",
        "Documentation preparation",
        "Application submission",
        "Inspection by authorities",
        "License issuance",
      ],
      pricing: "Varies by business type",
      icon: Briefcase,
      colorScheme: "orange",
    },
  ];

  const taxServices = [
    {
      title: "Income Tax Filing",
      description: "Professional income tax return filing services for individuals and businesses.",
      benefits: [
        "ITR filing for all categories",
        "Tax planning and optimization",
        "Refund processing assistance",
        "Notice handling support",
        "TDS return filing",
        "Expert tax consultation",
      ],
      documents: [
        "Form 16/16A (salary/other income)",
        "Bank statements",
        "Investment proofs",
        "Property documents",
        "Business books (for business income)",
        "Previous year ITR",
      ],
      process: [
        "Income and investment analysis",
        "Tax calculation and planning",
        "ITR preparation and review",
        "Online filing and verification",
        "Acknowledgment and refund tracking",
      ],
      pricing: "₹500 onwards",
      icon: Calculator,
      colorScheme: "emerald",
    },
    {
      title: "Professional Tax Services",
      description: "Professional tax registration and compliance for employees and professionals.",
      benefits: [
        "Professional tax registration",
        "Monthly return filing",
        "Compliance management",
        "Penalty avoidance",
        "Expert consultation",
        "Timely reminders",
      ],
      documents: ["Employment certificate", "Salary certificate", "PAN card", "Aadhaar card", "Bank account details"],
      process: [
        "Registration with authorities",
        "Monthly tax calculation",
        "Return preparation and filing",
        "Payment processing",
        "Compliance monitoring",
      ],
      pricing: "₹200 per month",
      icon: FileText,
      colorScheme: "blue",
    },
    {
      title: "Agreement Services",
      description: "Legal agreement drafting and documentation services for various purposes.",
      benefits: [
        "Rental agreement drafting",
        "Partnership agreements",
        "Service agreements",
        "Employment contracts",
        "Legal consultation",
        "Stamp paper arrangements",
      ],
      documents: [
        "Party identification documents",
        "Property documents (if applicable)",
        "Terms and conditions",
        "Witness details",
        "Stamp paper",
      ],
      process: [
        "Requirement understanding",
        "Agreement drafting",
        "Review and modifications",
        "Stamp paper execution",
        "Registration (if required)",
      ],
      pricing: "₹1,000 onwards",
      icon: ScrollText,
      colorScheme: "purple",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <SimplePageHeader title="Document Management" description="Securely manage your financial documents with ease." className="mb-12 [&>h1]:text-4xl sm:[&>h1]:text-6xl" color="from-purple-600 to-violet-600" />

            {documentServices.map((service, index) => {
        const card = (
          <ServiceCard
            className="sm:max-w-5xl sm:mx-auto"
            title={service.title}
            description={service.description}
            benefits={service.benefits}
            documents={service.documents}
            process={service.process}
            pricing={service.pricing}
            icon={service.icon}
            ctaText="Apply Now"
            colorScheme={service.colorScheme}
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me apply.`}
          />
        );
        return service.title === "PAN Card Services" ? (
          <div id="pan-card-services" className="scroll-mt-28 sm:scroll-mt-32" key={index}>{card}</div>
        ) : (
          <div key={index}>{card}</div>
        );
      })}

            {taxServices.map((service, index) => {
        const card = (
          <ServiceCard
            className="sm:max-w-5xl sm:mx-auto"
            title={service.title}
            description={service.description}
            benefits={service.benefits}
            documents={service.documents}
            process={service.process}
            pricing={service.pricing}
            icon={service.icon}
            ctaText="Get Started"
            colorScheme={service.colorScheme}
            delay={documentServices.length * 50 + index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me get started.`}
          />
        );
        return service.title === "Income Tax Filing" ? (
          <div id="income-tax-filing" className="scroll-mt-28 sm:scroll-mt-32" key={index}>{card}</div>
        ) : (
          <div key={index}>{card}</div>
        );
      })}
    </div>
  );
}
