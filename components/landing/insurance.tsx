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
        "Cashless hospitalisation at network hospitals.",
        "Coverage for in-patient, pre- and post-hospitalisation expenses.",
        "Coverage for daycare procedures and AYUSH treatments.",
      ],
      documents: [
        "Identity & Address Proof (Aadhaar, PAN, Bank Passbook).",
        "Age Proof (Birth Certificate, School Certificate).",
        "Medical history and details of any pre-existing conditions.",
        "Previous policy documents (for renewals or porting).",
        "Bank details or a cancelled cheque for reimbursements.",
      ],
      process: [
        "Compare Plans: We'll help you evaluate options like individual vs. family floater plans and select suitable top-ups or add-ons.",
        "Application: Fill out the proposal form with a full disclosure of your medical history.",
        "Payment: Pay the premium securely online or via an agent.",
        "Policy Issuance: Receive your official policy document and ID card in soft copy.",
        "Claims: For claims, notify the insurer, submit hospital and claim documents, and follow the cashless or reimbursement process.",
      ],
      costs: ["Premiums vary based on age, sum insured, family size, and location. Individual Plans: Typically range from ₹5,000 to ₹20,000 per year (approx). Family Floater Plans: Typically range from ₹10,000 to ₹50,000 per year (approx). Note: These are indicative ranges. Please use a premium calculator for an exact quote."],
      icon: Heart,
      colorScheme: "emerald",
    },
    {
      title: "Two-Wheeler Insurance",
      description: "Comprehensive insurance coverage for your motorcycle or scooter.",
      benefits: [
        "Third-Party Cover (Mandatory): Protects against legal liabilities from injury or damage to others.",
        "Comprehensive Cover: Includes third-party liability plus protection against own-vehicle damage, theft, fire, and natural disasters.",
      ],
      documents: [
        "Vehicle Registration Certificate (RC).",
        "Owner's Driving Licence (DL).",
        "Identity & Address Proof (Aadhaar, PAN, Voter ID).",
        "Previous policy details (for renewals).",
        "For claims: FIR (for theft/injury), repair bills, photos, and garage estimates.",
      ],
      process: [
        "Choose Coverage: Select either mandatory Third-Party cover or a full Comprehensive policy with add-ons.",
        "Get Quote: Provide your RC, DL, and ID proof to generate a quote.",
        "Payment & Policy: Pay the premium to receive your policy document instantly.",
        "Claims: Intimate the insurer, allow for inspection if needed, and use a network garage for cashless repairs or claim reimbursement.",
      ],
      costs: ["Third-Party Only: Rates are regulated by IRDAI, typically starting from ₹1,300 to ₹3,000 per year. Comprehensive: Varies based on the bike's Insured Declared Value (IDV), model, and age. Annual premiums commonly range from ₹1,500 to ₹6,000. Note: These are indicative ranges. Please use a premium calculator for an exact quote."],
      icon: Bike,
      colorScheme: "blue",
    },
    {
      title: "Four-Wheeler (Car) Insurance",
      description: "Complete car insurance protection with comprehensive coverage options.",
      benefits: [
        "Third-Party Cover (Mandatory): Protects against liability for damage or injury to others.",
        "Comprehensive Cover: Adds own-damage protection, personal accident cover, and protection from theft and natural calamities.",
        "Add-ons: Enhance your policy with options like Zero Depreciation, Engine Cover, and Roadside Assistance.",
      ],
      documents: [
        "Vehicle Registration Certificate (RC).",
        "Owner/Driver's Driving Licence.",
        "Identity & Address Proof (Aadhaar, PAN).",
        "Previous policy and No Claim Bonus (NCB) certificate for renewals.",
        "For claims: FIR and police reports may be needed.",
      ],
      process: [
        "Select Policy: Choose your policy type (Third-Party/Comprehensive), Insured Declared Value (IDV), and desired add-ons.",
        "Get Quote: Provide vehicle and owner details to receive a premium quote, including any applicable discounts (like NCB).",
        "Payment & Policy: Pay the premium to receive your e-policy.",
        "Claims: Inform the insurer, get the vehicle assessed, and use a network garage for cashless service or claim reimbursement.",
      ],
      costs: ["Third-Party Only: Rates are IRDAI-regulated based on engine capacity (e.g., up to 1000cc ≈ ₹2,000–₹3,000/year). Comprehensive: Depends on IDV, model, NCB, and add-ons. Indicative annual ranges: Hatchback (₹7k–₹15k), Sedan (₹10k–₹20k), SUV (₹15k–₹30k). Note: These are indicative ranges. Please use a premium calculator for an exact quote."],
      icon: Car,
      colorScheme: "purple",
    },
    {
      title: "Life Insurance Corporation of India (LIC)",
      description: "Secure your family's future with a range of life insurance products from LIC.",
      benefits: [
        "Provides a financial safety net (death benefit) for your loved ones.",
        "Offers a range of products: pure protection (Term), savings (Endowment), retirement (Pension), or market-linked returns (ULIPs).",
      ],
      documents: [
        "Identity & Address Proof (Aadhaar, PAN, Photo).",
        "Age Proof (Birth Certificate, School Certificate).",
        "Bank account and nominee details.",
        "Medical reports may be required based on age and sum assured.",
      ],
      process: [
        "Select Product: Choose a plan (Term, Endowment, ULIP, etc.), sum assured, and policy term that aligns with your financial goals.",
        "Application: Complete the proposal form with accurate health and medical history.",
        "Underwriting: The insurer may request medical tests.",
        "Payment & Policy: Pay the first premium to get your policy issued.",
        "Claims: The nominee files a claim with the death certificate and policy documents for processing.",
      ],
      costs: ["Premiums are determined by your age, health, gender, sum assured, policy term, and product type. Term plans offer the highest coverage for the lowest premium, while Endowment and ULIP plans have higher premiums as they include a savings or investment component."],
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
