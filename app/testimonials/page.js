import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import Link from 'next/link';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'Client Endorsements & Testimonials | Md. Shakibur Rahaman',
  description: 'Verified executive endorsements and client feedback for Md. Shakibur Rahaman across luxury hospitality, corporate B2B, and digital architecture.',
};

export default function TestimonialsPage() {
  const content = getSiteContent();

  const testimonials = [
    {
      name: 'Tanvir Hossain',
      role: 'Managing Director, ASAP Solutions',
      quote: 'Shakibur took complete ownership of our corporate repositioning and web portal architecture. His authority across both design systems and high-performance engineering eliminated months of fragmented vendor friction.',
      stars: 5
    },
    {
      name: 'Rahim Al-Mamun',
      role: 'Director of Sales & Marketing, Premier Hospitality',
      quote: 'Under Shakibur’s strategic direction, our direct banquet inquiries surged by +240%. His commercial videography and Meta Advantage+ campaigns delivered an immediate, measurable revenue lift.',
      stars: 5
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Product, SaaS Global',
      quote: 'The UX case study breakdown and product onboarding overhaul executed by Shakibur reduced our user time-to-first-value from 12 minutes to 90 seconds. Exceptional strategic vision.',
      stars: 5
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />
      
      {/* Header Banner */}
      <section className="pt-12 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="section-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
          <span>VERIFIED COMMERCIAL LIFT</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1C2B1B] tracking-tight mt-2 mb-4">
          Client <span className="olive-gradient-text">Endorsements</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4D614A] max-w-2xl mx-auto leading-relaxed">
          Verifiable results delivered for luxury hospitality, corporate enterprise, and digital scale-ups.
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-[#70805D]/20 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#EAB308] text-sm mb-4">
                  {[...Array(t.stars)].map((_, s) => (
                    <i key={s} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#4D614A] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-[#70805D]/15">
                <div className="text-sm font-extrabold text-[#1C2B1B]">{t.name}</div>
                <div className="text-xs text-[#55738D] font-medium">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/contact" className="btn-aesthetic-primary text-xs">
            <span>Discuss Your Project Scope</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      </section>

      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
