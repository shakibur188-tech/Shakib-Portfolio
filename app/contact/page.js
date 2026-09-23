import React from 'react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'Contact Md. Shakibur Rahaman | Strategic Discovery & Project Scope',
  description: 'Initiate a direct strategic discovery session with Md. Shakibur Rahaman for brand systems, web platforms, and commercial media.',
};

export default function ContactPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />
      
      {/* Header Banner */}
      <section className="pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="section-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
          <span>DIRECT COLLABORATION</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1C2B1B] tracking-tight mt-2 mb-4">
          Initiate Strategic <span className="olive-gradient-text">Discovery</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4D614A] max-w-2xl mx-auto leading-relaxed">
          Direct engagement with single-point executive accountability. Fill in your project scope below or message directly on WhatsApp.
        </p>
      </section>

      {/* Main Contact Container */}
      <section className="pb-24 max-w-4xl mx-auto px-4 sm:px-6">
        <ContactForm />
      </section>

      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
