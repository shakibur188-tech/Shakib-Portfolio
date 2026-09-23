import React from 'react';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: '15 Production Web Platforms | Md. Shakibur Rahaman',
  description: 'Explore 15 live production web platforms engineered for luxury hospitality, headless e-commerce, corporate B2B, and SaaS ecosystems by Md. Shakibur Rahaman.',
};

export default function ProjectsPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />
      
      {/* Header Banner */}
      <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="section-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
          <span>15 PRODUCTION PLATFORMS DEPLOYED</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1C2B1B] tracking-tight mt-2 mb-4">
          Engineered Web <span className="olive-gradient-text">Platforms &amp; Portals</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4D614A] max-w-2xl mx-auto leading-relaxed">
          Production web applications engineered for luxury hospitality, headless e-commerce, corporate B2B, and SaaS ecosystems. Designed for sub-second speed.
        </p>
      </section>

      <ProjectsSection projects={content?.projects} />
      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
