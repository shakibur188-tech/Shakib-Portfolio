'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ profile, headerMenu }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Projects', href: '/projects' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Offers', href: '/offers', badge: 'Best Value' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { title: 'Graphics & Visual Identity', desc: 'Brand systems, packaging, luxury vector identity', href: '/services/graphics-design', icon: 'fa-compass-drafting' },
    { title: 'Web Design & Development', desc: 'High-speed headless web portals, Next.js & UI/UX', href: '/services/web-development', icon: 'fa-code' },
    { title: 'Social Media & Media Buying', desc: 'Paid ads, Meta Advantage+, content calendars', href: '/services/social-media-marketing', icon: 'fa-share-nodes' },
    { title: 'Event Activation & Expos', desc: '3D exhibition booths, symposium production', href: '/services/event-activation', icon: 'fa-bullhorn' },
    { title: 'Google Ads & Intent Scaling', desc: 'High-intent search, Performance Max, ROAS scaling', href: '/services/google-ads', icon: 'fa-chart-line' },
    { title: 'Strategic PR & Media Outreach', desc: 'Authority editorial, broadcast press & narrative', href: '/services/public-relations', icon: 'fa-newspaper' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        id="scrollProgressBar"
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-[#70805D] via-[#55738D] to-[#2A3B27] z-[99999] transition-all duration-75 pointer-events-none"
      />

      {/* Main Top Header Navbar (Solid White Background, No Morphy Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E8EDE4] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Status */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#70805D]/30 shrink-0 group-hover:border-[#70805D] transition-colors">
              <img
                src="/assets/shakibur.jpg"
                alt="Md. Shakibur Rahaman"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/assets/avatar-placeholder.png'; }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-[#1C2B1B] tracking-tight group-hover:text-[#70805D] transition-colors leading-tight">
                Md. Shakibur Rahaman
              </span>
              <span className="text-[10px] font-bold text-[#70805D] flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Available for Direction</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              
              if (link.hasDropdown) {
                return (
                  <div key={link.href} className="services-menu-item relative group">
                    <Link
                      href={link.href}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'text-[#70805D] bg-[#70805D]/10'
                          : 'text-[#2A3B27] hover:text-[#70805D] hover:bg-[#70805D]/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <i className="fa-solid fa-chevron-down text-[9px] opacity-70 group-hover:rotate-180 transition-transform duration-200"></i>
                    </Link>

                    {/* Desktop Services Dropdown */}
                    <div className="services-dropdown">
                      <div className="p-1 mb-2 border-b border-[#70805D]/15 flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-[#70805D] uppercase tracking-wider">
                          6 Strategic Service Pillars
                        </span>
                        <Link href="/services" className="text-[11px] font-bold text-[#55738D] hover:text-[#2A3B27]">
                          View Overview &rarr;
                        </Link>
                      </div>
                      <div className="services-dropdown-grid">
                        {services.map((svc) => (
                          <Link key={svc.href} href={svc.href} className="service-sub-item">
                            <div className="service-sub-icon">
                              <i className={`fa-solid ${svc.icon}`}></i>
                            </div>
                            <div>
                              <div className="service-sub-title">{svc.title}</div>
                              <div className="service-sub-desc">{svc.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#70805D] bg-[#70805D]/10'
                      : 'text-[#2A3B27] hover:text-[#70805D] hover:bg-[#70805D]/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-black bg-[#70805D] text-white px-1.5 py-0.2 rounded-full">
                      ⭐
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:inline-flex btn-aesthetic-primary text-xs py-2.5 px-5">
              <span>Let's Talk</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#2A3B27] hover:bg-[#70805D]/10 focus:outline-none"
              aria-label="Open navigation drawer"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>

        </div>

        {/* Right-Sided Off-Canvas Mobile Drawer Backdrop */}
        <div
          onClick={closeDrawer}
          className={`fixed inset-0 bg-black/40 z-[998] transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Right-Sided Off-Canvas Mobile Drawer (Solid Pure White) */}
        <div
          className={`fixed top-0 bottom-0 right-0 w-[290px] sm:w-[320px] max-w-[85vw] bg-white z-[999] shadow-2xl border-l border-[#70805D]/20 transform transition-transform duration-300 ease-out flex flex-col justify-between overflow-y-auto ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#70805D]/15 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#70805D]/30 shrink-0">
                  <img
                    src="/assets/shakibur.jpg"
                    alt="Md. Shakibur Rahaman"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/assets/avatar-placeholder.png'; }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#1C2B1B] leading-tight">Md. Shakibur Rahaman</span>
                  <span className="text-[9.5px] font-bold text-[#70805D] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Strategic Lead
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="w-8 h-8 rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 flex items-center justify-center text-[#2A3B27] hover:bg-[#F1F4EE] transition-colors focus:outline-none"
                aria-label="Close Menu"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="p-3 space-y-1 bg-white">
              <Link
                href="/"
                onClick={closeDrawer}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  pathname === '/' ? 'bg-[#70805D]/15 text-[#2A3B27]' : 'text-[#1C2B1B] hover:bg-[#F8F9F6] hover:text-[#70805D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#70805D]/10 flex items-center justify-center text-[#70805D] text-xs">
                    <i className="fa-solid fa-house"></i>
                  </span>
                  <span>Home</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[9px] text-stone-300"></i>
              </Link>

              <Link
                href="/about"
                onClick={closeDrawer}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  pathname === '/about' ? 'bg-[#70805D]/15 text-[#2A3B27]' : 'text-[#1C2B1B] hover:bg-[#F8F9F6] hover:text-[#70805D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#70805D]/10 flex items-center justify-center text-[#70805D] text-xs">
                    <i className="fa-solid fa-user-astronaut"></i>
                  </span>
                  <span>About Me</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[9px] text-stone-300"></i>
              </Link>

              <Link
                href="/services"
                onClick={closeDrawer}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  pathname?.startsWith('/services') ? 'bg-[#70805D]/15 text-[#2A3B27]' : 'text-[#1C2B1B] hover:bg-[#F8F9F6] hover:text-[#70805D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#70805D]/10 flex items-center justify-center text-[#70805D] text-xs">
                    <i className="fa-solid fa-layer-group"></i>
                  </span>
                  <span>Services</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold bg-[#70805D]/10 text-[#70805D] px-1.5 py-0.5 rounded">6</span>
                  <i className="fa-solid fa-chevron-right text-[9px] text-stone-300"></i>
                </div>
              </Link>

              <Link
                href="/projects"
                onClick={closeDrawer}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  pathname === '/projects' ? 'bg-[#70805D]/15 text-[#2A3B27]' : 'text-[#1C2B1B] hover:bg-[#F8F9F6] hover:text-[#70805D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#70805D]/10 flex items-center justify-center text-[#70805D] text-xs">
                    <i className="fa-solid fa-code-branch"></i>
                  </span>
                  <span>Projects</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[9px] text-stone-300"></i>
              </Link>

              <Link
                href="/case-studies"
                onClick={closeDrawer}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  pathname?.startsWith('/case-stud') ? 'bg-[#70805D]/15 text-[#2A3B27]' : 'text-[#1C2B1B] hover:bg-[#F8F9F6] hover:text-[#70805D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#70805D]/10 flex items-center justify-center text-[#70805D] text-xs">
                    <i className="fa-solid fa-chart-pie"></i>
                  </span>
                  <span>Case Studies</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[9px] text-stone-300"></i>
              </Link>

              {/* Best Value Highlighted Item */}
              <Link
                href="/offers"
                onClick={closeDrawer}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black text-[#2A3B27] bg-[#70805D]/12 border border-[#70805D]/25 hover:bg-[#70805D]/20 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#70805D] text-white flex items-center justify-center text-xs shadow-xs">
                    <i className="fa-solid fa-tags"></i>
                  </span>
                  <span>Offers & Packages</span>
                </div>
                <span className="text-[9px] font-black bg-[#70805D] text-white px-2 py-0.5 rounded-full">
                  ⭐ Best Value
                </span>
              </Link>

              <Link
                href="/contact"
                onClick={closeDrawer}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  pathname === '/contact' ? 'bg-[#70805D]/15 text-[#2A3B27]' : 'text-[#1C2B1B] hover:bg-[#F8F9F6] hover:text-[#70805D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#70805D]/10 flex items-center justify-center text-[#70805D] text-xs">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <span>Contact</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[9px] text-stone-300"></i>
              </Link>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-[#70805D]/15 bg-white space-y-2">
            <Link
              href="/contact"
              onClick={closeDrawer}
              className="btn-aesthetic-primary w-full justify-center text-xs py-2.5 shadow-sm"
            >
              <span>Book Consultation</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
            <a
              href="https://wa.me/8801838070468"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-emerald w-full justify-center text-xs py-2"
            >
              <i className="fa-brands fa-whatsapp text-sm text-[#70805D]"></i>
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>

      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
}
