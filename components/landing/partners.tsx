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
];

const Partners = ({ className }: { className?: string }) => {
    return (
        <section className={`py-16 ${className}`}>
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Trusted Partners</h2>
                        <p className="max-w-[900px] text-gray-600 text-base sm:text-lg">
                            Working with top financial institutions to support your success.
                        </p>
                    </div>
                </div>
                <div
                    className="w-full inline-flex flex-nowrap overflow-hidden 
                    [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
                >
                    <ul 
                        className="flex items-center justify-center md:justify-start [&_li]:mx-8 
                        [&_img]:max-w-none animate-infinite-scroll"
                    >
                        {partnerLogos.map((logo, index) => (
                            <li key={index}>
                                <Image src={logo.src} alt={logo.alt} width={180} height={90} />
                            </li>
                        ))}
                    </ul>
                    <ul 
                        className="flex items-center justify-center md:justify-start [&_li]:mx-8 
                        [&_img]:max-w-none animate-infinite-scroll" 
                        aria-hidden="true"
                    >
                        {partnerLogos.map((logo, index) => (
                            <li key={index}>
                                <Image src={logo.src} alt={logo.alt} width={180} height={90} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Partners;