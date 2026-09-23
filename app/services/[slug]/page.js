import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content';

const SERVICE_DETAILS = {
  'graphics-design': {
    title: 'Graphics Design & Visual Identity Architecture',
    tagline: 'Brand systems, luxury vector packaging & UI/UX design kits.',
    icon: 'fa-bezier-curve',
    overview: 'We architect distinct, authoritative brand identities designed to outlive ephemeral trends. From master typography and color theory to luxury vector packaging and investor pitch decks.',
    deliverables: [
      'Master Vector Logo Suite (AI, SVG, PDF, PNG)',
      'Comprehensive Brand Guidelines Book (Color, Typography, Spatial Rules)',
      'Luxury Product Packaging & 3D Box Renders',
      'High-Converting UI/UX Design System in Figma',
      'Corporate Stationery & Executive Pitch Decks'
    ],
    phases: [
      { num: '01', title: 'Brand Discovery & Archetype Audit', desc: 'Analyzing competitive whitespace and establishing the core visual archetype.' },
      { num: '02', title: 'Vector Geometry & Concept Sprints', desc: 'Developing distinct logo concepts with harmonic golden ratio proportions.' },
      { num: '03', title: 'Design System & Typography Hierarchy', desc: 'Creating scalable UI design tokens, color palette contrast ratios, and iconography.' },
      { num: '04', title: 'Collateral Production & IP Handover', desc: 'Delivering full print-ready files, vector source assets, and usage guidelines.' }
    ]
  },
  'web-development': {
    title: 'Web Design & Next.js Platform Engineering',
    tagline: 'High-speed headless web portals, Next.js architecture & sub-second loading.',
    icon: 'fa-code',
    overview: 'Engineering enterprise-grade, ultra-fast web platforms using Next.js (App Router), React, and Tailwind CSS. Built for 99.9% uptime, zero-layout-shift (CLS = 0), and instant conversion lift.',
    deliverables: [
      'Next.js 14/15 App Router Architecture with SSR / SSG',
      'Pixel-Perfect Responsive UI mapped 100% from Figma',
      'Headless CMS Integration with REST & GraphQL',
      'Edge CDN Caching & Sub-Second TTFB (<0.4s)',
      'Structured SEO & LLM Context Engine (llms.txt)'
    ],
    phases: [
      { num: '01', title: 'Information Architecture & Wireframing', desc: 'Mapping user conversion funnels, screen states, and technical stack requirements.' },
      { num: '02', title: 'Component-Driven UI Engineering', desc: 'Translating Figma designs into accessible, modular React/Next.js components.' },
      { num: '03', title: 'API Integration & Dynamic Hydration', desc: 'Connecting databases, payment gateways, and backend endpoints.' },
      { num: '04', title: 'Core Web Vitals & Production Deployment', desc: 'Auditing Google PageSpeed 95+ and deploying to global edge network.' }
    ]
  },
  'social-media-marketing': {
    title: 'Social Media Strategy & Paid Media Buying',
    tagline: 'Paid ads, Meta Advantage+ funnels & high-retention video reels.',
    icon: 'fa-hashtag',
    overview: 'Building high-converting organic and paid social acquisition engines. We plan editorial calendars, direct cinematic short-form video reels, and manage Meta Advantage+ budgets.',
    deliverables: [
      'Monthly Editorial Social Media Calendars (Reels, Carousels, Stories)',
      'Meta Advantage+ Paid Ad Campaign Management',
      'Commercial Short-Form Video Direction & Color Grading',
      'Audience Segmentation & Dynamic Retargeting Funnels',
      'Weekly ROAS & Customer Acquisition Cost (CAC) Reports'
    ],
    phases: [
      { num: '01', title: 'Audience Persona & Content Strategy', desc: 'Defining high-converting content pillars and competitor benchmark data.' },
      { num: '02', title: 'Creative Production & Video Sprints', desc: 'Scripting, directing, and editing high-engagement Reels and TikToks.' },
      { num: '03', title: 'Paid Ad Campaign Launch & Split Testing', desc: 'Deploying Meta ads with varied copy angles and audience lookalikes.' },
      { num: '04', title: 'Scaling & ROAS Optimization', desc: 'Scaling top-performing ad sets while maintaining low customer acquisition costs.' }
    ]
  },
  'public-relations': {
    title: 'Public Relations & Strategic Media Outreach',
    tagline: 'Tier-1 press, authority editorial & executive brand narratives.',
    icon: 'fa-newspaper',
    overview: 'Securing authority placement across national newspapers, online business portals, and broadcast media. We position executives and brands as undisputed industry thought leaders.',
    deliverables: [
      'National & International Press Release Writing & Syndication',
      'Executive Thought Leadership Articles & Op-Eds',
      'Media Interview Placements & Broadcast Press Briefings',
      'Crisis Communication Management & Media Advisory',
      'Industry Award Submissions & Recognition Packages'
    ],
    phases: [
      { num: '01', title: 'Strategic Narrative Development', desc: 'Crafting unique news hooks that appeal to top journalists and editors.' },
      { num: '02', title: 'Press Material & Media Kit Drafting', desc: 'Writing punchy, AP-style press releases and executive profile dossiers.' },
      { num: '03', title: 'Media Outreach & Journalist Pitching', desc: 'Direct outreach to senior editors and industry publication desks.' },
      { num: '04', title: 'Clippings Report & Syndication Lift', desc: 'Compiling verified press clippings and leveraging coverage for brand trust.' }
    ]
  },
  'google-ads': {
    title: 'Google Ads & Intent-Driven Search Scaling',
    tagline: 'High-intent search, Performance Max & commercial conversion funnels.',
    icon: 'fa-chart-line',
    overview: 'Capturing active market intent when prospective clients are actively searching to buy. We sculpt negative keywords, run high-converting Performance Max ads, and relentlessly maximize ROAS.',
    deliverables: [
      'Google Search Campaign Setup & Keyword Hierarchy',
      'Performance Max Multi-Channel Asset Group Creation',
      'High-Converting Landing Page Optimization Recommendations',
      'Negative Keyword Sculpting & Click-Fraud Protection',
      'Google Tag Manager & Enhanced Conversion Tracking'
    ],
    phases: [
      { num: '01', title: 'Commercial Intent Keyword Research', desc: 'Identifying high-CPC buyer intent terms with low wasted spend.' },
      { num: '02', title: 'Ad Copywriting & Asset Creation', desc: 'Writing compelling ad copy and creating high-resolution responsive assets.' },
      { num: '03', title: 'Bid Strategy & Budget Allocation', desc: 'Configuring Target CPA / Target ROAS bidding algorithms.' },
      { num: '04', title: 'Search Term Auditing & Waste Reduction', desc: 'Constantly eliminating non-converting search queries to maximize return.' }
    ]
  },
  'event-activation': {
    title: 'Event Activation & 3D Exhibition Design',
    tagline: '3D exhibition booths, corporate symposiums & experiential spatial builds.',
    icon: 'fa-cubes',
    overview: 'Transforming physical spaces into memorable brand activations. From 3D pavilion design and interactive video walls to on-site fabrication oversight for corporate summits.',
    deliverables: [
      '3D Booth Architectural Design & Spatial Zone Renders',
      'Turnkey Fabrication Supervision & Contractor Oversight',
      'Corporate Symposium & Gala Dinner Stage Production',
      'Interactive Multi-Screen Video Walls & Lighting Design',
      'On-Site Experiential Brand Activation & Lead Funnels'
    ],
    phases: [
      { num: '01', title: 'Spatial Concept & Floorplan Strategy', desc: 'Planning visitor flow, demo zones, and VIP lounge spatial layout.' },
      { num: '02', title: '3D Photorealistic Architectural Rendering', desc: 'Modeling the complete booth with exact material textures and lighting.' },
      { num: '03', title: 'Fabrication Oversight & Vendor Management', desc: 'Managing carpenters, AV engineers, and venue authorities.' },
      { num: '04', title: 'Live Event Execution & Handover', desc: 'Ensuring flawless on-site AV performance and attendee engagement.' }
    ]
  }
};

export async function generateMetadata({ params }) {
  const svc = SERVICE_DETAILS[params.slug];
  if (!svc) return {};
  return {
    title: `${svc.title} | Md. Shakibur Rahaman`,
    description: svc.overview,
  };
}

export function generateStaticParams() {
  return Object.keys(SERVICE_DETAILS).map((slug) => ({ slug }));
}

export default function ServiceDetailPage({ params }) {
  const svc = SERVICE_DETAILS[params.slug];
  if (!svc) notFound();

  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />

      {/* Hero Header */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs font-bold text-[#55738D] hover:text-[#2A3B27] mb-6">
            <i className="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to All Services</span>
          </Link>
          <div className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
            <span>STRATEGIC DISCIPLINE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1C2B1B] tracking-tight mt-2 mb-4 leading-tight">
            {svc.title}
          </h1>
          <p className="text-base sm:text-lg text-[#70805D] font-bold mb-6">
            {svc.tagline}
          </p>
          <p className="text-sm sm:text-base text-[#4D614A] leading-relaxed max-w-3xl">
            {svc.overview}
          </p>
        </div>
      </section>

      {/* Deliverables & Methodology Grid */}
      <section className="py-16 bg-[#F1F3ED]/60 border-y border-[#70805D]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Deliverables */}
            <div className="bg-white p-8 rounded-3xl border border-[#70805D]/20 shadow-sm">
              <h3 className="text-xl font-extrabold text-[#1C2B1B] mb-6 flex items-center gap-2.5">
                <i className="fa-solid fa-box-open text-[#70805D]"></i>
                <span>Core Tangible Deliverables</span>
              </h3>
              <div className="space-y-4">
                {svc.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15 text-xs sm:text-sm text-[#2A3B27]">
                    <i className="fa-solid fa-circle-check text-[#70805D] text-sm mt-0.5 shrink-0"></i>
                    <span className="font-semibold">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Stage Execution Methodology */}
            <div className="bg-white p-8 rounded-3xl border border-[#70805D]/20 shadow-sm">
              <h3 className="text-xl font-extrabold text-[#1C2B1B] mb-6 flex items-center gap-2.5">
                <i className="fa-solid fa-road text-[#55738D]"></i>
                <span>4-Stage Execution Methodology</span>
              </h3>
              <div className="space-y-4">
                {svc.phases.map((ph) => (
                  <div key={ph.num} className="p-4 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-white bg-[#70805D] px-2 py-0.5 rounded">
                        PHASE {ph.num}
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-[#1C2B1B]">{ph.title}</h4>
                    </div>
                    <p className="text-xs text-[#4D614A] leading-relaxed pl-1 pt-1">{ph.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Brief Submission */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <ContactForm />
      </section>

      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
