const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const base = path.basename(filePath);
    
    if (fs.statSync(filePath).isDirectory()) {
      if (base !== '.git' && base !== 'node_modules' && base !== 'scratch' && base !== '.github') {
        getFiles(filePath, fileList);
      }
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getFiles(rootDir);
console.log('Found total HTML files:', htmlFiles.length);

for (const file of htmlFiles) {
  const normFile = path.relative(rootDir, file).replace(/\\/g, '/');
  if (normFile === 'admin.html' || normFile === 'form.html') continue;

  let content = fs.readFileSync(file, 'utf8');

  let activePage = '';
  if (normFile === 'index.html') activePage = 'home';
  else if (normFile.startsWith('about')) activePage = 'about';
  else if (normFile.startsWith('services')) activePage = 'services';
  else if (normFile.startsWith('projects')) activePage = 'projects';
  else if (normFile.startsWith('experience')) activePage = 'experience';
  else if (normFile.startsWith('offers')) activePage = 'offers';
  else if (normFile.startsWith('consultation')) activePage = 'consultation';

  const isHome = activePage === 'home';
  const isAbout = activePage === 'about';
  const isServices = activePage === 'services';
  const isProjects = activePage === 'projects';
  const isExperience = activePage === 'experience';
  const isOffers = activePage === 'offers';
  const isConsultation = activePage === 'consultation';

  // Completely clean header WITHOUT ANY "Book Consultation" button in header right actions
  const newHeader = `  <!-- 1. FIXED GLASS NAVBAR (Morphy Style) -->
  <header id="navbar" class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-[#E2E8F0] transition-all duration-300 shadow-2xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <a href="/" class="flex items-center gap-3 group min-w-0">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0040C1] flex items-center justify-center font-black text-white text-sm tracking-tight group-hover:scale-105 transition-transform shadow-md shadow-[#0066FF]/25 border border-white/20 shrink-0">
          ✦
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-extrabold text-[#0B0F19] tracking-tight text-base sm:text-lg group-hover:text-[#0066FF] transition-colors truncate" id="navBrandName">Md. Shakibur Rahaman</span>
          <span class="text-[10px] text-[#0066FF] font-extrabold tracking-wider uppercase truncate">Strategic Lead &amp; Digital Architect</span>
        </div>
      </a>

      <!-- Centered Floating Pill Navigation Menu (Desktop Only) -->
      <nav class="hidden lg:flex items-center gap-7 px-8 py-3 rounded-full bg-white/95 border border-[#E2E8F0] text-sm font-semibold text-[#334155] backdrop-blur-md shadow-xs shrink-0">
        <a href="/" class="${isHome ? 'text-[#0066FF] font-bold' : 'hover:text-[#0066FF]'} transition-colors">Home</a>
        <a href="/about" class="${isAbout ? 'text-[#0066FF] font-bold' : 'hover:text-[#0066FF]'} transition-colors">About</a>
        
        <!-- Services with dropdown arrow -->
        <div class="relative group">
          <a href="/services" class="flex items-center gap-1.5 ${isServices ? 'text-[#0066FF] font-bold' : 'hover:text-[#0066FF]'} transition-colors py-1">
            <span>Services</span>
            <i class="fa-solid fa-chevron-down text-[10px] text-[#64748B] group-hover:text-[#0066FF] group-hover:rotate-180 transition-transform duration-200"></i>
          </a>
          <!-- Dropdown card -->
          <div class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white/98 rounded-2xl border border-[#E2E8F0] shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <a href="/services/social-media-marketing" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Social Media &amp; Meta Ads</a>
            <a href="/services/google-ads" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Google Ads &amp; Search</a>
            <a href="/services/web-development" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Full-Stack Web Development</a>
            <a href="/services/seo-aeo" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">SEO &amp; AI Engine Optimization</a>
            <a href="/services/graphics-design" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Graphics &amp; Visual Assets</a>
            <div class="my-1.5 border-t border-[#E2E8F0]"></div>
            <a href="/services" class="block px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#0066FF] hover:bg-[#0066FF]/10 text-center">View All 9 Services &rarr;</a>
          </div>
        </div>

        <a href="/projects" class="${isProjects ? 'text-[#0066FF] font-bold' : 'hover:text-[#0066FF]'} transition-colors">Projects</a>
        <a href="/experience" class="${isExperience ? 'text-[#0066FF] font-bold' : 'hover:text-[#0066FF]'} transition-colors">Experience</a>
        <a href="/offers" class="${isOffers ? 'text-[#0066FF] font-bold' : 'hover:text-[#0066FF]'} transition-colors">Offers</a>
        <a href="/consultation" class="${isConsultation ? 'text-[#0066FF] font-bold' : 'hover:text-[#0066FF]'} transition-colors">Consultation</a>
      </nav>

      <!-- Right Header Actions (Mobile Hamburger Toggle) -->
      <div class="flex items-center gap-3 shrink-0">
        <button id="mobileMenuToggle" type="button" aria-label="Toggle Navigation" class="lg:hidden w-11 h-11 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 text-[#0B0F19] hover:text-[#0066FF] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 shrink-0 z-50">
          <i id="mobileMenuIcon" class="fa-solid fa-bars-staggered text-base"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu (Morphy Glassmorphic Design) -->
    <div id="mobileMenu" class="hidden lg:hidden bg-white/98 backdrop-blur-2xl border-b border-x border-[#E2E8F0] rounded-b-3xl mx-3 sm:mx-6 px-5 py-6 space-y-2.5 shadow-2xl transition-all duration-300">
      <div class="space-y-1.5 pb-3 border-b border-[#F1F5F9]">
        <a href="/" class="mobile-nav-link mobile-link flex items-center justify-between ${isHome ? 'active' : ''}">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-house-chimney text-xs ${isHome ? 'text-[#0066FF]' : 'text-[#64748B]'} w-4"></i>
            <span>Home</span>
          </span>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#94A3B8]"></i>
        </a>
        <a href="/about" class="mobile-nav-link mobile-link flex items-center justify-between ${isAbout ? 'active' : ''}">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-user text-xs ${isAbout ? 'text-[#0066FF]' : 'text-[#64748B]'} w-4"></i>
            <span>About</span>
          </span>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#94A3B8]"></i>
        </a>
        <a href="/services" class="mobile-nav-link mobile-link flex items-center justify-between ${isServices ? 'active' : ''}">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-layer-group text-xs ${isServices ? 'text-[#0066FF]' : 'text-[#64748B]'} w-4"></i>
            <span>Services</span>
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF]">9 Pillars</span>
        </a>
        <a href="/projects" class="mobile-nav-link mobile-link flex items-center justify-between ${isProjects ? 'active' : ''}">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-briefcase text-xs ${isProjects ? 'text-[#0066FF]' : 'text-[#64748B]'} w-4"></i>
            <span>Projects</span>
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981]">Featured</span>
        </a>
        <a href="/experience" class="mobile-nav-link mobile-link flex items-center justify-between ${isExperience ? 'active' : ''}">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-chart-line text-xs ${isExperience ? 'text-[#0066FF]' : 'text-[#64748B]'} w-4"></i>
            <span>Experience</span>
          </span>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#94A3B8]"></i>
        </a>
        <a href="/offers" class="mobile-nav-link mobile-link flex items-center justify-between ${isOffers ? 'active' : ''}">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-tags text-xs text-[#0066FF] w-4"></i>
            <span class="font-bold text-[#0066FF]">Special Offers</span>
          </span>
          <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052FF] text-white shadow-xs">EMI 🔥</span>
        </a>
      </div>

      <!-- Quick Action Contact in Mobile Menu -->
      <div class="pt-2 flex items-center gap-2">
        <a href="/contact" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052FF] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#0066FF]/25 hover:shadow-lg transition-all active:scale-98">
          <i class="fa-solid fa-paper-plane text-xs"></i>
          <span>Get in Touch</span>
        </a>
        <a href="https://wa.me/8801880907080" target="_blank" rel="noopener noreferrer" class="w-11 h-11 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25 flex items-center justify-center text-lg hover:bg-[#25D366] hover:text-white transition-all shrink-0 active:scale-95" aria-label="WhatsApp Contact">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
    </div>
  </header>`;

  const headerRegex = /<!--\s*1\.\s*FIXED GLASS NAVBAR[\s\S]*?<\/header>/i;
  const headerRegex2 = /<header id="navbar"[\s\S]*?<\/header>/i;

  if (content.match(headerRegex)) {
    content = content.replace(headerRegex, newHeader);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${normFile}`);
  } else if (content.match(headerRegex2)) {
    content = content.replace(headerRegex2, newHeader);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated (variant 2) ${normFile}`);
  }
}

console.log('Finished updating all HTML files!');
