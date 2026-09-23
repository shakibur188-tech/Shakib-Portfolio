'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero({ profile, typewriterList, stats }) {
  const words = typewriterList && typewriterList.length > 0 ? typewriterList : [
    'Graphics & Visual Identity',
    'Web design & Development',
    'Social Media marketing',
    'Public relation & Media outreach',
    'Google ads & Intent Scaling',
    'Event activation & Exhibition'
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = words[currentWordIndex];
    let timer;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="section-tag">
              <span className="w-2 h-2 rounded-full bg-[#70805D] animate-pulse"></span>
              <span>HELLO, I'M</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#1C2B1B] tracking-tight leading-[1.06]">
              Md. Shakibur <br />
              <span className="mist-gradient-text">Rahaman</span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#2A3B27] leading-snug">
              Building <span className="olive-gradient-text">Digital Experiences</span> &amp; Brand Systems
            </div>

            {/* Dynamic Rotating Typewriter Subtitle */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4D614A] font-semibold min-h-[24px]">
              <span className="text-[#70805D] font-bold">&gt;</span>
              <span className="text-[#1C2B1B] font-bold">{currentText}</span>
              <span className="inline-block w-2 h-4 bg-[#70805D] animate-pulse"></span>
            </div>

            <p className="text-sm sm:text-base text-[#4D614A] max-w-xl leading-relaxed">
              {profile?.bio || 'Strategic Lead & Full-Stack Digital Architect with the authority and vision to make decisive calls, architect high-converting branding systems, engineer modern web platforms, and drive commercial growth.'}
            </p>

            {/* Key Strategic Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-start gap-2 text-xs sm:text-[13px] text-[#1C2B1B]">
                <i className="fa-solid fa-circle-check text-[#70805D] mt-0.5 text-xs shrink-0"></i>
                <span>Single point of accountability across design, code &amp; media</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-[13px] text-[#1C2B1B]">
                <i className="fa-solid fa-circle-check text-[#70805D] mt-0.5 text-xs shrink-0"></i>
                <span>15+ deployed production web platforms live globally</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-[13px] text-[#1C2B1B]">
                <i className="fa-solid fa-circle-check text-[#70805D] mt-0.5 text-xs shrink-0"></i>
                <span>3.5x average perceived lift in brand equity &amp; valuation</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-[13px] text-[#1C2B1B]">
                <i className="fa-solid fa-circle-check text-[#70805D] mt-0.5 text-xs shrink-0"></i>
                <span>95+ Google PageSpeed &amp; sub-second TTFB loading</span>
              </div>
            </div>

            {/* Hero Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link href="/services" className="btn-aesthetic-primary">
                <span>Explore All 6 Services</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="/projects" className="btn-pill-glass">
                <span>View Projects</span>
                <i className="fa-solid fa-code text-xs text-[#70805D]"></i>
              </Link>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 pt-3 text-[#55738D] text-lg">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A3B27] transition-colors" title="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/shakiburrahman222" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A3B27] transition-colors" title="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
              <a href="https://wa.me/8801838070468" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A3B27] transition-colors" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="mailto:shakibur188@gmail.com" className="hover:text-[#2A3B27] transition-colors" title="Email"><i className="fa-solid fa-envelope"></i></a>
            </div>
          </div>

          {/* Right Hero Column: Portrait with Glowing Olive Aura & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="hero-portrait-container relative w-full max-w-md">
              
              {/* Glowing Olive Halo Behind Portrait */}
              <div className="hero-olive-aura"></div>
              <div className="hero-orbit-ring"></div>

              {/* Portrait Cutout Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden border border-[#70805D]/25 bg-white shadow-2xl shadow-[#2A3B27]/15">
                <img
                  src="/assets/shakibur.jpg"
                  alt="Md. Shakibur Rahaman"
                  className="w-full h-[420px] sm:h-[460px] object-cover object-top filter contrast-105"
                  onError={(e) => { e.currentTarget.src = '/assets/avatar-placeholder.png'; }}
                />
              </div>

              {/* Floating Badge Top-Right: Available for Projects */}
              <div className="floating-badge absolute -top-4 -right-3 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <div>
                  <div className="text-[10px] text-[#55738D] uppercase font-bold">Status</div>
                  <div className="text-xs font-extrabold text-[#2A3B27]">Available for Projects</div>
                </div>
              </div>

              {/* Floating Badge Mid-Right: 5+ Years Experience */}
              <div className="floating-badge absolute top-1/2 -right-6 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#70805D]/15 flex items-center justify-center text-[#70805D] text-base font-black">
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <div>
                  <div className="text-xs font-black text-[#2A3B27]">5+ Years</div>
                  <div className="text-[10px] text-[#55738D] font-bold">Integrated Practice</div>
                </div>
              </div>

              {/* Floating Badge Bottom-Left: 100% On-Time Delivery */}
              <div className="floating-badge absolute -bottom-4 -left-4 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#55738D]/15 flex items-center justify-center text-[#55738D] text-sm">
                  <i className="fa-solid fa-shield-check"></i>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#2A3B27]">100% Accountability</div>
                  <div className="text-[10px] text-[#55738D] font-bold">Single Strategic Lead</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-[#70805D]/15">
          {(stats || [
            { value: '6+', label: 'Core Service Pillars', sublabel: '360° Agency Capability' },
            { value: '15+', label: 'Live Web Portals', sublabel: 'Deployed & Active Sites' },
            { value: '300+', label: 'Brand Assets Designed', sublabel: 'Logos, Packaging & UI/UX' },
            { value: '50+', label: 'Commercial Shoots & TVCs', sublabel: 'Directed & Produced' },
          ]).map((st, idx) => (
            <div key={idx} className="p-4 sm:p-6 rounded-2xl bg-white border border-[#70805D]/15 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#2A3B27] tracking-tight">{st.value}</div>
              <div className="text-xs font-bold text-[#1C2B1B] mt-1">{st.label}</div>
              <div className="text-[11px] text-[#55738D] mt-0.5">{st.sublabel}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
