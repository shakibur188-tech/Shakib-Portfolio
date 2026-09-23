import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OffersSection from '@/components/OffersSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import CaseStudyView from '@/components/CaseStudyView';
import ContactForm from '@/components/ContactForm';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/lib/content';

export default function HomePage() {
  const content = getSiteContent();

  const profile = content?.profile;
  const typewriterList = content?.typewriter;
  const stats = content?.stats;
  const pricingData = content?.pricing;
  const services = content?.services;
  const projects = content?.projects;

  return (
    <main className="min-h-screen">
      <Navbar profile={profile} headerMenu={content?.menu} />
      <Hero profile={profile} typewriterList={typewriterList} stats={stats} />
      <OffersSection pricingData={pricingData} />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      
      {/* Featured Case Study Section */}
      <section id="case-studies" className="py-16 md:py-24 bg-[#F8F9F6] border-t border-[#70805D]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
              <span>IN-DEPTH UX BREAKDOWN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1C2B1B] tracking-tight">
              Featured UX <span className="olive-gradient-text">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4D614A] mt-2">
              Deep-dive product breakdowns with verifiable commercial lifts. Click below to view or export PDF.
            </p>
          </div>

          <CaseStudyView />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      <Footer profile={profile} />
      <WhatsAppWidget />
    </main>
  );
}
