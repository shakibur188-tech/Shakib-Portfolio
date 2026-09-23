import React from 'react';
import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'Strategic Services & Capabilities | Md. Shakibur Rahaman',
  description: 'Explore 6 integrated strategic services: Graphics Design, Web Development, Social Media, PR, Google Ads, and Event Activation directed by Md. Shakibur Rahaman.',
};

export default function ServicesPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />
      
      {/* Header Banner */}
      <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="section-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
          <span>FULL-SERVICE AGENCY PRACTICE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1C2B1B] tracking-tight mt-2 mb-4">
          Integrated Creative &amp; <span className="olive-gradient-text">Engineering Services</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4D614A] max-w-2xl mx-auto leading-relaxed">
          From brand systems and high-converting Next.js web applications to broadcast media buying and 3D event activations.
        </p>
      </section>

      <ServicesSection services={content?.services} />
      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
