'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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
];

const Partners = ({ className }: { className?: string }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
      containScroll: 'keepSnaps',
    },
    [
      Autoplay({ playOnInit: true, delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false }),
    ]
  );

  return (
    <section className={`py-16 ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Trusted Partners</h2>
            <p className="max-w-[900px] text-gray-600 text-base sm:text-lg">
              Working with top financial institutions to support your success.
            </p>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex-none pl-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                <div className="relative h-24 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={90}
                    objectFit="contain"
                    className="max-h-full max-w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;