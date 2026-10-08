const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// =========================================================================
// 1. UPDATE data/content.json & content.json
// =========================================================================
const contentJsonPath = path.join(rootDir, 'data', 'content.json');
let contentData = JSON.parse(fs.readFileSync(contentJsonPath, 'utf8'));

contentData.offers = [
  {
    id: "offer-ecom",
    image: "/assets/offers/ecom.jpg",
    badge: "E-Commerce Flagship",
    emiBadge: "EMI Available",
    title: "Fully Customized E-com Website",
    subtitle: "(with EMI Facility)",
    description: "High-converting digital storefront engineered for sub-second checkouts, multi-currency payment gateways, automated courier dispatch, and zero drop-off cart conversion.",
    chips: ["Headless Storefront", "Local & Global Gateways", "Sub-Second Speed"],
    ctaText: "View E-Com Plans & EMI Matrix",
    ctaLink: "/offers/ecommerce"
  },
  {
    id: "offer-service",
    image: "/assets/offers/service.jpg",
    badge: "Service Engine",
    emiBadge: "EMI Available",
    title: "Fully Customized Service-Based Platform",
    subtitle: "(with EMI Facility)",
    description: "Tailored conversion architecture for agencies, consultancies, and B2B enterprises to automate lead generation, interactive quotations, and client onboarding.",
    chips: ["Interactive Quotations", "Calendar & WhatsApp Sync", "Automated CRM"],
    ctaText: "View Service Platform Plans & EMI",
    ctaLink: "/offers/service-platform"
  },
  {
    id: "offer-portfolio",
    image: "/assets/offers/portfolio.jpg",
    badge: "Executive Brand",
    emiBadge: "EMI Available",
    title: "Fully Customized Personal Portfolio Website",
    subtitle: "(with EMI Facility)",
    description: "Ultra-luxury personal branding platform designed for founders, consultants, directors, and executives to command premium authority, credentials showcase, and client trust.",
    chips: ["Morphy Bento Layout", "99/100 PageSpeed", "100% IP Ownership"],
    ctaText: "View Portfolio Plans & EMI Matrix",
    ctaLink: "/offers/portfolio"
  }
];

fs.writeFileSync(contentJsonPath, JSON.stringify(contentData, null, 2), 'utf8');

const rootContentJsonPath = path.join(rootDir, 'content.json');
if (fs.existsSync(rootContentJsonPath)) {
  fs.writeFileSync(rootContentJsonPath, JSON.stringify(contentData, null, 2), 'utf8');
}
console.log('Updated content.json with fresh cards data!');


// =========================================================================
// 2. GENERATE NEW STUNNING CARDS HTML
// =========================================================================
function generateStunningCardsHtml(offers) {
  return offers.map(offer => {
    const chipsHtml = (offer.chips || []).map(chip => `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-bold text-[#475569]">
        <i class="fa-solid fa-check text-[9px] text-[#0066FF]"></i>
        <span>${chip}</span>
      </span>
    `).join('');

    return `
      <!-- Offer Card: ${offer.title} -->
      <div class="morphy-card bg-white border border-[#E2E8F0] hover:border-[#0066FF]/40 rounded-[28px] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-2xl hover:shadow-[#0066FF]/15 hover:-translate-y-2 transition-all duration-300 p-6 sm:p-7 relative group">
        
        <!-- Top Media Frame with Inset Rounded Container -->
        <div class="space-y-4">
          <div class="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F1F5F9] border border-[#E2E8F0]/70">
            <img src="${offer.image || '/assets/offers/ecom.jpg'}" alt="${offer.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          </div>

          <!-- Badges Bar -->
          <div class="flex items-center justify-between gap-2 pt-1">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-extrabold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 uppercase tracking-wider">
              <span class="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse"></span>
              <span>${offer.badge || 'Package'}</span>
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
              <span>⚡ ${offer.emiBadge || 'EMI Available'}</span>
            </span>
          </div>

          <!-- Title & Description -->
          <div class="pt-1">
            <h3 class="text-xl sm:text-[22px] font-extrabold text-[#0B0F19] tracking-tight leading-snug group-hover:text-[#0066FF] transition-colors">
              ${offer.title}
            </h3>
            <div class="text-xs font-bold text-[#0066FF] mt-0.5 mb-2.5">${offer.subtitle || ''}</div>

            <p class="text-xs sm:text-[13px] text-[#64748B] leading-relaxed line-clamp-3">
              ${offer.description || ''}
            </p>
          </div>

          <!-- Feature Chips -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${chipsHtml}
          </div>
        </div>

        <!-- Action Button -->
        <div class="pt-5 mt-6 border-t border-[#F1F5F9]">
          <a href="${offer.ctaLink || '/contact'}" class="w-full py-3.5 px-5 rounded-2xl bg-[#F8FAFC] group-hover:bg-gradient-to-r group-hover:from-[#0066FF] group-hover:to-[#0052FF] text-[#0B0F19] group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] group-hover:border-transparent shadow-2xs group-hover:shadow-lg group-hover:shadow-[#0066FF]/25 active:scale-98">
            <span>${offer.ctaText || 'View Plans & EMI Matrix'}</span>
            <i class="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

const cardsHtml = generateStunningCardsHtml(contentData.offers);

// =========================================================================
// 3. UPDATE offers.html and offers/index.html (Clean Header, No Paragraph/Toggle)
// =========================================================================
const cleanSectionHtml = `
  <!-- HERO & OFFERS GRID SECTION (Clean Header, Redesigned Cards) -->
  <section class="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 md:space-y-10">
      
      <!-- Clean Section Header (No Subtitle / No Switcher Buttons) -->
      <div class="text-center max-w-3xl mx-auto space-y-2 reveal-fade-up">
        <div class="morphy-tag-primary justify-center mb-1">
          <i class="fa-solid fa-bolt"></i>
          <span>SPECIAL GROWTH PACKAGES &amp; OFFERS</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0F19] tracking-tight leading-tight">
          Engineered for <span class="bg-gradient-to-r from-[#0066FF] to-[#0052FF] bg-clip-text text-transparent">Rapid Commercial ROI</span>
        </h1>
      </div>

      <!-- 3-Package Dynamic Card Grid (Managed via Admin CMS) -->
      <div id="offersGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
${cardsHtml}
      </div>

    </div>
  </section>
`;

for (const offerPage of [path.join(rootDir, 'offers.html'), path.join(rootDir, 'offers', 'index.html')]) {
  if (!fs.existsSync(offerPage)) continue;
  let content = fs.readFileSync(offerPage, 'utf8');

  const offersSectionRegex = /<!--\s*HERO & OFFERS GRID SECTION[\s\S]*?<\/section>/i;
  if (content.match(offersSectionRegex)) {
    content = content.replace(offersSectionRegex, cleanSectionHtml.trim());
    fs.writeFileSync(offerPage, content, 'utf8');
    console.log(`Updated ${offerPage} with clean header & redesigned cards!`);
  }
}


// =========================================================================
// 4. UPDATE site-hydration.js with Redesigned Cards Hydration
// =========================================================================
const hydrationPath = path.join(rootDir, 'site-hydration.js');
let hydrationJs = fs.readFileSync(hydrationPath, 'utf8');

const updatedHydrationCode = `
  // -------------------------------------------------------------
  // Dynamic Offers Grid Hydration (Redesigned Modern Cards)
  // -------------------------------------------------------------
  function hydrateOffersGrid(content) {
    const grid = document.getElementById('offersGrid');
    if (!grid || !Array.isArray(content.offers) || !content.offers.length) return;

    grid.innerHTML = content.offers.map(offer => {
      const chipsHtml = (offer.chips || []).map(chip => \`
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-bold text-[#475569]">
          <i class="fa-solid fa-check text-[9px] text-[#0066FF]"></i>
          <span>\${chip}</span>
        </span>
      \`).join('');

      return \`
        <div class="morphy-card bg-white border border-[#E2E8F0] hover:border-[#0066FF]/40 rounded-[28px] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-2xl hover:shadow-[#0066FF]/15 hover:-translate-y-2 transition-all duration-300 p-6 sm:p-7 relative group">
          
          <div class="space-y-4">
            <div class="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F1F5F9] border border-[#E2E8F0]/70">
              <img src="\${offer.image || '/assets/offers/ecom.jpg'}" alt="\${offer.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div class="flex items-center justify-between gap-2 pt-1">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-extrabold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse"></span>
                <span>\${offer.badge || 'Package'}</span>
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
                <span>⚡ \${offer.emiBadge || 'EMI Available'}</span>
              </span>
            </div>

            <div class="pt-1">
              <h3 class="text-xl sm:text-[22px] font-extrabold text-[#0B0F19] tracking-tight leading-snug group-hover:text-[#0066FF] transition-colors">
                \${offer.title}
              </h3>
              <div class="text-xs font-bold text-[#0066FF] mt-0.5 mb-2.5">\${offer.subtitle || ''}</div>

              <p class="text-xs sm:text-[13px] text-[#64748B] leading-relaxed line-clamp-3">
                \${offer.description || ''}
              </p>
            </div>

            <div class="flex flex-wrap gap-1.5 pt-1">
              \${chipsHtml}
            </div>
          </div>

          <div class="pt-5 mt-6 border-t border-[#F1F5F9]">
            <a href="\${offer.ctaLink || '/contact'}" class="w-full py-3.5 px-5 rounded-2xl bg-[#F8FAFC] group-hover:bg-gradient-to-r group-hover:from-[#0066FF] group-hover:to-[#0052FF] text-[#0B0F19] group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] group-hover:border-transparent shadow-2xs group-hover:shadow-lg group-hover:shadow-[#0066FF]/25 active:scale-98">
              <span>\${offer.ctaText || 'View Plans & EMI Matrix'}</span>
              <i class="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      \`;
    }).join('');
  }
`;

const oldHydrationRegex = /\/\/\s*-+\s*Dynamic Offers Grid Hydration[\s\S]*?\}\s*<\/div>\s*`;\s*\}\)\.join\(''\);\s*\}/;
if (hydrationJs.match(oldHydrationRegex)) {
  hydrationJs = hydrationJs.replace(oldHydrationRegex, updatedHydrationCode.trim());
  fs.writeFileSync(hydrationPath, hydrationJs, 'utf8');
  console.log('Updated site-hydration.js with redesigned cards hydration!');
}

console.log('Finished updating files with redesigned cards!');
