'use client';

import { CreditCard, UserCheck, FileCheck, Building, Car, Baby, Briefcase, Calculator, FileText, ScrollText, ShieldCheck, BookUser, Stamp, Landmark, Handshake, Receipt, Search, UserPlus, HeartHandshake } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function DocumentsContent() {
  const documentServices = [
    {
      title: "PAN Card Services",
      description: "New PAN, e-PAN, Corrections, Re-issue of Lost Card, Aadhaar-PAN Linking.",
      benefits: [
        "New PAN, e-PAN, Corrections, Re-issue of Lost Card, Aadhaar-PAN Linking.",
      ],
      documents: [
        "Individual: Aadhaar Card, proof of address, two passport-size photos.",
        "Organization: Registration certificate, ID of the authorized person.",
      ],
      process: [
        "Select the required service.",
        "Fill out the application form.",
        "Submit the necessary documents.",
        "Receive your e-PAN, followed by the physical card by post.",
      ],
      costs: ["New PAN (Individual): ₹250, e-PAN + Physical Card: ₹300, PAN Correction: ₹250 (+ ₹50 for each additional correction), Lost PAN Re-issue: ₹250, Aadhaar-PAN Linking: ₹1,150, Organization/Company PAN: ₹550"],
      icon: CreditCard,
      colorScheme: "purple",
    },
    {
      title: "Aadhaar Card Services",
      description: "New Enrolment, Address/Mobile/Name Updates, PVC Card, e-Aadhaar Download.",
      benefits: [
        "New Enrolment, Address/Mobile/Name Updates, PVC Card, e-Aadhaar Download.",
      ],
      documents: [
        "Mobile number linked to Aadhaar (for OTP-based updates).",
        "Proof of Identity (PAN, Voter ID, Passport).",
        "Proof of Address (Utility Bill, Bank Statement).",
        "Birth Certificate for new enrolments.",
      ],
      process: [
        "Book an appointment if biometrics are required.",
        "Complete the application form for the desired service.",
        "Attend the appointment for fingerprint, iris scan, and photo capture.",
        "Track status with your enrolment number and download the e-Aadhaar upon approval.",
      ],
      costs: ["New Aadhaar Enrolment: ₹200, Address Update: ₹250, Any Correction: ₹250 (+ ₹50 for each additional correction), Aadhaar PVC Card: ₹100, Download + Lamination: ₹60"],
      icon: UserCheck,
      colorScheme: "blue",
    },
    {
      title: "Voter ID Card Services",
      description: "New Card Application, Corrections, Address Change, Aadhaar/Mobile Linking.",
      benefits: [
        "New Card Application, Corrections, Address Change, Aadhaar/Mobile Linking.",
      ],
      documents: [
        "Aadhaar card with a linked mobile number.",
        "PAN or Ration Card.",
        "Recent passport-size photo.",
      ],
      process: [
        "Start the online application with a ₹100 advance payment.",
        "Complete the form and upload the required documents.",
        "Track your application with the acknowledgement number.",
        "Once approved, download the e-Voter ID or receive the physical card.",
      ],
      costs: ["New Voter Card: ₹200 (₹100 advance is non-refundable if rejected), Aadhaar or Mobile Linking: ₹50, Address Change/Correction: ₹200 (+ ₹50 for each additional correction), Download + Lamination: ₹100"],
      icon: FileCheck,
      colorScheme: "orange",
    },
    {
      title: "Ration Card Services",
      description: "New Card Application, Add/Remove Member, Corrections, Aadhaar/Mobile Linking, Dealer Change.",
      benefits: [
        "New Card Application, Add/Remove Member, Corrections, Aadhaar/Mobile Linking, Dealer Change.",
      ],
      documents: [
        "Aadhaar card with a linked mobile number for all relevant family members.",
        "Birth certificate for children.",
        "Proof of family head and relationships.",
        "Income and residential certificates (for new family creation).",
      ],
      process: [
        "Choose the required service and complete the online form.",
        "Upload all supporting documents.",
        "Check the status after approximately 20 days using your application reference.",
        "Download the e-Ration card upon approval.",
      ],
      costs: ["New Ration Card: ₹250, Aadhaar or Mobile Linking: ₹50, Address/Dealer Change: ₹200 / ₹150, Correction: ₹200 (+ ₹50 per extra category), New Family Creation: ₹300 per person."],
      icon: Building,
      colorScheme: "emerald",
    },
    {
      title: "Birth Certificate Services",
      description: "New Application, Corrections, Download & Lamination.",
      benefits: ["New Application, Corrections, Download & Lamination."],
      documents: [
        "New Application: Birth proof from the hospital, parents' Aadhaar/Voter cards, Form-1 attested by Panchayat/Councilor.",
        "Correction: Existing birth certificate, child's and parents' ID proofs.",
      ],
      process: [
        "Fill out the online application or correction form.",
        "Upload hospital proof and supporting ID documents.",
        "Track the application with the acknowledgement number and download upon approval.",
      ],
      costs: ["New Birth Certificate: ₹500, Correction of Certificate: ₹500, Download + Lamination: ₹150"],
      icon: Baby,
      colorScheme: "purple",
    },
  ];

  const drivingLicenceServices = [
    {
      title: "New Driving Licence",
      description: "Legally drive two, three, four-wheelers, or commercial vehicles. Support with booking, mock tests, and RTO visits.",
      benefits: ["Legally drive two, three, four-wheelers, or commercial vehicles. Support with booking, mock tests, and RTO visits."],
      documents: ["Aadhaar Card (mandatory), Voter ID, blood group details, fitness certificate (if age > 40), passport-size photos."],
      process: [
        "Choose the vehicle category.",
        "Complete the application and upload documents.",
        "Book a driving test date.",
        "Attend the RTO for the learner and final driving tests.",
        "Receive your driving licence upon passing.",
      ],
      costs: ["Two-Wheeler: ₹2,500, Four-Wheeler: ₹3,000, Two + Four Wheeler: ₹4,800, Commercial/Heavy Vehicle: ₹4,100"],
      icon: Car,
      colorScheme: "blue",
    },
    {
      title: "Licence Renewal, Corrections & Duplicates",
      description: "Renewal, Name/Address/DOB Correction, Duplicate/Lost Licence Replacement.",
      benefits: ["Renewal, Name/Address/DOB Correction, Duplicate/Lost Licence Replacement."],
      documents: ["Original driving licence, Aadhaar, Voter ID, photos. For lost licences, an FIR is required."],
      process: [
        "Apply for the specific service online or at the RTO.",
        "Submit required documents (and FIR/affidavit where needed).",
        "A driving re-test is mandatory if the licence has been expired for over one year.",
        "Receive the updated or duplicate licence.",
      ],
      costs: ["Renewal (Private Vehicle): ₹1,800 (plus fines if expired), Name Correction: ₹2,550 (includes newspaper ad + affidavit), Address/DOB Correction: ₹1,850 (includes affidavit), Lost Licence Replacement: ₹2,550 (includes Lalbazar report + affidavit)"],
      icon: UserPlus,
      colorScheme: "orange",
    },
  ];

  const vehicleRegistrationServices = [
    {
      title: "Ownership (Name) Transfer",
      description: "Legally transfer vehicle ownership from seller to buyer.",
      benefits: ["Legally transfer vehicle ownership from seller to buyer."],
      documents: ["Original RC, insurance, PUC, buyer & seller IDs, signed Forms 29 & 30, NOC from financier (if under loan)."],
      process: [
        "Complete and sign Forms 29 & 30.",
        "Submit all required documents to the RTO.",
        "Pay the transfer fee and await processing.",
        "A new RC is issued in the buyer's name.",
      ],
      costs: ["Two-Wheeler (Example): Approx. ₹4,500. Note: Fees for larger vehicles may vary."],
      icon: Handshake,
      colorScheme: "emerald",
    },
    {
      title: "Other Vehicle Services",
      description: "RC / Smart Card Issuance, MV Road Tax Payment, Certificate of Fitness (CF), Fine / Penalty Payment.",
      benefits: ["RC / Smart Card Issuance, MV Road Tax Payment, Certificate of Fitness (CF), Fine / Penalty Payment."],
      documents: [],
      process: [],
      costs: ["RC / Smart Card Issuance: Approx. ₹1,000, MV Road Tax Payment: Admin fees range from ₹150 to ₹750 (plus actual tax amount), Certificate of Fitness (CF): Approx. ₹3,500 (for 2-wheelers, others may vary), Fine / Penalty Payment: Varies by offence."],
      icon: Receipt,
      colorScheme: "red",
    },
  ];

  const businessAndLegalServices = [
    {
      title: "Trade License",
      description: "Obtain legal permission to operate your business at a specified location. Required for compliance and other permits.",
      benefits: ["Obtain legal permission to operate your business at a specified location. Required for compliance and other permits."],
      documents: ["Identity proof (Aadhaar, PAN), property tax receipt or rent agreement, contact details."],
      process: [
        "Complete the new registration or renewal application.",
        "Attach all required documents.",
        "We submit the application and follow up until approval.",
        "Receive your trade licence certificate.",
      ],
      costs: ["New Registration: Panchayat/Municipality (₹500), Corporation (₹1,000). Renewal: Panchayat/Municipality (₹300), Corporation (₹500). Note: Government fees are separate and vary by business type."],
      icon: Briefcase,
      colorScheme: "orange",
    },
    {
      title: "Agreements & Affidavits",
      description: "Professionally drafted, legally valid documents prepared by experienced lawyers.",
      benefits: ["Rent agreements, business agreements, sale agreements, judicial and non-judicial affidavits."],
      documents: [],
      process: [
        "Share the document type and details of the parties involved.",
        "A draft is prepared for your review.",
        "The final document is signed and attested (notary or magistrate).",
      ],
      costs: ["Fees vary based on document complexity and attestation requirements. Please contact us for a firm quote."],
      icon: ScrollText,
      colorScheme: "purple",
    },
    {
      title: "Professional Tax (P.Tax)",
      description: "Ensure compliance with state-level tax for professionals and businesses to avoid penalties.",
      benefits: ["Ensure compliance with state-level tax for professionals and businesses to avoid penalties."],
      documents: [],
      process: [
        "Determine applicability based on your state and income slab.",
        "Register on the state's professional tax portal.",
        "File returns and pay tax by the due dates.",
      ],
      costs: ["Monthly income ₹10,001–₹15,000: ₹110/month. Monthly income ₹15,001–₹25,000: ₹130/month. Monthly income ₹25,001–₹40,000: ₹150/month. Monthly income above ₹40,001: ₹200/month. Note: Slabs and rates vary by state."],
      icon: FileText,
      colorScheme: "blue",
    },
  ];

  const incomeTaxFilingServices = [
    {
      title: "Income Tax Filing Services",
      description: "CA-guided filing for accuracy, including TDS and AIS review.",
      benefits: [
        "Compliance: File returns on time to avoid penalties.",
        "Loan & Credit Support: ITRs are crucial for loan and credit card applications.",
        "Expert Guidance: CA-guided filing for accuracy, including TDS and AIS review.",
        "Custom Plans: Packages for salaried individuals, business owners, and investors.",
      ],
      documents: [
        "PAN and Aadhaar Card.",
        "Bank statements for the financial year (April–March).",
        "Form 16 (for salaried), Form 26AS, and TDS certificates.",
        "Details of capital gains from shares or mutual funds.",
        "Books of accounts (for businesses).",
      ],
      process: [
        "Choose a Plan: Select the plan that matches your income profile.",
        "Upload Documents: Submit all required documents securely.",
        "Review: Our tax specialist reviews your documents and requests any clarifications.",
        "Filing: We prepare the tax computation and file your return electronically.",
        "Delivery: You receive the filed ITR copy and acknowledgement.",
      ],
      costs: ["Salary Income Plan: Starts at ₹699. Capital Gain Plan: Starts at ₹999. Normal Plan (Small Business): Starts at ₹1,699. Standard Plan (Salaried + Business): Starts at ₹2,599. Premium Plan (Complex Filing): Starts at ₹4,999. Note: Prices are indicative. Final cost may vary based on complexity and transaction volume. Bank reconciliation is charged separately."],
      icon: Calculator,
      colorScheme: "emerald",
    },
  ];

  const passportServices = [
    {
      title: "Passport Services (Online OTP-Based Application)",
      description: "Convenient Application, Flexible Scheduling, Multiple Service Options.",
      benefits: [
        "Convenient Application: Fully online process with secure OTP-based verification.",
        "Flexible Scheduling: Choose your own interview and appointment date at your convenience.",
        "Multiple Service Options: Available for new passports (36 or 60 pages), renewals, and re-issuance in case of loss.",
      ],
      documents: [
        "A. For a New Passport (Adult): Aadhaar Card (must be linked with a mobile number for OTP), One additional ID from the following: Voter ID, Ration Card, PAN Card, Birth Certificate, Parents’ Aadhaar and Voter ID, School Certificate, Marriage Certificate (if applicable).",
        "B. For Passport Renewal: A copy of your old passport.",
        "C. For a Lost Passport: Proof of current address, Proof of date of birth, Identity proof, Original First Information Report (FIR) copy from the police, Self-attested photocopy of the first two and last two pages of the old passport (if available), An affidavit on Annexure F or L explaining how and where the passport was lost.",
      ],
      process: [
        "Apply Online: Start your application on the official passport portal using OTP-based authentication.",
        "Upload & Select: Upload the required documents and choose the service you need (new, renewal, or lost case).",
        "Pay Fees: Complete the payment online.",
        "Schedule Appointment: Book an appointment slot that works for you.",
        "Visit Kendra: Go to the Passport Seva Kendra on your scheduled date with all your original documents for verification.",
        "Verification & Issuance: The passport will be issued or renewed after a successful police verification (if required).",
      ],
      costs: ["New Passport (36 pages): ₹2,100, New Passport (60 pages): ₹2,650, Renewal: ₹2,200, Lost Passport Re-issuance: ₹3,500"],
      icon: BookUser,
      colorScheme: "red",
    },
  ];

  const marriageRegistrationServices = [
    {
      title: "Marriage Registration Services",
      description: "Legal Recognition, Official Proof, Legal Security.",
      benefits: [
        "Legal Recognition: Officially registers your marriage under the Marriage Act.",
        "Official Proof: The marriage certificate is accepted as valid proof for visas, banking, and government schemes.",
        "Legal Security: Protects the legal rights of both spouses.",
      ],
      documents: [
        "Aadhaar Card for both the bride and groom.",
        "Address proof for both individuals.",
        "Proof of date of birth (Birth Certificate, School Certificate, or Passport).",
        "Passport-size photographs of both individuals.",
        "Marriage invitation card (if available).",
        "Two witnesses, each with valid ID and address proof.",
      ],
      process: [
        "Submit Application: File an application for marriage registration, either at the registrar’s office or through an online portal if available.",
        "Provide Documents: Submit all necessary documents and photographs.",
        "Verification: Officials will verify the identity of the couple and the witness details.",
        "Issuance: The marriage certificate is issued after the couple signs in front of the registrar.",
      ],
      costs: ["Marriage Registration Fee: Starts at ₹3,000. Note: Final charges may vary depending on state rules and any additional legal or administrative fees."],
      icon: HeartHandshake,
      colorScheme: "teal",
    },
  ];

  const SectionHeader = ({ title, showDivider = true }: { title: string, showDivider?: boolean }) => (
    <div className="text-center my-4">
      {showDivider && (
        <div className="sm:max-w-5xl sm:mx-auto mb-4 lg:mb-8">
          <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
        </div>
      )}
      <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-serif">{title}</h2>
      <div className="h-1 w-24 bg-purple-600 mx-auto mt-2" />
    </div>
  );

  return (
    <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <SimplePageHeader title="Document Management" description="Securely manage your financial documents with ease." className="mb-8 [&>h1]:text-4xl sm:[&>h1]:text-6xl" color="from-purple-600 to-violet-600" />

      <div className="-mt-4">
        <SectionHeader title="Document Services" showDivider={true} />
      </div>
      {documentServices.map((service, index) => (
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
            ctaText="Apply Now"
            colorScheme={service.colorScheme}
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me apply.`}
          />
        </div>
      ))}

      <div className="mt-16 pt-8">
        <SectionHeader title="Driving Licence Services" showDivider={false} />
      </div>
      {drivingLicenceServices.map((service, index) => (
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
            ctaText="Apply Now"
            colorScheme={service.colorScheme}
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me apply.`}
          />
        </div>
      ))}

      <div className="mt-16 pt-8">
        <SectionHeader title="Vehicle Registration Services" showDivider={false} />
      </div>
      {vehicleRegistrationServices.map((service, index) => (
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
            ctaText="Apply Now"
            colorScheme={service.colorScheme}
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me apply.`}
          />
        </div>
      ))}

      <div className="mt-16 pt-8">
        <SectionHeader title="Business & Legal Services" showDivider={false} />
      </div>
      {businessAndLegalServices.map((service, index) => (
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
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me get started.`}
          />
        </div>
      ))}

      <div className="mt-16 pt-8">
        <SectionHeader title="Income Tax Filing Services" showDivider={false} />
      </div>
      {incomeTaxFilingServices.map((service, index) => (
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
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me get started.`}
          />
        </div>
      ))}

      <div className="mt-16 pt-8">
        <SectionHeader title="Passport Services" showDivider={false} />
      </div>
      {passportServices.map((service, index) => (
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
            ctaText="Apply Now"
            colorScheme={service.colorScheme}
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me apply.`}
          />
        </div>
      ))}

      <div className="mt-16 pt-8">
        <SectionHeader title="Marriage Registration Services" showDivider={false} />
      </div>
      {marriageRegistrationServices.map((service, index) => (
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
            delay={index * 50}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in ${service.title}. Please help me get started.`}
          />
        </div>
      ))}
    </div>
  );
}
