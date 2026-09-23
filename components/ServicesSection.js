import React from 'react';
import Link from 'next/link';

export default function ServicesSection({ services }) {
  const defaultServices = [
    {
      id: 'srv-1',
      number: '01',
      title: 'Graphics & Visual Identity',
      slug: 'graphics-design',
      icon: 'fa-bezier-curve',
      tagline: 'Brand systems, luxury vector packaging & UI/UX design kits.',
      description: 'Engineering unified corporate visual systems that command market authority. From typography and custom vector iconsets to product packaging and enterprise pitch decks.',
      deliverables: ['Vector Logo Suites', 'Brand Style Guidelines', 'Luxury Packaging Design', 'Investor Pitch Decks', 'Custom Design Systems']
    },
    {
      id: 'srv-2',
      number: '02',
      title: 'Web Design & Development',
      slug: 'web-development',
      icon: 'fa-code',
      tagline: 'High-speed headless web portals, Next.js architecture & SEO.',
      description: 'Crafting responsive, sub-second web platforms engineered for maximum conversion. Seamlessly marrying Figma precision with scalable, clean production code.',
      deliverables: ['Next.js / React Web Portals', 'Headless CMS Architecture', 'Mobile-First Responsive UI', 'Speed Optimization (<0.5s)', 'SEO & AI-Crawler Prep']
    },
    {
      id: 'srv-3',
      number: '03',
      title: 'Social Media & Media Buying',
      slug: 'social-media-marketing',
      icon: 'fa-hashtag',
      tagline: 'Paid ads, Meta Advantage+ funnels & editorial content engines.',
      description: 'Architecting omnichannel social ecosystems that convert casual scrollers into loyal customers with high-retention video reels and data-driven ad funnels.',
      deliverables: ['Paid Meta Ad Campaigns', 'Editorial Content Calendars', 'Short-Form Reels Production', 'Audience Retargeting Funnels', 'ROAS & Conversion Analytics']
    },
    {
      id: 'srv-4',
      number: '04',
      title: 'Public Relations & Media Outreach',
      slug: 'public-relations',
      icon: 'fa-newspaper',
      tagline: 'Tier-1 press, authority editorial & strategic brand narratives.',
      description: 'Positioning founders and enterprises at the forefront of their industry through national press syndication, executive interview placements, and crisis management.',
      deliverables: ['National Press Releases', 'Executive Thought Leadership', 'Media Interview Placement', 'Crisis Communications', 'Industry Award Submissions']
    },
    {
      id: 'srv-5',
      number: '05',
      title: 'Google Ads & Intent Scaling',
      slug: 'google-ads',
      icon: 'fa-chart-line',
      tagline: 'High-intent search, Performance Max & commercial conversion.',
      description: 'Capturing active market intent when customers are ready to buy. High-converting search copy, negative keyword sculpturing, and relentless conversion optimization.',
      deliverables: ['Google Search & Intent Ads', 'Performance Max Campaigns', 'YouTube Video Advertising', 'Negative Keyword Sculpting', 'Conversion Tracking & ROAS']
    },
    {
      id: 'srv-6',
      number: '06',
      title: 'Event Activation & Exhibition',
      slug: 'event-activation',
      icon: 'fa-cubes',
      tagline: '3D exhibition booths, corporate symposiums & experiential builds.',
      description: 'Transforming physical spaces into memorable brand activations. Turnkey 3D booth fabrication, multi-screen video integration, and on-site brand engagement.',
      deliverables: ['3D Booth Spatial Design', 'Turnkey Fabrication Oversight', 'Corporate Summit Production', 'Interactive Video Walls', 'Experiential Lead Capture']
    }
  ];

  const serviceList = services && services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F1F3ED]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1C2B1B] tracking-tight">
              6 Strategic <span className="olive-gradient-text">Disciplines</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4D614A] mt-3 leading-relaxed">
              Every discipline is directed with senior executive oversight. No outsourced ambiguity, no fragmented vendors.
            </p>
          </div>

          <Link href="/services" className="btn-outline-emerald text-xs shrink-0 self-start md:self-auto">
            <span>Explore All Capabilities</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((svc) => (
            <div
              key={svc.id || svc.slug}
              className="spotlight-card p-6 sm:p-8 flex flex-col justify-between group bg-white border border-[#70805D]/20 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-[#70805D]"
            >
              <div>
                {/* Card Top: Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#70805D]/12 border border-[#70805D]/25 flex items-center justify-center text-[#70805D] text-lg group-hover:bg-[#70805D] group-hover:text-white transition-all duration-300">
                    <i className={`fa-solid ${svc.icon || 'fa-layer-group'}`}></i>
                  </div>
                  <span className="text-sm font-black text-[#96A7B6] group-hover:text-[#70805D] transition-colors">
                    {svc.number || '01'}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1C2B1B] mb-2 group-hover:text-[#70805D] transition-colors">
                  {svc.title}
                </h3>

                <p className="text-xs text-[#55738D] font-bold mb-3">
                  {svc.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#4D614A] leading-relaxed mb-6">
                  {svc.description}
                </p>

                {/* Key Deliverables List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-[#70805D]/15">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#2A3B27]">
                    Key Deliverables:
                  </div>
                  {svc.deliverables?.slice(0, 4).map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#2A3B27]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#70805D]"></span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Card Footer */}
              <div className="pt-4 border-t border-[#70805D]/10 flex items-center justify-between">
                <Link
                  href={`/services/${svc.slug}`}
                  className="text-xs font-bold text-[#70805D] hover:text-[#2A3B27] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                >
                  <span>Detailed Discipline Page</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
