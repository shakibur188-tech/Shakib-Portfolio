'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CaseStudyView({ caseStudyData }) {
  const caseStudies = [
    {
      id: "cs-1",
      brandName: "fae",
      heroSubtitle: "Online Rental App & Product Ecosystem",
      heroTitle: "UX CASE STUDY",
      heroTagline: "Fae Rental is a unified digital platform where customers can rent high-end furniture, appliances & electronics at accessible price tiers.",
      topCategory: "UX CASE STUDY & PRODUCT DESIGN",
      author: "DESIGN BY MD. SHAKIBUR RAHAMAN",
      date: "MARCH 2026",
      problem: "We discovered that relocators, paying guests, and corporate working professionals urgently require high-end furniture, electronics, and appliances. Due to high upfront costs and residential mobility, buying is impractical. This platform enables frictionless short-term and long-term renting (weekly, monthly, annual) including certified refurbished items.",
      solutions: [
        "Introducing a renting platform for premium furniture, appliances & electronics.",
        "Custom flexible tenure selector (Weekly, Monthly, Annual subscription models).",
        "Free relocation & transfer service for rented assets via the mobile app.",
        "1-Click swap program for hardware & appliance upgrades.",
        "Zero hidden delivery fees with guaranteed 24-hour white-glove setup.",
        "Automated scheduled cleanup, preventative maintenance & warranty coverage."
      ],
      roles: {
        col1: ["User Interviews", "Field Research", "Competitor Matrix"],
        col2: ["Affinity Mapping", "User Personas", "Empathy & Journey Maps"],
        col3: ["Card Sorting", "User Flows", "Information Architecture"],
        col4: ["Low-Fidelity Wireframes", "High-Fidelity Prototypes", "Usability Testing"]
      },
      duration: { weeks: "14", interviews: "48", screens: "120+", testScore: "96%" },
      processStages: [
        { name: "Research", icon: "fa-magnifying-glass", color: "#E07A5F", items: ["Competitive Benchmarking", "1-on-1 User Inquiries", "Behavioral Surveys"] },
        { name: "Define", icon: "fa-user", color: "#55738D", items: ["Empathy Mapping", "Target Personas", "User Journey Flow"] },
        { name: "Ideate", icon: "fa-lightbulb", color: "#70805D", items: ["Information Architecture", "Card Sorting", "Low-Fidelity Wireframes"] },
        { name: "Design", icon: "fa-compass-drafting", color: "#2A3B27", items: ["Design Tokens System", "Interactive Prototype", "Micro-Interactions"] },
        { name: "Test", icon: "fa-mobile-screen-button", color: "#E07A5F", items: ["Usability Benchmarking", "Task Completion QA", "Production Handover"] }
      ]
    },
    {
      id: "cs-2",
      brandName: "SR",
      heroSubtitle: "5-Star Luxury Hospitality & Direct Booking Architecture",
      heroTitle: "HOTEL SARINA DHAKA",
      heroTagline: "Architected a luxury direct reservation engine, virtual 360 banquet showcase, and omnichannel brand refresh.",
      topCategory: "LUXURY HOSPITALITY & REVENUE ENGINE",
      author: "DIRECTED BY MD. SHAKIBUR RAHAMAN",
      date: "2024 - 2026",
      problem: "Heavy reliance on third-party OTAs resulted in massive commission overhead (up to 22%), fragmented guest branding, and low direct wedding banquet inquiries.",
      solutions: [
        "Built a sub-second headless direct room reservation portal with instantaneous payment gateway.",
        "Interactive 360° virtual tour for 5 banquet halls reducing physical site visit cycle.",
        "Omnichannel Meta & Google Performance Max campaign generating qualified wedding inquiries.",
        "Automated CRM lead routing directly to the hotel sales department within 60 seconds."
      ],
      roles: {
        col1: ["Creative Direction", "Brand Architecture", "Stakeholder Alignment"],
        col2: ["UX Journey Mapping", "Banquet Funnel Design", "Figma Design System"],
        col3: ["Next.js Architecture", "Payment API Integration", "Speed Optimization"],
        col4: ["Paid Meta Ads", "Google Ads ROAS", "Conversion Analytics"]
      },
      duration: { weeks: "18", interviews: "120+", screens: "85+", testScore: "+240%" },
      processStages: [
        { name: "Discovery", icon: "fa-magnifying-glass", color: "#70805D", items: ["Guest Persona Analysis", "OTA Commission Audit", "Competitor Review"] },
        { name: "Strategy", icon: "fa-compass-drafting", color: "#55738D", items: ["Direct Booking Engine", "Banquet RFP Funnel", "Speed Benchmarks"] },
        { name: "Execution", icon: "fa-code", color: "#2A3B27", items: ["Next.js Web Portal", "SSL & Gateway Integration", "High-Res Photography"] },
        { name: "Scaling", icon: "fa-chart-line", color: "#E07A5F", items: ["Performance Max Ads", "Meta Advantage+", "Email Retargeting"] },
        { name: "Impact", icon: "fa-trophy", color: "#70805D", items: ["+240% Direct Revenue", "0.4s TTFB Load", "Top Luxury Rank"] }
      ]
    }
  ];

  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  const current = caseStudies[activeStudyIndex];

  // Instant 1-Click PDF Download Handler
  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="py-8 sm:py-12">
      {/* Case Study Selector Bar & Instant PDF Download Action */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#70805D]/20 shadow-xs">
          
          {/* Study Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#70805D] flex items-center gap-1.5 shrink-0 mr-2">
              <i className="fa-solid fa-layer-group"></i>
              <span>Select Case Study:</span>
            </span>
            {caseStudies.map((cs, idx) => (
              <button
                key={cs.id}
                type="button"
                onClick={() => setActiveStudyIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeStudyIndex === idx
                    ? 'bg-[#70805D] text-white shadow-xs'
                    : 'bg-[#F8F9F6] text-[#4D614A] hover:bg-[#70805D]/10'
                }`}
              >
                {cs.brandName.toUpperCase()} — {cs.heroSubtitle}
              </button>
            ))}
          </div>

          {/* Instant PDF Download Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="btn-aesthetic-primary text-xs py-2 px-4 shadow-sm flex items-center gap-2 shrink-0 ml-auto"
            title="Download Instant PDF Version"
          >
            <i className="fa-solid fa-file-pdf text-sm"></i>
            <span>⬇️ Download PDF</span>
          </button>

        </div>
      </div>

      {/* Main Case Study Printable Container */}
      <main id="caseStudyPrintableArea" className="max-w-4xl mx-auto px-4 sm:px-8 py-6 bg-white border border-[#70805D]/15 rounded-3xl shadow-sm">
        
        {/* Top Metadata Header */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#55738D] pb-6 border-b border-[#70805D]/15">
          <span className="text-[#70805D] font-extrabold">{current.topCategory}</span>
          <span className="hidden sm:inline text-[#2A3B27]">{current.author}</span>
          <span>{current.date}</span>
        </div>

        {/* Hero Monogram & Title */}
        <div className="text-center pt-8 pb-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#70805D] to-[#2A3B27] flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-lg border-2 border-white">
              {current.brandName}
            </div>
          </div>

          <h3 className="text-lg sm:text-2xl font-bold text-[#1C2B1B] mb-2 tracking-tight">
            {current.heroSubtitle}
          </h3>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C2B1B] tracking-tight uppercase mb-4 leading-tight">
            {current.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-[#4D614A] max-w-2xl mx-auto leading-relaxed font-medium">
            {current.heroTagline}
          </p>
        </div>

        {/* Problem Statement */}
        <section className="mb-12">
          <div className="border-b-2 border-[#E07A5F] pb-2 mb-4 inline-block">
            <h2 className="text-2xl font-extrabold text-[#1C2B1B]">Problem Statement</h2>
          </div>
          <p className="text-sm text-[#3A4E37] leading-relaxed">
            {current.problem}
          </p>
        </section>

        {/* The Solution */}
        <section className="mb-12">
          <div className="border-b-2 border-[#70805D] pb-2 mb-4 inline-block">
            <h2 className="text-2xl font-extrabold text-[#1C2B1B]">The Solution</h2>
          </div>
          <div className="space-y-2.5">
            {current.solutions.map((sol, sIdx) => (
              <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2A3B27]">
                <span className="text-[#E07A5F] font-bold text-base leading-none mt-0.5">•</span>
                <span>{sol}</span>
              </div>
            ))}
          </div>
        </section>

        {/* My Role (4-Column Layout) */}
        <section className="mb-12">
          <div className="border-b-2 border-[#55738D] pb-2 mb-4 inline-block">
            <h2 className="text-2xl font-extrabold text-[#1C2B1B]">My Role &amp; Methodology</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <ul className="space-y-1.5 text-xs text-[#334432]">
                {current.roles.col1.map((r, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-1.5 text-xs text-[#334432]">
                {current.roles.col2.map((r, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55738D]"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-1.5 text-xs text-[#334432]">
                {current.roles.col3.map((r, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#70805D]"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-1.5 text-xs text-[#334432]">
                {current.roles.col4.map((r, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A3B27]"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Duration & Delivery Scope */}
        <section className="mb-12 p-6 rounded-2xl bg-[#F8F9F6] border border-[#70805D]/20">
          <h2 className="text-lg font-extrabold text-[#1C2B1B] mb-4">
            Project Metrics &amp; Scope
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded-xl border border-[#70805D]/15">
              <div className="text-2xl font-black text-[#1C2B1B]">{current.duration.weeks}</div>
              <div className="text-[10px] font-bold text-[#55738D] uppercase mt-0.5">Weeks Duration</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#70805D]/15">
              <div className="text-2xl font-black text-[#1C2B1B]">{current.duration.interviews}</div>
              <div className="text-[10px] font-bold text-[#55738D] uppercase mt-0.5">Interviews / Samples</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#70805D]/15">
              <div className="text-2xl font-black text-[#1C2B1B]">{current.duration.screens}</div>
              <div className="text-[10px] font-bold text-[#55738D] uppercase mt-0.5">UI Screens Built</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#70805D]/15">
              <div className="text-2xl font-black text-[#70805D]">{current.duration.testScore}</div>
              <div className="text-[10px] font-bold text-[#55738D] uppercase mt-0.5">Performance Score</div>
            </div>
          </div>
        </section>

        {/* 5-Stage UX Process Breakdown */}
        <section className="mb-6">
          <div className="border-b-2 border-[#70805D] pb-2 mb-6 inline-block">
            <h2 className="text-2xl font-extrabold text-[#1C2B1B]">5-Stage Execution Process</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {current.processStages.map((stg, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F8F9F6] border border-[#70805D]/15 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-xs font-black shadow-xs mb-3 text-[#70805D]">
                    <i className={`fa-solid ${stg.icon}`}></i>
                  </div>
                  <div className="text-xs font-extrabold text-[#1C2B1B] mb-2">{stg.name}</div>
                  <ul className="space-y-1 text-[11px] text-[#4D614A]">
                    {stg.items.map((it, i) => (
                      <li key={i}>• {it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
