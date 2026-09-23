import React from 'react';
import Navbar from '@/components/Navbar';
import OffersSection from '@/components/OffersSection';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ContactForm from '@/components/ContactForm';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'Strategic Growth Offers & SaaS Retainers | Md. Shakibur Rahaman',
  description: 'Predictable investment packages engineered for ambitious founders: Starter, Momentum (Best Value), Accelerate, and Founder Retainer (Best Value).',
};

export default function OffersPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />
      
      {/* Header Banner */}
      <section className="pt-12 pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="section-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
          <span>TRANSPARENT VALUE ARCHITECTURE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1C2B1B] tracking-tight mt-2 mb-4">
          Investment <span className="olive-gradient-text">Packages &amp; Retainers</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4D614A] max-w-2xl mx-auto leading-relaxed">
          Predictable investment models engineered for decisive founders and ambitious brands. Zero surprise invoices, single-point accountability.
        </p>
      </section>

      <OffersSection pricingData={content?.pricing} />

      {/* Scope Submission Form */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <ContactForm />
      </section>

      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
