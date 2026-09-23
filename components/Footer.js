'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer({ profile }) {
  return (
    <footer className="bg-white border-t border-[#70805D]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#70805D]/30 shrink-0">
                <img
                  src="/assets/shakibur.jpg"
                  alt="Md. Shakibur Rahaman"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/assets/avatar-placeholder.png'; }}
                />
              </div>
              <div>
                <span className="text-base font-extrabold text-[#1C2B1B] block leading-tight">
                  Md. Shakibur Rahaman
                </span>
                <span className="text-[10px] font-bold text-[#70805D] uppercase tracking-wider">
                  Strategic Lead &amp; Digital Architect
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#4D614A] leading-relaxed max-w-sm">
              Single-point executive accountability across brand systems, Next.js web portals, commercial media productions, and performance marketing funnels.
            </p>

            <div className="flex items-center gap-3 text-base text-[#55738D]">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A3B27]"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/shakiburrahman222" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A3B27]"><i className="fa-brands fa-linkedin"></i></a>
              <a href="https://wa.me/8801838070468" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A3B27]"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="mailto:shakibur188@gmail.com" className="hover:text-[#2A3B27]"><i className="fa-solid fa-envelope"></i></a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-extrabold text-[#2A3B27] uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#4D614A]">
              <li><Link href="/" className="hover:text-[#70805D]">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#70805D]">About Executive Profile</Link></li>
              <li><Link href="/services" className="hover:text-[#70805D]">6 Core Services</Link></li>
              <li><Link href="/projects" className="hover:text-[#70805D]">15 Live Web Portals</Link></li>
              <li><Link href="/case-studies" className="hover:text-[#70805D]">UX Case Studies</Link></li>
              <li><Link href="/offers" className="hover:text-[#70805D] font-bold text-[#70805D]">⭐ Offers &amp; Retainers</Link></li>
              <li><Link href="/contact" className="hover:text-[#70805D]">Direct Contact</Link></li>
            </ul>
          </div>

          {/* Core Disciplines */}
          <div>
            <h4 className="text-xs font-extrabold text-[#2A3B27] uppercase tracking-wider mb-3">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#4D614A]">
              <li><Link href="/services/graphics-design" className="hover:text-[#70805D]">Graphics &amp; Visual Identity</Link></li>
              <li><Link href="/services/web-development" className="hover:text-[#70805D]">Web Design &amp; Development</Link></li>
              <li><Link href="/services/social-media-marketing" className="hover:text-[#70805D]">Social Media &amp; Ads</Link></li>
              <li><Link href="/services/public-relations" className="hover:text-[#70805D]">Strategic PR &amp; Media</Link></li>
              <li><Link href="/services/google-ads" className="hover:text-[#70805D]">Google Ads Scaling</Link></li>
              <li><Link href="/services/event-activation" className="hover:text-[#70805D]">Event &amp; 3D Expo Booths</Link></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-xs font-extrabold text-[#2A3B27] uppercase tracking-wider mb-3">
              Direct Desk
            </h4>
            <div className="space-y-2 text-xs text-[#4D614A]">
              <div>
                <span className="block text-[10px] text-[#55738D] font-bold uppercase">Direct Phone</span>
                <a href="tel:+8801838070468" className="font-bold text-[#1C2B1B] hover:text-[#70805D]">+880 1838-070468</a>
              </div>
              <div>
                <span className="block text-[10px] text-[#55738D] font-bold uppercase">Corporate Email</span>
                <a href="mailto:shakibur188@gmail.com" className="font-bold text-[#1C2B1B] hover:text-[#70805D]">shakibur188@gmail.com</a>
              </div>
              <div>
                <span className="block text-[10px] text-[#55738D] font-bold uppercase">Location</span>
                <span className="text-[#1C2B1B]">Mohammadpur, Dhaka-1207</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="pt-8 border-t border-[#70805D]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#55738D]">
          <div>
            &copy; {new Date().getFullYear()} Md. Shakibur Rahaman. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/llms.txt" className="hover:text-[#70805D]">llms.txt</Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-[#70805D]">Sitemap</Link>
            <span>•</span>
            <a href="/admin" className="hover:text-[#70805D] font-bold">Admin Portal 🔐</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
