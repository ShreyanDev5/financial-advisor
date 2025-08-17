'use client';

import { CreditCard, UserCheck, FileCheck, Building, Car, Baby, Briefcase, Calculator, FileText, ScrollText, ShieldCheck, BookUser, Stamp, Landmark, Handshake, Receipt, Search, UserPlus, HeartHandshake } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function DocumentsContent() {
  const documentServices = [
    {
      title: "PAN Card Services",
      description: "New PAN, e-PAN, Corrections, Re-issue of Lost Card, Aadhaar-PAN Linking.",
      benefits: ["New PAN, e-PAN, corrections, re-issue, and Aadhaar linking."],
      documents: [
        "Individual: Aadhaar, address proof, photos.",
        "Organization: Registration certificate, authorized person's ID.",
      ],
      process: ["Select service, fill form, submit documents. Receive e-PAN, then physical card."],
      costs: ["New PAN: ₹250. e-PAN + Physical: ₹300. Correction: ₹250+. Lost PAN: ₹250. Aadhaar Link: ₹1,150. Organization PAN: ₹550."],
      icon: CreditCard,
      colorScheme: "purple",
    },
    {
      title: "Aadhaar Card Services",
      description: "New Enrolment, Address/Mobile/Name Updates, PVC Card, e-Aadhaar Download.",
      benefits: ["New enrolment, updates (address, mobile, name), PVC card, and e-Aadhaar download."],
      documents: [
        "Aadhaar-linked mobile for OTP.",
        "ID proof (PAN, Voter ID).",
        "Address proof (utility bill).",
        "Birth certificate for new enrolment.",
      ],
      process: ["Book appointment if biometrics needed. Fill form, attend appointment for biometrics. Track and download e-Aadhaar."],
      costs: ["New Enrolment: ₹200. Address Update: ₹250. Correction: ₹250+. PVC Card: ₹100. Download + Lamination: ₹60."],
      icon: UserCheck,
      colorScheme: "blue",
    },
    {
      title: "Voter ID Card Services",
      description: "New Card Application, Corrections, Address Change, Aadhaar/Mobile Linking.",
      benefits: ["New card, corrections, address change, and Aadhaar/mobile linking."],
      documents: ["Aadhaar with linked mobile. PAN or Ration Card. Passport-size photo."],
      process: ["Start online application with ₹100 advance. Complete form, upload documents. Track with acknowledgement number. Download e-Voter ID or receive card."],
      costs: ["New Card: ₹200 (₹100 non-refundable advance). Aadhaar/Mobile Link: ₹50. Address Change/Correction: ₹200+. Download + Lamination: ₹100."],
      icon: FileCheck,
      colorScheme: "orange",
    },
    {
      title: "Ration Card Services",
      description: "New Card Application, Add/Remove Member, Corrections, Aadhaar/Mobile Linking, Dealer Change.",
      benefits: ["New card, add/remove member, corrections, Aadhaar/mobile linking, and dealer change."],
      documents: [
        "Aadhaar with linked mobile for all members.",
        "Birth certificate for children.",
        "Proof of family head.",
        "Income/residential certificates for new family.",
      ],
      process: ["Choose service, complete online form. Upload documents. Check status after ~20 days. Download e-Ration card."],
      costs: ["New Card: ₹250. Aadhaar/Mobile Link: ₹50. Address/Dealer Change: ₹200/₹150. Correction: ₹200+. New Family: ₹300/person."],
      icon: Building,
      colorScheme: "emerald",
    },
    {
      title: "Birth Certificate Services",
      description: "New Application, Corrections, Download & Lamination.",
      benefits: ["New application, corrections, and download/lamination."],
      documents: [
        "New: Hospital birth proof, parents' Aadhaar/Voter cards, attested Form-1.",
        "Correction: Existing certificate, child's and parents' IDs.",
      ],
      process: ["Fill online form, upload hospital proof and IDs. Track with acknowledgement number and download."],
      costs: ["New Certificate: ₹500. Correction: ₹500. Download + Lamination: ₹150."],
      icon: Baby,
      colorScheme: "purple",
    },
  ];

  const drivingLicenceServices = [
    {
      title: "New Driving Licence",
      description: "Legally drive two, three, four-wheelers, or commercial vehicles. Support with booking, mock tests, and RTO visits.",
      benefits: ["Drive 2, 3, 4-wheelers, or commercial vehicles. Includes booking, mock tests, and RTO support."],
      documents: ["Aadhaar (mandatory), Voter ID, blood group, fitness certificate (>40 years), photos."],
      process: ["Choose vehicle, complete application, upload documents. Book and attend learner/final RTO tests. Receive licence."],
      costs: ["2-Wheeler: ₹2,500. 4-Wheeler: ₹3,000. 2+4 Wheeler: ₹4,800. Commercial: ₹4,100."],
      icon: Car,
      colorScheme: "blue",
    },
    {
      title: "Licence Renewal, Corrections & Duplicates",
      description: "Renewal, Name/Address/DOB Correction, Duplicate/Lost Licence Replacement.",
      benefits: ["Renewal, name/address/DOB correction, and duplicate/lost licence replacement."],
      documents: ["Original DL, Aadhaar, Voter ID, photos. FIR for lost licence."],
      process: ["Apply online or at RTO. Submit documents (plus FIR if needed). Re-test if expired >1 year. Receive updated/duplicate licence."],
      costs: ["Renewal: ₹1,800 (+ fines). Name Correction: ₹2,550 (inc. ad/affidavit). Address/DOB Correction: ₹1,850 (inc. affidavit). Lost Licence: ₹2,550 (inc. report/affidavit)."],
      icon: UserPlus,
      colorScheme: "orange",
    },
  ];

  const vehicleRegistrationServices = [
    {
      title: "Ownership (Name) Transfer",
      description: "Legally transfer vehicle ownership from seller to buyer.",
      benefits: ["Legal transfer of vehicle ownership."],
      documents: ["Original RC, insurance, PUC, buyer/seller IDs, signed Forms 29/30, financier NOC (if applicable)."],
      process: ["Sign Forms 29/30, submit documents to RTO. Pay fee, await processing. New RC issued in buyer's name."],
      costs: ["2-Wheeler: ~₹4,500. Fees for larger vehicles vary."],
      icon: Handshake,
      colorScheme: "emerald",
    },
    {
      title: "Other Vehicle Services",
      description: "RC / Smart Card Issuance, MV Road Tax Payment, Certificate of Fitness (CF), Fine / Penalty Payment.",
      benefits: ["RC/Smart Card, road tax, fitness certificate (CF), and fine/penalty payment."],
      documents: [],
      process: [],
      costs: ["RC/Smart Card: ~₹1,000. Road Tax: ₹150-₹750 admin fee (+ tax). CF (2-wheeler): ~₹3,500. Fines vary."],
      icon: Receipt,
      colorScheme: "red",
    },
  ];

  const businessAndLegalServices = [
    {
      title: "Trade License",
      description: "Obtain legal permission to operate your business at a specified location. Required for compliance and other permits.",
      benefits: ["Legal permission to operate a business. Required for compliance."],
      documents: ["ID proof (Aadhaar, PAN), property tax receipt/rent agreement, contact details."],
      process: ["Complete application, attach documents. We submit and follow up. Receive trade licence."],
      costs: ["New: Panchayat/Municipality (₹500), Corporation (₹1,000). Renewal: Panchayat/Municipality (₹300), Corporation (₹500). (Govt. fees vary)."],
      icon: Briefcase,
      colorScheme: "orange",
    },
    {
      title: "Agreements & Affidavits",
      description: "Professionally drafted, legally valid documents prepared by experienced lawyers.",
      benefits: ["Rent, business, sale agreements; judicial/non-judicial affidavits."],
      documents: [],
      process: ["Share document type and party details. Review draft. Final document signed and attested."],
      costs: ["Fees vary by complexity. Contact for quote."],
      icon: ScrollText,
      colorScheme: "purple",
    },
    {
      title: "Professional Tax (P.Tax)",
      description: "Ensure compliance with state-level tax for professionals and businesses to avoid penalties.",
      benefits: ["State-level tax compliance for professionals and businesses."],
      documents: [],
      process: ["Determine applicability by state/income. Register on state portal. File returns and pay tax on time."],
      costs: ["Monthly tax: ₹110 (₹10-15k income), ₹130 (₹15-25k), ₹150 (₹25-40k), ₹200 (>₹40k). Rates vary by state."],
      icon: FileText,
      colorScheme: "blue",
    },
  ];

  const incomeTaxFilingServices = [
    {
      title: "Income Tax Filing Services",
      description: "CA-guided filing for accuracy, including TDS and AIS review.",
      benefits: [
        "Timely filing to avoid penalties.",
        "ITR for loans/credit cards.",
        "CA-guided for accuracy.",
        "Plans for salaried, business, and investors.",
      ],
      documents: [
        "PAN, Aadhaar, bank statements.",
        "Form 16, Form 26AS, TDS certificates.",
        "Capital gains details.",
        "Books of accounts (for business).",
      ],
      process: ["Choose plan, upload documents. Our specialist reviews. We file your return. You receive ITR copy."],
      costs: ["Salary: from ₹699. Capital Gain: from ₹999. Small Business: from ₹1,699. Salaried + Business: from ₹2,599. Complex: from ₹4,999. (Indicative prices)."],
      icon: Calculator,
      colorScheme: "emerald",
    },
  ];

  const passportServices = [
    {
      title: "Passport Services (Online OTP-Based Application)",
      description: "Convenient Application, Flexible Scheduling, Multiple Service Options.",
      benefits: ["Online OTP-based application. Flexible interview scheduling. New, renewal, and lost passport services."],
      documents: [
        "New: Aadhaar (OTP-linked) + 1 other ID (Voter, PAN, etc.).",
        "Renewal: Old passport copy.",
        "Lost: Address/DOB proof, ID, FIR, old passport copy (if available), affidavit.",
      ],
      process: ["Apply online with OTP. Upload documents, select service, pay fees. Schedule and attend appointment with original documents. Passport issued after verification."],
      costs: ["New (36 pages): ₹2,100. New (60 pages): ₹2,650. Renewal: ₹2,200. Lost: ₹3,500."],
      icon: BookUser,
      colorScheme: "red",
    },
  ];

  const marriageRegistrationServices = [
    {
      title: "Marriage Registration Services",
      description: "Legal Recognition, Official Proof, Legal Security.",
      benefits: ["Official legal recognition of marriage. Valid proof for visas, banking, etc. Protects legal rights of spouses."],
      documents: [
        "Aadhaar, address proof, DOB proof for couple.",
        "Photos of couple.",
        "Invitation card (if available).",
        "2 witnesses with ID/address proof.",
      ],
      process: ["File application at registrar's office or online. Submit documents and photos. Officials verify identities. Certificate issued after signing."],
      costs: ["Starts at ₹3,000. Varies by state and fees."],
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
