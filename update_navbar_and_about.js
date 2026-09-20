const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 1. Update index.html
const indexPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace the Navbar in index.html
const newNavbarHtml = `  <!-- 2. FIXED NAVBAR (Ultra-Visual Glassmorphism, Mega Services Dropdown) -->
  <header id="navbar" class="fixed top-0 left-0 right-0 z-50 bg-[#F8F9F6]/92 backdrop-blur-2xl border-b border-[#70805D]/15 transition-all duration-300 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo / Monogram -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#70805D] to-[#2A3B27] flex items-center justify-center font-black text-white text-sm sm:text-base tracking-tight group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#70805D]/30 transition-all shadow-md shadow-[#70805D]/20 border border-white/20 shrink-0">
          SR
        </div>
        <div class="flex flex-col">
          <span class="font-extrabold text-[#1C2B1B] tracking-tight text-sm sm:text-base md:text-lg group-hover:text-[#70805D] transition-colors" id="navBrandName">Md. Shakibur Rahaman</span>
          <span class="text-[9.5px] sm:text-[10.5px] text-[#70805D] font-extrabold tracking-wider uppercase">Strategic Lead &amp; Digital Architect</span>
        </div>
      </a>

      <!-- Centered Floating Pill Navigation Menu with Services Dropdown -->
      <nav class="hidden lg:flex items-center gap-6 px-6 py-2.5 rounded-full bg-white/95 border border-[#70805D]/20 text-xs font-bold text-[#4D614A] backdrop-blur-md shadow-sm">
        <a href="#hero" class="desktop-nav-link hover:text-[#70805D] transition-colors">Home</a>
        <a href="#about" class="desktop-nav-link hover:text-[#70805D] transition-colors">About</a>
        
        <!-- SERVICES MENU ITEM WITH HOVER SUB-MENU -->
        <div class="services-menu-item relative group">
          <a href="/services.html" class="desktop-nav-link hover:text-[#70805D] transition-colors flex items-center gap-1.5 py-1">
            <span>Services</span>
            <i class="fa-solid fa-chevron-down text-[9px] text-[#70805D] transition-transform duration-200 group-hover:rotate-180"></i>
          </a>
          
          <!-- 9 Services Hover Sub-Menu Panel -->
          <div class="services-dropdown">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#70805D]/15">
              <span class="text-xs font-bold text-[#2A3B27] uppercase tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-layer-group text-[#70805D]"></i>
                <span>Core Capabilities (9 Disciplines)</span>
              </span>
              <a href="/services.html" class="text-[11px] font-bold text-[#70805D] hover:underline flex items-center gap-1">
                <span>View All Services Directory</span>
                <i class="fa-solid fa-arrow-right text-[9px]"></i>
              </a>
            </div>

            <div class="services-dropdown-grid">
              <a href="/services/branding.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-fingerprint"></i></div>
                <div>
                  <div class="service-sub-title">Branding &amp; Strategy</div>
                  <div class="service-sub-desc">Positioning &amp; master manuals</div>
                </div>
              </a>

              <a href="/services/graphics-design.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-bezier-curve"></i></div>
                <div>
                  <div class="service-sub-title">Graphics &amp; Visual ID</div>
                  <div class="service-sub-desc">Packaging, UI/UX &amp; decks</div>
                </div>
              </a>

              <a href="/services/web-development.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-code"></i></div>
                <div>
                  <div class="service-sub-title">Web Design &amp; Dev</div>
                  <div class="service-sub-desc">Jamstack portals &amp; apps</div>
                </div>
              </a>

              <a href="/services/social-media-marketing.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-hashtag"></i></div>
                <div>
                  <div class="service-sub-title">Social Media (SMM)</div>
                  <div class="service-sub-desc">Viral reels &amp; Meta ads</div>
                </div>
              </a>

              <a href="/services/photoshoot-videography.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-video"></i></div>
                <div>
                  <div class="service-sub-title">Photoshoot &amp; Video</div>
                  <div class="service-sub-desc">Commercial TVCs &amp; shoots</div>
                </div>
              </a>

              <a href="/services/event-activation.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-cubes"></i></div>
                <div>
                  <div class="service-sub-title">Event &amp; 3D Stalls</div>
                  <div class="service-sub-desc">Expos &amp; 3D spatial builds</div>
                </div>
              </a>

              <a href="/services/google-ads.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-chart-line"></i></div>
                <div>
                  <div class="service-sub-title">Google Ads &amp; SEM</div>
                  <div class="service-sub-desc">Performance Max funnels</div>
                </div>
              </a>

              <a href="/services/seo-aeo.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                <div>
                  <div class="service-sub-title">SEO &amp; AI Search (AEO)</div>
                  <div class="service-sub-desc">Schema entity &amp; LLM rankings</div>
                </div>
              </a>

              <a href="/services/public-relations.html" class="service-sub-item">
                <div class="service-sub-icon"><i class="fa-solid fa-newspaper"></i></div>
                <div>
                  <div class="service-sub-title">PR &amp; Mainstream Media</div>
                  <div class="service-sub-desc">Tier-1 press &amp; corporate PR</div>
                </div>
              </a>
            </div>

            <div class="mt-3 pt-2.5 border-t border-[#70805D]/15 flex items-center justify-between text-[11px] text-[#55738D]">
              <span>Integrated strategic leadership across all 9 disciplines</span>
              <a href="/services.html" class="font-bold text-[#70805D] hover:text-[#2A3B27] flex items-center gap-1">
                <span>View Full Services Directory</span>
                <i class="fa-solid fa-chevron-right text-[8px]"></i>
              </a>
            </div>
          </div>
        </div>

        <a href="#projects" class="desktop-nav-link hover:text-[#70805D] transition-colors">Projects</a>
        <a href="#experience" class="desktop-nav-link hover:text-[#70805D] transition-colors">Experience</a>
        <a href="#testimonials" class="desktop-nav-link hover:text-[#70805D] transition-colors">Testimonials</a>
        <a href="#contact" class="desktop-nav-link hover:text-[#70805D] transition-colors">Contact</a>
      </nav>

      <!-- Right Header Actions (Button hidden on mobile view) -->
      <div class="flex items-center gap-3">
        <a href="#contact" class="nav-cta-btn btn-outline-emerald text-xs hidden md:inline-flex items-center gap-2">
          <span>Let's Talk</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
        </a>
        <button id="mobileMenuToggle" aria-label="Toggle Navigation" class="lg:hidden w-10 h-10 rounded-xl bg-white border border-[#70805D]/25 flex items-center justify-center text-[#2A3B27] hover:bg-[#F1F4EE] transition-colors shadow-sm focus:outline-none">
          <i class="fa-solid fa-bars-staggered text-base"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Slide-Down Navigation Menu (Enhanced Visual Layout) -->
    <div id="mobileMenu" class="hidden lg:hidden bg-white/98 backdrop-blur-2xl border-b border-[#70805D]/20 px-5 py-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-[#70805D]/15">
        <div class="flex items-center gap-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-[#70805D] animate-ping"></span>
          <span class="text-xs font-extrabold text-[#2A3B27] uppercase tracking-wider">Quick Navigation</span>
        </div>
        <span class="text-[11px] font-bold text-[#70805D] bg-[#70805D]/10 px-2.5 py-0.5 rounded-full">Available</span>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <a href="#hero" class="mobile-link flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15 text-xs font-bold text-[#1C2B1B] hover:bg-[#F1F4EE]">
          <i class="fa-solid fa-house text-[#70805D]"></i>
          <span>Home</span>
        </a>
        <a href="#about" class="mobile-link flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15 text-xs font-bold text-[#1C2B1B] hover:bg-[#F1F4EE]">
          <i class="fa-solid fa-user-astronaut text-[#70805D]"></i>
          <span>About Me</span>
        </a>
        <a href="#projects" class="mobile-link flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15 text-xs font-bold text-[#1C2B1B] hover:bg-[#F1F4EE]">
          <i class="fa-solid fa-code-branch text-[#70805D]"></i>
          <span>15 Projects</span>
        </a>
        <a href="#testimonials" class="mobile-link flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15 text-xs font-bold text-[#1C2B1B] hover:bg-[#F1F4EE]">
          <i class="fa-solid fa-star text-[#F59E0B]"></i>
          <span>Reviews</span>
        </a>
      </div>

      <!-- Mobile Services Accordion Block -->
      <div class="p-3.5 rounded-2xl bg-[#F8F9F6] border border-[#70805D]/18 space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold text-[#2A3B27] flex items-center gap-1.5 uppercase tracking-wide">
            <i class="fa-solid fa-layer-group text-[#70805D]"></i>
            <span>9 Core Services</span>
          </span>
          <a href="/services.html" class="text-[11px] font-bold text-[#70805D] hover:underline">Full Directory →</a>
        </div>
        <div class="grid grid-cols-2 gap-1.5 pt-1 text-xs text-[#4D614A]">
          <a href="/services/branding.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-fingerprint text-[10px] text-[#70805D]"></i><span>Branding</span></a>
          <a href="/services/graphics-design.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-bezier-curve text-[10px] text-[#70805D]"></i><span>Graphics</span></a>
          <a href="/services/web-development.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-code text-[10px] text-[#70805D]"></i><span>Web Dev</span></a>
          <a href="/services/social-media-marketing.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-hashtag text-[10px] text-[#70805D]"></i><span>Social Media</span></a>
          <a href="/services/photoshoot-videography.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-video text-[10px] text-[#70805D]"></i><span>Video &amp; Photo</span></a>
          <a href="/services/event-activation.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-cubes text-[10px] text-[#70805D]"></i><span>3D Events</span></a>
          <a href="/services/google-ads.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-chart-line text-[10px] text-[#70805D]"></i><span>Google Ads</span></a>
          <a href="/services/seo-aeo.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5"><i class="fa-solid fa-magnifying-glass-chart text-[10px] text-[#70805D]"></i><span>SEO &amp; AEO</span></a>
          <a href="/services/public-relations.html" class="mobile-link p-1.5 rounded-lg hover:bg-white flex items-center gap-1.5 col-span-2"><i class="fa-solid fa-newspaper text-[10px] text-[#70805D]"></i><span>Public Relations (PR)</span></a>
        </div>
      </div>

      <div class="pt-2 flex flex-col gap-2">
        <a href="#contact" class="mobile-link btn-aesthetic-primary w-full justify-center text-xs py-3">
          <span>Get In Touch / Project Inquiry</span>
          <i class="fa-solid fa-paper-plane text-xs"></i>
        </a>
        <a href="https://wa.me/8801838070468" target="_blank" rel="noopener noreferrer" class="btn-outline-emerald w-full justify-center text-xs py-2.5">
          <i class="fa-brands fa-whatsapp text-sm text-[#70805D]"></i>
          <span>Direct WhatsApp</span>
        </a>
      </div>
    </div>
  </header>`;

// Replace Navbar in index.html
indexHtml = indexHtml.replace(/<!-- 2\. FIXED NAVBAR[\s\S]*?<\/header>/, newNavbarHtml);

// Redesign About section (REMOVE PICTURE COMPLETELY)
const newAboutHtml = `  <!-- 4. ABOUT SECTION (Picture Removed - Prestigious Strategic Leadership Grid) -->
  <section id="about" class="py-20 sm:py-24 border-t border-[#70805D]/15 bg-white/80 relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left: Strategic Leadership & Authority Architecture Card -->
        <div class="lg:col-span-5 relative reveal-fade-left">
          <div class="spotlight-card p-6 sm:p-8 bg-gradient-to-br from-[#FFFFFF] via-[#F8F9F6] to-[#F1F3ED] border border-[#70805D]/25 rounded-3xl shadow-xl space-y-6">
            
            <!-- Top Seal Header -->
            <div class="flex items-center justify-between pb-4 border-b border-[#70805D]/15">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#70805D] to-[#2A3B27] flex items-center justify-center font-black text-white text-base shadow-md shadow-[#70805D]/25 border border-white/20">
                  SR
                </div>
                <div>
                  <h3 class="text-base font-extrabold text-[#1C2B1B] tracking-tight">Md. Shakibur Rahaman</h3>
                  <div class="text-[11px] font-bold text-[#70805D] uppercase tracking-wider">Strategic Director &amp; Architect</div>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-[#70805D]/10 flex items-center justify-center text-[#70805D]">
                <i class="fa-solid fa-fingerprint text-sm"></i>
              </div>
            </div>

            <!-- Authority Statement -->
            <div class="space-y-2">
              <div class="text-xs uppercase font-extrabold tracking-wider text-[#55738D]">Core Philosophy</div>
              <p class="text-xs sm:text-sm text-[#2A3B27] font-semibold leading-relaxed italic border-l-2 border-[#70805D] pl-3 py-0.5">
                "Directing high-stakes creative systems and digital architecture from single point of accountability."
              </p>
            </div>

            <!-- Core Competency Tags -->
            <div class="space-y-2">
              <div class="text-xs uppercase font-extrabold tracking-wider text-[#55738D]">Operational Focus</div>
              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-lg bg-white border border-[#70805D]/20 text-[11px] font-bold text-[#2A3B27] shadow-2xs">System Architecture</span>
                <span class="px-2.5 py-1 rounded-lg bg-white border border-[#70805D]/20 text-[11px] font-bold text-[#2A3B27] shadow-2xs">High-Converting Web Portals</span>
                <span class="px-2.5 py-1 rounded-lg bg-white border border-[#70805D]/20 text-[11px] font-bold text-[#2A3B27] shadow-2xs">Corporate Identity Systems</span>
                <span class="px-2.5 py-1 rounded-lg bg-white border border-[#70805D]/20 text-[11px] font-bold text-[#2A3B27] shadow-2xs">Full-Funnel Growth</span>
              </div>
            </div>

            <!-- Status Pill -->
            <div class="pt-3 border-t border-[#70805D]/15 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 font-bold text-[#2A3B27]">
                <span class="pulse-dot-olive"></span>
                <span>Active Global Projects</span>
              </div>
              <span class="text-[11px] font-extrabold text-[#70805D] bg-[#70805D]/10 px-2.5 py-1 rounded-full">Available Q3/Q4</span>
            </div>

          </div>
        </div>

        <!-- Right: Bio Narrative & Structured Strategic Value Takeaways -->
        <div class="lg:col-span-7 space-y-6 reveal-fade-right">
          <div class="section-tag">
            <i class="fa-solid fa-user-astronaut"></i>
            <span>ABOUT ME</span>
          </div>

          <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1C2B1B] tracking-tight leading-snug">
            I make the decisive calls, lead strategic execution, and turn complex ideas into reality.
          </h2>

          <p class="text-sm sm:text-base text-[#4D614A] leading-relaxed">
            I specialize in taking full ownership and making the critical strategic decisions: building modern, responsive, and performance-driven web platforms alongside bespoke branding systems. With strong decision-making clarity, typographical precision, and clean code, I engineer solutions that are both visually captivating and commercially lucrative.
          </p>

          <!-- Structured Operational Points -->
          <div class="space-y-2.5 pt-1 pb-1">
            <div class="bullet-point-item">
              <i class="fa-solid fa-shield-halved bullet-icon"></i>
              <span><strong>Decisive Strategic Ownership:</strong> Eliminates cross-agency friction by directing branding, software engineering, and acquisition campaigns under one roof.</span>
            </div>
            <div class="bullet-point-item">
              <i class="fa-solid fa-bolt bullet-icon"></i>
              <span><strong>Enterprise Performance Standards:</strong> Every web platform is custom-coded without bloat, achieving sub-second load times and 95+ PageSpeed scores.</span>
            </div>
            <div class="bullet-point-item">
              <i class="fa-solid fa-award bullet-icon"></i>
              <span><strong>Complete Asset Sovereignty:</strong> Clients retain 100% intellectual property, vector master files, clean Git repositories, and documentation.</span>
            </div>
          </div>

          <!-- 3 Quick Metric Cards with Animated Counters -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div class="spotlight-card p-4 text-center bg-white border border-[#70805D]/20 rounded-2xl shadow-xs">
              <div class="metric-counter text-[#2A3B27]" data-counter-target="9" data-counter-suffix="+">9+</div>
              <div class="text-[11px] text-[#55738D] uppercase mt-1 font-bold">Core Service Pillars</div>
            </div>
            <div class="spotlight-card p-4 text-center bg-white border border-[#70805D]/20 rounded-2xl shadow-xs">
              <div class="metric-counter text-[#2A3B27]" data-counter-target="15" data-counter-suffix="+">15+</div>
              <div class="text-[11px] text-[#55738D] uppercase mt-1 font-bold">Live Web Portals</div>
            </div>
            <div class="spotlight-card p-4 text-center bg-white border border-[#70805D]/20 rounded-2xl shadow-xs">
              <div class="metric-counter text-[#2A3B27]" data-counter-target="300" data-counter-suffix="+">300+</div>
              <div class="text-[11px] text-[#55738D] uppercase mt-1 font-bold">Brand Assets Designed</div>
            </div>
          </div>

          <div class="pt-2 flex flex-wrap items-center gap-3.5">
            <a href="/services.html" class="btn-aesthetic-primary text-xs">
              <span>View All 9 Services on Single Page</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
            <a href="#contact" class="btn-outline-emerald text-xs">
              <span>Direct Consultation</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>`;

// Replace About section in index.html
indexHtml = indexHtml.replace(/<!-- 4\. ABOUT SECTION[\s\S]*?<!-- 5\. WHAT I DO/, newAboutHtml + '\n\n  <!-- 5. WHAT I DO');

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('index.html updated successfully with new Navbar and picture removed from About Me!');

// 2. Update services.html with responsive Navbar
const servicesPath = path.join(rootDir, 'services.html');
if (fs.existsSync(servicesPath)) {
  let servHtml = fs.readFileSync(servicesPath, 'utf8');
  servHtml = servHtml.replace(/<div class="flex items-center gap-3\.5">\s*<a href="[^"]*"\s+class="btn-aesthetic-primary text-xs">/g, 
    '<div class="flex items-center gap-3">\n        <a href="/#contact" class="nav-cta-btn btn-aesthetic-primary text-xs hidden md:inline-flex items-center gap-2">');
  servHtml = servHtml.replace(/<div class="flex items-center gap-3\.5">\s*<a href="[^"]*"\s+class="btn-outline-emerald text-xs">/g, 
    '<div class="flex items-center gap-3">\n        <a href="/#contact" class="nav-cta-btn btn-outline-emerald text-xs hidden md:inline-flex items-center gap-2">');
  fs.writeFileSync(servicesPath, servHtml, 'utf8');
  console.log('services.html updated with responsive mobile navbar!');
}

// 3. Update all services/*.html with responsive Navbar
const servicesDir = path.join(rootDir, 'services');
if (fs.existsSync(servicesDir)) {
  const serviceFiles = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));
  serviceFiles.forEach(file => {
    const fPath = path.join(servicesDir, file);
    let sHtml = fs.readFileSync(fPath, 'utf8');
    sHtml = sHtml.replace(/<div class="flex items-center gap-3\.5">\s*<a href="[^"]*"\s+class="btn-aesthetic-primary text-xs">/g, 
      '<div class="flex items-center gap-3">\n        <a href="#inquiry" class="nav-cta-btn btn-aesthetic-primary text-xs hidden md:inline-flex items-center gap-2">');
    sHtml = sHtml.replace(/<div class="flex items-center gap-3\.5">\s*<a href="[^"]*"\s+class="btn-outline-emerald text-xs">/g, 
      '<div class="flex items-center gap-3">\n        <a href="#inquiry" class="nav-cta-btn btn-outline-emerald text-xs hidden md:inline-flex items-center gap-2">');
    fs.writeFileSync(fPath, sHtml, 'utf8');
  });
  console.log(`Updated ${serviceFiles.length} service sub-pages with responsive mobile navbar!`);
}
