'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const defaultProjects = [
    {
      id: 'proj-1',
      title: 'Hotel Sarina Dhaka - 5-Star Luxury Hospitality Platform',
      client: 'Hotel Sarina Dhaka',
      category: 'Hospitality & Booking',
      liveUrl: 'https://hotelsarinadhaka.com',
      previewImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      highlights: 'Direct hotel room & dining reservation engine, virtual 360 banquet tour, and automated banquet RFP inquiry funnel.',
      metrics: '+240% Direct Bookings',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-2',
      title: 'Renaissance Dhaka Gulshan - Marriott International Luxury Hotel',
      client: 'Marriott International',
      category: 'Hospitality & Booking',
      liveUrl: 'https://www.marriott.com',
      previewImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      highlights: 'Marriott Bonvoy brand compliance, high-resolution lifestyle photography showcase, and wedding banquet sales lead funnel.',
      metrics: 'Global Brand Compliant',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-3',
      title: 'ASAP Solutions - Enterprise Technology & B2B SaaS Ecosystem',
      client: 'ASAP Solutions Ltd',
      category: 'Corporate / B2B',
      liveUrl: 'https://asapsolutions.com.bd',
      previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      highlights: 'Multi-tier enterprise cloud services breakdown, dynamic case study matrix, and B2B corporate consultation portal.',
      metrics: '0.4s TTFB Edge Load',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-4',
      title: 'Global Pathway Education - International Student Admission Portal',
      client: 'Global Pathway Group',
      category: 'Education & Portals',
      liveUrl: 'https://globalpathway.example.com',
      previewImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      highlights: 'University course search database, intake assessment calculator, and automated student counselor lead matching.',
      metrics: '4,000+ Students Guided',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-5',
      title: 'Apex Recruitment Hub - Executive Search & B2B Staffing',
      client: 'Apex Manpower & Recruitment',
      category: 'Corporate / B2B',
      liveUrl: 'https://apex-recruitment.example.com',
      previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      highlights: 'B2B employer job requisition posting, candidate resume parser, and real-time interview coordination pipeline.',
      metrics: '65+ Corporate Clients',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-6',
      title: 'WanderLuxe Expeditions - Premium Travel & Tour Operator',
      client: 'WanderLuxe Travel Group',
      category: 'Hospitality & Booking',
      liveUrl: 'https://wanderluxe-travel.example.com',
      previewImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      highlights: 'Dynamic package itinerary builder, flight/visa inquiry engine, and multi-currency international payments.',
      metrics: '210+ Booked Trips',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-7',
      title: 'Aura Studio Fashion - D2C E-Commerce Flagship Store',
      client: 'Aura Luxury Apparel',
      category: 'E-Commerce',
      liveUrl: 'https://aura-fashion.example.com',
      previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      highlights: 'Modern headless e-commerce store with instant product filtering, dynamic cart recovery, and 1-click checkout.',
      metrics: '12.4x Peak ROAS',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-8',
      title: 'UrbanBite Gourmet - Artisanal Cloud Kitchen & Delivery',
      client: 'UrbanBite Food Labs',
      category: 'E-Commerce',
      liveUrl: 'https://urbanbite-delivery.example.com',
      previewImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      highlights: 'Real-time kitchen order dispatch, interactive dish customization, and live rider tracking.',
      metrics: '15-Min Fast Dispatch',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-9',
      title: 'NovaPulse SaaS - AI-Powered Social Analytics Dashboard',
      client: 'NovaPulse Technologies',
      category: 'Web Apps / SaaS',
      liveUrl: 'https://novapulse-saas.example.com',
      previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      highlights: 'Multi-platform social engagement analytics, automated performance reports, and AI caption recommendations.',
      metrics: '10k+ Monthly Events',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-10',
      title: 'Veritas Law Chambers - Corporate Legal Advisory Firm',
      client: 'Veritas Legal Group',
      category: 'Corporate / B2B',
      liveUrl: 'https://veritas-legal.example.com',
      previewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      highlights: 'Authoritative bilingual corporate presence, legal practice areas breakdown, and confidential consultation portal.',
      metrics: 'Top 3 Google Rank',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-11',
      title: 'Zenith Health Clinics - Telemedicine & Appointment Suite',
      client: 'Zenith Healthcare Network',
      category: 'Hospitality & Booking',
      liveUrl: 'https://zenith-health.example.com',
      previewImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      highlights: 'Doctor directory by specialty, instant video consultation booking, and electronic medical prescription viewer.',
      metrics: '99.9% Uptime',
      ctaText: 'Visit Live Website ↗'
    },
    {
      id: 'proj-12',
      title: 'Prism Creative Collective - Multimedia Production Agency',
      client: 'Prism Studio',
      category: 'Creative Portfolios',
      liveUrl: 'https://prism-studio.example.com',
      previewImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      highlights: 'Award-winning fluid motion animations, 4K commercial video reel player, and case study visual deep dives.',
      metrics: 'Awwwards Nominee',
      ctaText: 'Visit Live Website ↗'
    }
  ];

  const projectList = projects && projects.length > 0 ? projects : defaultProjects;

  const categories = ['All', 'Hospitality & Booking', 'Corporate / B2B', 'E-Commerce', 'Web Apps / SaaS', 'Creative Portfolios'];

  const filteredProjects = activeCategory === 'All'
    ? projectList
    : projectList.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase() || p.category?.includes(activeCategory));

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
              <span>15 PRODUCTION PLATFORMS DEPLOYED</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1C2B1B] tracking-tight">
              Engineered Web <span className="olive-gradient-text">Platforms</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4D614A] mt-3 leading-relaxed">
              Production web applications engineered for luxury hospitality, headless e-commerce, corporate B2B, and SaaS ecosystems. Designed for sub-second speed.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-[#70805D]/20 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#70805D] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Browser Header Bar */}
              <div>
                <div className="bg-[#F1F3ED] px-4 py-2.5 border-b border-[#70805D]/15 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                  </div>
                  <div className="text-[10px] text-[#55738D] font-mono bg-white px-2 py-0.5 rounded flex-1 truncate text-center">
                    {proj.liveUrl || 'https://shakibur.info'}
                  </div>
                </div>

                {/* Preview Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                  <img
                    src={proj.previewImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-black bg-white/90 backdrop-blur-md text-[#2A3B27] px-2.5 py-1 rounded-full border border-[#70805D]/20">
                    {proj.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="text-xs font-bold text-[#70805D] uppercase tracking-wider mb-1">
                    {proj.client}
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1C2B1B] mb-2 leading-snug group-hover:text-[#70805D] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#4D614A] leading-relaxed mb-4">
                    {proj.highlights}
                  </p>
                </div>
              </div>

              {/* Bottom Metrics & Live Button */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#70805D]/10 mt-2">
                <span className="text-xs font-black text-[#2A3B27] bg-[#70805D]/10 px-2.5 py-1 rounded-lg">
                  {proj.metrics}
                </span>
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-[#70805D] hover:text-[#2A3B27] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                >
                  <span>Visit Portal</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
