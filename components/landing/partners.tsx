import React from 'react';
import Image from 'next/image';

const partnerLogos = [
  { src: '/axis.png', alt: 'Axis Mutual Fund' },
  { src: '/birla.jpeg', alt: 'Birla Mutual Fund' },
  { src: '/care.png', alt: 'Care Health Insurance' },
  { src: '/gic.jpeg', alt: 'GIC Housing Finance' },
  { src: '/hdfc.png', alt: 'HDFC Mutual Fund' },
  { src: '/icici.png', alt: 'ICICI Prudential Mutual Fund' },
  { src: '/kotak.png', alt: 'Kotak Mutual Fund' },
  { src: '/lic.png', alt: 'LIC' },
  { src: '/nippon.png', alt: 'Nippon India Mutual Fund' },
  { src: '/sbi.png', alt: 'SBI Mutual Fund' },
  { src: '/starhealth.png', alt: 'Star Health Insurance' },
  { src: '/tata.jpeg', alt: 'Tata Mutual Fund' },
  { src: '/uti.png', alt: 'UTI Mutual Fund' },
  // Add more logos as needed
];

const Partners = ({ className }: { className?: string }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Associate Partners</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Trusted collaborations with leading financial institutions.
            </p>
          </div>
        </div>
        <div className="relative w-full overflow-hidden py-8">
          <div className="flex animate-marquee whitespace-nowrap">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="mx-4 flex-shrink-0" style={{ maxWidth: '180px' }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={90}
                  objectFit="contain"
                  className="h-24 w-auto"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless looping */}
            {partnerLogos.map((logo, index) => (
              <div key={`duplicate-${index}`} className="mx-4 flex-shrink-0" style={{ maxWidth: '180px' }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={90}
                  objectFit="contain"
                  className="h-24 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;