import React from 'react';
import Navbar from '@/components/Navbar';
import CaseStudyView from '@/components/CaseStudyView';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'UX Case Studies & Product Design Architecture | Md. Shakibur Rahaman',
  description: 'In-depth UX Case Study breakdown covering user research, problem framing, strategic solutions, project duration, and the 5-stage design process by Md. Shakibur Rahaman.',
};

export default function CaseStudiesPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />
      
      {/* Header Banner */}
      <section className="pt-12 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="section-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
          <span>MEASURED IMPACT &amp; RESEARCH</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1C2B1B] tracking-tight mt-2 mb-4">
          UX Case Studies &amp; <span className="olive-gradient-text">Product Breakdown</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4D614A] max-w-2xl mx-auto leading-relaxed">
          Comprehensive product architecture breakdowns. Switch between studies and export instant PDF versions.
        </p>
      </section>

      <CaseStudyView />
      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
