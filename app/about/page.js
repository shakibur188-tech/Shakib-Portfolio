import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import Link from 'next/link';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'About Md. Shakibur Rahaman | Strategic Lead & Digital Architect',
  description: 'Learn more about Md. Shakibur Rahaman: Strategic Lead & Full-Stack Digital Architect with 5+ years directing brand systems, high-performance web engineering, and commercial acquisition.',
};

export default function AboutPage() {
  const content = getSiteContent();
  const profile = content?.profile;

  const careerHistory = [
    { role: 'Senior Marketing Executive', org: 'Hotel Sarina Dhaka', period: 'Jul 2025 – Present', desc: 'Spearheading comprehensive luxury hospitality brand strategy, multi-tier digital media buying, and executive marketing campaigns for 5-star operations.' },
    { role: 'Senior Digital Marketing Executive', org: 'ASAP Solutions Limited', period: 'Nov 2024 – Jun 2025', desc: 'Managed B2B performance marketing funnels, high-speed Jamstack web platform deployment, and multi-channel lead acquisition.' },
    { role: 'Digital Marketing Executive', org: 'Renaissance Dhaka Gulshan (Marriott International)', period: 'Mar 2024 – Oct 2024', desc: 'Directed Bonvoy brand compliance, social engagement funnels, and lifestyle commercial visual production.' },
    { role: 'Marketing Executive', org: 'Hotel Sarina Dhaka', period: 'Jul 2022 – Oct 2023', desc: 'Executed paid Meta & Google search campaigns, coordinated event activations, and designed brand assets.' },
    { role: 'Marketing Coordinator', org: 'Hotel Sarina Dhaka', period: 'May 2022 – Jun 2022', desc: 'Assisted in multi-channel campaign planning and corporate collaterals production.' }
  ];

  const awards = [
    { title: 'Pillar of Trust of the Month', org: 'Hotel Sarina Dhaka', date: 'Jan 2026' },
    { title: 'Dedication Dynamo of the Month', org: 'Hotel Sarina Dhaka', date: 'Dec 2025' },
    { title: 'Employee of the Month', org: 'Hotel Sarina Dhaka', date: 'Feb & Jun 2023' },
    { title: 'Best Performer of the Month', org: 'Hotel Sarina Dhaka', date: 'Mar 2023' }
  ];

  const education = [
    { degree: 'Bachelor of Tourism & Hospitality Management', inst: 'Daffodil International University', score: 'CGPA 3.36 / 4.00' },
    { degree: 'Higher Secondary Certificate (HSC)', inst: 'Haziganj Govt. Model College', score: 'GPA 4.08 / 5.00' },
    { degree: 'Secondary School Certificate (SSC)', inst: 'Al-Amin Academy School & College', score: 'GPA 4.68 / 5.00' }
  ];

  return (
    <main className="min-h-screen">
      <Navbar profile={profile} headerMenu={content?.menu} />
      
      {/* About Header Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
              <span>STRATEGIC LEADERSHIP &amp; BIO</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-[#1C2B1B] tracking-tight leading-[1.08]">
              Decisive Vision. <br />
              <span className="olive-gradient-text">Engineered Execution.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#4D614A] leading-relaxed">
              Results-driven marketing professional with 5 years of verified practice across integrated brand strategy, full-stack digital architecture, and paid media buying based in Mohammadpur, Dhaka, Bangladesh.
            </p>

            <p className="text-xs sm:text-sm text-[#3A4E37] leading-relaxed">
              Proven track record spearheading multi-channel campaigns, directing commercial productions, and building modern web portals for premier hospitality and corporate institutions including Hotel Sarina Dhaka, Marriott International (Renaissance Dhaka Gulshan), and ASAP Solutions Limited.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-aesthetic-primary text-xs">
                <span>Book Strategic Consultation</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
              <a href="https://wa.me/8801838070468" target="_blank" rel="noopener noreferrer" className="btn-outline-emerald text-xs">
                <i className="fa-brands fa-whatsapp text-sm text-[#70805D]"></i>
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-3xl overflow-hidden border border-[#70805D]/25 shadow-2xl bg-white max-w-sm w-full">
              <img
                src="/assets/shakibur.jpg"
                alt="Md. Shakibur Rahaman"
                className="w-full h-[420px] object-cover object-top"
              />
              <div className="p-5 bg-white border-t border-[#70805D]/15">
                <div className="text-base font-extrabold text-[#1C2B1B]">Md. Shakibur Rahaman</div>
                <div className="text-xs font-bold text-[#70805D] mt-0.5">Strategic Lead &amp; Digital Architect</div>
                <div className="text-[11px] text-[#55738D] mt-1">Mohammadpur, Dhaka-1207, Bangladesh</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Verified Career History */}
      <section className="py-16 bg-[#F1F3ED]/60 border-y border-[#70805D]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
              <span>PROFESSIONAL TIMELINE</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1C2B1B]">Verified Career Milestones</h2>
          </div>

          <div className="space-y-6">
            {careerHistory.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#70805D]/20 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-[#1C2B1B]">{item.role}</h3>
                  <div className="text-xs font-bold text-[#70805D]">{item.org}</div>
                  <p className="text-xs text-[#4D614A] leading-relaxed pt-2 max-w-xl">{item.desc}</p>
                </div>
                <span className="text-[11px] font-bold text-[#55738D] bg-[#F8F9F6] border border-[#70805D]/15 px-3 py-1 rounded-full whitespace-nowrap self-start">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Honors & Awards */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
            <span>RECOGNITIONS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1C2B1B]">Key Honors &amp; Awards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {awards.map((aw, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-[#70805D]/20 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#70805D]/12 flex items-center justify-center text-[#70805D] text-lg shrink-0">
                <i className="fa-solid fa-award"></i>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#1C2B1B]">{aw.title}</h4>
                <div className="text-xs text-[#55738D] font-bold mt-0.5">{aw.org} • {aw.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Qualifications */}
      <section className="py-16 bg-[#F8F9F6] border-t border-[#70805D]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70805D] animate-pulse"></span>
              <span>ACADEMIC BACKGROUND</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1C2B1B]">Formal Education</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#70805D]/20 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#70805D]/12 flex items-center justify-center text-[#70805D] text-sm mb-4">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h4 className="text-sm font-extrabold text-[#1C2B1B] mb-1">{edu.degree}</h4>
                <div className="text-xs text-[#55738D] mb-2">{edu.inst}</div>
                <div className="text-xs font-black text-[#70805D] bg-[#70805D]/10 px-2.5 py-1 rounded inline-block">
                  {edu.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer profile={profile} />
      <WhatsAppWidget />
    </main>
  );
}
