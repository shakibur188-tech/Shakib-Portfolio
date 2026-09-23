'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OffersSection({ pricingData }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'onetime'

  const defaultPlans = [
    {
      id: 'plan-starter',
      name: 'Starter Tier',
      tagline: 'Essential Digital Foundation',
      monthlyPrice: '$850',
      oneTimePrice: '$1,800',
      isPopular: false,
      isBestValue: false,
      features: [
        'Single Brand Identity Design / Vector Logo',
        'High-Converting 5-Page Static Next.js Site',
        'Basic SEO & Meta Tags Configuration',
        'Mobile-Responsive & Fast TTFB (<0.5s)',
        'Standard Email Support (48h SLA)'
      ],
      ctaText: 'Start with Starter',
      ctaUrl: '/contact'
    },
    {
      id: 'plan-momentum',
      name: 'Momentum Package',
      tagline: 'High-Impact Brand & Web Launch',
      monthlyPrice: '$1,650',
      oneTimePrice: '$3,400',
      isPopular: true,
      isBestValue: true,
      features: [
        'Full 360° Corporate Brand System & Guidelines',
        'Custom High-Speed Next.js Web Portal (10+ Pages)',
        'CMS Integration & Automated Lead Capture Form',
        'On-Page SEO & AI Optimization (LLMS.txt)',
        'Monthly Social Media & Paid Meta Ads Strategy',
        'Dedicated Priority Slack Channel (12h SLA)'
      ],
      ctaText: 'Claim Momentum (Best Value)',
      ctaUrl: '/contact'
    },
    {
      id: 'plan-accelerate',
      name: 'Accelerate Suite',
      tagline: 'Omnichannel Growth & Performance',
      monthlyPrice: '$2,850',
      oneTimePrice: '$5,900',
      isPopular: false,
      isBestValue: false,
      features: [
        'Full Stack Digital Architecture & Headless Web Platform',
        'Google Ads Search + Performance Max Management',
        'Monthly 4K Commercial Shoot & Reels Post-Production',
        'Custom CRM & Dynamic Lead Routing Funnels',
        'Weekly Performance Reporting & ROAS Tracking',
        'Direct Strategic Consultation (Bi-weekly Calls)'
      ],
      ctaText: 'Scale with Accelerate',
      ctaUrl: '/contact'
    },
    {
      id: 'plan-founder',
      name: 'Founder Retainer',
      tagline: 'Fractional Strategic Leadership',
      monthlyPrice: '$4,500',
      oneTimePrice: '$9,200',
      isPopular: true,
      isBestValue: true,
      features: [
        'Fractional Creative Director & Strategic Digital Lead',
        'Full Authority Across Design, Web, Media & PR',
        'High-Impact Event Activation & 3D Expo Booth Oversight',
        'Tier-1 Press & Strategic Media Outreach Campaigns',
        'Continuous Next.js App Iteration & Speed Optimization',
        'Direct 24/7 VIP WhatsApp Line & Strategic Advisory'
      ],
      ctaText: 'Hire Fractional Lead (Best Value)',
      ctaUrl: '/contact'
    }
  ];

  const plans = pricingData?.plans || defaultPlans;

  return (
    <section id="offers" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
            <span>TRANSPARENT VALUE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1C2B1B] tracking-tight mb-4">
            Strategic Growth <span className="olive-gradient-text">Packages &amp; Retainers</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4D614A] leading-relaxed">
            Predictable investment models engineered for decisive founders and ambitious brands. Zero surprise invoices, single-point accountability.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-white border border-[#70805D]/25 mt-6 shadow-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#70805D] text-white shadow-xs'
                  : 'text-[#4D614A] hover:text-[#1C2B1B]'
              }`}
            >
              Monthly Retainer (Cancel Anytime)
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('onetime')}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                billingCycle === 'onetime'
                  ? 'bg-[#70805D] text-white shadow-xs'
                  : 'text-[#4D614A] hover:text-[#1C2B1B]'
              }`}
            >
              One-Time Project Build
            </button>
          </div>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isHighlighted = plan.isBestValue || plan.name.includes('Momentum') || plan.name.includes('Founder');
            const price = billingCycle === 'monthly' ? (plan.monthlyPrice || plan.price) : (plan.oneTimePrice || plan.price);
            const period = billingCycle === 'monthly' ? '/month' : ' one-time';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#F2F6EE] to-[#FFFFFF] border-2 border-[#70805D] shadow-xl shadow-[#70805D]/15 transform lg:-translate-y-2'
                    : 'bg-white border border-[#70805D]/20 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Best Value Badge for Momentum and Founder */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#70805D] text-white text-[10px] font-black uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm flex items-center gap-1">
                    <span>⭐</span>
                    <span>Best Value Choice</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-extrabold text-[#1C2B1B]">{plan.name}</h3>
                    {isHighlighted && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                  </div>

                  <p className="text-xs text-[#55738D] min-h-[32px] mb-4 font-medium">
                    {plan.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="py-4 border-y border-[#70805D]/15 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#2A3B27] tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs font-bold text-[#55738D]">{period}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#70805D]">
                      What's Included:
                    </div>
                    {plan.features?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#2A3B27] leading-relaxed">
                        <i className="fa-solid fa-circle-check text-[#70805D] text-xs mt-0.5 shrink-0"></i>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-[#70805D]/10">
                  <Link
                    href={plan.ctaUrl || '/contact'}
                    className={`w-full justify-center text-xs py-3 ${
                      isHighlighted
                        ? 'btn-aesthetic-primary'
                        : 'btn-outline-emerald'
                    }`}
                  >
                    <span>{plan.ctaText || 'Get Started'}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
